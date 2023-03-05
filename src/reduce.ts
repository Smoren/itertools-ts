import { toIterable } from "./tools";

export function *reduceFunc<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
	reducer: (datum: TInput, initialValue: null) => TOutput,
	initialValue: null
): unknown {
	let carry = initialValue;

	for (const datum of toIterable(data)) {
		yield reducer(datum, carry);
  }
}