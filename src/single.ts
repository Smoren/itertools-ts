import { toIterable } from "./transform";
import { InvalidArgumentError } from "./exceptions";
import { isIterable, isIterator, isString } from "./summary";
import { distinct } from './set';

/**
 * Map a function onto every element of the iteration.
 *
 * @param data
 * @param mapper
 */
export function* map<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  mapper: (datum: TInput) => TOutput
): Iterable<TOutput> {
  for (const datum of toIterable(data)) {
    yield mapper(datum);
  }
}

/**
 * Repeat an item.
 *
 * @param item
 * @param repetitions
 */
export function* repeat<T>(item: T, repetitions: number): Iterable<T> {
  if (repetitions < 0) {
    throw new InvalidArgumentError(
      `Number of repetitions cannot be negative: ${repetitions}`
    );
  }
  for (let i = repetitions; i > 0; --i) {
    yield item;
  }
}

export type FlatMapper<TInput, TOutput> = (
  datum: Iterable<TInput> | Iterator<TInput> | TInput,
  mapper: FlatMapper<TInput, TOutput>
) => TOutput | Iterable<TInput> | Iterator<TInput>;

/**
 * Returns a new collection formed by applying a given callback mapper function to each element
 * of the given collection, and then flattening the result by one level.
 *
 * The mapper function can return scalar or collections as a result.
 *
 * @param data
 * @param mapper
 */
export function* flatMap<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  mapper: FlatMapper<TInput, TOutput>
): Iterable<TOutput> {
  for (const datum of toIterable<TInput>(data)) {
    const unflattened = mapper(datum, mapper);
    if (isIterable(unflattened)) {
      for (const flattenedItem of toIterable(
        unflattened as Iterable<TOutput> | Iterator<TOutput>
      )) {
        yield flattenedItem;
      }
    } else {
      yield unflattened as TOutput;
    }
  }
}

/**
 * Flatten an iterable by a number of dimensions.
 *
 * Ex: [[1, 2], [3, 4], 5] => [1, 2, 3, 4, 5] // Flattened by one dimension
 *
 * @param data
 * @param dimensions
 */
export function* flatten(
  data: Iterable<unknown> | Iterator<unknown>,
  dimensions = Infinity
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

    if ((isIterable(datum) || isIterator(datum)) && !isString(datum)) {
      for (const subDatum of flatten(
        datum as Iterable<unknown> | Iterator<unknown>,
        dimensions - 1
      )) {
        yield subDatum;
      }
    } else {
      yield datum;
    }
  }
}

/**
 * Filter out elements from the iterable only returning elements where there predicate function is true.
 *
 * @param data
 * @param predicate
 */
export function* filter<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (datum: T) => boolean
): Iterable<T> {
  for (const datum of toIterable(data)) {
    if (predicate(datum)) {
      yield datum;
    }
  }
}

/**
 * Return overlapped chunks of elements from given collection.
 *
 * Chunk size must be at least 1.
 *
 * Overlap size must be less than chunk size.
 *
 * @param data
 * @param chunkSize
 * @param overlapSize
 * @param includeIncompleteTail
 */
export function* chunkwiseOverlap<T>(
  data: Iterable<T> | Iterator<T>,
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail = true
): Iterable<Array<T>> {
  if (chunkSize < 1) {
    throw new InvalidArgumentError(`Chunk size must be ≥ 1. Got ${chunkSize}`);
  }

  if (overlapSize >= chunkSize) {
    throw new InvalidArgumentError("Overlap size must be less than chunk size");
  }

  let chunk: Array<T> = [];
  let isLastIterationYielded = false;

  for (const datum of toIterable(data)) {
    isLastIterationYielded = false;
    chunk.push(datum);

    if (chunk.length === chunkSize) {
      yield chunk;
      chunk = chunk.slice(chunkSize - overlapSize);
      isLastIterationYielded = true;
    }
  }

  if (!isLastIterationYielded && chunk.length > 0 && includeIncompleteTail) {
    yield chunk;
  }
}

/**
 * Return chunks of elements from given collection.
 *
 * Chunk size must be at least 1.
 *
 * @param data
 * @param chunkSize
 */
export function* chunkwise<T>(
  data: Iterable<T> | Iterator<T>,
  chunkSize: number
): Iterable<Array<T>> {
  for (const chunk of chunkwiseOverlap(data, chunkSize, 0)) {
    yield chunk;
  }
}

export type Pair<T> = [T, T];

