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
  "Math Running Product Test With Initial Value",
  (input, initialValue, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningProduct(input, initialValue)) {
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
  "Math Running Product Async Test With Initial Value",
  (input, initialValue, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningProductAsync(input, initialValue)) {
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
  "Math Running Product Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningProduct(input)) {
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
  "Math Running Product Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningProductAsync(input)) {
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
      [5, 0],
    ],
    [
      [1],
      5,
      [5, 5],
    ],
    [
      [1, 1, 1],
      5,
      [5, 5, 5, 5],
    ],
    [
      [2, 2, 2],
      5,
      [5, 10, 20, 40],
    ],
    [
      [1, 2, 3],
      5,
      [5, 5, 10, 30],
    ],
    [
      [1, 2, 3, 4, 5],
      5,
      [5, 5, 10, 30, 120, 600],
    ],
    [
      [1, 2, 3, -4, 5],
      5,
      [5, 5, 10, 30, -120, -600],
    ],
    [
      [1, 2, 3, -4, -5],
      5,
      [5, 5, 10, 30, -120, 600],
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
      [5, 0],
    ],
    [
      createAsyncIterableFixture([1]),
      5,
      [5, 5],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      5,
      [5, 5, 5, 5],
    ],
    [
      createAsyncIterableFixture([2, 2, 2]),
      5,
      [5, 10, 20, 40],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      5,
      [5, 5, 10, 30],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      5,
      [5, 5, 10, 30, 120, 600],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      5,
      [5, 5, 10, 30, -120, -600],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      5,
      [5, 5, 10, 30, -120, 600],
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
      [1],
    ],
    [
      [2],
      [2],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
    ],
    [
      [2, 2, 2],
      [2, 4, 8],
    ],
    [
      [1, 2, 3],
      [1, 2, 6],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 2, 6, 24, 120],
    ],
    [
      [1, 2, 3, -4, 5],
      [1, 2, 6, -24, -120],
    ],
    [
      [1, 2, 3, -4, -5],
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture([2, 2, 2]),
      [2, 4, 8],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      createIterableFixture([2]),
      [2],
    ],
    [
      createIterableFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createIterableFixture([2, 2, 2]),
      [2, 4, 8],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      createIterableFixture([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      createIterableFixture([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      createIteratorFixture([2]),
      [2],
    ],
    [
      createIteratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createIteratorFixture([2, 2, 2]),
      [2, 4, 8],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      '123' as Iterable<NumericString>,
      [1, 2, 6],
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
      [1],
    ],
    [
      new Set([2]),
      [2],
    ],
    [
      new Set([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      new Set([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      createAsyncGeneratorFixture([2]),
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createAsyncGeneratorFixture([2, 2, 2]),
      [2, 4, 8],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      createAsyncIterableFixture([2]),
      [2],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createAsyncIterableFixture([2, 2, 2]),
      [2, 4, 8],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
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
      [1],
    ],
    [
      createAsyncIteratorFixture([2]),
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createAsyncIteratorFixture([2, 2, 2]),
      [2, 4, 8],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      [1, 2, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 6, 24, 120],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 6, -24, -120],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 6, -24, 120],
    ],
  ];
}
