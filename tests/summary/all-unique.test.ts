import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from '../fixture';
import { summary } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
])(
  "Summary All Unique Test True",
  (input) => {
    it("", () => {
      expect(summary.allUnique(input)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsTrue(),
  ...dataProviderForAsyncIterablesTrue(),
  ...dataProviderForAsyncIteratorsTrue(),
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
])(
  "Summary All Unique Async Test True",
  (input) => {
    it("", async () => {
      expect(await summary.allUniqueAsync(input)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
])(
  "Summary All Unique Test False",
  (input) => {
    it("", () => {
      expect(summary.allUnique(input)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsFalse(),
  ...dataProviderForAsyncIterablesFalse(),
  ...dataProviderForAsyncIteratorsFalse(),
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
])(
  "Summary All Unique Async Test False",
  (input) => {
    it("", async () => {
      expect(await summary.allUniqueAsync(input)).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<[Array<any>]> {
  return [
    [[]],
    [[undefined]],
    [[null]],
    [[false]],
    [[1]],
    [['1']],
    [[[]]],
    [[{}]],
    [[1, 2, 3]],
    [['1', '2', '3']],
    [['1', 1, true]],
    [[0, null, undefined, false]],
    [[[], [], []]],
    [[[1], [1], [1]]],
    [[{}, {}, {}]],
    [[{a: 1}, {a: 1}, {a: 1}]],
  ];
}

function dataProviderForGeneratorsTrue(): Array<[Generator<any>]> {
  return [
    [createGeneratorFixture([])],
    [createGeneratorFixture([undefined])],
    [createGeneratorFixture([null])],
    [createGeneratorFixture([false])],
    [createGeneratorFixture([1])],
    [createGeneratorFixture(['1'])],
    [createGeneratorFixture([[]])],
    [createGeneratorFixture([{}])],
    [createGeneratorFixture([1, 2, 3])],
    [createGeneratorFixture(['1', '2', '3'])],
    [createGeneratorFixture(['1', 1, true])],
    [createGeneratorFixture([0, null, undefined, false])],
    [createGeneratorFixture([[], [], []])],
    [createGeneratorFixture([[1], [1], [1]])],
    [createGeneratorFixture([{}, {}, {}])],
    [createGeneratorFixture([{a: 1}, {a: 1}, {a: 1}])],
  ];
}

function dataProviderForIterablesTrue(): Array<[Iterable<any>]> {
  return [
    [createIterableFixture([])],
    [createIterableFixture([undefined])],
    [createIterableFixture([null])],
    [createIterableFixture([false])],
    [createIterableFixture([1])],
    [createIterableFixture(['1'])],
    [createIterableFixture([[]])],
    [createIterableFixture([{}])],
    [createIterableFixture([1, 2, 3])],
    [createIterableFixture(['1', '2', '3'])],
    [createIterableFixture(['1', 1, true])],
    [createIterableFixture([0, null, undefined, false])],
    [createIterableFixture([[], [], []])],
    [createIterableFixture([[1], [1], [1]])],
    [createIterableFixture([{}, {}, {}])],
    [createIterableFixture([{a: 1}, {a: 1}, {a: 1}])],
  ];
}

function dataProviderForIteratorsTrue(): Array<[Iterator<any>]> {
  return [
    [createIteratorFixture([])],
    [createIteratorFixture([undefined])],
    [createIteratorFixture([null])],
    [createIteratorFixture([false])],
    [createIteratorFixture([1])],
    [createIteratorFixture(['1'])],
    [createIteratorFixture([[]])],
    [createIteratorFixture([{}])],
    [createIteratorFixture([1, 2, 3])],
    [createIteratorFixture(['1', '2', '3'])],
    [createIteratorFixture(['1', 1, true])],
    [createIteratorFixture([0, null, undefined, false])],
    [createIteratorFixture([[], [], []])],
    [createIteratorFixture([[1], [1], [1]])],
    [createIteratorFixture([{}, {}, {}])],
    [createIteratorFixture([{a: 1}, {a: 1}, {a: 1}])],
  ];
}

function dataProviderForStringsTrue(): Array<[string]> {
  return [
    [''],
    ['1'],
    ['123'],
    ['abc'],
  ];
}

function dataProviderForSetsTrue(): Array<[Set<any>]> {
  return [
    [new Set([])],
    [new Set([undefined])],
    [new Set([null])],
    [new Set([false])],
    [new Set([1])],
    [new Set(['1'])],
    [new Set([[]])],
    [new Set([{}])],
    [new Set([1, 2, 3])],
    [new Set(['1', '2', '3'])],
    [new Set(['1', 1, true])],
    [new Set([0, null, undefined, false])],
    [new Set([[], [], []])],
    [new Set([[1], [1], [1]])],
    [new Set([{}, {}, {}])],
    [new Set([{a: 1}, {a: 1}, {a: 1}])],
    [new Set([1, 1, 1, 2, 2, 2, 3, 3, 3])],
  ];
}

function dataProviderForAsyncGeneratorsTrue(): Array<[AsyncGenerator<any>]> {
  return [
    [createAsyncGeneratorFixture([])],
    [createAsyncGeneratorFixture([undefined])],
    [createAsyncGeneratorFixture([null])],
    [createAsyncGeneratorFixture([false])],
    [createAsyncGeneratorFixture([1])],
    [createAsyncGeneratorFixture(['1'])],
    [createAsyncGeneratorFixture([[]])],
    [createAsyncGeneratorFixture([{}])],
    [createAsyncGeneratorFixture([1, 2, 3])],
    [createAsyncGeneratorFixture(['1', '2', '3'])],
    [createAsyncGeneratorFixture(['1', 1, true])],
    [createAsyncGeneratorFixture([0, null, undefined, false])],
    [createAsyncGeneratorFixture([[], [], []])],
    [createAsyncGeneratorFixture([[1], [1], [1]])],
    [createAsyncGeneratorFixture([{}, {}, {}])],
    [createAsyncGeneratorFixture([{a: 1}, {a: 1}, {a: 1}])],
  ];
}

function dataProviderForAsyncIterablesTrue(): Array<[AsyncIterable<any>]> {
  return [
    [createAsyncIterableFixture([])],
    [createAsyncIterableFixture([undefined])],
    [createAsyncIterableFixture([null])],
    [createAsyncIterableFixture([false])],
    [createAsyncIterableFixture([1])],
    [createAsyncIterableFixture(['1'])],
    [createAsyncIterableFixture([[]])],
    [createAsyncIterableFixture([{}])],
    [createAsyncIterableFixture([1, 2, 3])],
    [createAsyncIterableFixture(['1', '2', '3'])],
    [createAsyncIterableFixture(['1', 1, true])],
    [createAsyncIterableFixture([0, null, undefined, false])],
    [createAsyncIterableFixture([[], [], []])],
    [createAsyncIterableFixture([[1], [1], [1]])],
    [createAsyncIterableFixture([{}, {}, {}])],
    [createAsyncIterableFixture([{a: 1}, {a: 1}, {a: 1}])],
  ];
}

function dataProviderForAsyncIteratorsTrue(): Array<[AsyncIterator<any>]> {
  return [
    [createAsyncIteratorFixture([])],
    [createAsyncIteratorFixture([undefined])],
    [createAsyncIteratorFixture([null])],
    [createAsyncIteratorFixture([false])],
    [createAsyncIteratorFixture([1])],
    [createAsyncIteratorFixture(['1'])],
    [createAsyncIteratorFixture([[]])],
    [createAsyncIteratorFixture([{}])],
    [createAsyncIteratorFixture([1, 2, 3])],
    [createAsyncIteratorFixture(['1', '2', '3'])],
    [createAsyncIteratorFixture(['1', 1, true])],
    [createAsyncIteratorFixture([0, null, undefined, false])],
    [createAsyncIteratorFixture([[], [], []])],
    [createAsyncIteratorFixture([[1], [1], [1]])],
    [createAsyncIteratorFixture([{}, {}, {}])],
    [createAsyncIteratorFixture([{a: 1}, {a: 1}, {a: 1}])],
  ];
}

function dataProviderForArraysFalse(): Array<[Array<any>]> {
  return [
    [[1, 1]],
    [[1, 1, 1]],
    [[1, 2, 3, 1]],
    [['1', '2', '3', '1']],
    [['1', '2', '1', '3', '1']],
    [[0, null, undefined, false, null]],
    [[undefined, undefined, null]],
  ];
}

function dataProviderForGeneratorsFalse(): Array<[Generator<any>]> {
  return [
    [createGeneratorFixture([1, 1])],
    [createGeneratorFixture([1, 1, 1])],
    [createGeneratorFixture([1, 2, 3, 1])],
    [createGeneratorFixture(['1', '2', '3', '1'])],
    [createGeneratorFixture(['1', '2', '1', '3', '1'])],
    [createGeneratorFixture([0, null, undefined, false, null])],
    [createGeneratorFixture([undefined, undefined, null])],
  ];
}

function dataProviderForIterablesFalse(): Array<[Iterable<any>]> {
  return [
    [createIterableFixture([1, 1])],
    [createIterableFixture([1, 1, 1])],
    [createIterableFixture([1, 2, 3, 1])],
    [createIterableFixture(['1', '2', '3', '1'])],
    [createIterableFixture(['1', '2', '1', '3', '1'])],
    [createIterableFixture([0, null, undefined, false, null])],
    [createIterableFixture([undefined, undefined, null])],
  ];
}

function dataProviderForStringsFalse(): Array<[string]> {
  return [
    ['11'],
    ['111'],
    ['1231'],
    ['12131'],
    ['1234500'],
  ];
}

function dataProviderForIteratorsFalse(): Array<[Iterator<any>]> {
  return [
    [createIteratorFixture([1, 1])],
    [createIteratorFixture([1, 1, 1])],
    [createIteratorFixture([1, 2, 3, 1])],
    [createIteratorFixture(['1', '2', '3', '1'])],
    [createIteratorFixture(['1', '2', '1', '3', '1'])],
    [createIteratorFixture([0, null, undefined, false, null])],
    [createIteratorFixture([undefined, undefined, null])],
  ];
}

function dataProviderForAsyncGeneratorsFalse(): Array<[AsyncGenerator<any>]> {
  return [
    [createAsyncGeneratorFixture([1, 1])],
    [createAsyncGeneratorFixture([1, 1, 1])],
    [createAsyncGeneratorFixture([1, 2, 3, 1])],
    [createAsyncGeneratorFixture(['1', '2', '3', '1'])],
    [createAsyncGeneratorFixture(['1', '2', '1', '3', '1'])],
    [createAsyncGeneratorFixture([0, null, undefined, false, null])],
    [createAsyncGeneratorFixture([undefined, undefined, null])],
  ];
}

function dataProviderForAsyncIterablesFalse(): Array<[AsyncIterable<any>]> {
  return [
    [createAsyncIterableFixture([1, 1])],
    [createAsyncIterableFixture([1, 1, 1])],
    [createAsyncIterableFixture([1, 2, 3, 1])],
    [createAsyncIterableFixture(['1', '2', '3', '1'])],
    [createAsyncIterableFixture(['1', '2', '1', '3', '1'])],
    [createAsyncIterableFixture([0, null, undefined, false, null])],
    [createAsyncIterableFixture([undefined, undefined, null])],
  ];
}

function dataProviderForAsyncIteratorsFalse(): Array<[AsyncIterator<any>]> {
  return [
    [createAsyncIteratorFixture([1, 1])],
    [createAsyncIteratorFixture([1, 1, 1])],
    [createAsyncIteratorFixture([1, 2, 3, 1])],
    [createAsyncIteratorFixture(['1', '2', '3', '1'])],
    [createAsyncIteratorFixture(['1', '2', '1', '3', '1'])],
    [createAsyncIteratorFixture([0, null, undefined, false, null])],
    [createAsyncIteratorFixture([undefined, undefined, null])],
  ];
}
