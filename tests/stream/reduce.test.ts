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
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Reduce Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = (streamFactory as (data: unknown) => Stream<unknown>)(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<number>, (data: Iterable<number>) => unknown, unknown]> {
  return [
    [
      [],
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item, 0),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 0),
      6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      7,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 0),
      -6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      -5,
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue((carry, item) =>  {
          return carry + item.reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toRange(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toRange(),
      6,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable) => Stream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      [2, 1, 3, 5],
      (iterable) => Stream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      [2, 1, 3, 5],
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      [2, 3, 1, 5],
      (iterable) => Stream.of(iterable)
        .toLast(),
      5,
    ],
    [
      [1, 2, 3, 4, 0],
      (iterable) => Stream.of(iterable)
        .toLast(),
      0,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toMax((value) => value),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMax((value) => value),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value),
      -3,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      3,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      -1,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toMin((value) => value),
      undefined,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMin((value) => value),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value),
      3,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      1,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .toMinMax((item) => -item),
      [3, -3],
    ],
    [
      [],
      (iterable) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      6,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      -6,
    ],
    [
      [],
      (iterable) => Stream.of(iterable).toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable).toSum(),
      0,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      6,
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<number>, (data: Iterable<number>) => unknown, unknown]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<number>) => unknown, unknown],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<number>, (data: Iterable<number>) => unknown, unknown]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<number>) => unknown, unknown],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<number>, (data: Iterable<number>) => unknown, unknown]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<number>) => unknown, unknown],
  ]);
}

function dataProviderForStrings(): Array<[Iterable<string>, (data: Iterable<string>) => unknown, unknown]> {
  return [
    [
      '',
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => value > 0)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => !(value > 0))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .map((datum) => parseInt(datum))
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .toAverage(),
      2,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .toRange(),
      0,
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .toRange(),
      2,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      'abcdef',
      (iterable) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      '12345',
      (iterable) => Stream.of(iterable)
        .toFirst(),
      '1',
    ],
    [
      '2135',
      (iterable) => Stream.of(iterable)
        .toFirst(),
      '2',
    ],
    [
      '12345',
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      ['1', '5'],
    ],
    [
      '2135',
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      ['2', '5'],
    ],
    [
      '2315',
      (iterable) => Stream.of(iterable)
        .toLast(),
      '5',
    ],
    [
      '12340',
      (iterable) => Stream.of(iterable)
        .toLast(),
      '0',
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .toMax((value) => value),
      undefined,
    ],
    [
      'bac',
      (iterable) => Stream.of(iterable)
        .toMax(),
      'c',
    ],
    [
      'bac',
      (iterable) => Stream.of(iterable)
        .toMax((value) => value),
      'c',
    ],
    [
      'bac',
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value.charCodeAt(0)),
      'a',
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .toMin((value) => value),
      undefined,
    ],
    [
      'bac',
      (iterable) => Stream.of(iterable)
        .toMin(),
      'a',
    ],
    [
      'bac',
      (iterable) => Stream.of(iterable)
        .toMin((value) => value),
      'a',
    ],
    [
      'bac',
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value.charCodeAt(0)),
      'c',
    ],
    [
      'abc',
      (iterable) => Stream.of(iterable)
        .toMinMax(),
      ['a', 'c'],
    ],
    [
      'abc',
      (iterable) => Stream.of(iterable)
        .toMinMax((item) => -item.charCodeAt(0)),
      ['c', 'a'],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .filter((value) => Number(value) > 0)
        .toSum(),
      0,
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .filter((value) => Number(value) > 0)
        .toSum(),
      6,
    ],
  ];
}

function dataProviderForSets(): Array<[Set<number>, (data: Iterable<number>) => unknown, unknown]> {
  return [
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return Number(carry) + item;
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item, 0),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 0),
      6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toValue((carry, item) => carry + item, 1),
      7,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => Number(carry) + item),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 0),
      -6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .toValue((carry, item) => carry + item, 1),
      -5,
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return carry + item
            .reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toRange(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toRange(),
      6,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      new Set([2, 1, 3, 5]),
      (iterable) => Stream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      new Set([2, 1, 3, 5]),
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      new Set([2, 3, 1, 5]),
      (iterable) => Stream.of(iterable)
        .toLast(),
      5,
    ],
    [
      new Set([1, 2, 3, 4, 0]),
      (iterable) => Stream.of(iterable)
        .toLast(),
      0,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => value),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => value),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value),
      -3,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMax(),
      3,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMax(),
      -1,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => value),
      undefined,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => value),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value),
      3,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toMin(),
      1,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMinMax((item) => -item),
      [3, -3],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toProduct(),
      6,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toProduct(),
      -6,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value > 0)
        .toSum(),
      6,
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<unknown, number>, (data: Map<unknown, number>) => unknown, unknown]> {
  return [
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => Number(carry) + item[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item[1], 0),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => Number(carry) + item[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => carry + item[1], 0),
      6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => (value)[1] > 0)
        .toValue((carry, item) => carry + item[1], 1),
      7,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .toValue((carry, item) => Number(carry) + item[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .toValue((carry, item) => carry + item[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !((value)[1] > 0))
        .toValue((carry, item) => carry + item[1], 0),
      -6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => !((value)[1] > 0))
        .toValue((carry, item) => carry + item[1], 1),
      -5,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf = Stream.of(item)
            .map((subItem) => (subItem)[1])
            .toArray();

          return carry + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .zipEqualWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf = Stream.of(item)
            .map((subItem) => (subItem)[1])
            .toArray();

          return carry + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf = Stream.of(item)
            .map((subItem) => (subItem)[1])
            .toArray();

          return carry + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .zipLongestWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf = Stream.of(item)
            .map((subItem) => subItem === undefined ? 0 : subItem[1])
            .toArray();

          return carry + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      675,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .chainWith(
          createMapFixture([4, 5, 6]),
          createMapFixture([7, 8, 9]),
        )
        .zipEqualWith(createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]))
        .toValue(function (carry, item) {
          const buf = Stream.of(item)
            .map((subItem) => (subItem)[1])
            .toArray();

          return carry + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      90,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toAverage(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toAverage(),
      0,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toRange(),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toRange(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .toFirst(),
      [0, 1],
    ],
    [
      createMapFixture([2, 1, 3, 5]),
      (iterable) => Stream.of(iterable)
        .toFirst(),
      [0, 2],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      [[0, 1], [4, 5]],
    ],
    [
      createMapFixture([2, 1, 3, 5]),
      (iterable) => Stream.of(iterable)
        .toFirstAndLast(),
      [[0, 2], [3, 5]],
    ],
    [
      createMapFixture([2, 3, 1, 5]),
      (iterable) => Stream.of(iterable)
        .toLast(),
      [3, 5],
    ],
    [
      createMapFixture([1, 2, 3, 4, 0]),
      (iterable) => Stream.of(iterable)
        .toLast(),
      [4, 0],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => value[1]),
      [4, 3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMax((value) => -value[1]),
      [5, -3],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMax((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMax((value) => value[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMax((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMax((value) => value[1]),
      [1, -1],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => value[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMin((value) => -value[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMin((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .toMin((value) => value[1]),
      [0, 1],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMin((value) => value[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .filter((value) => value[1] <= 0)
        .toMin((value) => value[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .toMinMax((item) => -item[1]),
      [[4, 3], [5, -3]],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toProduct(),
      -36,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 0)
        .toProduct(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value <= 0)
        .toProduct(),
      -6,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => Stream.of(iterable)
        .map((item) => item[1])
        .toSum(),
      6,
    ],
  ];
}
