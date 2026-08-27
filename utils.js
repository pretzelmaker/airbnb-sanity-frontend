export const isMultiple = (value) => (value === 0 || value > 1 ? "s" : "")

/**
 * Format a price amount with currency symbol
 * @param {number} amount - The price amount to format
 * @param {string} currency - The currency code (default: 'GBP')
 * @returns {string} Formatted price string with currency symbol
 */
export const formatPrice = (amount, currency = 'GBP') => {
  const currencySymbols = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    JPY: '¥',
  }

  const symbol = currencySymbols[currency] || currency

  // Round to 2 decimal places
  const roundedAmount = Math.round(amount * 100) / 100

  // Format with 2 decimal places for most currencies, but no decimals for JPY
  if (currency === 'JPY') {
    return `${symbol}${Math.round(roundedAmount)}`
  }

  return `${symbol}${roundedAmount.toFixed(2)}`
}
