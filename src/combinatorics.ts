import { ZipTuple } from "./types";
import { toArray, toArrayAsync, toAsyncIterable, toIterable } from "./transform";
import { map, mapAsync } from "./single";
import { InvalidArgumentError } from "./exceptions";

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
 * Iterates all permutations of given iterable.
 *
 * @param data
 * @param length
 */
export function* permutations<T>(data: Iterable<T> | Iterator<T>, length: number): Iterable<Array<T>> {
  if (length < 0) {
    throw new InvalidArgumentError("Parameter 'length' cannot be negative");
  }

  const items = toArray(data);

  function* generate(current: T[], remaining: T[]): Iterable<Array<T>> {
    if (current.length === length) {
      yield current.slice();
    } else {
      for (let i = 0; i < remaining.length; i++) {
        const nextCurrent = [...current, remaining[i]];
        const nextRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
        yield* generate(nextCurrent, nextRemaining);
      }
    }
  }

  yield* generate([], items);
}

/**
 * Iterates all permutations of given async iterable.
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

/**
 * Iterates all combinations of given iterable.
 *
 * @param data
 * @param length
 */
export function* combinations<T>(data: Iterable<T> | Iterator<T>, length: number): Iterable<Array<T>> {
  if (length < 0) {
    throw new InvalidArgumentError("Parameter 'length' cannot be negative");
  }

  const items = toArray(data);
  const n = items.length;

  if (length === 0) {
    yield [];
    return;
  }

  if (length > n || length < 0) {
    return;
  }

  const indices = Array.from({ length: length }, (_, i) => i);

  yield indices.map((i) => items[i]);

  while (true) {
    let i = length - 1;

    // Let's find the index that can be incremented
    while (i >= 0 && indices[i] === i + n - length) {
      i--;
    }

    if (i < 0) {
      break; // All combinations have been generated
    }

    indices[i]++;

    for (let j = i + 1; j < length; j++) {
      indices[j] = indices[j - 1] + 1;
    }

    yield indices.map((i) => items[i])
  }
}

/**
 * Iterates all combinations of given async iterable.
 *
 * @param data
 * @param length
 */
export async function* combinationsAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  length: number
): AsyncIterable<Array<T>> {
  yield* combinations(await toArrayAsync(data), length);
}
