import {
  toArray,
  toArrayAsync,
  toAsyncIterable,
  toIterable,
} from "./transform";
import { InvalidArgumentError } from "./exceptions";
import { isAsyncIterable, isIterable, isIterator, isString } from "./summary";
import { distinct, distinctAsync } from "./set";
import { AsyncFlatMapper, Comparator, FlatMapper, Pair } from "./types";
import { zip, zipAsync } from "./multi";

/**
 * Map a function onto every element of the iteration.
 *
 * @param data
 * @param mapper
 */
export function* map<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  mapper: (datum: TInput) => TOutput
): Iterable<TOutput> {
  for (const datum of toIterable(data)) {
    yield mapper(datum);
  }
}

/**
 * Map a function onto every element of the iteration for async collections.
 *
 * Mapper may be also async.
 *
 * @param data
 * @param mapper
 */
export async function* mapAsync<TInput, TOutput>(
  data:
    | AsyncIterable<TInput>
    | AsyncIterator<TInput>
    | Iterable<TInput>
    | Iterator<TInput>,
  mapper: (datum: TInput) => TOutput | Promise<TOutput>
): AsyncIterable<TOutput> {
  for await (const datum of toAsyncIterable(data)) {
    yield await mapper(datum);
  }
}

/**
 * Compress an iterable by filtering out data that is not selected.
 *
 * Selectors indicate which data. True value selects item. False value filters out data.
 *
 * @param data
 * @param selectors
 */
export function* compress<T>(
  data: Iterable<T> | Iterator<T>,
  selectors: Iterable<number | boolean> | Iterator<number | boolean>
): Iterable<T> {
  for (const [datum, selector] of zip(data, selectors)) {
    if (selector) {
      yield datum as T;
    }
  }
}

/**
 * Compress an async iterable by filtering out data that is not selected.
 *
 * Selectors indicate which data. True value selects item. False value filters out data.
 *
 * Selectors may be also async collection.
 *
 * @param data
 * @param selectors
 */
export async function* compressAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  selectors:
    | AsyncIterable<number | boolean>
    | AsyncIterator<number | boolean>
    | Iterable<number | boolean>
    | Iterator<number | boolean>
): AsyncIterable<T> {
  for await (const [datum, selector] of zipAsync(data, selectors)) {
    if (selector) {
      yield datum as T;
    }
  }
}

/**
 * Drop elements from the iterable while the predicate function is true.
 *
 * Once the predicate function returns false once, all remaining elements are returned.
 *
 * @param data
 * @param predicate
 */
export function* dropWhile<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): Iterable<T> {
  let drop = true;
  for (const datum of toIterable(data)) {
    if (drop) {
      if (!predicate(datum)) {
        drop = false;
        yield datum;
        continue;
      }
      continue;
    }
    yield datum;
  }
}

/**
 * Drop elements from the async iterable while the predicate function is true.
 *
 * Once the predicate function returns false once, all remaining elements are returned.
 *
 * Predicate may be also async.
 *
 * @param data
 * @param predicate
 */
export async function* dropWhileAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean | Promise<boolean>
): AsyncIterable<T> {
  let drop = true;
  for await (const datum of toAsyncIterable(data)) {
    if (drop) {
      if (!(await predicate(datum))) {
        drop = false;
        yield datum;
        continue;
      }
      continue;
    }
    yield datum;
  }
}

/**
 * Return elements from the iterable as long as the predicate is true.
 *
 * If no predicate is provided, the boolean value of the data is used.
 *
 * @param data
 * @param predicate
 */
export function* takeWhile<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): Iterable<T> {
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      yield datum;
    } else {
      break;
    }
  }
}

/**
 * Return elements from the async iterable as long as the predicate is true.
 *
 * Predicate may be also async.
 *
 * If no predicate is provided, the boolean value of the data is used.
 *
 * @param data
 * @param predicate
 */
export async function* takeWhileAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean | Promise<boolean>
): AsyncIterable<T> {
  for await (const datum of toAsyncIterable(data)) {
    if (await predicate(datum)) {
      yield datum;
    } else {
      break;
    }
  }
}

