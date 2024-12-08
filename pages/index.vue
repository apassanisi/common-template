<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 v-if="aboutContent" class="text-4xl font-bold mb-4">{{ aboutContent.title }}</h1>
        <v-img v-if="aboutContent && aboutContent.image" :src="aboutContent.image" alt="About Image" class="mx-auto mb-4" />
        <div v-if="aboutContent" v-html="aboutContent.richTextHtml" class="prose mx-auto"></div>
      </v-col>
    </v-row>
    <v-row v-if="products && products.length" class="mt-8">
      <v-col v-for="product in products" :key="product.id" cols="12" md="4">
        <v-card>
          <v-img :src="product.image" alt="Product Image" class="mb-4" />
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle class="text-gray-700 mb-4">{{ product.description }}</v-card-subtitle>
          <v-card-text class="text-lg font-semibold mb-4">${{ product.price }}</v-card-text>
          <v-card-actions>
            <router-link :to="`/products/${product.id}`">
              <v-btn color="primary">View Details</v-btn>
            </router-link>
            <SnipcartButton
              :id="product.id"
              :price="product.price"
              :image="product.image"
              :name="product.title"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="text-center mt-8">
      <v-col cols="12">
        <p>No products available at the moment.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContentful } from '~/composables/useContentful';
import SnipcartButton from '~/components/SnipcartButton.vue';
import type { Product, AboutFields } from '@/types';

const loading = ref(true);
const aboutContent = ref<AboutFields | null>(null);
const products = ref<Product[]>([]);

const { fetchAboutContent, fetchProducts } = useContentful();

onMounted(async () => {
  aboutContent.value = await fetchAboutContent();
  products.value = await fetchProducts();
  loading.value = false;
});
</script>
