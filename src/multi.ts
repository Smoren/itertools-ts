import { toIterable } from "./transform";
import { createMultipleIterator, MultipleIterationMode } from "./tools";

export function* zip(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.SHORTEST,
    ...iterables
  )) {
    yield values;
  }
}

export function* zipLongest(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.LONGEST,
    ...iterables
  )) {
    yield values;
  }
}

export function* zipEqual(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  for (const values of createMultipleIterator(
    MultipleIterationMode.STRICT_EQUAL,
    ...iterables
  )) {
    yield values;
  }
}

export function* chain(
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<unknown> {
  for (const iterable of iterables) {
    for (const item of toIterable(iterable)) {
      yield item;
    }
  }
}
