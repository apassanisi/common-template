<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div :hidden="true" id="snipcart" :data-api-key="snipcartApiKey"></div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import "vuetify/styles";

const config = useRuntimeConfig();
const snipcartApiKey = 'placeholder-api-key';

useHead({
  title: "Demo E-commerce",
  meta: [
    {
      name: "description",
      content: "A demo e-commerce site built with Nuxt.js",
    },
  ],
  script: [
    {
      src: "https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.js",
      async: true,
    },
    {
      src: "https://assets.calendly.com/assets/external/widget.js",
      async: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.css",
    },
  ],
});
</script>
