# IterTools for TypeScript and JavaScript

[![npm](https://img.shields.io/npm/v/itertools-ts.svg)](https://www.npmjs.com/package/itertools-ts)
[![npm](https://img.shields.io/npm/dm/itertools-ts.svg?style=flat)](https://www.npmjs.com/package/itertools-ts)
[![Coverage Status](https://coveralls.io/repos/github/Smoren/itertools-ts/badge.svg?branch=master&rand=123)](https://coveralls.io/github/Smoren/itertools-ts?branch=master)
![Build and test](https://github.com/Smoren/itertools-ts/actions/workflows/test_master.yml/badge.svg)
[![Minified Size](https://badgen.net/bundlephobia/minzip/itertools-ts)](https://bundlephobia.com/result?p=itertools-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Inspired by Python — designed for TypeScript.

Features
--------

IterTools makes you an iteration superstar by providing two types of tools:

* Loop iteration tools
* Stream iteration tools

**Loop Iteration Tools Example**

```typescript
import { multi } from 'itertools-ts';

for (const [letter, number] of multi.zip(['a', 'b'], [1, 2])) {
  console.log(`${letter}${number}`);  // a1, b2
}
```

**Stream Iteration Tools Example**

```typescript
import { Stream } from 'itertools-ts';

const result = Stream.of([1, 1, 2, 2, 3, 4, 5])
  .distinct()             // [1, 2, 3, 4, 5]
  .map((x) => x**2)       // [1, 4, 9, 16, 25]
  .filter((x) => x < 10)  // [1, 4, 9]
  .toSum();               // 14
```

All functions work on iterable collections and iterators:
* `Array`
* `Set`
* `Map`
* `String`
* `Generator`
* `Iterable`
* `Iterator`

[More about Streams](#Stream)

Setup
-----

```bash
npm i itertools-ts
```

### Similar Libraries in Other Languages

IterTools functionality is not limited to TypeScript and Python. Other languages have similar libraries.
Familiar functionality is available when working in other languages.

* [IterTools PHP](https://github.com/markrogoyski/itertools-php)
* [IterTools Python](https://docs.python.org/3/library/itertools.html): The original!

Quick Reference
---------------

### Loop Iteration Tools

#### Multi Iteration
| Iterator                     | Description                                                                                                       | Code Snippet                                 |
|------------------------------|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| [`chain`](#Chain)            | Chain multiple iterables together                                                                                 | `multi.chain(list1, list2, ...)`             |
| [`zip`](#Zip)                | Iterate multiple collections simultaneously until the shortest iterator completes                                 | `multi.zip(list1, list2, ...)`               |
| [`zipEqual`](#Zip-Equal)     | Iterate multiple collections of equal length simultaneously, error if lengths not equal                           | `multi.zipEqual(list1, list2, ...)`          |
| [`zipFilled`](#Zip-Filled)   | Iterate multiple collections simultaneously until the longest iterator completes (with filler for uneven lengths) | `multi.zipFilled(filler, list1, list2, ...)` |
| [`zipLongest`](#Zip-Longest) | Iterate multiple collections simultaneously until the longest iterator completes                                  | `multi.zipLongest(list1, list2, ...)`        |

#### Single Iteration
| Iterator                                 | Description                                 | Code Snippet                                            |
|------------------------------------------|---------------------------------------------|---------------------------------------------------------|
| [`chunkwise`](#Chunkwise)                | Iterate by chunks                           | `single.chunkwise(data, chunkSize)`                     |
| [`chunkwiseOverlap`](#Chunkwise-Overlap) | Iterate by overlapped chunks                | `single.chunkwiseOverlap(data, chunkSize, overlapSize)` |
| [`enumerate`](#Enumerate)                | Enumerates elements of collection           | `single.enumerate(data)`                                |
| [`filter`](#Filter)                      | Filter for elements where predicate is true | `single.filter(data, predicate)`                        |
| [`flatMap`](#Flat-Map)                   | Map function onto items and flatten result  | `single.flatMap(data, mapper)`                          |
| [`flatten`](#Flatten)                    | Flatten multidimensional iterable           | `single.flatten(data, [dimensions])`                    |
| [`groupBy`](#Group-By)                   | Group data by a common element              | `single.groupBy(data, groupKeyFunction, [itemKeyFunc])` |
| [`limit`](#Limit)                        | Iterate up to a limit                       | `single.limit(data, limit)`                             |
| [`keys`](#Keys)                          | Iterate keys of key-value pairs             | `single.keys(data)`                                     |
| [`map`](#Map)                            | Map function onto each item                 | `single.map(data, mapper)`                              |
| [`pairwise`](#Pairwise)                  | Iterate successive overlapping pairs        | `single.pairwise(data)`                                 |
| [`repeat`](#Repeat)                      | Repeat an item a number of times            | `single.repeat(item, repetitions)`                      |
| [`slice`](#Slice)                        | Extract a slice of the iterable             | `single.slice(data, [start], [count], [step])`          |
| [`values`](#Values)                      | Iterate values of key-value pairs           | `single.values(data)`                                   |

#### Math Iteration
| Iterator                         | Description                | Code Snippet                                 |
|----------------------------------|----------------------------|----------------------------------------------|
| [`runningTotal`](#Running-Total) | Running total accumulation | `math.runningTotal(numbers, [initialValue])` |

#### Reduce
| Reducer                                | Description                            | Code Snippet                                  |
|----------------------------------------|----------------------------------------|-----------------------------------------------|
| [`toAverage`](#To-Average)             | Mean average of elements               | `reduce.toAverage(numbers)`                   |
| [`toCount`](#To-Count)                 | Reduce to length of iterable           | `reduce.toCount(data)`                        |
| [`toFirst`](#To-First)                 | Reduce to its first value              | `reduce.toFirst(data)`                        |
| [`toFirstAndLast`](#To-First-And-Last) | Reduce to its first and last values    | `reduce.toFirstAndLast(data)`                 |
| [`toLast`](#To-Last)                   | Reduce to its last value               | `reduce.toLast(data)`                         |
| [`toMax`](#To-Max)                     | Reduce to its greatest element         | `reduce.toMax(numbers, [compareBy])`          |
| [`toMin`](#To-Min)                     | Reduce to its smallest element         | `reduce.toMin(numbers, [compareBy])`          |
| [`toMin`](#To-Min-Max)                 | Reduce to its lower and upper bounds   | `reduce.toMinMax(numbers, [compareBy])`       |
| [`toProduct`](#To-Product)             | Reduce to the product of its elements  | `reduce.toProduct(numbers)`                   |
| [`toSum`](#To-Sum)                     | Reduce to the sum of its elements      | `reduce.toSum(numbers)`                       |
| [`toValue`](#To-Value)                 | Reduce to value using callable reducer | `reduce.toValue(data, reducer, initialValue)` |

#### Set and multiset Iteration
| Iterator                                       | Description                       | Code Snippet                                      |
|------------------------------------------------|-----------------------------------|---------------------------------------------------|
| [`distinct`](#Distinct)                        | Iterate only distinct items       | `set.distinct(data)`                              |
| [`intersection`](#Intersection)                | Intersection of iterables         | `set.intersection(...iterables)`                  |
| [`partialIntersection`](#Partial-Intersection) | Partial intersection of iterables | `set.partialIntersection(minCount, ...iterables)` |
| [`symmetricDifference`](#Symmetric-Difference) | Symmetric difference of iterables | `set.symmetricDifference(...iterables)`           |
| [`union`](#Union)                              | Union of iterables                | `set.union(...iterables)`                         |

#### Summary
| Summary                      | Description                                       | Code Snippet                         |
|------------------------------|---------------------------------------------------|--------------------------------------|
| [`allMatch`](#All-Match)     | True if all items are true according to predicate | `summary.allMatch(data, predicate)`  |
| [`allUnique`](#All-Unique)   | True if all elements in collection are unique     | `summary.allUnique(data)`            |
| [`anyMatch`](#Any-Match)     | True if any item is true according to predicate   | `summary.anyMatch(data, predicate)`  |
| [`isIterable`](#Is-Iterable) | True if given data is iterable                    | `summary.isIterable(data)`           |
| [`isIterator`](#Is-Iterator) | True if given data is iterator                    | `summary.isIterator(data)`           |
| [`isReversed`](#Is-Reversed) | True if iterable reverse sorted                   | `summary.isReversed(data)`           |
| [`isSorted`](#Is-Sorted)     | True if iterable sorted                           | `summary.isSorted(data)`             |
| [`isString`](#Is-String)     | True if given data is string                      | `summary.isString(data)`             |
| [`noneMatch`](#None-Match)   | True if none of items true according to predicate | `summary.noneMatch(data, predicate)` |
| [`same`](#Same)              | True if collections are the same                  | `summary.same(...collections)`       |
| [`sameCount`](#Same-Count)   | True if collections have the same lengths         | `summary.sameCount(...collections)`  |

#### Transform
| Iterator                     | Description                       | Code Snippet                 |
|------------------------------|-----------------------------------|------------------------------|
| [`toArray`](#To-Array)       | Transforms collection to array    | `transform.toArray(data)`    |
| [`toIterable`](#To-Iterable) | Transforms collection to iterable | `transform.toIterable(data)` |
| [`toIterator`](#To-Iterator) | Transforms collection to iterator | `transform.toIterator(data)` |

### Stream Iteration Tools
#### Stream Sources
| Source                 | Description                      | Code Snippet          |
|------------------------|----------------------------------|-----------------------|
| [`of`](#Of)            | Create a stream from an iterable | `Stream.of(iterable)` |
| [`ofEmpty`](#Of-Empty) | Create an empty stream           | `Stream.ofEmpty()`    |

#### Stream Operations
| Operation                                               | Description                                                                               | Code Snippet                                                         |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| [`chainWith`](#Chain-With)                              | Chain iterable source withs given iterables together into a single iteration              | `stream.chainWith(...iterables)`                                     |
| [`chunkwise`](#Chunkwise-1)                             | Iterate by chunks                                                                         | `stream.chunkwise(chunkSize)`                                        |
| [`chunkwiseOverlap`](#Chunkwise-Overlap-1)              | Iterate by overlapped chunks                                                              | `stream.chunkwiseOverlap(chunkSize, overlap)`                        |
| [`distinct`](#Distinct-1)                               | Filter out elements: iterate only unique items                                            | `stream.distinct()`                                                  |
| [`enumerate`](#Enumerate-1)                             | Enumerates elements of stream                                                             | `stream.enumerate()`                                                 |
| [`filter`](#Filter-1)                                   | Filter for only elements where the predicate function is true                             | `stream.filter(predicate)`                                           |
| [`flatMap`](#Flat-Map-1)                                | Map function onto elements and flatten result                                             | `stream.flatMap(mapper)`                                             |
| [`flatten`](#Flatten-1)                                 | Flatten multidimensional stream                                                           | `stream.flatten([dimensions])`                                       |
| [`intersectionWith`](#Intersection-With)                | Intersect stream and given iterables                                                      | `stream.intersectionWith(...iterables)`                              |
| [`groupBy`](#Group-By-1)                                | Group stram data by a common data element                                                 | `stream.groupBy(groupKeyFunction, [itemKeyFunc])`                    |
| [`keys`](#Keys-1)                                       | Iterate keys of key-value pairs from stream                                               | `stream.keys()`                                                      |
| [`limit`](#Limit-1)                                     | Limit the stream's iteration                                                              | `stream.limit(limit)`                                                |
| [`map`](#Map-1)                                         | Map function onto elements                                                                | `stream.map(mapper)`                                                 |
| [`pairwise`](#Pairwise-1)                               | Return pairs of elements from iterable source                                             | `stream.pairwise()`                                                  |
| [`partialIntersectionWith`](#Partial-Intersection-With) | Partially intersect stream and given iterables                                            | `stream.partialIntersectionWith(minIntersectionCount, ...iterables)` |
| [`runningTotal`](#Running-Total-1)                      | Accumulate the running total over iterable source                                         | `stream.runningTotal([initialValue])`                                |
| [`slice`](#Slice-1)                                     | Extract a slice of the stream                                                             | `stream.slice([start], [count], [step])`                             |
| [`symmetricDifferenceWith`](#Symmetric-Difference-With) | Symmetric difference of stream and given iterables                                        | `stream.symmetricDifferenceWith(...iterables)`                       |
| [`unionWith`](#Union-With)                              | Union of stream and given iterables                                                       | `stream.union(...iterables)`                                         |
| [`values`](#Values-1)                                   | Iterate values of key-value pairs from stream                                             | `stream.values()`                                                    |
| [`zipWith`](#Zip-With)                                  | Iterate iterable source with another iterable collections simultaneously                  | `stream.zipWith(...iterables)`                                       |
| [`zipEqualWith`](#Zip-Equal-With)                       | Iterate iterable source with another iterable collections of equal lengths simultaneously | `stream.zipEqualWith(...iterables)`                                  |
| [`zipFilledWith`](#Zip-Filled-With)                     | Iterate iterable source with another iterable collections simultaneously (with filler)    | `stream.zipFilledWith(filler, ...iterables)`                         |
| [`zipLongestWith`](#Zip-Longest-With)                   | Iterate iterable source with another iterable collections simultaneously                  | `stream.zipLongestWith(...iterables)`                                |

#### Stream Terminal Operations
##### Transformation Terminal Operations
| Terminal Operation       | Description                      | Code Snippet       |
|--------------------------|----------------------------------|--------------------|
| [`toArray`](#To-Array-1) | Returns array of stream elements | `stream.toArray()` |

##### Reduction Terminal Operations
| Terminal Operation                       | Description                                     | Code Snippet                            |
|------------------------------------------|-------------------------------------------------|-----------------------------------------|
| [`toAverage`](#To-Average-1)             | Reduces stream to the mean average of its items | `stream.toAverage()`                    |
| [`toCount`](#To-Count-1)                 | Reduces stream to its length                    | `stream.toCount()`                      |
| [`toFirst`](#To-First-1)                 | Reduces stream to its first value               | `stream.toFirst()`                      |
| [`toFirstAndLast`](#To-First-And-Last-1) | Reduces stream to its first and last values     | `sstream.toFirstAndLast()`              |
| [`toLast`](#To-Last-1)                   | Reduces stream to its last value                | `stream.toLast()`                       |
| [`toMax`](#To-Max-1)                     | Reduces stream to its max value                 | `stream.toMax([compareBy])`             |
| [`toMin`](#To-Min-1)                     | Reduces stream to its min value                 | `stream.toMin([compareBy])`             |
| [`toMin`](#To-Min-Max-1)                 | Reduce stream to its lower and upper bounds     | `stream.toMinMax([compareBy])`          |
| [`toProduct`](#To-Product-1)             | Reduces stream to the product of its items      | `stream.toProduct()`                    |
| [`toSum`](#To-Sum-1)                     | Reduces stream to the sum of its items          | `stream.toSum()`                        |
| [`toValue`](#To-Value-1)                 | Reduces stream like array.reduce() function     | `stream.toValue(reducer, initialValue)` |

##### Summary Terminal Operations
| Terminal Operation                  | Description                                                            | Code Snippet                           |
|-------------------------------------|------------------------------------------------------------------------|----------------------------------------|
| [`allMatch`](#All-Match-1)          | Returns true if all items in stream match predicate                    | `stream.allMatch(predicate)`           |
| [`allUnique`](#All-Unique-1)        | Returns true if all elements of stream are unique                      | `stream.allUnique(predicate)`          |
| [`anyMatch`](#Any-Match-1)          | Returns true if any item in stream matches predicate                   | `stream.anyMatch(predicate)`           |
| [`isReversed`](#Is-Reversed-1)      | Returns true if stream is sorted in reverse descending order           | `stream.isReversed()`                  |
| [`isSorted`](#Is-Sorted-1)          | Returns true if stream is sorted in ascending order                    | `stream.isSorted()`                    |
| [`noneMatch`](#None-Match-1)        | Returns true if none of the items in stream match predicate            | `stream.noneMatch(predicate)`          |
| [`sameWith`](#Same-With)            | Returns true if stream and all given collections are the same          | `stream.sameWith(...collections)`      |
| [`sameCountWith`](#Same-Count-With) | Returns true if stream and all given collections have the same lengths | `stream.sameCountWith(...collections)` |

Usage
-----

## Multi Iteration
### Chain
Chain multiple iterables together into a single continuous sequence.

```
function* chain(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<unknown>
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
function* zip(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>>
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
function* zipFilled(
  filler: unknown,
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>>
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
function* zipLongest(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>>
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
function* zipEqual(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Iterable<Array<unknown>>
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
function* groupBy<T>(
  data: Iterable<T> | Iterator<T>,
  groupKeyFunction: (item: T) => string,
  itemKeyFunction?: (item: T) => string,
): Iterable<[string, Array<T>] | [string, Record<string, T>]>
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

## Math Iteration
### Running Total
Accumulate the running total over a list of numbers.

```
function* runningTotal<T>(
  numbers: Iterable<T> | Iterator<T>,
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
  data: Iterable<TInput>|Iterator<TInput>,
  reducer: (carry: TOutput|undefined, datum: TInput) => TOutput,
  initialValue?: TOutput,
): TOutput|undefined
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
function* distinct<T>(data: Iterable<T> | Iterator<T>): Iterable<T>
```

Always treats different instances of objects and arrays as unequal.

```typescript
import { set } from 'itertools-ts';

const chessSet = ['rook', 'rook', 'knight', 'knight', 'bishop', 'bishop', 'king', 'queen', 'pawn', 'pawn'];

for (const chessPiece of set.distinct(chessSet)) {
  console.log(chessPiece);
}
// rook, knight, bishop, king, queen, pawn
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
### To Iterable
Returns `Iterable` instance of given collection or iterator.

Throws `InvalidArgumentError` if given data is not a collection or an iterator.

```
function toIterable<T>(collection: Iterable<T>|Iterator<T>): Iterable<T>
```

```typescript
import { transform } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = transform.toIterable(input);
// [1, 2, 3, 4, 5]
```

### To Array
Returns `Array` instance of given collection or iterator.

```
function toArray<T>(collection: Iterable<T>|Iterator<T>): Array<T>
```

```typescript
import { transform } from "itertools-ts";

const iterator = transform.toIterator([1, 2, 3, 4, 5]);

const result = transform.toArray(iterator);
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

## Stream
Streams provide a fluent interface to transform arrays and iterables through a pipeline of operations.

Streams are made up of:

1. One stream source factory method to create the stream.
2. Zero or more stream operators that transform the stream to a new stream.
3. Terminal operation of either:
   * Stream terminal operation to transform the stream to a value or data structure.
     ```typescript
     const result = Stream.of([1, 1, 2, 2, 3, 4, 5])
       .distinct()             // [1, 2, 3, 4, 5]
       .map((x) => x**2)       // [1, 4, 9, 16, 25]
       .filter((x) => x < 10)  // [1, 4, 9]
       .toSum();               // 14
     ```
   * The stream is iterated via a `for` loop.
     ```typescript
     const result = Stream.of([1, 1, 2, 2, 3, 4, 5])
       .distinct()             // [1, 2, 3, 4, 5]
       .map((x) => x**2)       // [1, 4, 9, 16, 25]
       .filter((x) => x < 10); // [1, 4, 9]

     for (const item of result) {
       // 1, 4, 9
     }
     ```

### Stream Sources
#### Of
Creates stream from an iterable.

```
Stream.of(data: Iterable<unknown>|Iterator<unknown>): Stream
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

#### Of Empty
Creates stream of nothing.

```
Stream.ofEmpty(): Stream
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.ofEmpty()
  .chainWith([1, 2, 3])
  .toArray();
// 1, 2, 3
```

### Stream Operations
#### Chain With
Return a stream chaining additional sources together into a single consecutive stream.

```
stream.chainWith(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Stream
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3];

const result = Stream.of(input)
  .chainWith([4, 5, 6])
  .chainWith([7, 8, 9])
  .toArray();
// 1, 2, 3, 4, 5, 6, 7, 8, 9
```

#### Chunkwise
Return a stream consisting of chunks of elements from the stream.

```
stream.chunkwise(chunkSize: number): Stream
```

Chunk size must be at least 1.

```typescript
import { Stream } from "itertools-ts";

const friends = ['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey'];

const result = Stream.of(friends)
  .chunkwise(2)
  .toArray();
// ['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey']
```

#### Chunkwise Overlap
Return a stream consisting of overlapping chunks of elements from the stream.

```
stream.chunkwiseOverlap(
  chunkSize: number,
  overlapSize: number,
  includeIncompleteTail: boolean = true,
): Stream
```

* Chunk size must be at least 1.
* Overlap size must be less than chunk size.

```typescript
import { Stream } from "itertools-ts";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = Stream.of(numbers)
  .chunkwiseOverlap(3, 1)
  .toArray()
// [1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9]
```

#### Distinct
Return a stream filtering out elements from the stream only returning distinct elements.

```
stream.distinct(): Stream
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 1, 2, 3, 3, '1', '1', '2', '3'];
const stream = Stream.of(input)
  .distinct()
  .toArray();
// 1, 2, 3, '1', '2', '3'
```

#### Enumerate
Enumerates elements of the stream.

```
stream.enumerate(): Stream
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
stream.filter(predicate: (item: unknown) => boolean): Stream
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, -1, 2, -2, 3, -3];

const result = Stream.of(input)
  .filter((value) => value > 0)
  .toArray();
// 1, 2, 3
```

#### Flat Map
Map a function onto the elements of the stream and flatten the results.

```
stream.flatMap(mapper: (datum: unknown) => unknown): Stream
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
stream.flatten(dimensions: number = Infinity): Stream
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
stream.intersectionWith(...iterables: Array<Iterable<unknown> | Iterator<unknown>>): Stream
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
// rook, knight, bishop, king, pawn
```

#### Group By
Group stream data by a common data element.

Iterate pairs of group name and collection of grouped items.

```
stream.groupBy(
  groupKeyFunction: (item: unknown) => string,
  itemKeyFunction?: (item: unknown) => string,
): Stream
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
stream.keys(): Stream
```

```typescript
import { Stream } from 'itertools-ts';

const dict = new Map([['a', 1], ['b', 2], ['c', 3]]);

const result = Stream.of(dict)
  .keys()
  .toArray();
// 'a', 'b', 'c'
```

#### Limit
Return a stream up to a limit.

Stops even if more data available if limit reached.

```
stream.limit(count: number): Stream
```

```typescript
import { Stream } from "itertools-ts";

const matrixMovies = ['The Matrix', 'The Matrix Reloaded', 'The Matrix Revolutions', 'The Matrix Resurrections'];
const limit = 1;

const goodMovies = Stream.of(matrixMovies)
  .limit(limit)
  .toArray();
// 'The Matrix' (and nothing else)
```

#### Map
Return a stream containing the result of mapping a function onto each element of the stream.

```
stream.map(mapper: (datum: unknown) => unknown): Stream
```

```typescript
import { Stream } from "itertools-ts";

const grades = [100, 95, 98, 89, 100];

const result = Stream.of(grades)
  .map((grade) => grade === 100 ? 'A' : 'F')
  .toArray();
// A, F, F, F, A
```

#### Pairwise
Return a stream consisting of pairs of elements from the stream.

```
stream.pairwise(): Stream
```

Returns empty stream if given collection contains less than 2 elements.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const stream = Stream.of(input)
  .pairwise()
  .toArray();
// [1, 2], [2, 3], [3, 4], [4, 5]
```

#### Partial Intersection With
Return a stream [partially intersecting](https://github.com/Smoren/partial-intersection-php) the stream with the input iterables.

```
stream.partialIntersectionWith(
  minIntersectionCount: number,
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Stream
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
// c++, java, c#, go, php
```

#### Running Total
Return a stream accumulating the running total over the stream.

```
stream.runningTotal(initialValue?: number): Stream
```

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .runningTotal()
  .toArray();
// 1, 3, 6, 10, 15
```

#### Slice
Extract a slice of the stream.

```
stream.slice(start: number = 0, count?: number, step: number = 1): Stream
```

```typescript
import { Stream } from "itertools-ts";

const olympics = [1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022];

const summerOlympics = Stream.of(olympics)
  .slice(0, 8, 2)
  .toArray();
// [1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020]
```

#### Symmetric difference With
Return a stream of the symmetric difference of the stream and the given iterables.

```
stream.symmetricDifferenceWith(...iterables: Array<Iterable<unknown> | Iterator<unknown>>): Stream
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
// 4, 5, 6, 7, 8, 9
```

#### Union With
Return a stream of union of the stream with the input iterables.

```
stream.unionWith(...iterables: Array<Iterable<unknown> | Iterator<unknown>>): Stream
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
// 1, 2, 3, 4, 5
```

#### Values
Iterate keys of key-value pairs.

```
stream.values(): Stream
```

```typescript
import { Stream } from 'itertools-ts';

const dict = new Map([['a', 1], ['b', 2], ['c', 3]]);

const result = Stream.of(dict)
  .values()
  .toArray();
// 1, 2, 3
```

#### Zip With
Return a stream consisting of multiple iterable collections streamed simultaneously.

```
stream.zipWith(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Stream
```

For uneven lengths, iterations stops when the shortest iterable is exhausted.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3];

const stream = Stream.of(input)
  .zipWith([4, 5, 6])
  .toArray();
// [1, 4], [2, 5], [3, 6]
```

#### Zip Equal With
Return a stream consisting of multiple iterable collections of equal lengths streamed simultaneously.

```
stream.zipEqualWith(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Stream
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
zipFilledWith(
  filler: unknown,
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Stream
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
stream.zipLongestWith(
  ...iterables: Array<Iterable<unknown>|Iterator<unknown>>
): Stream
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
##### To Array
Returns an array of stream elements.

```
stream.toArray(): Array<unknown>
```

```typescript
import { Stream } from "itertools-ts";

const result = Stream.of([1, 2, 3, 4, 5])
  .map((x) => x**2)
  .toArray();
// [1, 4, 9, 16, 25]
```

#### Reduce Terminal Operations
##### To Average
Reduces iterable source to the mean average of its items.

```
stream.toAverage(): number|undefined
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
stream.toCount(): number
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
stream.toFirst(): unknown
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
stream.toFirstAndLast(): [unknown, unknown]
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
stream.toLast(): unknown
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
stream.toMax<TComparable>(compareBy?: (datum: unknown) => TComparable): unknown|undefined
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
stream.toMin<TComparable>(compareBy?: (datum: unknown) => TComparable): unknown|undefined
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
toMinMax(compareBy?: (item: unknown) => Comparable): [unknown?, unknown?]
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
stream.toProduct(): number|undefined
```

Returns `undefined` if stream is empty.

```typescript
import { Stream } from "itertools-ts";

const input = [1, 2, 3, 4, 5];

const result = Stream.of(input)
  .toProduct();
// 120
```

##### To Sum
Reduces iterable source to the sum of its items.

```
stream.toSum(): number
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
stream.toValue<T>(
  reducer: (carry: T|undefined, datum: unknown) => T,
  initialValue?: T,
): T|undefined
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
allMatch(predicate: (item: unknown) => boolean): boolean
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
stream.allUnique(): boolean
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
anyMatch(predicate: (item: unknown) => boolean): boolean
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

##### Is Reversed
Returns true if stream is sorted in reverse descending order; otherwise false.

```
stream.isReversed(): boolean
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
stream.isSorted(): boolean
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
noneMatch(predicate: (item: unknown) => boolean): boolean
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
sameWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean
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
stream.sameCountWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean
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

Unit testing
------------

```bash
npm i
npm run test
```

License
-------

IterTools TS is licensed under the MIT License.
