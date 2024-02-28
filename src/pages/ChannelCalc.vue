<template>
    <q-card class="align-center relative-position" style="width: 100%; height:100%;">
        <q-card-section class="text-h4 text-center text-weight-bold">
            Recruitment Channel Calculator
        </q-card-section>
        <q-card-section horizontal class="row">
            <div class="col-3 q-pa-lg">
                <div class="row full-width">
                    <q-file class="col-9" v-model="upload" label="Upload touchpoints" />
                    <q-space />
                    <q-btn class="col-3" flat color="accent" label="Submit" @click="onSubmit" />
                </div>
                
                <q-date v-model="dateRange" range />
                <q-badge color="secondary" class="q-mt-md">
                    Time decay factor: {{ decayFactor }}%
                </q-badge>
                <q-slider
                    v-model="decayFactor"  
                    :min="0"
                    :max="100"
                    :step="1"
                    label
                    :label-value="decayFactor + '%'"
                    color='grey-8'
                    
                    
                />

                <q-card flat>
                    <q-card-section class="card-words">
                        We've found a total of {{ uniqueInteractions?.length }} types of interactions across <span class="text-weight-medium text-h6 text-accent">{{ uniqueUsers?.length }} distinct hires</span>.
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn flat color="primary" label="Download template" @click="downloadTemplate" />                        
                    </q-card-actions>
                </q-card>
                
            </div>
            <div class="col-9 q-pa-lg">
                <q-table
                    :rows="attribution"
                    :columns="tableColumns"
                    row-key="name"
                    :rows-per-page-options="[10, 25, 50]"
                />
            </div>
        </q-card-section>
        <q-inner-loading
            :showing="isLoading"
            label="Calculating attribution..."
            label-class="text-positive"
            label-style="font-size: 2.0em"
        />
    </q-card>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import Papa from 'papaparse';
import { useQuasar } from 'quasar';

const emits = defineEmits(['start-loading', 'finish-loading'])

const $q = useQuasar()
const isLoading = ref(false);

interface touchPoint {
    interaction: string,
    user_id: number,
    date: string
}

const decayFactor = ref<number>(80);

const touchpointsArray = ref<touchPoint[]>();
const upload = ref<any[]>();
const dateRange = ref<any>();

const isLargeFile = computed(() => {
    if (Number(touchpointsArray.value?.length ?? 0) >= 10000) {
        console.log('computed touchpoints length is', touchpointsArray.value?.length)
        console.log('return is: true')
        return true;
    } else {
        console.log('computed touchpoints length is', touchpointsArray.value?.length)
        console.log('return is: false')
        return false;
    }
});

const uniqueUsers = computed(() => {
    return touchpointsArray.value?.map((touchpoint) => touchpoint.user_id)
    
    // .filter((touchpoint: any) => touchpoint.date >= dateRange.value?.from && touchpoint.date <= dateRange.value?.to)
    
    .filter((value, index, self) => self.indexOf(value) === index);
})
const uniqueInteractions = computed(() => {
    return touchpointsArray.value?.map((touchpoint) => touchpoint.interaction)

    // .filter((touchpoint: any) => touchpoint.date >= dateRange.value?.from && touchpoint.date <= dateRange.value?.to)

    .filter((value, index, self) => self.indexOf(value) === index);
})

const attribution = ref<any[]>();

onMounted(async () => {
  try {
    const response = await fetch('https://storage.googleapis.com/people-calcs-data/dummy_data.csv');
    const csvText = await response.text();
    Papa.parse(csvText, {
      complete: (result: any) => {
        touchpointsArray.value = result.data as touchPoint[]; // Cast to your data type
      },
      header: true, // Set to false if your CSV doesn't have headers
    });

    generateArray();

  } catch (error) {
    console.error('Error loading CSV:', error);
  }
});

const downloadTemplate = () => {
    const url = 'https://storage.googleapis.com/people-calcs-data/dummy_data.csv';

      // Create an anchor element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a); // Append the anchor to the body
      a.click(); // Trigger the download
      document.body.removeChild(a); // Clean up and remove the anchor element
}

