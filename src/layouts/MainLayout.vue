<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-center">
        <q-toolbar-title class="text-h5">
          Workforce Analytics
        </q-toolbar-title>
        
      </q-toolbar>
      <q-tabs>
        <q-route-tab to="/calculators" label="Calculators" />
        <q-route-tab to="/blog" label="Blog" />
        <q-route-tab to="/about" label="About" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
