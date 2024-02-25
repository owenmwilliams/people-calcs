<template>
    <q-page class="flex flex-center">
      <div>
        <div class="text-h5 q-my-md">About Us</div>
        <p>
          We work with people, talent and HR teams to build the analytics they need to build better teams. All tools on this website are provided free of charge.
        </p>
  
        <div class="text-h6 q-my-md">Get in Touch</div>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="contact.name" label="Your Name" />
          <q-input filled v-model="contact.email" label="Your Email" />
          <q-input filled v-model="contact.message" type="textarea" label="Your Message" />
          <q-btn label="Submit" type="submit" color="primary" />
        </q-form>
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const weLikeArray = [
    'to make things more efficient',
    'to make things more effective',
    'to make things more productive',
    'to make things more profitable',
    'to make things more sustainable',
    'to make things more equitable',
    'to make things more inclusive',
    'to make things more diverse',
    'to make things more fun',
    'to make things more interesting',
    'to make things more engaging',
    'to make things more meaningful',
    'to make things more impactful',
    'to make things more valuable',
    'to make things more beautiful',
    'to make things more inspiring',
    'to make things more innovative',
    'to make things more creative',
    'to make things more collaborative',
    'to make things more connected',
    'to make things more accessible',
    'to make things more convenient',
    'to make things more reliable',
    'to make things more secure',
    'to make things more private',
    'to make things more transparent',
    'to make things more accountable',
    'to make things more ethical',
    'to make things more responsible',
    'to make things more sustainable',
    'to make things more resilient',
    'to make things more adaptable',
    'to make things more flexible',
    'to make things more scalable',
    'to make things'
  ]
  
  interface ContactForm {
    name: string;
    email: string;
    message: string;
  }
  
  const contact = ref<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  
  const onSubmit = () => {
    console.log(contact.value);
    // Implement your submission logic here, e.g., sending data to an API
  };
  </script>
  
  <style scoped>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  </style>
  