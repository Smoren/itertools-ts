import { toIterable } from "./tools";

export function* map<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
  mapper: (datum: TInput) => TOutput,
): Iterable<TOutput> {
  for (const datum of toIterable(data)) {
    yield mapper(datum);
  }
}
