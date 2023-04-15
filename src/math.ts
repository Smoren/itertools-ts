import { toAsyncIterable, toIterable } from "./transform";

/**
 * Accumulate the running average (mean) over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running average leads off with the initial value.
 */
export function* runningAverage<T>(
  numbers: Iterable<T> | Iterator<T>,
  initialValue?: number
): Iterable<number> {

  let n = 0;
  for (const total of runningTotal(toIterable(numbers), initialValue)) {
    n++;
    yield total / n as number;
  }
}

/**
 * Accumulate the running average (mean) over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running average leads off with the initial value.
 */
export async function* runningAverageAsync<T>(
  numbers: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  initialValue?: number
): AsyncIterable<number> {

  let n = 0;
  for await (const total of runningTotalAsync(toAsyncIterable(numbers), initialValue)) {
    n++;
    yield total / n as number;
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

/**
 * Accumulate the running max over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running max leads off with the initial value.
 */
export function* runningMax<T>(
  numbers: Iterable<T> | Iterator<T>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let max = initialValue ?? -Infinity;
  for (const num of toIterable(numbers)) {
    max = Math.max(max, num as number);
    yield max as number;
  }
}

/**
 * Accumulate the running max over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running max leads off with the initial value.
 */
export async function* runningMaxAsync<T>(
  numbers: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  initialValue?: number
): AsyncIterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let max = initialValue ?? -Infinity;
  for await (const num of toAsyncIterable(numbers)) {
    max = Math.max(max, num as number);
    yield max as number;
  }
}

/**
 * Accumulate the running min over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running min leads off with the initial value.
 */
export function* runningMin<T>(
  numbers: Iterable<T> | Iterator<T>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let min = initialValue ?? Infinity;
  for (const num of toIterable(numbers)) {
    min = Math.min(min, num as number);
    yield min as number;
  }
}

/**
 * Accumulate the running min over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running min leads off with the initial value.
 */
export async function* runningMinAsync<T>(
  numbers: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  initialValue?: number
): AsyncIterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let min = initialValue ?? Infinity;
  for await (const num of toAsyncIterable(numbers)) {
    min = Math.min(min, num as number);
    yield min as number;
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

