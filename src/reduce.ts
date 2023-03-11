import { toIterable } from "./transform";
import { LengthError } from "./exceptions";

/**
 * Reduces iterable source like `array.reduce()` function.
 *
 * @param data
 * @param reducer
 * @param initialValue
 */
export function toValue<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  reducer: (carry: TOutput | undefined, datum: TInput) => TOutput,
  initialValue?: TOutput
): TOutput | undefined {
  let carry = initialValue;

  for (const datum of toIterable(data)) {
    carry = reducer(carry, datum);
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
  data: Iterable<number> | Iterator<number>,
): number | undefined {
  const [count, sum] = toValue(data, (carry, datum) => {
    const [count, sum] = carry as [number, number];
    return [count + 1, sum + Number(datum)];
  }, [0, 0]) as [number, number];

  return count ? (sum / count) : undefined;
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
export function toMin<TValue, TComparable>(
  data: Iterable<TValue> | Iterator<TValue>,
  compareBy?: (datum: TValue) => TComparable
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
export function toMax<TValue, TComparable>(
  data: Iterable<TValue> | Iterator<TValue>,
  compareBy?: (datum: TValue) => TComparable
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
 * Reduces given iterable to its length.
 *
 * @param data
 */
export function toCount(data: Iterable<unknown> | Iterator<unknown>): number {
  switch (true) {
    case data instanceof Array:
      return (data as Array<unknown>).length;
    case typeof (data as unknown) === "string" || data instanceof String:
      return (data as string).length;
    case data instanceof Set:
      return (data as Set<unknown>).size;
    case data instanceof Map:
      return (data as Map<unknown, unknown>).size;
  }

  return toValue(data, (carry) => (carry as number) + 1, 0) as number;
}

/**
 * Reduces given collection to its first value.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export function toFirst<T>(data: Iterable<T> | Iterator<T>): T
{
  for (const datum of toIterable(data)) {
    return datum;
  }

  throw new LengthError('Collection is empty');
}

/**
 * Reduces given collection to its last value.
 *
 * @param data
 *
 * @throws LengthError if given collection is empty.
 */
export function toLast<T>(data: Iterable<T> | Iterator<T>): T
{
  let isEmpty = true;
  let result;

  for (const datum of toIterable(data)) {
    result = datum;
    isEmpty = false;
  }

  if (isEmpty) {
    throw new LengthError('Collection is empty');
  }

  return result as T;
}
