import { InvalidArgumentError, LengthError } from './exceptions';
import { single } from "./index";

export function toIterable<T>(collection: Iterable<T>|Iterator<T>): Iterable<T> {
  if (isIterable(collection)) {
    return collection as Iterable<T>;
  }

  if (isIterator(collection)) {
    return {
      [Symbol.iterator](): Iterator<T> {
        return collection as Iterator<T>;
      }
    };
  }

  throw new InvalidArgumentError('Given collection is not iterable or iterator.');
}

export function toIterator<T>(collection: Iterable<T>|Iterator<T>): Iterator<T> {
  if (isIterator(collection)) {
    return collection as Iterator<T>;
  }

  if (isIterable(collection)) {
    return function* () {
      for (const item of (collection as Iterable<T>)) {
        yield item;
      }
    }();
  }

  throw new InvalidArgumentError('Given collection is not iterable or iterator.');
}

export function isIterable(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return typeof (input as Record<string|symbol, unknown>)[Symbol.iterator] === 'function';
}

export function isIterator(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  return (input as Record<string, unknown>).next !== undefined
    && typeof (input as Record<string, unknown>).next === 'function';
}

export enum MultipleIterationMode {
  SHORTEST,
  LONGEST,
  STRICT_EQUAL,
}

export function *createMultipleIterator(
  mode: MultipleIterationMode,
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
) {
  if (iterables.length === 0) {
    return;
  }

  const iterators = [];
  for (const it of iterables) {
    iterators.push(toIterator(it));
  }

  iterate:

    while (true) {
      const statuses = single.map(iterators, (it: Iterator<unknown>) => it.next());
      const values = [];

      let allValid = true;
      let anyValid = false;

      for (const status of statuses) {
        let value;

        if (status.done) {
          allValid = false;
          value = undefined;
        } else {
          anyValid = true;
          value = status.value;
        }

        values.push(value);
      }

      if (!allValid && anyValid) {
        switch (mode) {
          case MultipleIterationMode.SHORTEST:
            break iterate;
          case MultipleIterationMode.STRICT_EQUAL:
            throw new LengthError("Iterators must have equal lengths");
        }
      }

      if (!anyValid) {
        break;
      }

      yield values;
    }
}
