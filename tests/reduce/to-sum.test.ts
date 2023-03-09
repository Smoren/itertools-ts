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
  ...dataProviderForMaps(),
])("Reduce To Sum Test", (input, expected) => {
  it("", () => {
    // When
    const result = reduce.toSum(input as Iterable<number>|Map<unknown, number>);

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
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
      1,
    ],
    [
      [false, true],
      1,
    ],
    [
      [0, null, false],
      0,
    ],
    [
      [1, null, false],
      1,
    ],
    [
      [1, null, true],
      2,
    ],
    [
      [1, 2, 3],
      6,
    ],
    [
      [1.1, 2.2, 3.3],
      6.6,
    ],
    [
      [1.1, 2, 3.3],
      6.4,
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
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
      1,
    ],
    [
      createGeneratorFixture([false, true]),
      1,
    ],
    [
      createGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, false]),
      1,
    ],
    [
      createGeneratorFixture([1, null, true]),
      2,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      6,
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createGeneratorFixture([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
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
      1,
    ],
    [
      createIterableFixture([false, true]),
      1,
    ],
    [
      createIterableFixture([0, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, false]),
      1,
    ],
    [
      createIterableFixture([1, null, true]),
      2,
    ],
    [
      createIterableFixture([1, 2, 3]),
      6,
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createIterableFixture([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
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
      1,
    ],
    [
      createIteratorFixture([false, true]),
      1,
    ],
    [
      createIteratorFixture([0, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, false]),
      1,
    ],
    [
      createIteratorFixture([1, null, true]),
      2,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      6,
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createIteratorFixture([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      0,
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
      '123',
      6,
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
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
      1,
    ],
    [
      new Set([false, true]),
      1,
    ],
    [
      new Set([0, null, false]),
      0,
    ],
    [
      new Set([1, null, false]),
      1,
    ],
    [
      new Set([1, null, true]),
      2,
    ],
    [
      new Set([1, 2, 3]),
      6,
    ],
    [
      new Set([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      new Set([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      0,
    ],
    [
      createMapFixture([0]),
      0,
    ],
    [
      createMapFixture([null]),
      0,
    ],
    [
      createMapFixture([false]),
      0,
    ],
    [
      createMapFixture([null, null]),
      0,
    ],
    [
      createMapFixture([null, false]),
      0,
    ],
    [
      createMapFixture([true, false]),
      1,
    ],
    [
      createMapFixture([false, true]),
      1,
    ],
    [
      createMapFixture([0, null, false]),
      0,
    ],
    [
      createMapFixture([1, null, false]),
      1,
    ],
    [
      createMapFixture([1, null, true]),
      2,
    ],
    [
      createMapFixture([1, 2, 3]),
      6,
    ],
    [
      createMapFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createMapFixture([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}
