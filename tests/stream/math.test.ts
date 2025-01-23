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
  (input, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Numeric>, (iterable: any) => Array<number>, Array<number>]> {
  return [
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      [] as number[],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [] as number[],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<Numeric>, (iterable: any) => Array<number>, Array<number>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<Numeric>, (iterable: any) => Array<number>, Array<number>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<Numeric>, (iterable: any) => Array<number>, Array<number>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Array<number>, Array<number>],
  ]);
}

function dataProviderForStrings(): Array<[string, (iterable: any) => Array<number>, Array<number>]> {
  return [
    [
      '',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      '',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      '',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      '',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      '',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      '',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      '123',
      (iterable: Iterable<NumericString>): Array<number> => Stream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<Numeric>, (iterable: any) => Array<number>, Array<number>]> {
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

function dataProviderForMaps(): Array<[Map<number, Numeric>, (iterable: any) => Array<number>, Array<number>]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}
