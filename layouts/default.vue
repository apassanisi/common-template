<template>
  <div class="min-h-screen h-screen w-screen flex flex-col font-sans bg-black text-lavender">
    <Navbar />
    <main class="flex-grow container mx-auto p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
const config = useRuntimeConfig();
const siteTitle = 'Placeholder Site Title';
</script>