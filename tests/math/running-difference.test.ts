import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { math, Numeric, NumericString } from "../../src";

describe.each([
  ...dataProviderForArraysWithInitialValue(),
])(
  "Math Running Difference Test With Initial Value",
  (input, initialValue, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningDifference(input, initialValue)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForArraysWithInitialValue(),
  ...dataProviderForAsyncWithInitialValue(),
])(
  "Math Running Difference Async Test With Initial Value",
  (input, initialValue, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningDifferenceAsync(input, initialValue)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])(
  "Math Running Difference Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningDifference(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])(
  "Math Running Difference Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningDifferenceAsync(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArraysWithInitialValue(): Array<[Array<Numeric>, number|undefined, Array<number>]> {
  return [
    [
      [],
      5,
      [5],
    ],
    [
      [0],
      5,
      [5, 5],
    ],
    [
      [1],
      5,
      [5, 4],
    ],
    [
      [1, 1, 1],
      5,
      [5, 4, 3, 2],
    ],
    [
      [1, 2, 3],
      5,
      [5, 4, 2, -1],
    ],
    [
      [1, 2, 3, 4, 5],
      5,
      [5, 4, 2, -1, -5, -10],
    ],
    [
      [1, 2, 3, -4, 5],
      5,
      [5, 4, 2, -1, 3, -2],
    ],
    [
      [1, 2, 3, -4, -5],
      5,
      [5, 4, 2, -1, 3, 8],
    ],
  ];
}

function dataProviderForAsyncWithInitialValue(): Array<[AsyncIterable<Numeric>, number|undefined, Array<number>]> {
  return [
    [
      createAsyncIterableFixture([]),
      5,
      [5],
    ],
    [
      createAsyncIterableFixture([0]),
      5,
      [5, 5],
    ],
    [
      createAsyncIterableFixture([1]),
      5,
      [5, 4],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      5,
      [5, 4, 3, 2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      5,
      [5, 4, 2, -1],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      5,
      [5, 4, 2, -1, -5, -10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      5,
      [5, 4, 2, -1, 3, -2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      5,
      [5, 4, 2, -1, 3, 8],
    ],
  ];
}

function dataProviderForArrays(): Array<[Array<Numeric>, Array<number>]> {
  return [
    [
      [],
      [],
    ],
    [
      [0],
      [0],
    ],
    [
      [1],
      [-1],
    ],
    [
      [1, 1, 1],
      [-1, -2, -3],
    ],
    [
      [1, 2, 3],
      [-1, -3, -6],
    ],
    [
      [1, 2, 3, 4, 5],
      [-1, -3, -6, -10, -15],
    ],
    [
      [1, 2, 3, -4, 5],
      [-1, -3, -6, -2, -7],
    ],
    [
      [1, 2, 3, -4, -5],
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<Numeric>, Array<number>]> {
  return [
    [
      createGeneratorFixture([]),
      [],
    ],
    [
      createGeneratorFixture([0]),
      [0],
    ],
    [
      createGeneratorFixture([1]),
      [-1],
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      [-1, -2, -3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<Numeric>, Array<number>]> {
  return [
    [
      createIterableFixture([]),
      [],
    ],
    [
      createIterableFixture([0]),
      [0],
    ],
    [
      createIterableFixture([1]),
      [-1],
    ],
    [
      createIterableFixture([1, 1, 1]),
      [-1, -2, -3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      createIterableFixture([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      createIterableFixture([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<Numeric>, Array<number>]> {
  return [
    [
      createIteratorFixture([]),
      [],
    ],
    [
      createIteratorFixture([0]),
      [0],
    ],
    [
      createIteratorFixture([1]),
      [-1],
    ],
    [
      createIteratorFixture([1, 1, 1]),
      [-1, -2, -3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<[Iterable<NumericString>, Array<number>]> {
  return [
    [
      '' as Iterable<NumericString>,
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      [-1],
    ],
    [
      '123' as Iterable<NumericString>,
      [-1, -3, -6],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<Numeric>, Array<number>]> {
  return [
    [
      new Set([]),
      [],
    ],
    [
      new Set([0]),
      [0],
    ],
    [
      new Set([1]),
      [-1],
    ],
    [
      new Set([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      new Set([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<Numeric>, Array<number>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncGeneratorFixture([0]),
      [0],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [-1],
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      [-1, -2, -3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<Numeric>, Array<number>]> {
  return [
    [
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncIterableFixture([0]),
      [0],
    ],
    [
      createAsyncIterableFixture([1]),
      [-1],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      [-1, -2, -3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<Numeric>, Array<number>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncIteratorFixture([0]),
      [0],
    ],
    [
      createAsyncIteratorFixture([1]),
      [-1],
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      [-1, -2, -3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      [-1, -3, -6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      [-1, -3, -6, -10, -15],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, 5]),
      [-1, -3, -6, -2, -7],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, -5]),
      [-1, -3, -6, -2, 3],
    ],
  ];
}

