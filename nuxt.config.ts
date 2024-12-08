import 'dotenv/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  nitro: {
    preset: 'netlify' 
  },
  generate: {},
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
      contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      snipcartApiKey: process.env.SNIPCART_API_KEY,
      snipcartSecretApiKey: process.env.SNIPCART_SECRET_API_KEY,
    }
  },
  css: [
    '~/assets/css/tailwind.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})