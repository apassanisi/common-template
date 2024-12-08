import 'dotenv/config';
import { defineNuxtConfig } from 'nuxt/config';
import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify' 
  },
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
      contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      snipcartApiKey: process.env.SNIPCART_API_KEY,
      snipcartSecretApiKey: process.env.SNIPCART_SECRET_API_KEY,
      calendlyUrl: process.env.CALENDLY_URL,
    }
  },
  css: [
    'vuetify/styles',
    '~/assets/css/tailwind.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vuetify', '@vueuse/core'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [
      vuetify(),
    ],
  },
})