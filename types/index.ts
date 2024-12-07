import type { EntrySkeletonType } from 'contentful';

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
    id: number;
    title: string;
    price: number;
    image: { fields: { file: { url: string } } } | null;
  };
}

export interface AboutFields extends EntrySkeletonType {
  fields: {
    contentTypeId: string;
    copy: any;
    image: { fields: { file: { url: string } } } | null;
    title: string;
  };
}