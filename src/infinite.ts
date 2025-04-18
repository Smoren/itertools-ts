import { toAsyncIterable, toIterable } from "./transform";

/**
 * Count sequentially forever
 *
 * @param start (optional, default 1)
 * @param step (optional, default 1)
 */
export function* count(start = 1, step = 1): Iterable<number> {
  for (let i = start; true; i += step) {
    yield i;
  }
}

/**
 * Cycle through the elements of a collection sequentially forever
 *
 * @param iterable
 */
export function* cycle<T>(iterable: Iterable<T> | Iterator<T>): Iterable<T> {
  const data = [...toIterable(iterable)];

  if (data.length === 0) {
    return;
  }

  while (true) {
    for (const datum of data) {
      yield datum;
    }
  }
}

/**
 * Cycle through the elements of a async iterable sequentially forever
 *
 * @param iterable
 */
export async function* cycleAsync<T>(
  iterable: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>
): AsyncIterable<T> {
  const data = [];

  for await (const datum of toAsyncIterable(iterable)) {
    data.push(datum);
    yield datum;
  }

  yield* cycle(data);
}

/**
 * Repeat an item forever
 *
 * @param item
 */
export function* repeat<T>(item: T): Iterable<T> {
  while (true) {
    yield item;
  }
}

export function* booleans(repetitions?: number): Iterable<boolean> {
  let i = 0;  

  while (repetitions === undefined || i < repetitions) {
    yield Math.random() > 0.5;
    i++;
  }
}

export async function* booleansAsync(repetitions?: number): AsyncIterable<boolean> {
  let i = 0;

  while (repetitions === undefined || i < repetitions) {
    yield Math.random() > 0.5;
    i++;
  }
}