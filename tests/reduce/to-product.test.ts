// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])("Reduce To Product Test", (input, expected) => {
  it("", () => {
    // When
    const result = reduce.toProduct(input as Iterable<number>);

    // Then
    if (expected === undefined) {
      expect(result).toEqual(expected);
    } else {
      expect(result).toBeCloseTo(expected as number);
    }
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      undefined,
    ],
    [
      [0],
      0,
    ],
    [
      [null],
      0,
    ],
    [
      [false],
      0,
    ],
    [
      [null, null],
      0,
    ],
    [
      [null, false],
      0,
    ],
    [
      [true, false],
      0,
    ],
    [
      [false, true],
      0,
    ],
    [
      [0, null, false],
      0,
    ],
    [
      [1, null, false],
      0,
    ],
    [
      [1, null, true],
      0,
    ],
    [
      [2, 2, 3],
      12,
    ],
    [
      [1.1, 2.2, 3.3],
      7.986,
    ],
    [
      [1.1, 2, 3.3],
      7.26,
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
    ],
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([null]),
      0,
    ],
    [
      createGeneratorFixture([false]),
      0,
    ],
    [
      createGeneratorFixture([null, null]),
      0,
    ],
    [
      createGeneratorFixture([null, false]),
      0,
    ],
    [
      createGeneratorFixture([true, false]),
      0,
    ],
    [
      createGeneratorFixture([false, true]),
      0,
    ],
    [
      createGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, true]),
      0,
    ],
    [
      createGeneratorFixture([2, 2, 3]),
      12,
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createGeneratorFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      undefined,
    ],
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([null]),
      0,
    ],
    [
      createIterableFixture([false]),
      0,
    ],
    [
      createIterableFixture([null, null]),
      0,
    ],
    [
      createIterableFixture([null, false]),
      0,
    ],
    [
      createIterableFixture([true, false]),
      0,
    ],
    [
      createIterableFixture([false, true]),
      0,
    ],
    [
      createIterableFixture([0, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, true]),
      0,
    ],
    [
      createIterableFixture([2, 2, 3]),
      12,
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createIterableFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      undefined,
    ],
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([null]),
      0,
    ],
    [
      createIteratorFixture([false]),
      0,
    ],
    [
      createIteratorFixture([null, null]),
      0,
    ],
    [
      createIteratorFixture([null, false]),
      0,
    ],
    [
      createIteratorFixture([true, false]),
      0,
    ],
    [
      createIteratorFixture([false, true]),
      0,
    ],
    [
      createIteratorFixture([0, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, true]),
      0,
    ],
    [
      createIteratorFixture([2, 2, 3]),
      12,
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createIteratorFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      undefined,
    ],
    [
      '0',
      0,
    ],
    [
      '00',
      0,
    ],
    [
      '01',
      0,
    ],
    [
      '10',
      0,
    ],
    [
      '011',
      0,
    ],
    [
      '223',
      12,
    ],
    [
      '123',
      6,
    ],
    [
      '12345',
      120,
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      undefined,
    ],
    [
      new Set([0]),
      0,
    ],
    [
      new Set([null]),
      0,
    ],
    [
      new Set([false]),
      0,
    ],
    [
      new Set([null, null]),
      0,
    ],
    [
      new Set([null, false]),
      0,
    ],
    [
      new Set([true, false]),
      0,
    ],
    [
      new Set([false, true]),
      0,
    ],
    [
      new Set([0, null, false]),
      0,
    ],
    [
      new Set([1, null, false]),
      0,
    ],
    [
      new Set([1, null, true]),
      0,
    ],
    [
      new Set([2, 3, 4]),
      24,
    ],
    [
      new Set([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      new Set([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}
