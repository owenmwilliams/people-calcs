<template>
    <div class="q-pa-md">
      <q-card clickable ripple @click="pushToCalculator(item.name)" v-for="item in items" :key="item.title" class="my-card q-ma-md">
        <q-img :src="item.image" class="card-image" />
        <q-card-section>
          <div class="text-h6 text-weigh-bold">{{ item.title }}</div>
          <div class="text-caption">{{ item.description }}</div>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
    import { useRouter } from 'vue-router';
  
  interface CardItem {
    title: string;
    description: string;
    image: string;
    name: string;
  }
  
  const items = ref<CardItem[]>([
    { title: 'Class builder', description: 'Calculates the number of new hires needed to reach a certain class size.', image: 'https://storage.googleapis.com/people-calcs-images/class-builder', name: 'class-builder' },
    { title: 'Recruitment channel', description: 'Assesses the attribution of certain touchpoints for each hire.', image: 'https://storage.googleapis.com/people-calcs-images/recruitment-channel', name: 'recruitment-channel' },
    // Add more items as needed
  ]);

  const router = useRouter();

  const pushToCalculator = (calculator: string) => {
    router.push({ name: 'calculators', params: {calculator: calculator} })
  }
  </script>
  
  <style>
  .my-card {
    width: 300px;
    display: inline-block;
  }
  
  .card-image {
    height: 200px;
  }
  </style>
  