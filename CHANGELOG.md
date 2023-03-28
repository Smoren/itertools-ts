# IterTools Typescript Change Log

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
