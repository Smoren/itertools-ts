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

describe.each(dataProviderForTrue())(
  "Summary Is Empty Test True",
  (input) => {
    it("", () => {
      expect(summary.isEmpty(input)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForTrue(),
  ...dataProviderForTrueAsync(),
])(
  "Summary Is Empty Async Test True",
  (input) => {
    it("", async () => {
      expect(await summary.isEmptyAsync(input)).toBeTruthy();
    });
  }
);

describe.each(dataProviderForFalse())(
  "Summary Is Empty Test False",
  (input) => {
    it("", () => {
      expect(summary.isEmpty(input)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForFalse(),
  ...dataProviderForFalseAsync(),
])(
  "Summary Is Empty Async Test False",
  (input) => {
    it("", async () => {
      expect(await summary.isEmptyAsync(input)).toBeFalsy();
    });
  }
);

function dataProviderForTrue(): Array<[Iterable<any> | Iterator<any>]> {
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

function dataProviderForTrueAsync(): Array<[AsyncIterable<any> | AsyncIterator<any>]> {
  return [
    [createAsyncGeneratorFixture([])],
    [createAsyncIterableFixture([])],
    [createAsyncIteratorFixture([])],
  ];
}

function dataProviderForFalse(): Array<[any]> {
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

function dataProviderForFalseAsync(): Array<[any]> {
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
