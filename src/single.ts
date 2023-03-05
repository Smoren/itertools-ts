import { isIterable, toIterable } from "./tools";
import { InvalidArgumentError } from "./exceptions";

export function *map<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
  mapper: (datum: TInput) => TOutput,
): Iterable<TOutput> {
  for (const datum of toIterable(data)) {
    yield mapper(datum);
  }
}

export function *repeat<T>(item: T, repetitions: number): Iterable<T> {
  if (repetitions < 0) {
    throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
  }
  for (let i = repetitions; i > 0; --i) {
    yield item;
  }
}

export type FlatMapper<TInput, TOutput> = (
  datum: Iterable<TInput>|Iterator<TInput>|TInput,
  mapper: FlatMapper<TInput, TOutput>
) => TOutput|Iterable<TInput>|Iterator<TInput>;

export function *flatMap<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
  mapper: FlatMapper<TInput, TOutput>,
): Iterable<TOutput> {
  for (const datum of toIterable<TInput>(data)) {
    const unflattened = mapper(datum, mapper);
    if (isIterable(unflattened)) {
      for (const flattenedItem of toIterable(unflattened as Iterable<TOutput>|Iterator<TOutput>)) {
        yield flattenedItem;
      }
    } else {
      yield unflattened as TOutput;
    }
  }
}

export function *filter<T>(
  data: Iterable<T>|Iterator<T>,
  predicate: (datum: T) => boolean,
): Iterable<T> {
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      yield datum;
    }
  }
}
