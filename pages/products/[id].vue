<template>
  <v-container>
    <v-btn @click="goBack" color="primary" class="mb-4">
      <v-icon left>mdi-arrow-left</v-icon> Back
    </v-btn>
    <v-row>
      <v-col cols="12" class="text-center">
        <div v-if="loading">
          <p>Loading product details...</p>
        </div>
        <div v-else-if="product">
          <h1 class="text-4xl font-bold mb-4">{{ product.title }}</h1>
          <v-img :src="product.image" alt="Product Image" class="mx-auto mb-4" />
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
        <div v-else>
          <p>Product not found.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useContentful } from '~/composables/useContentful';
import SnipcartButton from '~/components/SnipcartButton.vue';
import type { Product } from '~/types';

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const loading = ref(true);
const { fetchProductById } = useContentful();

onMounted(async () => {
  product.value = await fetchProductById(route.params.id as string);
  loading.value = false;
});

function goBack() {
  router.back();
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  h1 {
    font-size: 3rem;
  }
}

.v-btn {
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .v-btn {
    margin-bottom: 2rem;
  }
}
</style>