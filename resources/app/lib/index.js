export const range = (size, from = 1, step = 1) => [...Array(size)].map((_, i) => (i + from) * step)
