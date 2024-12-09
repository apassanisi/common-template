<template>
  <header class="bg-black text-lavender p-4 flex justify-between items-center font-sans shadow-md">
    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold">{{ siteTitle }}</span>
    </div>
    <nav class="flex space-x-4">
      <a href="/" :class="{ 'text-black-light': isActive('/') }" class="hover:text-black-light transition">
        Home
      </a>
      <a href="/about" :class="{ 'text-black-light': isActive('/about') }" class="hover:text-black-light transition">
        About
      </a>
      <a href="/products" :class="{ 'text-black-light': isActive('/products') }" class="hover:text-black-light transition">
        Shop
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { useRoute } from 'vue-router';

// const config = useRuntimeConfig();
const siteTitle = 'Placeholder Site Title';
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>
