import {
  chunkwise,
  chunkwiseOverlap,
  enumerate,
  filter,
  flatMap,
  flatten,
  limit,
  map,
  repeat,
  pairwise,
  slice,
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
  toMax,
  toMin,
  toSum,
  toValue,
} from "./reduce";

import {
  Stream,
} from "./stream";

import {
  isIterable,
  isIterator,
} from "./summary";

import {
  toArray,
  toIterable,
  toIterator,
} from "./transform";

import {
  InvalidArgumentError,
  LengthError,
} from "./exceptions";

export const single = {
  chunkwise,
  chunkwiseOverlap,
  enumerate,
  filter,
  flatMap,
  flatten,
  limit,
  map,
  pairwise,
  repeat,
  slice,
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
  toMax,
  toMin,
  toSum,
  toValue,
}

export const summary = {
  isIterable,
  isIterator,
}

export const transform = {
  toArray,
  toIterable,
  toIterator,
}

export {
  Stream,
}

export type {
  FlatMapper,
  Pair,
}

export {
  InvalidArgumentError,
  LengthError,
}
