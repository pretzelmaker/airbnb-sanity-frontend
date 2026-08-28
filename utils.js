/**
 * Returns 's' if value represents multiple items (0 or > 1), otherwise returns empty string
 * Useful for pluralizing nouns in text (e.g., "1 review" vs "2 reviews")
 * @param {number} value - The quantity to check
 * @returns {string} - 's' for plural, empty string for singular
 */
export const isMultiple = (value) => {
  return value === 0 || value > 1 ? "s" : "";
}
