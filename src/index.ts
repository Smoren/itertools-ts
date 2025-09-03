export * as single from "./single";
export * as math from "./math";
export * as multi from "./multi";
export * as set from "./set";
export * as combinatorics from "./combinatorics";
export * as reduce from "./reduce";
export * as summary from "./summary";
export * as transform from "./transform";
export * as infinite from "./infinite";
export { Stream } from "./stream";
export { AsyncStream } from "./async-stream";
export { createPipe } from "./pipe";
export { InvalidArgumentError, LengthError } from "./exceptions";
export type {
  Comparable,
  NumericString,
  Numeric,
  Comparator,
  Pair,
  First,
  Last,
  FlatMapper,
  AsyncFlatMapper,
  ZipTuple,
  PipeOperation,
  PipeOperationSequence,
  Pipe,
} from "./types";

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
  booleans,
  booleansAsync,
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
  divide,
  tee,
  toArray,
  toAsyncIterable,
  toAsyncIterator,
  toIterable,
  toIterator,
  toMap,
  toSet,
  divideAsync,
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