/**
 * Repeat an item.
 *
 * @param item
 * @param repetitions
 */
export function* repeat<T>(item: T, repetitions: number): Iterable<T> {
  if (repetitions < 0) {
    throw new InvalidArgumentError(
      `Number of repetitions cannot be negative: ${repetitions}`
    );
  }
  for (let i = repetitions; i > 0; --i) {
    yield item;
  }
}

/**
 * Repeat an item given as promise.
 *
 * @param item
 * @param repetitions
 */
export async function* repeatAsync<T>(
  item: T | Promise<T>,
  repetitions: number
): AsyncIterable<T> {
  if (repetitions < 0) {
    throw new InvalidArgumentError(
      `Number of repetitions cannot be negative: ${repetitions}`
    );
  }
  const value = await item;
  for (let i = repetitions; i > 0; --i) {
    yield value;
  }
}

/**
 * Returns a new collection formed by applying a given callback mapper function to each element
 * of the given collection, and then flattening the result by one level.
 *
 * The mapper function can return scalar or collections as a result.
 *
 * @param data
 * @param mapper
 */
export function* flatMap<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  mapper: FlatMapper<TInput, TOutput>
): Iterable<TOutput> {
  for (const datum of toIterable<TInput>(data)) {
    const unflattened = mapper(datum, mapper);
    if (isIterable(unflattened)) {
      for (const flattenedItem of toIterable(
        unflattened as Iterable<TOutput> | Iterator<TOutput>
      )) {
        yield flattenedItem;
      }
    } else {
      yield unflattened as TOutput;
    }
  }
}

/**
 * Returns a new async collection formed by applying a given callback mapper function to each element
 * of the given async collection, and then flattening the result by one level.
 *
 * The mapper function can return scalar or collections as a result.
 *
 * The mapper function may be also async.
 *
 * @param data
 * @param mapper
 */
export async function* flatMapAsync<TInput, TOutput>(
  data:
    | AsyncIterable<TInput>
    | AsyncIterator<TInput>
    | Iterable<TInput>
    | Iterator<TInput>,
  mapper: AsyncFlatMapper<TInput, TOutput>
): AsyncIterable<TOutput> {
  for await (const datum of toAsyncIterable<TInput>(data)) {
    const unflattened = await mapper(datum, mapper);
    if (isIterable(unflattened) || isAsyncIterable(unflattened)) {
      for await (const flattenedItem of toAsyncIterable(
        unflattened as
          | AsyncIterable<TOutput>
          | AsyncIterator<TOutput>
          | Iterable<TOutput>
          | Iterator<TOutput>
      )) {
        yield flattenedItem;
      }
    } else {
      yield unflattened as TOutput;
    }
  }
}

/**
 * Flatten an iterable by a number of dimensions.
 *
 * Ex: [[1, 2], [3, 4], 5] => [1, 2, 3, 4, 5] // Flattened by one dimension
 *
 * @param data
 * @param dimensions
 */
export function* flatten(
  data: Iterable<unknown> | Iterator<unknown>,
  dimensions = Infinity
): Iterable<unknown> {
  if (dimensions < 1) {
    for (let datum of toIterable(data)) {
      if (data instanceof Map) {
        datum = (datum as [unknown, unknown])[1];
      }

      yield datum;
    }
    return;
  }

  for (let datum of toIterable(data)) {
    if (data instanceof Map) {
      datum = (datum as [unknown, unknown])[1];
    }

    if ((isIterable(datum) || isIterator(datum)) && !isString(datum)) {
      for (const subDatum of flatten(
        datum as Iterable<unknown> | Iterator<unknown>,
        dimensions - 1
      )) {
        yield subDatum;
      }
    } else {
      yield datum;
    }
  }
}

/**
 * Flatten an async iterable by a number of dimensions.
 *
 * Ex: [[1, 2], [3, 4], 5] => [1, 2, 3, 4, 5] // Flattened by one dimension
 *
 * @param data
 * @param dimensions
 */
