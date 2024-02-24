<template>
    <!-- <q-layout view="lHh LpR lFf"> -->
      <!-- <q-drawer v-model="leftDrawerOpen" side="left" bordered> -->
        
      <!-- </q-drawer> -->
  
      <!-- <q-page-container> -->
        <div class="row inline no-wrap full-width">
            <q-list class="col-2">
                <q-item clickable v-ripple v-for="choice in calculatorChoiceOptions" :key="choice" :disable="choice == calculatorChoice" @click="calculatorChoice = choice">
                    <q-item-section>{{ choice }}</q-item-section>
                </q-item>
            </q-list>
            <div class="col-10 col-grow q-pa-md">
                <AttritionCalc v-if="calculatorChoice == 'Class Builder'" />
                <BuildInProgress v-else />
            </div>
            
        </div>
        
      <!-- </q-page-container> -->
  
    <!-- </q-layout> -->
  </template>

<script setup lang="ts">
import AttritionCalc from 'src/pages/AttritionCalc.vue';
import BuildInProgress from 'src/pages/BuildInProgress.vue';

import { ref } from 'vue';

  const calculatorChoice = ref('Class Builder');
  const calculatorChoiceOptions = ['Class Builder', 'Reduction in Force', 'Succession Planning', 'Workforce Planning'];

    const leftDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
    };
</script>