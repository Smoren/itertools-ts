# IterTools Typescript Change Log

## v2.3.1 - 2025-09-06

### Improvements
* Package was publicated on DENO

## v2.3.0 - 2025-09-06

### New features
* infinite
  * `booleans()`
  * `booleansAsync()`
* Stream
  * `ofBooleans()`
* AsyncStream
  * `ofBooleans()`

### Typing fixes
* Using built-in `PropertyKey` instead of `RecordKey`
* `FlatMapper` types fixed (for `single.flatMap()`)

## v2.2.0 - 2025-01-31

### New features
* combinatorics
  * `combinations()`
  * `combinationsAsync()`
* Stream
  * `combinations()`
* AsyncStream
  * `combinations()`

## v2.1.0 - 2025-01-29

### New features
* combinatorics
  * `permutations()`
  * `permutationsAsync()`
  * `cartesianProduct()`
  * `cartesianProductAsync()`
* Stream
  * `permutations()`
* AsyncStream
  * `permutations()`

### Improvements
* `toArray()` function optimized.

### Deprecations
* set
  * `cartesianProduct()` (use `combinatorics.cartesianProduct()` instead).
  * `cartesianProductAsync()` (use `combinatorics.cartesianProductAsync()` instead).

## v2.0.0 - 2025-01-25

### Improvements
* Stream and AsyncStream are fully refactored
  * Classes made generic.
  * All the methods made generic and save the typing.
* reduce
  * `toValue()`, `toValueAsync()` — union return type has been replaced by inferred type.
  * `toRange()`, `toRangeAsync()` — use `Numeric` type in arguments.
* multi
  * Type `ZipTuple` — added support for iterators and async iterables / iterators.
* math
  * All the methods use `Numeric` type in arguments.
* All the tests are refactored to check the typing.
* Found bugs fixed.

### New features
* types
  * `Numeric`
  * `NumericString`

## v1.29.1 - 2025-01-23

### Improvements
* single
  * `groupBy()` — union return type has been replaced by inferred type.
  * `groupByAsync()` — union return type has been replaced by inferred type.

## v1.29.0 - 2024-12-24

### New features
* Pipe
  * `add()`

## v1.28.1 - 2024-12-23

Documentation fixed.

## v1.28.0 - 2024-12-22

### New features
* `createPipe()`

## v1.27.1 - 2024-03-03

Package Size Optimization.

## v1.27.0 - 2023-11-13

### New features
* set
  * `cartesianProduct()`
  * `cartesianProductAsync()`
* Stream
  * `cartesianProductWith()`
* AsyncStream
  * `cartesianProductWith()`

## v1.26.0 - 2023-11-12

### New features
* infinite
  * `cycle()`
  * `cycleAsync()`
* Stream
  * `ofCycle()`
* AsyncStream
  * `ofCycle()`

## v1.25.0 - 2023-11-02

### New features
* infinite
  * `repeat()`
* Stream
  * `ofRepeat()`
* AsyncStream
  * `ofRepeat()`

## v1.24.0 - 2023-10-23

### New features
* summary
  * `toRange()`
  * `toRangeAsync()`
* infinite
  * `count()`
* Stream
  * `toRange()`
  * `ofCount()`
* AsyncStream
  * `toRange()`
  * `ofCount()`

## v1.23.0 - 2023-05-25

### New features
* summary
  * `exactlyN()`
  * `exactlyNAsync()`
* Stream
  * `exactlyN()`
* AsyncStream
  * `exactlyN()`

## v1.22.0 - 2023-04-20

### New features
* math
  * `runningAverage()`
  * `runningAverageAsync()`
* Stream
  * `runningAverage()`
* AsyncStream
  * `runningAverage()`

## v1.21.0 - 2023-04-18

### Improvements
* set
  * `distinct()` supports optional comparable getter param.

## v1.20.0 - 2023-04-15

### New features
* math
  * `runningDifference()`
  * `runningDifferenceAsync()`
  * `runningMax()`
  * `runningMin()`
  * `runningMinAsync()`
  * `runningMaxAsync()`
  * `runningProduct()`
  * `runningProductAsync()`
* Stream
  * `runningDifference()`
  * `runningMax()`
  * `runningMin()`
  * `runningProduct()`
* AsyncStream
  * `runningDifference()`
  * `runningMax()`
  * `runningMin()`
  * `runningProduct()`

## v1.19.0 - 2023-04-08

### New features
* Single
  * `sort()`
  * `sortAsync()`
* Stream
  * `peek()`
  * `peekStream()`
  * `sort()`
* AsyncStream
  * `peek()`
  * `peekStream()`
  * `sort()`
* types
  * `Comparator`

## v1.18.0 - 2023-04-02

### New features
* transform
  * `teeAsync()`
* Stream
  * `tee()`
* AsyncStream
  * `tee()`
* types
  * `ZipTuple`

### Improvements
* multi
  * all the zip function's interfaces are simplified

## v1.17.0 - 2023-04-02

### New features
* transform
  * `tee()`

### Bug fix
* `multi.zipEqual()` — return type fixed

### Improvements
* Minor documentation changes

## v1.16.0 - 2023-04-01

### New features
* multi
  * `chainAsync()`
  * `zipAsync()`
  * `zipFilledAsync()`
  * `zipLongestAsync()`
  * `zipEqualAsync()`
* single
  * `chunkwiseAsync()`
  * `chunkwiseOverlapAsync()`
  * `compressAsync()`
  * `dropWhileAsync()`
  * `enumerateAsync()`
  * `filterAsync()`
  * `flatMapAsync()`
  * `flattenAsync()`
  * `groupByAsync()`
  * `keysAsync()`
  * `limitAsync()`
  * `mapAsync()`
  * `pairwiseAsync()`
  * `repeatAsync()`
  * `sliceAsync()`
  * `skipAsync()`
  * `takeWhileAsync()`
  * `valuesAsync()`
