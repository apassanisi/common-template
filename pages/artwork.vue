<template>
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold mb-4">Artwork</h1>
  </div>
  <div class="flex flex-wrap -mx-4">
    <div v-for="artwork in artworks" :key="artwork.id" class="w-full md:w-1/2 p-4 mb-8">
      <div class="bg-black-light shadow-md rounded-lg overflow-hidden">
        <img :src="artwork.image" alt="Artwork Image" class="w-full h-auto mb-4" />
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ artwork.title }}</h2>
          <p class="text-lavender mb-4">{{ artwork.description }}</p>
          <PhotographIcon class="w-5 h-5 inline-block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContentful } from '~/composables/useContentful';
import type { Artwork } from '~/types';
import { PhotographIcon } from '@heroicons/vue/outline';

const artworks = ref<Artwork[]>([]);
const loading = ref(true);
const { fetchArtworks } = useContentful();

onMounted(async () => {
  artworks.value = [
    { id: 1, title: 'Placeholder Artwork 1', description: 'Description for artwork 1', image: 'placeholder-artwork-1.jpg' },
    { id: 2, title: 'Placeholder Artwork 2', description: 'Description for artwork 2', image: 'placeholder-artwork-2.jpg' },
    // ...more placeholder artworks...
  ];
  loading.value = false;
});
</script>