export async function* flattenAsync(
  data:
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>,
  dimensions = Infinity
): AsyncIterable<unknown> {
  if (dimensions < 1) {
    for await (let datum of toAsyncIterable(data)) {
      if (data instanceof Map) {
        datum = (datum as [unknown, unknown])[1];
      }

      yield datum;
    }
    return;
  }

  for await (let datum of toAsyncIterable(data)) {
    if (data instanceof Map) {
      datum = (datum as [unknown, unknown])[1];
    }

    if (
      (isAsyncIterable(datum) || isIterable(datum) || isIterator(datum)) &&
      !isString(datum)
    ) {
      for await (const subDatum of flattenAsync(
        datum as Iterable<unknown> | Iterator<unknown>,
        dimensions - 1
      )) {
        yield subDatum;
      }
    } else {
      yield datum;
    }
  }
}

/**
 * Filter out elements from the iterable only returning elements where there predicate function is true.
 *
 * @param data
 * @param predicate
 */
export function* filter<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (datum: T) => boolean
): Iterable<T> {
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      yield datum;
    }
  }
}

/**
 * Filter out elements from the async iterable only returning elements where there predicate function is true.
 *
 * Predicate may be also async.
 *
 * @param data
 * @param predicate
 */
export async function* filterAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  predicate: (datum: T) => boolean | Promise<boolean>
): AsyncIterable<T> {
  for await (const datum of toAsyncIterable(data)) {
    if (await predicate(datum)) {
      yield datum;
    }
  }
}

/**
 * Return overlapped chunks of elements from given collection.
 *
 * Chunk size must be at least 1.
 *
 * Overlap size must be less than chunk size.
 *
 * @param data
 * @param chunkSize
 * @param overlapSize
 * @param includeIncompleteTail
 */
export function* chunkwiseOverlap<T>(
  data: Iterable<T> | Iterator<T>,
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail = true
): Iterable<Array<T>> {
  if (chunkSize < 1) {
    throw new InvalidArgumentError(`Chunk size must be ≥ 1. Got ${chunkSize}`);
  }

  if (overlapSize >= chunkSize) {
    throw new InvalidArgumentError("Overlap size must be less than chunk size");
  }

  let chunk: Array<T> = [];
  let isLastIterationYielded = false;

  for (const datum of toIterable(data)) {
    isLastIterationYielded = false;
    chunk.push(datum);

    if (chunk.length === chunkSize) {
      yield chunk;
      chunk = chunk.slice(chunkSize - overlapSize);
      isLastIterationYielded = true;
    }
  }

  if (!isLastIterationYielded && chunk.length > 0 && includeIncompleteTail) {
    yield chunk;
  }
}

/**
 * Return overlapped chunks of elements from given async collection.
 *
 * Chunk size must be at least 1.
 *
 * Overlap size must be less than chunk size.
 *
 * @param data
 * @param chunkSize
 * @param overlapSize
 * @param includeIncompleteTail
 */
export async function* chunkwiseOverlapAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail = true
): AsyncIterable<Array<T>> {
  if (chunkSize < 1) {
    throw new InvalidArgumentError(`Chunk size must be ≥ 1. Got ${chunkSize}`);
  }

  if (overlapSize >= chunkSize) {
    throw new InvalidArgumentError("Overlap size must be less than chunk size");
  }

  let chunk: Array<T> = [];
  let isLastIterationYielded = false;

  for await (const datum of toAsyncIterable(data)) {
    isLastIterationYielded = false;
    chunk.push(datum);

    if (chunk.length === chunkSize) {
      yield chunk;
      chunk = chunk.slice(chunkSize - overlapSize);
      isLastIterationYielded = true;
    }
  }

  if (!isLastIterationYielded && chunk.length > 0 && includeIncompleteTail) {
    yield chunk;
  }
}

/**
 * Return chunks of elements from given collection.
 *
 * Chunk size must be at least 1.
 *
 * @param data
 * @param chunkSize
 */
export function* chunkwise<T>(
  data: Iterable<T> | Iterator<T>,
  chunkSize: number
): Iterable<Array<T>> {
  for (const chunk of chunkwiseOverlap(data, chunkSize, 0)) {
    yield chunk;
  }
}