/**
 * Return pairs of elements from given collection.
 *
 * Returns empty generator if given collection contains less than 2 elements.
 *
 * @param data
 */
export function* pairwise<T>(
  data: Iterable<T> | Iterator<T>
): Iterable<Pair<T>> {
  const chunked = chunkwiseOverlap(data, 2, 1, false);

  for (const chunk of chunked) {
    yield chunk as Pair<T>;
  }
}

/**
 * Limit iteration to a max size limit.
 *
 * @param data
 * @param count ≥ 0, max count of iteration
 */
export function* limit<T>(
  data: Iterable<T> | Iterator<T>,
  count: number
): Iterable<T> {
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

/**
 * Enumerates items of given collection.
 *
 * Ex: ['a', 'b', 'c'] => [[0, 'a'], [1, 'b'], [2, 'c']]
 *
 * @param data
 */
export function* enumerate<T>(
  data: Iterable<T> | Iterator<T>
): Iterable<[number, T]> {
  let i = 0;
  for (const datum of toIterable(data)) {
    yield [i++, datum];
  }
}

/**
 * Extract a slice of the collection.
 *
 * @param data
 * @param start
 * @param count
 * @param step
 *
 * @throws InvalidArgumentError if `start` or `count` are negative or if `step` is not positive.
 */
export function* slice<T>(
  data: Iterable<T> | Iterator<T>,
  start = 0,
  count?: number,
  step = 1
): Iterable<T> {
  if (start < 0) {
    throw new InvalidArgumentError("Parameter 'start' cannot be negative");
  }

  if (count !== undefined && count < 0) {
    throw new InvalidArgumentError("Parameter 'count' cannot be negative");
  }

  if (step <= 0) {
    throw new InvalidArgumentError("Parameter 'step' must be positive");
  }

  let index = 0;
  let yielded = 0;
  for (const datum of toIterable(data)) {
    if (index++ < start || (index - start - 1) % step !== 0) {
      continue;
    }

    if (yielded++ === count && count !== undefined) {
      break;
    }

    yield datum;
  }
}

/**
 * Iterates keys from the collection of key-value pairs.
 *
 * Ex: [[0, 'a'], [1, 'b'], [2, 'c']] => [0, 1, 2]
 *
 * @param collection
 */
export function* keys<TKey, TValue>(
  collection: Iterable<[TKey, TValue]> | Iterator<[TKey, TValue]>
): Iterable<TKey> {
  for (const [key] of toIterable(collection)) {
    yield key;
  }
}

/**
 * Iterates values from the collection of key-value pairs.
 *
 * Ex: [[0, 'a'], [1, 'b'], [2, 'c']] => ['a', 'b', 'c']
 *
 * @param collection
 */
export function* values<TKey, TValue>(
  collection: Iterable<[TKey, TValue]> | Iterator<[TKey, TValue]>
): Iterable<TValue> {
  for (const [, value] of toIterable(collection)) {
    yield value;
  }
}

/**
 * Group data by a common data element.
 *
 * Iterate pairs of group name and collection of grouped items.
 *
 * Collection of grouped items may be an array or an object (depends on presence of `itemKeyFunction` param).
 *
 * The `groupKeyFunction` determines the key (or multiple keys) to group elements by.
 *
 * The `itemKeyFunction` (optional) determines the key of element in group.
 *
 * @param data
 * @param groupKeyFunction
 * @param itemKeyFunction
 */
export function* groupBy<T>(
  data: Iterable<T> | Iterator<T>,
  groupKeyFunction: (item: T) => string,
  itemKeyFunction?: (item: T) => string,
): Iterable<[string, Array<T>] | [string, Record<string, T>]> {
  const groups = new Map();
  const addGroup = (name: string) => {
    if (!groups.has(name)) {
      if (itemKeyFunction !== undefined) {
        groups.set(name, {});
      } else {
        groups.set(name, []);
      }
    }
  };

  for (const item of toIterable(data)) {
    const group = groupKeyFunction(item);

    const itemKey = (itemKeyFunction !== undefined)
      ? itemKeyFunction(item)
      : undefined;
    const itemGroups = (isIterable(group) || isIterator(group)) && !isString(group)
      ? group
      : [group];

    for (const itemGroup of distinct(itemGroups)) {
      addGroup(itemGroup);
      if (itemKey === undefined) {
        groups.get(itemGroup).push(item);
      } else {
        groups.get(itemGroup)[itemKey] = item;
      }
    }
  }

  for (const group of groups) {
    yield group;
  }
}
