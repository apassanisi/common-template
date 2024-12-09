import type { EntryFields, EntrySkeletonType } from 'contentful';

export interface ImageFields {
  fields: {
    file: {
      url: EntryFields.Text;
    };
  };
}

export interface ProductFields extends EntrySkeletonType {
  fields: {
    id: EntryFields.Text;
    title: EntryFields.Text;
    description: EntryFields.Text;
    price: EntryFields.Number;
    image?: ImageFields;
  };
}

export interface AboutFields extends EntrySkeletonType {
  fields: {
    contentTypeId: EntryFields.Text;
    copy: EntryFields.RichText;
    image?: ImageFields;
    title: EntryFields.Text;
  };
}

export interface ArtworkFields extends EntrySkeletonType {
  fields: {
    id: EntryFields.Text;
    title: EntryFields.Text;
    description: EntryFields.Text;
    image?: ImageFields;
  };
}

export interface SocialMediaLinkFields {
  fields: {
    platform: EntryFields.Text;
    url: EntryFields.Text;
  };
}

export interface ContactFields extends EntrySkeletonType {
  fields: {
    name: EntryFields.Text;
    socialMediaLinks: SocialMediaLinkFields[];
  };
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Contact {
  name: string;
  socialMediaLinks: SocialMediaLinkFields[];
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export type About = {
  title: string;
  description: string;
  copy?: never;
  image?: any;
  richTextHtml?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
}