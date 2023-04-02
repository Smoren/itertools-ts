import { InvalidArgumentError } from "./exceptions";
import { isAsyncIterable, isIterable, isIterator } from "./summary";
import { RecordKey } from "./types";
import { RelatedIterable, TeeIterator } from "./tools";

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

  if (typeof collection === "object" && collection !== null) {
    return (function* () {
      for (const key in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, key)) {
          yield [
            key,
            (collection as Record<string | number | symbol, unknown>)[key],
          ];
        }
      }
    })() as Iterable<T>;
  }

  throw new InvalidArgumentError(
    "Given collection is not iterable or iterator."
  );
}

/**
 * Converts collection or record to AsyncIterable instance.
 *
 * If instance is already an async iterable then just return it.
 *
 * @param collection
 */
export function toAsyncIterable<T>(
  collection:
    | Iterable<T>
    | Iterator<T>
    | AsyncIterable<T>
    | AsyncIterator<T>
    | Record<RecordKey, unknown>
): AsyncIterable<T> {
  if (isAsyncIterable(collection)) {
    return collection as AsyncIterable<T>;
  }

  if (isIterator(collection)) {
    return {
      async *[Symbol.asyncIterator]() {
        while (true) {
          const res = await (collection as AsyncIterator<T>).next();
          if (res.done) {
            return;
          }
          yield res.value;
        }
      },
    };
  }

  if (typeof collection === "object" && collection !== null) {
    collection = toIterable(collection as Record<RecordKey, unknown>);
  }

  if (isIterable(collection)) {
    return {
      async *[Symbol.asyncIterator]() {
        for (const value of collection as Iterable<T>) {
          yield value;
        }
      },
    };
  }

  throw new InvalidArgumentError(
    "Given collection is not async iterable or iterator."
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
 * Converts collection to AsyncIterator instance.
 *
 * @param collection
 */
export function toAsyncIterator<T>(
  collection: Iterable<T> | Iterator<T> | AsyncIterable<T> | AsyncIterator<T>
): AsyncIterator<T> {
  if (isIterator(collection) || isIterable(collection)) {
    collection = toAsyncIterable(collection);
  }

  if (isAsyncIterable(collection)) {
    return (async function* () {
      for await (const item of collection as Iterable<T>) {
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
 * Converts given async collection to array.
 *
 * @param collection
 */
export async function toArrayAsync<T>(
  collection: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): Promise<Array<T>> {
  const result = [];
  for await (const item of toAsyncIterable(collection)) {
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
  pairs:
    | Iterable<[TKey, TValue]>
    | Iterator<[TKey, TValue]>
    | Record<RecordKey, unknown>
): Map<TKey, TValue> {
  const result: Map<TKey, TValue> = new Map();
  for (const [key, value] of toIterable(pairs)) {
    result.set(key, value);
  }
  return result;
}

/**
 * Converts async collection of key-value pairs to Map.
 *
 * @param pairs
 */
export async function toMapAsync<TKey, TValue>(
  pairs:
    | AsyncIterable<[TKey, TValue]>
    | AsyncIterator<[TKey, TValue]>
    | Iterable<[TKey, TValue]>
    | Iterator<[TKey, TValue]>
    | Record<RecordKey, unknown>
): Promise<Map<TKey, TValue>> {
  const result: Map<TKey, TValue> = new Map();
  for await (const [key, value] of toAsyncIterable(pairs)) {
    result.set(key, value);
  }
  return result;
}

/**
 * Converts given collection to Set.
 *
 * @param collection
 */
export function toSet<T>(collection: Iterable<T> | Iterator<T>): Set<T> {
  const result: Set<T> = new Set();
  for (const datum of toIterable(collection)) {
    result.add(datum);
  }
  return result;
}

/**
 * Converts given async collection to Set.
 *
 * @param collection
 */
export async function toSetAsync<T>(
  collection: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): Promise<Set<T>> {
  const result: Set<T> = new Set();
  for await (const datum of toAsyncIterable(collection)) {
    result.add(datum);
  }
  return result;
}

/**
 * Return several independent (duplicated) iterables from a single iterable.
 *
 * Once tee has been called to duplicate iterators, it is advisable to not use the original input iterator any further.
 *
 * Duplicating iterators can use up memory. Consider if tee is the right solution. For example, arrays and most
 * iterators can be rewound and reiterated without need for duplication.
 *
 * @param collection
 * @param count
 */
export function tee<T>(collection: Iterable<T> | Iterator<T>, count: number): Array<RelatedIterable<T>> {
  return (new TeeIterator(toIterator(collection), count)).getRelatedIterables();
}
