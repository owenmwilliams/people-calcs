<template>
    <div class="row inline no-wrap full-width">
        <q-list class="col-2">
            <q-item 
                clickable 
                v-ripple 
                v-for="choice in calculatorChoiceOptions" 
                :key="choice" 
                :disable="choice == calculatorChoice"
                :active="choice == calculatorChoice"
                active-class="bg-accent text-white"
                @click="calculatorChoice = choice">
                <q-item-section>{{ choice }}</q-item-section>
            </q-item>
        </q-list>
        <div class="col-10 col-grow q-pa-md">
            <AttritionCalc v-if="calculatorChoice == 'Class builder'" />
            <ChannelCalc v-if="calculatorChoice == 'Recruitment channel'" />
            <BuildInProgress v-else />
        </div>
    </div>
  </template>

<script setup lang="ts">
import AttritionCalc from 'src/pages/AttritionCalc.vue';
import ChannelCalc from 'src/pages/ChannelCalc.vue';
import BuildInProgress from 'src/pages/BuildInProgress.vue';

import { ref } from 'vue';

  const calculatorChoice = ref('Class builder');
  const calculatorChoiceOptions = ['Class builder', 'Recruitment channel', 'Reduction in force'] //'Reduction in Force', 'Succession Planning', 'Workforce Planning'];

    const leftDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
    };
</script>