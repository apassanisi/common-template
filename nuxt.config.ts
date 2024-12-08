import 'dotenv/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
      contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      snipcartApiKey: process.env.SNIPCART_API_KEY,
      snipcartSecretApiKey: process.env.SNIPCART_SECRET_API_KEY,
    }
  },
  generate: {
    routes: async () => {
      const { data } = await axios.get('https://cdn.contentful.com/spaces/YOUR_SPACE_ID/environments/master/entries?access_token=YOUR_ACCESS_TOKEN&content_type=product')
      return data.items.map(item => `/products/${item.fields.id}`)
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