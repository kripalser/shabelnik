import { formatDefault, formats } from "@data/formats";
import { statuses } from "@data/statuses";
import { getSlug } from "@utils";
import type { CollectionItem, Status } from "@/types.ts";

const getFullTitle = (item: CollectionItem) => {
  return "issue" in item.data
    ? `${item.data.title} № ${item.data.issue}, ${item.data.year}`
    : item.data.title;
};

const getImagePath = (item: CollectionItem) => {
  const editionYear = "edition" in item.data ? `-${item.data.year}` : "";
  return `/assets/img/collections/${item.collection}/${getSlug(getFullTitle(item)) + editionYear}-thumb.jpg`;
};

const getThumbSize = (format: string = formatDefault) => {
  return formats[format];
};

export const getStatus = (status: Status) => {
  return statuses[status];
};

export const getThumb = (item: CollectionItem) => {
  return {
    title: getFullTitle(item),
    image: {
      path: getImagePath(item),
      size: getThumbSize(item.data.format),
    },
    status: item.data.status?.map((status: Status) => {
      return getStatus(status);
    }),
  };
};
