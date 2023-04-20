# IterTools Typescript Change Log

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

## v1.15.0 - 2022-03-30

### Improvements
* multi
  * all function interfaces are clarified

## v1.14.0 - 2022-03-28

### New Features
* single
  * `skip()`
* Stream
  * `skip()`

## v1.13.0 - 2022-03-21

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
