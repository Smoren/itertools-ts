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
import { InvalidArgumentError, combinatorics } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Combinatorics Combinations Test",
  (input, len, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of combinatorics.combinations(input, len)) {
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
])(
  "Combinatorics Combinations Async Test",
  (input, len, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of combinatorics.combinationsAsync(input, len)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForError(),
])(
  "Combinatorics Combinations Error Test",
  (input, len) => {
    it("", () => {
      expect(() => {
        for (const _ of combinatorics.combinations(input, len)) {}
      }).toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForError(),
  ...dataProviderForErrorAsync(),
])(
  "Combinatorics Combinations Error Async Test",
  (input, len) => {
    it("", async () => {
      try {
        // When
        for await (const _ of combinatorics.combinationsAsync(input, len)) {}
        expect(false).toBeTruthy();
      } catch (e) {
        expect(e).toBeInstanceOf(InvalidArgumentError);
      }
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, number, Array<any>]> {
  return [
    [
      [],
      0,
      [[]],
    ],
    [
      [1],
      0,
      [[]],
    ],
    [
      [1, 2, 3],
      0,
      [[]],
    ],
    [
      [],
      1,
      [],
    ],
    [
      [1],
      1,
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
      [],
    ],
    [
      [1, 2, 3],
      1,
      [[1], [2], [3]],
    ],
    [
      [1, 2, 3],
      2,
      [[1, 2], [1, 3], [2, 3]],
    ],
    [
      [1, 2, 3],
      3,
      [[1, 2, 3]],
    ],
    [
      [1, 2, 3],
      4,
      [],
    ],
    [
      [1, 1, 2],
      2,
      [[1, 1], [1, 2], [1, 2]],
    ],
    [
      [1, 1, 1],
      2,
      [[1, 1], [1, 1], [1, 1]],
    ],
    [
      [[0, 1], [1, 2], [2, 3]],
      1,
      [[[0, 1]], [[1, 2]], [[2, 3]]],
    ],
    [
      ['A', 'B', 'C'],
      2,
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
      ],
    ],
    [
      ['apple', 'banana', 'cherry'],
      2,
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'cherry'],
      ],
    ],
    [
      [1, 'two', 3],
      2,
      [
        [1, 'two'],
        [1, 3],
        ['two', 3],
      ],
    ],
    [
      [{ id: 1 }, { id: 2 }, { id: 3 }],
      2,
      [
        [{ id: 1 }, { id: 2 }],
        [{ id: 1 }, { id: 3 }],
        [{ id: 2 }, { id: 3 }],
      ],
    ],
    [
      [1, 2, 3, 4],
      2,
      [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4],
      ],
    ],
    [
      [1, 2, 3, 4],
      3,
      [
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 4],
        [2, 3, 4],
      ],
    ],
    [
      ['a', 'b', 'c'],
      0,
      [[]],
    ],
    [
      [null, undefined, 0],
      2,
      [
        [null, undefined],
        [null, 0],
        [undefined, 0],
      ],
    ],
    [
      [42, 42],
      2,
      [
        [42, 42],
      ],
    ],
    [
      [true, false],
      2,
      [
        [true, false],
      ],
    ],
    [
      [true, 'string', 123, null],
      1,
      [[true], ['string'], [123], [null]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForStrings(): Array<[string, number, Array<any>]> {
  return [
    [
      '',
      0,
      [[]],
    ],
    [
      '1',
      0,
      [[]],
    ],
    [
      '123',
      0,
      [[]],
    ],
    [
      '',
      1,
      [],
    ],
    [
      '1',
      1,
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
      [],
    ],
    [
      '123',
      1,
      [['1'], ['2'], ['3']],
    ],
    [
      '123',
      2,
      [['1', '2'], ['1', '3'], ['2', '3']],
    ],
    [
      '123',
      3,
      [['1', '2', '3']],
    ],
    [
      '123',
      4,
      [],
    ],
    [
      '112',
      2,
      [['1', '1'], ['1', '2'], ['1', '2']],
    ],
    [
      '111',
      2,
      [['1', '1'], ['1', '1'], ['1', '1']],
    ],
    [
      'ABC',
      2,
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
      ],
    ],
    [
      '1234',
      2,
      [
        ['1', '2'],
        ['1', '3'],
        ['1', '4'],
        ['2', '3'],
        ['2', '4'],
        ['3', '4'],
      ],
    ],
    [
      '1234',
      3,
      [
        ['1', '2', '3'],
        ['1', '2', '4'],
        ['1', '3', '4'],
        ['2', '3', '4'],
      ],
    ],
    [
      'abc',
      0,
      [[]],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, number, Array<any>]> {
  return [
    [
      new Set([]),
      0,
      [[]],
    ],
    [
      new Set([1]),
      0,
      [[]],
    ],
    [
      new Set([1, 2, 3]),
      0,
      [[]],
    ],
    [
      new Set([]),
      1,
      [],
    ],
    [
      new Set([1]),
      1,
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
      [],
    ],
    [
      new Set([1, 2, 3]),
      1,
      [[1], [2], [3]],
    ],
    [
      new Set([1, 2, 3]),
      2,
      [[1, 2], [1, 3], [2, 3]],
    ],
    [
      new Set([1, 2, 3]),
      3,
      [[1, 2, 3]],
    ],
    [
      new Set([1, 2, 3]),
      4,
      [],
    ],
    [
      new Set([[0, 1], [1, 2], [2, 3]]),
      1,
      [[[0, 1]], [[1, 2]], [[2, 3]]],
    ],
    [
      new Set(['A', 'B', 'C']),
      2,
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
      ],
    ],
    [
      new Set(['apple', 'banana', 'cherry']),
      2,
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'cherry'],
      ],
    ],
    [
      new Set([1, 'two', 3]),
      2,
      [
        [1, 'two'],
        [1, 3],
        ['two', 3],
      ],
    ],
    [
      new Set([{ id: 1 }, { id: 2 }, { id: 3 }]),
      2,
      [
        [{ id: 1 }, { id: 2 }],
        [{ id: 1 }, { id: 3 }],
        [{ id: 2 }, { id: 3 }],
      ],
    ],
    [
      new Set([1, 2, 3, 4]),
      2,
      [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4],
      ],
    ],
    [
      new Set([1, 2, 3, 4]),
      3,
      [
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 4],
        [2, 3, 4],
      ],
    ],
    [
      new Set(['a', 'b', 'c']),
      0,
      [[]],
    ],
    [
      new Set([null, undefined, 0]),
      2,
      [
        [null, undefined],
        [null, 0],
        [undefined, 0],
      ],
    ],
    [
      new Set([true, false]),
      2,
      [
        [true, false],
      ],
    ],
    [
      new Set([true, 'string', 123, null]),
      1,
      [[true], ['string'], [123], [null]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, number, Array<any>]> {
  return [
    [
      createMapFixture([]),
      0,
      [[]],
    ],
    [
      createMapFixture([1]),
      0,
      [[]],
    ],
    [
      createMapFixture([1, 2, 3]),
      0,
      [[]],
    ],
    [
      createMapFixture([]),
      1,
      [],
    ],
    [
      createMapFixture([1]),
      1,
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
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      1,
      [[[0, 1]], [[1, 2]], [[2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      2,
      [[[0, 1], [1, 2]], [[0, 1], [2, 3]], [[1, 2], [2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      3,
      [
        [[0, 1], [1, 2], [2, 3]],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      4,
      [],
    ],
    [
      createMapFixture([1, 1, 2]),
      2,
      [[[0, 1], [1, 1]], [[0, 1], [2, 2]], [[1, 1], [2, 2]]],
    ],
    [
      createMapFixture([1, 1, 1]),
      2,
      [[[0, 1], [1, 1]], [[0, 1], [2, 1]], [[1, 1], [2, 1]]],
    ],
    [
      createMapFixture(['A', 'B', 'C']),
      2,
      [
        [[0, 'A'], [1, 'B']],
        [[0, 'A'], [2, 'C']],
        [[1, 'B'], [2, 'C']],
      ],
    ],
    [
      createMapFixture(['apple', 'banana', 'cherry']),
      2,
      [
        [[0, 'apple'], [1, 'banana']],
        [[0, 'apple'], [2, 'cherry']],
        [[1, 'banana'], [2, 'cherry']],
      ],
    ],
    [
      createMapFixture([1, 'two', 3]),
      2,
      [
        [[0, 1], [1, 'two']],
        [[0, 1], [2, 3]],
        [[1, 'two'], [2, 3]],
      ],
    ],
    [
      createMapFixture([{ id: 1 }, { id: 2 }, { id: 3 }]),
      2,
      [
        [[0, { id: 1 }], [1, { id: 2 }]],
        [[0, { id: 1 }], [2, { id: 3 }]],
        [[1, { id: 2 }], [2, { id: 3 }]],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4]),
      2,
      [
        [[0, 1], [1, 2]],
        [[0, 1], [2, 3]],
        [[0, 1], [3, 4]],
        [[1, 2], [2, 3]],
        [[1, 2], [3, 4]],
        [[2, 3], [3, 4]],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4]),
      3,
      [
        [[0, 1], [1, 2], [2, 3]],
        [[0, 1], [1, 2], [3, 4]],
        [[0, 1], [2, 3], [3, 4]],
        [[1, 2], [2, 3], [3, 4]],
      ],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      0,
      [[]],
    ],
    [
      createMapFixture([null, undefined, 0]),
      2,
      [
        [[0, null], [1, undefined]],
        [[0, null], [2, 0]],
        [[1, undefined], [2, 0]],
      ],
    ],
    [
      createMapFixture([42, 42, 42]),
      2,
      [
        [[0, 42], [1, 42]],
        [[0, 42], [2, 42]],
        [[1, 42], [2, 42]],
      ],
    ],
    [
      createMapFixture([true, false]),
      2,
      [
        [[0, true], [1, false]],
      ],
    ],
    [
      createMapFixture([true, 'string', 123, null]),
      1,
      [[[0, true]], [[1, 'string']], [[2, 123]], [[3, null]]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForError(): Array<[Array<any>, number]> {
  return [
    [
      [],
      -1,
    ],
    [
      [1],
      -1,
    ],
    [
      [1, 2, 3],
      -1,
    ],
    [
      [],
      -1,
    ],
    [
      [1],
      -1,
    ],
    [
      [1, 2],
      -1,
    ],
    [
      [1, 2],
      -2,
    ],
    [
      [1, 2],
      -3,
    ],
    [
      [1, 2, 3],
      -1,
    ],
    [
      [1, 2, 3],
      -2,
    ],
    [
      [1, 2, 3],
      -3,
    ],
    [
      [1, 2, 3],
      -4,
    ],
    [
      [1, 1, 2],
      -2,
    ],
    [
      [1, 1, 1],
      -2,
    ],
    [
      [[0, 1], [1, 2], [2, 3]],
      -1,
    ],
    [
      ['A', 'B', 'C'],
      -2,
    ],
    [
      ['apple', 'banana', 'cherry'],
      -2,
    ],
    [
      [1, 'two', 3],
      -2,
    ],
    [
      [{ id: 1 }, { id: 2 }, { id: 3 }],
      -2,
    ],
    [
      [1, 2, 3, 4],
      -2,
    ],
    [
      [1, 2, 3, 4],
      -3,
    ],
    [
      [null, undefined, 0],
      -2,
    ],
    [
      [42, 42, 42],
      -2,
    ],
    [
      [true, false],
      -2,
    ],
    [
      [true, 'string', 123, null],
      -1,
    ],
  ];
}

function dataProviderForErrorAsync(): Array<[AsyncIterable<any>, number]> {
  return dataProviderForError().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [number],
  ])
}
