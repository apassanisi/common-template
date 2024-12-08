<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">
      <p>Loading product details...</p>
    </div>
    <div v-else-if="product" class="text-center">
      <h1 class="text-red-400 text-4xl font-bold mb-4">{{ product.title }}</h1>
      <img :src="product.image" alt="Product Image" class="mx-auto mb-4" />
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
      <p class="text-lg font-semibold mb-4">${{ product.price }}</p>
      <SnipcartButton
        :id="product.id"
        :price="product.price"
        :url="product.url"
        :description="product.description"
        :image="product.image"
        :name="product.title"
      />
    </div>
    <div v-else class="text-center">
      <p>Product not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useContentful } from '~/composables/useContentful';

const route = useRoute();
const product = ref<any>(null);
const loading = ref(true);
const { fetchProductById } = useContentful();

onMounted(async () => {
  product.value = await fetchProductById(route.params.id as string);
  loading.value = false;
});
</script>