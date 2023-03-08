import { toIterable } from "./transform";

export function *distinct<T>(data: Iterable<T>|Iterator<T>): Iterable<T> {
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
