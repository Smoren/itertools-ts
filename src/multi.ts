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
export function* zip(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.SHORTEST,
    ...iterables
  )) {
    yield values;
  }
}

/**
 * Iterate multiple iterable collections simultaneously.
 *
 * Make an iterator that aggregates items from multiple iterators.
 * Similar to Python's zip_longest function
 *
 * Iteration continues until the longest iterable is exhausted.
 * For uneven lengths, the exhausted iterables will produce null for the remaining iterations.
 *
 * @param iterables
 */
export function* zipLongest(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.LONGEST,
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
export function* zipEqual(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.STRICT_EQUAL,
    ...iterables
  )) {
    yield values;
  }
}

/**
 * Chain multiple iterables together into a single iteration.
 *
 * Makes a single continuous sequence out of multiple sequences.
 *
 * @param iterables
 */
export function* chain(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<unknown> {
  for (const iterable of iterables) {
    for (const item of toIterable(iterable)) {
      yield item;
    }
  }
}
