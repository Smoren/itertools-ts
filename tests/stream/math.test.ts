// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream, Array<unknown>]>)(
  "Stream Math Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}
