import { zipEqual } from "./multi";
import { pairwise } from "./single";
import { toCount } from "./reduce";

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
 * Return true if given input is string.
 *
 * @param input
 */
export function isString(input: unknown): boolean {
  return typeof input === "string" || input instanceof String;
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

  return (new Set(counts)).size === 1;
}
