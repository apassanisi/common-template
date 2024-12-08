<template>
  <v-app>
    <Navbar />
    <header class="py-2 px-4 bg-primary text-white text-center">
      <h1 class="text-2xl font-bold">My E-commerce Project</h1>
    </header>
    <NuxtPage />
    <v-footer
      app
      color="primary"
      dark
      class="bg-primary text-center py-4"
      style="
        bottom: 0;
        z-index: 906;
        transform: translateY(0px);
        position: absolute;
      "
    >
      <span>&copy; 2023 My E-commerce Project</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import "vuetify/styles";
import { VApp, VMain, VFooter, VCol } from "vuetify/components";
import { ref } from "vue";

const snipcartApiKey = ref("your-snipcart-api-key");
</script>

<style scoped>
header {
  background-color: #1976d2;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
}

@media (min-width: 640px) {
  header {
    padding: 1rem 2rem;
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
