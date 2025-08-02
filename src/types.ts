import type { CollectionEntry, CollectionKey } from "astro:content";
import type { formats } from "@data/formats.ts";
import type { statuses } from "@data/statuses.ts";

export interface Config {
  language: string;
}

interface SEOItem {
  title: string;
  description: string;
}

export interface SEO {
  [key: string]: SEOItem;
}

export type CollectionItem = CollectionEntry<CollectionKey>;
export type Collection = CollectionItem[];

export interface CollectionGroup {
  collection: string;
  items: Collection;
  merged?: boolean;
  title: string;
  slug: string;
  years: number[];
}

export interface GroupedCollection {
  all: Collection;
  grouped: CollectionGroup[];
}

export interface Link {
  label: string;
  url: string;
}

export interface Links {
  [key: string]: { [key: string]: Link };
}

export interface ThumbSize {
  width: number;
  height: number;
}

export interface Formats {
  [key: string]: ThumbSize;
}

export type Format = keyof typeof formats;

export type Status = keyof typeof statuses;
