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
  pairwise,
  repeat,
  skip,
  slice,
  sort,
  takeWhile,
  values,
  chunkwiseAsync,
  chunkwiseOverlapAsync,
  compressAsync,
  dropWhileAsync,
  enumerateAsync,
  filterAsync,
  flatMapAsync,
  flattenAsync,
  groupByAsync,
  keysAsync,
  limitAsync,
  mapAsync,
  pairwiseAsync,
  repeatAsync,
  skipAsync,
  sliceAsync,
  sortAsync,
  takeWhileAsync,
  valuesAsync,
} from "./single";

import { count, cycle, cycleAsync, repeat as infiniteRepeat } from "./infinite";

import {
  runningAverage,
  runningDifference,
  runningMax,
  runningMin,
  runningProduct,
  runningTotal,
  runningAverageAsync,
  runningDifferenceAsync,
  runningMaxAsync,
  runningMinAsync,
  runningProductAsync,
  runningTotalAsync,
} from "./math";

import {
  chain,
  zip,
  zipFilled,
  zipLongest,
  zipEqual,
  chainAsync,
  zipAsync,
  zipFilledAsync,
  zipLongestAsync,
  zipEqualAsync,
} from "./multi";

import {
  distinct,
  intersection,
  partialIntersection,
  symmetricDifference,
  union,
  cartesianProduct as cartesianProductDeprecated,
  distinctAsync,
  intersectionAsync,
  partialIntersectionAsync,
  symmetricDifferenceAsync,
  unionAsync,
  cartesianProductAsync as cartesianProductAsyncDeprecated,
} from "./set";

import {
  cartesianProduct,
  permutations,
  combinations,
  cartesianProductAsync,
  permutationsAsync,
  combinationsAsync,
} from "./combinatorics";

import {
  toAverage,
  toCount,
  toMax,
  toMin,
  toMinMax,
  toProduct,
  toRange,
  toSum,
  toValue,
  toFirst,
  toFirstAndLast,
  toLast,
  toAverageAsync,
  toCountAsync,
  toFirstAsync,
  toFirstAndLastAsync,
  toLastAsync,
  toMaxAsync,
  toMinAsync,
  toMinMaxAsync,
  toProductAsync,
  toRangeAsync,
  toSumAsync,
  toValueAsync,
} from "./reduce";

import { Stream } from "./stream";

import { AsyncStream } from "./async-stream";

import {
  allMatch,
  allUnique,
  anyMatch,
  exactlyN,
  isEmpty,
  isAsyncIterable,
  isIterable,
  isIterator,
  isReversed,
  isSorted,
  isString,
  noneMatch,
  same,
  sameCount,
  allMatchAsync,
  allUniqueAsync,
  anyMatchAsync,
  exactlyNAsync,
  isEmptyAsync,
  isReversedAsync,
  isSortedAsync,
  noneMatchAsync,
  sameAsync,
  sameCountAsync,
} from "./summary";

import {
  tee,
  toArray,
  toAsyncIterable,
  toAsyncIterator,
  toIterable,
  toIterator,
  toMap,
  toSet,
  teeAsync,
  toArrayAsync,
  toMapAsync,
  toSetAsync,
} from "./transform";

import { createPipe } from "./pipe";

import { InvalidArgumentError, LengthError } from "./exceptions";

import type {
  Numeric,
  NumericString,
  AsyncFlatMapper,
  FlatMapper,
  Pair,
  Comparable,
  Comparator,
  RecordKey,
  ZipTuple,
  PipeOperation,
  PipeOperationSequence,
  Pipe,
} from "./types";

import { percentage, percentageAsync } from "./random";

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
  sort,
  takeWhile,
  values,
  chunkwiseAsync,
  chunkwiseOverlapAsync,
  compressAsync,
  dropWhileAsync,
  enumerateAsync,
  filterAsync,
  flatMapAsync,
  flattenAsync,
  groupByAsync,
  keysAsync,
  limitAsync,
  mapAsync,
  pairwiseAsync,
  repeatAsync,
  skipAsync,
  sliceAsync,
  sortAsync,
  takeWhileAsync,
  valuesAsync,
};

export const infinite = {
  count,
  cycle,
  cycleAsync,
  repeat: infiniteRepeat,
};

export const math = {
  runningAverage,
  runningDifference,
  runningMax,
  runningMin,
  runningProduct,
  runningTotal,
  runningAverageAsync,
  runningDifferenceAsync,
  runningMaxAsync,
  runningMinAsync,
  runningProductAsync,
  runningTotalAsync,
};

export const multi = {
  chain,
  zip,
  zipFilled,
  zipLongest,
  zipEqual,
  chainAsync,
  zipAsync,
  zipFilledAsync,
  zipLongestAsync,
  zipEqualAsync,
};

export const set = {
  distinct,
  intersection,
  partialIntersection,
  symmetricDifference,
  union,
  distinctAsync,
  intersectionAsync,
  partialIntersectionAsync,
  symmetricDifferenceAsync,
  unionAsync,
  /**
   * @deprecated Use `combinatorics.cartesianProduct()` instead.
   */
  cartesianProduct: cartesianProductDeprecated,
  /**
   * @deprecated Use `combinatorics.cartesianProductAsync()` instead.
   */
  cartesianProductAsync: cartesianProductAsyncDeprecated,
};

export const combinatorics = {
  cartesianProduct,
  permutations,
  combinations,
  cartesianProductAsync,
  permutationsAsync,
  combinationsAsync,
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
  toRange,
  toSum,
  toValue,
  toAverageAsync,
  toCountAsync,
  toFirstAsync,
  toFirstAndLastAsync,
  toLastAsync,
  toMaxAsync,
  toMinAsync,
  toMinMaxAsync,
  toProductAsync,
  toRangeAsync,
  toSumAsync,
  toValueAsync,
};

export const summary = {
  allMatch,
  allUnique,
  anyMatch,
  exactlyN,
  isEmpty,
  isAsyncIterable,
  isIterable,
  isIterator,
  isReversed,
  isSorted,
  isString,
  noneMatch,
  same,
  sameCount,
  allMatchAsync,
  allUniqueAsync,
  anyMatchAsync,
  exactlyNAsync,
  isEmptyAsync,
  isReversedAsync,
  isSortedAsync,
  noneMatchAsync,
  sameAsync,
  sameCountAsync,
};

export const transform = {
  tee,
  toArray,
  toAsyncIterable,
  toAsyncIterator,
  toIterable,
  toIterator,
  toMap,
  toSet,
  teeAsync,
  toArrayAsync,
  toMapAsync,
  toSetAsync,
};

export { Stream, AsyncStream };

export { createPipe };

export type {
  Numeric,
  NumericString,
  AsyncFlatMapper,
  FlatMapper,
  Pair,
  Comparable,
  Comparator,
  RecordKey,
  ZipTuple,
  PipeOperation,
  PipeOperationSequence,
  Pipe,
};

export { InvalidArgumentError, LengthError };

export const random = {
  percentage,
  percentageAsync,
};



