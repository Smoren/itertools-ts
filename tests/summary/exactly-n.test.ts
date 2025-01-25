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
import { toAsyncIterable } from "../../src/transform";

describe.each([
  ...dataProviderForArraysExactlyNWithDefaultPredicateZeroTrue(),
  ...dataProviderForGeneratorsExactlyNWithDefaultPredicateZeroTrue(),
  ...dataProviderForIterablesExactlyNWithDefaultPredicateZeroTrue(),
  ...dataProviderForIteratorsExactlyNWithDefaultPredicateZeroTrue(),
  ...dataProviderForStringsExactlyNWithDefaultPredicateZeroTrue(),
  ...dataProviderForSetsExactlyNWithDefaultPredicateZeroTrue(),
])(
  "Summary Exactly N Test With Default Predicate When N is Zero",
  (input, _) => {
    it("", () => {
      expect(summary.exactlyN(input, 0)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForArraysExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForGeneratorsExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForIterablesExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForIteratorsExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForStringsExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForSetsExactlyNWithDefaultPredicateNegativeFalse(),
])(
  "Summary Exactly N Test With Default Predicate When N is Negative",
  (input, _) => {
    it("", () => {
      expect(summary.exactlyN(input, -1)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForArraysExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForGeneratorsExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForIterablesExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForIteratorsExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForStringsExactlyNWithDefaultPredicateNegativeFalse(),
  ...dataProviderForSetsExactlyNWithDefaultPredicateNegativeFalse(),
])(
  "Summary Exactly N Test With Default Predicate When N is Negative (false)",
  (input, _) => {
    it("", async () => {
      expect(await summary.exactlyNAsync(input, -1)).toBeFalsy();
      expect(await summary.exactlyNAsync(toAsyncIterable(input), -1)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForArraysExactlyNTrue(),
  ...dataProviderForGeneratorsExactlyNTrue(),
  ...dataProviderForIterablesExactlyNTrue(),
  ...dataProviderForIteratorsExactlyNTrue(),
  ...dataProviderForStringsExactlyNTrue(),
  ...dataProviderForSetsExactlyNTrue(),
])(
  "Summary Exactly N Test When N Matches",
  (input, n) => {
    it("", () => {
      expect(summary.exactlyN(input, n)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForArraysExactlyNFalse(),
  ...dataProviderForGeneratorsExactlyNFalse(),
  ...dataProviderForIterablesExactlyNFalse(),
  ...dataProviderForIteratorsExactlyNFalse(),
  ...dataProviderForStringsExactlyNFalse(),
  ...dataProviderForSetsExactlyNFalse(),
])(
  "Summary Exactly N Test When N Doesn't Match",
  (input, n) => {
    it("", () => {
      expect(summary.exactlyN(input, n)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsExactlyNTrue(),
  ...dataProviderForAsyncIterablesExactlyNTrue(),
  ...dataProviderForAsyncIteratorsExactlyNTrue(),
  ...dataProviderForArraysExactlyNTrue(),
  ...dataProviderForGeneratorsExactlyNTrue(),
  ...dataProviderForIterablesExactlyNTrue(),
  ...dataProviderForIteratorsExactlyNTrue(),
  ...dataProviderForStringsExactlyNTrue(),
  ...dataProviderForSetsExactlyNTrue(),
])(
  "Summary Exactly N Async Test When N Matches",
  (input, n) => {
    it("", async () => {
      expect(await summary.exactlyNAsync(input, n)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsExactlyNFalse(),
  ...dataProviderForAsyncIterablesExactlyNFalse(),
  ...dataProviderForAsyncIteratorsExactlyNFalse(),
  ...dataProviderForArraysExactlyNFalse(),
  ...dataProviderForGeneratorsExactlyNFalse(),
  ...dataProviderForIterablesExactlyNFalse(),
  ...dataProviderForIteratorsExactlyNFalse(),
  ...dataProviderForStringsExactlyNFalse(),
  ...dataProviderForSetsExactlyNFalse(),
])(
  "Summary Exactly N Async Test When N Doesn't Match",
  (input, n) => {
    it("", async () => {
      expect(await summary.exactlyNAsync(input, n)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForExactlyNWithPredicateTrue(),
  ...dataProviderForGeneratorsExactlyNWithPredicateTrue(),
  ...dataProviderForIterablesExactlyNWithPredicateTrue(),
  ...dataProviderForIteratorsExactlyNWithPredicateTrue(),
  ...dataProviderForStringsExactlyNWithPredicateTrue(),
  ...dataProviderForSetsExactlyNWithPredicateTrue(),
  ...dataProviderForMapsExactlyNWithPredicateTrue(),
])(
  "Summary Exactly N Test With Predicate Non Zero NWhen N Matches",
  (input, n, predicate) => {
    it("", () => {
      expect(summary.exactlyN(input, n, predicate)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForExactlyNWithPredicateFalse(),
  ...dataProviderForGeneratorsExactlyNWithPredicateFalse(),
  ...dataProviderForIterablesExactlyNWithPredicateFalse(),
  ...dataProviderForIteratorsExactlyNWithPredicateFalse(),
  ...dataProviderForStringsExactlyNWithPredicateFalse(),
  ...dataProviderForSetsExactlyNWithPredicateFalse(),
  ...dataProviderForMapsExactlyNWithPredicateFalse(),
])(
  "Summary Exactly N Test With Predicate Non Zero NWhen N Doesn't Match",
  (input, n, predicate) => {
    it("", () => {
      expect(summary.exactlyN(input, n, predicate)).toBeFalsy();
    });
  }
);

function dataProviderForArraysExactlyNTrue(): Array<[Array<any>, number]> {
  return [
    [
      [1],
      1,
    ],
    [
      [2],
      1,
    ],
    [
      ['a'],
      1,
    ],
    [
      [[5]],
      1,
    ],
    [
      [{}],
      1,
    ],
    [
      [1, 2],
      2,
    ],
    [
      [1, 1, 1],
      3,
    ],
    [
      [1, 2.2, '3', 'four'],
      4,
    ],
    [
      [0],
      0,
    ],
    [
      [0, 0, 0, 34],
      1,
    ],
    [
      [true, true, false],
      2,
    ],
    [
      [false, false, true],
      1,
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      24,
    ],
  ];
}

function dataProviderForGeneratorsExactlyNTrue(): Array<[Generator<any>, number]> {
  return [
    [
      createGeneratorFixture([1]),
      1,
    ],
    [
      createGeneratorFixture([2]),
      1,
    ],
    [
      createGeneratorFixture(['a']),
      1,
    ],
    [
      createGeneratorFixture([[5]]),
      1,
    ],
    [
      createGeneratorFixture([{}]),
      1,
    ],
    [
      createGeneratorFixture([1, 2]),
      2,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      3,
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createGeneratorFixture([true, true, false]),
      2,
    ],
    [
      createGeneratorFixture([false, false, true]),
      1,
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForIterablesExactlyNTrue(): Array<[Iterable<any>, number]> {
  return [
    [
      createIterableFixture([1]),
      1,
    ],
    [
      createIterableFixture([2]),
      1,
    ],
    [
      createIterableFixture(['a']),
      1,
    ],
    [
      createIterableFixture([[5]]),
      1,
    ],
    [
      createIterableFixture([{}]),
      1,
    ],
    [
      createIterableFixture([1, 2]),
      2,
    ],
    [
      createIterableFixture([1, 1, 1]),
      3,
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createIterableFixture([true, true, false]),
      2,
    ],
    [
      createIterableFixture([false, false, true]),
      1,
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForIteratorsExactlyNTrue(): Array<[Iterator<any>, number]> {
  return [
    [
      createIteratorFixture([1]),
      1,
    ],
    [
      createIteratorFixture([2]),
      1,
    ],
    [
      createIteratorFixture(['a']),
      1,
    ],
    [
      createIteratorFixture([[5]]),
      1,
    ],
    [
      createIteratorFixture([{}]),
      1,
    ],
    [
      createIteratorFixture([1, 2]),
      2,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      3,
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createIteratorFixture([true, true, false]),
      2,
    ],
    [
      createIteratorFixture([false, false, true]),
      1,
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForStringsExactlyNTrue(): Array<[string, number]> {
  return [
    [
      '',
      0,
    ],
    [
      'a',
      1,
    ],
    [
      ' c',
      2,
    ],
    [
      'abc',
      3,
    ],
    [
      'true',
      4,
    ],
    [
      'false',
      5,
    ],
  ];
}

function dataProviderForSetsExactlyNTrue(): Array<[Set<any>, number]> {
  return [
    [
      new Set([1]),
      1,
    ],
    [
      new Set([2]),
      1,
    ],
    [
      new Set(['a']),
      1,
    ],
    [
      new Set([[5]]),
      1,
    ],
    [
      new Set([{}]),
      1,
    ],
    [
      new Set([1, 2]),
      2,
    ],
    [
      new Set([1, 2.2, '3', 'four']),
      4,
    ],
    [
      new Set([0]),
      0,
    ],
  ];
}

function dataProviderForArraysExactlyNFalse(): Array<[Array<any>, number]> {
  return [
    [
      [1],
      0,
    ],
    [
      [1],
      2,
    ],
    [
      ['a'],
      2,
    ],
    [
      [[5]],
      6,
    ],
    [
      [{}],
      0,
    ],
    [
      [1, 2],
      1,
    ],
    [
      [1, 2],
      3,
    ],
    [
      [1, 1, 1],
      2,
    ],
    [
      [1, 1, 1],
      4,
    ],
    [
      [1, 2.2, '3', 'four'],
      3,
    ],
    [
      [0],
      1,
    ],
    [
      [0, 0, 0, 34],
      4,
    ],
    [
      [true, true, false],
      3,
    ],
    [
      [false, false, true],
      2,
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      10,
    ],
  ];
}

function dataProviderForGeneratorsExactlyNFalse(): Array<[Generator<any>, number]> {
  return [
    [
      createGeneratorFixture([1]),
      0,
    ],
    [
      createGeneratorFixture([1]),
      2,
    ],
    [
      createGeneratorFixture(['a']),
      2,
    ],
    [
      createGeneratorFixture([[5]]),
      6,
    ],
    [
      createGeneratorFixture([{}]),
      0,
    ],
    [
      createGeneratorFixture([1, 2]),
      1,
    ],
    [
      createGeneratorFixture([1, 2]),
      3,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      2,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      4,
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createGeneratorFixture([0]),
      1,
    ],
    [
      createGeneratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createGeneratorFixture([true, true, false]),
      3,
    ],
    [
      createGeneratorFixture([false, false, true]),
      2,
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForIterablesExactlyNFalse(): Array<[Iterable<any>, number]> {
  return [
    [
      createIterableFixture([1]),
      0,
    ],
    [
      createIterableFixture([1]),
      2,
    ],
    [
      createIterableFixture(['a']),
      2,
    ],
    [
      createIterableFixture([[5]]),
      6,
    ],
    [
      createIterableFixture([{}]),
      0,
    ],
    [
      createIterableFixture([1, 2]),
      1,
    ],
    [
      createIterableFixture([1, 2]),
      3,
    ],
    [
      createIterableFixture([1, 1, 1]),
      2,
    ],
    [
      createIterableFixture([1, 1, 1]),
      4,
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createIterableFixture([0]),
      1,
    ],
    [
      createIterableFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createIterableFixture([true, true, false]),
      3,
    ],
    [
      createIterableFixture([false, false, true]),
      2,
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForIteratorsExactlyNFalse(): Array<[Iterator<any>, number]> {
  return [
    [
      createIteratorFixture([1]),
      0,
    ],
    [
      createIteratorFixture([1]),
      2,
    ],
    [
      createIteratorFixture(['a']),
      2,
    ],
    [
      createIteratorFixture([[5]]),
      6,
    ],
    [
      createIteratorFixture([{}]),
      0,
    ],
    [
      createIteratorFixture([1, 2]),
      1,
    ],
    [
      createIteratorFixture([1, 2]),
      3,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      2,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      4,
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createIteratorFixture([0]),
      1,
    ],
    [
      createIteratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createIteratorFixture([true, true, false]),
      3,
    ],
    [
      createIteratorFixture([false, false, true]),
      2,
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForStringsExactlyNFalse(): Array<[string, number]> {
  return [
    [
      '',
      1,
    ],
    [
      'a',
      0,
    ],
    [
      'abc',
      4,
    ],
    [
      'true',
      1,
    ],
    [
      'false',
      0,
    ],
  ];
}

function dataProviderForSetsExactlyNFalse(): Array<[Set<any>, number]> {
  return [
    [
      new Set([1]),
      0,
    ],
    [
      new Set([1]),
      2,
    ],
    [
      new Set(['a']),
      2,
    ],
    [
      new Set([[5]]),
      6,
    ],
    [
      new Set([{}]),
      0,
    ],
    [
      new Set([1, 2]),
      1,
    ],
    [
      new Set([1, 2]),
      3,
    ],
    [
      new Set([1, 1, 1]),
      2,
    ],
    [
      new Set([1, 1, 1]),
      4,
    ],
    [
      new Set([1, 2.2, '3', 'four']),
      3,
    ],
    [
      new Set([0]),
      1,
    ],
    [
      new Set([0, 0, 0, 34]),
      4,
    ],
    [
      new Set([true, true, false]),
      3,
    ],
    [
      new Set([false, false, true]),
      2,
    ],
    [
      new Set([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForAsyncGeneratorsExactlyNTrue(): Array<[AsyncGenerator<any>, number]> {
  return [
    [
      createAsyncGeneratorFixture([1]),
      1,
    ],
    [
      createAsyncGeneratorFixture([2]),
      1,
    ],
    [
      createAsyncGeneratorFixture(['a']),
      1,
    ],
    [
      createAsyncGeneratorFixture([[5]]),
      1,
    ],
    [
      createAsyncGeneratorFixture([{}]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createAsyncGeneratorFixture([0]),
      0,
    ],
    [
      createAsyncGeneratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createAsyncGeneratorFixture([true, true, false]),
      2,
    ],
    [
      createAsyncGeneratorFixture([false, false, true]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForAsyncIterablesExactlyNTrue(): Array<[AsyncIterable<any>, number]> {
  return [
    [
      createAsyncIterableFixture([1]),
      1,
    ],
    [
      createAsyncIterableFixture([2]),
      1,
    ],
    [
      createAsyncIterableFixture(['a']),
      1,
    ],
    [
      createAsyncIterableFixture([[5]]),
      1,
    ],
    [
      createAsyncIterableFixture([{}]),
      1,
    ],
    [
      createAsyncIterableFixture([1, 2]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      3,
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createAsyncIterableFixture([0]),
      0,
    ],
    [
      createAsyncIterableFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createAsyncIterableFixture([true, true, false]),
      2,
    ],
    [
      createAsyncIterableFixture([false, false, true]),
      1,
    ],
    [
      createAsyncIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForAsyncIteratorsExactlyNTrue(): Array<[AsyncIterator<any>, number]> {
  return [
    [
      createAsyncIteratorFixture([1]),
      1,
    ],
    [
      createAsyncIteratorFixture([2]),
      1,
    ],
    [
      createAsyncIteratorFixture(['a']),
      1,
    ],
    [
      createAsyncIteratorFixture([[5]]),
      1,
    ],
    [
      createAsyncIteratorFixture([{}]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      3,
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createAsyncIteratorFixture([0]),
      0,
    ],
    [
      createAsyncIteratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createAsyncIteratorFixture([true, true, false]),
      2,
    ],
    [
      createAsyncIteratorFixture([false, false, true]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForAsyncGeneratorsExactlyNFalse(): Array<[AsyncGenerator<any>, number]> {
  return [
    [
      createAsyncGeneratorFixture([1]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1]),
      2,
    ],
    [
      createAsyncGeneratorFixture(['a']),
      2,
    ],
    [
      createAsyncGeneratorFixture([[5]]),
      6,
    ],
    [
      createAsyncGeneratorFixture([{}]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      4,
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createAsyncGeneratorFixture([0]),
      1,
    ],
    [
      createAsyncGeneratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createAsyncGeneratorFixture([true, true, false]),
      3,
    ],
    [
      createAsyncGeneratorFixture([false, false, true]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForAsyncIterablesExactlyNFalse(): Array<[AsyncIterable<any>, number]> {
  return [
    [
      createAsyncIterableFixture([1]),
      0,
    ],
    [
      createAsyncIterableFixture([1]),
      2,
    ],
    [
      createAsyncIterableFixture(['a']),
      2,
    ],
    [
      createAsyncIterableFixture([[5]]),
      6,
    ],
    [
      createAsyncIterableFixture([{}]),
      0,
    ],
    [
      createAsyncIterableFixture([1, 2]),
      1,
    ],
    [
      createAsyncIterableFixture([1, 2]),
      3,
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      4,
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createAsyncIterableFixture([0]),
      1,
    ],
    [
      createAsyncIterableFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createAsyncIterableFixture([true, true, false]),
      3,
    ],
    [
      createAsyncIterableFixture([false, false, true]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForAsyncIteratorsExactlyNFalse(): Array<[AsyncIterator<any>, number]> {
  return [
    [
      createAsyncIteratorFixture([1]),
      0,
    ],
    [
      createAsyncIteratorFixture([1]),
      2,
    ],
    [
      createAsyncIteratorFixture(['a']),
      2,
    ],
    [
      createAsyncIteratorFixture([[5]]),
      6,
    ],
    [
      createAsyncIteratorFixture([{}]),
      0,
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      3,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      4,
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createAsyncIteratorFixture([0]),
      1,
    ],
    [
      createAsyncIteratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createAsyncIteratorFixture([true, true, false]),
      3,
    ],
    [
      createAsyncIteratorFixture([false, false, true]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForArraysExactlyNWithDefaultPredicateZeroTrue(): Array<[Array<any>, number]> {
  return [
    [
      [],
      0,
    ],
    [
      [0],
      0,
    ],
    [
      [''],
      0,
    ],
    [
      [false],
      0,
    ],
  ];
}

function dataProviderForGeneratorsExactlyNWithDefaultPredicateZeroTrue(): Array<[Generator<any>, number]> {
  return [
    [
      createGeneratorFixture([]),
      0,
    ],
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture(['']),
      0,
    ],
    [
      createGeneratorFixture([false]),
      0,
    ],
  ];
}

function dataProviderForIterablesExactlyNWithDefaultPredicateZeroTrue(): Array<[Iterable<any>, number]> {
  return [
    [
      createIterableFixture([]),
      0,
    ],
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture(['']),
      0,
    ],
    [
      createIterableFixture([false]),
      0,
    ],
  ];
}

function dataProviderForIteratorsExactlyNWithDefaultPredicateZeroTrue(): Array<[Iterator<any>, number]> {
  return [
    [
      createIteratorFixture([]),
      0,
    ],
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture(['']),
      0,
    ],
    [
      createIteratorFixture([false]),
      0,
    ],
  ];
}

function dataProviderForStringsExactlyNWithDefaultPredicateZeroTrue(): Array<[string, number]> {
  return [
    [
      '',
      0,
    ],
  ];
}

function dataProviderForSetsExactlyNWithDefaultPredicateZeroTrue(): Array<[Set<any>, number]> {
  return [
    [
      new Set([]),
      0,
    ],
    [
      new Set([0]),
      0,
    ],
    [
      new Set(['']),
      0,
    ],
    [
      new Set([false]),
      0,
    ],
  ];
}

function dataProviderForArraysExactlyNWithDefaultPredicateNegativeFalse(): Array<[Array<any>, number]> {
  return [
    [
      [],
      -1,
    ],
    [
      [0],
      -1,
    ],
    [
      [''],
      -1,
    ],
    [
      [false],
      -1,
    ],
  ];
}

function dataProviderForGeneratorsExactlyNWithDefaultPredicateNegativeFalse(): Array<[Generator<any>, number]> {
  return [
    [
      createGeneratorFixture([]),
      -1,
    ],
    [
      createGeneratorFixture([0]),
      -1,
    ],
    [
      createGeneratorFixture(['']),
      -1,
    ],
    [
      createGeneratorFixture([false]),
      -1,
    ],
  ];
}

function dataProviderForIterablesExactlyNWithDefaultPredicateNegativeFalse(): Array<[Iterable<any>, number]> {
  return [
    [
      createIterableFixture([]),
      -1,
    ],
    [
      createIterableFixture([0]),
      -1,
    ],
    [
      createIterableFixture(['']),
      -1,
    ],
    [
      createIterableFixture([false]),
      -1,
    ],
  ];
}

function dataProviderForIteratorsExactlyNWithDefaultPredicateNegativeFalse(): Array<[Iterator<any>, number]> {
  return [
    [
      createIteratorFixture([]),
      -1,
    ],
    [
      createIteratorFixture([0]),
      -1,
    ],
    [
      createIteratorFixture(['']),
      -1,
    ],
    [
      createIteratorFixture([false]),
      -1,
    ],
  ];
}

function dataProviderForStringsExactlyNWithDefaultPredicateNegativeFalse(): Array<[string, number]> {
  return [
    [
      '',
      -1,
    ],
    [
      '123',
      -1,
    ],
  ];
}

function dataProviderForSetsExactlyNWithDefaultPredicateNegativeFalse(): Array<[Set<any>, number]> {
  return [
    [
      new Set([]),
      -1,
    ],
    [
      new Set([0]),
      -1,
    ],
    [
      new Set(['']),
      -1,
    ],
    [
      new Set([false]),
      -1,
    ],
  ];
}

function dataProviderForExactlyNWithPredicateTrue(): Array<[Array<any>, number, (x: any) => boolean]> {
  return [
    [
      [1],
      1,
      (x: number) => x === 1,
    ],
    [
      [1],
      1,
      (x: number) => x >= 1,
    ],
    [
      [2],
      1,
      (x: number) => x >= 1,
    ],
    [
      ['a'],
      1,
      (x: string) => typeof x === 'string',
    ],
    [
      [[5]],
      1,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      [{}],
      1,
      (x: object) => typeof x === 'object',
    ],
    [
      [1, 2],
      2,
      (x: number) => x < 3,
    ],
    [
      [1, 1, 1],
      3,
      (x: number) => x === 1,
    ],
    [
      [1, 2.2, '3', 'four'],
      4,
      (x: number) => x < 3 || typeof x === 'string',
    ],
    [
      [1, 2.2, '3', 'four', 5, ['what']],
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      [1, 2.2, '3', 'four', 5, ['what'], 2.9, -5],
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      [0],
      1,
      (x: number) => x === 0,
    ],
    [
      [0],
      0,
      (x: number) => x !== 0,
    ],
    [
      [0, 0, 0, 34],
      1,
      (x: number) => x > 0,
    ],
    [
      [1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5],
      9,
      (x: number) => x % 2 === 1,
    ],
    [
      [1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5],
      2,
      (x: number) => x % 2 === 0,
    ],
    [
      [false, false, true],
      2,
      (x: boolean) => !x,
    ],
    [
      [false, true, true],
      1,
      (x: boolean) => !x,
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      24,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForGeneratorsExactlyNWithPredicateTrue(): Array<[Generator<any>, number, (x: any) => boolean]> {
  return [
    [
      createGeneratorFixture([1]),
      1,
      (x: number) => x === 1,
    ],
    [
      createGeneratorFixture([1]),
      1,
      (x: number) => x >= 1,
    ],
    [
      createGeneratorFixture([2]),
      1,
      (x: number) => x >= 1,
    ],
    [
      createGeneratorFixture(['a']),
      1,
      (x: string) =>typeof x === 'string',
    ],
    [
      createGeneratorFixture([[5]]),
      1,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      createGeneratorFixture([{}]),
      1,
      (x: object) => typeof x === 'object',
    ],
    [
      createGeneratorFixture([1, 2]),
      2,
      (x: number) => x < 3,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      3,
      (x: number) => x === 1,
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four']),
      4,
      (x: number) => x < 3 || typeof x === 'string',
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four', 5, ['what']]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four', 5, ['what'], 2.9, -5]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createGeneratorFixture([0]),
      1,
      (x: number) => x === 0,
    ],
    [
      createGeneratorFixture([0]),
      0,
      (x: number) => x !== 0,
    ],
    [
      createGeneratorFixture([0, 0, 0, 34]),
      1,
      (x: number) => x > 0,
    ],
    [
      createGeneratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      9,
      (x: number) => x % 2 === 1,
    ],
    [
      createGeneratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      2,
      (x: number) => x % 2 === 0,
    ],
    [
      createGeneratorFixture([false, false, true]),
      2,
      (x: boolean) => !x,
    ],
    [
      createGeneratorFixture([false, true, true]),
      1,
      (x: boolean) => !x,
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForIterablesExactlyNWithPredicateTrue(): Array<[Iterable<any>, number, (x: any) => boolean]> {
  return [
    [
      createIterableFixture([1]),
      1,
      (x: number) => x === 1,
    ],
    [
      createIterableFixture([1]),
      1,
      (x: number) => x >= 1,
    ],
    [
      createIterableFixture([2]),
      1,
      (x: number) => x >= 1,
    ],
    [
      createIterableFixture(['a']),
      1,
      (x: string) => typeof x === 'string',
    ],
    [
      createIterableFixture([[5]]),
      1,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      createIterableFixture([{}]),
      1,
      (x: object) => typeof x === 'object',
    ],
    [
      createIterableFixture([1, 2]),
      2,
      (x: number) => x < 3,
    ],
    [
      createIterableFixture([1, 1, 1]),
      3,
      (x: number) => x === 1,
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four']),
      4,
      (x: number | string) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four', 5, ['what']]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four', 5, ['what'], 2.9, -5]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIterableFixture([0]),
      1,
      (x: number) => x === 0,
    ],
    [
      createIterableFixture([0]),
      0,
      (x: number) => x !== 0,
    ],
    [
      createIterableFixture([0, 0, 0, 34]),
      1,
      (x: number) => x > 0,
    ],
    [
      createIterableFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      9,
      (x: number) => x % 2 === 1,
    ],
    [
      createIterableFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      2,
      (x: number) => x % 2 === 0,
    ],
    [
      createIterableFixture([false, false, true]),
      2,
      (x: boolean) => !x,
    ],
    [
      createIterableFixture([false, true, true]),
      1,
      (x: boolean) => !x,
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForIteratorsExactlyNWithPredicateTrue(): Array<[Iterator<any>, number, (x: any) => boolean]> {
  return [
    [
      createIteratorFixture([1]),
      1,
      (x: number) => x === 1,
    ],
    [
      createIteratorFixture([1]),
      1,
      (x: number) => x >= 1,
    ],
    [
      createIteratorFixture([2]),
      1,
      (x: number) => x >= 1,
    ],
    [
      createIteratorFixture(['a']),
      1,
      (x: string) => typeof x === 'string',
    ],
    [
      createIteratorFixture([[5]]),
      1,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      createIteratorFixture([{}]),
      1,
      (x: object) => typeof x === 'object',
    ],
    [
      createIteratorFixture([1, 2]),
      2,
      (x: number) => x < 3,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      3,
      (x: number) => x === 1,
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four']),
      4,
      (x: number | string) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four', 5, ['what']]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four', 5, ['what'], 2.9, -5]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIteratorFixture([0]),
      1,
      (x: number) => x === 0,
    ],
    [
      createIteratorFixture([0]),
      0,
      (x: number) => x !== 0,
    ],
    [
      createIteratorFixture([0, 0, 0, 34]),
      1,
      (x: number) => x > 0,
    ],
    [
      createIteratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      9,
      (x: number) => x % 2 === 1,
    ],
    [
      createIteratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      2,
      (x: number) => x % 2 === 0,
    ],
    [
      createIteratorFixture([false, false, true]),
      2,
      (x: boolean) => !x,
    ],
    [
      createIteratorFixture([false, true, true]),
      1,
      (x: boolean) => !x,
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForStringsExactlyNWithPredicateTrue(): Array<[string, number, (x: any) => boolean]> {
  return [
    [
      '',
      0,
      (x: string) => x === '',
    ],
    [
      '0',
      1,
      (x: string) => x === '0',
    ],
    [
      '1',
      1,
      (x: string) => x === '1',
    ],
    [
      '111',
      3,
      (x: string) => x === '1',
    ],
    [
      '1a1',
      2,
      (x: string) => x === '1',
    ],
    [
      'a',
      1,
      (x: string) => typeof x === 'string',
    ],
  ];
}

function dataProviderForSetsExactlyNWithPredicateTrue(): Array<[Set<any>, number, (x: any) => boolean]> {
  return [
    [
      new Set([1]),
      1,
      (x: number) => x === 1,
    ],
    [
      new Set([1]),
      1,
      (x: number) => x >= 1,
    ],
    [
      new Set([2]),
      1,
      (x: number) => x >= 1,
    ],
    [
      new Set(['a']),
      1,
      (x: string) => typeof x === 'string',
    ],
    [
      new Set([[5]]),
      1,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      new Set([{}]),
      1,
      (x: object) => typeof x === 'object',
    ],
    [
      new Set([1, 2]),
      2,
      (x: number) => x < 3,
    ],
    [
      new Set([1, 2.2, '3', 'four']),
      4,
      (x: number | string) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      new Set([1, 2.2, '3', 'four', 5, ['what']]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      new Set([1, 2.2, '3', 'four', 5, ['what'], 2.9, -5]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      new Set([0]),
      1,
      (x: number) => x === 0,
    ],
    [
      new Set([0]),
      0,
      (x: number) => x !== 0,
    ],
  ];
}

function dataProviderForMapsExactlyNWithPredicateTrue(): Array<[Map<any, any>, number, (x: any) => boolean]> {
  return [
    [
      createMapFixture([1]),
      1,
      (x:  [unknown, number]) =>  x[1] === 1,
    ],
    [
      createMapFixture([1]),
      1,
      (x: [unknown, number]) => x[1] >= 1,
    ],
    [
      createMapFixture([2]),
      1,
      (x: [unknown, number]) => x[1] >= 1,
    ],
    [
      createMapFixture(['a']),
      1,
      (x: [unknown, string]) => typeof x[1] === 'string',
    ],
    [
      createMapFixture([[5]]),
      1,
      (x: [unknown, Array<unknown>]) => Array.isArray(x[1]),
    ],
    [
      createMapFixture([{}]),
      1,
      (x: [unknown, object]) => typeof x[1] === 'object',
    ],
    [
      createMapFixture([1, 2]),
      2,
      (x:  [unknown, number]) => x[1] < 3,
    ],
    [
      createMapFixture([1, 1, 1]),
      3,
      (x: [unknown, number]) => x[1] === 1,
    ],
    [
      createMapFixture([1, 2.2, '3', 'four']),
      4,
      (x: [unknown, number | string]) => (x[1] as number) < 3 || typeof x[1] === 'string',
    ],
    [
      createMapFixture([1, 2.2, '3', 'four', 5, ['what']]),
      4,
      (x: [unknown, number | string | Array<unknown>]) => (x[1] as number) < 3 || typeof x[1] === 'string',
    ],
    [
      createMapFixture([1, 2.2, '3', 'four', 5, ['what'], 2.9, -5]),
      6,
      (x: [unknown, number | string | Array<unknown>]) => (x[1] as number) < 3 || typeof x[1] === 'string',
    ],
    [
      createMapFixture([0]),
      1,
      (x: [unknown, number]) => x[1] === 0,
    ],
    [
      createMapFixture([0]),
      0,
      (x: [unknown, number]) => x[1] !== 0,
    ],
    [
      createMapFixture([0, 0, 0, 34]),
      1,
      (x: [unknown, number]) => x[1] > 0,
    ],
    [
      createMapFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      9,
      (x: [unknown, number]) => x[1] % 2 === 1,
    ],
    [
      createMapFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      2,
      (x: [unknown, number]) => x[1] % 2 === 0,
    ],
    [
      createMapFixture([false, false, true]),
      2,
      (x: [unknown, boolean]) => !x[1],
    ],
    [
      createMapFixture([false, true, true]),
      1,
      (x: [unknown, boolean]) => !x[1],
    ],
    [
      createMapFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
      (x: [unknown, number]) => x[1] === 1,
    ],
  ];
}

function dataProviderForExactlyNWithPredicateFalse(): Array<[Iterable<any>, number, (x: any) => boolean]> {
  return [
    [
      [1],
      0,
      (x: number) => x === 1,
    ],
    [
      [1],
      2,
      (x: number) => x >= 1,
    ],
    [
      [2],
      3,
      (x: number) => x >= 1,
    ],
    [
      ['a'],
      0,
      (x: string) => typeof x === 'string',
    ],
    [
      [[5]],
      2,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      [{}],
      0,
      (x: object) => typeof x === 'object',
    ],
    [
      [1, 2],
      1,
      (x: number) => x < 3,
    ],
    [
      [1, 1, 1],
      2,
      (x: number) => x === 1,
    ],
    [
      [1, 2.2, '3', 'four'],
      5,
      (x: number) => x < 3 || typeof x === 'string',
    ],
    [
      [1, 2.2, '3', 'four', 5, ['what'], [2]],
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      [1, 2.2, '3', 'four', 5, ['what'], [2], 2.9, -5],
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      [0],
      0,
      (x: number) => x === 0,
    ],
    [
      [0],
      1,
      (x: number) => x !== 0,
    ],
    [
      [0, 0, 0, 34],
      4,
      (x: number) => x > 0,
    ],
    [
      [1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5],
      8,
      (x: number) => x % 2 === 1,
    ],
    [
      [1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5],
      3,
      (x: number) => x % 2 === 0,
    ],
    [
      [false, false, true],
      1,
      (x: boolean) => !x,
    ],
    [
      [false, true, true],
      2,
      (x: boolean) => !x,
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      10,
      (x: number) => x === 1
    ],
  ];
}

function dataProviderForGeneratorsExactlyNWithPredicateFalse(): Array<[Generator<any>, number, (x: any) => boolean]> {
  return [
    [
      createGeneratorFixture([1]),
      0,
      (x: number) => x === 1,
    ],
    [
      createGeneratorFixture([1]),
      2,
      (x: number) => x >= 1,
    ],
    [
      createGeneratorFixture([2]),
      3,
      (x: number) => x >= 1,
    ],
    [
      createGeneratorFixture(['a']),
      0,
      (x: string) =>typeof x === 'string',
    ],
    [
      createGeneratorFixture([[5]]),
      2,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      createGeneratorFixture([{}]),
      0,
      (x: object) => typeof x === 'object',
    ],
    [
      createGeneratorFixture([1, 2]),
      1,
      (x: number) => x < 3,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      2,
      (x: number) => x === 1,
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four']),
      5,
      (x: number) => x < 3 || typeof x === 'string',
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four', 5, ['what'], [2]]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four', 5, ['what'], [2], 2.9, -5]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createGeneratorFixture([0]),
      0,
      (x: number) => x === 0,
    ],
    [
      createGeneratorFixture([0]),
      1,
      (x: number) => x !== 0,
    ],
    [
      createGeneratorFixture([0, 0, 0, 34]),
      4,
      (x: number) => x > 0,
    ],
    [
      createGeneratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      8,
      (x: number) => x % 2 === 1,
    ],
    [
      createGeneratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      3,
      (x: number) => x % 2 === 0,
    ],
    [
      createGeneratorFixture([false, false, true]),
      1,
      (x: boolean) => !x,
    ],
    [
      createGeneratorFixture([false, true, true]),
      2,
      (x: boolean) => !x,
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForIterablesExactlyNWithPredicateFalse(): Array<[Iterable<any>, number, (x: any) => boolean]> {
  return [
    [
      createIterableFixture([1]),
      0,
      (x: number) => x === 1,
    ],
    [
      createIterableFixture([1]),
      2,
      (x: number) => x >= 1,
    ],
    [
      createIterableFixture([2]),
      3,
      (x: number) => x >= 1,
    ],
    [
      createIterableFixture(['a']),
      0,
      (x: string) => typeof x === 'string',
    ],
    [
      createIterableFixture([[5]]),
      2,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      createIterableFixture([{}]),
      0,
      (x: object) => typeof x === 'object',
    ],
    [
      createIterableFixture([1, 2]),
      1,
      (x: number) => x < 3,
    ],
    [
      createIterableFixture([1, 1, 1]),
      2,
      (x: number) => x === 1,
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four']),
      5,
      (x: number | string) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four', 5, ['what'], [2]]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four', 5, ['what'], [2], 2.9, -5]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIterableFixture([0]),
      0,
      (x: number) => x === 0,
    ],
    [
      createIterableFixture([0]),
      1,
      (x: number) => x !== 0,
    ],
    [
      createIterableFixture([0, 0, 0, 34]),
      4,
      (x: number) => x > 0,
    ],
    [
      createIterableFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      8,
      (x: number) => x % 2 === 1,
    ],
    [
      createIterableFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      3,
      (x: number) => x % 2 === 0,
    ],
    [
      createIterableFixture([false, false, true]),
      1,
      (x: boolean) => !x,
    ],
    [
      createIterableFixture([false, true, true]),
      2,
      (x: boolean) => !x,
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForIteratorsExactlyNWithPredicateFalse(): Array<[Iterator<any>, number, (x: any) => boolean]> {
  return [
    [
      createIteratorFixture([1]),
      0,
      (x: number) => x === 1,
    ],
    [
      createIteratorFixture([1]),
      2,
      (x: number) => x >= 1,
    ],
    [
      createIteratorFixture([2]),
      3,
      (x: number) => x >= 1,
    ],
    [
      createIteratorFixture(['a']),
      0,
      (x: string) => typeof x === 'string',
    ],
    [
      createIteratorFixture([[5]]),
      2,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      createIteratorFixture([{}]),
      0,
      (x: object) => typeof x === 'object',
    ],
    [
      createIteratorFixture([1, 2]),
      1,
      (x: number) => x < 3,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      2,
      (x: number) => x === 1,
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four']),
      5,
      (x: number | string) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four', 5, ['what'], [2]]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four', 5, ['what'], [2], 2.9, -5]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      createIteratorFixture([0]),
      0,
      (x: number) => x === 0,
    ],
    [
      createIteratorFixture([0]),
      1,
      (x: number) => x !== 0,
    ],
    [
      createIteratorFixture([0, 0, 0, 34]),
      4,
      (x: number) => x > 0,
    ],
    [
      createIteratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      8,
      (x: number) => x % 2 === 1,
    ],
    [
      createIteratorFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      3,
      (x: number) => x % 2 === 0,
    ],
    [
      createIteratorFixture([false, false, true]),
      1,
      (x: boolean) => !x,
    ],
    [
      createIteratorFixture([false, true, true]),
      2,
      (x: boolean) => !x,
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
      (x: number) => x === 1,
    ],
  ];
}

function dataProviderForStringsExactlyNWithPredicateFalse(): Array<[string, number, (x: any) => boolean]> {
  return [
    [
      '',
      1,
      (x: string) => x === '',
    ],
    [
      '0',
      0,
      (x: string) => x === '0',
    ],
    [
      '1',
      0,
      (x: string) => x === '1',
    ],
    [
      '11',
      1,
      (x: string) => x === '1',
    ],
    [
      '1a1',
      3,
      (x: string) => x === '1',
    ],
    [
      'a',
      0,
      (x: string) => typeof x === 'string',
    ],
  ];
}

function dataProviderForSetsExactlyNWithPredicateFalse(): Array<[Set<any>, number, (x: any) => boolean]> {
  return [
    [
      new Set([1]),
      0,
      (x: number) => x === 1,
    ],
    [
      new Set([1]),
      2,
      (x: number) => x >= 1,
    ],
    [
      new Set([2]),
      3,
      (x: number) => x >= 1,
    ],
    [
      new Set(['a']),
      0,
      (x: string) => typeof x === 'string',
    ],
    [
      new Set([[5]]),
      2,
      (x: Array<unknown>) => Array.isArray(x),
    ],
    [
      new Set([{}]),
      0,
      (x: object) => typeof x === 'object',
    ],
    [
      new Set([1, 2]),
      1,
      (x: number) => x < 3,
    ],
    [
      new Set([1, 2.2, '3', 'four']),
      5,
      (x: number | string) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      new Set([1, 2.2, '3', 'four', 5, ['what'], [2]]),
      6,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      new Set([1, 2.2, '3', 'four', 5, ['what'], [2], 2.9, -5]),
      4,
      (x: number | string | Array<unknown>) => (x as number) < 3 || typeof x === 'string',
    ],
    [
      new Set([0]),
      0,
      (x: number) => x === 0,
    ],
    [
      new Set([0]),
      1,
      (x: number) => x !== 0,
    ],
  ];
}

function dataProviderForMapsExactlyNWithPredicateFalse(): Array<[Map<any, any>, number, (x: any) => boolean]> {
  return [
    [
      createMapFixture([1]),
      0,
      (x:  [unknown, number]) =>  x[1] === 1,
    ],
    [
      createMapFixture([1]),
      2,
      (x: [unknown, number]) => x[1] >= 1,
    ],
    [
      createMapFixture([2]),
      3,
      (x: [unknown, number]) => x[1] >= 1,
    ],
    [
      createMapFixture(['a']),
      0,
      (x: [unknown, string]) => typeof x[1] === 'string',
    ],
    [
      createMapFixture([[5]]),
      2,
      (x: [unknown, Array<unknown>]) => Array.isArray(x[1]),
    ],
    [
      createMapFixture([{}]),
      0,
      (x: [unknown, object]) => typeof x[1] === 'object',
    ],
    [
      createMapFixture([1, 2]),
      1,
      (x:  [unknown, number]) => x[1] < 3,
    ],
    [
      createMapFixture([1, 1, 1]),
      2,
      (x: [unknown, number]) => x[1] === 1,
    ],
    [
      createMapFixture([1, 2.2, '3', 'four']),
      5,
      (x: [unknown, number | string]) => (x[1] as number) < 3 || typeof x[1] === 'string',
    ],
    [
      createMapFixture([1, 2.2, '3', 'four', 5, ['what'], [2]]),
      6,
      (x: [unknown, number | string | Array<unknown>]) => (x[1] as number) < 3 || typeof x[1] === 'string',
    ],
    [
      createMapFixture([1, 2.2, '3', 'four', 5, ['what'], [2], 2.9, -5]),
      4,
      (x: [unknown, number | string | Array<unknown>]) => (x[1] as number) < 3 || typeof x[1] === 'string',
    ],
    [
      createMapFixture([0]),
      0,
      (x: [unknown, number]) => x[1] === 0,
    ],
    [
      createMapFixture([0]),
      1,
      (x: [unknown, number]) => x[1] !== 0,
    ],
    [
      createMapFixture([0, 0, 0, 34]),
      4,
      (x: [unknown, number]) => x[1] > 0,
    ],
    [
      createMapFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      8,
      (x: [unknown, number]) => x[1] % 2 === 1,
    ],
    [
      createMapFixture([1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5]),
      3,
      (x: [unknown, number]) => x[1] % 2 === 0,
    ],
    [
      createMapFixture([false, false, true]),
      1,
      (x: [unknown, boolean]) => !x[1],
    ],
    [
      createMapFixture([false, true, true]),
      2,
      (x: [unknown, boolean]) => !x[1],
    ],
    [
      createMapFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
      (x: [unknown, number]) => x[1] === 1,
    ],
  ];
}
