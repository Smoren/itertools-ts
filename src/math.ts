import { toAsyncIterable, toIterable } from "./transform";

/**
 * Accumulate the running total over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running total leads off with the initial value.
 */
export function* runningTotal<T>(
  numbers: Iterable<T> | Iterator<T>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let total = initialValue ?? 0;
  for (const num of toIterable(numbers)) {
    total += Number(num as number);
    yield total as number;
  }
}

/**
 * Accumulate the running total over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running total leads off with the initial value.
 */
export async function* runningTotalAsync<T>(
  numbers: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  initialValue?: number
): AsyncIterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let total = initialValue ?? 0;
  for await (const num of toAsyncIterable(numbers)) {
    total += Number(num as number);
    yield total as number;
  }
}

/**
 * Accumulate the running product over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running product leads off with the initial value.
 */
export function* runningProduct<T>(
  numbers: Iterable<T> | Iterator<T>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let product = initialValue ?? 1;
  for (const num of toIterable(numbers)) {
    product *= Number(num as number);
    yield product as number;
  }
}

/**
 * Accumulate the running product over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running product leads off with the initial value.
 */
export async function* runningProductAsync<T>(
  numbers: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  initialValue?: number
): AsyncIterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let product = initialValue ?? 1;
  for await (const num of toAsyncIterable(numbers)) {
    product *= Number(num as number);
    yield product as number;
  }
}

/**
 * Accumulate the running difference over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running difference leads off with the initial value.
 */
export function* runningDifference<T>(
  numbers: Iterable<T> | Iterator<T>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let difference = initialValue ?? 0;
  for (const num of toIterable(numbers)) {
    difference -= Number(num as number);
    yield difference as number;
  }
}

/**
 * Accumulate the running difference over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running difference leads off with the initial value.
 */
export async function* runningDifferenceAsync<T>(
  numbers: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  initialValue?: number
): AsyncIterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let difference = initialValue ?? 0;
  for await (const num of toAsyncIterable(numbers)) {
    difference -= Number(num as number);
    yield difference as number;
  }
}
