import { zipEqual, zipEqualAsync } from "./multi";
import { mapAsync, pairwise, pairwiseAsync, enumerate } from "./single";
import { toCount, toCountAsync } from "./reduce";
import { toArrayAsync, toAsyncIterable, toIterable } from "./transform";
import { Comparable } from "./types";
import { UsageMap } from './tools';

/**
 * Returns true if all elements match the predicate function.
 *
 * Empty collections return true.
 *
 * @param data
 * @param predicate
 */
export function allMatch<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): boolean {
  for (const datum of toIterable(data)) {
    if (!predicate(datum)) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if all elements of async collection match the predicate function.
 *
 * Empty collections return true.
 *
 * @param data
 * @param predicate
 */
export async function allMatchAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  predicate: (item: T) => Promise<boolean> | boolean
): Promise<boolean> {
  for await (const datum of toAsyncIterable(data)) {
    if (!(await predicate(datum))) {
      return false;
    }
  }
  return true;
}

/**
 * Return true if all elements in given collection are unique.
 *
 * Empty collections return true.
 *
 * Considers different instances of data containers to be different, even if they have the same content.
 *
 * @param data
 */
export function allUnique(
  data: Iterable<unknown> | Iterator<unknown>
): boolean {
  const usages = new Set();

  for (const datum of toIterable(data)) {
    if (usages.has(datum)) {
      return false;
    }
    usages.add(datum);
  }

  return true;
}

/**
 * Return true if all elements in given async collection are unique.
 *
 * Empty collections return true.
 *
 * Considers different instances of data containers to be different, even if they have the same content.
 *
 * @param data
 */
export async function allUniqueAsync(
  data:
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
): Promise<boolean> {
  const usages = new Set();

  for await (const datum of toAsyncIterable(data)) {
    if (usages.has(datum)) {
      return false;
    }
    usages.add(datum);
  }

  return true;
}

/**
 * Returns true if any element matches the predicate function.
 *
 * Empty collections return false.
 *
 * @param data
 * @param predicate
 */
export function anyMatch<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): boolean {
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      return true;
    }
  }
  return false;
}

/**
 * Returns true if any element of async collection matches the predicate function.
 *
 * Empty collections return false.
 *
 * @param data
 * @param predicate
 */
export async function anyMatchAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  predicate: (item: T) => Promise<boolean> | boolean
): Promise<boolean> {
  for await (const datum of toAsyncIterable(data)) {
    if (await predicate(datum)) {
      return true;
    }
  }
  return false;
}

/**
 * Returns true if given collections are permutations of each other (using strict-type comparisons).
 *
 * Returns true if no collections given or for single collection.
 *
 * @param collections
 */
