export const textShortener = (word = "") =>
  `${word.substring(0, 11)}${word.length > 12 ? "..." : ""}`;
