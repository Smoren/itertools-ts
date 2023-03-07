// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Single Pairwise Test", (input, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of single.pairwise(input as Iterable<unknown>)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [1],
      [],
    ],
    [
      [1, 2],
      [[1, 2]],
    ],
    [
      [1, 2, 3],
      [[1, 2], [2, 3]],
    ],
    [
      [1, 2, 3, 4],
      [[1, 2], [2, 3], [3, 4]],
    ],
    [
      [1, 2, 3, 4, 5],
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [1.1, 2.2, 3.3, 4.4, 5.5],
      [[1.1, 2.2], [2.2, 3.3], [3.3, 4.4], [4.4, 5.5]],
    ],
    [
      ['1', '2', '3', '4', '5'],
      [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']],
    ],
    [
      [[1], [2], [3], [4], [5]],
      [[[1], [2]], [[2], [3]], [[3], [4]], [[4], [5]]],
    ],
    [
      [true, true, false, false],
      [[true, true], [true, false], [false, false]],
    ],
    [
      [1, 2.2, '3', [4], true, null, 'test data'],
      [[1, 2.2], [2.2, '3'], ['3', [4]], [[4], true], [true, null], [null, 'test data']],
    ],
    [
      ['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe'],
      [['Ross', 'Rachel'], ['Rachel', 'Chandler'], ['Chandler', 'Monica'], ['Monica', 'Joey'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      [],
    ],
    [
      createGeneratorFixture([1]),
      [],
    ],
    [
      createGeneratorFixture([1, 2]),
      [[1, 2]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [[1, 2], [2, 3]],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4]),
      [[1, 2], [2, 3], [3, 4]],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[1.1, 2.2], [2.2, 3.3], [3.3, 4.4], [4.4, 5.5]],
    ],
    [
      createGeneratorFixture(['1', '2', '3', '4', '5']),
      [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']],
    ],
    [
      createGeneratorFixture([[1], [2], [3], [4], [5]]),
      [[[1], [2]], [[2], [3]], [[3], [4]], [[4], [5]]],
    ],
    [
      createGeneratorFixture([true, true, false, false]),
      [[true, true], [true, false], [false, false]],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[1, 2.2], [2.2, '3'], ['3', [4]], [[4], true], [true, null], [null, 'test data']],
    ],
    [
      createGeneratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [['Ross', 'Rachel'], ['Rachel', 'Chandler'], ['Chandler', 'Monica'], ['Monica', 'Joey'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      [],
    ],
    [
      createIterableFixture([1]),
      [],
    ],
    [
      createIterableFixture([1, 2]),
      [[1, 2]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [[1, 2], [2, 3]],
    ],
    [
      createIterableFixture([1, 2, 3, 4]),
      [[1, 2], [2, 3], [3, 4]],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[1.1, 2.2], [2.2, 3.3], [3.3, 4.4], [4.4, 5.5]],
    ],
    [
      createIterableFixture(['1', '2', '3', '4', '5']),
      [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']],
    ],
    [
      createIterableFixture([[1], [2], [3], [4], [5]]),
      [[[1], [2]], [[2], [3]], [[3], [4]], [[4], [5]]],
    ],
    [
      createIterableFixture([true, true, false, false]),
      [[true, true], [true, false], [false, false]],
    ],
    [
      createIterableFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[1, 2.2], [2.2, '3'], ['3', [4]], [[4], true], [true, null], [null, 'test data']],
    ],
    [
      createIterableFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [['Ross', 'Rachel'], ['Rachel', 'Chandler'], ['Chandler', 'Monica'], ['Monica', 'Joey'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      []
    ],
    [
      createIteratorFixture([1]),
      []
    ],
    [
      createIteratorFixture([1, 2]),
      [[1, 2]]
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [[1, 2], [2, 3]]
    ],
    [
      createIteratorFixture([1, 2, 3, 4]),
      [[1, 2], [2, 3], [3, 4]]
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [[1, 2], [2, 3], [3, 4], [4, 5]]
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[1.1, 2.2], [2.2, 3.3], [3.3, 4.4], [4.4, 5.5]]
    ],
    [
      createIteratorFixture(['1', '2', '3', '4', '5']),
      [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']]
    ],
    [
      createIteratorFixture([[1], [2], [3], [4], [5]]),
      [[[1], [2]], [[2], [3]], [[3], [4]], [[4], [5]]]
    ],
    [
      createIteratorFixture([true, true, false, false]),
      [[true, true], [true, false], [false, false]]
    ],
    [
      createIteratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[1, 2.2], [2.2, '3'], ['3', [4]], [[4], true], [true, null], [null, 'test data']]
    ],
    [
      createIteratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [['Ross', 'Rachel'], ['Rachel', 'Chandler'], ['Chandler', 'Monica'], ['Monica', 'Joey'], ['Joey', 'Phoebe']]
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      [],
    ],
    [
      '1',
      [],
    ],
    [
      '12',
      [['1', '2']],
    ],
    [
      '123',
      [['1', '2'], ['2', '3']],
    ],
    [
      '1234',
      [['1', '2'], ['2', '3'], ['3', '4']],
    ],
    [
      '12345',
      [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      [],
    ],
    [
      new Set([1]),
      [],
    ],
    [
      new Set([1, 2]),
      [[1, 2]],
    ],
    [
      new Set([1, 2, 3]),
      [[1, 2], [2, 3]],
    ],
    [
      new Set([1, 2, 3, 4]),
      [[1, 2], [2, 3], [3, 4]],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[1.1, 2.2], [2.2, 3.3], [3.3, 4.4], [4.4, 5.5]],
    ],
    [
      new Set(['1', '2', '3', '4', '5']),
      [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']],
    ],
    [
      new Set([[1], [2], [3], [4], [5]]),
      [[[1], [2]], [[2], [3]], [[3], [4]], [[4], [5]]],
    ],
    [
      new Set([1, 2.2, '3', [4], true, null, 'test data']),
      [[1, 2.2], [2.2, '3'], ['3', [4]], [[4], true], [true, null], [null, 'test data']],
    ],
    [
      new Set(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [['Ross', 'Rachel'], ['Rachel', 'Chandler'], ['Chandler', 'Monica'], ['Monica', 'Joey'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      [],
    ],
    [
      createMapFixture([1]),
      [],
    ],
    [
      createMapFixture([1, 2]),
      [[[0, 1], [1, 2]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      [[[0, 1], [1, 2]], [[1, 2], [2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3, 4]),
      [[[0, 1], [1, 2]], [[1, 2], [2, 3]], [[2, 3], [3, 4]]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      [[[0, 1], [1, 2]], [[1, 2], [2, 3]], [[2, 3], [3, 4]], [[3, 4], [4, 5]]],
    ],
    [
      createMapFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[[0, 1.1], [1, 2.2]], [[1, 2.2], [2, 3.3]], [[2, 3.3], [3, 4.4]], [[3, 4.4], [4, 5.5]]],
    ],
    [
      createMapFixture(['1', '2', '3', '4', '5']),
      [[[0, '1'], [1, '2']], [[1, '2'], [2, '3']], [[2, '3'], [3, '4']], [[3, '4'], [4, '5']]],
    ],
    [
      createMapFixture([[1], [2], [3], [4], [5]]),
      [[[0, [1]], [1, [2]]], [[1, [2]], [2, [3]]], [[2, [3]], [3, [4]]], [[3, [4]], [4, [5]]]],
    ],
    [
      createMapFixture([true, true, false, false]),
      [[[0, true], [1, true]], [[1, true], [2, false]], [[2, false], [3, false]]],
    ],
    [
      createMapFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [
        [[0, 1], [1, 2.2]],
        [[1, 2.2], [2, '3']],
        [[2, '3'], [3, [4]]],
        [[3, [4]], [4, true]],
        [[4, true], [5, null]],
        [[5, null], [6, 'test data']],
      ],
    ],
    [
      createMapFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [
        [[0, 'Ross'], [1, 'Rachel']],
        [[1, 'Rachel'], [2, 'Chandler']],
        [[2, 'Chandler'], [3, 'Monica']],
        [[3, 'Monica'], [4, 'Joey']],
        [[4, 'Joey'], [5, 'Phoebe']],
      ],
    ],
  ];
}
