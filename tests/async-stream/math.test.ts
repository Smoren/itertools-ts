import { AsyncStream, Numeric } from "../../src";
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
])(
  "AsyncStream Math Test",
  (input, streamFactory, expected) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (iterable: Array<any>) => Promise<Array<number>>, Array<number>]> {
  return [
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      [] as number[],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [] as number[],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: Iterable<Numeric> | Iterator<Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (iterable: Generator<any>) => Promise<Array<number>>, Array<number>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<Array<number>>, Array<number>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (iterable: Iterable<any>) => Promise<Array<number>>, Array<number>]> {
  return dataProviderForArrays().map((item) => {
    return [
      createIterableFixture(item[0]),
      ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<Array<number>>, Array<number>],
    ];
  });
}

function dataProviderForIterators(): Array<[Iterator<any>, (iterable: Iterator<any>) => Promise<Array<number>>, Array<number>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<Array<number>>, Array<number>],
  ]);
}

function dataProviderForStrings(): Array<[string, (iterable: string) => Promise<Array<number>>, Array<number>]> {
  return [
    [
      '',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      '',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      '',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      '',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      '',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      '',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      '123',
      (iterable): Promise<Array<number>> => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (iterable: Set<any>) => Promise<Array<number>>, Array<number>]> {
  return [
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', '2', '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set(['1', 2, '3']),
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (iterable: Map<any, any>) => Promise<Array<number>>, Array<number>]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', '2', '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture(['1', 2, '3']),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, Numeric>): Promise<Array<number>> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForAsync(): Array<[Array<any>, (iterable: AsyncIterable<any> | AsyncIterator<any>) => Promise<Array<number>>, Array<number>]> {
  return [
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', '2', '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      ['1', 2, '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningAverage(0)
        .toArray(),
      [0, 0.5, 1, 1.5],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningAverage(1)
        .toArray(),
      [1, 1, 4/3, 7/4],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', '2', '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      ['1', 2, '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningDifference(0)
        .toArray(),
      [0, -1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningDifference(1)
        .toArray(),
      [1, 0, -2, -5],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      ['1', 2, '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMax(0)
        .toArray(),
      [0, 1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', '2', '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      ['1', 2, '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMin(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningProduct(0)
        .toArray(),
      [0, 0, 0, 0],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningProduct(1)
        .toArray(),
      [1, 1, 2, 6],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', '2', '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      ['1', 2, '3'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal(0)
        .toArray(),
      [0, 1, 3, 6],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal(1)
        .toArray(),
      [1, 2, 4, 7],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (iterable: AsyncGenerator<any>) => Promise<Array<number>>, Array<number>]> {
  return dataProviderForAsync().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<Array<number>>, Array<number>],
  ]);
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (iterable: AsyncIterable<any>) => Promise<Array<number>>, Array<number>]> {
  return dataProviderForAsync().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<Array<number>>, Array<number>],
  ]);
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (iterable: AsyncIterator<any>) => Promise<Array<number>>, Array<number>]> {
  return dataProviderForAsync().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<Array<number>>, Array<number>],
  ]);
}
