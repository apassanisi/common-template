<template>
  <button
    class="snipcart-add-item bg-blue-500 text-white py-2 px-4 rounded"
    :data-item-id="id"
    :data-item-price="price"
    :data-item-url="`/api/products/${id}`" 
    :data-item-image="image"
    :data-item-name="name"
  >
    Add to Cart
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface SnipcartButtonProps {
  id: string;
  price: number;
  image: string;
  name: string;
}

defineProps<SnipcartButtonProps>();
</script>