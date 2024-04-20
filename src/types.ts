import type { CollectionEntry, ContentCollectionKey } from 'astro:content';

export type Config = {
    language: string;
};

export type CollectionGroup = {
    collection: string;
    items: CollectionEntry<ContentCollectionKey>[];
    merged?: boolean;
    title: string;
    slug: string;
    years: number[];
};

export type GroupedCollection = {
    all: CollectionEntry<ContentCollectionKey>[];
    grouped: CollectionGroup[];
};

export type Link = {
    label: string;
    url: string;
};

export type Links = {
    [key: string]: { [key: string]: Link };
};

type SeoItem = {
    title: string;
    description: string;
};

export type Seo = {
    [key: string]: SeoItem;
};

export type ThumbSize = {
    width: number;
    height: number;
};

export type Formats = {
    [key: string]: ThumbSize;
};
