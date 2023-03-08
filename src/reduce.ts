import { toIterable } from "./transform";

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
