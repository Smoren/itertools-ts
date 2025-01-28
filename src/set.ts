import {
  toArray,
  toArrayAsync,
  toAsyncIterable,
  toIterable,
} from "./transform";
import {
  createAsyncMultipleIterator,
  createMultipleIterator,
  MultipleIterationMode,
  NoValueMonad,
  UsageMap,
} from "./tools";
import { enumerate, map, mapAsync } from "./single";
import { Comparable, InvalidArgumentError, single, ZipTuple } from "./index";

/**
 * Iterate only the distinct elements.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param data
 * @param compareBy
 */
export function* distinct<T>(
  data: Iterable<T> | Iterator<T>,
  compareBy?: (datum: T) => Comparable
): Iterable<T> {
  const used = new Set();

  if (data instanceof Map) {
    if (compareBy === undefined) {
      compareBy = (datum: T) => (datum as [unknown, Comparable])[1];
    }

    for (const datum of data) {
      const comparable = compareBy(datum as T);
      if (!used.has(comparable)) {
        yield datum as T;
        used.add(comparable);
      }
    }
  } else {
    if (compareBy === undefined) {
      compareBy = (datum: T) => datum as Comparable;
    }

    for (const datum of toIterable(data)) {
      const comparable = compareBy(datum);
      if (!used.has(comparable)) {
        yield datum;
        used.add(comparable);
      }
    }
  }
}

/**
 * Iterate only the distinct elements from async collection.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param data
 * @param compareBy
 */
export async function* distinctAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  compareBy?: (datum: T) => Comparable
): AsyncIterable<T> {
  const used = new Set();

  if (data instanceof Map) {
    for (const datum of distinct(data as Iterable<T>, compareBy)) {
      yield await datum;
    }
  } else {
    if (compareBy === undefined) {
      compareBy = (datum: T) => datum as Comparable;
    }

    for await (const datum of toAsyncIterable(data)) {
      const comparable = compareBy(datum);
      if (!used.has(comparable)) {
        yield datum;
        used.add(comparable);
      }
    }
  }
}

/**
 * Iterates the intersection of iterables using type coercion.
 *
 * If input iterables produce duplicate items, then multiset intersection rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param iterables
 */
