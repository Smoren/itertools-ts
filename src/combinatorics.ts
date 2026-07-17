import { ZipTuple } from "./types";
import { toArray, toArrayAsync, toAsyncIterable, toIterable } from "./transform";
import { map, mapAsync } from "./single";
import { InvalidArgumentError } from "./exceptions";

/**
 * Iterates cartesian product of given iterables.
 *
 * Each input iterable is materialized into an array internally (as repeated
 * iteration is required), but the product itself is generated lazily one
 * tuple at a time.
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

  const pools = toArray(map(iterables, (iterable) => toArray(iterable)));

  if (pools.some((pool) => pool.length === 0)) {
    return;
  }

  const indices = new Array(pools.length).fill(0);

  while (true) {
    yield pools.map((pool, i) => pool[indices[i]]) as ZipTuple<T, never>;

    let i = pools.length - 1;
    while (i >= 0) {
      indices[i]++;
      if (indices[i] < pools[i].length) {
        break;
      }
      indices[i] = 0;
      i--;
    }
    if (i < 0) {
      break;
    }
  }
}

/**
 * Iterates cartesian product of given async iterables.
 *
 * Each input iterable is materialized into an array internally (as repeated
 * iteration is required), but the product itself is generated lazily one
 * tuple at a time.
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

  const pools = await toArrayAsync(
    mapAsync(iterables, async (iterable) => await toArrayAsync(iterable))
  );

  if (pools.some((pool) => pool.length === 0)) {
    return;
  }

  const indices = new Array(pools.length).fill(0);

  while (true) {
    yield pools.map((pool, i) => pool[indices[i]]) as ZipTuple<T, never>;

    let i = pools.length - 1;
    while (i >= 0) {
      indices[i]++;
      if (indices[i] < pools[i].length) {
        break;
      }
      indices[i] = 0;
      i--;
    }
    if (i < 0) {
      break;
    }
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
