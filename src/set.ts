import { toIterable } from "./tools";
import { single } from "./index";

export function *distinct<T>(data: Iterable<T>|Iterator<T>): Iterable<T> {
  const used = new Set();

  if (data instanceof Map) {
    data = single.map(data, (datum) => datum[1]);
  }

  for (const datum of toIterable(data)) {
    if (!used.has(datum)) {
      yield datum;
      used.add(datum);
    }
  }
}
