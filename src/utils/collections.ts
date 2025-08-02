import { getCollection } from "astro:content";
import type { Collection, CollectionGroup, CollectionItem } from "@types.ts";
import { getSlug } from "@utils/slugs.ts";

const aids = await getCollection("aids");
const books = await getCollection("books");
const filmstrips = await getCollection("filmstrips");
const magazines = await getCollection("magazines");

const sortCollectionGroups = (collectionGroup: CollectionGroup[]) => {
  return collectionGroup
    .sort(
      (a, b) =>
        b.items.length - a.items.length || a.title.localeCompare(b.title),
    )
    .sort((a, b) => Number(a.merged ?? false) - Number(b.merged ?? false));
};

const composeSlug = (title: string): string => {
  return `/${getSlug(title)}/`;
};

export const getYearsRange = (years: number[]) => {
  return years.length > 1 ? `${years[0]}—${years[years.length - 1]}` : years[0];
};

const sortCollection = (collection: Collection) => {
  return collection.sort(
    (a, b) => a.data.year.valueOf() - b.data.year.valueOf(),
  );
};

const groupCollection = ({
  collection,
  key,
  merge,
}: {
  collection: Collection;
  key: keyof CollectionItem["data"];
  merge?: { threshold: number; title: string; moveToEnd: boolean };
}) => {
  let result = collection.reduce(
    (accumulator: CollectionGroup[], currentValue: CollectionItem) => {
      let group: CollectionGroup | undefined = accumulator.find(
        (x) => x.title === currentValue.data[key],
      );

      if (group === undefined) {
        group = {
          collection: currentValue.collection,
          items: [],
          title: currentValue.data[key] as string,
          slug: composeSlug(currentValue.data[key] as string),
          years: [],
        };

        accumulator.push(group);
      }

      group.items.push({ ...currentValue });
      group.years = [...new Set([...group.years, currentValue.data.year])].sort(
        (a, b) => a - b,
      ); // Put only unique years and sort

      return accumulator;
    },
    [],
  );

  // Merge groups with defined minimal number of items
  if (merge) {
    result = result.reduce(
      (accumulator: CollectionGroup[], currentValue: CollectionGroup) => {
        let group: CollectionGroup | undefined = accumulator.find(
          (x: CollectionGroup) => x.title === merge.title,
        );

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
          group.years = [
            ...new Set([...group.years, ...currentValue.years]),
          ].sort((a, b) => a - b);
        } else {
          accumulator.push(currentValue);
        }

        return accumulator;
      },
      [],
    );
  }

  result.forEach((group) => {
    sortCollection(group.items);
  });

  return sortCollectionGroups(result);
};

export const collections = {
  aids: {
    all: aids,
    grouped: groupCollection({
      collection: aids,
      key: "publisher",
    }),
  },
  books: {
    all: books,
    grouped: groupCollection({
      collection: books,
      key: "publisher",
      merge: {
        threshold: 2, // Minimum number of items
        title: "Другие издательства",
        moveToEnd: true,
      },
    }),
  },
  filmstrips: {
    all: filmstrips,
    grouped: groupCollection({
      collection: filmstrips,
      key: "publisher",
    }),
  },
  magazines: {
    all: magazines,
    grouped: groupCollection({
      collection: magazines,
      key: "title",
      merge: {
        threshold: 2,
        title: "Другие журналы",
        moveToEnd: true,
      },
    }),
  },
};
