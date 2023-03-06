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
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((datum) => parseInt(datum as string))
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      [],
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
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 1),
      1,
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value: unknown) => (value as number) > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      7,
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number)),
      undefined,
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      1,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 0),
      -6,
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as number), 1),
      -5,
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 0),
      0,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }, 1),
      1,
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)[1];
        }),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 0),
      6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      7,
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1]),
      undefined,
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      1,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 0),
      -6,
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .toValue((carry, item) => (carry as number) + (item as Array<number>)[1], 1),
      -5,
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
      (iterable: Iterator<unknown>) => Stream.of(iterable)
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
  ];
}
