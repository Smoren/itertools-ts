import {
  createAsyncGeneratorFixture, createAsyncIterableFixture, createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])(
  "Reduce To Average Test",
  (input, expected) => {
    it("", () => {
      // When
      const result = reduce.toAverage(input);

      // Then
      if (expected === undefined) {
        expect(result).toEqual(expected);
      } else {
        expect(result).toBeCloseTo(expected);
      }
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
  "Reduce To Average Async Test",
  (input, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toAverageAsync(input);

      // Then
      if (expected === undefined) {
        expect(result).toEqual(expected);
      } else {
        expect(result).toBeCloseTo(expected);
      }
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, any]> {
  return [
    [
      [],
      undefined,
    ],
    [
      [0],
      0,
    ],
    [
      [null],
      0,
    ],
    [
      [false],
      0,
    ],
    [
      [null, null],
      0,
    ],
    [
      [null, false],
      0,
    ],
    [
      [true, false],
      0.5,
    ],
    [
      [false, true],
      0.5,
    ],
    [
      [0, null, false],
      0,
    ],
    [
      [1, null, false],
      0.3333,
    ],
    [
      [1, null, true],
      0.6667,
    ],
    [
      [1, 2, 3],
      2,
    ],
    [
      [2, 2, 2],
      2,
    ],
    [
      [5, 6, 1],
      4,
    ],
    [
      [6, 7],
      6.5,
    ],
    [
      [1.1, 2.2, 3.3],
      2.2,
    ],
    [
      [0.5, 1, 1.5],
      1.0,
    ],
    [
      [-0.5, 0, 0.5],
      0.0,
    ],
    [
      [-2, -4, -3],
      -3,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, any]> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
    ],
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([null]),
      0,
    ],
    [
      createGeneratorFixture([false]),
      0,
    ],
    [
      createGeneratorFixture([null, null]),
      0,
    ],
    [
      createGeneratorFixture([null, false]),
      0,
    ],
    [
      createGeneratorFixture([true, false]),
      0.5,
    ],
    [
      createGeneratorFixture([false, true]),
      0.5,
    ],
    [
      createGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, false]),
      0.3333,
    ],
    [
      createGeneratorFixture([1, null, true]),
      0.6667,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      2,
    ],
    [
      createGeneratorFixture([2, 2, 2]),
      2,
    ],
    [
      createGeneratorFixture([5, 6, 1]),
      4,
    ],
    [
      createGeneratorFixture([6, 7]),
      6.5,
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      createGeneratorFixture([0.5, 1, 1.5]),
      1.0,
    ],
    [
      createGeneratorFixture([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      createGeneratorFixture([-2, -4, -3]),
      -3,
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, any]> {
  return [
    [
      createIterableFixture([]),
      undefined,
    ],
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([null]),
      0,
    ],
    [
      createIterableFixture([false]),
      0,
    ],
    [
      createIterableFixture([null, null]),
      0,
    ],
    [
      createIterableFixture([null, false]),
      0,
    ],
    [
      createIterableFixture([true, false]),
      0.5,
    ],
    [
      createIterableFixture([false, true]),
      0.5,
    ],
    [
      createIterableFixture([0, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, false]),
      0.3333,
    ],
    [
      createIterableFixture([1, null, true]),
      0.6667,
    ],
    [
      createIterableFixture([1, 2, 3]),
      2,
    ],
    [
      createIterableFixture([2, 2, 2]),
      2,
    ],
    [
      createIterableFixture([5, 6, 1]),
      4,
    ],
    [
      createIterableFixture([6, 7]),
      6.5,
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      createIterableFixture([0.5, 1, 1.5]),
      1.0,
    ],
    [
      createIterableFixture([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      createIterableFixture([-2, -4, -3]),
      -3,
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, any]> {
  return [
    [
      createIteratorFixture([]),
      undefined,
    ],
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([null]),
      0,
    ],
    [
      createIteratorFixture([false]),
      0,
    ],
    [
      createIteratorFixture([null, null]),
      0,
    ],
    [
      createIteratorFixture([null, false]),
      0,
    ],
    [
      createIteratorFixture([true, false]),
      0.5,
    ],
    [
      createIteratorFixture([false, true]),
      0.5,
    ],
    [
      createIteratorFixture([0, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, false]),
      0.3333,
    ],
    [
      createIteratorFixture([1, null, true]),
      0.6667,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      2,
    ],
    [
      createIteratorFixture([2, 2, 2]),
      2,
    ],
    [
      createIteratorFixture([5, 6, 1]),
      4,
    ],
    [
      createIteratorFixture([6, 7]),
      6.5,
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      createIteratorFixture([0.5, 1, 1.5]),
      1.0,
    ],
    [
      createIteratorFixture([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      createIteratorFixture([-2, -4, -3]),
      -3,
    ],
  ];
}

function dataProviderForStrings(): Array<[string, any]> {
  return [
    [
      '',
      undefined,
    ],
    [
      '0',
      0,
    ],
    [
      '1',
      1,
    ],
    [
      '01',
      0.5,
    ],
    [
      '10',
      0.5,
    ],
    [
      '1010',
      0.5,
    ],
    [
      '123',
      2,
    ],
    [
      '222',
      2,
    ],
    [
      '561',
      4,
    ],
    [
      '67',
      6.5,
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, any]> {
  return [
    [
      new Set([]),
      undefined,
    ],
    [
      new Set([0]),
      0,
    ],
    [
      new Set([null]),
      0,
    ],
    [
      new Set([false]),
      0,
    ],
    [
      new Set([null, null]),
      0,
    ],
    [
      new Set([null, false]),
      0,
    ],
    [
      new Set([true, false]),
      0.5,
    ],
    [
      new Set([false, true]),
      0.5,
    ],
    [
      new Set([0, null, false]),
      0,
    ],
    [
      new Set([1, null, false]),
      0.3333,
    ],
    [
      new Set([1, null, true]),
      0.6667,
    ],
    [
      new Set([1, 2, 3]),
      2,
    ],
    [
      new Set([2, 2, 2]),
      2,
    ],
    [
      new Set([5, 6, 1]),
      4,
    ],
    [
      new Set([6, 7]),
      6.5,
    ],
    [
      new Set([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      new Set([0.5, 1, 1.5]),
      1.0,
    ],
    [
      new Set([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      new Set([-2, -4, -3]),
      -3,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, any]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([0]),
      0,
    ],
    [
      createAsyncGeneratorFixture([null]),
      0,
    ],
    [
      createAsyncGeneratorFixture([false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([null, null]),
      0,
    ],
    [
      createAsyncGeneratorFixture([null, false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([true, false]),
      0.5,
    ],
    [
      createAsyncGeneratorFixture([false, true]),
      0.5,
    ],
    [
      createAsyncGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, null, false]),
      0.3333,
    ],
    [
      createAsyncGeneratorFixture([1, null, true]),
      0.6667,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      2,
    ],
    [
      createAsyncGeneratorFixture([2, 2, 2]),
      2,
    ],
    [
      createAsyncGeneratorFixture([5, 6, 1]),
      4,
    ],
    [
      createAsyncGeneratorFixture([6, 7]),
      6.5,
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      createAsyncGeneratorFixture([0.5, 1, 1.5]),
      1.0,
    ],
    [
      createAsyncGeneratorFixture([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      createAsyncGeneratorFixture([-2, -4, -3]),
      -3,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, any]> {
  return [
    [
      createAsyncIterableFixture([]),
      undefined,
    ],
    [
      createAsyncIterableFixture([0]),
      0,
    ],
    [
      createAsyncIterableFixture([null]),
      0,
    ],
    [
      createAsyncIterableFixture([false]),
      0,
    ],
    [
      createAsyncIterableFixture([null, null]),
      0,
    ],
    [
      createAsyncIterableFixture([null, false]),
      0,
    ],
    [
      createAsyncIterableFixture([true, false]),
      0.5,
    ],
    [
      createAsyncIterableFixture([false, true]),
      0.5,
    ],
    [
      createAsyncIterableFixture([0, null, false]),
      0,
    ],
    [
      createAsyncIterableFixture([1, null, false]),
      0.3333,
    ],
    [
      createAsyncIterableFixture([1, null, true]),
      0.6667,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      2,
    ],
    [
      createAsyncIterableFixture([2, 2, 2]),
      2,
    ],
    [
      createAsyncIterableFixture([5, 6, 1]),
      4,
    ],
    [
      createAsyncIterableFixture([6, 7]),
      6.5,
    ],
    [
      createAsyncIterableFixture([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      createAsyncIterableFixture([0.5, 1, 1.5]),
      1.0,
    ],
    [
      createAsyncIterableFixture([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      createAsyncIterableFixture([-2, -4, -3]),
      -3,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, any]> {
  return [
    [
      createAsyncIteratorFixture([]),
      undefined,
    ],
    [
      createAsyncIteratorFixture([0]),
      0,
    ],
    [
      createAsyncIteratorFixture([null]),
      0,
    ],
    [
      createAsyncIteratorFixture([false]),
      0,
    ],
    [
      createAsyncIteratorFixture([null, null]),
      0,
    ],
    [
      createAsyncIteratorFixture([null, false]),
      0,
    ],
    [
      createAsyncIteratorFixture([true, false]),
      0.5,
    ],
    [
      createAsyncIteratorFixture([false, true]),
      0.5,
    ],
    [
      createAsyncIteratorFixture([0, null, false]),
      0,
    ],
    [
      createAsyncIteratorFixture([1, null, false]),
      0.3333,
    ],
    [
      createAsyncIteratorFixture([1, null, true]),
      0.6667,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      2,
    ],
    [
      createAsyncIteratorFixture([2, 2, 2]),
      2,
    ],
    [
      createAsyncIteratorFixture([5, 6, 1]),
      4,
    ],
    [
      createAsyncIteratorFixture([6, 7]),
      6.5,
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2, 3.3]),
      2.2,
    ],
    [
      createAsyncIteratorFixture([0.5, 1, 1.5]),
      1.0,
    ],
    [
      createAsyncIteratorFixture([-0.5, 0, 0.5]),
      0.0,
    ],
    [
      createAsyncIteratorFixture([-2, -4, -3]),
      -3,
    ],
  ];
}
