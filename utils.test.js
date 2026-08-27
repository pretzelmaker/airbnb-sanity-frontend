import { formatPrice } from './utils'

describe('formatPrice', () => {
  describe('with GBP (default currency)', () => {
    it('should format a simple price with GBP symbol', () => {
      expect(formatPrice(100)).toBe('£100.00')
    })

    it('should format a price with decimals', () => {
      expect(formatPrice(99.99)).toBe('£99.99')
    })

    it('should round to 2 decimal places', () => {
      expect(formatPrice(99.999)).toBe('£100.00')
      expect(formatPrice(99.994)).toBe('£99.99')
      expect(formatPrice(99.995)).toBe('£100.00')
    })

    it('should handle zero price', () => {
      expect(formatPrice(0)).toBe('£0.00')
    })

    it('should handle very small amounts', () => {
      expect(formatPrice(0.01)).toBe('£0.01')
      expect(formatPrice(0.1)).toBe('£0.10')
    })

    it('should handle large amounts', () => {
      expect(formatPrice(1000000)).toBe('£1000000.00')
    })
  })

  describe('with USD currency', () => {
    it('should format with USD symbol', () => {
      expect(formatPrice(100, 'USD')).toBe('$100.00')
    })

    it('should format with decimals', () => {
      expect(formatPrice(49.99, 'USD')).toBe('$49.99')
    })

    it('should round to 2 decimal places', () => {
      expect(formatPrice(49.999, 'USD')).toBe('$50.00')
      expect(formatPrice(49.994, 'USD')).toBe('$49.99')
    })

    it('should handle zero price', () => {
      expect(formatPrice(0, 'USD')).toBe('$0.00')
    })
  })

  describe('with EUR currency', () => {
    it('should format with EUR symbol', () => {
      expect(formatPrice(100, 'EUR')).toBe('€100.00')
    })

    it('should format with decimals', () => {
      expect(formatPrice(79.50, 'EUR')).toBe('€79.50')
    })

    it('should round to 2 decimal places', () => {
      expect(formatPrice(79.999, 'EUR')).toBe('€80.00')
    })

    it('should handle zero price', () => {
      expect(formatPrice(0, 'EUR')).toBe('€0.00')
    })
  })

  describe('with JPY currency', () => {
    it('should format with JPY symbol without decimals', () => {
      expect(formatPrice(10000, 'JPY')).toBe('¥10000')
    })

    it('should round to whole number for JPY', () => {
      expect(formatPrice(10000.99, 'JPY')).toBe('¥10001')
      expect(formatPrice(10000.49, 'JPY')).toBe('¥10000')
    })

    it('should handle zero price', () => {
      expect(formatPrice(0, 'JPY')).toBe('¥0')
    })
  })

  describe('with unsupported currency', () => {
    it('should use currency code as fallback', () => {
      expect(formatPrice(100, 'CAD')).toBe('CAD100.00')
      expect(formatPrice(50.50, 'AUD')).toBe('AUD50.50')
    })

    it('should handle zero with unsupported currency', () => {
      expect(formatPrice(0, 'CAD')).toBe('CAD0.00')
    })
  })

  describe('edge cases', () => {
    it('should handle negative amounts', () => {
      expect(formatPrice(-50)).toBe('£-50.00')
      expect(formatPrice(-50, 'USD')).toBe('$-50.00')
    })

    it('should handle very precise decimal values', () => {
      expect(formatPrice(99.9999999)).toBe('£100.00')
      expect(formatPrice(99.9949999)).toBe('£99.99')
    })

    it('should handle floating point precision issues', () => {
      expect(formatPrice(0.1 + 0.2)).toBe('£0.30')
    })
  })
})
