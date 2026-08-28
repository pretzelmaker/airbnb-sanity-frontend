export const isMultiple = (value) => (value === 0 || value > 1 ? "s" : "")

export const formatCount = (n, noun) => `${n} ${noun}${isMultiple(n)}`
