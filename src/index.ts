import {
  map,
  flatMap,
  repeat,
  FlatMapper,
} from "./single";

import {
  chain,
  zip,
  zipLongest,
  zipEqual,
} from "./multi";

import {
  Stream,
} from "./stream";

import {
  toIterable,
  toIterator,
  isIterable,
  isIterator,
} from "./tools";

import {
  InvalidArgumentError,
  LengthError,
} from "./exceptions";

export const single = {
  map,
  flatMap,
  repeat,
}

export const multi = {
  chain,
  zip,
  zipLongest,
  zipEqual,
}

export {
  Stream
}

export const tools = {
  toIterable,
  toIterator,
  isIterable,
  isIterator,
}

export type {
  FlatMapper,
}

export {
  InvalidArgumentError,
  LengthError,
}
