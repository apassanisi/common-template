import { createClient } from 'contentful';
import { useRuntimeConfig } from '#app';
import type { ProductFields, AboutFields } from '~/types';
import { documentToHtmlString as contentfulDocumentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';

export function useContentful() {
  const config = useRuntimeConfig();

  const client = createClient({
    space: config.public.contentfulSpaceId,
    accessToken: config.public.contentfulAccessToken,
  });

  async function fetchProducts() {
    const response = await client.getEntries<ProductFields>({
      content_type: 'product',
    });
    return response.items.map((item) => ({
      id: `${item.fields.id}`,
      title: item.fields.title,
      description: item.fields.description,
      price: item.fields.price,
      image: item.fields.image?.fields.file.url || '',
      url: `/products/${item.fields.id}`, // Ensure URL is correctly set
    }));
  }

  async function fetchAboutContent() {
    const response = await client.getEntries<AboutFields>({
      content_type: 'about',
    });
    if (response.items.length > 0) {
      const data = response.items[0].fields;
      return {
        copy: data.copy,
        image: data.image?.fields.file.url || null,
        title: data.title,
        richTextHtml: documentToHtmlString(data.copy),
      };
    }
    return null;
  }

  async function fetchProductById(productId: string) {
    const response = await client.getEntries<ProductFields>({
      content_type: 'product',
      'fields.id': productId,
    });
    if (response.items.length > 0) {
      const item = response.items[0].fields;
      return {
        id: `${item.id}`,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image?.fields.file.url || '',
        url: `/products/${item.id}`, // Ensure URL is correctly set
      };
    }
    return null;
  }

  return {
    fetchProducts,
    fetchAboutContent,
    fetchProductById,
  };
}

function documentToHtmlString(copy: Document) {
  return contentfulDocumentToHtmlString(copy);
}