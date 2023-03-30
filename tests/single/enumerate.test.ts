import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, Array<unknown>]>)(
  "Single Enumerate Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.enumerate(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  Array<unknown>
]>)(
  "Single Enumerate Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.enumerateAsync(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [1],
      [[0, 1]],
    ],
    [
      [1, 2, 3],
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      [1.1, 2.2, 3.3, 4.4, 5.5],
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      ['1', '2', '3', '4', '5'],
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      [[1], [2], [3], [4], [5]],
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      [true, true, false, false],
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      [1, 2.2, '3', [4], true, null, 'test data'],
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      ['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe'],
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
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
      [[0, 1]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      createGeneratorFixture(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      createGeneratorFixture([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      createGeneratorFixture([true, true, false, false]),
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      createGeneratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
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
      [[0, 1]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      createIterableFixture(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      createIterableFixture([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      createIterableFixture([true, true, false, false]),
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      createIterableFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      createIterableFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      [],
    ],
    [
      createIteratorFixture([1]),
      [[0, 1]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      createIteratorFixture(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      createIteratorFixture([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      createIteratorFixture([true, true, false, false]),
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      createIteratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      createIteratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
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
      [[0, '1']],
    ],
    [
      '123',
      [[0, '1'], [1, '2'], [2, '3']],
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
      [[0, 1]],
    ],
    [
      new Set([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      new Set([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      new Set(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      new Set([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      new Set([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      new Set(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
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
      [[0, [0, 1]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      [[0, [0, 1]], [1, [1, 2]], [2, [2, 3]]],
    ],
    [
      createMapFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, [0, 1.1]], [1, [1, 2.2]], [2, [2, 3.3]], [3, [3, 4.4]], [4, [4, 5.5]]],
    ],
    [
      createMapFixture(['1', '2', '3', '4', '5']),
      [[0, [0, '1']], [1, [1, '2']], [2, [2, '3']], [3, [3, '4']], [4, [4, '5']]],
    ],
    [
      createMapFixture([[1], [2], [3], [4], [5]]),
      [[0, [0, [1]]], [1, [1, [2]]], [2, [2, [3]]], [3, [3, [4]]], [4, [4, [5]]]],
    ],
    [
      createMapFixture([true, true, false, false]),
      [[0, [0, true]], [1, [1, true]], [2, [2, false]], [3, [3, false]]],
    ],
    [
      createMapFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [
        [0, [0, 1]],
        [1, [1, 2.2]],
        [2, [2, '3']],
        [3, [3, [4]]],
        [4, [4, true]],
        [5, [5, null]],
        [6, [6, 'test data']],
      ],
    ],
    [
      createMapFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [
        [0, [0, 'Ross']],
        [1, [1, 'Rachel']],
        [2, [2, 'Chandler']],
        [3, [3, 'Monica']],
        [4, [4, 'Joey']],
        [5, [5, 'Phoebe']],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [[0, 1]],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      createAsyncGeneratorFixture(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      createAsyncGeneratorFixture([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      createAsyncGeneratorFixture([true, true, false, false]),
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      createAsyncGeneratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [[0, 1]],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createAsyncIterableFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      createAsyncIterableFixture(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      createAsyncIterableFixture([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      createAsyncIterableFixture([true, true, false, false]),
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      createAsyncIterableFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [[0, 1]],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2, 3.3, 4.4, 5.5]),
      [[0, 1.1], [1, 2.2], [2, 3.3], [3, 4.4], [4, 5.5]],
    ],
    [
      createAsyncIteratorFixture(['1', '2', '3', '4', '5']),
      [[0, '1'], [1, '2'], [2, '3'], [3, '4'], [4, '5']],
    ],
    [
      createAsyncIteratorFixture([[1], [2], [3], [4], [5]]),
      [[0, [1]], [1, [2]], [2, [3]], [3, [4]], [4, [5]]],
    ],
    [
      createAsyncIteratorFixture([true, true, false, false]),
      [[0, true], [1, true], [2, false], [3, false]],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', [4], true, null, 'test data']),
      [[0, 1], [1, 2.2], [2, '3'], [3, [4]], [4, true], [5, null], [6, 'test data']],
    ],
    [
      createAsyncIteratorFixture(['Ross', 'Rachel', 'Chandler', 'Monica', 'Joey', 'Phoebe']),
      [[0, 'Ross'], [1, 'Rachel'], [2, 'Chandler'], [3, 'Monica'], [4, 'Joey'], [5, 'Phoebe']],
    ],
  ];
}
