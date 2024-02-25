<template>
    <q-card class="align-center" style="width: 100%; height:100%;">
        <q-card-section class="text-h4 text-center text-weight-bold">
            Incoming Class Calculator
        </q-card-section>
        <q-card-section horizontal class="row">
            <div class="col-3 q-pa-lg">
                <div class="row q-mb-md">
                    <q-input class="col-6 q-pa-sm" v-model.number="totalPoolSize" type="number" label="Total pool size" :rules="[validatePositive]" />
                    <q-input class="col-6 q-pa-sm" v-model.number="targetTimeFrame" type="number" label="Target time frame" :rules="[validatePositive]" suffix="years" />
                </div>
                
                <q-badge color="secondary">
                    Annual retention rate: {{ retentionRate }}%
                </q-badge>
                <q-slider
                    v-model="retentionRate"  
                    :min="0"
                    :max="100"
                    :step="1"
                    label
                    :label-value="retentionRate + '%'"
                    color='grey-8'
                />
                <q-badge color="secondary">
                    Average 'fit' rate: {{ fitRate }}%
                </q-badge>
                <q-slider
                    v-model="fitRate"  
                    :min="0"
                    :max="100"
                    :step="1"
                    label
                    :label-value="fitRate + '%'"
                    color='grey-8'
                />
                <q-badge color="secondary">
                    Average ramp time: {{ rampTime }} months
                </q-badge>
                <q-slider
                    v-model="rampTime"  
                    :min="0"
                    :max="12"
                    :step="1"
                    label
                    :label-value="rampTime + 'months'"
                    color='grey-8'
                />

                <q-card flat>
                    <q-card-section class="card-words">
                        To achieve a target pool of {{ totalPoolSize }} productive FTEs within the time frame of {{ targetTimeFrame }} years, you will need to bring in an average of <span class="text-weight-medium text-h6 text-accent">{{ requiredIncomingClass }} new hires</span> per year.
                    </q-card-section>
                    <q-card-actions align="right">
                            <q-btn flat color="primary" label="Generate graph" @click="generateSeries" />
                    </q-card-actions>
                </q-card>
                
            </div>
            <div class="col-9 q-pa-lg">
                <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
            </div>
        </q-card-section>
    </q-card>
</template>
  
<script setup lang="ts">
import { ref, computed, Ref } from 'vue';

const totalPoolSize = ref<number>(100);
const retentionRate = ref<number>(90);
const fitRate = ref<number>(80);
const rampTime = ref<number>(6);
const targetTimeFrame = ref<number>(5);
const requiredIncomingClass = computed(() => {
    const incomingClass = 
    (totalPoolSize.value) / 
    (
        (((((retentionRate.value/100)**(targetTimeFrame.value)) - 1)/(retentionRate.value/100 - 1)) - 
        (rampTime.value / 12))*
        (fitRate.value/ 100)*
        (retentionRate.value  /100)
    )

    return Math.ceil(incomingClass)
})

const validatePositive = (val: number) => val > 0 || 'Value must be greater than 0';

interface YearSeries {
    name: string,
    incomingClass: number,
    previousClass: number,
    attrition: number,
    unfit: number,
    onRamp: number,
    productiveFTE: number
}

const consoleLog = async () => {
   console.log("Debug here")
}

const generateSeries = async () => {
    let array: YearSeries[] = []
    
    for (let i = 0; i < targetTimeFrame.value; i++) {
        let name = `Year ${i+1}`
        let incomingClass = requiredIncomingClass.value
        let previousClass = i === 0 ? 0 : Math.round(array[i-1].unfit + array[i-1].onRamp + array[i-1].productiveFTE)
        let attrition = Math.round((previousClass + incomingClass) * (1 - retentionRate.value/100))
        let unfit = Math.round((previousClass + incomingClass - attrition) * (1 - (fitRate.value/100)))
        let onRamp = Math.round(incomingClass * (retentionRate.value/100) * (fitRate.value/100) * rampTime.value / 12)
        let productiveFTE = incomingClass + previousClass - attrition - unfit - onRamp

        array.push({
            name: name,
            incomingClass: incomingClass,
            previousClass: previousClass,
            attrition: attrition,
            unfit: unfit,
            onRamp: onRamp,
            productiveFTE: productiveFTE
        })
    }

    const calcSeries = [
        {
            name: 'Attrition',
            data: await array.map((i) => -1*(i.attrition))
        },
        {
            name: 'Unfit',
            data: await array.map((i) => -1*(i.unfit))
        },
        {
            name: 'On Ramp',
            data: await array.map((i) => -1*(i.onRamp))
        },
        {
            name: 'Productive FTE',
            data: await array.map((i) => i.productiveFTE)
        }
    ]

    const calcX = await array.map((i) => i.name)

    series.value = calcSeries
    xAxis.value = calcX
    
    return { calcSeries, calcX }
};

const xAxis: Ref<Array<string>> = ref(["No data"])
const series = ref([
    {
      name: 'Attrition',
      data: [0]
    },
    {
      name: 'Unfit',
      data: [0]
    },
    {
      name: 'On Ramp',
      data: [0]
    },
    {
      name: 'Productive FTE',
      data: [0]
    }
]);


const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    categories: xAxis.value, // This now reacts to changes in xAxis
  },
  legend: {
    show: false
  },
  fill: {
    opacity: 1,
    colors: ["#ff6e42", "#f7c9ba", "#b0c0c9", "#3a4750", "#6a7e8a"]
  }
}));


</script>
  
<style scoped>
.card-words {
    line-height: 35px;
}
</style>
  