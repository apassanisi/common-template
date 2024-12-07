<template>
  <div class="container mx-auto p-4">
    <div class="text-center">
      <h1 class="text-red-400 text-4xl font-bold mb-4">{{ title }}</h1>
      <img :src="image" alt="About Image" v-if="image" class="mx-auto mb-4" />
      <div v-html="richTextHtml" class="prose mx-auto"></div>
    </div>
    <div hidden id="snipcart" :data-api-key="snipcartApiKey"></div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div v-for="item in items" :key="item.id" class="border p-4 rounded">
        <img :src="item.image" alt="Product Image" class="w-full h-48 object-cover mb-4" />
        <h2 class="text-xl font-bold mb-2">{{ item.name }}</h2>
        <p class="text-gray-700 mb-4">{{ item.description }}</p>
        <p class="text-lg font-semibold mb-4">${{ item.price }}</p>
        <button class="snipcart-add-item bg-blue-500 text-white py-2 px-4 rounded"
                :data-item-id="item.id"
                :data-item-price="item.price"
                :data-item-url="item.url"
                :data-item-description="item.description"
                :data-item-image="item.image"
                :data-item-name="item.name">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "contentful";
import type { Entry } from "contentful";
import { useRuntimeConfig } from "#app";
import { ref, onMounted, watch } from "vue";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpaceId,
  accessToken: config.public.contentfulAccessToken,
});

interface AboutFields extends Entry {
  contentTypeId: string;
  copy: any;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
  title: string;
}

const copy = ref<AboutFields['copy'] | null>(null);
const image = ref<string | null>(null);
const title = ref<string | null>(null);
const richTextHtml = ref<string | null>(null);
const snipcartApiKey = config.public.snipcartApiKey;

const items = ref([
  {
    id: "1",
    name: "Sample Product 1",
    description: "This is a sample product 1.",
    price: 19.99,
    image: "https://via.placeholder.com/150",
    url: "/"
  },
  {
    id: "2",
    name: "Sample Product 2",
    description: "This is a sample product 2.",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    url: "/"
  },
  {
    id: "3",
    name: "Sample Product 3",
    description: "This is a sample product 3.",
    price: 39.99,
    image: "https://via.placeholder.com/150",
    url: "/"
  }
]);

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
    }
  ],
});

onMounted(async () => {
  try {
    const response = await client.getEntries<AboutFields>({ content_type: "about" });
    if (response.items.length > 0) {
      const data = response.items[0].fields;
      copy.value = data.copy;
      image.value = data.image.fields.file.url; // Access the image URL
      title.value = data.title;
    } else {
      console.warn('No entries found for content type "about".');
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
});

watch(copy, (newCopy) => {
  if (newCopy) {
    richTextHtml.value = documentToHtmlString(newCopy);
  }
});
</script>
