import { toIterable } from "./transform";
import {
  createMultipleIterator,
  MultipleIterationMode,
  NoValueMonad,
  UsageMap,
} from "./tools";
import { enumerate } from "./single";
import { single } from "./index";

/**
 * Iterate only the distinct elements.
 *
 * Always treats different instances of objects and arrays as unequal.
 *
 * @param data
 */
export function* distinct<T>(data: Iterable<T> | Iterator<T>): Iterable<T> {
  const used = new Set();

  if (data instanceof Map) {
    for (const datum of data) {
      if (!used.has(datum[1])) {
        yield datum as T;
        used.add(datum[1]);
      }
    }
  } else {
    for (const datum of toIterable(data)) {
      if (!used.has(datum)) {
        yield datum;
        used.add(datum);
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
