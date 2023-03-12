import { toIterable } from './transform';

export function* runningTotal<TInput, TOutput>(
  numbers: Iterable<TInput> | Iterator<TInput>,
  initialValue?: TOutput
): Iterable<TOutput> {

  if (initialValue !== undefined) {
    yield initialValue;
  }

  let total = initialValue ?? 0;
  for (const num of toIterable(numbers)) {
    total = (num as number) + (total as number);
    yield total as TOutput;
  }
}
