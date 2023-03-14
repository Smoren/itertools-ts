import { zipEqual } from "./multi";
import { pairwise } from "./single";

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
 * For single iterable or empty iterables list returns true.
 *
 * @param iterables
 */
export function same(...iterables: Array<Iterable<unknown> | Iterator<unknown>>): boolean {
  try {
    for (const values of zipEqual(...iterables)) {
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
