import { toIterable } from "./transform";
import { InvalidArgumentError } from "./exceptions";
import { isIterable, isIterator } from "./summary";

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

export function *flatten(
  data: Iterable<unknown>|Iterator<unknown>,
  dimensions: number = Infinity,
): Iterable<unknown> {
  if (dimensions < 1) {
    for (let datum of toIterable(data)) {
      if (data instanceof Map) {
        datum = (datum as [unknown, unknown])[1];
      }

      yield datum;
    }
    return;
  }

  for (let datum of toIterable(data)) {
    if (data instanceof Map) {
      datum = (datum as [unknown, unknown])[1];
    }

    if ((isIterable(datum) || isIterator(datum)) && !(typeof datum === 'string' || datum instanceof String)) {
      for (const subDatum of flatten(datum as Iterable<unknown>|Iterator<unknown>, dimensions-1)) {
        yield subDatum;
      }
    } else {
      yield datum;
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

export function *chunkwise<T>(data: Iterable<T>|Iterator<T>, chunkSize: number): Iterable<Array<T>> {
  for (const chunk of chunkwiseOverlap(data, chunkSize, 0)) {
    yield chunk;
  }
}

export type Pair<T> = [T, T];

export function *pairwise<T>(data: Iterable<T>|Iterator<T>): Iterable<Pair<T>>
{
  const chunked = chunkwiseOverlap(data, 2, 1, false);

  for (const chunk of chunked) {
    yield chunk as Pair<T>;
  }
}

export function *limit<T>(data: Iterable<T>|Iterator<T>, count: number): Iterable<T> {
  if (count < 0) {
    throw new InvalidArgumentError(`Limit must be ≥ 0. Got ${count}`);
  }

  let i = 0;
  for (const datum of toIterable(data)) {
    if (i >= count) {
      return;
    }
    yield datum;
    ++i;
  }
}
