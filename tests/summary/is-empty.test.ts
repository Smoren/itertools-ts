import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue() as Array<[Iterable<unknown>|Iterator<unknown>]>)(
  "Summary Is Empty Test True",
  (input: Iterable<unknown>|Iterator<unknown>) => {
    it("", () => {
      expect(summary.isEmpty(input)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForTrue(),
  ...dataProviderForTrueAsync(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>
]>)(
  "Summary Is Empty Async Test True",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>
  ) => {
    it("", async () => {
      expect(await summary.isEmptyAsync(input)).toBeTruthy();
    });
  }
);

describe.each(dataProviderForFalse() as Array<[Iterable<unknown>|Iterator<unknown>]>)(
  "Summary Is Empty Test False",
  (input: Iterable<unknown>|Iterator<unknown>) => {
    it("", () => {
      expect(summary.isEmpty(input)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForFalse(),
  ...dataProviderForFalseAsync(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>
]>)(
  "Summary Is Empty Async Test False",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>
  ) => {
    it("", async () => {
      expect(await summary.isEmptyAsync(input)).toBeFalsy();
    });
  }
);

function dataProviderForTrue(): Array<unknown> {
  return [
    [[]],
    [createGeneratorFixture([])],
    [createIterableFixture([])],
    [createIteratorFixture([])],
    [''],
    [new Set()],
    [new Set([])],
    [new Map()],
    [new Map([])],
  ];
}

function dataProviderForTrueAsync(): Array<unknown> {
  return [
    [createAsyncGeneratorFixture([])],
    [createAsyncIterableFixture([])],
    [createAsyncIteratorFixture([])],
  ];
}

function dataProviderForFalse(): Array<unknown> {
  return [
    [[null]],
    [createGeneratorFixture([null])],
    [createIterableFixture([null])],
    [createIteratorFixture([null])],
    [new Set([null])],
    [createMapFixture([null])],
    [[undefined]],
    [createGeneratorFixture([undefined])],
    [createIterableFixture([undefined])],
    [createIteratorFixture([undefined])],
    [new Set([undefined])],
    [createMapFixture([undefined])],
    [[1]],
    [createGeneratorFixture([1])],
    [createIterableFixture([1])],
    [createIteratorFixture([1])],
    ['1'],
    [new Set([1])],
    [createMapFixture([1])],
    [[1, 2, 3]],
    [createGeneratorFixture([1, 2, 3])],
    [createIterableFixture([1, 2, 3])],
    [createIteratorFixture([1, 2, 3])],
    [new Set([1, 2, 3])],
    [createMapFixture([1, 2, 3])],
  ];
}

function dataProviderForFalseAsync(): Array<unknown> {
  return [
    [createAsyncGeneratorFixture([null])],
    [createAsyncIterableFixture([null])],
    [createAsyncIteratorFixture([null])],
    [createAsyncGeneratorFixture([undefined])],
    [createAsyncIterableFixture([undefined])],
    [createAsyncIteratorFixture([undefined])],
    [createAsyncGeneratorFixture([1])],
    [createAsyncIterableFixture([1])],
    [createAsyncIteratorFixture([1])],
    [createAsyncGeneratorFixture([1, 2, 3])],
    [createAsyncIterableFixture([1, 2, 3])],
    [createAsyncIteratorFixture([1, 2, 3])],
  ];
}
