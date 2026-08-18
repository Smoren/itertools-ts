import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
} from '../fixture';
import { summary } from '../../src';
import { describe, expect, it, jest } from '@jest/globals';

describe.each(dataProviderForTrue())(
  "Summary Is Partitioned Test True",
  (input, predicate) => {
    it("", () => {
      expect(summary.isPartitioned(input, predicate)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForTrue(),
  ...dataProviderForAsyncTrue(),
])(
  "Summary Is Partitioned Async Test True",
  (input, predicate) => {
    it("", async () => {
      expect(
        await summary.isPartitionedAsync(input, predicate)
      ).toBeTruthy();
    });
  }
);

describe.each(dataProviderForFalse())(
  "Summary Is Partitioned Test False",
  (input, predicate) => {
    it("", () => {
      expect(summary.isPartitioned(input, predicate)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForFalse(),
  ...dataProviderForAsyncFalse(),
])(
  "Summary Is Partitioned Async Test False",
  (input, predicate) => {
    it("", async () => {
      expect(
        await summary.isPartitionedAsync(input, predicate)
      ).toBeFalsy();
    });
  }
);

it("Summary Is Partitioned Test Short Circuit", () => {
  const predicate = jest.fn(isEven);

  expect(summary.isPartitioned([2, 1, 4, 6], predicate)).toBeFalsy();
  expect(predicate).toHaveBeenCalledTimes(3);
});

it("Summary Is Partitioned Async Test Short Circuit", async () => {
  const predicate = jest.fn(async (item: number) => isEven(item));

  expect(
    await summary.isPartitionedAsync([2, 1, 4, 6], predicate)
  ).toBeFalsy();
  expect(predicate).toHaveBeenCalledTimes(3);
});

function dataProviderForTrue(): Array<
  [
    Iterable<any> | Iterator<any>,
    ((item: any) => boolean) | undefined,
  ]
> {
  return [
    [[], undefined],
    [[true], undefined],
    [[true, true, false, false], undefined],
    [[false, false], undefined],
    [[2, 4, 1, 3], isEven],
    [createGeneratorFixture([2, 4, 1, 3]), isEven],
    [createIterableFixture([2, 4, 1, 3]), isEven],
    [createIteratorFixture([2, 4, 1, 3]), isEven],
    ['2413', (item: string) => isEven(Number(item))],
    [new Set([2, 4, 1, 3]), isEven],
    [
      createMapFixture([2, 4, 1, 3]),
      (item: [number, number]) => isEven(item[1]),
    ],
  ];
}

function dataProviderForAsyncTrue(): Array<
  [
    AsyncIterable<any> | AsyncIterator<any>,
    ((item: any) => Promise<boolean> | boolean) | undefined,
  ]
> {
  return [
    [createAsyncGeneratorFixture([2, 4, 1, 3]), asyncIsEven],
    [createAsyncIterableFixture([2, 4, 1, 3]), asyncIsEven],
    [createAsyncIteratorFixture([2, 4, 1, 3]), asyncIsEven],
    [createAsyncIterableFixture([true, false]), undefined],
  ];
}

function dataProviderForFalse(): Array<
  [
    Iterable<any> | Iterator<any>,
    ((item: any) => boolean) | undefined,
  ]
> {
  return [
    [[true, false, true], undefined],
    [[2, 1, 4, 3], isEven],
    [createGeneratorFixture([2, 1, 4, 3]), isEven],
    [createIterableFixture([2, 1, 4, 3]), isEven],
    [createIteratorFixture([2, 1, 4, 3]), isEven],
    ['2143', (item: string) => isEven(Number(item))],
    [new Set([2, 1, 4, 3]), isEven],
    [
      createMapFixture([2, 1, 4, 3]),
      (item: [number, number]) => isEven(item[1]),
    ],
  ];
}

function dataProviderForAsyncFalse(): Array<
  [
    AsyncIterable<any> | AsyncIterator<any>,
    (item: any) => Promise<boolean> | boolean,
  ]
> {
  return [
    [createAsyncGeneratorFixture([2, 1, 4, 3]), asyncIsEven],
    [createAsyncIterableFixture([2, 1, 4, 3]), asyncIsEven],
    [createAsyncIteratorFixture([2, 1, 4, 3]), asyncIsEven],
  ];
}

function isEven(item: number): boolean {
  return item % 2 === 0;
}

async function asyncIsEven(item: number): Promise<boolean> {
  return isEven(item);
}
