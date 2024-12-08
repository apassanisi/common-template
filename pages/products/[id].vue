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
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { createClient } from 'contentful';
import { useRuntimeConfig } from '#app';
import type { Product, ProductFields } from '~/types';
import SnipcartButton from '~/components/SnipcartButton.vue';

const route = useRoute();
const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpaceId,
  accessToken: config.public.contentfulAccessToken,
});

const product = ref<Product | null>(null);
const loading = ref(true);

onMounted(async () => {
  const productId = route.params.id as string;
  try {
    const response = await client.getEntries<ProductFields>({
      content_type: 'product',
      'fields.id': productId,
    });

    if (response.items.length > 0) {
      const item = response.items[0].fields;
      product.value = {
        id: `${item.id}`,
        title: item.title,
        description: item.description, // Correctly fetch description
        price: item.price,
        image: item.image?.fields.file.url || '',
        url: `/products/${item.id}`, // Use dynamic route
      };
      console.log('Product data:', product.value); // Log product data
    } else {
      console.warn('No entries found for product ID:', productId);
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  } finally {
    loading.value = false;
  }
});
</script>