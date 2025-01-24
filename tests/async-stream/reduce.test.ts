import { AsyncStream } from '../../src';
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
  "AsyncStream Reduce Test",
  (input, streamFactory, expected) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<number>, (data: Iterable<number> | Iterator<number>) => Promise<any>, any]> {
  return [
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item, 0),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 0),
      6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      7,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 0),
      -6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      -5,
    ],
    [
      [1, 2, 3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue((carry, item) => {
          return carry + item.reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      [1, 2, 3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipEqualWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue((carry, item) => {
          return carry + item.reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue((carry, item) => {
          return carry + item.reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue((carry, item) =>  {
          return carry + item.reduce((accumulator, current) => Number(accumulator) + (current ?? 0), 0)!;
        }, 0),
      675,
    ],
    [
      [1, 2, 3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .chainWith(
          [4, 5, 6],
          [7, 8, 9]
        )
        .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toValue((carry, item) =>  {
          return carry + item.reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toRange(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toRange(),
      6,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      [2, 1, 3, 5],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      [2, 1, 3, 5],
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      [2, 3, 1, 5],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      [1, 2, 3, 4, 0],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value),
      -3,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      3,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      -1,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value),
      undefined,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value),
      3,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      1,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .filter((value) => value > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .toMinMax((item) => -item),
      [3, -3],
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      6,
    ],
    [
      [],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      -6,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable).toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable).toSum(),
      0,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      6,
    ],
    [
      [],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<number>, (data: Generator<number>) => Promise<any>, any]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: Generator<number>) => any, any],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<number>, (data: Iterable<number>) => Promise<any>, any]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<number>) => any, any],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<number>, (data: Iterator<number>) => Promise<any>, any]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterator<number>) => any, any],
  ]);
}

function dataProviderForStrings(): Array<[string, (data: string) => Promise<any>, any]> {
  return [
    [
      '',
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      '',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      '',
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => value > 0)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      '',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      '',
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => !(value > 0))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      '',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      '123',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      '123',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .zipEqualWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      '12345',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      '12345',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item.reduce((accumulator, current) => Number(accumulator) + (current ?? 0), 0)!;
        }, 0),
      675,
    ],
    [
      '123',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum))
        .chainWith(
          [4, 5, 6],
          [7, 8, 9]
        )
        .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      '',
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      '123',
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toAverage(),
      2,
    ],
    [
      '',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toRange(),
      0,
    ],
    [
      '123',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toRange(),
      2,
    ],
    [
      '',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      'abcdef',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      '12345',
      (iterable): Promise<string> => AsyncStream.of(iterable)
        .toFirst(),
      '1',
    ],
    [
      '2135',
      (iterable): Promise<string> => AsyncStream.of(iterable)
        .toFirst(),
      '2',
    ],
    [
      '12345',
      (iterable): Promise<[string, string]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      ['1', '5'],
    ],
    [
      '2135',
      (iterable): Promise<[string, string]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      ['2', '5'],
    ],
    [
      '2315',
      (iterable): Promise<string> => AsyncStream.of(iterable)
        .toLast(),
      '5',
    ],
    [
      '12340',
      (iterable): Promise<string> => AsyncStream.of(iterable)
        .toLast(),
      '0',
    ],
    [
      '',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      '',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value),
      undefined,
    ],
    [
      'bac',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMax(),
      'c',
    ],
    [
      'bac',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value),
      'c',
    ],
    [
      'bac',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value.charCodeAt(0)),
      'a',
    ],
    [
      '',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      '',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value),
      undefined,
    ],
    [
      'bac',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMin(),
      'a',
    ],
    [
      'bac',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value),
      'a',
    ],
    [
      'bac',
      (iterable): Promise<string | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value.charCodeAt(0)),
      'c',
    ],
    [
      'abc',
      (iterable): Promise<[string?, string?]> => AsyncStream.of(iterable)
        .toMinMax(),
      ['a', 'c'],
    ],
    [
      'abc',
      (iterable): Promise<[string?, string?]> => AsyncStream.of(iterable)
        .toMinMax((item) => -item.charCodeAt(0)),
      ['c', 'a'],
    ],
    [
      '',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => Number(value) > 0)
        .toSum(),
      0,
    ],
    [
      '123',
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => Number(value) > 0)
        .toSum(),
      6,
    ],
  ];
}

