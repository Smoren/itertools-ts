import { InvalidArgumentError } from "./exceptions";
import { isIterable, isIterator } from "./summary";

/**
 * Converts collection to Iterable instance.
 *
 * If instance is already an iterable then just return it.
 *
 * @param collection
 */
export function toIterable<T>(
  collection: Iterable<T> | Iterator<T>
): Iterable<T> {
  if (isIterable(collection)) {
    return collection as Iterable<T>;
  }

  if (isIterator(collection)) {
    return {
      [Symbol.iterator](): Iterator<T> {
        return collection as Iterator<T>;
      },
    };
  }

  throw new InvalidArgumentError(
    "Given collection is not iterable or iterator."
  );
}

/**
 * Converts collection to Iterator instance.
 *
 * If instance is already an iterator then just return it.
 *
 * @param collection
 */
export function toIterator<T>(
  collection: Iterable<T> | Iterator<T>
): Iterator<T> {
  if (isIterator(collection)) {
    return collection as Iterator<T>;
  }

  if (isIterable(collection)) {
    return (function* () {
      for (const item of collection as Iterable<T>) {
        yield item;
      }
    })();
  }

  throw new InvalidArgumentError(
    "Given collection is not iterable or iterator."
  );
}

/**
 * Converts given collection to array.
 *
 * @param collection
 */
export function toArray<T>(collection: Iterable<T> | Iterator<T>): Array<T> {
  const result = [];
  for (const item of toIterable(collection)) {
    result.push(item);
  }
  return result;
}
