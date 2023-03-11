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
])("Stream Reduce Test", (input, streamFactory, expected) => {
  it("", () => {
    // Given
    const result = (streamFactory as (data: unknown) => Stream)(input);

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable).toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable).toSum(),
      0,
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      2,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as string)),
      undefined,
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      'c',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as string)),
      'c',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as string).charCodeAt(0)),
      'a',
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as string)),
      undefined,
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      'a',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as string)),
      'a',
    ],
    [
      'bac',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as string).charCodeAt(0)),
      'c',
    ],
    [
      '',
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      '123',
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as number)),
      3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as number)),
      -3,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMax(),
      3,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMax(),
      -1,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as number)),
      -3,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as number)),
      3,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toMin(),
      1,
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toMin(),
      -3,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
    [
      new Set([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) <= 0)
        .toSum(),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 0),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 1),
      1,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 0),
      6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      7,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 0),
      -6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      -5,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf: Array<number> = Stream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipEqualWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf: Array<number> = Stream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf: Array<number> = Stream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      666,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipLongestWith(
          createMapFixture([10, 20, 30]),
          createMapFixture([100, 200, 300]),
        )
        .toValue(function (carry, item) {
          const buf: Array<number> = Stream.of(item as Array<Array<number>>)
            .map((subItem) => subItem === undefined ? 0 : (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + current);
        }, 0),
      675,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chainWith(
          createMapFixture([4, 5, 6]),
          createMapFixture([7, 8, 9]),
        )
        .zipEqualWith(createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]))
        .toValue(function (carry, item) {
          const buf: Array<number> = Stream.of(item as Array<Array<number>>)
            .map((subItem) => (subItem as Array<number>)[1])
            .toArray() as Array<number>;

          return (carry as number) + buf
            .reduce((accumulator, current) => accumulator + (current as number));
        }, 0),
      90,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toAverage(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toAverage(),
      0,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => (value as [number, number])[1]),
      [4, 3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax((value) => -(value as [number, number])[1]),
      [5, -3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMax((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMax((value) => (value as [number, number])[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMax((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMax((value) => (value as [number, number])[1]),
      [1, -1],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => (value as [number, number])[1]),
      [5, -3],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin((value) => -(value as [number, number])[1]),
      [4, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMin((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] > 0)
        .toMin((value) => (value as [number, number])[1]),
      [0, 1],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMin((value) => (value as [number, number])[1]),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as [number, number])[1] <= 0)
        .toMin((value) => (value as [number, number])[1]),
      [5, -3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toProduct(),
      -36,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) > 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) > 0)
        .toProduct(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      undefined,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((value) => (value as number) <= 0)
        .toProduct(),
      -6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      6,
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      0,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<number>) => Stream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .toSum(),
      6,
    ],
  ];
}
