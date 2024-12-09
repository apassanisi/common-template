<template>
  <div class="flex items-center justify-center relative">
    <button @click="prevImage" class="bg-none border-none text-black text-2xl cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-0">
      <ChevronLeftIcon class="w-8 h-8" />
    </button>
    <img :src="images[currentIndex]" alt="" class="max-w-full max-h-80vh rounded-lg shadow-lg" />
    <button @click="nextImage" class="bg-none border-none text-black text-2xl cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-0">
      <ChevronRightIcon class="w-8 h-8" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline';

const props = defineProps<{ images: string[], startIndex: number }>();
const currentIndex = ref(props.startIndex);

watch(() => props.startIndex, (newIndex) => {
  currentIndex.value = newIndex;
});

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};
</script>