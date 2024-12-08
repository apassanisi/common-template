<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-4xl font-bold mb-4">Welcome to the Artist Portfolio & Shop</h1>
        <p class="text-lg mb-8">Explore the collection of artworks and shop your favorites.</p>
      </v-col>
    </v-row>
    <v-carousel>
      <v-carousel-item v-for="artwork in artworks" :key="artwork.id">
        <v-img :src="artwork.image" :alt="artwork.title"></v-img>
          <h3>{{ artwork.title }}</h3>
          <p>{{ artwork.description }}</p>
      </v-carousel-item>
    </v-carousel>
    <v-row class="mt-8" id="contact">
      <v-col cols="12" class="text-center">
        <h2 class="text-2xl font-bold mb-4">Contact</h2>
        <p class="text-lg mb-4">Feel free to reach out for commissions or inquiries.</p>
        <p class="text-lg mb-4">Email: artist@example.com</p>
        <p class="text-lg mb-4">Phone: (123) 456-7890</p>
        <v-btn color="primary" @click="openModal">Schedule a Call</v-btn>
      </v-col>
    </v-row>
    <div v-show="isModalOpen" class="fixed inset-0 bg-black flex items-center justify-center z-50" @click.self="closeModal">
      <Modal @close="closeModal">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">Schedule a Call</h2>
          <v-btn icon @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="calendly-inline-widget" :data-url="calendlyUrl"></div>
        </div>
      </Modal>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToggle } from '@vueuse/core';
import Modal from '~/components/Modal.vue';
import type { Artwork } from '~/types';
import { useRuntimeConfig } from '#app';
import { VCarousel, VCarouselItem, VImg } from 'vuetify/components';

const artworks = ref<Artwork[]>([]);
const [isModalOpen, toggleModal] = useToggle(false);
const config = useRuntimeConfig();
const calendlyUrl = ref(config.public.calendlyUrl || 'https://calendly.com/your-calendly-url');

onMounted(() => {
  // Mock data for artworks
  artworks.value = [
    {
      id: '1',
      title: 'Sunset Over the Mountains',
      description: 'A beautiful sunset over the mountains.',
      image: 'https://via.placeholder.com/800x600',
    },
    {
      id: '2',
      title: 'City Skyline',
      description: 'A stunning view of the city skyline at night.',
      image: 'https://via.placeholder.com/800x600',
    },
    // Add more mock artworks as needed
  ];
});

function openModal() {
  toggleModal(true);
}

function closeModal() {
  toggleModal(false);
}
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

.v-carousel-item {
  text-align: center;
}

.v-btn {
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .v-btn {
    margin-bottom: 2rem;
  }
}
</style>
