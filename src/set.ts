import { toIterable } from "./tools";

export function *distinct<T>(data: Iterable<T>|Iterator<T>): Iterable<T> {
  const used = new Set();

  for (const datum of toIterable(data)) {
    if (!used.has(datum)) {
      yield datum;
      used.add(datum);
    }
  }
}
