import type { CollectionEntry, ContentCollectionKey } from 'astro:content';
import type { CollectionGroup, GroupedCollection } from '@types';

import { getCollection } from 'astro:content';
import { getSlug } from '@utils/slugs.ts';

const sortCollectionGroups = (collection: any[]) => {
    return collection
        .sort((a, b) => a.items.length - b.items.length || b.title.localeCompare(a.title))
        .sort((a, b) => a.merged - b.merged ? 0 : a.merged ? 1 : -1);
};

const composeSlug = (title: string): string => {
    return `/${getSlug(title)}/`;
};

export const getYearsRange = (years: number[]) => {
    return years.length > 1 ? `${years[0]}—${years[years.length - 1]}` : years[0];
};

const sortCollection = (collection: CollectionEntry<ContentCollectionKey>[]) => {
    return collection.sort((a: CollectionEntry<ContentCollectionKey>, b: CollectionEntry<ContentCollectionKey>) => a.data.year.valueOf() - b.data.year.valueOf());
}

const groupCollection = ({ collection, key, merge }: { collection: CollectionEntry<ContentCollectionKey>[], key: string, merge?: { threshold: number, title: string, moveToEnd: boolean }}) => {
    let result = collection.reduce((accumulator: CollectionGroup[], currentValue: CollectionEntry<ContentCollectionKey>) => {
        let group: CollectionGroup | undefined = accumulator.find((x: CollectionGroup) => x.title === currentValue.data[key]);

        if (group === undefined) {
            group = {
                collection: currentValue.collection,
                items: [],
                title: currentValue.data[key],
                slug: composeSlug(currentValue.data[key]),
                years: [],
            };

            accumulator.push(group);
        }

        group.items.push({ ...currentValue });
        group.years = [...new Set([...group.years, currentValue.data.year])].sort((a, b) => a - b); // Put only unique years and sort

        return accumulator;
    }, []);

    // Merge groups with defined minimal number of items
    if (merge) {
        result = result.reduce((accumulator: CollectionGroup[], currentValue: CollectionGroup) => {
            let group: CollectionGroup | undefined = accumulator.find((x: CollectionGroup) => x.title === merge.title);

            if (currentValue.items.length < merge.threshold) {
                if (group === undefined) {
                    group = {
                        collection: currentValue.collection,
                        items: [],
                        merged: true,
                        title: merge.title,
                        slug: composeSlug(merge.title),
                        years: [],
                    };

                    accumulator.push(group);
                }

                group.items.push(...currentValue.items);
                group.years = [...new Set([...group.years, ...currentValue.years])].sort((a, b) => a - b);
            } else {
                accumulator.push(currentValue);
            }

            return accumulator;
        }, []);
    }

    result.forEach((group) => {
       sortCollection(group.items);
    });

    return sortCollectionGroups(result);
};

const aids = await getCollection('aids');
const books = await getCollection('books');
const filmstrips = await getCollection('filmstrips');
const magazines = await getCollection('magazines');

export const collections: { [K in ContentCollectionKey]: GroupedCollection } = {
    aids: {
        all: aids,
        grouped: groupCollection({
            collection: aids,
            key: 'publisher',
        }),
    },
    books: {
        all: books,
        grouped: groupCollection({
            collection: books,
            key: 'publisher',
            merge: {
                threshold: 2, // Minimum number of items
                title: 'Другие издательства',
                moveToEnd: true,
            },
        }),
    },
    filmstrips: {
        all: filmstrips,
        grouped: groupCollection({
            collection: filmstrips,
            key: 'publisher',
        }),
    },
    magazines: {
        all: magazines,
        grouped: groupCollection({
            collection: magazines,
            key: 'title',
            merge: {
                threshold: 2,
                title: 'Другие журналы',
                moveToEnd: true,
            },
        }),
    },
};
