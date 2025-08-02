export const adjustTypography = (value: string) => {
  const noBreakSpace = "\u00A0";
  // const thinSpace = "\u2009";
  const narrowNoBreakSpace = "\u202F";

  return value
    .replace(/([А-ЯЁ])\.\s/g, `$1.${narrowNoBreakSpace}`) // Initials
    .replace(/№\s/g, `№${narrowNoBreakSpace}`) // Numero sign
    .replace(/\s—\s/g, `${noBreakSpace}— `) // Em dash
    .replace(/(?<![,№])(\s)(\d+)\s?$/g, `${noBreakSpace}$2`) // Number at the end if not preceded by comma or numero sign
    .replace(/\s([a-zа-яё])\s/gi, ` $1${noBreakSpace}`); // One-letter words
};

export const pluralize = (
  count: number,
  words: string[],
  returnCount: boolean = true,
) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return `${returnCount ? `${count}&nbsp;` : ``}${words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]]}`;
};
