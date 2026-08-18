import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
} from '../fixture';
import { InvalidArgumentError, transform } from '../../src';
import { describe, expect, it } from '@jest/globals';

describe.each(dataProvider())(
  'transform.distribute',
  (input, n, expected) => {
    it(`distributes input into ${n} groups`, () => {
      const result = Array.from(transform.distribute(input, n));

      expect(result).toEqual(expected);
    });
  }
);

describe.each(dataProviderAsync())(
  'transform.distributeAsync',
  (input, n, expected) => {
    it(`distributes input into ${n} groups`, async () => {
      const result: any[] = [];
      for await (const group of transform.distributeAsync(input, n)) {
        result.push(group);
      }

      expect(result).toEqual(expected);
    });
  }
);

describe.each(dataProviderForError())(
  'transform.distribute Error Test',
  (input, n) => {
    it(`throws error when distributing into ${n} groups`, () => {
      expect(() => {
        Array.from(transform.distribute(input, n));
      }).toThrow(InvalidArgumentError);
    });
  }
);

describe.each(dataProviderForAsyncError())(
  'transform.distributeAsync Error Test',
  (input, n) => {
    it(`throws error when distributing into ${n} groups`, async () => {
      await expect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of transform.distributeAsync(input as any, n as any)) {
          // noop
        }
      }).rejects.toThrow(InvalidArgumentError);
    });
  }
);

function dataProvider(): Array<[Iterable<any> | Iterator<any>, number, Array<any[]>]> {
  return [
    // Arrays
    [[], 2, [[], []]],
    [[1, 2, 3, 4], 2, [[1, 3], [2, 4]]],
    [[1, 2, 3, 4, 5], 3, [[1, 4], [2, 5], [3]]],
    [[1, 2], 4, [[1], [2], [], []]],

    // Strings
    ['abcde', 2, [['a', 'c', 'e'], ['b', 'd']]],

    // Sets
    [new Set([1, 2, 3, 4]), 2, [[1, 3], [2, 4]]],

    // Maps
    [new Map([['a', 1], ['b', 2], ['c', 3]]), 2,
      [[['a', 1], ['c', 3]], [['b', 2]]]],

    // Generators
    [createGeneratorFixture([1, 2, 3]), 2, [[1, 3], [2]]],

    // Iterables
    [createIterableFixture([1, 2, 3]), 2, [[1, 3], [2]]],

    // Iterators
    [createIteratorFixture([1, 2, 3]), 2, [[1, 3], [2]]],
  ];
}

function dataProviderAsync(): Array<[AsyncIterable<any> | AsyncIterator<any> | Iterable<any> | Iterator<any>, number, Array<any[]>]> {
  return [
    // Async Generators
    [createAsyncGeneratorFixture([1, 2, 3, 4]), 2, [[1, 3], [2, 4]]],

    // Async Iterables
    [createAsyncIterableFixture([1, 2, 3]), 2, [[1, 3], [2]]],

    // Async Iterators
    [createAsyncIteratorFixture([1, 2, 3]), 2, [[1, 3], [2]]],
  ];
}

function dataProviderForError(): Array<[any, any]> {
  return [
    // Invalid 'n'
    [[], 0],
    [[], -1],
    [[1, 2, 3], 0],
    [[1, 2, 3], -5],
    [[1, 2, 3], NaN],
    [[1, 2, 3], Infinity],
    [[1, 2, 3], -Infinity],
    [[1, 2, 3], 1.5],
    [[1, 2, 3], "2"],
    [[1, 2, 3], true],
  ];
}

function dataProviderForAsyncError(): Array<[any, any]> {
  return [
    // Invalid 'n'
    [[], 0],
    [[], -1],
    [[1, 2, 3], 0],
    [[1, 2, 3], -5],
    [[1, 2, 3], NaN],
    [[1, 2, 3], Infinity],
    [[1, 2, 3], -Infinity],
    [[1, 2, 3], 1.5],
    [[1, 2, 3], "2"],
    [[1, 2, 3], true],

    // Non-iterable input
    [1, 2],
    [true, 2],
    [null, 2],
    [undefined, 2],
    [NaN, 2],
  ];
}
