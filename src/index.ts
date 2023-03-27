import {
  chunkwise,
  chunkwiseOverlap,
  compress,
  dropWhile,
  enumerate,
  filter,
  flatMap,
  flatten,
  groupBy,
  keys,
  limit,
  map,
  repeat,
  pairwise,
  skip,
  slice,
  takeWhile,
  values,
} from "./single";

import { runningTotal } from "./math";

import { chain, zip, zipFilled, zipLongest, zipEqual } from "./multi";

import {
  distinct,
  intersection,
  partialIntersection,
  symmetricDifference,
  union,
} from "./set";

import {
  toAverage,
  toCount,
  toMax,
  toMin,
  toMinMax,
  toProduct,
  toSum,
  toValue,
  toFirst,
  toFirstAndLast,
  toLast,
} from "./reduce";

import { Stream } from "./stream";

import {
  allMatch,
  allUnique,
  anyMatch,
  isEmpty,
  isIterable,
  isIterator,
  isReversed,
  isSorted,
  isString,
  noneMatch,
  same,
  sameCount,
} from "./summary";

import { toArray, toIterable, toIterator, toMap, toSet } from "./transform";

import { InvalidArgumentError, LengthError } from "./exceptions";

import { FlatMapper, Pair, Comparable, RecordKey } from "./types";

export const single = {
  chunkwise,
  chunkwiseOverlap,
  compress,
  dropWhile,
  enumerate,
  filter,
  flatMap,
  flatten,
  groupBy,
  keys,
  limit,
  map,
  pairwise,
  repeat,
  skip,
  slice,
  takeWhile,
  values,
};

export const math = {
  runningTotal,
};

export const multi = {
  chain,
  zip,
  zipFilled,
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
  toFirstAndLast,
  toLast,
  toMax,
  toMin,
  toMinMax,
  toProduct,
  toSum,
  toValue,
};

export const summary = {
  allMatch,
  allUnique,
  anyMatch,
  isEmpty,
  isIterable,
  isIterator,
  isReversed,
  isSorted,
  isString,
  noneMatch,
  same,
  sameCount,
};

export const transform = {
  toArray,
  toIterable,
  toIterator,
  toMap,
  toSet,
};

export { Stream };

export type { FlatMapper, Pair, Comparable, RecordKey };

export { InvalidArgumentError, LengthError };
