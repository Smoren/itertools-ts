export function isIterable(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return typeof (input as Record<string|symbol, unknown>)[Symbol.iterator] === 'function';
}

export function isIterator(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return (input as Record<string, unknown>).next !== undefined
    && typeof (input as Record<string, unknown>).next === 'function';
}
