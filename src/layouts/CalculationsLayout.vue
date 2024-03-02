<template>
    <div class="row inline no-wrap full-width">
        <q-list class="col-2">
            <q-item 
                clickable 
                v-ripple 
                v-for="choice in calculatorChoiceOptions" 
                :key="choice" 
                :disable="choice == props.calculator"
                :active="choice == props.calculator"
                active-class="bg-accent text-white"
                @click="pushToCalculator(choice)">
                <q-item-section>{{ choice.charAt(0).toUpperCase() + choice.slice(1).replace("-", " ") }}</q-item-section>
            </q-item>
        </q-list>
        <div class="col-10 col-grow q-pa-md">
            <AttritionCalc v-if="props.calculator == 'class-builder'" />
            <ChannelCalc v-else-if="props.calculator == 'recruitment-channel'" />
            <BuildInProgress v-else />
        </div>
    </div>
  </template>

<script setup lang="ts">
import AttritionCalc from 'src/pages/calculators/AttritionCalc.vue';
import ChannelCalc from 'src/pages/calculators/ChannelCalc.vue';
import BuildInProgress from 'src/pages/BuildInProgress.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    calculator: string;
  }>();

  const pushToCalculator = (calculator: string) => {
    console.log('pushing to calculator')
    console.log('calculator', calculator)
    router.push({ name: 'calculators', params: {calculator: calculator.toLowerCase().replace(/ /g, "-")} })
  }

//   const calculatorChoice = ref('Class builder');
  const calculatorChoiceOptions = ['class-builder', 'recruitment-channel'] //'Reduction in Force', 'Succession Planning', 'Workforce Planning'];

    const leftDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
    };
</script>