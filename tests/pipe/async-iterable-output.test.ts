import { Pipe, AsyncPipe, AsyncPipeOperationSequence, transform } from "../../src";
import { createAsyncPipe, infinite, set, single } from "../../src";
import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  // @ts-ignore
} from "../fixture";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[AsyncPipe<any>, AsyncIterable<number> | AsyncIterator<number>, AsyncPipeOperationSequence<unknown[]>, Array<unknown>]>)(
  "Async Pipe Create With Iterable Output Test",
  (
    pipe: Pipe<any>,
    input: AsyncIterable<number> | AsyncIterator<number>,
    expected: Array<unknown>,
  ) => {
    it("", async () => {
      const result = await pipe(input) as Iterable<unknown>;
      expect(await transform.toArrayAsync(result)).toEqual(expected);
    });
  },
);

function dataProviderForArrays() {
  return [
    [
      // TODO output type never
      createAsyncPipe(),
      [],
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      [],
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      [],
      [],
    ],
    [
      // TODO output type never
      createAsyncPipe(),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9],
    ],
  ];
}

function dataProviderForGenerators() {
  return [
    [
      createAsyncPipe(),
      createGeneratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createGeneratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createGeneratorFixture([]),
      [],
    ],
    [
      createAsyncPipe(),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        (input) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
  ];
}

function dataProviderForIterables() {
  return [
    [
      createAsyncPipe(),
      createIterableFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIterableFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIterableFixture([]),
      [],
    ],
    [
      createAsyncPipe(),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        (input) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
  ];
}

function dataProviderForIterators() {
  return [
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIteratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIteratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForAsyncGenerators() {
  return [
    [
      createAsyncPipe(),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncPipe(),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        (input) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
  ];
}

function dataProviderForAsyncIterables() {
  return [
    [
      createAsyncPipe(),
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncPipe(),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        (input) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
  ];
}

function dataProviderForAsyncIterators() {
  return [
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForStrings() {
  return [
    [
      createAsyncPipe(),
      '',
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
      ]>(
        set.distinctAsync,
      ),
      '',
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
      ]>(
        set.distinctAsync,
      ),
      '',
      [],
    ],    [
      createAsyncPipe(),
      '1122345',
      ['1', '1', '2', '2', '3', '4', '5'],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
      ]>(
        set.distinctAsync,
      ),
      '1122345',
      ['1', '2', '3', '4', '5'],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
      ),
      '1122345',
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      '1122345',
      [1, 4, 9],
    ],
  ];
}

function dataProviderForSets() {
  return [
    [
      createAsyncPipe(),
      new Set(),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Set(),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Set(),
      [],
    ],
    [
      createAsyncPipe(),
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForMaps() {
  return [
    [
      createAsyncPipe(),
      new Map(),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Map(),
      [],
    ],
    [
      createAsyncPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Map(),
      [],
    ],
    [

      createAsyncPipe(),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 4], [6, 5]],
    ],
    [
      createAsyncPipe<[
        Map<string, number>,
        AsyncIterable<number>,
      ]>(
        (input) => single.mapAsync(input, ([_, x]) => x**2),
      ),
      createMapFixture([1, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createAsyncPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}