function dataProviderForSets(): Array<[Set<number>, (data: Set<number>) => Promise<any>, any]> {
  return [
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return Number(carry) + item;
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item, 0),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 0),
      6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      7,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 0),
      -6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      -5,
    ],
    [
      new Set([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      new Set([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipEqualWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item.reduce((accumulator, current) => Number(accumulator) + (current ?? 0), 0)!;
        }, 0),
      675,
    ],
    [
      new Set([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .chainWith(
          [4, 5, 6],
          [7, 8, 9]
        )
        .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toRange(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toRange(),
      6,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      new Set([2, 1, 3, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      new Set([2, 1, 3, 5]),
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      new Set([2, 3, 1, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      new Set([1, 2, 3, 4, 0]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value),
      -3,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      3,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      -1,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value),
      undefined,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value),
      3,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      1,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .filter((value) => value > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .toMinMax((item) => -item),
      [3, -3],
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      6,
    ],
    [
      new Set([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      -6,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      6,
    ],
    [
      new Set([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<number, number>, (data: Map<number, number>) => Promise<any>, any]> {
  return [
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .toValue((carry, item) => Number(carry) + item[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item[1], 0),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => Number(carry) + item[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => carry + item[1], 0),
      6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => carry + item[1], 1),
      7,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .toValue((carry, item) => Number(carry) + item[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !((value)[1] > 0))
        .toValue((carry, item) => carry + item[1], 0),
      -6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .filter((value) => !((value)[1] > 0))
        .toValue((carry, item) => carry + item[1], 1),
      -5,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf = await AsyncStream.of(item)
            .map((subItem) => subItem[1])
            .toArray();

          return carry + buf.reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .zipEqualWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf = await AsyncStream.of(item)
            .map((subItem) => subItem[1])
            .toArray();

          return carry + buf.reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf = await AsyncStream.of(item)
            .map((subItem) => subItem[1])
            .toArray();

          return carry + buf.reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .zipLongestWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf = await AsyncStream.of(item)
            .map((subItem) => subItem === undefined ? 0 : subItem[1])
            .toArray();

          return carry + buf.reduce((accumulator, current) => accumulator + current);
        }, 0),
      675,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .chainWith(
          createMapFixture([4, 5, 6]),
          createMapFixture([7, 8, 9]),
        )
        .zipEqualWith(createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]))
        .toValue(async (carry, item) => {
          const buf = await AsyncStream.of(item)
            .map((subItem) => subItem[1])
            .toArray();

          return carry + buf.reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toAverage(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toAverage(),
      0,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toRange(),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toRange(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toFirst(),
      [0, 1],
    ],
    [
      createMapFixture([2, 1, 3, 5]),
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toFirst(),
      [0, 2],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable): Promise<[[number, number], [number, number]]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [[0, 1], [4, 5]],
    ],
    [
      createMapFixture([2, 1, 3, 5]),
      (iterable): Promise<[[number, number], [number, number]]> => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [[0, 2], [3, 5]],
    ],
    [
      createMapFixture([2, 3, 1, 5]),
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toLast(),
      [3, 5],
    ],
    [
      createMapFixture([1, 2, 3, 4, 0]),
      (iterable): Promise<[number, number]> => AsyncStream.of(iterable)
        .toLast(),
      [4, 0],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMax((value) => value[1]),
      [4, 3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMax((value) => -value[1]),
      [5, -3],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMax((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMax((value) => value[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMax((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMax((value) => value[1]),
      [1, -1],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMin((value) => value[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .toMin((value) => -value[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMin((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMin((value) => value[1]),
      [0, 1],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMin((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number, number] | undefined> => AsyncStream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMin((value) => value[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[number?, number?]> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<[[number, number]?, [number, number]?]> => AsyncStream.of(iterable)
        .toMinMax((item) => -item[1]),
      [[4, 3], [5, -3]],
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toProduct(),
      -36,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 0)
        .toProduct(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable): Promise<number | undefined> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value <= 0)
        .toProduct(),
      -6,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable): Promise<number> => AsyncStream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      6,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<number>, (data: AsyncGenerator<number>) => Promise<any>, any]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .chainWith(
          [4, 5, 6],
          [7, 8, 9]
        )
        .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 0]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncGenerator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<number>, (data: AsyncIterable<number>) => Promise<any>, any]> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .chainWith(
          [4, 5, 6],
          [7, 8, 9]
        )
        .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createAsyncIterableFixture([2, 1, 3, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createAsyncIterableFixture([2, 1, 3, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncIterableFixture([2, 3, 1, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 0]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<number>, (data: AsyncIterator<number>) => Promise<any>, any]> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .chainWith(
          [4, 5, 6],
          [7, 8, 9]
        )
        .zipEqualWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createAsyncIteratorFixture([2, 1, 3, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createAsyncIteratorFixture([2, 1, 3, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncIteratorFixture([2, 3, 1, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 0]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}
