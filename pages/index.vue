<template>
  <div class="">
    <main class="flex-grow container mx-auto p-4">
      <section v-if="loading" class="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </section>
      <section v-else>
        <ul class="flex flex-wrap">
          <li v-for="(artwork, index) in artworks" :key="artwork.id" class="w-full sm:w-1/2 md:w-1/3 p-2 cursor-pointer" @click="openModal(index)">
            <img :src="artwork.image" alt="" class="w-full h-64 object-cover" />
          </li>
        </ul>
      </section>
      <section v-if="!loading && contact" class="text-center">
        <h2 class="text-lg font-bold mb-2">Contact</h2>
        <p>{{ contact?.name }}</p>
        <ul class="flex justify-center space-x-4 mt-4">
          <li v-for="link in contact?.socialMediaLinks" :key="link.fields.url">
            <a :href="link.fields.url" target="_blank">
              <i :class="`fab fa-${link.fields.platform.toLowerCase()}`">{{ link.fields.platform }}</i>
            </a>
          </li>
        </ul>
      </section>
    </main>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div class="relative bg-black-light p-4 rounded-lg max-w-3xl w-full">
        <button @click="closeModal" class="absolute top-2 right-2 text-lavender">&times;</button>
        <carousel :images="artworks.map(artwork => artwork.image)" :startIndex="currentImageIndex" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContentful } from '~/composables/useContentful';
import type { Artwork, Contact } from '~/types';
import Carousel from '~/components/Carousel.vue';

const artworks = ref<Artwork[]>([]);
const contact = ref<Contact | null>(null);
const loading = ref(true);
const isModalOpen = ref(false);
const currentImageIndex = ref(0);
const { fetchArtworks, fetchContact } = useContentful();

onMounted(async () => {
  try {
    artworks.value = [
      { id: 1, image: 'placeholder-artwork-1.jpg' },
      { id: 2, image: 'placeholder-artwork-2.jpg' },
      // ...more placeholder artworks...
    ];
    contact.value = {
      name: 'Placeholder Contact',
      socialMediaLinks: [
        { fields: { url: '#', platform: 'facebook' } },
        { fields: { url: '#', platform: 'twitter' } },
        // ...more placeholder links...
      ],
    };
  } finally {
    loading.value = false;
  }
});

const openModal = (index: number) => {
  currentImageIndex.value = index;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
