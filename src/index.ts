import {
  chunkwise,
  chunkwiseOverlap,
  enumerate,
  filter,
  flatMap,
  flatten,
  keys,
  limit,
  map,
  repeat,
  pairwise,
  slice,
  values,
  FlatMapper,
  Pair,
} from "./single";

import { runningTotal } from "./math";

import { chain, zip, zipLongest, zipEqual } from "./multi";

import { distinct, intersection, partialIntersection, symmetricDifference, union } from "./set";

import {
  toAverage,
  toCount,
  toMax,
  toMin,
  toProduct,
  toSum,
  toValue,
  toFirst,
  toLast,
} from "./reduce";

import { Stream } from "./stream";

import { isIterable, isIterator } from "./summary";

import { toArray, toIterable, toIterator } from "./transform";

import { InvalidArgumentError, LengthError } from "./exceptions";

export const single = {
  chunkwise,
  chunkwiseOverlap,
  enumerate,
  filter,
  flatMap,
  flatten,
  keys,
  limit,
  map,
  pairwise,
  repeat,
  slice,
  values,
};

export const math = {
  runningTotal,
};

export const multi = {
  chain,
  zip,
  zipLongest,
  zipEqual,
};

export const set = {
  distinct,
  intersection,
  partialIntersection,
  symmetricDifference,
  union,
};

export const reduce = {
  toAverage,
  toCount,
  toFirst,
  toLast,
  toMax,
  toMin,
  toProduct,
  toSum,
  toValue,
};

export const summary = {
  isIterable,
  isIterator,
};

export const transform = {
  toArray,
  toIterable,
  toIterator,
};

export { Stream };

export type { FlatMapper, Pair };

export { InvalidArgumentError, LengthError };
