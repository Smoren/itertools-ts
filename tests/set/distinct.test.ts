import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { set } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, Array<unknown>]>)(
  "Set Distinct Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.distinct(input)) {
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
  Array<unknown>
]>)(
  "Set Distinct Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of set.distinctAsync(input)) {
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
      [],
      [],
    ],
    [
      [1],
      [1],
    ],
    [
      [1, 1],
      [1],
    ],
    [
      [1, '1'],
      [1, '1'],
    ],
    [
      ['1', 1],
      ['1', 1],
    ],
    [
      ['aa', 'bb', 'aa'],
      ['aa', 'bb'],
    ],
    [
      [1, 2, 1, 2, 3],
      [1, 2, 3],
    ],
    [
      ['1', 2, '1', '2', 3],
      ['1', 2, '2', 3],
    ],
    [
      [false, null, undefined, 0, 0.0, ''],
      [false, null, undefined, 0, ''],
    ],
    [
      [true, 1, '1', 1.0, '1.0'],
      [true, 1, '1', '1.0'],
    ],
    [
      [true, 1, '1', 1.1, '1.1'],
      [true, 1, '1', 1.1, '1.1'],
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
      createGeneratorFixture([1]),
      [1],
    ],
    [
      createGeneratorFixture([1, 1]),
      [1],
    ],
    [
      createGeneratorFixture([1, '1']),
      [1, '1'],
    ],
    [
      createGeneratorFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createGeneratorFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createGeneratorFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
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
      createIterableFixture([1]),
      [1],
    ],
    [
      createIterableFixture([1, 1]),
      [1],
    ],
    [
      createIterableFixture([1, '1']),
      [1, '1'],
    ],
    [
      createIterableFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createIterableFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createIterableFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createIterableFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createIterableFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createIterableFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
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
      createIteratorFixture([1]),
      [1],
    ],
    [
      createIteratorFixture([1, 1]),
      [1],
    ],
    [
      createIteratorFixture([1, '1']),
      [1, '1'],
    ],
    [
      createIteratorFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createIteratorFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createIteratorFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createIteratorFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
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
      ['1'],
    ],
    [
      '11',
      ['1'],
    ],
    [
      'aabacc',
      ['a', 'b', 'c'],
    ],
    [
      '12123',
      ['1', '2', '3'],
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
      new Set([1]),
      [1],
    ],
    [
      new Set([1, 1]),
      [1],
    ],
    [
      new Set([1, '1']),
      [1, '1'],
    ],
    [
      new Set(['1', 1]),
      ['1', 1],
    ],
    [
      new Set(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      new Set([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      new Set([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      new Set([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      new Set([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      [],
    ],
    [
      createMapFixture([1]),
      [[0, 1]],
    ],
    [
      createMapFixture([1, 1]),
      [[0, 1]],
    ],
    [
      createMapFixture([1, '1']),
      [[0, 1], [1, '1']],
    ],
    [
      createMapFixture(['1', 1]),
      [[0, '1'], [1, 1]],
    ],
    [
      createMapFixture(['aa', 'bb', 'aa']),
      [[0, 'aa'], [1, 'bb']],
    ],
    [
      createMapFixture([1, 2, 1, 2, 3]),
      [[0, 1], [1, 2], [4, 3]],
    ],
    [
      createMapFixture(['1', 2, '1', '2', 3]),
      [[0, '1'], [1, 2], [3, '2'], [4, 3]],
    ],
    [
      createMapFixture([false, null, undefined, 0, 0.0, '']),
      [[0, false], [1, null], [2, undefined], [3, 0], [5, '']],
    ],
    [
      createMapFixture([true, 1, '1', 1.0, '1.0']),
      [[0, true], [1, 1], [2, '1'], [4, '1.0']],
    ],
    [
      createMapFixture([true, 1, '1', 1.1, '1.1']),
      [[0, true], [1, 1], [2, '1'], [3, 1.1], [4, '1.1']],
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
      createAsyncGeneratorFixture([1]),
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, '1']),
      [1, '1'],
    ],
    [
      createAsyncGeneratorFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createAsyncGeneratorFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createAsyncGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
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
      createAsyncIterableFixture([1]),
      [1],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      [1],
    ],
    [
      createAsyncIterableFixture([1, '1']),
      [1, '1'],
    ],
    [
      createAsyncIterableFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createAsyncIterableFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createAsyncIterableFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createAsyncIterableFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncIterableFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncIterableFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
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
      createAsyncIteratorFixture([1]),
      [1],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      [1],
    ],
    [
      createAsyncIteratorFixture([1, '1']),
      [1, '1'],
    ],
    [
      createAsyncIteratorFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createAsyncIteratorFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createAsyncIteratorFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createAsyncIteratorFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncIteratorFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncIteratorFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}
