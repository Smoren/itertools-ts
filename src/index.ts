import {
  chunkwise,
  chunkwiseOverlap,
  filter,
  flatMap,
  limit,
  map,
  repeat,
  pairwise,
  FlatMapper,
  Pair,
} from "./single";

import {
  chain,
  zip,
  zipLongest,
  zipEqual,
} from "./multi";

import {
  distinct,
} from "./set"

import {
  toValue,
} from "./reduce";

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
  chunkwise,
  chunkwiseOverlap,
  filter,
  flatMap,
  limit,
  map,
  pairwise,
  repeat,
}

export const multi = {
  chain,
  zip,
  zipLongest,
  zipEqual,
}

export const set = {
  distinct,
}

export const reduce = {
  toValue,
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
  Pair,
}

export {
  InvalidArgumentError,
  LengthError,
}
