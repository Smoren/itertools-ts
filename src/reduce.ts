import { toIterable } from "./tools";

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
