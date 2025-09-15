# IterTools for TypeScript and JavaScript

[![npm](https://img.shields.io/npm/v/itertools-ts.svg)](https://www.npmjs.com/package/itertools-ts)
[![jsr](https://jsr.io/badges/@smoren/itertools-ts)](https://jsr.io/@smoren/itertools-ts)
[![npm](https://img.shields.io/npm/dm/itertools-ts.svg?style=flat)](https://www.npmjs.com/package/itertools-ts)
[![Coverage Status](https://coveralls.io/repos/github/Smoren/itertools-ts/badge.svg?branch=master&rand=222)](https://coveralls.io/github/Smoren/itertools-ts?branch=master)
![Build and test](https://github.com/Smoren/itertools-ts/actions/workflows/test_master.yml/badge.svg)
[![Minified Size](https://badgen.net/bundlephobia/minzip/itertools-ts)](https://bundlephobia.com/result?p=itertools-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![IterTools Logo](docs/images/itertools-logo.png)

Inspired by Python — designed for TypeScript.

Features
--------

IterTools makes you an iteration superstar by providing 3 types of tools:

* Loop iteration tools
* Stream iteration tools
* Pipe iteration tools

**Loop Iteration Tools Example**

```typescript
import { multi } from 'itertools-ts';

for (const [letter, number] of multi.zip(['a', 'b'], [1, 2])) {
  console.log(`${letter}${number}`);  // a1, b2
}

// Async example
const letters = ['a', 'b'].map((x) => Promise.resolve(x));
const numbers = [1, 2].map((x) => Promise.resolve(x));

for await (const [letter, number] of multi.zipAsync(letters, numbers)) {
  console.log(`${letter}${number}`);  // a1, b2
}
```

**Stream Iteration Tools Example**

```typescript
import { Stream, AsyncStream } from 'itertools-ts';

const result1 = Stream.of([1, 1, 2, 2, 3, 4, 5])
  .distinct()             // [1, 2, 3, 4, 5]
  .map((x) => x**2)       // [1, 4, 9, 16, 25]
  .filter((x) => x < 10)  // [1, 4, 9]
  .toSum();               // 14

// Async example
const result2 = await AsyncStream.of([1, 1, 2, 2, 3, 4, 5].map((x) => Promise.resolve(x)))
  .distinct()             // [1, 2, 3, 4, 5]
  .map((x) => x**2)       // [1, 4, 9, 16, 25]
  .filter((x) => x < 10)  // [1, 4, 9]
  .toSum();               // 14
```

[More about Streams](#Stream-and-Async-Stream)

**Pipe Iteration Tools Example**

```typescript
import { createPipe } from 'itertools-ts';

const pipe = createPipe(
  set.distinct<number>,
  (input) => single.map(input, (x) => x**2),
  (input) => single.filter(input, (x) => x < 10),
  reduce.toSum,
);
const result1 = pipe([1, 1, 2, 2, 3, 4, 5]); // 14
const result2 = pipe([1, 1, 1, 2, 2, 2]);    // 5

// Async example
const asyncPipe = createPipe(
  set.distinctAsync<number>,
  (input) => single.mapAsync(input, (x) => x**2),
  (input) => single.filterAsync(input, (x) => x < 10),
  reduce.toSumAsync,
);
const result3 = await asyncPipe([1, 1, 2, 2, 3, 4, 5].map((x) => Promise.resolve(x))); // 14
const result4 = await asyncPipe([1, 1, 1, 2, 2, 2].map((x) => Promise.resolve(x)));    // 5

// Another way to create pipes
const anotherPipe = createPipe()
  .add(set.distinct<number>)
  .add((input) => single.map(input, (x) => x**2))
  .add((input) => single.filter(input, (x) => x < 10))
  .add(reduce.toSum);

const result5 = anotherPipe([1, 1, 2, 2, 3, 4, 5]); // 14
const result6 = anotherPipe([1, 1, 1, 2, 2, 2]);    // 5
```

[More about Pipes](#Pipes)

All functions work on iterable collections and iterators:
* `Array`
* `Set`
* `Map`
* `String`
* `Generator`
* `Iterable`
* `Iterator`

Every function have an analog with "Async"-suffixed name for working with async iterable and iterators (e.g. `zip` and `zipAsync`):
* `AsyncIterable`
* `AsyncIterator`

If an asynchronous function takes other functions as input, they can also be asynchronous.

```typescript
import { single } from 'itertools-ts';

const starWarsEpisodes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for await (const goodMovie of single.filterAsync(
  starWarsEpisodes,
  async (episode) => {
    return Promise.resolve(episode > 3 && episode < 8);
  }
)) {
  console.log(goodMovie);
}
// 4, 5, 6, 7
```

Setup
-----

```bash
npm i itertools-ts
```

Quick Reference
---------------

### Loop Iteration Tools

#### Multi Iteration
| Iterator                     | Description                                                                                                       | Sync Code Snippet                            | Async Code Snippet                                |
|------------------------------|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------|---------------------------------------------------|
| [`chain`](#chain)            | Chain multiple iterables together                                                                                 | `multi.chain(list1, list2, ...)`             | `multi.chainAsync(list1, list2, ...)`             |
| [`zip`](#zip)                | Iterate multiple collections simultaneously until the shortest iterator completes                                 | `multi.zip(list1, list2, ...)`               | `multi.zipAsync(list1, list2, ...)`               |
| [`zipEqual`](#zip-equal)     | Iterate multiple collections of equal length simultaneously, error if lengths not equal                           | `multi.zipEqual(list1, list2, ...)`          | `multi.zipEqualAsync(list1, list2, ...)`          |
| [`zipFilled`](#zip-filled)   | Iterate multiple collections simultaneously until the longest iterator completes (with filler for uneven lengths) | `multi.zipFilled(filler, list1, list2, ...)` | `multi.zipFilledAsync(filler, list1, list2, ...)` |
| [`zipLongest`](#zip-longest) | Iterate multiple collections simultaneously until the longest iterator completes                                  | `multi.zipLongest(list1, list2, ...)`        | `multi.zipLongestAsync(list1, list2, ...)`        |

#### Single Iteration
| Iterator                                 | Description                                 | Sync Code Snippet                                       | Async Code Snippet                                           |
|------------------------------------------|---------------------------------------------|---------------------------------------------------------|--------------------------------------------------------------|
| [`chunkwise`](#chunkwise)                | Iterate by chunks                           | `single.chunkwise(data, chunkSize)`                     | `single.chunkwiseAsync(data, chunkSize)`                     |
| [`chunkwiseOverlap`](#chunkwise-overlap) | Iterate by overlapped chunks                | `single.chunkwiseOverlap(data, chunkSize, overlapSize)` | `single.chunkwiseOverlapAsync(data, chunkSize, overlapSize)` |
| [`compress`](#compress)                  | Filter out elements not selected            | `single.compress(data, selectors)`                      | `single.compressAsync(data, selectors)`                      |
| [`dropWhile`](#drop-while)               | Drop elements while predicate is true       | `single.dropWhile(data, predicate)`                     | `single.dropWhileAsync(data, predicate)`                     |
| [`enumerate`](#enumerate)                | Enumerates elements of collection           | `single.enumerate(data)`                                | `single.enumerateAsync(data)`                                |
| [`filter`](#filter)                      | Filter for elements where predicate is true | `single.filter(data, predicate)`                        | `single.filterAsync(data, predicate)`                        |
| [`flatMap`](#flat-map)                   | Map function onto items and flatten result  | `single.flatMap(data, mapper)`                          | `single.flatMapAsync(data, mapper)`                          |
| [`flatten`](#flatten)                    | Flatten multidimensional iterable           | `single.flatten(data, [dimensions])`                    | `single.flattenAsync(data, [dimensions])`                    |
| [`groupBy`](#group-by)                   | Group data by a common element              | `single.groupBy(data, groupKeyFunction, [itemKeyFunc])` | `single.groupByAsync(data, groupKeyFunction, [itemKeyFunc])` |
| [`limit`](#limit)                        | Iterate up to a limit                       | `single.limit(data, limit)`                             | `single.limitAsync(data, limit)`                             |
| [`keys`](#keys)                          | Iterate keys of key-value pairs             | `single.keys(data)`                                     | `single.keysAsync(data)`                                     |
| [`map`](#map)                            | Map function onto each item                 | `single.map(data, mapper)`                              | `single.mapAsync(data, mapper)`                              |
| [`pairwise`](#pairwise)                  | Iterate successive overlapping pairs        | `single.pairwise(data)`                                 | `single.pairwiseAsync(data)`                                 |
| [`repeat`](#repeat)                      | Repeat an item a number of times            | `single.repeat(item, repetitions)`                      | `single.repeatAsync(item, repetitions)`                      |
| [`skip`](#skip)                          | Iterate after skipping elements             | `single.skip(data, count, [offset])`                    | `single.skipAsync(data, count, [offset])`                    |
| [`slice`](#slice)                        | Extract a slice of the iterable             | `single.slice(data, [start], [count], [step])`          | `single.sliceAsync(data, [start], [count], [step])`          |
| [`sort`](#sort)                          | Iterate a sorted collection                 | `single.sort(data, [comparator])`                       | `single.sortAsync(data, [comparator])`                       |
| [`takeWhile`](#take-while)               | Iterate elements while predicate is true    | `single.takeWhile(data, predicate)`                     | `single.takeWhileAsync(data, predicate)`                     |
| [`values`](#values)                      | Iterate values of key-value pairs           | `single.values(data)`                                   | `single.valuesAsync(data)`                                   |

#### Infinite Iteration
| Iterator                | Description                | Code Snippet                       |
|-------------------------|----------------------------|------------------------------------|
| [`booleans`](#Booleans) | Generate random booleans   | `infinite.booleans([repetitions])` |
| [`count`](#Count)       | Count sequentially forever | `infinite.count([start], [step])`  |
| [`cycle`](#Cycle)       | Cycle through a collection | `infinite.cycle(iterable)`         |
| [`repeat`](#Repeat-1)   | Repeat an item forever     | `infinite.repeat(item)`            |

#### Random Iteration
| Iterator                    | Description                | Code Snippet                       |
|-----------------------------|----------------------------|------------------------------------|
| [`percentage`](#Percentage) | Generate random percentage | `random.percentage([repetitions])` |

#### Math Iteration
| Iterator                                   | Description                     | Sync Code Snippet                                 | Async Code Snippet                                     |
|--------------------------------------------|---------------------------------|---------------------------------------------------|--------------------------------------------------------|
| [`runningAverage`](#Running-Average)       | Running average accumulation    | `math.runningAverage(numbers, [initialValue])`    | `math.runningAverageAsync(numbers, [initialValue])`    |
| [`runningDifference`](#Running-Difference) | Running difference accumulation | `math.runningDifference(numbers, [initialValue])` | `math.runningDifferenceAsync(numbers, [initialValue])` |
| [`runningMax`](#Running-Max)               | Running maximum accumulation    | `math.runningMax(numbers, [initialValue])`        | `math.runningMax(numbers, [initialValue])`             |
| [`runningMin`](#Running-Min)               | Running minimum accumulation    | `math.runningMin(numbers, [initialValue])`        | `math.runningMinAsync(numbers, [initialValue])`        |
| [`runningProduct`](#Running-Product)       | Running product accumulation    | `math.runningProduct(numbers, [initialValue])`    | `math.runningProductAsync(numbers, [initialValue])`    |
| [`runningTotal`](#Running-Total)           | Running total accumulation      | `math.runningTotal(numbers, [initialValue])`      | `math.runningTotalAsync(numbers, [initialValue])`      |

#### Reduce
| Reducer                                | Description                                | Sync Code Snippet                             | Async Code Snippet                                 |
|----------------------------------------|--------------------------------------------|-----------------------------------------------|----------------------------------------------------|
| [`toAverage`](#To-Average)             | Mean average of elements                   | `reduce.toAverage(numbers)`                   | `reduce.toAverageAsync(numbers)`                   |
| [`toCount`](#To-Count)                 | Reduce to length of iterable               | `reduce.toCount(data)`                        | `reduce.toCountAsync(data)`                        |
| [`toFirst`](#To-First)                 | Reduce to its first value                  | `reduce.toFirst(data)`                        | `reduce.toFirstAsync(data)`                        |
| [`toFirstAndLast`](#To-First-And-Last) | Reduce to its first and last values        | `reduce.toFirstAndLast(data)`                 | `reduce.toFirstAndLastAsync(data)`                 |
| [`toLast`](#To-Last)                   | Reduce to its last value                   | `reduce.toLast(data)`                         | `reduce.toLastAsync(data)`                         |
| [`toMax`](#To-Max)                     | Reduce to its greatest element             | `reduce.toMax(numbers, [compareBy])`          | `reduce.toMaxAsync(numbers, [compareBy])`          |
| [`toMin`](#To-Min)                     | Reduce to its smallest element             | `reduce.toMin(numbers, [compareBy])`          | `reduce.toMinAsync(numbers, [compareBy])`          |
| [`toMinMax`](#To-Min-Max)              | Reduce to its lower and upper bounds       | `reduce.toMinMax(numbers, [compareBy])`       | `reduce.toMinMaxAsync(numbers, [compareBy])`       |
| [`toProduct`](#To-Product)             | Reduce to the product of its elements      | `reduce.toProduct(numbers)`                   | `reduce.toProductAsync(numbers)`                   |
| [`toRange`](#To-Range)                 | Reduce to difference of max and min values | `reduce.toRange(numbers)`                     | `reduce.toRangeAsync(numbers)`                     |
| [`toSum`](#To-Sum)                     | Reduce to the sum of its elements          | `reduce.toSum(numbers)`                       | `reduce.toSumAsync(numbers)`                       |
| [`toValue`](#To-Value)                 | Reduce to value using callable reducer     | `reduce.toValue(data, reducer, initialValue)` | `reduce.toValueAsync(data, reducer, initialValue)` |

#### Set and multiset Iteration
| Iterator                                       | Description                            | Sync Code Snippet                                 | Async Code Snippet                                     |
|------------------------------------------------|----------------------------------------|---------------------------------------------------|--------------------------------------------------------|
| [`distinct`](#distinct)                        | Iterate only distinct items            | `set.distinct(data)`                              | `set.distinctAsync(data)`                              |
| [`intersection`](#intersection)                | Intersection of iterables              | `set.intersection(...iterables)`                  | `set.intersectionAsync(...iterables)`                  |
| [`partialIntersection`](#partial-intersection) | Partial intersection of iterables      | `set.partialIntersection(minCount, ...iterables)` | `set.partialIntersectionAsync(minCount, ...iterables)` |
| [`symmetricDifference`](#symmetric-difference) | Symmetric difference of iterables      | `set.symmetricDifference(...iterables)`           | `set.symmetricDifferenceAsync(...iterables)`           |
| [`union`](#union)                              | Union of iterables                     | `set.union(...iterables)`                         | `set.unionAsync(...iterables)`                         |

#### Combinatorics
| Iterator                                 | Description                            | Sync Code Snippet                             | Async Code Snippet                                 |
|------------------------------------------|----------------------------------------|-----------------------------------------------|----------------------------------------------------|
| [`cartesianProduct`](#cartesian-product) | Iterate cartesian product of iterables | `combinations.cartesianProduct(...iterables)` | `combinations.cartesianProductAsync(...iterables)` |
| [`combinations`](#combinations)          | Combinations of iterables              | `combinations.combinations(data, length)`     | `combinations.combinationsAsync(data, length)`     |
| [`permutations`](#permutations)          | Permutations of iterables              | `combinations.permutations(data, length)`     | `combinations.permutationsAsync(data, length)`     |

#### Summary
| Summary                                 | Description                                             | Sync Code Snippet                      | Async Code Snippet                          |
|-----------------------------------------|---------------------------------------------------------|----------------------------------------|---------------------------------------------|
| [`allMatch`](#all-match)                | True if all items are true according to predicate       | `summary.allMatch(data, predicate)`    | `summary.allMatchAsync(data, predicate)`    |
| [`allUnique`](#all-unique)              | True if all elements in collection are unique           | `summary.allUnique(data)`              | `summary.allUniqueAsync(data)`              |
| [`anyMatch`](#any-match)                | True if any item is true according to predicate         | `summary.anyMatch(data, predicate)`    | `summary.anyMatchAsync(data, predicate)`    |
| [`exactlyN`](#exactly-n)                | True if exactly n items are true according to predicate | `summary.exactlyN(data, n, predicate)` | `summary.exactlyNAsync(data, n, predicate)` |
| [`isAsyncIterable`](#is-async-iterable) | True if given data is async iterable                    | `summary.isAsyncIterable(data)`        | —                                           |
| [`isIterable`](#is-iterable)            | True if given data is iterable                          | `summary.isIterable(data)`             | —                                           |
| [`isIterator`](#is-iterator)            | True if given data is iterator                          | `summary.isIterator(data)`             | —                                           |
| [`isReversed`](#is-reversed)            | True if iterable reverse sorted                         | `summary.isReversed(data)`             | `summary.isReversedAsync(data)`             |
| [`isSorted`](#is-sorted)                | True if iterable sorted                                 | `summary.isSorted(data)`               | `summary.isSortedAsync(data)`               |
| [`isString`](#is-string)                | True if given data is string                            | `summary.isString(data)`               | `summary.isStringAsync(data)`               |
| [`noneMatch`](#none-match)              | True if none of items true according to predicate       | `summary.noneMatch(data, predicate)`   | `summary.noneMatchAsync(data, predicate)`   |
| [`same`](#same)                         | True if collections are the same                        | `summary.same(...collections)`         | `summary.sameAsync(...collections)`         |
| [`sameCount`](#same-count)              | True if collections have the same lengths               | `summary.sameCount(...collections)`    | `summary.sameCountAsync(...collections)`    |

#### Transform
| Iterator                                | Description                             | Sync Code Snippet                 | Async Code Snippet                |
|-----------------------------------------|-----------------------------------------|-----------------------------------|-----------------------------------|
| [`tee`](#tee)                           | Iterate duplicate iterables             | `transform.tee(data, count)`      | `transform.teeAsync(data, count)` |
| [`toArray`](#to-array)                  | Transforms collection to array          | `transform.toArray(data)`         | `transform.toArrayAsync(data)`    |
| [`toAsyncIterable`](#to-async-iterable) | Transforms collection to async iterable | `transform.toAsyncIterable(data)` | —                                 |
| [`toAsyncIterator`](#to-async-iterator) | Transforms collection to async iterator | `transform.toAsyncIterator(data)` | —                                 |
| [`toIterable`](#to-iterable)            | Transforms collection to iterable       | `transform.toIterable(data)`      | —                                 |
| [`toIterator`](#to-iterator)            | Transforms collection to iterator       | `transform.toIterator(data)`      | —                                 |
| [`toMap`](#to-map)                      | Transforms collection to map            | `transform.toMap(pairs)`          | `transform.toMapAsync(pairs)`     |
| [`toSet`](#to-set)                      | Transforms collection to set            | `transform.toSet(data)`           | `transform.toSetAsync(data)`      |

### Stream and AsyncStream Iteration Tools
#### Stream Sources
| Source                       | Description                         | Sync Code Snippet                  | Async Code Snippet                      |
|------------------------------|-------------------------------------|------------------------------------|-----------------------------------------|
| [`of`](#of)                  | Create a stream from an iterable    | `Stream.of(iterable)`              | `AsyncStream.of(iterable)`              |
| [`ofCount`](#of-count)       | Create an infinite count stream     | `Stream.ofCount([start], [step])`  | `AsyncStream.ofCount([start], [step])`  |
| [`ofBooleans`](#of-booleans) | Create an infinite booleans stream  | `Stream.ofBooleans([repetitions])` | `AsyncStream.ofBooleans([repetitions])` |
| [`ofCycle`](#of-cycle)       | Create an infinite cycle stream     | `Stream.ofCycle(iterable)`         | `AsyncStream.ofCycle(iterable)`         |
| [`ofEmpty`](#of-empty)       | Create an empty stream              | `Stream.ofEmpty()`                 | `AsyncStream.ofEmpty()`                 |
| [`ofRepeat`](#of-repeat)     | Create an infinite repeating stream | `Stream.ofRepeat(item)`            | `AsyncStream.ofRepeat(item)`            |

#### Stream Operations
| Operation                                               | Description                                                                               | Code Snippet                                                         |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| [`cartesianProductWith`](#cartesian-product-with)       | Iterate cartesian product of iterable source with another iterable collections            | `stream.cartesianProductWith(...iterables)`                          |
| [`chainWith`](#chain-with)                              | Chain iterable source withs given iterables together into a single iteration              | `stream.chainWith(...iterables)`                                     |
| [`chunkwise`](#chunkwise-1)                             | Iterate by chunks                                                                         | `stream.chunkwise(chunkSize)`                                        |
| [`chunkwiseOverlap`](#chunkwise-overlap-1)              | Iterate by overlapped chunks                                                              | `stream.chunkwiseOverlap(chunkSize, overlap)`                        |
| [`combinations`](#combinations-1)                       | Combinations of the stream iterable                                                       | `stream.combinations(length)`                                        |
| [`compress`](#compress-1)                               | Compress source by filtering out data not selected                                        | `stream.compress(selectors)`                                         |
| [`distinct`](#distinct-1)                               | Filter out elements: iterate only unique items                                            | `stream.distinct()`                                                  |
| [`dropWhile`](#drop-while-1)                            | Drop elements from the iterable source while the predicate function is true               | `stream.dropWhile(predicate)`                                        |
| [`enumerate`](#enumerate-1)                             | Enumerates elements of stream                                                             | `stream.enumerate()`                                                 |
| [`filter`](#filter-1)                                   | Filter for only elements where the predicate function is true                             | `stream.filter(predicate)`                                           |
| [`flatMap`](#flat-map-1)                                | Map function onto elements and flatten result                                             | `stream.flatMap(mapper)`                                             |
| [`flatten`](#flatten-1)                                 | Flatten multidimensional stream                                                           | `stream.flatten([dimensions])`                                       |
| [`intersectionWith`](#intersection-with)                | Intersect stream and given iterables                                                      | `stream.intersectionWith(...iterables)`                              |
| [`groupBy`](#group-by-1)                                | Group stram data by a common data element                                                 | `stream.groupBy(groupKeyFunction, [itemKeyFunc])`                    |
| [`keys`](#keys-1)                                       | Iterate keys of key-value pairs from stream                                               | `stream.keys()`                                                      |
| [`limit`](#limit-1)                                     | Limit the stream's iteration                                                              | `stream.limit(limit)`                                                |
| [`map`](#map-1)                                         | Map function onto elements                                                                | `stream.map(mapper)`                                                 |
| [`pairwise`](#pairwise-1)                               | Return pairs of elements from iterable source                                             | `stream.pairwise()`                                                  |
| [`partialIntersectionWith`](#partial-intersection-with) | Partially intersect stream and given iterables                                            | `stream.partialIntersectionWith(minIntersectionCount, ...iterables)` |
| [`permutations`](#permutations-1)                       | Permutations of the stream iterable                                                       | `stream.permutations(length)`                                        |
| [`runningAverage`](#running-average-1)                  | Accumulate the running average (mean) over iterable source                                | `stream.runningAverage([initialValue])`                              |
| [`runningDifference`](#running-difference-1)            | Accumulate the running difference over iterable source                                    | `stream.runningDifference([initialValue])`                           |
| [`runningMax`](#running-max-1)                          | Accumulate the running max over iterable source                                           | `stream.runningMax([initialValue])`                                  |
| [`runningMin`](#running-min-1)                          | Accumulate the running min over iterable source                                           | `stream.runningMin([initialValue])`                                  |
| [`runningProduct`](#running-product-1)                  | Accumulate the running product over iterable source                                       | `stream.runningProduct([initialValue])`                              |
| [`runningTotal`](#running-total-1)                      | Accumulate the running total over iterable source                                         | `stream.runningTotal([initialValue])`                                |
| [`skip`](#skip-1)                                       | Skip some elements of the stream                                                          | `stream.skip(count, [offset])`                                       |
| [`slice`](#slice-1)                                     | Extract a slice of the stream                                                             | `stream.slice([start], [count], [step])`                             |
| [`sort`](#sort-1)                                       | Sorts the stream                                                                          | `stream.sort([comparator])`                                          |
| [`symmetricDifferenceWith`](#symmetric-difference-with) | Symmetric difference of stream and given iterables                                        | `stream.symmetricDifferenceWith(...iterables)`                       |
| [`takeWhile`](#take-while-1)                            | Return elements from the iterable source as long as the predicate is true                 | `stream.takeWhile(predicate)`                                        |
| [`unionWith`](#union-with)                              | Union of stream and given iterables                                                       | `stream.union(...iterables)`                                         |
| [`values`](#values-1)                                   | Iterate values of key-value pairs from stream                                             | `stream.values()`                                                    |
| [`zipWith`](#zip-with)                                  | Iterate iterable source with another iterable collections simultaneously                  | `stream.zipWith(...iterables)`                                       |
| [`zipEqualWith`](#zip-equal-with)                       | Iterate iterable source with another iterable collections of equal lengths simultaneously | `stream.zipEqualWith(...iterables)`                                  |
| [`zipFilledWith`](#zip-filled-with)                     | Iterate iterable source with another iterable collections simultaneously (with filler)    | `stream.zipFilledWith(filler, ...iterables)`                         |
| [`zipLongestWith`](#zip-longest-with)                   | Iterate iterable source with another iterable collections simultaneously                  | `stream.zipLongestWith(...iterables)`                                |

#### Stream Terminal Operations
##### Transformation Terminal Operations
| Terminal Operation       | Description                                      | Code Snippet        |
|--------------------------|--------------------------------------------------|---------------------|
| [`tee`](#tee-1)          | Returns array of multiple identical Streams      | `stream.tee(count)` |
| [`toArray`](#to-array-1) | Returns array of stream elements                 | `stream.toArray()`  |
| [`toMap`](#to-map-1)     | Returns map of stream elements (key-value pairs) | `stream.toMap()`    |
| [`toSet`](#to-set-1)     | Returns set of stream elements                   | `stream.toSet()`    |

##### Reduction Terminal Operations
| Terminal Operation                       | Description                                        | Code Snippet                            |
|------------------------------------------|----------------------------------------------------|-----------------------------------------|
| [`toAverage`](#to-average-1)             | Reduces stream to the mean average of its items    | `stream.toAverage()`                    |
| [`toCount`](#to-count-1)                 | Reduces stream to its length                       | `stream.toCount()`                      |
| [`toFirst`](#to-first-1)                 | Reduces stream to its first value                  | `stream.toFirst()`                      |
| [`toFirstAndLast`](#to-first-and-last-1) | Reduces stream to its first and last values        | `stream.toFirstAndLast()`               |
| [`toLast`](#to-last-1)                   | Reduces stream to its last value                   | `stream.toLast()`                       |
| [`toMax`](#to-max-1)                     | Reduces stream to its max value                    | `stream.toMax([compareBy])`             |
| [`toMin`](#to-min-1)                     | Reduces stream to its min value                    | `stream.toMin([compareBy])`             |
| [`toMin`](#to-min-max-1)                 | Reduce stream to its lower and upper bounds        | `stream.toMinMax([compareBy])`          |
| [`toProduct`](#to-product-1)             | Reduces stream to the product of its items         | `stream.toProduct()`                    |
| [`toRange`](#to-range-1)                 | Reduces stream to difference of max and min values | `stream.toRange()`                      |
| [`toSum`](#to-sum-1)                     | Reduces stream to the sum of its items             | `stream.toSum()`                        |
| [`toValue`](#to-value-1)                 | Reduces stream like array.reduce() function        | `stream.toValue(reducer, initialValue)` |

##### Summary Terminal Operations
| Terminal Operation                  | Description                                                            | Code Snippet                           |
|-------------------------------------|------------------------------------------------------------------------|----------------------------------------|
| [`allMatch`](#all-match-1)          | Returns true if all items in stream match predicate                    | `stream.allMatch(predicate)`           |
| [`allUnique`](#all-unique-1)        | Returns true if all elements of stream are unique                      | `stream.allUnique(predicate)`          |
| [`anyMatch`](#any-match-1)          | Returns true if any item in stream matches predicate                   | `stream.anyMatch(predicate)`           |
| [`exactlyN`](#exactly-n-1)          | Returns true if exactly n items are true according to predicate        | `stream.exactlyN(n, predicate)`        |
| [`isReversed`](#is-reversed-1)      | Returns true if stream is sorted in reverse descending order           | `stream.isReversed()`                  |
| [`isSorted`](#is-sorted-1)          | Returns true if stream is sorted in ascending order                    | `stream.isSorted()`                    |
| [`noneMatch`](#none-match-1)        | Returns true if none of the items in stream match predicate            | `stream.noneMatch(predicate)`          |
| [`sameWith`](#same-with)            | Returns true if stream and all given collections are the same          | `stream.sameWith(...collections)`      |
| [`sameCountWith`](#same-count-with) | Returns true if stream and all given collections have the same lengths | `stream.sameCountWith(...collections)` |

#### Stream Debug Operations
| Debug Operation              | Description                                    | Code Snippet                  |
|------------------------------|------------------------------------------------|-------------------------------|
| [`peek`](#peek)              | Peek at each element between stream operations | `stream.peek(peekFunc)`       |
| [`peekStream`](#peek-stream) | Peek at the entire stream between operations   | `stream.peekStream(peekFunc)` |

Usage
-----

## Multi Iteration
### Chain
Chain multiple iterables together into a single continuous sequence.

```
function* chain<T>(
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T>
```
```typescript
import { multi } from 'itertools-ts';

const prequels = ['Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'];
const originals = ['A New Hope', 'Empire Strikes Back', 'Return of the Jedi'];

for (const movie of multi.chain(prequels, originals)) {
  console.log(movie);
}
// 'Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'A New Hope', 'Empire Strikes Back', 'Return of the Jedi'
```

### Zip
Iterate multiple iterable collections simultaneously.

```
function* zip<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<ZipTuple<T, never>>
```

```typescript
import { multi } from 'itertools-ts';

const languages = ['PHP', 'Python', 'Java', 'Go'];
const mascots = ['elephant', 'snake', 'bean', 'gopher'];

for (const [language, mascot] of multi.zip(languages, mascots)) {
  console.log(`The ${language} language mascot is an ${mascot}.`);
}
// The PHP language mascot is an elephant.
// ...
```

Zip works with multiple iterable inputs - not limited to just two.
```typescript
import { multi } from 'itertools-ts';

const names          = ['Ryu', 'Ken', 'Chun Li', 'Guile'];
const countries      = ['Japan', 'USA', 'China', 'USA'];
const signatureMoves = ['hadouken', 'shoryuken', 'spinning bird kick', 'sonic boom'];

for (const [name, country, signatureMove] of multi.zip(names, countries, signatureMoves)) {
  const streetFighter = new StreetFighter(name, country, signatureMove);
}
```
Note: For uneven lengths, iteration stops when the shortest iterable is exhausted.

### Zip Filled
Iterate multiple iterable collections simultaneously.

```
function* zipFilled<T extends Array<Iterable<unknown> | Iterator<unknown>>, F>(
  filler: F,
  ...iterables: T
): Iterable<ZipTuple<T, F>>
```

For uneven lengths, the exhausted iterables will produce `filler` value for the remaining iterations.

```typescript
import { multi } from 'itertools-ts';

const letters = ['A', 'B', 'C'];
const numbers = [1, 2];

for (const [letter, number] of multi.zipFilled('filler', letters, numbers)) {
  // ['A', 1], ['B', 2], ['C', 'filler']
}
```

### Zip Longest
Iterate multiple iterable collections simultaneously.

```
function* zipLongest<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<ZipTuple<T, undefined>>
```

For uneven lengths, the exhausted iterables will produce `undefined` for the remaining iterations.

```typescript
import { multi } from 'itertools-ts';

const letters = ['A', 'B', 'C'];
const numbers = [1, 2];

for (const [letter, number] of multi.zipLongest(letters, numbers)) {
  // ['A', 1], ['B', 2], ['C', undefined]
}
```

### Zip Equal
Iterate multiple iterable collections with equal lengths simultaneously.

Throws `LengthException` if lengths are not equal, meaning that at least one iterator ends before the others.

```
function* zipEqual<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<ZipTuple<T, never>>
```

```typescript
import { multi } from 'itertools-ts';

const letters = ['A', 'B', 'C'];
const numbers = [1, 2, 3];

for (const [letter, number] of multi.zipEqual(letters, numbers)) {
    // ['A', 1], ['B', 2], ['C', 3]
}
```

## Single Iteration
### Chunkwise
Return elements in chunks of a certain size.

```
function* chunkwise<T>(
  data: Iterable<T>|Iterator<T>,
  chunkSize: number,
): Iterable<Array<T>>
```

Chunk size must be at least 1.

```typescript
import { single } from 'itertools-ts';

const movies = [
    'Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith',
    'A New Hope', 'Empire Strikes Back', 'Return of the Jedi',
    'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker',
];
const trilogies = [];

for (const trilogy of single.chunkwise(movies, 3)) {
    trilogies.push(trilogy);
}
// [
//     ['Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'],
//     ['A New Hope', 'Empire Strikes Back', 'Return of the Jedi'],
//     ['The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker]',
// ]
```

### Chunkwise Overlap
Return overlapped chunks of elements.

```
function* chunkwiseOverlap<T>(
  data: Iterable<T>|Iterator<T>,
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail: boolean = true,
): Iterable<Array<T>>
```

* Chunk size must be at least 1.
* Overlap size must be less than chunk size.

```typescript
import { single } from 'itertools-ts';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const chunk of single.chunkwiseOverlap(numbers, 3, 1)) {
  // [1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9], [9, 10]
}
```

### Compress
Compress an iterable by filtering out data that is not selected.

```
function* compress<T>(
  data: Iterable<T> | Iterator<T>,
  selectors: Iterable<number|boolean> | Iterator<number|boolean>
): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const movies = [
  'Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith',
  'A New Hope', 'Empire Strikes Back', 'Return of the Jedi',
  'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'
];
const goodMovies = [0, 0, 0, 1, 1, 1, 1, 0, 0];

for (const goodMovie of single.compress(movies, goodMovies)) {
  console.log(goodMovie);
}
// 'A New Hope', 'Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens'
```

### Drop While
Drop elements from the iterable while the predicate function is true.

Once the predicate function returns false once, all remaining elements are returned.

```
function* dropWhile<T>(
  data: Iterable<T>|Iterator<T>,
  predicate: (item: T) => boolean
): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const scores    = [50, 60, 70, 85, 65, 90];
const predicate = (x) => x < 70;

for (const score of single.dropWhile(scores, predicate)) {
  console.log(score);
}
// 70, 85, 65, 90
```

### Enumerate
Enumerates elements of given collection.

```
function* enumerate<T>(data: Iterable<T>|Iterator<T>): Iterable<[number, T]>
```

```typescript
import { single } from 'itertools-ts';

const letters = ['a', 'b', 'c', 'd', 'e'];

for (const item of single.enumerate(letters)) {
  // [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e']]
}
```

### Filter
Filter out elements from the iterable only returning elements where the predicate function is true.

```
function* filter<T>(
  data: Iterable<T>|Iterator<T>,
  predicate: (datum: T) => boolean,
): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const starWarsEpisodes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const goodMoviePredicate = (episode) => episode > 3 && episode < 8;

for (const goodMovie of single.filter(starWarsEpisodes, goodMoviePredicate)) {
  console.log(goodMovie);
}
// 4, 5, 6, 7
```

### Flat Map
Map a function only the elements of the iterable and then flatten the results.

```
function* flatMap<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
  mapper: FlatMapper<TInput, TOutput>,
): Iterable<TOutput>
```

```typescript
import { single } from 'itertools-ts';

const data = [1, 2, 3, 4, 5];
const mapper = (item) => [item, -item];

for (number of single.flatMap(data, mapper)) {
  console.log(number);
}
// 1 -1 2 -2 3 -3 4 -4 5 -5
```

### Flatten
Flatten a multidimensional iterable.

```
function* flatten(
  data: Iterable<unknown>|Iterator<unknown>,
  dimensions: number = Infinity,
): Iterable<unknown>
```

```typescript
import { single } from 'itertools-ts';

const multidimensional = [1, [2, 3], [4, 5]];

const flattened = [];
for (const number of single.flatten(multidimensional)) {
    flattened.push(number);
}
// [1, 2, 3, 4, 5]
```

### Group By
Group data by a common data element.

Iterate pairs of group name and collection of grouped items.

```
export function* groupBy<
  T,
  TItemKeyFunction extends ((item: T) => string) | undefined,
  TResultItem extends TItemKeyFunction extends undefined ? [string, Array<T>] : [string, Record<string, T>]
>(
  data: Iterable<T> | Iterator<T>,
  groupKeyFunction: (item: T) => string,
  itemKeyFunction?: TItemKeyFunction
): Iterable<TResultItem>
```

* The `groupKeyFunction` determines the key to group elements by.
* The optional `itemKeyFunction` allows custom indexes within each group member.
* Collection of grouped items may be an array or an object (depends on presence of `itemKeyFunction` param).

```typescript
import { single } from 'itertools-ts';

const cartoonCharacters = [
    ['Garfield', 'cat'],
    ['Tom', 'cat'],
    ['Felix', 'cat'],
    ['Heathcliff', 'cat'],
    ['Snoopy', 'dog'],
    ['Scooby-Doo', 'dog'],
    ['Odie', 'dog'],
    ['Donald', 'duck'],
    ['Daffy', 'duck'],
];

const charactersGroupedByAnimal = {};
for (const [animal, characters] of single.groupBy(cartoonCharacters, (x) => x[1])) {
    charactersGroupedByAnimal[animal] = characters;
}
/*
{
  cat: [
    ['Garfield', 'cat'],
    ['Tom', 'cat'],
    ['Felix', 'cat'],
    ['Heathcliff', 'cat'],
  ],
  dog: [
    ['Snoopy', 'dog'],
    ['Scooby-Doo', 'dog'],
    ['Odie', 'dog'],
  ],
  duck: [
    ['Donald', 'duck'],
    ['Daffy', 'duck'],
  ],
}
*/
```

### Keys
Iterate keys of key-value pairs.

```
function* keys<TKey, TValue>(
  collection: Iterable<[TKey, TValue]>|Iterator<[TKey, TValue]>,
): Iterable<TKey>
```

```typescript
import { single } from 'itertools-ts';

const dict = new Map([['a', 1], ['b', 2], ['c', 3]]);

for (const key of single.keys(dict)) {
  console.log(key);
}
// 'a', 'b', 'c'
```

### Limit
Iterate up to a limit.

Stops even if more data available if limit reached.

```
function* limit<T>(data: Iterable<T>|Iterator<T>, count: number): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const matrixMovies = ['The Matrix', 'The Matrix Reloaded', 'The Matrix Revolutions', 'The Matrix Resurrections'];
const limit = 1;

for (const goodMovie of single.limit(matrixMovies, limit)) {
    console.log(goodMovie);
}
// 'The Matrix' (and nothing else)
```

### Map
Map a function onto each element.

```
function* map<TInput, TOutput>(
  data: Iterable<TInput>|Iterator<TInput>,
  mapper: (datum: TInput) => TOutput,
): Iterable<TOutput>
```

```typescript
import { single } from 'itertools-ts';

const grades = [100, 99, 95, 98, 100];
const strictParentsOpinion = (g) => (g === 100) ? 'A' : 'F';

for (const actualGrade of single.map(grades, strictParentsOpinion)) {
  console.log(actualGrade);
}
// A, F, F, F, A
```

### Pairwise
Returns successive overlapping pairs.

Returns empty generator if given collection contains fewer than 2 elements.

```
function* pairwise<T>(data: Iterable<T>|Iterator<T>): Iterable<Pair<T>>
```

```typescript
import { single } from 'itertools-ts';

const friends = ['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe'];

for (const [leftFriend, rightFriend] of single.pairwise(friends)) {
  console.log(`${leftFriend} and ${rightFriend}`);
}
// Ross and Rachel, Rachel and Chandler, Chandler and Monica, ...
```

### Repeat
Repeat an item.

```
function* repeat<T>(item: T, repetitions: number): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

data = 'Beetlejuice';
repetitions = 3;

for (const repeated of single.repeat(data, repetitions)) {
  console.log(repeated);
}
// 'Beetlejuice', 'Beetlejuice', 'Beetlejuice'
```

### Skip
Skip n elements in the iterable after optional offset offset.

```
function* skip<T>(
  data: Iterable<T> | Iterator<T>,
  count: number,
  offset: number = 0
): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const movies = [
    'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith',
    'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi',
    'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'
];

const prequelsRemoved = [];
for (const nonPrequel of Single.skip(movies, 3)) {
  prequelsRemoved.push(nonPrequel);
} // Episodes IV - IX

const onlyTheBest = [];
for (const nonSequel of Single.skip(prequelsRemoved, 3, 3)) {
  onlyTheBest.push(nonSequel);
}
// 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'
```

### Slice
Extract a slice of the iterable.

```
function* slice<T>(
  data: Iterable<T>|Iterator<T>,
  start: number = 0,
  count?: number,
  step: number = 1,
): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const olympics = [1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022];
const winterOlympics = [];

for (const winterYear of single.slice(olympics, 1, 8, 2)) {
    winterOlympics.push(winterYear);
}
// [1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022]
```

### Sort
Iterate the collection sorted.

```
function* sort<T>(
  data: Iterable<T> | Iterator<T>,
  comparator?: Comparator<T>,
): Iterable<T>
```

Uses default sorting if optional comparator function not provided.

```typescript
import { single } from 'itertools-ts';

const data = [3, 4, 5, 9, 8, 7, 1, 6, 2];

for (const datum of single.sort(data)) {
  console.log(datum);
}
// 1, 2, 3, 4, 5, 6, 7, 8, 9
```

### Take While
Return elements from the iterable as long as the predicate is true.

Stops iteration as soon as the predicate returns false, even if other elements later on would eventually return true (different from filterTrue).

```
function* takeWhile<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): Iterable<T>
```

```typescript
import { single } from 'itertools-ts';

const prices = [0, 0, 5, 10, 0, 0, 9];
const isFree = (price) => price == 0;

for (const freePrice of single.takeWhile(prices, isFree)) {
  console.log(freePrice);
}
// 0, 0
```

### Values
Iterate values of key-value pairs.

```
function* values<TKey, TValue>(
  collection: Iterable<[TKey, TValue]>|Iterator<[TKey, TValue]>,
): Iterable<TValue>
```

```typescript
import { single } from 'itertools-ts';

const dict = new Map([['a', 1], ['b', 2], ['c', 3]]);

for (const value of single.keys(dict)) {
  console.log(value);
}
// 1, 2, 3
```

## Infinite Iteration

### Booleans
Generate random boolean values.

```
function* booleans(repetitions?: number): Iterable<boolean>
```

If `repetitions` is provided, generates exactly that many booleans. If not provided, generates booleans infinitely.

```typescript
import { infinite } from 'itertools-ts';

for (const bool of infinite.booleans(5)) {
  console.log(bool);
}
// true, false, false, true, false (random values)

for (const bool of infinite.booleans()) {
  console.log(bool);
}
// false, false, true, false, true, ... (infinite random values)

// Async version
for await (const bool of infinite.booleansAsync(5)) {
  console.log(bool);
}
// true, false, true, false, true (random values)
```

### Count
Count sequentially forever.

```
function* count(start: number = 1, step: number = 1): Iterable<number>
```

```typescript
import { infinite } from 'itertools-ts';

for (const i of infinite.count()) {
  console.log(i);
}
// 1, 2, 3, 4, 5, ...
```

### Cycle
Cycle through the elements of a collection sequentially forever.

```
function* cycle<T>(iterable: Iterable<T> | Iterator<T>): Iterable<T>
```

```typescript
import { infinite } from 'itertools-ts';

for (const item of infinite.cycle(['rock', 'paper', 'scissors'])) {
  console.log(item);
}
// 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', ...
```

### Repeat
Repeat an item forever.

```
function* repeat<T>(item: T): Iterable<T>
```

```typescript
import { infinite } from 'itertools-ts';

for (const item of infinite.repeat('bla')) {
  console.log(item);
}
// bla, bla, bla, bla, bla, ...
```

## Random Iteration

### Percentage
Generate random percentage values.

```
function* percentage(repetitions?: number): Iterable<number>
```

If `repetitions` is provided, generates exactly that many numbers. If not provided, generates numbers infinitely.

```typescript
import { random } from 'itertools-ts';

for (const num of infinite.percentage(5)) {
  console.log(num);
}
// 0.7745835631877125, 0.6368758907434469, 0.6465445462428422, 0.49809604559145615, 0.7009703411939564 (random values)

for (const num of infinite.percentage()) {
  console.log(num);
}
// 0.7745835631877125, 0.6368758907434469, 0.6465445462428422... (random values)

// Async version
for await (const num of infinite.percentageAsync(5)) {
  console.log(num);
}
// 0.7745835631877125, 0.6368758907434469, 0.6465445462428422... (random values)
```

## Math Iteration

### Running Average
Accumulate the running average over a list of numbers.

```
function* runningAverage(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number>
```

```typescript
import { math } from 'itertools-ts';

const grades = [100, 80, 80, 90, 85];

for (const runningAverage of math.runningAverage(grades)) {
  console.log(runningAverage);
}
// 100, 90, 86.667, 87.5, 87
```

### Running Difference
Accumulate the running difference over a list of numbers.

```
function* runningDifference(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number>
```

```typescript
import { math } from 'itertools-ts';

const credits = [1, 2, 3, 4, 5];

for (const runningDifference of math.runningDifference(credits)) {
    console.log(runningDifference);
}
// -1, -3, -6, -10, -15
```

Provide an optional initial value to lead off the running difference.

```typescript
import { math } from 'itertools-ts';

const dartsScores   = [50, 50, 25, 50];
const startingScore = 501;

for (const runningScore of math.runningDifference(dartsScores, startingScore)) {
  console.log(runningScore);
}
// 501, 451, 401, 376, 326
```

### Running Max
Accumulate the running maximum over a list of numbers.

```
function* runningMax(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number>
```

```typescript
import { math } from 'itertools-ts';

const numbers = [1, 2, 1, 3, 5];

for (const runningMax of math.runningMax(numbers)) {
  console.log(runningMax);
}
// 1, 2, 2, 3, 5
```

### Running Min
Accumulate the running minimum over a list of numbers.

```
function* runningMin(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number>
```

```typescript
import { math } from 'itertools-ts';

const numbers = [3, 4, 2, 5, 1];

for (const runningMin of math.runningMin(numbers)) {
    console.log(runningMin);
}
// 3, 3, 2, 2, 1
```

### Running Product
Accumulate the running product over a list of numbers.

```
function* runningProduct(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number>
```

```typescript
import { math } from 'itertools-ts';

const numbers = [1, 2, 3, 4, 5];

for (const runningProduct of math.runningProduct(numbers)) {
  console.log(runningProduct);
}
// 1, 2, 6, 24, 120
```

Provide an optional initial value to lead off the running product.

```typescript
import { math } from 'itertools-ts';

const numbers = [1, 2, 3, 4, 5];
const initialValue = 5;

for (const runningProduct of math.runningProduct(numbers, initialValue)) {
  console.log(runningProduct);
}
// 5, 5, 10, 30, 120, 600
```

### Running Total
Accumulate the running total over a list of numbers.

```
function* runningTotal(
  numbers: Iterable<Numeric> | Iterator<Numeric>,
  initialValue?: number
): Iterable<number>
```

```typescript
import { math } from 'itertools-ts';

const prices = [1, 2, 3, 4, 5];

for (const runningTotal of math.runningTotal(prices)) {
    console.log(runningTotal);
}
// 1, 3, 6, 10, 15
```

Provide an optional initial value to lead off the running total.
```typescript
import { math } from 'itertools-ts';

const prices = [1, 2, 3, 4, 5];
const initialValue = 5;

for (const runningTotal of math.runningTotal(prices, initialValue)) {
  console.log(runningTotal);
}
// 5, 6, 8, 11, 15, 20
```

## Reduce
### To Average
Reduces to the mean average.

Returns `undefined` if collection is empty.

```
function toAverage(
  data: Iterable<number> | Iterator<number>,
): number | undefined
```

```typescript
import { reduce } from 'itertools-ts';

const grades = [100, 90, 95, 85, 94];

const finalGrade = reduce.toAverage(numbers);
// 92.8
```

### To Count
Reduces iterable to its length.

```
function toCount(data: Iterable<unknown>|Iterator<unknown>): number
```

```typescript
import { reduce } from 'itertools-ts';

const data = [1, 2, 3];

const length = reduce.toCount(data);
// 3
```

### To First
Reduces iterable to its first element.

```
function toFirst<T>(data: Iterable<T> | Iterator<T>): T
```

Throws `LengthException` if collection is empty.

```typescript
import { reduce } from 'itertools-ts';

const medals = ['gold', 'silver', 'bronze'];

const first = reduce.toFirst(medals);
// gold
```

### To First And Last
Reduces iterable to its first and last elements.

```
function toFirstAndLast<T>(data: Iterable<T> | Iterator<T>): [T, T]
```

Throws `LengthException` if collection is empty.

```typescript
import { reduce } from 'itertools-ts';

const medals = ['gold', 'silver', 'bronze'];

const result = reduce.toFirstAndLast(medals);
// [gold, bronze]
```

### To Last
Reduces iterable to its last element.

```
function toLast<T>(data: Iterable<T> | Iterator<T>): T
```

Throws `LengthException` if collection is empty.

```typescript
import { reduce } from 'itertools-ts';

const medals = ['gold', 'silver', 'bronze'];

const first = reduce.toFirst(medals);
// bronze
```

### To Max
Reduces to the max value.

```
function toMax<TValue>(
  data: Iterable<TValue>|Iterator<TValue>,
  compareBy?: (datum: TValue) => Comparable,
): TValue|undefined
```

- Optional callable param `compareBy` must return comparable value.
- If `compareBy` is not provided then items of given collection must be comparable.
- Returns `undefined` if collection is empty.

```typescript
import { reduce } from 'itertools-ts';

const numbers = [5, 3, 1, 2, 4];

const result = reduce.toMax(numbers);
// 1

const movieRatings = [
  {
    title: 'The Matrix',
    rating: 4.7,
  },
  {
    title: 'The Matrix Reloaded',
    rating: 4.3,
  },
  {
    title: 'The Matrix Revolutions',
    rating: 3.9,
  },
  {
    title: 'The Matrix Resurrections',
    rating: 2.5,
  },
];
const compareBy = (movie) => movie.rating;

const lowestRatedMovie = reduce.toMin(movieRatings, compareBy);
// {
//   title: 'The Matrix',
//   rating: 4.7,
// }
```

### To Min
Reduces to the min value.

```
function toMin<TValue>(
  data: Iterable<TValue>|Iterator<TValue>,
  compareBy?: (datum: TValue) => Comparable,
): TValue|undefined
```

- Optional callable param `compareBy` must return comparable value.
- If `compareBy` is not provided then items of given collection must be comparable.
- Returns `undefined` if collection is empty.

```typescript
import { reduce } from 'itertools-ts';

const numbers = [5, 3, 1, 2, 4];

const result = reduce.toMin(numbers);
// 1

const movieRatings = [
  {
    title: 'The Matrix',
    rating: 4.7,
  },
  {
    title: 'The Matrix Reloaded',
    rating: 4.3,
  },
  {
    title: 'The Matrix Revolutions',
    rating: 3.9,
  },
  {
    title: 'The Matrix Resurrections',
    rating: 2.5,
  },
];
const compareBy = (movie) => movie.rating;

const lowestRatedMovie = reduce.toMin(movieRatings, compareBy);
// {
//   title: 'The Matrix Resurrections',
//   rating: 2.5,
// }
```

### To Min Max
Reduces collection to its lower and upper bounds.

```
function toMinMax<T>(
  data: Iterable<T> | Iterator<T>,
  compareBy?: (item: T) => Comparable
): [T?, T?]
```

- Optional callable param `compareBy` must return comparable value.
- If `compareBy` is not provided then items of given collection must be comparable.
- Returns `[undefined, undefined]` if collection is empty.

```typescript
import { reduce } from 'itertools-ts';

const numbers = [5, 3, 1, 2, 4];

const result = reduce.toMinMax(numbers);
// [1, 5]

const movieRatings = [
  {
    title: 'The Matrix',
    rating: 4.7,
  },
  {
    title: 'The Matrix Reloaded',
    rating: 4.3,
  },
  {
    title: 'The Matrix Revolutions',
    rating: 3.9,
  },
  {
    title: 'The Matrix Resurrections',
    rating: 2.5,
  },
];
const compareBy = (movie) => movie.rating;

const lowestRatedMovie = reduce.toMin(movieRatings, compareBy);
// [{
//   title: 'The Matrix Resurrections',
//   rating: 2.5,
// },
// {
//   title: 'The Matrix',
//   rating: 4.7,
// }]
```

### To Product
Reduces to the product of its elements.

Returns `undefined` if collection is empty.

```
function toProduct(data: Iterable<number>|Iterator<number>): number|undefined
```

```typescript
import { reduce } from 'itertools-ts';

const primeFactors = [5, 2, 2];

const number = reduce.toProduct(primeFactors);
// 20
```

### To Range
Reduces given collection to its range (difference between max and min).

```
function toRange(numbers: Iterable<Numeric> | Iterator<Numeric>): number
```

Returns `0` if iterable source is empty.

```typescript
import { reduce } from 'itertools-ts';

const grades = [100, 90, 80, 85, 95];

const range = reduce.toRange(numbers);
// 20
```

### To Sum
Reduces to the sum of its elements.

```
function toSum(data: Iterable<number>|Iterator<number>): number
```

```typescript
import { reduce } from 'itertools-ts';

const parts = [10, 20, 30];

const sum = reduce.toSum(parts);
// 60
```

### To Value
Reduce elements to a single value using reducer function.

```
function toValue<TInput, TOutput>(
  data: Iterable<TInput> | Iterator<TInput>,
  reducer: (carry: TOutput, datum: TInput) => TOutput,
  initialValue?: TOutput
): TOutput
```

```typescript
import { reduce } from 'itertools-ts';

const input = [1, 2, 3, 4, 5];
const sum = (carry, item) => carry + item;

const result = reduce.toValue(input, sum, 0);
// 15
```

## Set and multiset
### Distinct
Filter out elements from the iterable only returning distinct elements.

```
function* distinct<T>(
  data: Iterable<T>|Iterator<T>,
  compareBy?: (datum: T) => Comparable
): Iterable<T>
```

Always treats different instances of objects and arrays as unequal.

```typescript
import { set } from 'itertools-ts';

const chessSet = ['rook', 'rook', 'knight', 'knight', 'bishop', 'bishop', 'king', 'queen', 'pawn', 'pawn'];

for (const chessPiece of set.distinct(chessSet)) {
  console.log(chessPiece);
}
// rook, knight, bishop, king, queen, pawn


const users = [
  { 'name': 'John', 'id': 1 },
  { 'name': 'Mary', 'id': 2 },
  { 'name': 'Mary', 'id': 3 },
  { 'name': 'John', 'id': 4 },
  { 'name': 'Jane', 'id': 5 },
];

for (const user of set.distinct(users, (item) => item['name'])) {
  console.log(user);
}
// { 'name': 'John', 'id': 1 }, { 'name': 'Mary', 'id': 2 }, { 'name': 'Jane', 'id': 5 }
```

### Intersection
Iterates intersection of iterables.

```
function* intersection<T>(...iterables: Array<Iterable<T> | Iterator<T>>): Iterable<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) intersection rules apply.

```typescript
import { set } from 'itertools-ts';

const chessPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];
const shogiPieces = ['rook', 'knight', 'bishop', 'king', 'pawn', 'lance', 'gold general', 'silver general'];

for (const commonPiece of set.intersection(chessPieces, shogiPieces)) {
    console.log(commonPiece);
}
// rook, knight, bishop, king, pawn
```

### Partial Intersection
Iterates [M-partial intersection](https://github.com/Smoren/partial-intersection-php) of iterables.

```
function* partialIntersection<T>(
  minIntersectionCount: number,
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) intersection rules apply.

```typescript
import { set } from 'itertools-ts';

const staticallyTyped    = ['c++', 'java', 'c#', 'go', 'haskell'];
const dynamicallyTyped   = ['php', 'python', 'javascript', 'typescript'];
const supportsInterfaces = ['php', 'java', 'c#', 'typescript'];

for (const language of set.partialIntersection(2, staticallyTyped, dynamicallyTyped, supportsInterfaces)) {
  console.log(language);
}
// c++, java, c#, go, php
```

### Symmetric difference
Iterates the symmetric difference of iterables.

```
function* symmetricDifference<T>(
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Iterable<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) difference rules apply.

```typescript
import { set } from 'itertools-ts';

const a = [2, 3, 4, 7];
const b = [2, 3, 5, 8];
const c = [2, 3, 6, 9];

for (const item of set.symmetricDifference(a, b, c)) {
  console.log(item);
}
// 4, 5, 6, 7, 8, 9
```

### Union
Iterates the union of iterables.

```
function* union<T>(...iterables: Array<Iterable<T> | Iterator<T>>): Iterable<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) difference rules apply.

```typescript
import { set } from 'itertools-ts';

const a = [1, 2, 3];
const b = [2, 3, 4];
const c = [3, 4, 5];

for (const item of set.symmetricDifference(a, b, c)) {
    console.log(item);
}
// 1, 2, 3, 4, 5
```

## Combinatorics
### Cartesian Product
Iterates cartesian product of given iterables.

```
function* cartesianProduct<T extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: T
): Iterable<ZipTuple<T, never>>
```

```typescript
import { combinatorics } from 'itertools-ts';

const numbers = [1, 2];
const letters = ['a', 'b'];
const chars = ['!', '?'];

for (const tuple of combinatorics.cartesianProduct(numbers, letters, chars)) {
  console.log(tuple);
}
/*
  [1, 'a', '!'],
  [1, 'a', '?'],
  [1, 'b', '!'],
  [1, 'b', '?'],
  [2, 'a', '!'],
  [2, 'a', '?'],
  [2, 'b', '!'],
  [2, 'b', '?'],
*/
```

### Combinations
Iterates all combinations of given iterable.

```
function* combinations<T>(
  data: Iterable<T> | Iterator<T>,
  length: number
): Iterable<Array<T>>
```

```typescript
import { combinatorics } from 'itertools-ts';

const fruits = ['apple', 'banana', 'cherry'];

for (const combination of combinatorics.combinations(fruits, 2)) {
  console.log(combination);
}
// ['apple', 'banana']
// ['apple', 'cherry']
// ['banana', 'cherry']
```

### Permutations
Iterates all permutations of given iterable.

```
function* permutations<T>(
  data: Iterable<T> | Iterator<T>,
  length: number
): Iterable<Array<T>>
```

```typescript
import { combinatorics } from 'itertools-ts';

const fruits = ['apple', 'banana', 'cherry'];

for (const permutation of combinatorics.permutations(fruits, 2)) {
  console.log(permutation);
}
// ['apple', 'banana']
// ['apple', 'cherry']
// ['banana', 'apple']
// ['banana', 'cherry']
// ['cherry', 'apple']
// ['cherry', 'banana']
```

## Summary
### All Match
Returns true if all elements match the predicate function.

```
function allMatch<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): boolean
```

Empty collections return true.

```typescript
import { summary } from "itertools-ts";

const finalFantasyNumbers = [4, 5, 6];
const isOnSuperNintendo   = (ff) => ff >= 4 && ff <= 6;

const trueResult = summary.allMatch(finalFantasyNumbers, isOnSuperNintendo);
// true

const isOnPlaystation = (ff) => ff >= 7 && ff <= 9;

const falseResult = summary.allMatch(finalFantasyNumbers, isOnPlaystation);
// false
```

### All Unique
Return true if all elements in given collection are unique.

```
function allUnique(data: Iterable<unknown> | Iterator<unknown>): boolean
```

Empty collections return true.

Considers different instances of data containers to be different, even if they have the same content.

```typescript
import { summary } from "itertools-ts";

const uniqueNumbers = [1, 2, 3, 4, 5];
summary.allUnique(uniqueNumbers);
// true

const notUniqueNumbers = [1, 1, 2, 2, 3];
summary.allUnique(notUniqueNumbers);
// false
```

### Any Match
Returns true if any element matches the predicate function.

```
function anyMatch<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): boolean
```

Empty collections return false.

```typescript
import { summary } from "itertools-ts";

const answers          = ['fish', 'towel', 42, "don't panic"];
const isUltimateAnswer = (a) => a == 42;

const trueResult = summary.anyMatch(answers, isUltimateAnswer);
// true
```

### Exactly N
Returns true if exactly n items are true according to a predicate function.

- Predicate is optional.
- Default predicate is boolean value of each item.

```
function exactlyN<T>(
  data: Iterable<T> | Iterator<T>,
  n: number,
  predicate?: (item: T) => boolean,
): boolean
```

```typescript
import { summary } from "itertools-ts";

const twoTruthsAndALie = [true, true, false];
const n = 2;

const trueResult = summary.exactlyN(twoTruthsAndALie, n);
// true

const ages = [18, 21, 24, 54];
const m = 4;
const predicate = (age) => age >= 21;

const falseResult = Summary::exactlyN(ages, m, predicate);
// false
```

### Is Async Iterable
Returns true if given data is an `AsyncIterable` instance.

```
function isAsyncIterable(input: unknown): boolean
```

```typescript
import { summary } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

summary.isIterable(input); // false
summary.isIterable(input[Symbol.asyncIterator]()) // false
summary.isIterable(1); // false
```

### Is Iterable
Returns true if given data is an `Iterable` instance.

```
function isIterable(input: unknown): boolean
```

```typescript
import { summary } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

summary.isIterable(input); // true
summary.isIterable(input[Symbol.iterator]()) // false
summary.isIterable(1); // false
```

### Is Iterator
Returns true if given data is an `Iterator` instance.

```
function isIterator(input: unknown): boolean
```

```typescript
import { summary } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

summary.isIterator(input[Symbol.iterator]()) // true
summary.isIterator(input); // false
summary.isIterator(1); // false
```

### Is Reversed
Returns true if elements are reverse sorted, otherwise false.

```
function isReversed(data: Iterable<Comparable> | Iterator<Comparable>): boolean
```

- Elements must be comparable.
- Returns true if empty or has only one element.

```typescript
import { summary } from "itertools-ts";

const reversedNumbers = [5, 4, 3, 2, 1];

Summary.isReversed(reversedNumbers);
// true

const numbers = [1, 4, 3, 2, 1];

Summary.isReversed(numbers);
// false
```

### Is Sorted
Returns true if elements are sorted, otherwise false.

```
function isSorted(data: Iterable<Comparable> | Iterator<Comparable>): boolean
```

- Elements must be comparable.
- Returns true if empty or has only one element.

```typescript
import { summary } from "itertools-ts";

const sortedNumbers = [1, 2, 3, 4, 5];

Summary.isSorted(sortedNumbers);
// true

const numbers = [3, 2, 3, 4, 5];

Summary.isSorted(numbers);
// false
```

### Is String
Returns true if given data is a string.

```
function isString(input: unknown): boolean
```

```typescript
import { summary } from "itertools-ts";

summary.isString('') // true
summary.isString('abc') // true
summary.isString(String('abc')) // true
summary.isString(1); // false
```

### None Match
Returns true if no element matches the predicate function.

```
function noneMatch<T>(
  data: Iterable<T> | Iterator<T>,
  predicate: (item: T) => boolean
): boolean
```

Empty collections return true.

```typescript
import { summary } from "itertools-ts";

const grades         = [45, 50, 61, 0];
const isPassingGrade = (grade) => grade >= 70;

const trueResult = summary.noneMatch(grades, isPassingGrade);
// true
```

### Same
Returns true if all given collections are the same.

For single collection or empty collections list returns true.

```
function same(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean
```

```typescript
import { summary } from "itertools-ts";

const cocaColaIngredients = ['carbonated water', 'sugar', 'caramel color', 'phosphoric acid'];
const pepsiIngredients    = ['carbonated water', 'sugar', 'caramel color', 'phosphoric acid'];
const spriteIngredients   = ['carbonated water', 'sugar', 'citric acid', 'lemon lime flavorings'];

const trueResult = summary.same(cocaColaIngredients, pepsiIngredients);
// true

const falseResult = summary.same(cocaColaIngredients, spriteIngredients);
// false
```

### Same Count
Returns true if all given collections have the same lengths.

For single collection or empty collections list returns true.

```
function same(
  ...collections: Array<Iterable<unknown> | Iterator<unknown>>
): boolean
```

```typescript
import { summary } from "itertools-ts";

const prequels  = ['Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'];
const originals = ['A New Hope', 'Empire Strikes Back', 'Return of the Jedi'];
const sequels   = ['The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'];

const trueResult = summary.sameCount(prequels, originals, sequels);
// true

const batmanMovies = ['Batman Begins', 'The Dark Knight', 'The Dark Knight Rises'];
const matrixMovies = ['The Matrix', 'The Matrix Reloaded', 'The Matrix Revolutions', 'The Matrix Resurrections'];

const falseResult = summary.sameCount(batmanMovies, matrixMovies);
// false
```

## Transform
### Tee
Return several independent (duplicated) iterators from a single iterable.

```
function tee<T>(
  collection: Iterable<T> | Iterator<T>,
  count: number
): Array<RelatedIterable<T>>
```

Once tee has been called to duplicate iterators, it is advisable to not use the original input iterator any further.

Duplicating iterators can use up memory. Consider if tee is the right solution. For example, arrays and most
iterators can be rewound and reiterated without need for duplication.

```typescript
import { transform } from "itertools-ts";

const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const count = 3;

const [week1, week2, week3] = transform.tee(data, count);
// Each week contains iterator containing ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
```

### To Array
Returns `Array` instance of given collection or iterator.

```
function toArray<T>(
  collection: Iterable<T>|Iterator<T>
): Array<T>
```

```typescript
import { transform } from "itertools-ts";

const iterator = transform.toIterator([1, 2, 3, 4, 5]);

const result = transform.toArray(iterator);
// [1, 2, 3, 4, 5]
```

### To Async Iterable
Returns `AsyncIterable` instance of given collection, record or iterator (sync or async).

Throws `InvalidArgumentError` if given data is not a collection or an iterator.

```
function toAsyncIterable<T>(
  collection:
    | Iterable<T>
    | Iterator<T>
    | AsyncIterable<T>
    | AsyncIterator<T>
    | Record<PropertyKey, unknown>
): AsyncIterable<T>
```

```typescript
import { transform } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = transform.toAsyncIterable(input);
// AsyncIterable<[1, 2, 3, 4, 5]>
```

### To Async Iterator
Returns `AsyncIterator` instance of given collection or iterator.

Throws `InvalidArgumentError` if given data is not a collection or an iterator.

```
function toAsyncIterator<T>(
  collection: Iterable<T> | Iterator<T> | AsyncIterable<T> | AsyncIterator<T>
): AsyncIterator<T>
```

```typescript
import { transform } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = transform.toAsyncIterator(input);
console.log(result.next !== undefined);
// true
```

### To Iterable
Returns `Iterable` instance of given collection, record or iterator.

Throws `InvalidArgumentError` if given data is not a collection or an iterator.

```
function toIterable<T>(
  collection: Iterable<T>|Iterator<T>|Record<string|number|symbol, unknown>
): Iterable<T>
```

```typescript
import { transform } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = transform.toIterable(input);
// [1, 2, 3, 4, 5]
```

### To Iterator
Returns `Iterator` instance of given collection or iterator.

Throws `InvalidArgumentError` if given data is not a collection or an iterator.

```
function toIterator<T>(collection: Iterable<T>|Iterator<T>): Iterator<T>
```

```typescript
import { transform } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = transform.toIterator(input);
console.log(result.next !== undefined);
// true
```

### To Map
Converts given iterable of key-value pairs to Map.

```
function toMap<TKey, TValue>(
  pairs: Iterable<[TKey, TValue]> | Iterator<[TKey, TValue]> | Record<string|number|symbol, unknown>
): Map<TKey, TValue>
```

```typescript
import { transform } from "itertools-ts";

const input = [['a', 1], ['b', 2], ['c', 3]];

const result = transform.toMap(input);
// Map([['a', 1], ['b', 2], ['c', 3]])
```

### To Set
Converts given iterable to Set.

```
function toSet<T>(
  collection: Iterable<T> | Iterator<T>
): Set<T>
```

```typescript
import { transform } from "itertools-ts";

const input = [1, 1, 2, 2, 3, 3];

const result = transform.toSet(input);
// Set([1, 2, 3])
```

## Stream and Async Stream
Streams provide a fluent interface to transform arrays and iterables (sync or async) through a pipeline of operations.

Streams are made up of:

1. One stream source factory method to create the stream.
2. Zero or more stream operators that transform the stream to a new stream.
3. Terminal operation of either:
   * Stream terminal operation to transform the stream to a value or data structure.
     ```typescript
     const result1 = Stream.of([1, 1, 2, 2, 3, 4, 5])
       .distinct()             // [1, 2, 3, 4, 5]
       .map((x) => x**2)       // [1, 4, 9, 16, 25]
       .filter((x) => x < 10)  // [1, 4, 9]
       .toSum();               // 14

     // Async example
     const result2 = await AsyncStream.of([1, 1, 2, 2, 3, 4, 5].map((x) => Promise.resolve(x)))
       .distinct()             // [1, 2, 3, 4, 5]
       .map((x) => x**2)       // [1, 4, 9, 16, 25]
       .filter((x) => x < 10)  // [1, 4, 9]
       .toSum();               // 14
     ```
   * The stream is iterated via a `for` loop.
     ```typescript
     const result1 = Stream.of([1, 1, 2, 2, 3, 4, 5])
       .distinct()             // [1, 2, 3, 4, 5]
       .map((x) => x**2)       // [1, 4, 9, 16, 25]
       .filter((x) => x < 10); // [1, 4, 9]

     for (const item of result1) {
       // 1, 4, 9
     }

     // Async example
     const result2 = AsyncStream.of([1, 1, 2, 2, 3, 4, 5].map((x) => Promise.resolve(x)))
       .distinct()             // [1, 2, 3, 4, 5]
       .map((x) => x**2)       // [1, 4, 9, 16, 25]
       .filter((x) => x < 10); // [1, 4, 9]

     for await (const item of result2) {
       // 1, 4, 9
     }
     ```

### Stream Sources
#### Of
Creates stream from an iterable.

```
Stream.of<T>(data: Iterable<T> | Iterator<T>): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const iterable = [1, 2, 3];

const result = Stream.of(iterable)
  .chainWith([4, 5, 6], [7, 8, 9])
  .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
  .toArray();
// [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9]]
```

#### Of Booleans
Create an infinite boolean stream.

```
Stream.ofBooleans(repetitions?: boolean): Stream<number>
```

```typescript
import { Stream } from "itertools-ts";

const result1 = Stream.ofBooleans()
  .limit(5)
  .toArray();
// [false, true, true, false, true]

const result2 = Stream.ofBooleans(5)
  .toArray();
// [false, true, true, false, true]
```

#### Of Count
Create an infinite count stream.

```
Stream.ofCount(start: number = 1, step: number = 1): Stream<number>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.ofCount(0, 10)
  .limit(5)
  .toArray();
// [0, 10, 20, 30, 40]
```

#### Of Cycle
Create an infinite cycle stream.

```
Stream.ofCycle<T>(iterable: Iterable<T> | Iterator<T>): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.ofCycle([1, 2, 3])
  .limit(7)
  .toArray();
// [1, 2, 3, 1, 2, 3, 1]
```

#### Of Empty
Creates stream of nothing.

```
Stream.ofEmpty(): Stream<never>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.ofEmpty()
  .chainWith([1, 2, 3])
  .toArray();
// [1, 2, 3]
```

#### Of Repeat
Create an infinite stream repeating given item.

```
Stream.ofRepeat<T>(item: T): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.ofRepeat('bla')
  .limit(5)
  .toArray();
// [bla, bla, bla, bla, bla]
```

### Stream Operations
#### Cartesian Product With
Iterate cartesian product of iterable source with another iterable collections.

```
Stream<T>.cartesianProductWith<U extends Array<Iterable<unknown> | Iterator<unknown>>>(
  ...iterables: U
): Stream<ZipTuple<[Iterable<T>, ...U], never>>
```

```typescript
import { Stream } from "itertools-ts";

const numbers = [1, 2];

const result = Stream.of(numbers)
  .cartesianProductWith(['a', 'b'], ['!', '?'])
  .toArray();
/*
[
  [1, 'a', '!'],
  [1, 'a', '?'],
  [1, 'b', '!'],
  [1, 'b', '?'],
  [2, 'a', '!'],
  [2, 'a', '?'],
  [2, 'b', '!'],
  [2, 'b', '?'],
]
*/
```

#### Chain With
Return a stream chaining additional sources together into a single consecutive stream.

```
Stream<T>.chainWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3];

const result = Stream.of(input)
  .chainWith([4, 5, 6])
  .chainWith([7, 8, 9])
  .toArray();
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### Chunkwise
Return a stream consisting of chunks of elements from the stream.

```
Stream<T>.chunkwise(chunkSize: number): Stream<Array<T>>
```

Chunk size must be at least 1.

```typescript
import { Stream } from "itertools-ts";

const friends = ['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey'];

const result = Stream.of(friends)
  .chunkwise(2)
  .toArray();
// [['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey']]
```

#### Chunkwise Overlap
Return a stream consisting of overlapping chunks of elements from the stream.

```
Stream<T>.chunkwiseOverlap(
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail = true
): Stream<Array<T>>
```

* Chunk size must be at least 1.
* Overlap size must be less than chunk size.

```typescript
import { Stream } from "itertools-ts";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = Stream.of(numbers)
  .chunkwiseOverlap(3, 1)
  .toArray()
// [[1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9]]
```

#### Combinations
Return a stream with combinations of the stream iterable.

```
Stream<T>.combinations(length: number): Stream<Array<T>>
```

```typescript
import { Stream } from 'itertools-ts';

const fruits = ['apple', 'banana', 'cherry'];

const result = Stream.of(fruits)
  .combinations(2)
  .toArray();
/*
[
  ['apple', 'banana'],
  ['apple', 'cherry'],
  ['banana', 'cherry'],
]
*/
```

#### Compress
Compress to a new stream by filtering out data that is not selected.

```
Stream<T>.compress(
  selectors: Iterable<number | boolean> | Iterator<number | boolean>
): Stream<T>
```

Selectors indicate which data. True value selects item. False value filters out data.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3];

const result = Stream.of(input)
  .compress([0, 1, 1])
  .toArray();
// [2, 3]
```

#### Distinct
Return a stream filtering out elements from the stream only returning distinct elements.

```
Stream<T>.distinct(compareBy?: (datum: T) => Comparable): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 1, 2, 3, 3, '1', '1', '2', '3'];
const numbers = Stream.of(input)
  .distinct()
  .toArray();
// [1, 2, 3, '1', '2', '3']

const users = [
  { 'name': 'John', 'id': 1 },
  { 'name': 'Mary', 'id': 2 },
  { 'name': 'Mary', 'id': 3 },
  { 'name': 'John', 'id': 4 },
  { 'name': 'Jane', 'id': 5 },
];
const result = Stream.of(input)
  .distinct((item) => item['name'])
  .toArray();
/*
[
  { 'name': 'John', 'id': 1 },
  { 'name': 'Mary', 'id': 2 },
  { 'name': 'Jane', 'id': 5 },
]
*/
```

#### Drop While
Drop elements from the stream while the predicate function is true.

```
Stream<T>.dropWhile(predicate: (item: T) => boolean): Stream<T>
```

Once the predicate function returns false once, all remaining elements are returned.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5]

const result = Stream.of(input)
  .dropWhile((value) => value < 3)
  .toArray();
// [3, 4, 5]
```

#### Enumerate
Enumerates elements of the stream.

```
Stream<T>.enumerate(): Stream<[number, T]>
```

```typescript
import { Stream } from "itertools-ts";

const input = ['a', 'b', 'c', 'd', 'e'];
const stream = Stream.of(input)
  .enumerate()
  .toArray();
// [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e']]
```

#### Filter
Filter out elements from the stream only keeping elements where there predicate function is true.

```
Stream<T>.filter(predicate: (item: T) => boolean): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(input)
  .filter((value) => value > 0)
  .toArray();
// [1, 2, 3]
```

#### Flat Map
Map a function onto the elements of the stream and flatten the results.

```
Stream<T>.flatMap<U>(mapper: FlatMapper<T, U>): Stream<U>
```

```typescript
import { Stream } from "itertools-ts";

const data = [1, 2, 3, 4, 5];
const mapper = (item) => (item % 2 === 0) ? [item, item] : item;

const result = Stream.of(data)
  .flatMap(mapper)
  .toArray();
// [1, 2, 2, 3, 4, 4, 5]
```

#### Flatten
Flatten a multidimensional stream.

```
Stream<T>.flatten(dimensions: number = Infinity): Stream<unknown>
```

```typescript
import { Stream } from "itertools-ts";

const data = [1, [2, 3], [4, 5]];

const result = Stream.of(data)
  .flatten()
  .toArray();
// [1, 2, 3, 4, 5]
```

#### Intersection With
Return a stream intersecting the stream with the input iterables.

```
Stream<T>.intersectionWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) intersection rules apply.

```typescript
import { Stream } from 'itertools-ts';

const chessPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];
const shogiPieces = ['rook', 'knight', 'bishop', 'king', 'pawn', 'lance', 'gold general', 'silver general'];

const result = Stream.of(chessPieces)
  .intersectionWith(shogiPieces)
  .toArray();
// [rook, knight, bishop, king, pawn]
```

#### Group By
Group stream data by a common data element.

Iterate pairs of group name and collection of grouped items.

```
Stream<T>.groupBy<
  TItemKeyFunction extends ((item: T) => string) | undefined,
  TResultItem extends TItemKeyFunction extends undefined ? [string, Array<T>] : [string, Record<string, T>]
>(
  groupKeyFunction: (item: T) => string,
  itemKeyFunction?: TItemKeyFunction
): Stream<TResultItem>
```

* The `groupKeyFunction` determines the key to group elements by.
* The optional `itemKeyFunction` allows custom indexes within each group member.
* Collection of grouped items may be an array or an object (depends on presence of `itemKeyFunction` param).

```typescript
import { Stream } from 'itertools-ts';

const cartoonCharacters = [
    ['Garfield', 'cat'],
    ['Tom', 'cat'],
    ['Felix', 'cat'],
    ['Heathcliff', 'cat'],
    ['Snoopy', 'dog'],
    ['Scooby-Doo', 'dog'],
    ['Odie', 'dog'],
    ['Donald', 'duck'],
    ['Daffy', 'duck'],
];

const result = Stream.of(cartoonCharacters)
  .groupBy((x) => x[1])
  .toArray();
/*
[
  ['cat', [
    ['Garfield', 'cat'],
    ['Tom', 'cat'],
    ['Felix', 'cat'],
    ['Heathcliff', 'cat'],
  ]],
  ['dog', [
    ['Snoopy', 'dog'],
    ['Scooby-Doo', 'dog'],
    ['Odie', 'dog'],
  ]],
  ['duck', [
    ['Donald', 'duck'],
    ['Daffy', 'duck'],
  ]],
]
*/
```

#### Keys
Iterate keys of key-value pairs.

```
Stream<T>.keys(): Stream<T extends [infer TKey, infer _] ? TKey : never>
```

```typescript
import { Stream } from 'itertools-ts';

const dict = new Map([['a', 1], ['b', 2], ['c', 3]]);

const result = Stream.of(dict)
  .keys()
  .toArray();
// ['a', 'b', 'c']
```

#### Limit
Return a stream up to a limit.

Stops even if more data available if limit reached.

```
Stream<T>.limit(count: number): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const matrixMovies = ['The Matrix', 'The Matrix Reloaded', 'The Matrix Revolutions', 'The Matrix Resurrections'];
const limit = 1;

const goodMovies = Stream.of(matrixMovies)
  .limit(limit)
  .toArray();
// ['The Matrix'] (and nothing else)
```

#### Map
Return a stream containing the result of mapping a function onto each element of the stream.

```
Stream<T>.map<U>(mapper: (datum: T) => U): Stream<U>
```

```typescript
import { Stream } from "itertools-ts";

const grades = [100, 95, 98, 89, 100];

const result = Stream.of(grades)
  .map((grade) => grade === 100 ? 'A' : 'F')
  .toArray();
// [A, F, F, F, A]
```

#### Pairwise
Return a stream consisting of pairs of elements from the stream.

```
Stream<T>.pairwise(): Stream<[T, T]>
```

Returns empty stream if given collection contains less than 2 elements.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const stream = Stream.of(input)
  .pairwise()
  .toArray();
// [[1, 2], [2, 3], [3, 4], [4, 5]]
```

#### Partial Intersection With
Return a stream [partially intersecting](https://github.com/Smoren/partial-intersection-php) the stream with the input iterables.

```
Stream<T>.partialIntersectionWith(
  minIntersectionCount: number,
  ...iterables: Array<Iterable<T> | Iterator<T>>
): Stream<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) intersection rules apply.

```typescript
import { Stream } from 'itertools-ts';

const staticallyTyped    = ['c++', 'java', 'c#', 'go', 'haskell'];
const dynamicallyTyped   = ['php', 'python', 'javascript', 'typescript'];
const supportsInterfaces = ['php', 'java', 'c#', 'typescript'];

const result = Stream.of(staticallyTyped)
  .partialIntersectionWith(2, dynamicallyTyped, supportsInterfaces)
  .toArray();
// ['c++', 'java', 'c#', 'go', 'php']
```

#### Permutations
Return a stream with permutations of the stream iterable.

```
Stream<T>.permutations(length: number): Stream<Array<T>>
```

```typescript
import { Stream } from 'itertools-ts';

const fruits = ['apple', 'banana', 'cherry'];

const result = Stream.of(fruits)
  .permutations(2)
  .toArray();
/*
[
  ['apple', 'banana'],
  ['apple', 'cherry'],
  ['banana', 'apple'],
  ['banana', 'cherry'],
  ['cherry', 'apple'],
  ['cherry', 'banana']
]
*/
```

#### Running Average
Return a stream accumulating the running average (mean) over the stream.

```
Stream<T>.runningAverage(initialValue?: number): Stream<number>
```

```typescript
import { Stream } from 'itertools-ts';

const input = [1, 3, 5];

const result = Stream.of(input)
  .runningAverage()
  .toArray();
// [1, 2, 3]
```

#### Running Difference
Return a stream accumulating the running difference over the stream.

```
Stream<T>.runningDifference(initialValue?: number): Stream<number>
```

```typescript
import { Stream } from 'itertools-ts';

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .runningDifference()
  .toArray();
// [-1, -3, -6, -10, -15]
```

#### Running Max
Return a stream accumulating the running max over the stream.

```
Stream<T>.runningMax(initialValue?: number): Stream<number>
```

```typescript
import { Stream } from 'itertools-ts';

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(input)
  .runningMax()
  .toArray();
// [1, 1, 2, 2, 3, 3]
```

#### Running Min
Return a stream accumulating the running min over the stream.

```
Stream<T>.runningMin(initialValue?: number): Stream<number>
```

```typescript
import { Stream } from 'itertools-ts';

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(input)
  .runningMin()
  .toArray();
// [1, -1, -1, -2, -2, -3]
```

#### Running Product
Return a stream accumulating the running product over the stream.

```
Stream<T>.runningProduct(initialValue?: number): Stream<number>
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .runningProduct()
  .toArray();
// [1, 2, 6, 24, 120]
```

#### Running Total
Return a stream accumulating the running total over the stream.

```
Stream<T>.runningTotal(initialValue?: number): Stream<number>
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .runningTotal()
  .toArray();
// [1, 3, 6, 10, 15]
```

#### Skip
Skip some elements of the stream.

```
Stream<T>.skip(count: number, offset = 0): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const movies = [
    'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith',
    'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi',
    'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker'
];

const onlyTheBest = Stream.of(movies)
  .skip(3)
  .skip(3, 3)
  .toArray();
// ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi']
```

#### Slice
Extract a slice of the stream.

```
Stream<T>.slice(start: number = 0, count?: number, step: number = 1): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const olympics = [1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022];

const summerOlympics = Stream.of(olympics)
  .slice(0, 8, 2)
  .toArray();
// [1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020]
```

#### Sort
Sorts the stream.

```
Stream<T>.sort(comparator?: Comparator<T>): Stream<T>
```

If comparator is not provided, the elements of the iterable source must be comparable.

```typescript
import { Stream } from "itertools-ts";

const input = [3, 4, 5, 9, 8, 7, 1, 6, 2];

const result = Stream.of(input)
  .sort()
  .toArray();
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### Symmetric difference With
Return a stream of the symmetric difference of the stream and the given iterables.

```
Stream<T>.symmetricDifferenceWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) difference rules apply.

```typescript
import { Stream } from 'itertools-ts';

const a = [2, 3, 4, 7];
const b = [2, 3, 5, 8];
const c = [2, 3, 6, 9];

const result = Stream.of(a)
  .symmetricDifferenceWith(b, c)
  .toArray();
// [4, 5, 6, 7, 8, 9]
```

#### Take While
Keep elements from the stream as long as the predicate is true.

```
Stream<T>.takeWhile(predicate: (item: T) => boolean): Stream<T>
```

```typescript
import { Stream } from 'itertools-ts';

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(input)
  .takeWhile((value) => Math.abs(value) < 3)
  .toArray();
// [1, -1, 2, -2]
```

#### Union With
Return a stream of union of the stream with the input iterables.

```
Stream<T>.unionWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T>
```

* Always treats different instances of objects and arrays as unequal.
* If input iterables produce duplicate items, then [multiset](https://en.wikipedia.org/wiki/Multiset) difference rules apply.

```typescript
import { Stream } from 'itertools-ts';

const a = [1, 2, 3];
const b = [2, 3, 4];
const c = [3, 4, 5];

const result = Stream.of(a)
  .unionWith(b, c)
  .toArray();
// [1, 2, 3, 4, 5]
```

#### Values
Iterate keys of key-value pairs.

```
Stream<T>.values(): Stream<T extends [infer _, infer TValue] ? TValue : never>
```

```typescript
import { Stream } from 'itertools-ts';

const dict = new Map([['a', 1], ['b', 2], ['c', 3]]);

const result = Stream.of(dict)
  .values()
  .toArray();
// [1, 2, 3]
```

#### Zip With
Return a stream consisting of multiple iterable collections streamed simultaneously.

```
Stream<T>.zipWith<
  U extends Array<Iterable<unknown> | Iterator<unknown>>
>(...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], never>>
```

For uneven lengths, iterations stops when the shortest iterable is exhausted.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3];

const stream = Stream.of(input)
  .zipWith([4, 5, 6])
  .toArray();
// [[1, 4], [2, 5], [3, 6]]
```

#### Zip Equal With
Return a stream consisting of multiple iterable collections of equal lengths streamed simultaneously.

```
Stream<T>.zipEqualWith<
  U extends Array<Iterable<unknown> | Iterator<unknown>>
>(...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], never>>
```

Works like `Stream.zipWith()` method but throws `LengthException` if lengths not equal,
i.e., at least one iterator ends before the others.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3];

const stream = Stream.of(input)
  .zipEqualWith([4, 5, 6]);

for (const zipped of stream) {
    // [1, 4], [2, 5], [3, 6]
}
```

#### Zip Filled With
Return a stream consisting of multiple iterable collections streamed simultaneously.

```
Stream<T>.zipFilledWith<
  U extends Array<Iterable<unknown> | Iterator<unknown>>,
  F
>(filler: F, ...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], F>>
```

* Iteration continues until the longest iterable is exhausted.
* For uneven lengths, the exhausted iterables will produce `filler` value for the remaining iterations.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const stream = Stream.of(input)
  .zipFilledWith('filler', [4, 5, 6]);

for (const zipped of stream) {
  // [1, 4], [2, 5], [3, 6], [4, 'filler'], [5, 'filler']
}
```

#### Zip Longest With
Return a stream consisting of multiple iterable collections streamed simultaneously.

```
Stream<T>.zipLongestWith<
  U extends Array<Iterable<unknown> | Iterator<unknown>>
>(...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], undefined>>
```

* Iteration continues until the longest iterable is exhausted.
* For uneven lengths, the exhausted iterables will produce `undefined` for the remaining iterations.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const stream = Stream.of(input)
  .zipLongestWith([4, 5, 6]);

for (const zipped of stream) {
  // [1, 4], [2, 5], [3, 6], [4, undefined], [5, undefined]
}
```

### Terminal operations
#### Transformation Terminal Operations
##### Tee
Return several independent (duplicated) streams.

```
Stream<T>.tee(count: number): Array<Stream<T>>
```

```php
import { Stream } from "itertools-ts";

const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const count = 3;

const [week1Stream, week2Stream, week3Stream] = Stream.of(daysOfWeek)
    .tee(count);

// Each weekStream contains ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
```

##### To Array
Returns an array of stream elements.

```
Stream<T>.toArray(): Array<T>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.of([1, 2, 3, 4, 5])
  .map((x) => x**2)
  .toArray();
// [1, 4, 9, 16, 25]
```

##### To Map
Converts stream to Map.

```
Stream<T>.toMap(): T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never
```

Stream collection must contain only key-value pairs as elements.

```typescript
import { Stream } from "itertools-ts";

const result = Stream.of([1, 2, 3])
  .enumerate()
  .toMap();
// Map([[0, 1], [1, 2], [2, 3]])
```

##### To Set
Converts stream to Set.

```
Stream<T>.toSet(): Set<T>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.of([1, 1, 2, 2, 3, 3])
  .toMap();
// Set([1, 2, 3])
```

#### Reduce Terminal Operations
##### To Average
Reduces iterable source to the mean average of its items.

```
Stream<T>.toAverage(): number | undefined
```

Returns `undefined` if iterable source is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [2, 4, 6, 8];

const result = Stream.of(iterable)
  .toAverage();
// 5
```

##### To Count
Reduces iterable source to its length.

```
Stream<T>.toCount(): number
```

```typescript
import { Stream } from "itertools-ts";

const input = [10, 20, 30, 40, 50];

const result = Stream.of(iterable)
  .toCount();
// 5
```

##### To First
Reduces stream to its first element.

```
Stream<T>.toFirst(): T
```

Throws `LengthException` if stream is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [10, 20, 30];

const result = Stream.of(input)
  .toFirst();
// 10
```

##### To First And Last
Reduces stream to its first last elements.

```
Stream<T>.toFirstAndLast(): [T, T]
```

Throws `LengthException` if stream is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [10, 20, 30];

const result = Stream.of(input)
  .toFirstAndLast();
// [10, 30]
```

##### To Last
Reduces stream to its last element.

```
Stream<T>.toLast(): T
```

Throws `LengthException` if stream is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [10, 20, 30];

const result = Stream.of(input)
  .toLast();
// 30
```

##### To Max
Reduces stream to its max value.

```
Stream<T>.toMax(compareBy?: (datum: T) => Comparable): T | undefined
```

- Optional callable param `compareBy` must return comparable value.
- If `compareBy` is not provided then items of given collection must be comparable.
- Returns `undefined` if collection is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(iterable)
  .toMax();
// 3
```

##### To Min
Reduces stream to its min value.

```
Stream<T>.toMin(compareBy?: (datum: T) => Comparable): T | undefined
```

- Optional callable param `compareBy` must return comparable value.
- If `compareBy` is not provided then items of given collection must be comparable.
- Returns `undefined` if collection is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(iterable)
  .toMin();
// -3
```

##### To Min Max
Reduces stream to its min and max values.

```
Stream<T>.toMinMax(compareBy?: (item: T) => Comparable): [T?, T?]
```

- Optional callable param `compareBy` must return comparable value.
- If `compareBy` is not provided then items of given collection must be comparable.
- Returns `[undefined, undefined]` if collection is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(iterable)
  .toMinMax();
// [-3, 3]
```

##### To Product
Reduces iterable source to the product of its items.

```
Stream<T>.toProduct(): number | undefined
```

Returns `undefined` if stream is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .toProduct();
// 120
```

##### To Range
Reduces stream to its range (difference between max and min).

```
Stream<T>.toRange(): number
```

Returns `0` if iterable source is empty.

```typescript
import { Stream } from "itertools-ts";

const grades = [100, 90, 80, 85, 95];

const range = stream.of(numbers)
  .toRange();
// 20
```

##### To Sum
Reduces iterable source to the sum of its items.

```
Stream<T>.toSum(): number
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(iterable)
  .toSum();
// 15
```

##### To Value
Reduces iterable source like array_reduce() function.

```
Stream<T>.toValue<U>(
  reducer: (carry: U, datum: T) => U,
  initialValue?: U
): U
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .toValue((carry, item) => carry + item);
// 15
```

#### Stream Summary Terminal Operations
##### All Match
Returns true if all elements of stream match the predicate function.

```
Stream<T>.allMatch(predicate: (item: T) => boolean): boolean
```

For empty stream returns true.

```typescript
import { Stream } from "itertools-ts";

const finalFantasyNumbers = [4, 5, 6];
const isOnSuperNintendo   = (ff) => ff >= 4 && ff <= 6;

const trueResult = Stream.of(finalFantasyNumbers)
  .allMatch(isOnSuperNintendo);
// true
```

##### All Unique
Returns true if all elements in stream are unique.

```
Stream<T>.allUnique(): boolean
```

Empty collections return true.

Considers different instances of data containers to be different, even if they have the same content.

```typescript
import { summary } from "itertools-ts";
import { Stream } from './stream';

const uniqueNumbers = [1, 2, 3, 4, 5];
Stream.of(uniqueNumbers)
  .allUnique();
// true

const notUniqueNumbers = [1, 1, 2, 2, 3];
Stream.of(notUniqueNumbers)
  .allUnique();
// false
```

##### Any Match
Returns true if any element of stream matches the predicate function.

```
Stream<T>.anyMatch(predicate: (item: T) => boolean): boolean
```

For empty stream returns false.

```typescript
import { Stream } from "itertools-ts";

const answers          = ['fish', 'towel', 42, "don't panic"];
const isUltimateAnswer = (a) => a == 42;

const trueResult = Stream.of(answers)
  .anyMatch(answers, isUltimateAnswer);
// true
```

##### Exactly N
Returns true if exactly n items are true according to a predicate function.

- Predicate is optional.
- Default predicate is boolean value of each item.

```
Stream<T>.exactlyN(n: number, predicate?: (item: T) => boolean): boolean
```

```typescript
import { Stream } from "itertools-ts";
import stream = require("node:stream");

const twoTruthsAndALie = [true, true, false];
const n = 2;

const boolean = stream.of(twoTruthsAndALie)
  .exactlyN(n);
// true
```

##### Is Reversed
Returns true if stream is sorted in reverse descending order; otherwise false.

```
Stream<T>.isReversed(): boolean
```

Items of stream must be comparable.

Returns true if iterable source is empty or has only one element.

```typescript
import { Stream } from "itertools-ts";

const reversed = [5, 4, 3, 2, 1];

Stream.of(reversed)
  .isReversed();
// true

const input = [1, 2, 3, 2, 1];

Stream.of(input)
  .isReversed();
// false
```

##### Is Sorted
Returns true if iterable source is sorted in ascending order; otherwise false.

```
Stream<T>.isSorted(): boolean
```

Items of iterable source must be comparable.

Returns true if iterable source is empty or has only one element.

```typescript
import { Stream } from "itertools-ts";

const sorted = [1, 2, 3, 4, 5];

Stream.of(sorted)
  .isSorted();
// true

const input = [1, 2, 3, 2, 1];

Stream.of(input)
  .isSorted();
// false
```

##### None Match
Returns true if no element of stream matches the predicate function.

```
Stream<T>.noneMatch(predicate: (item: T) => boolean): boolean
```

For empty stream returns true.

```typescript
import { Stream } from "itertools-ts";

const grades         = [45, 50, 61, 0];
const isPassingGrade = (grade) => grade >= 70;

const trueResult = Stream.of(grades)
  .noneMatch(isPassingGrade);
// true
```

##### Same With
Returns true if stream and all given collections are the same.

```
Stream<T>.sameWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean
```

For empty collections list returns true.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const trueResult = Stream.of(input)
  .sameWith([1, 2, 3, 4, 5]);
// true

const falseResult = Stream.of(input)
  .sameWith([5, 4, 3, 2, 1]);
// false
```

##### Same Count With
Returns true if stream collection and all given collections have the same lengths.

```
Stream<T>.sameCountWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean
```

For empty collections list returns true.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const trueResult = Stream.of(input)
  .sameCountWith([5, 4, 3, 2, 1]);
// true

const falseResult = Stream.of(input)
  .sameCountWith([1, 2, 3]);
// false
```

#### Stream Debug Operations
#### Peek
Peek at each element between other Stream operations to do some action without modifying the stream.

```
Stream<T>.peek(callback: (datum: unknown) => void): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.of(['some', 'items'])
  .peek((x) => console.log(x)) // 'some', 'items'
  .toArray();

console.log(result);
// ['some', 'items']
```

#### Peek Stream
Peek at the entire stream between other Stream operations to do some action without modifying the stream.

```
Stream<T>.peekStream(callback: (datum: Stream<T>) => void): Stream<T>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.of(['some', 'items'])
  .peekStream((stream) => console.log(stream.toArray())) // ['some', 'items']
  .toArray();

console.log(result);
// ['some', 'items']
```

## Pipes
Pipes are a way to chain multiple operations together.

Types notation:
```typescript
type PipeOperation<TInput, TOutput> = (input: TInput) => TOutput;
type PipeOperationSequence<TFlow extends any[]> =
  TFlow extends [infer T1, infer T2, ...infer Rest]
    ? [PipeOperation<T1, T2>, ...PipeOperationSequence<[T2, ...Rest]>]
    : [];
type Pipe<TFlow extends any[]> = PipeOperation<First<TFlow>, Last<TFlow>> & {
  add: TFlow extends []
    ? <TInput, TOutput>(operation: PipeOperation<TInput, TOutput>) => Pipe<[TInput, TOutput]>
    : <T>(operation: PipeOperation<Last<TFlow>, T>) => Pipe<[...TFlow, T]>;
};
```

Pipe creation function:
```
function createPipe<T1, T2, ..., TN>(
  ...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, ..., PipeOperation<TN-1, TN>]
): Pipe<T1, T2, ..., TN>
```

Example with explicit type specification:
```typescript
import { createPipe } from "itertools-ts";

const pipe = createPipe<[
  Iterable<number>,  // INPUT => set.distinct
  Iterable<number>,  // set.distinct => single.map
  Iterable<number>,  // single.map => single.filter
  Iterable<number>,  // single.filter => reduce.toSum
  number             // reduce.toSum => OUTPUT
]>(
  set.distinct,
  (input) => single.map(input, (x) => x ** 2),
  (input) => single.filter(input, (x) => x < 10),
  reduce.toSum,
);

const result1 = pipe([1, 1, 2, 2, 3, 4, 5]); // 14

// You can reuse the pipe
const result2 = pipe([1, 1, 1, 2, 2, 2]);    // 5
```

Example with implicit type specification (works up to 16 operations if you use TypeScript):
```typescript
import { createPipe } from "itertools-ts";

const pipe = createPipe(
  set.distinct<number>,
  (input) => single.map(input, (x) => x ** 2),
  (input) => single.filter(input, (x) => x < 10),
  reduce.toSum,
);

const result1 = pipe([1, 1, 2, 2, 3, 4, 5]); // 14

// You can reuse the pipe
const result2 = pipe([1, 1, 1, 2, 2, 2]);    // 5
```

Example with creating pipe using chain calls:
```typescript
import { createPipe } from "itertools-ts";

const pipe = createPipe()
  .add(set.distinct<number>)
  .add((input) => single.map(input, (x) => x**2))
  .add((input) => single.filter(input, (x) => x < 10))
  .add(reduce.toSum);

const result1 = pipe([1, 1, 2, 2, 3, 4, 5]); // 14
const result2 = pipe([1, 1, 1, 2, 2, 2]);    // 5

// You can create a new pipe adding some operations
const extendedPipe = pipe
  .add((x) => x * 2)
  .add((x) => x + 1);

const result3 = extendedPipe([1, 1, 2, 2, 3, 4, 5]); // 29
const result4 = extendedPipe([1, 1, 1, 2, 2, 2]);    // 11
```

Asynchronous pipe example:
```typescript
import { createPipe } from "itertools-ts";

const asyncPipe = createPipe<[
  AsyncIterable<number>,  // INPUT => set.distinctAsync
  AsyncIterable<number>,  // set.distinctAsync => single.mapAsync
  AsyncIterable<number>,  // single.mapAsync => single.filterAsync
  AsyncIterable<number>,  // single.filterAsync => reduce.toSumAsync
  Promise<number>         // reduce.toSumAsync => OUTPUT
]>(
  set.distinctAsync,
  (input) => single.mapAsync(input, (x) => x**2),
  (input) => single.filterAsync(input, (x) => x < 10),
  reduce.toSumAsync,
);

const asyncInput1 = [1, 1, 2, 2, 3, 4, 5].map((x) => Promise.resolve(x));
const result1 = await asyncPipe(asyncInput1); // 14

// You can reuse the pipe
const asyncInput2 = [1, 1, 1, 2, 2, 2].map((x) => Promise.resolve(x));
const result4 = await asyncPipe(asyncInput2);    // 5

// You can create a new pipe adding some asynchronous operations
const extendedAsyncPipe = asyncPipe.add(async (x) => (await x) * 2);
const result5 = await extendedAsyncPipe(asyncInput2); // 10
```

You can also use pipe for non-iterables:
```typescript
import { createPipe } from "itertools-ts";

const pipe = createPipe(
  (x: number) => x+1,
  (x) => x**3,
  (x) => Math.sqrt(x),
  (x) => Math.round(x)
);

const result1 = pipe(2);  // 5

const asyncPipe = createPipe(
  async (x: Promise<number>) => (await x)+1,
  async (x) => (await x)**3,
  async (x) => Math.sqrt(await x),
  async (x) => Math.round(await x)
);
const result2 = await pipe(Promise.resolve(2));  // 5
```

Similar Libraries in Other Languages
------------------------------------

IterTools functionality is not limited to TypeScript and Python. Other languages have similar libraries.
Familiar functionality is available when working in other languages.

* [IterTools PHP](https://github.com/markrogoyski/itertools-php)
* [IterTools Python](https://docs.python.org/3/library/itertools.html): The original!

Unit testing
------------

```bash
npm i
npm run test
```

License
-------

IterTools TS is licensed under the MIT License.
