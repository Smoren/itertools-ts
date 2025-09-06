import { InvalidArgumentError } from "./exceptions";
import { isAsyncIterable, isIterable, isIterator } from "./summary";
import {
  AsyncRelatedIterable,
  AsyncTeeIterator,
  RelatedIterable,
  TeeIterator,
} from "./tools";

/**
 * Converts collection or record to Iterable instance.
 *
 * If instance is already an iterable then just return it.
 *
 * @param collection
 */
export function toIterable<T>(
  collection: Iterable<T> | Iterator<T> | Record<PropertyKey, unknown>
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
    | Record<PropertyKey, unknown>
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
    collection = toIterable(collection as Record<PropertyKey, unknown>);
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
  if (Array.isArray(collection)) {
    return collection;
  }
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
  if (Array.isArray(collection)) {
    return collection;
  }
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
    | Record<PropertyKey, unknown>
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
    | Record<PropertyKey, unknown>
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
export function tee<T>(
  collection: Iterable<T> | Iterator<T>,
  count: number
): Array<RelatedIterable<T>> {
  return new TeeIterator(toIterator(collection), count).getRelatedIterables();
}

/**
 * Return several independent (duplicated) async iterables from a single async iterable.
 *
 * Once tee has been called to duplicate iterators, it is advisable to not use the original input iterator any further.
 *
 * Duplicating iterators can use up memory. Consider if tee is the right solution. For example, arrays and most
 * iterators can be rewound and reiterated without need for duplication.
 *
 * @param collection
 * @param count
 */
export function teeAsync<T>(
  collection: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  count: number
): Array<AsyncRelatedIterable<T>> {
  return new AsyncTeeIterator(
    toAsyncIterator(collection),
    count
  ).getRelatedIterables();
}

/**
 * Divides the elements of the iterable evenly into
 * n smaller iterables while meantaining order
 * EX: ([1, 2, 3, 4], 2) => [1, 2], [3, 4]
 * @param data
 * @param n
 */
export function* divide<T>(
  data: Iterable<T> | Iterator<T>, 
  n: number
): Iterable<Array<T>> {
  if (typeof n !== "number" || !Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
    throw new InvalidArgumentError("divide: n must be a positive finite integer");
  }

  // Ensure input is iterable
  if (data == null || (typeof (data as any)[Symbol.iterator] !== "function" && typeof (data as any).next !== "function")) {
    throw new InvalidArgumentError('divide: input is not iterable or iterator');
  }
  //Convert iterator to iterable 
  const iterable = toIterable(data);
  //Convert input to array to know its length
  const arr = Array.isArray(iterable) ? iterable : Array.from(iterable);
  const len = arr.length;
  //Calculate size of each chunk
  const chunkSize = Math.ceil(len/n);
  for (let i=0;i<len;i+=chunkSize){
    //Slice each chunk and yield it
    yield arr.slice(i,i+chunkSize);
  }
}


/**
 * Divides the elements of the iterable evenly into
 * n smaller iterables while meantaining order
 * EX: ([1, 2, 3, 4], 2) => [1, 2], [3, 4]
 * @param data
 * @param n
 */
export async function* divideAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> 
  | Iterable<T> | Iterator<T>, 
  n: number
): AsyncIterable<Array<T>> {
  if (typeof n !== "number" || !Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
    throw new InvalidArgumentError("divide: n must be a positive finite integer");
  }

  // Ensure input is iterable
  if (
    data == null ||
    (
      typeof (data as any)[Symbol.asyncIterator] !== "function" &&
      typeof (data as any)[Symbol.iterator] !== "function" &&
      typeof (data as any).next !== "function"
    )
  ) {
    throw new InvalidArgumentError('divide: input is not iterable, async iterable, or iterator');
  }

  //Convert iterator to iterable 
  const asynciterable = toAsyncIterable(data);
  //Convert input to buffer to know its length
  const buffer : T[] = [];
  for await(const item of asynciterable){
    buffer.push(item);
  }
  const len = buffer.length;
  if (len === 0) return; // empty input
  
  //Calculate size of each chunk
  const chunkSize = Math.ceil(len/n);
  for (let i=0;i<len;i+=chunkSize){
    //Slice each chunk and yield it
    yield buffer.slice(i,i+chunkSize);
  }
}

