<template>
    <q-card class="align-center" style="width: 100%; height:100%;">
        <q-card-section class="text-h4 text-center text-weight-bold">
            Recruitment Channel Calculator
        </q-card-section>
        <q-card-section horizontal class="row">
            <div class="col-3 q-pa-lg">
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
                        <!-- <q-btn flat color="primary" label="Generate graph" @click="generateSeries" /> -->
                    </q-card-actions>
                </q-card>
                
            </div>
            <div class="col-9 q-pa-lg">
                <!-- {{ touchpointsArray }} -->
                <!-- {{ decayFactor }} -->
                <!-- {{ dateRange }} -->
                <!-- {{ uniqueUsers }} -->
                <!-- {{ uniqueInteractions }} -->
                <!-- {{ attribution }} -->
                <!-- {{ tableColumns }} -->

                <q-table
                    :rows="attribution"
                    :columns="tableColumns"
                    row-key="name"
                    :rows-per-page-options="[10, 25, 50]"
                />

                <!-- <apexchart type="bar" :options="chartOptions" :series="series"></apexchart> -->
            </div>
        </q-card-section>
    </q-card>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import Papa from 'papaparse';

interface touchPoint {
    interaction: string,
    user_id: number,
    date: string
}

const decayFactor = ref<number>(80);
const touchpointsArray = ref<touchPoint[]>();
const dateRange = ref<any>();
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
        console.log(touchpointsArray.value); // You can remove this line; it's just for demonstration
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
                        // (1-$S$3)
                        // /(1-$S$3^G2)
                        // *$S$3^(F2-D2)
                        // /2
                        
                        object.uShapedAttribution = object.uShapedAttribution + 
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, Math.ceil(tempInteractionsLength / 2))) 
                        * Math.pow(decayDecimal, (tempInteractionsLength - (j + 1))) / 2;
                    } else {
                        // (1-$S$3)
                        // /(1-$S$3^G2)
                        // *$S$3^(D2-1)
                        // /2
                        object.uShapedAttribution = object.uShapedAttribution + 
                        (1 - decayDecimal) 
                        / (1 - Math.pow(decayDecimal, Math.ceil(tempInteractionsLength / 2))) 
                        * Math.pow(decayDecimal, j) / 2;
                    }
                } else {
                    // ODD
                    if ((j+1) < Math.ceil((tempInteractions?.length ?? 0) / 2)) {

                        // FROM EXCEL

                        // (
                        // (1-$S$3)
                        // /(1-$S$3^F2)
                        // *$S$3^(D2*2-2)
                        // /2
                        // )
                        
                        // +

                        // (
                        // (1-$S$3)
                        // /(1-$S$3^F2)
                        // *$S$3^(D2*2-1)
                        // /2
                        // )

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
                        
                        // FROM EXCEL

                        // (
                        // (1-$S$3)
                        // /(1-$S$3^F2)
                        // *$S$3^((F2-D2)*2
                        // /2
                        // )
                        
                        // +
                        
                        // (
                        // (1-$S$3)
                        // /(1-$S$3^F2)
                        // *$S$3^((F2-D2)*2+1)
                        // /2
                        // )

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
                        
                        // FROM EXCEL

                        // (1-$S$3)
                        // /(1-$S$3^F2)
                        // *$S$3^(F2-1)
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
    generateArray();
})

watch(decayFactor, (newVal, oldVal) => {
    generateArray();
})

// const tableColumns = ref(generateColumns(attribution.value ?? []));
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
  