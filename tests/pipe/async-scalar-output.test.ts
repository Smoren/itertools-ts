import type { Pipe } from "../../src";
import { createPipe, infinite, reduce, set, single } from "../../src";
import {
  createGeneratorFixture,
  createAsyncIterableFixture,
  createIteratorFixture,
  createMapFixture,
  createAsyncIteratorFixture,
  createAsyncGeneratorFixture,
  createIterableFixture,
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
  "Pipe Create With Scalar Output Test",
  (pipe, input, expected) => {
    it("", async () => {
      // When
      const result = await (pipe as Pipe<any>)(input);

      // Then
      expect(result).toEqual(expected);
    });
  },
);

function dataProviderForArrays(): Array<[Pipe<any[]> | Pipe<[any, any]>, Array<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      [1, 1, 2, 2, 3, 4, 5],
      3,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Pipe<any[]> | Pipe<[any, any]>, Generator<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForIterables(): Array<[Pipe<any[]> | Pipe<[any, any]>, Iterable<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        (input) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      infinite.count(1, 2),
      10,
    ],
    [
      createPipe(
        (input: AsyncIterable<number>) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      infinite.count(1, 2),
      10,
    ],
    [
      createPipe(
        (input: AsyncIterable<unknown>) => single.mapAsync(input, (x) => Number(x)),
        (input) => single.limitAsync(input, 3),
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
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
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Pipe<any[]> | Pipe<[any, any]>, AsyncGenerator<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Pipe<any[]> | Pipe<[any, any]>, AsyncIterable<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Pipe<any[]> | Pipe<[any, any]>, AsyncIterator<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}

function dataProviderForStrings(): Array<[Pipe<any[]> | Pipe<[any, any]>, string, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<string>,
        Promise<number>,
      ]>(
        reduce.toCountAsync,
      ),
      '1122345',
      7,
    ],
    [
      createPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        reduce.toCountAsync,
      ),
      '1122345',
      5,
    ],
    [
      createPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
        AsyncIterable<number>,
        Promise<number>
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
        reduce.toSumAsync,
      ),
      '1122345',
      55,
    ],
    [
      createPipe<[
        AsyncIterable<string>,
        AsyncIterable<string>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      '1122345',
      3,
    ],
    [
      createPipe(
        set.distinctAsync<string>,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      '1122345',
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<string>)
        .add((input) => single.mapAsync(input, (x) => Number(x)**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      '1122345',
      3,
    ],
    [
      createPipe(set.distinctAsync<string>)
        .add((input) => single.mapAsync(input, (x) => Number(x)**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      '1122345',
      3,
    ],
    [
      createPipe(
        set.distinctAsync<string>,
        (input) => single.mapAsync(input, (x) => Number(x)**2),
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      '1122345',
      3,
    ],
  ];
}

function dataProviderForSets(): Array<[Pipe<any[]> | Pipe<[any, any]>, Set<any>, any]> {
  return [
    [
      createPipe<[
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        reduce.toSumAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(set.distinctAsync<number>)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      new Set([1, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        set.distinctAsync<number>,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
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
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        single.valuesAsync,
        reduce.toSumAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      18,
    ],
    [
      createPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
        reduce.toSumAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      15,
    ],
    [
      createPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        reduce.toSumAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      55,
    ],
    [
      createPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toSumAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      14,
    ],
    [
      createPipe<[
        Map<string, number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        AsyncIterable<number>,
        Promise<number>,
      ]>(
        single.valuesAsync,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        single.valuesAsync<number, number>,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2),
        (input) => single.filterAsync(input, (x) => x < 10),
        reduce.toCountAsync,
      ),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe()
        .add(single.valuesAsync<number, number>)
        .add(set.distinctAsync)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(single.valuesAsync<number, number>)
        .add(set.distinctAsync)
        .add((input) => single.mapAsync(input, (x) => x**2))
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
    [
      createPipe(
        single.valuesAsync<number, number>,
        set.distinctAsync,
        (input) => single.mapAsync(input, (x) => x**2)
      )
        .add((input) => single.filterAsync(input, (x) => x < 10))
        .add(reduce.toCountAsync),
      createMapFixture([1, 1, 2, 2, 3, 4, 5]),
      3,
    ],
  ];
}
