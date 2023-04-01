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
  "AsyncStream Reduce Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await (streamFactory as (data: unknown) => AsyncStream)(input);

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
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      [2, 1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      [2, 1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      [2, 3, 1, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      [1, 2, 3, 4, 0],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toSum(),
      0,
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createGeneratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createGeneratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createGeneratorFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createIterableFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createIterableFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createIterableFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createIterableFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createIteratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createIteratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createIteratorFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
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
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
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
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
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
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
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
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum) => parseInt(datum as string))
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
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      2,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      '1',
    ],
    [
      '2135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      '2',
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      ['1', '5'],
    ],
    [
      '2135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      ['2', '5'],
    ],
    [
      '2315',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      '5',
    ],
    [
      '12340',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      '0',
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as string)),
      undefined,
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      'c',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as string)),
      'c',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as string).charCodeAt(0)),
      'a',
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as string)),
      undefined,
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      'a',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as string)),
      'a',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as string).charCodeAt(0)),
      'c',
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax(),
      ['a', 'c'],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as string).charCodeAt(0)),
      ['c', 'a'],
    ],
    [
      '',
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      '123',
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      new Set([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      new Set([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      new Set([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      new Set([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      new Set([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      new Set([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 0),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 1),
      1,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 0),
      6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      7,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 0),
      -6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      -5,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf: Array<number> = await AsyncStream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf: Array<number> = await AsyncStream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf: Array<number> = await AsyncStream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(async (carry, item) => {
          const buf: Array<number> = await AsyncStream.of(item as Array<Array<number>>)
            .map((subItem) => subItem === undefined ? 0 : (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      675,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chainWith(
          createMapFixture([4, 5, 6]),
          createMapFixture([7, 8, 9]),
        )
        .zipEqualWith(createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]))
        .toValue(async (carry, item) => {
          const buf: Array<number> = await AsyncStream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      90,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toAverage(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toAverage(),
      0,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      [0, 1],
    ],
    [
      createMapFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      [0, 2],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [[0, 1], [4, 5]],
    ],
    [
      createMapFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [[0, 2], [3, 5]],
    ],
    [
      createMapFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      [3, 5],
    ],
    [
      createMapFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      [4, 0],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as [number, number])[1]),
      [4, 3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as [number, number])[1]),
      [5, -3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMax((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMax((value) => (value as [number, number])[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMax((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMax((value) => (value as [number, number])[1]),
      [1, -1],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as [number, number])[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as [number, number])[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMin((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMin((value) => (value as [number, number])[1]),
      [0, 1],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMin((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMin((value) => (value as [number, number])[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as [unknown, number])[1]),
      [[4, 3], [5, -3]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toProduct(),
      -36,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      6,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createAsyncIterableFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createAsyncIterableFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncIterableFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      1,
    ],
    [
      createAsyncIteratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [1, 5],
    ],
    [
      createAsyncIteratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncIteratorFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 0]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      0,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 100)
        .toMinMax(),
      [undefined, undefined],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMinMax(),
      [-3, -1],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      -6,
    ],
  ];
}