const generateArray = () => {
    let returnArray = uniqueInteractions.value?.map((interaction) => {
        return {
            "name": interaction,
            "linearAttribution": 0,
            "firstAttribution": 0,
            "lastAttribution": 0,
            "decayAttribution": 0,
            "uShapedAttribution": 0
        }
    })

    for (let i = 0; i < (uniqueUsers.value?.length ?? 0); i++) {
        let user = uniqueUsers.value ? uniqueUsers.value[i] : -1;
        // Filter for each user's touchpoints and sort from most recent date to least
        let tempInteractions = 
        touchpointsArray.value?.filter((touchpoint) => 
            (touchpoint.user_id == user && 
                (dateRange.value == null || 
                    (new Date(touchpoint.date) >= new Date(dateRange.value?.from) && new Date(touchpoint.date) <= new Date(dateRange.value?.to))
                )
            )
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Assign first attribution
        let firstInteraction = tempInteractions ? tempInteractions[0]?.interaction : "";
        let firstObject = returnArray?.find((interaction) => interaction.name == firstInteraction);
        if (firstObject) {
            firstObject.firstAttribution = firstObject.firstAttribution + 1;
        }

        // Assign last attribution
        let lastInteraction = tempInteractions ? tempInteractions[tempInteractions.length - 1]?.interaction : "";
        let lastObject = returnArray?.find((interaction) => interaction.name == lastInteraction);
        if (lastObject) {
            lastObject.lastAttribution = lastObject.lastAttribution + 1;
        }

        // Assign linear, time decay, and U-shaped attribution
        for (let j = 0; j < (tempInteractions?.length ?? 0); j++) {
            let interactionType = tempInteractions ? tempInteractions[j].interaction : "";
            let object = returnArray?.find((interaction) => interaction.name == interactionType);
            let decayDecimal = decayFactor.value/100;
            let tempInteractionsLength = tempInteractions?.length ?? 0;
            
            if (object) {
                // Assign linear attribution
                object.linearAttribution = object.linearAttribution + (1 / (tempInteractions?.length ?? 1));

                // Assign time decay attribution
                object.decayAttribution = object.decayAttribution + (1 * (1 - (decayFactor.value/100)) / (1 - (decayFactor.value/100) ** (tempInteractions?.length ?? 1)) * (decayFactor.value/100) ** (j));

                // Assign U-shaped attribution
                if (tempInteractionsLength % 2 == 0) {
                    // EVEN
                    if ((j+1) > Math.ceil((tempInteractions?.length ?? 0) / 2)) {
                        object.uShapedAttribution = object.uShapedAttribution + 
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, Math.ceil(tempInteractionsLength / 2))) 
                        * Math.pow(decayDecimal, (tempInteractionsLength - (j + 1))) / 2;
                    } else {
                        object.uShapedAttribution = object.uShapedAttribution + 
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, Math.ceil(tempInteractionsLength / 2))) 
                        * Math.pow(decayDecimal, j) / 2;
                    }
                } else {
                    // ODD
                    if ((j+1) < Math.ceil((tempInteractions?.length ?? 0) / 2)) {

                        object.uShapedAttribution = object.uShapedAttribution + 

                        (
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, tempInteractionsLength)) 
                        * Math.pow(decayDecimal, (j + 1) * 2 - 2) 
                        / 2
                        ) 
                        
                        + 
                        
                        (
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, tempInteractionsLength)) 
                        * Math.pow(decayDecimal, (j + 1) * 2 - 1) 
                        / 2)
                        ;
                    } else if ((j+1) > Math.ceil((tempInteractions?.length ?? 0) / 2)) {

                        object.uShapedAttribution = object.uShapedAttribution + 
                        
                        (
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, tempInteractionsLength)) 
                        * Math.pow(decayDecimal, (tempInteractionsLength - (j + 1)) * 2) 
                        / 2
                        ) 
                        
                        + 
                        
                        (
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, tempInteractionsLength)) 
                        * Math.pow(decayDecimal, ((tempInteractionsLength - (j + 1)) * 2 + 1)) 
                        / 2
                        );

                    } else {
                        
                        object.uShapedAttribution = object.uShapedAttribution + 
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, tempInteractionsLength)) 
                        * Math.pow(decayDecimal, tempInteractionsLength - 1);
                    }
                }
            }
        }
    }

    attribution.value = returnArray?.map((interaction) => {
        return {
            "name": interaction.name,
            "linearAttribution": interaction.linearAttribution / (uniqueUsers.value?.length ?? 1),
            "firstAttribution": interaction.firstAttribution / (uniqueUsers.value?.length ?? 1),
            "lastAttribution": interaction.lastAttribution / (uniqueUsers.value?.length ?? 1), 
            "decayAttribution": interaction.decayAttribution / (uniqueUsers.value?.length ?? 1),
            "uShapedAttribution": interaction.uShapedAttribution / (uniqueUsers.value?.length ?? 1)
        }
    })
}

