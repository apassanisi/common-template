
import type { ProductFields } from '~/types';

const spaceId = process.env.CONTENTFUL_SPACE_ID || '';
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || '';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=product&fields.id=${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product from Contentful');
    }

    const data = await response.json();

    if (data.items.length > 0) {
      const item = data.items[0].fields;
      return {
        id: `${item.id}`,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image?.fields?.file?.url || '',
        url: `/products/${item.id}`,
      };
    } else {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});