export function arePermutations(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean {
  if (collections.length < 2) {
    return true;
  }
  const usageMap = new UsageMap();
  let uniques = new Set();

  try {
    for (const values of zipEqual(...collections)) {
      for (const [collectionIndex, value] of enumerate(values)) {
        usageMap.addUsage(value, String(collectionIndex));
        uniques.add(value);
      }
    }
  } catch (e) {
    return false;
  }

  for (const value of uniques) {
    if (!usageMap.hasSameOwnerCount(value, collections.length)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns true if given async collections are permutations of each other (using strict-type comparisons).
 *
 * Returns true if no async collections given or for single collection.
 *
 * @param collections
 */
export async function arePermutationsAsync(...collections: Array<AsyncIterable<unknown> | AsyncIterator<unknown>>): Promise<boolean> {
  if (collections.length < 2) {
    return true;
  }
  const usageMap = new UsageMap();
  let uniques = new Set();

  try {
    for await (const values of zipEqualAsync(...collections)) {
      for (const [collectionIndex, value] of enumerate(values)) {
        usageMap.addUsage(value, String(collectionIndex));
        uniques.add(value);
      }
    }
  } catch (e) {
    return false;
  }

  for (const value of uniques) {
    if (!usageMap.hasSameOwnerCount(value, collections.length)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns true if exactly n items in the iterable are true where the predicate function is true.
 *
 * Default predicate if not provided is the boolean value of each data item.
 *
 * @param data
 * @param n
 * @param predicate
 */
export function exactlyN<T>(
  data: Iterable<T> | Iterator<T>,
  n: number,
  predicate?: (item: T) => boolean
): boolean {
  if (n < 0) {
    return false;
  }

  if (predicate === undefined) {
    predicate = (datum) => Boolean(datum);
  }

  let count = 0;
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      count++;
      if (count > n) {
        return false;
      }
    }
  }
  return count === n;
}

/**
 * Returns true if exactly n items in the async iterable are true where the predicate function is true.
 *
 * Default predicate if not provided is the boolean value of each data item.
 *
 * @param data
 * @param n
 * @param predicate
 */
export async function exactlyNAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  n: number,
  predicate?: (item: T) => Promise<boolean> | boolean
): Promise<boolean> {
  if (n < 0) {
    return false;
  }

  if (predicate === undefined) {
    predicate = (datum) => Boolean(datum);
  }

  let count = 0;
  for await (const datum of toAsyncIterable(data)) {
    if (await predicate(datum)) {
      count++;
      if (count > n) {
        return false;
      }
    }
  }
  return count === n;
}

/**
 * Returns true if given collection is empty.
 *
 * @param data
 */
export function isEmpty(data: Iterable<unknown> | Iterator<unknown>): boolean {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  for (const _ of toIterable(data)) {
    return false;
  }
  return true;
}

/**
 * Returns true if given async collection is empty.
 *
 * @param data
 */
export async function isEmptyAsync(
  data:
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
): Promise<boolean> {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  for await (const _ of toAsyncIterable(data)) {
    return false;
  }
  return true;
}

/**
 * Return true if given input is an Iterable instance.
 *
 * @param input
 */
export function isIterable(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return (
    typeof (input as Record<string | symbol, unknown>)[Symbol.iterator] ===
    "function"
  );
}

/**
 * Return true if given input is an AsyncIterable instance.
 *
 * @param input
 */
export function isAsyncIterable(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return (
    typeof (input as Record<string | symbol, unknown>)[Symbol.asyncIterator] ===
    "function"
  );
}

/**
 * Return true if given input is an Iterator instance.
 *
 * @param input
 */
export function isIterator(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return (
    (input as Record<string, unknown>).next !== undefined &&
    typeof (input as Record<string, unknown>).next === "function"
  );
}

/**
 * Returns true if given collection is sorted in descending order; otherwise false.
 *
 * Items of given collection must be comparable.
 *
 * Returns true if given collection is empty or has only one element.
 *
 * @param data
 */
export function isReversed(
  data: Iterable<Comparable> | Iterator<Comparable>
): boolean {
  for (const [lhs, rhs] of pairwise(toIterable(data))) {
    if (lhs < rhs) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if given async collection is sorted in descending order; otherwise false.
 *
 * Items of given collection must be comparable.
 *
 * Returns true if given collection is empty or has only one element.
 *
 * @param data
 */
export async function isReversedAsync(
  data:
    | AsyncIterable<Comparable>
    | AsyncIterator<Comparable>
    | Iterable<Comparable>
    | Iterator<Comparable>
): Promise<boolean> {
  for await (const [lhs, rhs] of pairwiseAsync(toAsyncIterable(data))) {
    if (lhs < rhs) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if given collection is sorted in ascending order; otherwise false.
 *
 * Items of given collection must be comparable.
 *
 * Returns true if given collection is empty or has only one element.
 *
 * @param data
 */
export function isSorted(
  data: Iterable<Comparable> | Iterator<Comparable>
): boolean {
  for (const [lhs, rhs] of pairwise(toIterable(data))) {
    if (lhs > rhs) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if given async collection is sorted in ascending order; otherwise false.
 *
 * Items of given collection must be comparable.
 *
 * Returns true if given collection is empty or has only one element.
 *
 * @param data
 */
export async function isSortedAsync(
  data:
    | AsyncIterable<Comparable>
    | AsyncIterator<Comparable>
    | Iterable<Comparable>
    | Iterator<Comparable>
): Promise<boolean> {
  for await (const [lhs, rhs] of pairwiseAsync(toAsyncIterable(data))) {
    if (lhs > rhs) {
      return false;
    }
  }
  return true;
}

/**
 * Return true if given input is string.
 *
 * @param input
 */
export function isString(input: unknown): boolean {
  return typeof input === "string" || input instanceof String;
}

/**
 * Returns true if no element matches the predicate function.
 *
 * Empty collections return true.
 *
 * @param data
 * @param predicate
 */
export function noneMatch<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): boolean {
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if no element in async collection matches the predicate function.
 *
 * Empty collections return true.
 *
 * @param data
 * @param predicate
 */
export async function noneMatchAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  predicate: (item: T) => Promise<boolean> | boolean
): Promise<boolean> {
  for await (const datum of toAsyncIterable(data)) {
    if (await predicate(datum)) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if all given collections are the same.
 *
 * For single collection or empty collections list returns true.
 *
 * @param collections
 */
export function same(
  ...collections: Array<Iterable<unknown> | Iterator<unknown>>
): boolean {
  try {
    for (const values of zipEqual(...collections)) {
      for (const [lhs, rhs] of pairwise(values)) {
        if (lhs !== rhs) {
          return false;
        }
      }
    }
  } catch (e) {
    return false;
  }

  return true;
}

/**
 * Returns true if all given async collections are the same.
 *
 * For single collection or empty collections list returns true.
 *
 * @param collections
 */
export async function sameAsync(
  ...collections: Array<
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
  >
): Promise<boolean> {
  try {
    for await (const values of zipEqualAsync(...collections)) {
      for (const [lhs, rhs] of pairwise(values)) {
        if (lhs !== rhs) {
          return false;
        }
      }
    }
  } catch (e) {
    return false;
  }

  return true;
}

/**
 * Returns true if all given collections have the same lengths.
 *
 * For single collection or empty collections list returns true.
 *
 * @param collections
 */
export function sameCount(
  ...collections: Array<Iterable<unknown> | Iterator<unknown>>
): boolean {
  if (collections.length <= 1) {
    return true;
  }

  const counts = collections.map((collection) => toCount(collection));

  return new Set(counts).size === 1;
}

/**
 * Returns true if all given async collections have the same lengths.
 *
 * For single collection or empty collections list returns true.
 *
 * @param collections
 */
export async function sameCountAsync(
  ...collections: Array<
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
  >
): Promise<boolean> {
  if (collections.length <= 1) {
    return true;
  }

  const counts = await mapAsync(
    collections,
    async (collection) => await toCountAsync(collection)
  );

  return new Set(await toArrayAsync(counts)).size === 1;
}
