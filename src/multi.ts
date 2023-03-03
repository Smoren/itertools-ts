import { createMultipleIterator, MultipleIterationMode } from "./tools";

export function *zip(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(MultipleIterationMode.SHORTEST, ...iterables)) {
    yield values;
  }
}

export function *zipLongest(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(MultipleIterationMode.LONGEST, ...iterables)) {
    yield values;
  }
}

export function *zipEqual(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(MultipleIterationMode.STRICT_EQUAL, ...iterables)) {
    yield values;
  }
}
