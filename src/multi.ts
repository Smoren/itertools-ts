import { toIterable } from "./transform";
import { createMultipleIterator, MultipleIterationMode } from "./tools";

/**
 * Iterate multiple iterable collections simultaneously.
 *
 * Make an iterator that aggregates items from multiple iterators.
 * Similar to Python's zip function.
 *
 * For uneven lengths, iterations stops when the shortest iterable is exhausted.
 *
 * @param iterables
 */
export function* zip<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<{ [K in keyof T]: T[K] extends (infer V)[] ? V : never }> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.SHORTEST,
    undefined,
    ...iterables
  )) {
    yield values as { [K in keyof T]: T[K] extends (infer V)[] ? V : never };
  }
}

/**
 * Iterate multiple iterable collections simultaneously.
 *
 * Make an iterable that aggregates items from multiple iterators.
 * Similar to Python's zip_longest function.
 *
 * Iteration continues until the longest iterable is exhausted.
 * For uneven lengths, the exhausted iterables will produce `filler` value for the remaining iterations.
 *
 * @param filler
 * @param iterables
 */
export function* zipFilled<T extends Array<Iterable<unknown> | Iterator<unknown>>, F>(
  filler: F,
  ...iterables: T
): Iterable<{ [K in keyof T]: (T[K] extends (infer V)[] ? V : never) | F }> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.LONGEST,
    filler,
    ...iterables
  )) {
    yield values;
  }
}

/**
 * Iterate multiple iterable collections simultaneously.
 *
 * Make an iterable that aggregates items from multiple iterators.
 * Similar to Python's zip_longest function.
 *
 * Iteration continues until the longest iterable is exhausted.
 * For uneven lengths, the exhausted iterables will produce `undefined` for the remaining iterations.
 *
 * @param iterables
 */
export function* zipLongest<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<{ [K in keyof T]: (T[K] extends (infer V)[] ? V : never) | undefined }> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.LONGEST,
    undefined,
    ...iterables
  )) {
    yield values;
  }
}

/**
 * Iterate multiple iterable collections of equal lengths simultaneously.
 *
 * Works like multi.zip() method but throws LengthException if lengths not equal,
 * i.e., at least one iterator ends before the others.
 *
 * @param iterables
 *
 * @throws LengthError if iterators lengths not equal.
 */
export function* zipEqual<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<Iterable<{ [K in keyof T]: T[K] extends (infer V)[] ? V : never }>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.STRICT_EQUAL,
    undefined,
    ...iterables
  )) {
    yield values as { [K in keyof T]: T[K] extends (infer V)[] ? V : never };
  }
}

/**
 * Chain multiple iterables together into a single iteration.
 *
 * Makes a single continuous sequence out of multiple sequences.
 *
 * @param iterables
 */
export function* chain<T>(
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T> {
  for (const iterable of iterables) {
    for (const item of toIterable(iterable)) {
      yield item;
    }
  }
}
