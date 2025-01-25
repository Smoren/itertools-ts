import { Pipe, transform } from "../../src";
import { createPipe, infinite, set, single } from "../../src";
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
])(
  "Async Pipe Create With Iterable Output Test",
  (pipe, input, expected) => {
    it("", async () => {
      const result = await (pipe as Pipe<any>)(input) as AsyncIterable<unknown>;
      expect(await transform.toArrayAsync(result)).toEqual(expected);
    });
  },
);

function dataProviderForArrays(): Array<[Pipe<any[]> | Pipe<[any, any]>, Array<any>, Array<any>]> {
  return [
    [
      // TODO output type never
      createPipe(),
      [],
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      [],
      [],
    ],
    [
      createPipe<[
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
      createPipe(),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      [1, 1, 2, 2, 3, 4, 5],
      [1, 4, 9],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Pipe<any[]> | Pipe<[any, any]>, Generator<any>, Array<any>]> {
  return [
    [
      createPipe(),
      createGeneratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createGeneratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createGeneratorFixture([]),
      [],
    ],
    [
      createPipe(),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForIterables(): Array<[Pipe<any[]> | Pipe<[any, any]>, Iterable<any>, Array<any>]> {
  return [
    [
      createPipe(),
      createIterableFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIterableFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
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
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe<[
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
    [
      createPipe(
        (input: AsyncIterable<number>) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      infinite.count(1, 2),
      [1, 9],
    ],
    [
      createPipe(
        (input: AsyncIterable<unknown>) => single.mapAsync(input, (x) => Number(x)),
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

function dataProviderForIterators(): Array<[Pipe<any[]> | Pipe<[any, any]>, Iterator<any>, Array<any>]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIteratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIteratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Pipe<any[]> | Pipe<[any, any]>, AsyncGenerator<any>, Array<any>]> {
  return [
    [
      createPipe(),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createPipe(),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Pipe<any[]> | Pipe<[any, any]>, AsyncIterable<any>, Array<any>]> {
  return [
    [
      createPipe(),
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createPipe(),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 1, 2, 2, 3, 4, 5],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Pipe<any[]> | Pipe<[any, any]>, AsyncIterator<any>, Array<any>]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForStrings(): Array<[Pipe<any[]> | Pipe<[any, any]>, string, Array<any>]> {
  return [
    [
      createPipe(),
      '',
      [],
    ],
    [
      createPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
      ]>(
        set.distinctAsync,
      ),
      '',
      [],
    ],
    [
      createPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
      ]>(
        set.distinctAsync,
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
        AsyncIterable<string>,
        AsyncIterable<string>,
      ]>(
        set.distinctAsync,
      ),
      '1122345',
      ['1', '2', '3', '4', '5'],
    ],
    [
      createPipe<[
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
      createPipe<[
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
    [
      createPipe(
        set.distinctAsync<string>,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      '1122345',
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<string>)
        .add((input) => single.mapAsync(input, (x) => Number(x)**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      '1122345',
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<string>)
        .add((input) => single.mapAsync(input, (x) => Number(x)**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      '1122345',
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<string>,
        (input) => single.mapAsync(input, (x) => Number(x)**2)
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      '1122345',
      [1, 4, 9],
    ],
  ];
}

function dataProviderForSets(): Array<[Pipe<any[]> | Pipe<[any, any]>, Set<any>, Array<any>]> {
  return [
    [
      createPipe(),
      new Set(),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Set(),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
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
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 2, 3, 4, 5],
    ],
    [
      createPipe<[
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
      createPipe<[
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
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
      ).add((input) => single.filterAsync(input, (x) => x < 10)),
      new Set([1, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}

function dataProviderForMaps(): Array<[Pipe<any[]> | Pipe<[any, any]>, Map<any, any>, Array<any>]> {
  return [
    [
      createPipe(),
      new Map(),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
      ),
      new Map(),
      [],
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
      ]>(
        set.distinctAsync,
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
        AsyncIterable<number>,
      ]>(
        (input) => single.mapAsync(input, ([_, x]) => x**2),
      ),
      createMapFixture([1, 2, 3, 4, 5]),
      [1, 4, 9, 16, 25],
    ],
    [
      createPipe<[
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
      createPipe<[
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
      createPipe<[
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
    [
      createPipe(
        single.valuesAsync<number, number>,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe()
        .add(single.valuesAsync<number, number>)
        .add(set.distinctAsync)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(single.valuesAsync<number, number>)
        .add(set.distinctAsync)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
    [
      createPipe(
        single.valuesAsync<number, number>,
        set.distinctAsync,
      )
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10)),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      [1, 4, 9],
    ],
  ];
}
