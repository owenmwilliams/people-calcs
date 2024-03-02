<template>
  <q-layout view="lHh Lpr lFf" class="siche">
    <q-header>
      <q-toolbar class="text-center">
        <q-toolbar-title class="text-h3 q-pa-md baus text-weight-bold" >
          Workforce Calculators
        </q-toolbar-title>
        
      </q-toolbar>
      <q-tabs>
        <q-route-tab :exact="false" to="/blog/introduction" label="Blog" />
        <q-route-tab :exact="false" :to="{ name: 'calculators-grid' }" label="Calculators" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
