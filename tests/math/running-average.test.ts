import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import {math, Numeric, NumericString, Stream} from "../../src";

describe.each([
  ...dataProviderForArraysWithInitialValue(),
])(
  "Math Running Average Test With Initial Value",
  (input, initialValue, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningAverage(input, initialValue)) {
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
  "Math Running Average Async Test With Initial Value",
  (input, initialValue, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningAverageAsync(input, initialValue)) {
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
  "Math Running Average Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningAverage(input)) {
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
  "Math Running Average Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningAverageAsync(input)) {
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
      [5, 5/2],
    ],
    [
      [1],
      5,
      [5, 3],
    ],
    [
      [2],
      5,
      [5, 7/2],
    ],
    [
      [1, 1, 1],
      5,
      [5, 3, 7/3, 2],
    ],
    [
      [1, 2, 3],
      5,
      [5, 3, 8/3, 11/4],
    ],
    [
      [2, 2, 2],
      5,
      [5, 7/2, 3, 11/4],
    ],
    [
      [1, 3, 5],
      5,
      [5, 3, 3, 14/4],
    ],
    [
      [1, 2, 3, 4, 5],
      5,
      [5, 3, 8/3, 11/4, 3, 20/6],
    ],
    [
      [1, 2, 3, -4, 5],
      5,
      [5, 3, 8/3, 11/4, 7/5, 2],
    ],
    [
      [1, 2, 3, -4, -5],
      5,
      [5, 3, 8/3, 11/4, 7/5, 2/6],
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
      [5, 5/2],
    ],
    [
      createAsyncIterableFixture([1]),
      5,
      [5, 3],
    ],
    [
      createAsyncIterableFixture([2]),
      5,
      [5, 7/2],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      5,
      [5, 3, 7/3, 2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      5,
      [5, 3, 8/3, 11/4],
    ],
    [
      createAsyncIterableFixture([2, 2, 2]),
      5,
      [5, 7/2, 3, 11/4],
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      5,
      [5, 3, 3, 14/4],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      5,
      [5, 3, 8/3, 11/4, 3, 20/6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      5,
      [5, 3, 8/3, 11/4, 7/5, 2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      5,
      [5, 3, 8/3, 11/4, 7/5, 2/6],
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
      [1, 2, 3],
      [1, 1.5, 2],
    ],
    [
      [2, 2, 2],
      [2, 2, 2],
    ],
    [
      [1, 3, 5],
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      [1, 2, 3, -4, 5],
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      [1, 2, 3, -4, -5],
      [1, 1.5, 2, 0.5, -3/5],
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
      createGeneratorFixture([2]),
      [2],
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [1, 1.5, 2],
    ],
    [
      createGeneratorFixture([2, 2, 2]),
      [2, 2, 2],
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
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
      createIterableFixture([1, 2, 3]),
      [1, 1.5, 2],
    ],
    [
      createIterableFixture([2, 2, 2]),
      [2, 2, 2],
    ],
    [
      createIterableFixture([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      createIterableFixture([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      createIterableFixture([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
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
      createIteratorFixture([1, 2, 3]),
      [1, 1.5, 2],
    ],
    [
      createIteratorFixture([2, 2, 2]),
      [2, 2, 2],
    ],
    [
      createIteratorFixture([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
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
      [1, 1.5, 2],
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
      [1, 1.5, 2],
    ],
    [
      new Set([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      new Set([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
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
      createAsyncGeneratorFixture([1, 2, 3]),
      [1, 1.5, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 2, 2]),
      [2, 2, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
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
      createAsyncIterableFixture([1, 2, 3]),
      [1, 1.5, 2],
    ],
    [
      createAsyncIterableFixture([2, 2, 2]),
      [2, 2, 2],
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
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
      createAsyncIteratorFixture([1, 2, 3]),
      [1, 1.5, 2],
    ],
    [
      createAsyncIteratorFixture([2, 2, 2]),
      [2, 2, 2],
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      [1, 1.5, 2, 10/4, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, 5]),
      [1, 1.5, 2, 0.5, 7/5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, -5]),
      [1, 1.5, 2, 0.5, -3/5],
    ],
  ];
}
