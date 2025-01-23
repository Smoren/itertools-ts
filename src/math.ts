import { toAsyncIterable, toIterable } from "./transform";
import { Numeric } from "./types";

/**
 * Accumulate the running average (mean) over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running average leads off with the initial value.
 */
export function* runningAverage(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number> {
  let n = 0;
  for (const total of runningTotal(toIterable(numbers), initialValue)) {
    n++;
    yield (total / n);
  }
}

/**
 * Accumulate the running average (mean) over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running average leads off with the initial value.
 */
export async function* runningAverageAsync(
  numbers: AsyncIterable<Numeric> | AsyncIterator<Numeric> | Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): AsyncIterable<number> {
  let n = 0;
  for await (const total of runningTotalAsync(
    toAsyncIterable(numbers),
    initialValue
  )) {
    n++;
    yield (total / n);
  }
}

/**
 * Accumulate the running difference over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running difference leads off with the initial value.
 */
export function* runningDifference(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let difference = initialValue ?? 0;
  for (const num of toIterable(numbers)) {
    difference -= Number(num);
    yield difference;
  }
}

/**
 * Accumulate the running difference over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running difference leads off with the initial value.
 */
export async function* runningDifferenceAsync(
  numbers: AsyncIterable<Numeric> | AsyncIterator<Numeric> | Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): AsyncIterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let difference = initialValue ?? 0;
  for await (const num of toAsyncIterable(numbers)) {
    difference -= Number(num);
    yield difference;
  }
}

/**
 * Accumulate the running max over a list of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running max leads off with the initial value.
 */
export function* runningMax(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number> {
  if (initialValue !== undefined) {
    yield initialValue;
  }

  let max = initialValue ?? -Infinity;
  for (const num of toIterable(numbers)) {
    max = Math.max(max, num as number);
    yield max;
  }
}

/**
 * Accumulate the running max over a async collection of numbers
 *
 * @param numbers
 * @param initialValue (Optional) If provided, the running max leads off with the initial value.
 */
export async function* runningMaxAsync(
  numbers: AsyncIterable<Numeric> | AsyncIterator<Numeric> | Iterable<Numeric> | Iterator<Numeric>,
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
export function* runningMin(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
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
export async function* runningMinAsync(
  numbers: AsyncIterable<Numeric> | AsyncIterator<Numeric> | Iterable<Numeric> | Iterator<Numeric>,
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
export function* runningProduct(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
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
export async function* runningProductAsync(
  numbers: AsyncIterable<Numeric> | AsyncIterator<Numeric> | Iterable<Numeric> | Iterator<Numeric>,
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
export function* runningTotal(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
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
export async function* runningTotalAsync(
  numbers: AsyncIterable<Numeric> | AsyncIterator<Numeric> | Iterable<Numeric> | Iterator<Numeric>,
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