export function* intersection<T>(
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T> {
  yield* partialIntersection(iterables.length, ...iterables);
}

/**
 * Iterates the intersection of async iterables using type coercion.
 *
 * If input iterables produce duplicate items, then multiset intersection rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param iterables
 */
export async function* intersectionAsync<T>(
  ...iterables: Array<
    AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
  >
): AsyncIterable<T> {
  yield* partialIntersectionAsync(iterables.length, ...iterables);
}

/**
 * Iterates partial intersection of iterables.
 *
 * If input iterables produce duplicate items, then multiset intersection rules apply.
 * If `minIntersectionCount` is 1, then multiset union rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param minIntersectionCount
 * @param iterables
 */
export function* partialIntersection<T>(
  minIntersectionCount: number,
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T> {
  const usageMap = new UsageMap();

  const multipleIterator = createMultipleIterator(
    MultipleIterationMode.LONGEST,
    NoValueMonad,
    ...iterables
  );

  for (const values of multipleIterator) {
    for (const [owner, value] of enumerate(values)) {
      if (value === NoValueMonad) {
        continue;
      }

      usageMap.addUsage(value, `${owner}`);

      if (usageMap.getOwnersCount(value) === minIntersectionCount) {
        yield value as T;
        usageMap.deleteUsage(value);
      }
    }
  }
}

/**
 * Iterates partial intersection of async iterables.
 *
 * If input iterables produce duplicate items, then multiset intersection rules apply.
 * If `minIntersectionCount` is 1, then multiset union rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param minIntersectionCount
 * @param iterables
 */
export async function* partialIntersectionAsync<T>(
  minIntersectionCount: number,
  ...iterables: Array<
    AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
  >
): AsyncIterable<T> {
  const usageMap = new UsageMap();

  const multipleIterator = createAsyncMultipleIterator(
    MultipleIterationMode.LONGEST,
    NoValueMonad,
    ...iterables
  );

  for await (const values of multipleIterator) {
    for (const [owner, value] of enumerate(values)) {
      if (value === NoValueMonad) {
        continue;
      }

      usageMap.addUsage(value, `${owner}`);

      if (usageMap.getOwnersCount(value) === minIntersectionCount) {
        yield value as T;
        usageMap.deleteUsage(value);
      }
    }
  }
}

/**
 * Iterates the symmetric difference of iterables.
 *
 * If input iterables produce duplicate items, then multiset difference rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param iterables
 */
export function* symmetricDifference<T>(
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T> {
  const usageMap = new UsageMap();
  const valuesSet: Set<T> = new Set();

  const multipleIterator = createMultipleIterator(
    MultipleIterationMode.LONGEST,
    NoValueMonad,
    ...iterables
  );

  for (const values of multipleIterator) {
    for (const [owner, value] of enumerate(values)) {
      if (value === NoValueMonad) {
        continue;
      }

      usageMap.addUsage(value, `${owner}`);

      valuesSet.add(value as T);

      if (usageMap.getOwnersCount(value) === iterables.length) {
        usageMap.deleteUsage(value);
      }
    }
  }

  for (const value of valuesSet) {
    for (const item of single.repeat(value, usageMap.getUsagesCount(value))) {
      yield item as T;
    }
  }
}

/**
 * Iterates the symmetric difference of async iterables.
 *
 * If input iterables produce duplicate items, then multiset difference rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param iterables
 */
export async function* symmetricDifferenceAsync<T>(
  ...iterables: Array<
    AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
  >
): AsyncIterable<T> {
  const usageMap = new UsageMap();
  const valuesSet: Set<T> = new Set();

  const multipleIterator = createAsyncMultipleIterator(
    MultipleIterationMode.LONGEST,
    NoValueMonad,
    ...iterables
  );

  for await (const values of multipleIterator) {
    for (const [owner, value] of enumerate(values)) {
      if (value === NoValueMonad) {
        continue;
      }

      usageMap.addUsage(value, `${owner}`);

      valuesSet.add(value as T);

      if (usageMap.getOwnersCount(value) === iterables.length) {
        usageMap.deleteUsage(value);
      }
    }
  }

  for (const value of valuesSet) {
    for (const item of single.repeat(value, usageMap.getUsagesCount(value))) {
      yield item as T;
    }
  }
}

/**
 * Iterates union of given iterables.
 *
 * If input iterables produce duplicate items, then multiset intersection rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param iterables
 */
export function* union<T>(
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T> {
  yield* partialIntersection(1, ...iterables);
}

/**
 * Iterates union of given async iterables.
 *
 * If input iterables produce duplicate items, then multiset intersection rules apply.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param iterables
 */
export async function* unionAsync<T>(
  ...iterables: Array<
    AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
  >
): AsyncIterable<T> {
  yield* partialIntersectionAsync(1, ...iterables);
}

/**
 * Iterates cartesian product of given iterables.
 *
 * @param iterables
 */
export function* cartesianProduct<
  T extends Array<Iterable<unknown> | Iterator<unknown>>
>(...iterables: T): Iterable<ZipTuple<T, never>> {
  if (iterables.length === 0) {
    return;
  }

  if (iterables.length === 1) {
    for (const item of toIterable(iterables[0])) {
      yield [item] as ZipTuple<T, never>;
    }
    return;
  }

  const arrays = toArray(map(iterables, (iterable) => toArray(iterable)));
  const toIterate = arrays.reduce(
    (acc, set) =>
      acc.flatMap((x) => set.map((y) => [...(x as Array<unknown>), y])),
    [[]]
  );

  for (const item of toIterate) {
    yield item as ZipTuple<T, never>;
  }
}

/**
 * Iterates cartesian product of given async iterables.
 *
 * @param iterables
 */
export async function* cartesianProductAsync<
  T extends Array<
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
  >
>(...iterables: T): AsyncIterable<ZipTuple<T, never>> {
  if (iterables.length === 0) {
    return;
  }

  if (iterables.length === 1) {
    for await (const item of toAsyncIterable(iterables[0])) {
      yield [item] as ZipTuple<T, never>;
    }
    return;
  }

  const arrays = await toArrayAsync(
    mapAsync(iterables, async (iterable) => await toArrayAsync(iterable))
  );

  const toIterate = arrays.reduce(
    (acc, set) =>
      acc.flatMap((x) => set.map((y) => [...(x as Array<unknown>), y])),
    [[]]
  );

  for (const item of toIterate) {
    yield item as ZipTuple<T, never>;
  }
}

/**
 * Generates all permutations of given iterable.
 *
 * @param data
 * @param length
 */
export function* permutations<T>(data: Iterable<T> | Iterator<T>, length: number): Iterable<Array<T>> {
  const items = toArray(data);

  if (length < 0) {
    throw new InvalidArgumentError("Parameter 'length' cannot be negative");
  }

  function* generate(current: T[], remaining: T[]): Iterable<Array<T>> {
    if (current.length === length) {
      yield current.slice();
    } else {
      for (let i = 0; i < remaining.length; i++) {
        const nextCurrent = current.concat(remaining[i]);
        const nextRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
        yield* generate(nextCurrent, nextRemaining);
      }
    }
  }

  yield* generate([], items);
}

/**
 * Generates all permutations of given async iterable.
 *
 * @param data
 * @param length
 */
export async function* permutationsAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  length: number
): AsyncIterable<Array<T>> {
  yield* permutations(await toArrayAsync(data), length);
}
