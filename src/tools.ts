import { InvalidArgumentError } from './exceptions';

export function toIterable<T>(collection: Iterable<T>|Iterator<T>): Iterable<T> {
  if (isIterable(collection)) {
    return collection as Iterable<T>;
  }

  if (isIterator(collection)) {
    return {
      [Symbol.iterator](): Iterator<T> {
        return collection as Iterator<T>;
      }
    };
  }

  throw new InvalidArgumentError('Given collection is not iterable or iterator.');
}

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

  return (input as Record<string, unknown>).hasOwnProperty('next')
    && typeof (input as Record<string, unknown>).next === 'function';
}
