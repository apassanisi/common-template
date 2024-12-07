<template>
  <header class="bg-gray-800 text-white p-4 sticky top-0 z-50">
    <nav class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">My E-commerce</router-link>
      <div class="hidden md:flex space-x-4">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/products" class="hover:underline">Products</router-link>
      </div>
      <button @click="toggleMenu" class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </nav>
    <div v-if="menuOpen" class="md:hidden bg-gray-800 text-white p-4">
      <router-link to="/" class="block py-2" @click="toggleMenu">Home</router-link>
      <router-link to="/products" class="block py-2" @click="toggleMenu">Products</router-link>
    </div>
  </header>
  <NuxtPage />
  <div hidden id="snipcart" :data-api-key="snipcartApiKey"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const snipcartApiKey = config.public.snipcartApiKey;
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

useHead({
  title: "Demo E-commerce",
  meta: [
    {
      name: "description",
      content: "A demo e-commerce site built with Nuxt.js",
    },
  ],
  script: [
    {
      src: "https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js",
      async: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css",
    },
  ],
});
</script>
