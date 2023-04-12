import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { math, Stream } from "../../src";

describe.each([
  ...dataProviderForArraysWithInitialValue(),
] as Array<[Iterable<unknown>|Iterator<unknown>, number|undefined, Array<unknown>]>)(
  "Math Running Max Test With Initial Value",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    initialValue: number|undefined,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningMax(input, initialValue)) {
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
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    number|undefined,
  Array<unknown>
]>)(
  "Math Running Max Async Test With Initial Value",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: number|undefined,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningMaxAsync(input, initialValue)) {
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
] as Array<[Iterable<unknown>|Iterator<unknown>, Array<unknown>]>)(
  "Math Running Max Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningMax(input)) {
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
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  Array<unknown>
]>)(
  "Math Running Max Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of math.runningMaxAsync(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArraysWithInitialValue(): Array<unknown> {
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
      [5, 5],
    ],
    [
      [1, 1, 1],
      5,
      [5, 5, 5, 5],
    ],
    [
      [1, 2, 3],
      5,
      [5, 5, 5, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      5,
      [5, 5, 5, 5, 5, 5, 6],
    ],
    [
      [1, 2, 3, -4, 5, 6],
      5,
      [5, 5, 5, 5, 5, 5, 6],
    ],
    [
      [1, 2, 3, -4, -5, 6],
      5,
      [5, 5, 5, 5, 5, 5, 6],
    ],
    [
      [5, 4, 3, 2, 1],
      5,
      [5, 5, 5, 5, 5, 5],
    ],
    [
      [1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1],
      5,
      [5, 5, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10]
    ],
  ];
}

function dataProviderForAsyncWithInitialValue(): Array<unknown> {
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
      [5, 5],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      5,
      [5, 5, 5, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      5,
      [5, 5, 5, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      5,
      [5, 5, 5, 5, 5, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5, 6]),
      5,
      [5, 5, 5, 5, 5, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5, 6]),
      5,
      [5, 5, 5, 5, 5, 5, 6],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      5,
      [5, 5, 5, 5, 5, 5],
    ],
    [
      createAsyncIterableFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      5,
      [5, 5, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10]
    ],
  ];
}

function dataProviderForArrays(): Array<unknown> {
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
      [-1],
      [-1],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, -4, 5],
      [1, 2, 3, 3, 5],
    ],
    [
      [1, 2, 3, -4, -5],
      [1, 2, 3, 3, 3],
    ],
    [
      [5, 4, 3, 2, 1],
      [5, 5, 5, 5, 5],
    ],
    [
      [10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1],
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      [1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1],
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
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
      createGeneratorFixture([-1]),
      [-1],
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
    [
      createGeneratorFixture([10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      createGeneratorFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
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
      createIterableFixture([-1]),
      [-1],
    ],
    [
      createIterableFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      createIterableFixture([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
    [
      createIterableFixture([10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      createIterableFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
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
      createIteratorFixture([-1]),
      [-1],
    ],
    [
      createIteratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
    [
      createIteratorFixture([10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      createIteratorFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      [],
    ],
    [
      '1',
      [1],
    ],
    [
      '123',
      [1, 2, 3],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
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
      new Set([-1]),
      [-1],
    ],
    [
      new Set([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
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
      createAsyncGeneratorFixture([-1]),
      [-1],
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
    [
      createAsyncGeneratorFixture([10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      createAsyncGeneratorFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
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
      createAsyncIterableFixture([-1]),
      [-1],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
    [
      createAsyncIterableFixture([10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      createAsyncIterableFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
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
      createAsyncIteratorFixture([-1]),
      [-1],
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      [1, 1, 1],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, 5]),
      [1, 2, 3, 3, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, -5]),
      [1, 2, 3, 3, 3],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      [5, 5, 5, 5, 5],
    ],
    [
      createAsyncIteratorFixture([10, 1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    ],
    [
      createAsyncIteratorFixture([1, 9, 2, 8, 3, 7, 4, 5, 5, 10, 1, 0, -1]),
      [1, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10],
    ],
  ];
}