* set
  * `distinctAsync()`
  * `intersectionAsync()`
  * `partialIntersectionAsync()`
  * `symmetricDifferenceAsync()`
  * `unionAsync()`
* reduce
  * `toValueAsync()`
  * `toAverageAsync()`
  * `toCountAsync()`
  * `toFirstAsync()`
  * `toFirstAndLastAsync()`
  * `toLastAsync()`
  * `toMaxAsync()`
  * `toMinAsync()`
  * `toMinMaxAsync()`
  * `toProductAsync()`
  * `toSumAsync()`
* summary
  * `isAsyncIterable()`
  * `allMatchAsync()`
  * `allUniqueAsync()`
  * `anyMatchAsync()`
  * `isEmptyAsync()`
  * `isReversedAsync()`
  * `isSortedAsync()`
  * `noneMatchAsync()`
  * `sameAsync()`
  * `sameCountAsync()`
* transform
  * `toArrayAsync()`
  * `toAsyncIterable()`
  * `toAsyncIterator()`
  * `toMapAsync()`
  * `toSetAsync()`
* math
  * `runningTotalAsync()`
* AsyncStream
  * `of`
  * `ofEmpty`
  * `zipWith`
  * `zipFilledWith`
  * `zipLongestWith`
  * `zipEqualWith`
  * `chainWith`
  * `chunkwiseOverlap`
  * `chunkwise`
  * `compress`
  * `dropWhile`
  * `filter`
  * `enumerate`
  * `keys`
  * `limit`
  * `map`
  * `flatMap`
  * `flatten`
  * `groupBy`
  * `pairwise`
  * `runningTotal`
  * `skip`
  * `slice`
  * `takeWhile`
  * `values`
  * `distinct`
  * `intersectionWith`
  * `partialIntersectionWith`
  * `symmetricDifferenceWith`
  * `unionWith`
  * `toValue`
  * `toAverage`
  * `toCount`
  * `toMax`
  * `toMin`
  * `toMinMax`
  * `toFirst`
  * `toFirstAndLast`
  * `toLast`
  * `toSum`
  * `toProduct`
  * `allMatch`
  * `allUnique`
  * `anyMatch`
  * `isSorted`
  * `isReversed`
  * `noneMatch`
  * `sameWith`
  * `sameCountWith`
  * `toArray`
  * `toMap`
  * `toSet`

## v1.15.0 - 2023-03-30

### Improvements
* multi
  * all function interfaces are clarified

## v1.14.0 - 2023-03-28

### New Features
* single
  * `skip()`
* Stream
  * `skip()`

## v1.13.0 - 2023-03-21

### New Features
* single
  * `dropWhile()`
  * `takeWhile()`
  * `compress()`
* Stream
  * `dropWhile()`
  * `takeWhile()`
  * `compress()`

## v1.12.0 - 2023-03-21

### New Features
* transform
  * `toMap()`
  * `toSet()`
* Stream
  * `toMap()`
  * `toSet()`
* types
  * `RecordKey`

### Improvements
* `transform.toIterable()` now can also accept records as input.

## v1.11.0 - 2023-03-20

### New Features
* reduce
  * `toFirstAndLast()`
  * `toMinMax()`
* Stream
  * `toFirstAndLast()`
  * `toMinMax()`

### Improvements
* `reduce.toMin()` and `reduce.toMax()` functions are refactored using `Comparable` type.

## v1.10.0 - 2023-03-19

### New Features
* multi
  * `zipFilled()`
* Stream
  * `zipFilledWith()`

## v1.9.0 - 2023-03-17

### New Features
* summary
  * `allUnique()`
  * `isSorted()`
  * `isReversed()`
* Stream
  * `allUnique()`
  * `isSorted()`
  * `isReversed()`
* types
  * `Comparable`

## v1.8.0 - 2023-03-16

### New Features
* summary
  * `allMatch()`
  * `anyMatch()`
  * `noneMatch()`
* Stream
  * `allMatch()`
  * `anyMatch()`
  * `noneMatch()`

## v1.7.0 - 2023-03-15

### New Features
* summary
  * `sameCount()`
* Stream
  * `sameCountWith()`

### Improvements
* Type annotations added to tests (to repair github workflow).

## v1.6.1 - 2023-03-14

### Improvements
* Reduced package size by including fewer tests.

## v1.6.0 - 2023-03-14

### New Features
* summary
  * `same()`
* Stream
  * `sameWith()`

## v1.5.0 - 2023-03-13

### New Features
* single
  * `groupBy()`
* summary
  * `isString()`
* Stream
  * `groupBy()`

## v1.4.0 - 2023-03-13

### New Features
* set
  * `intersection()`
  * `partialIntersection()`
  * `symmetricDifference()`
  * `union()`
* Stream
  * `intersectionWith()`
  * `partialIntersectionWith()`
  * `symmetricDifferenceWith()`
  * `unionWith()`

## v1.3.0 - 2023-03-12

### New Features
* math
  * `runningTotal()`
* Stream
  * `runningTotal()`

## v1.2.0 - 2023-03-11

### New Features
* reduce
  * `toFirst()`
  * `toLast()`
* Stream
  * `toFirst()`
  * `toLast()`

## v1.1.0 - 2023-03-11

### New Features
* reduce
  * `toAverage()`
* Stream
  * `toAverage()`

## v1.0.0 - 2023-03-11
Initial release.
