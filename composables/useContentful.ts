import { createClient } from 'contentful';
import { useRuntimeConfig } from '#app';
import type { ProductFields, AboutFields, ArtworkFields, ContactFields, SocialMediaLink, SocialMediaLinkFields } from '~/types';
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
      content_type: 'product', // Ensure 'product' is a valid content type ID
    });
    return response.items.map((item) => ({
      id: `${item.fields.id}`,
      title: item.fields.title,
      description: item.fields.description,
      price: item.fields.price,
      image: item.fields.image?.fields.file.url || '',
      url: `/products/${item.fields.id}`,
    }));
  }

  async function fetchAbout() {
    const response = await client.getEntries<AboutFields>({
      content_type: 'about', // Ensure 'about' is a valid content type ID
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
      content_type: 'product', // Ensure 'product' is a valid content type ID
      'fields.id': productId,
    });
    if (response.items.length > 0) {
      const item = response.items[0].fields;
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image?.fields.file.url || '',
        url: `/products/${item.id}`,
      };
    }
    return null;
  }

  async function fetchArtworks() {
    const response = await client.getEntries<ArtworkFields>({
      content_type: 'artwork',
    });
    return response.items.map((item) => ({
      id: item.fields.id,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.image?.fields.file.url || '',
    }));
  }

  async function fetchContact() {
    const response = await client.getEntries<ContactFields>({
      content_type: 'contactInfo',
    });
    if (response.items.length > 0) {
      const data = response.items[0].fields;
      return {
        name: data.name,
        socialMediaLinks: data.socialMediaLinks as SocialMediaLinkFields[],
      };
    }
    return null;
  }

  return {
    fetchProducts,
    fetchAbout,
    fetchProductById,
    fetchArtworks,
    fetchContact,
  };
}

function documentToHtmlString(copy: Document) {
  return contentfulDocumentToHtmlString(copy);
}