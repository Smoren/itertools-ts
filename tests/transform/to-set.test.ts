// @ts-ignore
import { createGeneratorFixture, createIterableFixture } from '../fixture';
import { transform } from '../../src';

describe.each(dataProvider() as Array<[Iterable<unknown>|Iterator<unknown>, Array<unknown>]>)(
  "Transform To Set Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = transform.toSet(input);

      // Then
      expect(result instanceof Set).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

function dataProvider(): Array<unknown> {
  return [
    [
      '',
      new Set([]),
    ],
    [
      '123',
      new Set(['1', '2', '3']),
    ],
    [
      '112233',
      new Set(['1', '2', '3']),
    ],
    [
      [],
      new Set([]),
    ],
    [
      [1, 2, 3],
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([]),
      new Set([]),
    ],
    [
      createGeneratorFixture([1]),
      new Set([1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([]),
      new Set([]),
    ],
    [
      createIterableFixture([1]),
      new Set([1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      new Set(),
      new Set([]),
    ],
    [
      new Set([1]),
      new Set([1]),
    ],
    [
      new Set([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      new Set([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      new Map(),
      new Set([]),
    ],
    [
      new Map([['a', 1]]),
      new Set([['a', 1]]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      new Set([['a', 1], ['b', 2], ['c', 3]]),
    ],
  ];
}
