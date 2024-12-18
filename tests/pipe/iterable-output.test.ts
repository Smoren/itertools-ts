import type { Pipe, PipeOperationSequence } from "../../src";
import { createPipe, infinite, set, single } from "../../src";
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
] as Array<[Pipe<any>, Iterable<number> | Iterator<number>, PipeOperationSequence<unknown[]>, Array<unknown>]>)(
  "Pipe Create With Iterable Output Test",
  (
    pipe: Pipe<any>,
    input: Iterable<number> | Iterator<number>,
    expected: Array<unknown>,
  ) => {
    it("", () => {
      const result = pipe(input) as Iterable<unknown>;
      expect([...result]).toEqual(expected);
    });
  },
);

function dataProviderForArrays() {
  return [
    [
      // TODO output type never
      createPipe(),
      [],
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      [],
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      [],
      [],
    ],
    [
      // TODO output type never
      createPipe(),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      ),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9],
    ],
  ];
}

function dataProviderForGenerators() {
  return [
    [
      createPipe(),
      createGeneratorFixture([]),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createGeneratorFixture([]),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createGeneratorFixture([]),
      [],
    ],
    [
      createPipe(),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        (input) => single.limit(input, 3),
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
  ];
}

function dataProviderForIterables() {
  return [
    [
      createPipe(),
      createIterableFixture([]),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createIterableFixture([]),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createIterableFixture([]),
      [],
    ],
    [
      createPipe(),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        (input) => single.limit(input, 3),
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
  ];
}

function dataProviderForIterators() {
  return [
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createIteratorFixture([]),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createIteratorFixture([]),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForStrings() {
  return [
    [
      createPipe(),
      '',
      [],
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
      ]>(
        set.distinct,
      ),
      '',
      [],
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
      ]>(
        set.distinct,
      ),
      '',
      [],
    ],    [
      createPipe(),
      '1122345',
      ['1', '1', '2', '2', '3', '4', '5'],
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
      ]>(
        set.distinct,
      ),
      '1122345',
      ['1', '2', '3', '4', '5'],
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => Number(x)**2),
      ),
      '1122345',
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Iterable<string>,
        Iterable<string>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => Number(x)**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      '1122345',
      [1, 4, 9],
    ],
  ];
}

function dataProviderForSets() {
  return [
    [
      createPipe(),
      new Set(),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      new Set(),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      new Set(),
      [],
    ],
    [
      createPipe(),
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForMaps() {
  return [
    [
      createPipe(),
      new Map(),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      new Map(),
      [],
    ],
    [
      createPipe<[
        Iterable<number>,
        Iterable<number>,
      ]>(
        set.distinct,
      ),
      new Map(),
      [],
    ],
    [

      createPipe(),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 4], [6, 5]],
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
      ]>(
        (input) => single.map(input, ([_, x]) => x**2),
      ),
      createMapFixture([1, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        single.values,
        set.distinct,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        single.values,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
        Map<string, number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
        Iterable<number>,
      ]>(
        single.values,
        set.distinct,
        (input) => single.map(input, (x) => x**2),
        (input) => single.filter(input, (x) => x < 10),
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}
