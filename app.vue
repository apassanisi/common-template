<template>
  <v-app>
    <v-main>
      <NuxtPage />
      <div hidden id="snipcart" :data-api-key="snipcartApiKey"></div>
      <v-btn @click="openModal" color="primary" dark class="fixed bottom-4 right-4">
        Schedule a Call
      </v-btn>
      <div v-show="isModalOpen" class="fixed inset-0 bg-black flex items-center justify-center z-50" @click.self="closeModal">
        <Modal @close="closeModal">
          <div class="p-4">
            <h2 class="text-xl font-bold mb-4">Schedule a Call</h2>
            <v-btn icon @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="calendly-inline-widget" :data-url="calendlyUrl" style="min-width:320px;height:630px;"></div>
          </div>
        </Modal>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { useToggle } from '@vueuse/core';
import Modal from '~/components/Modal.vue';
import 'vuetify/styles';
import { VApp, VMain, VBtn, VIcon } from 'vuetify/components';

const config = useRuntimeConfig();
const snipcartApiKey = config.public.snipcartApiKey || 'your-default-api-key';
const calendlyUrl = config.public.calendlyUrl || 'your-default-calendly-url';
const [isModalOpen, toggleModal] = useToggle(false);

function openModal() {
  toggleModal(true);
}

function closeModal() {
  toggleModal(false);
}

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
