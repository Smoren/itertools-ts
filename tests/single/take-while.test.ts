import {
  asyncTimeout,
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (datum: unknown) => boolean, Array<unknown>]>)(
  "Single Take While Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    predicate: (datum: unknown) => boolean,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.takeWhile(input, predicate)) {
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
  ...dataProviderForMaps(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (datum: unknown) => boolean | Promise<boolean>,
  Array<unknown>
]>)(
  "Single Take While Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    predicate: (datum: unknown) => boolean | Promise<boolean>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.takeWhileAsync(input, predicate)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 0,
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 1,
      [0],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x > 0,
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x > 1,
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [5, 4, 3, 2, 1, 0],
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      [1, 4, 6, 4, 1],
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      [50, 60, 70, 85, 65, 90],
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      [50, 60, 70, 85, 65, 90],
      (x: number) => x <= 65,
      [50, 60],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createGeneratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      createGeneratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      createGeneratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createIterableFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      createIterableFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      createIterableFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createIteratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      createIteratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      createIteratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '012345',
      (x: number) => x < 0,
      [],
    ],
    [
      '012345',
      (x: number) => x < 1,
      ['0'],
    ],
    [
      '012345',
      (x: number) => x < 2,
      ['0', '1'],
    ],
    [
      '012345',
      (x: number) => x < 3,
      ['0', '1', '2'],
    ],
    [
      '012345',
      (x: number) => x < 4,
      ['0', '1', '2', '3'],
    ],
    [
      '012345',
      (x: number) => x < 5,
      ['0', '1', '2', '3', '4'],
    ],
    [
      '012345',
      (x: number) => x < 6,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: number) => x > 0,
      [],
    ],
    [
      '012345',
      (x: number) => x > 1,
      [],
    ],
    [
      '012345',
      (x: number) => x > -1,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      ['5', '4', '3', '2', '1', '0'],
      (x: number) => x > 2,
      ['5', '4', '3'],
    ],
    [
      '012345',
      () => true,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      () => false,
      [],
    ],
    [
      '14641',
      (x: number) => x < 5,
      ['1', '4'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      new Set([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      new Set([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      new Set([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 0,
      [],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 1,
      [[0, 0]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 2,
      [[0, 0], [1, 1]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 3,
      [[0, 0], [1, 1], [2, 2]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 4,
      [[0, 0], [1, 1], [2, 2], [3, 3]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 5,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 6,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] > 0,
      [],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] > 1,
      [],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] > -1,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1, 0]),
      (x: [number, number]) => x[1] > 2,
      [[0, 5], [1, 4], [2, 3]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createMapFixture([1, 4, 6, 4, 1]),
      (x: [number, number]) => x[1] < 5,
      [[0, 1], [1, 4]],
    ],
    [
      createMapFixture([50, 60, 70, 85, 65, 90]),
      (x: [number, number]) => x[1] < 65,
      [[0, 50], [1, 60]],
    ],
    [
      createMapFixture([50, 60, 70, 85, 65, 90]),
      (x: [number, number]) => x[1] <= 65,
      [[0, 50], [1, 60]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      createAsyncGeneratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      createAsyncGeneratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
    [
      createAsyncGeneratorFixture([50, 60, 70, 85, 65, 90]),
      async (x: number) => {
        await asyncTimeout(1);
        return x <= 65;
      },
      [50, 60],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createAsyncIterableFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      createAsyncIterableFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      createAsyncIterableFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
    [
      createAsyncIterableFixture([50, 60, 70, 85, 65, 90]),
      async (x: number) => {
        await asyncTimeout(1);
        return x <= 65;
      },
      [50, 60],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [0],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [0, 1],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [0, 1, 2],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [0, 1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [0, 1, 2, 3, 4],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [5, 4, 3],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [],
    ],
    [
      createAsyncIteratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [1, 4],
    ],
    [
      createAsyncIteratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 65,
      [50, 60],
    ],
    [
      createAsyncIteratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x <= 65,
      [50, 60],
    ],
    [
      createAsyncIteratorFixture([50, 60, 70, 85, 65, 90]),
      async (x: number) => {
        await asyncTimeout(1);
        return x <= 65;
      },
      [50, 60],
    ],
  ];
}
