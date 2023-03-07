# IterTools implementation for TypeScript

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Smoren/itertools-ts/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Smoren/itertools-ts/?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Smoren/itertools-ts/badge.svg?branch=master)](https://coveralls.io/github/Smoren/itertools-ts?branch=master)
![Build and test](https://github.com/Smoren/itertools-ts/actions/workflows/test_master.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Inspired by Python — designed for TypeScript.

**Warning**: This library is an active work in progress, and is not yet ready for production use.

## Setup

```bash
npm i itertools-ts
```

## Quick Reference

### Loop Iteration Tools

#### Multi Iteration
| Iterator                     | Description                                                                             | Code Snippet               |
|------------------------------|-----------------------------------------------------------------------------------------|----------------------------|
| [`chain`](#Chain)            | Chain multiple iterables together                                                       | `chain(list1, list2)`      |
| [`zip`](#Zip)                | Iterate multiple collections simultaneously until the shortest iterator completes       | `zip(list1, list2)`        |
| [`zipEqual`](#Zip-Equal)     | Iterate multiple collections of equal length simultaneously, error if lengths not equal | `zipEqual(list1, list2)`   |
| [`zipLongest`](#Zip-Longest) | Iterate multiple collections simultaneously until the longest iterator completes        | `zipLongest(list1, list2)` |

#### Single Iteration
| Iterator                                 | Description                                 | Code Snippet                                     |
|------------------------------------------|---------------------------------------------|--------------------------------------------------|
| [`chunkwiseOverlap`](#Chunkwise-Overlap) | Iterate by overlapped chunks                | `chunkwiseOverlap(data, chunkSize, overlapSize)` |
| [`filter`](#Filter)                      | Filter for elements where predicate is true | `filter(data, predicate)`                        |
| [`flatMap`](#Flat-Map)                   | Map function onto items and flatten result  | `flatMap(data, mapper)`                          |
| [`map`](#Map)                            | Map function onto each item                 | `map(data, mapper)`                              |
| [`pairwise`](#Pairwise)                  | Iterate successive overlapping pairs        | `pairwise(data)`                                 |
| [`repeat`](#Repeat)                      | Repeat an item a number of times            | `repeat(item, repetitions)`                      |

#### Reduce
| Reducer                | Description                            | Code Snippet                           |
|------------------------|----------------------------------------|----------------------------------------|
| [`toValue`](#To-Value) | Reduce to value using callable reducer | `toValue(data, reducer, initialValue)` |

#### Set and multiset Iteration
| Iterator                | Description                 | Code Snippet     |
|-------------------------|-----------------------------|------------------|
| [`distinct`](#Distinct) | Iterate only distinct items | `distinct(data)` |

### Stream Iteration Tools
#### Stream Sources
| Source                 | Description                      | Code Snippet          |
|------------------------|----------------------------------|-----------------------|
| [`of`](#Of)            | Create a stream from an iterable | `Stream.of(iterable)` |
| [`ofEmpty`](#Of-Empty) | Create an empty stream           | `Stream.ofEmpty()`    |

#### Stream Operations
| Operation                                  | Description                                                                               | Code Snippet                                  |
|--------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`chainWith`](#Chain-With)                 | Chain iterable source withs given iterables together into a single iteration              | `stream.chainWith(...iterables)`              |
| [`chunkwiseOverlap`](#Chunkwise-Overlap-1) | Iterate by overlapped chunks                                                              | `stream.chunkwiseOverlap(chunkSize, overlap)` |
| [`distinct`](#Distinct-1)                  | Filter out elements: iterate only unique items                                            | `stream.distinct()`                           |
| [`filter`](#Filter-1)                      | Filter for only elements where the predicate function is true                             | `stream.filter(predicate)`                    |
| [`flatMap`](#Flat-Map-1)                   | Map function onto elements and flatten result                                             | `stream.flatMap(mapper)`                      |
| [`map`](#Map-1)                            | Map function onto elements                                                                | `stream.map(mapper)`                          |
| [`pairwise`](#Pairwise-1)                  | Return pairs of elements from iterable source                                             | `stream.pairwise()`                           |
| [`zipWith`](#Zip-With)                     | Iterate iterable source with another iterable collections simultaneously                  | `stream.zipWith(...iterables)`                |
| [`zipLongestWith`](#Zip-Longest-With)      | Iterate iterable source with another iterable collections simultaneously                  | `stream.zipLongestWith(...iterables)`         |
| [`zipEqualWith`](#Zip-Equal-With)          | Iterate iterable source with another iterable collections of equal lengths simultaneously | `stream.zipEqualWith(...iterables)`           |

#### Stream Terminal Operations
##### Transformation Terminal Operations
| Terminal Operation     | Description                      | Code Snippet       |
|------------------------|----------------------------------|--------------------|
| [`toArray`](#To-Array) | Returns array of stream elements | `stream.toArray()` |

##### Reduction Terminal Operations
| Terminal Operation       | Description                                 | Code Snippet                            |
|--------------------------|---------------------------------------------|-----------------------------------------|
| [`toValue`](#To-Value-1) | Reduces stream like array.reduce() function | `stream.toValue(reducer, initialValue)` |

## Usage

## Multi Iteration
### Chain
Chain multiple iterables together into a single continuous sequence.

```
function *chain(
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
function *zip(
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

### Zip Longest
Iterate multiple iterable collections simultaneously.

```
function *zipLongest(
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
function *zipEqual(
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
### Chunkwise Overlap
Return overlapped chunks of elements.

```
function *chunkwiseOverlap<T>(
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

### Filter
Filter out elements from the iterable only returning elements where the predicate function is true.

```
function *filter<T>(
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
function *flatMap<TInput, TOutput>(
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

### Map
Map a function onto each element.

```
function *map<TInput, TOutput>(
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
function *pairwise<T>(data: Iterable<T>|Iterator<T>): Iterable<Pair<T>>
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
function *repeat<T>(item: T, repetitions: number): Iterable<T>
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

## Reduce
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
function *distinct<T>(data: Iterable<T>|Iterator<T>): Iterable<T>
```

```typescript
import { set } from 'itertools-ts';

const chessSet = ['rook', 'rook', 'knight', 'knight', 'bishop', 'bishop', 'king', 'queen', 'pawn', 'pawn'];

for (const chessPiece of set.distinct(chessSet)) {
  console.log(chessPiece);
}
// rook, knight, bishop, king, queen, pawn
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

#### Chunkwise Overlap
Return a stream consisting of overlapping chunks of elements from the stream.

```
chunkwiseOverlap(
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

#### Filter
Filter out elements from the stream only keeping elements where there predicate function is true.

```
filter(predicate: (item: unknown) => boolean): Stream
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

#### Zip Equal With
Return a stream consisting of multiple iterable collections of equal lengths streamed simultaneously.

```
zipEqualWith(
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
##### To Value
Reduces iterable source like array_reduce() function.

But unlike `array.reduce()`, it works with all `Iterable` types.

```
toValue<T>(
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

## Unit testing

```bash
npm i
npm run test
```

## License

IterTools TS is licensed under the MIT License.