/**
 * Return chunks of elements from given async collection.
 *
 * Chunk size must be at least 1.
 *
 * @param data
 * @param chunkSize
 */
export async function* chunkwiseAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  chunkSize: number
): AsyncIterable<Array<T>> {
  for await (const chunk of chunkwiseOverlapAsync(data, chunkSize, 0)) {
    yield chunk;
  }
}

/**
 * Return pairs of elements from given collection.
 *
 * Returns empty generator if given collection contains less than 2 elements.
 *
 * @param data
 */
export function* pairwise<T>(
  data: Iterable<T> | Iterator<T>
): Iterable<Pair<T>> {
  const chunked = chunkwiseOverlap(data, 2, 1, false);

  for (const chunk of chunked) {
    yield chunk as Pair<T>;
  }
}

/**
 * Return pairs of elements from given async collection.
 *
 * Returns empty generator if given collection contains less than 2 elements.
 *
 * @param data
 */
export async function* pairwiseAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): AsyncIterable<Pair<T>> {
  const chunked = chunkwiseOverlapAsync(data, 2, 1, false);

  for await (const chunk of chunked) {
    yield chunk as Pair<T>;
  }
}

/**
 * Limit iteration to a max size limit.
 *
 * @param data
 * @param count ≥ 0, max count of iteration
 */
export function* limit<T>(
  data: Iterable<T> | Iterator<T>,
  count: number
): Iterable<T> {
  if (count < 0) {
    throw new InvalidArgumentError(`Limit must be ≥ 0. Got ${count}`);
  }

  let i = 0;
  for (const datum of toIterable(data)) {
    if (i >= count) {
      return;
    }
    yield datum;
    ++i;
  }
}

/**
 * Limit iteration of async iterable to a max size limit.
 *
 * @param data
 * @param count ≥ 0, max count of iteration
 */
export async function* limitAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  count: number
): AsyncIterable<T> {
  if (count < 0) {
    throw new InvalidArgumentError(`Limit must be ≥ 0. Got ${count}`);
  }

  let i = 0;
  for await (const datum of toAsyncIterable(data)) {
    if (i >= count) {
      return;
    }
    yield datum;
    ++i;
  }
}

/**
 * Enumerates items of given collection.
 *
 * Ex: ['a', 'b', 'c'] => [[0, 'a'], [1, 'b'], [2, 'c']]
 *
 * @param data
 */
export function* enumerate<T>(
  data: Iterable<T> | Iterator<T>
): Iterable<[number, T]> {
  let i = 0;
  for (const datum of toIterable(data)) {
    yield [i++, datum];
  }
}

/**
 * Enumerates items of given async collection.
 *
 * Ex: ['a', 'b', 'c'] => [[0, 'a'], [1, 'b'], [2, 'c']]
 *
 * @param data
 */
export async function* enumerateAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): AsyncIterable<[number, T]> {
  let i = 0;
  for await (const datum of toAsyncIterable(data)) {
    yield [i++, datum];
  }
}

/**
 * Extract a slice of the collection.
 *
 * @param data
 * @param start
 * @param count
 * @param step
 *
 * @throws InvalidArgumentError if `start` or `count` are negative or if `step` is not positive.
 */
export function* slice<T>(
  data: Iterable<T> | Iterator<T>,
  start = 0,
  count?: number,
  step = 1
): Iterable<T> {
  if (start < 0) {
    throw new InvalidArgumentError("Parameter 'start' cannot be negative");
  }

  if (count !== undefined && count < 0) {
    throw new InvalidArgumentError("Parameter 'count' cannot be negative");
  }

  if (step <= 0) {
    throw new InvalidArgumentError("Parameter 'step' must be positive");
  }

  let index = 0;
  let yielded = 0;
  for (const datum of toIterable(data)) {
    if (index++ < start || (index - start - 1) % step !== 0) {
      continue;
    }

    if (yielded++ === count && count !== undefined) {
      break;
    }

    yield datum;
  }
}

/**
 * Extract a slice of the async collection.
 *
 * @param data
 * @param start
 * @param count
 * @param step
 *
 * @throws InvalidArgumentError if `start` or `count` are negative or if `step` is not positive.
 */
