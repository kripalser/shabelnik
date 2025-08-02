import slugify from "slugify";

export const getSlug = (input: string) => {
  return slugify(input, {
    lower: true,
    strict: true,
  });
};