// watcher to watch if the date range is updated
watch(dateRange, (newVal, oldVal) => {
    if (isLargeFile.value) {
        $q.notify({
            message: 'Too many touchpoints to process, click submit to recalculate with new date range',
            color: 'negative',
            position: 'center'
        })
        touchpointsArray.value = [];
    } else {
        generateArray();
    }
})

watch(decayFactor, (newVal, oldVal) => {
    if (isLargeFile.value) {
        $q.notify({
            message: 'Too many touchpoints to process, click submit to recalculate with new decay factor',
            color: 'negative',
            position: 'center'
        })
        touchpointsArray.value = [];
    } else {
        generateArray();
    }
})

const onSubmit = async () => {
    isLoading.value = true; // Show loader

    try {
      await startProcessing(); // Await the completion of startProcessing
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      isLoading.value = false; // Hide loader, regardless of success or error
    }
};

const startProcessing = () => {
  return new Promise<void>((resolve, reject) => {
    if (upload.value instanceof File) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const csvText = e.target?.result;
        
        Papa.parse(csvText, {
          complete: (result: { data: touchPoint[] | undefined; }) => {
            touchpointsArray.value = result.data; // Assuming the structure matches your touchPoint[] type
            generateArray(); // Call generateArray once parsing is complete
            resolve(); // Resolve the promise once parsing is complete
          },
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });
      };

      reader.onerror = (error) => {
        console.error('Error reading CSV:', error);
        reject(error); // Reject the promise on error
      };
      
      reader.readAsText(upload.value);
    } else {
      console.error('Upload is not a file');
      reject(new Error('Upload is not a file')); // Reject the promise if no file is uploaded
    }
  });
};

const tableColumns = ref([
    { name: 'name', label: 'Interaction type', field: 'name', sortable: true },
    { name: 'firstAttribution', label: 'First touchpoint', field: 'firstAttribution', sortable: true, format: (val: number, row: any) => `${(val * 100).toFixed(1)}%` },
    { name: 'lastAttribution', label: 'Last touchpoint', field: 'lastAttribution', sortable: true, format: (val: number, row: any) => `${(val * 100).toFixed(1)}%` },
    { name: 'linearAttribution', label: 'Linear', field: 'linearAttribution', sortable: true, format: (val: number, row: any) => `${(val * 100).toFixed(1)}%` },
    { name: 'decayAttribution', label: 'Decay', field: 'decayAttribution', sortable: true, format: (val: number, row: any) => `${(val * 100).toFixed(1)}%` },
    { name: 'uShapedAttribution', label: 'U-shaped', field: 'uShapedAttribution', sortable: true, format: (val: number, row: any) => `${(val * 100).toFixed(1)}%` }
])

const consoleLog = async () => {
   console.log("Debug here")
}

const generateSeries = async () => {
    console.log("Generating series")
};
</script>
  
<style scoped>
.card-words {
    line-height: 35px;
}
</style>
  