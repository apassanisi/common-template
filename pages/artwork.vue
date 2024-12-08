<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-4xl font-bold mb-4">Artwork</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" v-for="artwork in artworks" :key="artwork.id" class="mb-8">
        <v-card>
          <v-img :src="artwork.image" alt="Artwork Image" class="mb-4" />
          <v-card-title>{{ artwork.title }}</v-card-title>
          <v-card-subtitle class="text-gray-700 mb-4">{{ artwork.description }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Artwork } from '~/types';

const artworks = ref<Artwork[]>([]);

onMounted(() => {
  // Mock data for artworks
  artworks.value = [
    {
      id: '1',
      title: 'Sunset Over the Mountains',
      description: 'A beautiful sunset over the mountains.',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: '2',
      title: 'City Skyline',
      description: 'A stunning view of the city skyline at night.',
      image: 'https://via.placeholder.com/400x300',
    },
    // Add more mock artworks as needed
  ];
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  h1 {
    font-size: 3rem;
  }
}

.v-card {
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .v-card {
    margin-bottom: 2rem;
  }
}
</style>
