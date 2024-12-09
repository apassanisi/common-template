<template>
  <footer class="bg-black text-lavender text-center p-4 font-sans">
    {{ siteTitle }} © {{ new Date().getFullYear() }}
    <HeartIcon class="w-5 h-5 inline-block" />
  </footer>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { ref } from 'vue';
import { HeartIcon } from '@heroicons/vue/outline';

const config = useRuntimeConfig();
const siteTitle = ref('Placeholder Site Title');
</script>