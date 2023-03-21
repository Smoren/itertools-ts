import { InvalidArgumentError } from "./exceptions";
import { isIterable, isIterator } from "./summary";
import { Pair, RecordKey } from './types';

/**
 * Converts collection or record to Iterable instance.
 *
 * If instance is already an iterable then just return it.
 *
 * @param collection
 */
export function toIterable<T>(
  collection: Iterable<T> | Iterator<T> | Record<RecordKey, unknown>
): Iterable<T> {
  if (isIterable(collection)) {
    return collection as Iterable<T>;
  }

  if (isIterator(collection)) {
    return {
      [Symbol.iterator](): Iterator<T> {
        return collection as Iterator<T>;
      },
    };
  }

  if (typeof collection === 'object' && collection !== null) {
    return (function* () {
      for (const key in collection) {
        if (collection.hasOwnProperty(key)) {
          yield [key, (collection as Record<string|number|symbol, unknown>)[key]];
        }
      }
    })() as Iterable<T>;
  }

  throw new InvalidArgumentError(
    "Given collection is not iterable or iterator."
  );
}

/**
 * Converts collection to Iterator instance.
 *
 * If instance is already an iterator then just return it.
 *
 * @param collection
 */
export function toIterator<T>(
  collection: Iterable<T> | Iterator<T>
): Iterator<T> {
  if (isIterator(collection)) {
    return collection as Iterator<T>;
  }

  if (isIterable(collection)) {
    return (function* () {
      for (const item of collection as Iterable<T>) {
        yield item;
      }
    })();
  }

  throw new InvalidArgumentError(
    "Given collection is not iterable or iterator."
  );
}

/**
 * Converts given collection to array.
 *
 * @param collection
 */
export function toArray<T>(collection: Iterable<T> | Iterator<T>): Array<T> {
  const result = [];
  for (const item of toIterable(collection)) {
    result.push(item);
  }
  return result;
}

/**
 * Converts collection of key-value pairs to Map.
 *
 * @param pairs
 */
export function toMap<TKey, TValue>(
  pairs: Iterable<[TKey, TValue]> | Iterator<[TKey, TValue]> | Record<RecordKey, unknown>
): Map<TKey, TValue> {
  const result: Map<TKey, TValue> = new Map();
  for (const [key, value] of toIterable(pairs)) {
    result.set(key, value);
  }
  return result;
}

/**
 * Converts given collection to Set.
 *
 * @param collection
 */
export function toSet<T>(
  collection: Iterable<T> | Iterator<T>
): Set<T> {
  const result: Set<T> = new Set();
  for (const datum of toIterable(collection)) {
    result.add(datum);
  }
  return result;
}
