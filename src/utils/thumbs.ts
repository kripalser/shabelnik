import type { CollectionEntry, ContentCollectionKey } from 'astro:content';

import { getSlug } from '@utils';
import { formats, formatDefault } from '@data/formats';
import { statuses } from '@data/statuses';

const getFullTitle = (item: CollectionEntry<ContentCollectionKey>) => {
    return item.data.issue ? `${item.data.title} № ${item.data.issue}, ${item.data.year}` : item.data.title;
};

const getImagePath = (item: CollectionEntry<ContentCollectionKey>) => {
    const editionYear = item.data.edition ? `-${item.data.year}` : '';
    return `/assets/img/collections/${item.collection}/${getSlug(getFullTitle(item)) + editionYear}-thumb.jpg`;
};

const getThumbSize = (format: string = formatDefault) => {
    return formats[format.replace('×', 'x')];
};

// Todo: add types for statuses (share with Zod)
export const getStatus = (status: string) => {
    // @ts-ignore
    return statuses[status];
};

// Todo: add type
export const getThumb = (item: CollectionEntry<ContentCollectionKey>) => {
    return {
        title: getFullTitle(item),
        image: {
            path: getImagePath(item),
            size: getThumbSize(item.data.format),
        },
        status: item.data.status?.map((status: string) => {
            return getStatus(status);
        }),
    };
};
