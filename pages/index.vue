<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="text-center">
        <h1 class="text-red-400 text-4xl font-bold mb-4">{{ aboutContent.title }}</h1>
        <img :src="aboutContent.image" alt="About Image" v-if="aboutContent.image" class="mx-auto mb-4" />
        <div v-html="aboutContent.richTextHtml" class="prose mx-auto"></div>
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
        </div>
      </div>
      <div v-else class="text-center mt-8">
        <p>No products available at the moment.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContentful } from '~/composables/useContentful';

const loading = ref(true);
const aboutContent = ref<any>(null);
const products = ref<any[]>([]);

const { fetchAboutContent, fetchProducts } = useContentful();

onMounted(async () => {
  const about = await fetchAboutContent();
  const productList = await fetchProducts();
  aboutContent.value = about;
  products.value = productList;
  loading.value = false;
});
</script>
