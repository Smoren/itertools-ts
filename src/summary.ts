import { zipEqual } from "./multi";
import { pairwise } from "./single";
import { toCount } from "./reduce";
import { toIterable } from "./transform";
import { Comparable } from "./types";

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
