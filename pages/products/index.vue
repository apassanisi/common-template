<template>
  <section v-if="loading" class="flex justify-center items-center min-h-screen">
    <p>Loading...</p>
  </section>
  <section v-else>
    <h2 class="text-lg font-bold mb-2">Products</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <li v-for="product in products" :key="product.id" class="bg-black-light shadow-md rounded-lg overflow-hidden">
        <a :href="product.url">
          <img :src="product.image" alt="" class="w-full h-auto mb-2" />
          <div class="p-4">
            <h3 class="text-md font-semibold">{{ product?.title }}</h3>
            <p>{{ product?.description }}</p>
            <p class="font-bold">{{ currency(product?.price) }}</p>
            <ShoppingCartIcon class="w-5 h-5 inline-block" />
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContentful } from '~/composables/useContentful';
import type { Product } from '~/types';
import { ShoppingCartIcon } from '@heroicons/vue/outline';

const products = ref<Product[]>([]);
const loading = ref(true);
const { fetchProducts } = useContentful();

onMounted(async () => {
  try {
    products.value = [
      { id: 1, title: 'Placeholder Product 1', description: 'Description for product 1', price: 10, image: 'placeholder-image-1.jpg', url: '#' },
      { id: 2, title: 'Placeholder Product 2', description: 'Description for product 2', price: 20, image: 'placeholder-image-2.jpg', url: '#' },
      // ...more placeholder products...
    ];
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
