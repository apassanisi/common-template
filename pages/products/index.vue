<template>
  <div class="container mx-auto p-4">
    <div class="text-center">
      <h1 class="text-red-400 text-4xl font-bold mb-4">Products</h1>
    </div>
    <div v-if="products && products.length" class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div v-for="product in products" :key="product.id" class="border p-4 rounded">
        <router-link :to="`/products/${product.id}`">
          <img
            :src="product.image"
            alt="Product Image"
            class="w-full h-48 object-cover mb-4"
          />
          <h2 class="text-xl font-bold mb-2">{{ product.title }}</h2>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <p class="text-lg font-semibold mb-4">${{ product.price }}</p>
        </router-link>
        <SnipcartButton
          :id="product.id"
          :price="product.price"
          :description="product.description"
          :image="product.image"
          :name="product.title"
        />
      </div>
    </div>
    <div v-else class="text-center mt-8">
      <p>No products available at the moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContentful } from '~/composables/useContentful';
import SnipcartButton from '~/components/SnipcartButton.vue';
import type { Product } from '~/types';

const products = ref<Product[]>([]);
const loading = ref(true);
const { fetchProducts } = useContentful();

onMounted(async () => {
  products.value = await fetchProducts();
  loading.value = false;
});
</script>