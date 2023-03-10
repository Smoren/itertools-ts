import { toIterable } from "./transform";
import { single, transform } from "./index";

export function toValue<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
  reducer: (carry: TOutput|undefined, datum: TInput) => TOutput,
  initialValue?: TOutput,
): TOutput|undefined {
  let carry = initialValue;

  for (const datum of toIterable(data)) {
    carry = reducer(carry, datum);
  }

  return carry;
}

export function toMin<TValue, TComparable>(
  data: Iterable<TValue>|Iterator<TValue>,
  compareBy?: (datum: TValue) => TComparable,
): TValue|undefined {
  if (compareBy !== undefined) {
    return toValue(
      data,
      (carry: TValue|undefined, datum) => compareBy(datum) < compareBy(carry ?? datum)
        ? datum
        : carry ?? datum
    );
  }

  return toValue(data, (carry, datum) => {
    const lhs = carry ?? datum;
    const rhs = datum;

    return lhs <= rhs ? lhs : rhs;
  });
}

export function toMax<TValue, TComparable>(
  data: Iterable<TValue>|Iterator<TValue>,
  compareBy?: (datum: TValue) => TComparable,
): TValue|undefined {
  if (compareBy !== undefined) {
    return toValue(
      data,
      (carry: TValue|undefined, datum) => compareBy(datum) > compareBy(carry ?? datum)
        ? datum
        : carry ?? datum
    );
  }

  return toValue(data, (carry, datum) => {
    const lhs = carry ?? datum;
    const rhs = datum;

    return lhs >= rhs ? lhs : rhs;
  });
}

export function toSum(data: Iterable<number>|Iterator<number>): number {
  return toValue(
    data,
    (carry, datum) => (carry as number) + Number(datum),
    0,
  ) as number;
}

export function toProduct(data: Iterable<number>|Iterator<number>): number|undefined {
  return toValue(
    data,
    (carry, datum) => (carry ?? 1) * datum,
  );
}

export function toCount(data: Iterable<unknown>|Iterator<unknown>): number
{
  switch (true) {
    case data instanceof Array:
      return (data as Array<unknown>).length;
    case typeof (data as unknown) === 'string' || data instanceof String:
      return (data as String).length;
    case data instanceof Set:
      return (data as Set<unknown>).size;
    case data instanceof Map:
      return (data as Map<unknown, unknown>).size;
  }

  return toValue(
    data,
    (carry) => (carry as number) + 1,
    0
  ) as number;
}
