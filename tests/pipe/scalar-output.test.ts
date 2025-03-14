import type { Pipe } from "../../src";
import { createPipe, infinite, reduce, set, single } from "../../src";
// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Pipe Create With Scalar Output Test",
  (pipe, input, expected) => {
    it("", () => {
      // When
      const result = (pipe as Pipe<any>)(input);

      // Then
      expect(result).toEqual(expected);
    });
  },
);

function dataProviderForArrays(): Array<[Pipe<any[]> | Pipe<[any, any]>, Array<any>, any]> {
  return [
    [
      createPipe<[
        Iterable<number>,
        number,
      ]>(
        reduce.toSum,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      18,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        reduce.toSum,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      15,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        reduce.toSum,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      55,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      14,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe()
        .add(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Pipe<any[]> | Pipe<[any, any]>, Generator<any>, any]> {
  return [
    [
      createPipe<[
        Iterable<number>,
        number,
      ]>(
        reduce.toSum,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        reduce.toSum,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        reduce.toSum,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForIterables(): Array<[Pipe<any[]> | Pipe<[any, any]>, Iterable<any>, any]> {
  return [
    [
      createPipe<[
        Iterable<number>,
        number,
      ]>(
        reduce.toSum,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        reduce.toSum,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        reduce.toSum,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        (input) => single.limit(input, 3),
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      infinite.count(1, 2),
      10,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        (input) => single.limit(input, 3),
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      infinite.count(1, 2),
      10,
    ],
    [
      createPipe(
        (input: Iterable<number>) => single.limit<number>(input, 3),
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      infinite.count(1, 2),
      10,
    ],
    [
      createPipe(
        (input: Iterable<unknown>) => single.map(input, (x) => Number(x)),
        (input) => single.limit(input, 3),
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      infinite.count(1, 2),
      10,
    ],
  ];
}

function dataProviderForIterators(): Array<[Pipe<any[]> | Pipe<[any, any]>, Iterator<any>, any]> {
  return [
    [
      createPipe<[
        Iterable<number>,
        number,
      ]>(
        reduce.toSum,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        reduce.toSum,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        reduce.toSum,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForStrings(): Array<[Pipe<any[]> | Pipe<[any, any]>, string, any]> {
  return [
    [
      createPipe<[
        Iterable<string>,
        number,
      ]>(
        reduce.toCount,
      ),
      '1122345',
      7,
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
        number,
      ]>(
        set.distinct,
        reduce.toCount,
      ),
      '1122345',
      5,
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
        Iterable<number>,
        number
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => Number(x)**2),
        reduce.toSum,
      ),
      '1122345',
      55,
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => Number(x)**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      '1122345',
      3,
    ],
    [
      createPipe(
        set.distinct<string>,
        (input) => single.map(input, (x) => Number(x)**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      '1122345',
      3,
    ],
    [
      createPipe()
        .add(set.distinct<string>)
        .add((input) => single.map(input, (x) => Number(x)**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      '1122345',
      3,
    ],
    [
      createPipe(set.distinct<string>)
        .add((input) => single.map(input, (x) => Number(x)**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      '1122345',
      3,
    ],
    [
      createPipe(
        set.distinct<string>,
        (input) => single.map(input, (x) => Number(x)**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      '1122345',
      3,
    ],
  ];
}

function dataProviderForSets(): Array<[Pipe<any[]> | Pipe<[any, any]>, Set<any>, any]> {
  return [
    [
      createPipe<[
        Iterable<number>,
        number,
      ]>(
        reduce.toSum,
      ),
      new Set([1, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        (input) => single.map(input, (x) => x**2),
        reduce.toSum,
      ),
      new Set([1, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      new Set([1, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinct<number>)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinct<number>,
        (input) => single.map(input, (x) => x**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForMaps(): Array<[Pipe<any[]> | Pipe<[any, any]>, Map<any, any>, any]> {
  return [
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        number,
      ]>(
        single.values,
        reduce.toSum,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        single.values,
        set.distinct,
        reduce.toSum,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        single.values,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        reduce.toSum,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        single.values,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toSum,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        number,
      ]>(
        single.values,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        single.values<number, number>,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
        reduce.toCount,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(single.values<number, number>)
        .add(set.distinct)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(single.values<number, number>)
        .add(set.distinct)
        .add((input) => single.map(input, (x) => x**2))
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        single.values<number, number>,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      )
        .add((input) => single.filter(input, (x) => x < 10))
        .add(reduce.toCount),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}
