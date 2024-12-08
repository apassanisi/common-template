<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div :hidden="true" id="snipcart" :data-api-key="snipcartApiKey"></div>
  </v-app>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import "vuetify/styles";

const config = useRuntimeConfig();
const snipcartApiKey = config.public.snipcartApiKey || "your-default-api-key";

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

<style scoped>
header {
  background-color: #1976d2;
  color: white;
  padding: 1rem;
  text-align: center;
}

@media (min-width: 640px) {
  header {
    padding: 2rem;
  }
}

.v-footer {
  background-color: #1976d2;
  color: white;
  text-align: center;
  padding: 1rem;
}

@media (min-width: 640px) {
  .v-footer {
    padding: 2rem;
  }
}
</style>
