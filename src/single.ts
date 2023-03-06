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

export function *chunkwiseOverlap<T>(
  data: Iterable<T>|Iterator<T>,
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail: boolean = true,
): Iterable<Array<T>> {
  if (chunkSize < 1) {
    throw new InvalidArgumentError(`Chunk size must be ≥ 1. Got ${chunkSize}`);
  }

  if (overlapSize >= chunkSize) {
    throw new InvalidArgumentError('Overlap size must be less than chunk size');
  }

  let chunk: Array<T> = [];
  let isLastIterationYielded = false;

  for (const datum of toIterable(data)) {
    isLastIterationYielded = false;
    chunk.push(datum);

    if (chunk.length === chunkSize) {
      yield chunk;
      chunk = chunk.slice(chunkSize-overlapSize);
      isLastIterationYielded = true;
    }
  }

  if (!isLastIterationYielded && chunk.length > 0 && includeIncompleteTail) {
    yield chunk;
  }
}
