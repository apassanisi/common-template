<template>
  <div>
    <pre>
      {{ about }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { createClient } from 'contentful';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpaceId,
  accessToken: config.public.contentfulAccessToken,
});

const about = ref<Record<string, any> | null>(null);
onMounted(async () => {
  try {
    const response = await client.getEntries({ content_type: "about" });
    about.value = response.items[0].fields;
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
});

</script>
