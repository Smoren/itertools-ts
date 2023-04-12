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
import { AsyncStream } from '../../src';

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
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Math Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
  ];
}
