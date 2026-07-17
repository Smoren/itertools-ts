import { toAsyncIterable, toIterable } from "./transform";
import { LengthError } from "./exceptions";
import { isString } from "./summary";
import { NoValueMonad } from "./tools";
import { Comparable, Numeric } from "./types";
import { map, mapAsync } from "./single";

/**
 * Reduces iterable source like `array.reduce()` function.
 *
 * @param data
 * @param reducer
 * @param initialValue
 */
export function toValue<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  reducer: (carry: TOutput, datum: TInput) => TOutput,
  initialValue?: TOutput
): TOutput {
  let carry = initialValue as TOutput;

  for (const datum of toIterable(data)) {
    carry = reducer(carry, datum);
  }

  return carry;
}

/**
 * Reduces async iterable source like `array.reduce()` function.
 *
 * @param data
 * @param reducer
 * @param initialValue
 */
export async function toValueAsync<TInput, TOutput>(
  data:
    | AsyncIterable<TInput>
    | AsyncIterator<TInput>
    | Iterable<TInput>
    | Iterator<TInput>,
  reducer: (carry: TOutput, datum: TInput) => TOutput | Promise<TOutput>,
  initialValue?: TOutput
): Promise<TOutput> {
  let carry = initialValue as TOutput;

  for await (const datum of toAsyncIterable(data)) {
    carry = await reducer(carry, datum);
  }

  return carry;
}

/**
 * Reduces given collection to the mean average of its items.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 */
export function toAverage(
  data: Iterable<number> | Iterator<number>
): number | undefined {
  let count = 0;
  let sum = 0;

  for (const datum of toIterable(data)) {
    count++;
    sum += Number(datum);
  }

  return count ? sum / count : undefined;
}

/**
 * Reduces given async collection to the mean average of its items.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 */
export async function toAverageAsync(
  data:
    | AsyncIterable<number>
    | AsyncIterator<number>
    | Iterable<number>
    | Iterator<number>
): Promise<number | undefined> {
  let count = 0;
  let sum = 0;

  for await (const datum of toAsyncIterable(data)) {
    count++;
    sum += Number(datum);
  }

  return count ? sum / count : undefined;
}

/**
 * Reduces given iterable to its max value.
 *
 * Optional callable param `compareBy` must return comparable value.
 * If `compareBy` is not provided then items of given collection must be comparable.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 * @param compareBy
 */
export function toMax<TValue>(
  data: Iterable<TValue> | Iterator<TValue>,
  compareBy?: (datum: TValue) => Comparable
): TValue | undefined {
  let result: TValue | undefined;

  if (compareBy !== undefined) {
    let resultComparable: Comparable | undefined;
    for (const datum of toIterable(data)) {
      const comparable = compareBy(datum);
      if (resultComparable === undefined || comparable > resultComparable) {
        result = datum;
        resultComparable = comparable;
      }
    }
    return result;
  }

  for (const datum of toIterable(data)) {
    const lhs = result ?? datum;
    result = lhs >= datum ? lhs : datum;
  }
  return result;
}

/**
 * Reduces given async iterable to its max value.
 *
 * Optional callable param `compareBy` must return comparable value.
 * If `compareBy` is not provided then items of given collection must be comparable.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 * @param compareBy
 */
export async function toMaxAsync<TValue>(
  data:
    | AsyncIterable<TValue>
    | AsyncIterator<TValue>
    | Iterable<TValue>
    | Iterator<TValue>,
  compareBy?: (datum: TValue) => Promise<Comparable> | Comparable
): Promise<TValue | undefined> {
  let result: TValue | undefined;

  if (compareBy !== undefined) {
    let resultComparable: Comparable | undefined;
    for await (const datum of toAsyncIterable(data)) {
      const comparable = await compareBy(datum);
      if (resultComparable === undefined || comparable > resultComparable) {
        result = datum;
        resultComparable = comparable;
      }
    }
    return result;
  }

  for await (const datum of toAsyncIterable(data)) {
    const lhs = result ?? datum;
    result = lhs >= datum ? lhs : datum;
  }
  return result;
}

/**
 * Reduces given iterable to its min value.
 *
 * Optional callable param `compareBy` must return comparable value.
 * If `compareBy` is not provided then items of given collection must be comparable.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 * @param compareBy
 */
