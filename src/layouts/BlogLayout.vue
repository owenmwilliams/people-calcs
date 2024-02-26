<template>
        <div class="row inline no-wrap full-width">
        <q-list class="col-2">
            <q-item
                clickable 
                v-ripple 
                v-for="blog in blogTitles" :key="blog"
                active-class="bg-accent text-white"
                :disable="blog.toLowerCase().replace(/ /g, '-') == props.post"
                :active="blog.toLowerCase().replace(/ /g, '-') == props.post"
                @click="navigate(blog.toLowerCase().replace(/ /g, '-'));"
            > 
                <q-item-section>{{ blog }}</q-item-section>
            </q-item>
        </q-list>
        <div class="col-10 col-grow q-pa-md">
            <IntroBlog v-if="props.post == 'introduction'" />
            <ClassBuilderBlog v-else-if="props.post == 'class-builder'" />
            <BuildInProgress v-else />
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
//   import router from 'src/router';
  import BuildInProgress from 'src/pages/BuildInProgress.vue';
  import IntroBlog from 'src/pages/blogs/IntroBlog.vue';
  import ClassBuilderBlog from 'src/pages/blogs/ClassBuilderBlog.vue';
    import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';

const router = useRouter();

  const blogTitles = ["Introduction", "Class Builder"]
  
  const props = defineProps<{
    post: string;
  }>();

  const navigate = (post: string) => {
    router.push({ name: 'blog', params: {post: post.toLowerCase().replace(/ /g, "-")} })
  }
  </script>
  
  <style scoped>
  /* Add any specific styling for your blog post component here */
  </style>
  