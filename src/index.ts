import { map, flatMap, repeat, FlatMapper } from "./single";
import { Stream } from "./stream";
import { toIterable, isIterable, isIterator } from "./tools";
import { InvalidArgumentError } from "./exceptions";

export const single = {
  map,
  flatMap,
  repeat,
}

export { Stream };

export const tools = {
  toIterable,
  isIterable,
  isIterator,
}

export type { FlatMapper };

export { InvalidArgumentError };
