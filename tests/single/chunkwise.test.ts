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
])("Single Chunkwise Test", (input, chunkSize, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of single.chunkwise(input as Iterable<unknown>, chunkSize as number)) {
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
      1,
      [],
    ],
    [
      [],
      2,
      [],
    ],
    [
      [1],
      1,
      [[1]],
    ],
    [
      [1],
      2,
      [[1]],
    ],
    [
      [1],
      3,
      [[1]],
    ],
    [
      [1, 2],
      1,
      [[1], [2]],
    ],
    [
      [1, 2],
      2,
      [[1, 2]],
    ],
    [
      [1, 2],
      3,
      [[1, 2]],
    ],
    [
      [1, 2, 3],
      1,
      [[1], [2], [3]],
    ],
    [
      [1, 2, 3],
      2,
      [[1, 2], [3]],
    ],
    [
      [1, 2, 3],
      3,
      [[1, 2, 3]],
    ],
    [
      [1, 2, 3],
      4,
      [[1, 2, 3]],
    ],
    [
      [1, 2, 3, 4],
      2,
      [[1, 2], [3, 4]],
    ],
    [
      [1, 2, 3, 4],
      3,
      [[1, 2, 3], [4]],
    ],
    [
      [1, 2, 3, 4, 5],
      2,
      [[1, 2], [3, 4], [5]],
    ],
    [
      [1, 2, 3, 4, 5],
      3,
      [[1, 2, 3], [4, 5]],
    ],
    [
      [1.1, 2.2, 3.3, 4.4, 5.5],
      2,
      [[1.1, 2.2], [3.3, 4.4], [5.5]],
    ],
    [
      ['1', '2', '3', '4', '5'],
      2,
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      [[1], [2], [3], [4], [5]],
      2,
      [[[1], [2]], [[3], [4]], [[5]]],
    ],
    [
      [true, true, false, false],
      2,
      [[true, true], [false, false]],
    ],
    [
      [1, 2.2, '3', [4], true, null, 'test data'],
      3,
      [[1, 2.2, '3'], [[4], true, null], ['test data']],
    ],
    [
      ['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe'],
      2,
      [['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      1,
      [],
    ],
    [
      createGeneratorFixture([]),
      2,
      [],
    ],
    [
      createGeneratorFixture([1]),
      1,
      [[1]],
    ],
    [
      createGeneratorFixture([1]),
      2,
      [[1]],
    ],
    [
      createGeneratorFixture([1]),
      3,
      [[1]],
    ],
    [
      createGeneratorFixture([1, 2]),
      1,
      [[1], [2]],
    ],
    [
      createGeneratorFixture([1, 2]),
      2,
      [[1, 2]],
    ],
    [
      createGeneratorFixture([1, 2]),
      3,
      [[1, 2]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      1,
      [[1], [2], [3]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      2,
      [[1, 2], [3]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      3,
      [[1, 2, 3]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      4,
      [[1, 2, 3]],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4]),
      2,
      [[1, 2], [3, 4]],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4]),
      3,
      [[1, 2, 3], [4]],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      2,
      [[1, 2], [3, 4], [5]],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      3,
      [[1, 2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      2,
      [[1.1, 2.2], [3.3, 4.4], [5.5]],
    ],
    [
      createGeneratorFixture(['1', '2', '3', '4', '5']),
      2,
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      createGeneratorFixture([[1], [2], [3], [4], [5]]),
      2,
      [[[1], [2]], [[3], [4]], [[5]]],
    ],
    [
      createGeneratorFixture([true, true, false, false]),
      2,
      [[true, true], [false, false]],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      3,
      [[1, 2.2, '3'], [[4], true, null], ['test data']],
    ],
    [
      createGeneratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      2,
      [['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      1,
      [],
    ],
    [
      createIterableFixture([]),
      2,
      [],
    ],
    [
      createIterableFixture([1]),
      1,
      [[1]],
    ],
    [
      createIterableFixture([1]),
      2,
      [[1]],
    ],
    [
      createIterableFixture([1]),
      3,
      [[1]],
    ],
    [
      createIterableFixture([1, 2]),
      1,
      [[1], [2]],
    ],
    [
      createIterableFixture([1, 2]),
      2,
      [[1, 2]],
    ],
    [
      createIterableFixture([1, 2]),
      3,
      [[1, 2]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      1,
      [[1], [2], [3]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      2,
      [[1, 2], [3]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      3,
      [[1, 2, 3]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      4,
      [[1, 2, 3]],
    ],
    [
      createIterableFixture([1, 2, 3, 4]),
      2,
      [[1, 2], [3, 4]],
    ],
    [
      createIterableFixture([1, 2, 3, 4]),
      3,
      [[1, 2, 3], [4]],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      2,
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      3,
      [[1, 2, 3], [4, 5]],
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      2,
      [[1.1, 2.2], [3.3, 4.4], [5.5]],
    ],
    [
      createIterableFixture(['1', '2', '3', '4', '5']),
      2,
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      createIterableFixture([[1], [2], [3], [4], [5]]),
      2,
      [[[1], [2]], [[3], [4]], [[5]]],
    ],
    [
      createIterableFixture([true, true, false, false]),
      2,
      [[true, true], [false, false]],
    ],
    [
      createIterableFixture([1, 2.2, '3', [4], true, null, 'test data']),
      3,
      [[1, 2.2, '3'], [[4], true, null], ['test data']],
    ],
    [
      createIterableFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      2,
      [['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      1,
      [],
    ],
    [
      createIteratorFixture([]),
      2,
      [],
    ],
    [
      createIteratorFixture([1]),
      1,
      [[1]],
    ],
    [
      createIteratorFixture([1]),
      2,
      [[1]],
    ],
    [
      createIteratorFixture([1]),
      3,
      [[1]],
    ],
    [
      createIteratorFixture([1, 2]),
      1,
      [[1], [2]],
    ],
    [
      createIteratorFixture([1, 2]),
      2,
      [[1, 2]],
    ],
    [
      createIteratorFixture([1, 2]),
      3,
      [[1, 2]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      1,
      [[1], [2], [3]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      2,
      [[1, 2], [3]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      3,
      [[1, 2, 3]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      4,
      [[1, 2, 3]],
    ],
    [
      createIteratorFixture([1, 2, 3, 4]),
      2,
      [[1, 2], [3, 4]],
    ],
    [
      createIteratorFixture([1, 2, 3, 4]),
      3,
      [[1, 2, 3], [4]],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      2,
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      3,
      [[1, 2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      2,
      [[1.1, 2.2], [3.3, 4.4], [5.5]],
    ],
    [
      createIteratorFixture(['1', '2', '3', '4', '5']),
      2,
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      createIteratorFixture([[1], [2], [3], [4], [5]]),
      2,
      [[[1], [2]], [[3], [4]], [[5]]],
    ],
    [
      createIteratorFixture([true, true, false, false]),
      2,
      [[true, true], [false, false]],
    ],
    [
      createIteratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      3,
      [[1, 2.2, '3'], [[4], true, null], ['test data']],
    ],
    [
      createIteratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      2,
      [['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      1,
      [],
    ],
    [
      '',
      2,
      [],
    ],
    [
      '1',
      1,
      [['1']],
    ],
    [
      '1',
      2,
      [['1']],
    ],
    [
      '1',
      3,
      [['1']],
    ],
    [
      '12',
      1,
      [['1'], ['2']],
    ],
    [
      '12',
      2,
      [['1', '2']],
    ],
    [
      '12',
      3,
      [['1', '2']],
    ],
    [
      '123',
      1,
      [['1'], ['2'], ['3']],
    ],
    [
      '123',
      2,
      [['1', '2'], ['3']],
    ],
    [
      '123',
      3,
      [['1', '2', '3']],
    ],
    [
      '123',
      4,
      [['1', '2', '3']],
    ],
    [
      '1234',
      2,
      [['1', '2'], ['3', '4']],
    ],
    [
      '1234',
      3,
      [['1', '2', '3'], ['4']],
    ],
    [
      '12345',
      2,
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      '12345',
      3,
      [['1', '2', '3'], ['4', '5']],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      1,
      [],
    ],
    [
      new Set([]),
      2,
      [],
    ],
    [
      new Set([1]),
      1,
      [[1]],
    ],
    [
      new Set([1]),
      2,
      [[1]],
    ],
    [
      new Set([1]),
      3,
      [[1]],
    ],
    [
      new Set([1, 2]),
      1,
      [[1], [2]],
    ],
    [
      new Set([1, 2]),
      2,
      [[1, 2]],
    ],
    [
      new Set([1, 2]),
      3,
      [[1, 2]],
    ],
    [
      new Set([1, 2, 3]),
      1,
      [[1], [2], [3]],
    ],
    [
      new Set([1, 2, 3]),
      2,
      [[1, 2], [3]],
    ],
    [
      new Set([1, 2, 3]),
      3,
      [[1, 2, 3]],
    ],
    [
      new Set([1, 2, 3]),
      4,
      [[1, 2, 3]],
    ],
    [
      new Set([1, 2, 3, 4]),
      2,
      [[1, 2], [3, 4]],
    ],
    [
      new Set([1, 2, 3, 4]),
      3,
      [[1, 2, 3], [4]],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      2,
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      3,
      [[1, 2, 3], [4, 5]],
    ],
    [
      new Set([1.1, 2.2, 3.3, 4.4, 5.5]),
      2,
      [[1.1, 2.2], [3.3, 4.4], [5.5]],
    ],
    [
      new Set(['1', '2', '3', '4', '5']),
      2,
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      new Set([[1], [2], [3], [4], [5]]),
      2,
      [[[1], [2]], [[3], [4]], [[5]]],
    ],
    [
      new Set([1, 2.2, '3', [4], true, null, 'test data']),
      3,
      [[1, 2.2, '3'], [[4], true, null], ['test data']],
    ],
    [
      new Set(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      2,
      [['Ross', 'Rachel'], ['Chandler', 'Monica'], ['Joey', 'Phoebe']],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      1,
      [],
    ],
    [
      createMapFixture([]),
      2,
      [],
    ],
    [
      createMapFixture([1]),
      1,
      [[[0, 1]]],
    ],
    [
      createMapFixture([1]),
      2,
      [[[0, 1]]],
    ],
    [
      createMapFixture([1]),
      3,
      [[[0, 1]]],
    ],
    [
      createMapFixture([1, 2]),
      1,
      [[[0, 1]], [[1, 2]]],
    ],
    [
      createMapFixture([1, 2]),
      2,
      [[[0, 1], [1, 2]]],
    ],
    [
      createMapFixture([1, 2]),
      3,
      [[[0, 1], [1, 2]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      1,
      [[[0, 1]], [[1, 2]], [[2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      2,
      [[[0, 1], [1, 2]], [[2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      3,
      [[[0, 1], [1, 2], [2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      4,
      [[[0, 1], [1, 2], [2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3, 4]),
      2,
      [[[0, 1], [1, 2]], [[2, 3], [3, 4]]],
    ],
    [
      createMapFixture([1, 2, 3, 4]),
      3,
      [[[0, 1], [1, 2], [2, 3]], [[3, 4]]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      2,
      [[[0, 1], [1, 2]], [[2, 3], [3, 4]], [[4, 5]]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      3,
      [[[0, 1], [1, 2], [2, 3]], [[3, 4], [4, 5]]],
    ],
    [
      createMapFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      2,
      [[[0, 1.1], [1, 2.2]], [[2, 3.3], [3, 4.4]], [[4, 5.5]]],
    ],
    [
      createMapFixture(['1', '2', '3', '4', '5']),
      2,
      [[[0, '1'], [1, '2']], [[2, '3'], [3, '4']], [[4, '5']]],
    ],
    [
      createMapFixture([[1], [2], [3], [4], [5]]),
      2,
      [[[0, [1]], [1, [2]]], [[2, [3]], [3, [4]]], [[4, [5]]]],
    ],
    [
      createMapFixture([true, true, false, false]),
      2,
      [[[0, true], [1, true]], [[2, false], [3, false]]],
    ],
    [
      createMapFixture([1, 2.2, '3', [4], true, null, 'test data']),
      3,
      [[[0, 1], [1, 2.2], [2, '3']], [[3, [4]], [4, true], [5, null]], [[6, 'test data']]],
    ],
    [
      createMapFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      2,
      [[[0, 'Ross'], [1, 'Rachel']], [[2, 'Chandler'], [3, 'Monica']], [[4, 'Joey'], [5, 'Phoebe']]],
    ],
  ];
}
