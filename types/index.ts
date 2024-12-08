import type { EntryFields, EntrySkeletonType } from 'contentful';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
}

export interface ProductFields extends EntrySkeletonType {
  fields: {
    id: EntryFields.Text;
    title: EntryFields.Text;
    description: EntryFields.Text;
    price: EntryFields.Number;
    image?: {
      fields: {
        file: {
          url: EntryFields.Text;
        };
      };
    };
  };
}

export interface AboutFields extends EntrySkeletonType {
  fields: {
    contentTypeId: EntryFields.Text;
    copy: EntryFields.RichText;
    image?: {
      fields: {
        file: {
          url: EntryFields.Text;
        };
      };
    };
    title: EntryFields.Text;
  };
}