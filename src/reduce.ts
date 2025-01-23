import { toAsyncIterable, toIterable } from "./transform";
import { LengthError } from "./exceptions";
import { isString } from "./summary";
import { NoValueMonad } from "./tools";
import { Comparable } from "./types";
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
  const [count, sum] = toValue(
    data,
    (carry, datum) => {
      const [count, sum] = carry as [number, number];
      return [count + 1, sum + Number(datum)];
    },
    [0, 0]
  ) as [number, number];

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
  const [count, sum] = (await toValueAsync(
    data,
    (carry, datum) => {
      const [count, sum] = carry as [number, number];
      return [count + 1, sum + Number(datum)];
    },
    [0, 0]
  )) as [number, number];

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
  if (compareBy !== undefined) {
    return toValue(data, (carry: TValue | undefined, datum) =>
      compareBy(datum) > compareBy(carry ?? datum) ? datum : carry ?? datum
    );
  }

  return toValue(data, (carry, datum) => {
    const lhs = carry ?? datum;
    const rhs = datum;

    return lhs >= rhs ? lhs : rhs;
  });
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
  if (compareBy !== undefined) {
    return await toValueAsync(data, async (carry: TValue | undefined, datum) =>
      (await compareBy(datum)) > (await compareBy(carry ?? datum))
        ? datum
        : carry ?? datum
    );
  }

  return await toValueAsync(data, (carry, datum) => {
    const lhs = carry ?? datum;
    const rhs = datum;

    return lhs >= rhs ? lhs : rhs;
  });
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
  if (compareBy !== undefined) {
    return toValue(data, (carry: TValue | undefined, datum) =>
      compareBy(datum) < compareBy(carry ?? datum) ? datum : carry ?? datum
    );
  }

  return toValue(data, (carry, datum) => {
    const lhs = carry ?? datum;
    const rhs = datum;

    return lhs <= rhs ? lhs : rhs;
  });
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
  if (compareBy !== undefined) {
    return await toValueAsync(data, async (carry: TValue | undefined, datum) =>
      (await compareBy(datum)) < (await compareBy(carry ?? datum))
        ? datum
        : carry ?? datum
    );
  }

  return await toValueAsync(data, (carry, datum) => {
    const lhs = carry ?? datum;
    const rhs = datum;

    return lhs <= rhs ? lhs : rhs;
  });
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

  return toValue(
    data,
    (carry, datum) => {
      carry = carry as [T?, T?];
      return [
        comparableGetter(datum) <= comparableGetter(carry[0] ?? datum)
          ? datum
          : carry[0] ?? datum,
        comparableGetter(datum) >= comparableGetter(carry[1] ?? datum)
          ? datum
          : carry[1] ?? datum,
      ];
    },
    [undefined, undefined] as [T?, T?]
  ) as [T?, T?];
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

  return (await toValueAsync(
    data,
    async (carry, datum) => {
      carry = carry as [T?, T?];
      return [
        (await comparableGetter(datum)) <=
        (await comparableGetter(carry[0] ?? datum))
          ? datum
          : carry[0] ?? datum,
        (await comparableGetter(datum)) >=
        (await comparableGetter(carry[1] ?? datum))
          ? datum
          : carry[1] ?? datum,
      ];
    },
    [undefined, undefined] as [T?, T?]
  )) as [T?, T?];
}

/**
 * Reduces given collection to its range.
 *
 * Returns 0 if given collection is empty.
 *
 * @param numbers
 */
export function toRange(
  numbers: Iterable<number | string> | Iterator<number | string>
): number {
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
    | AsyncIterable<number>
    | AsyncIterator<number>
    | Iterable<number>
    | Iterator<number>
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
  return toValue(
    data,
    (carry, datum) => (carry as number) + Number(datum),
    0
  ) as number;
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
  return (await toValueAsync(
    data,
    (carry, datum) => (carry as number) + Number(datum),
    0
  )) as number;
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
  return toValue(data, (carry, datum) => (carry ?? 1) * datum);
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
  return await toValueAsync(data, (carry, datum) => (carry ?? 1) * datum);
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

  return toValue(data, (carry) => (carry as number) + 1, 0) as number;
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

  return (await toValueAsync(
    data,
    (carry) => (carry as number) + 1,
    0
  )) as number;
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
