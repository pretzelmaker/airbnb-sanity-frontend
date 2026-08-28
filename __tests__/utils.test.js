import { isMultiple } from '../utils';

describe('isMultiple', () => {
  it('should return "s" for 0', () => {
    expect(isMultiple(0)).toBe('s');
  });

  it('should return "" for 1', () => {
    expect(isMultiple(1)).toBe('');
  });

  it('should return "s" for values greater than 1', () => {
    expect(isMultiple(2)).toBe('s');
    expect(isMultiple(5)).toBe('s');
    expect(isMultiple(10)).toBe('s');
  });
});
