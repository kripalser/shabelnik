import type { Formats } from "@types";

// Minimum size in mm from ГОСТ 5773-90 (https://docs.cntd.ru/document/1200015243)
const formats: Formats = {
  "60×84/8": { width: 200, height: 285 },
  "60×84/16": { width: 130, height: 195 },
  "60×84/32": { width: 95, height: 130 },
  "60×90/8": { width: 205, height: 275 },
  "60×92/8": { width: 225, height: 292 }, // https://www31.ru/book/edition-format/234-prakticheski-primenjaemye-formaty-izdanijj.html
  "60×90/16": { width: 132, height: 205 },
  "70×100/8": { width: 235, height: 320 }, // Taken from https://fantlab.ru/edition313539
  "70×100/16": { width: 158, height: 230 },
  "70×100/32": { width: 112, height: 158 },
  "70×108/8": { width: 257, height: 333 },
  "70×108/16": { width: 158, height: 255 },
  "70×108/32": { width: 125, height: 165 },
  "70×90/16": { width: 155, height: 210 },
  "70×90/32": { width: 100, height: 155 },
  "75×90/32": { width: 100, height: 170 },
  "84×108/16": { width: 192, height: 255 },
  "84×108/16(sq)": { width: 192, height: 192 },
  "84×108/32": { width: 123, height: 192 },
  "90×60/16": { width: 205, height: 132 },
  "108×84/16": { width: 255, height: 192 },
  "24×18": { width: 200, height: 150 },
  "56×44": { width: 186, height: 146 },
  "87×58": { width: 290, height: 193 },
  "58×87": { width: 193, height: 290 },
} as const;

// Used by filmstrips
const formatDefault: string = "24×18";

export { formats, formatDefault };