export async function* sliceAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  start = 0,
  count?: number,
  step = 1
): AsyncIterable<T> {
  if (start < 0) {
    throw new InvalidArgumentError("Parameter 'start' cannot be negative");
  }

  if (count !== undefined && count < 0) {
    throw new InvalidArgumentError("Parameter 'count' cannot be negative");
  }

  if (step <= 0) {
    throw new InvalidArgumentError("Parameter 'step' must be positive");
  }

  let index = 0;
  let yielded = 0;
  for await (const datum of toAsyncIterable(data)) {
    if (index++ < start || (index - start - 1) % step !== 0) {
      continue;
    }

    if (yielded++ === count && count !== undefined) {
      break;
    }

    yield datum;
  }
}

/**
 * Iterates keys from the collection of key-value pairs.
 *
 * Ex: [[0, 'a'], [1, 'b'], [2, 'c']] => [0, 1, 2]
 *
 * @param collection
 */
export function* keys<TKey, TValue>(
  collection: Iterable<[TKey, TValue]> | Iterator<[TKey, TValue]>
): Iterable<TKey> {
  for (const [key] of toIterable(collection)) {
    yield key;
  }
}

/**
 * Iterates keys from the async collection of key-value pairs.
 *
 * Ex: [[0, 'a'], [1, 'b'], [2, 'c']] => [0, 1, 2]
 *
 * @param collection
 */
export async function* keysAsync<TKey, TValue>(
  collection:
    | AsyncIterable<[TKey, TValue]>
    | AsyncIterator<[TKey, TValue]>
    | Iterable<[TKey, TValue]>
    | Iterator<[TKey, TValue]>
): AsyncIterable<TKey> {
  for await (const [key] of toAsyncIterable(collection)) {
    yield key;
  }
}

/**
 * Skip n elements in the iterable after optional offset.
 *
 * @param data
 * @param count
 * @param offset
 *
 * @throws InvalidArgumentError if `count` or `offset` is less then 0
 */
export function* skip<T>(
  data: Iterable<T> | Iterator<T>,
  count: number,
  offset = 0
): Iterable<T> {
  if (count < 0 || offset < 0) {
    throw new InvalidArgumentError();
  }

  let skipped = -offset;
  for (const datum of toIterable(data)) {
    if (skipped < 0 || skipped >= count) {
      yield datum;
    }
    ++skipped;
  }
}

/**
 * Skip n elements in the async iterable after optional offset.
 *
 * @param data
 * @param count
 * @param offset
 *
 * @throws InvalidArgumentError if `count` or `offset` is less then 0
 */
export async function* skipAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  count: number,
  offset = 0
): AsyncIterable<T> {
  if (count < 0 || offset < 0) {
    throw new InvalidArgumentError();
  }

  let skipped = -offset;
  for await (const datum of toAsyncIterable(data)) {
    if (skipped < 0 || skipped >= count) {
      yield datum;
    }
    ++skipped;
  }
}

/**
 * Iterates values from the collection of key-value pairs.
 *
 * Ex: [[0, 'a'], [1, 'b'], [2, 'c']] => ['a', 'b', 'c']
 *
 * @param collection
 */
export function* values<TKey, TValue>(
  collection: Iterable<[TKey, TValue]> | Iterator<[TKey, TValue]>
): Iterable<TValue> {
  for (const [, value] of toIterable(collection)) {
    yield value;
  }
}

/**
 * Iterates values from the async collection of key-value pairs.
 *
 * Ex: [[0, 'a'], [1, 'b'], [2, 'c']] => ['a', 'b', 'c']
 *
 * @param collection
 */
export async function* valuesAsync<TKey, TValue>(
  collection:
    | AsyncIterable<[TKey, TValue]>
    | AsyncIterator<[TKey, TValue]>
    | Iterable<[TKey, TValue]>
    | Iterator<[TKey, TValue]>
): AsyncIterable<TValue> {
  for await (const [, value] of toAsyncIterable(collection)) {
    yield value;
  }
}