export function toMin<TValue>(
  data: Iterable<TValue> | Iterator<TValue>,
  compareBy?: (datum: TValue) => Comparable
): TValue | undefined {
  let result: TValue | undefined;

  if (compareBy !== undefined) {
    let resultComparable: Comparable | undefined;
    for (const datum of toIterable(data)) {
      const comparable = compareBy(datum);
      if (resultComparable === undefined || comparable < resultComparable) {
        result = datum;
        resultComparable = comparable;
      }
    }
    return result;
  }

  for (const datum of toIterable(data)) {
    const lhs = result ?? datum;
    result = lhs <= datum ? lhs : datum;
  }
  return result;
}

/**
 * Reduces given async iterable to its min value.
 *
 * Optional callable param `compareBy` must return comparable value.
 * If `compareBy` is not provided then items of given collection must be comparable.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 * @param compareBy
 */
export async function toMinAsync<TValue>(
  data:
    | AsyncIterable<TValue>
    | AsyncIterator<TValue>
    | Iterable<TValue>
    | Iterator<TValue>,
  compareBy?: (datum: TValue) => Promise<Comparable> | Comparable
): Promise<TValue | undefined> {
  let result: TValue | undefined;

  if (compareBy !== undefined) {
    let resultComparable: Comparable | undefined;
    for await (const datum of toAsyncIterable(data)) {
      const comparable = await compareBy(datum);
      if (resultComparable === undefined || comparable < resultComparable) {
        result = datum;
        resultComparable = comparable;
      }
    }
    return result;
  }

  for await (const datum of toAsyncIterable(data)) {
    const lhs = result ?? datum;
    result = lhs <= datum ? lhs : datum;
  }
  return result;
}

/**
 * Reduces given collection to array of its upper and lower bounds.
 *
 * Callable param `compareBy` must return comparable value.
 *
 * If `compareBy` is not proposed then items of given collection must be comparable.
 *
 * Returns `[undefined, undefined]` if given collection is empty.
 *
 * @param data
 * @param compareBy
 */
export function toMinMax<T>(
  data: Iterable<T> | Iterator<T>,
  compareBy?: (item: T) => Comparable
): [T?, T?] {
  const comparableGetter =
    compareBy !== undefined
      ? (compareBy as (item: T) => Comparable)
      : (item: T) => item as Comparable;

  let min: T | undefined;
  let max: T | undefined;
  let minComparable: Comparable | undefined;
  let maxComparable: Comparable | undefined;

  for (const datum of toIterable(data)) {
    const comparable = comparableGetter(datum);
    if (minComparable === undefined || comparable <= minComparable) {
      min = datum;
      minComparable = comparable;
    }
    if (maxComparable === undefined || comparable >= maxComparable) {
      max = datum;
      maxComparable = comparable;
    }
  }

  return [min, max];
}

/**
 * Reduces given async collection to array of its upper and lower bounds.
 *
 * Callable param `compareBy` must return comparable value.
 *
 * If `compareBy` is not proposed then items of given collection must be comparable.
 *
 * Returns `[undefined, undefined]` if given collection is empty.
 *
 * @param data
 * @param compareBy
 */
export async function toMinMaxAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  compareBy?: (item: T) => Promise<Comparable> | Comparable
): Promise<[T?, T?]> {
  const comparableGetter =
    compareBy !== undefined
      ? (compareBy as (item: T) => Promise<Comparable> | Comparable)
      : (item: T) => item as Comparable;

  let min: T | undefined;
  let max: T | undefined;
  let minComparable: Comparable | undefined;
  let maxComparable: Comparable | undefined;

  for await (const datum of toAsyncIterable(data)) {
    const comparable = await comparableGetter(datum);
    if (minComparable === undefined || comparable <= minComparable) {
      min = datum;
      minComparable = comparable;
    }
    if (maxComparable === undefined || comparable >= maxComparable) {
      max = datum;
      maxComparable = comparable;
    }
  }

  return [min, max];
}

/**
 * Reduces given collection to its range.
 *
 * Returns 0 if given collection is empty.
 *
 * @param numbers
 */
export function toRange(numbers: Iterable<Numeric> | Iterator<Numeric>): number {
  const [min, max] = toMinMax(map(numbers, (n) => Number(n)));

  return (max ?? 0) - (min ?? 0);
}

/**
 * Reduces given async collection to its range.
 *
 * Returns 0 if given async collection is empty.
 *
 * @param numbers
 */
export async function toRangeAsync(
  numbers:
    | AsyncIterable<Numeric>
    | AsyncIterator<Numeric>
    | Iterable<Numeric>
    | Iterator<Numeric>
): Promise<number> {
  const [min, max] = await toMinMaxAsync(mapAsync(numbers, (n) => Number(n)));

  return (max ?? 0) - (min ?? 0);
}

