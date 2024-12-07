<template>
  <div class="container mx-auto p-4">
    <div class="text-center">
      <h1 class="text-red-400 text-4xl font-bold mb-4">{{ title }}</h1>
      <img :src="image" alt="About Image" v-if="image" class="mx-auto mb-4" />
      <div v-html="richTextHtml" class="prose mx-auto"></div>
    </div>
    <div hidden id="snipcart" :data-api-key="snipcartApiKey"></div>
    <div v-if="items.length" class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div v-for="item in items" :key="item.id" class="border p-4 rounded">
        <img
          :src="item.image"
          alt="Product Image"
          class="w-full h-48 object-cover mb-4"
        />
        <h2 class="text-xl font-bold mb-2">{{ item.name }}</h2>
        <p class="text-gray-700 mb-4">{{ item.description }}</p>
        <p class="text-lg font-semibold mb-4">${{ item.price }}</p>
        <button
          class="snipcart-add-item bg-blue-500 text-white py-2 px-4 rounded"
          :data-item-id="item.id"
          :data-item-price="item.price"
          :data-item-url="item.url"
          :data-item-description="item.description"
          :data-item-image="item.image"
          :data-item-name="item.name"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else class="text-center mt-8">
      <p>No products available at the moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "contentful";
import type { Entry, Asset } from "contentful";
import { useRuntimeConfig } from "#app";
import { ref, onMounted } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpaceId,
  accessToken: config.public.contentfulAccessToken,
});

interface AboutFields extends Entry {
  contentTypeId: string;
  copy: any;
  image: Asset | null;
  title: string;
}

const copy = ref<AboutFields["copy"] | null>(null);
const image = ref<string | null>(null);
const title = ref<string | null>(null);
const richTextHtml = ref<string | null>(null);
const snipcartApiKey = config.public.snipcartApiKey;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
}

interface ProductFields extends Entry {
  contentTypeId: string;
  title: string;
  id: number;
  price: number;
  stock: number;
  image: { fields: { file: { url: string } } } | null;
}

const items = ref<Product[]>([]);

useHead({
  title: "About",
  meta: [
    {
      name: "description",
      content: "About page",
    },
  ],
  script: [
    {
      src: "https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js",
      async: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css",
    },
  ],
});

onMounted(async () => {
  try {
    // Fetch About content from Contentful
    await fetchAboutContent();

    // Fetch products from Contentful
    await fetchProducts();
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
});

async function fetchAboutContent() {
  const response = await client.getEntries<AboutFields>({
    content_type: "about",
  });
  if (response.items.length > 0) {
    const data = response.items[0].fields;
    copy.value = data.copy;
    image.value = data.image?.fields.file.url || null; // Access the image URL
    title.value = data.title;
    richTextHtml.value = documentToHtmlString(data.copy);
  } else {
    console.warn('No entries found for content type "about".');
  }
}

async function fetchProducts() {
  const response = await client.getEntries<ProductFields>({
    content_type: "product",
  });
  if (response.items.length > 0) {
    items.value = response.items.map((item) => ({
      id: `${item.fields.id}`,
      name: item.fields.title,
      description: item.fields.title, // Assuming description is the same as title
      price: item.fields.price,
      image: item.fields.image?.fields.file.url || '',
      url: `/products/${item.fields.id}`, // Assuming URL is generated based on product ID
    }));
  } else {
    console.warn('No entries found for content type "product".');
  }
}
</script>
