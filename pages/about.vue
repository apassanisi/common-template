<template>
  <section v-if="loading" class="flex justify-center items-center min-h-screen">
    <p>Loading...</p>
  </section>
  <section v-else class="bg-black-light shadow-md rounded-lg p-4">
    <h2 class="text-lg font-bold mb-2">{{ aboutData?.title }}</h2>
    <img :src="aboutData?.image" alt="" class="w-1/2 h-auto mb-2 mx-auto" />
    <div v-html="aboutData?.richTextHtml" class="text-sm"></div>
    <InformationCircleIcon class="w-5 h-5 inline-block" />
  </section>
  <section v-if="!loading && contact" class="text-center">
    <h2 class="text-lg font-bold mb-2">Contact</h2>
    <p>{{ contact?.name }}</p>
    <ul class="flex justify-center space-x-4 mt-4">
      <li v-for="link in contact?.socialMediaLinks" :key="link.fields.url">
        <a :href="link.fields.url" target="_blank">
          <i :class="`fab fa-${link.fields.platform.toLowerCase()}`"></i>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useContentful } from '~/composables/useContentful';
import type { About } from '~/types';
import { InformationCircleIcon } from '@heroicons/vue/outline';

const aboutData = ref<About | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    aboutData.value = {
      title: 'Placeholder About Title',
      image: 'placeholder-about-image.jpg',
      richTextHtml: '<p>Placeholder rich text content</p>',
    };
  } finally {
    loading.value = false;
  }
});
</script>
