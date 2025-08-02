export const statuses = {
  found: "Найдено", // Someone else's scan has been found
  purchased: "Куплено", // Purchased, but not delivered yet
  owned: "Есть в наличии", // In possession
  pictures: "Картинки", // Scanned pictures
  scanned: "Отсканировано", // Scanned but not processed yet
  processed: "Обработано", // Ready to be added to the website
} as const;
