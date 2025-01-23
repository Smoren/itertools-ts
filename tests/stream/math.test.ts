// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Numeric, NumericString, Stream } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Math Test",
  (
    input: Iterable<Numeric> | Iterator<Numeric>,
    streamFactory: (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>,
    expected: Array<number>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  return [
    [
      [],
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', '2', '3'],
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', 2, '3'],
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      [] as number[],
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [] as number[],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', '2', '3'],
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', 2, '3'],
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', 2, '3'],
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', '2', '3'],
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', 2, '3'],
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  return [
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  return [
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  return [
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForStrings(): Array<[Iterable<NumericString>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  return [
    [
      '' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      '' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      '' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      '' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      '' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      '' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      '1' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      '123' as Iterable<NumericString>,
      (iterable) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  return [
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForMaps(): Array<[Iterable<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]> {
  const result: Array<[Map<unknown, Numeric>, (iterable: Map<unknown, Numeric>) => Array<number>, Array<number>]> = [
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
  return result as unknown as Array<[Iterable<Numeric>, (iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>]>;
}
