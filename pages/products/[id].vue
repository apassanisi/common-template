<template>
  <section v-if="loading" class="flex justify-center items-center min-h-screen">
    <p>Loading...</p>
  </section>
  <section v-else class="bg-black-light shadow-md rounded-lg p-4 flex flex-col md:flex-row">
    <img :src="product.image" alt="" class="w-full md:w-1/2 h-auto mb-4 md:mb-0 md:mr-4" />
    <div class="flex flex-col justify-between">
      <div>
        <h2 class="text-2xl font-bold mb-2">{{ product.title }}</h2>
        <p class="text-lg mb-4">{{ product.description }}</p>
        <p class="text-xl font-bold mb-4">{{ currency(product.price) }}</p>
        <ShoppingCartIcon class="w-5 h-5 inline-block" />
      </div>
      <SnipcartButton
          :id="product.id"
          :price="product.price"
          :description="product.description"
          :image="product.image"
          :name="product.title"
        />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useContentful } from '~/composables/useContentful';
import type { Product } from '~/types';
import SnipcartButton from '~/components/SnipcartButton.vue';
import { ShoppingCartIcon } from '@heroicons/vue/outline';

const route = useRoute();
const product = ref<Product | null>(null);
const loading = ref(true);
const { fetchProductById } = useContentful();

onMounted(async () => {
  try {
    product.value = {
      id: route.params.id as string,
      title: 'Placeholder Product',
      description: 'Description for placeholder product',
      price: 30,
      image: 'placeholder-image.jpg',
    };
  } finally {
    loading.value = false;
  }
});

const currency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
</script>
