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

#### Single Iteration
| Iterator               | Description                                | Code Snippet                |
|------------------------|--------------------------------------------|-----------------------------|
| [`flatMap`](#Flat-Map) | Map function onto items and flatten result | `flatMap(data, mapper)`     |
| [`map`](#Map)          | Map function onto each item                | `map(data, mapper)`         |
| [`repeat`](#Repeat)    | Repeat an item a number of times           | `repeat(item, repetitions)` |

## Usage

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
const mapper = ($item) => [$item, -$item];

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

## Unit testing

```bash
npm i
npm run test
```

## License

IterTools TS is licensed under the MIT License.
