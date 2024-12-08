<template>
  <div class="container mx-auto p-4">
    <div class="text-center">
      <h1 class="text-red-400 text-4xl font-bold mb-4">Products</h1>
    </div>
    <div v-if="items && items.length" class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div v-for="item in items" :key="item.id" class="border p-4 rounded">
        <router-link :to="`/products/${item.id}`">
          <img
            :src="item.image"
            alt="Product Image"
            class="w-full h-48 object-cover mb-4"
          />
          <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
          <p class="text-gray-700 mb-4">{{ item.description }}</p>
          <p class="text-lg font-semibold mb-4">${{ item.price }}</p>
        </router-link>
        <SnipcartButton
          :id="item.id"
          :price="item.price"
          :url="item.url"
          :description="item.description"
          :image="item.image"
          :name="item.title"
        />
      </div>
    </div>
    <div v-else class="text-center mt-8">
      <p>No products available at the moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "contentful";
import { useRuntimeConfig } from "#app";
import { ref, onMounted } from "vue";
import type { Product, ProductFields } from '~/types';
import SnipcartButton from '~/components/SnipcartButton.vue';

const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpaceId,
  accessToken: config.public.contentfulAccessToken,
});

const items = ref<Product[]>([]);

onMounted(async () => {
  try {
    // Fetch products from Contentful
    await fetchProducts();
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
});

async function fetchProducts() {
  const response = await client.getEntries<ProductFields>({
    content_type: "product",
  });
  if (response.items.length > 0) {
    items.value = response.items.map((item) => ({
      id: `${item.fields.id}`,
      title: item.fields.title,
      description: item.fields.title, // Assuming description is the same as title
      price: item.fields.price,
      image: item.fields.image?.fields.file.url || '',
      url: `/products/${item.fields.id}`, // Use dynamic route
    }));
    console.log('Product list:', items.value); // Log product list
  } else {
    console.warn('No entries found for content type "product".');
  }
}
</script>