/**
 * Group data by a common data element.
 *
 * Iterate pairs of group name and collection of grouped items.
 *
 * Collection of grouped items may be an array or an object (depends on presence of `itemKeyFunction` param).
 *
 * The `groupKeyFunction` determines the key (or multiple keys) to group elements by.
 *
 * The `itemKeyFunction` (optional) determines the key of element in group.
 *
 * @param data
 * @param groupKeyFunction
 * @param itemKeyFunction
 */
export function* groupBy<T>(
  data: Iterable<T> | Iterator<T>,
  groupKeyFunction: (item: T) => string,
  itemKeyFunction?: (item: T) => string
): Iterable<[string, Array<T>] | [string, Record<string, T>]> {
  const groups = new Map();
  const addGroup = (name: string) => {
    if (!groups.has(name)) {
      if (itemKeyFunction !== undefined) {
        groups.set(name, {});
      } else {
        groups.set(name, []);
      }
    }
  };

  for (const item of toIterable(data)) {
    const group = groupKeyFunction(item);

    const itemKey =
      itemKeyFunction !== undefined ? itemKeyFunction(item) : undefined;
    const itemGroups =
      (isIterable(group) || isIterator(group)) && !isString(group)
        ? group
        : [group];

    for (const itemGroup of distinct(itemGroups)) {
      addGroup(itemGroup);
      if (itemKey === undefined) {
        groups.get(itemGroup).push(item);
      } else {
        groups.get(itemGroup)[itemKey] = item;
      }
    }
  }

  for (const group of groups) {
    yield group;
  }
}

/**
 * Group async data by a common data element.
 *
 * Iterate pairs of group name and collection of grouped items.
 *
 * Collection of grouped items may be an array or an object (depends on presence of `itemKeyFunction` param).
 *
 * The `groupKeyFunction` determines the key (or multiple keys) to group elements by.
 *
 * The `itemKeyFunction` (optional) determines the key of element in group.
 *
 * Functions `groupKeyFunction` and `itemKeyFunction` may be async.
 *
 * @param data
 * @param groupKeyFunction
 * @param itemKeyFunction
 */
export async function* groupByAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  groupKeyFunction: (item: T) => string | Promise<string>,
  itemKeyFunction?: (item: T) => string | Promise<string>
): AsyncIterable<[string, Array<T>] | [string, Record<string, T>]> {
  const groups = new Map();
  const addGroup = (name: string) => {
    if (!groups.has(name)) {
      if (itemKeyFunction !== undefined) {
        groups.set(name, {});
      } else {
        groups.set(name, []);
      }
    }
  };

  for await (const item of toAsyncIterable(data)) {
    const group = await groupKeyFunction(item);

    const itemKey =
      itemKeyFunction !== undefined ? await itemKeyFunction(item) : undefined;
    const itemGroups =
      (isAsyncIterable(group) || isIterable(group) || isIterator(group)) &&
      !isString(group)
        ? group
        : [group];

    for await (const itemGroup of distinctAsync(itemGroups)) {
      addGroup(itemGroup);
      if (itemKey === undefined) {
        groups.get(itemGroup).push(item);
      } else {
        groups.get(itemGroup)[itemKey] = item;
      }
    }
  }

  for (const group of groups) {
    yield group;
  }
}

/**
 * Sorts the given collection.
 *
 * If comparator is null, the elements of given iterable must be comparable.
 *
 * @param data
 * @param comparator
 */
export function* sort<T>(
  data: Iterable<T> | Iterator<T>,
  comparator?: Comparator<T>
): Iterable<T> {
  const result = toArray(data);

  if (comparator !== undefined) {
    result.sort(comparator);
  } else {
    result.sort();
  }

  for (const datum of result) {
    yield datum;
  }
}

/**
 * Sorts the given collection.
 *
 * If comparator is null, the elements of given iterable must be comparable.
 *
 * @param data
 * @param comparator
 */
export async function* sortAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  comparator?: Comparator<T>
): AsyncIterable<T> {
  const result = await toArrayAsync(data);

  if (comparator !== undefined) {
    result.sort(comparator);
  } else {
    result.sort();
  }

  for (const datum of result) {
    yield datum;
  }
}
