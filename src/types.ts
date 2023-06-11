export type Config = {
    language: string;
};

export type Link = {
    label: string;
    labelShort?: string;
    external?: boolean;
} & ({ url: string, children?: never } | { children: Link[], url?: never }); // Either `url` or `children`, but not both

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