/**
 * Reduces given collection to the sum of its items.
 *
 * @param data
 */
export function toSum(data: Iterable<number> | Iterator<number>): number {
  let sum = 0;
  for (const datum of toIterable(data)) {
    sum += Number(datum);
  }
  return sum;
}

/**
 * Reduces given async collection to the sum of its items.
 *
 * @param data
 */
export async function toSumAsync(
  data:
    | AsyncIterable<number>
    | AsyncIterator<number>
    | Iterable<number>
    | Iterator<number>
): Promise<number> {
  let sum = 0;
  for await (const datum of toAsyncIterable(data)) {
    sum += Number(datum);
  }
  return sum;
}

/**
 * Reduces given collection to the product of its items.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 */
export function toProduct(
  data: Iterable<number> | Iterator<number>
): number | undefined {
  let result: number | undefined;

  for (const datum of toIterable(data)) {
    result = (result ?? 1) * datum;
  }

  return result;
}

/**
 * Reduces given async collection to the product of its items.
 *
 * Returns `undefined` if given collection is empty.
 *
 * @param data
 */
export async function toProductAsync(
  data:
    | AsyncIterable<number>
    | AsyncIterator<number>
    | Iterable<number>
    | Iterator<number>
): Promise<number | undefined> {
  let result: number | undefined;

  for await (const datum of toAsyncIterable(data)) {
    result = (result ?? 1) * datum;
  }

  return result;
}

/**
 * Reduces given iterable to its length.
 *
 * @param data
 */
export function toCount(data: Iterable<unknown> | Iterator<unknown>): number {
  switch (true) {
    case data instanceof Array:
      return (data as Array<unknown>).length;
    case isString(data as unknown):
      return (data as string).length;
    case data instanceof Set:
      return (data as Set<unknown>).size;
    case data instanceof Map:
      return (data as Map<unknown, unknown>).size;
  }

  let count = 0;
  for (const _ of toIterable(data)) {
    count++;
  }
  return count;
}

/**
 * Reduces given async iterable to its length.
 *
 * @param data
 */
export async function toCountAsync(
  data:
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
): Promise<number> {
  switch (true) {
    case data instanceof Array:
    case isString(data as unknown):
    case data instanceof Set:
    case data instanceof Map:
      return toCount(data as Iterable<unknown>);
  }

  let count = 0;
  for await (const _ of toAsyncIterable(data)) {
    count++;
  }
  return count;
}

/**
 * Reduces given collection to its first value.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export function toFirst<T>(data: Iterable<T> | Iterator<T>): T {
  for (const datum of toIterable(data)) {
    return datum;
  }

  throw new LengthError("Collection is empty");
}

/**
 * Reduces given async collection to its first value.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export async function toFirstAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): Promise<T> {
  for await (const datum of toAsyncIterable(data)) {
    return datum;
  }

  throw new LengthError("Collection is empty");
}

/**
 * Reduces given collection to its last value.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export function toLast<T>(data: Iterable<T> | Iterator<T>): T {
  let isEmpty = true;
  let result;

  for (const datum of toIterable(data)) {
    result = datum;
    isEmpty = false;
  }

  if (isEmpty) {
    throw new LengthError("Collection is empty");
  }

  return result as T;
}

/**
 * Reduces given async collection to its last value.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export async function toLastAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): Promise<T> {
  let isEmpty = true;
  let result;

  for await (const datum of toAsyncIterable(data)) {
    result = datum;
    isEmpty = false;
  }

  if (isEmpty) {
    throw new LengthError("Collection is empty");
  }

  return result as T;
}

/**
 * Reduces given collection to its first and last values.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export function toFirstAndLast<T>(data: Iterable<T> | Iterator<T>): [T, T] {
  let first: T | NoValueMonad = NoValueMonad;
  let last: T | NoValueMonad = NoValueMonad;

  for (const value of toIterable(data)) {
    if (first === NoValueMonad) {
      first = value;
    }
    last = value;
  }

  if (first === NoValueMonad) {
    throw new LengthError("Collection is empty");
  }

  return [first as T, last as T];
}

/**
 * Reduces given async collection to its first and last values.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export async function toFirstAndLastAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): Promise<[T, T]> {
  let first: T | NoValueMonad = NoValueMonad;
  let last: T | NoValueMonad = NoValueMonad;

  for await (const value of toAsyncIterable(data)) {
    if (first === NoValueMonad) {
      first = value;
    }
    last = value;
  }

  if (first === NoValueMonad) {
    throw new LengthError("Collection is empty");
  }

  return [first as T, last as T];
}
