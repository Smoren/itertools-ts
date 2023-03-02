# IterTools implementation for TypeScript

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Smoren/itertools-ts/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Smoren/itertools-ts/?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Smoren/itertools-ts/badge.svg?branch=master)](https://coveralls.io/github/Smoren/itertools-ts?branch=master)
![Build and test](https://github.com/Smoren/itertools-ts/actions/workflows/test_master.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Inspired by Python — designed for TypeScript.

## Setup

```bash
npm i itertools-ts
```

## Quick Reference

### Loop Iteration Tools

#### Single Iteration
| Iterator      | Description                 | Code Snippet          |
|---------------|-----------------------------|-----------------------|
| [`map`](#Map) | Map function onto each item | `map(data, function)` |

## Usage

### Map
Map a function onto each element.

```Single::map(iterable $data, callable $function)```

```typescript
import { map } from './single';

const grades = [100, 99, 95, 98, 100];
const strictParentsOpinion = (g) => (g === 100) ? 'A' : 'F';

for(const actualGrade of map(grades, strictParentsOpinion)) {
  console.log(actualGrade);
}
// A, F, F, F, A
```

## Unit testing

```bash
npm i
npm run test
```

## License

IterTools TS is licensed under the MIT License.
