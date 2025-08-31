// @ts-ignore
import { expectToBeCloseToArray } from "../fixture";
import { Stream } from '../../src';

describe.each([
  ...dataProviderForOfCount(),
])(
  "Stream Infinite Of Count Test",
  (inputParams, limit: number, expected) => {
    it("", () => {
      // When
      const stream = Stream.ofCount(...inputParams);
      const result = stream.limit(limit).toArray();

      // Then
      expectToBeCloseToArray(result, expected);
    });
  }
);

describe.each([
  ...dataProviderForOfCycle(),
])(
  "Stream Infinite Of Cycle Test",
  <T>(iterable: Iterable<T>, limit: number, expected: Array<T>) => {
    it("", () => {
      // When
      const stream = Stream.ofCycle(iterable);
      const result = stream.limit(limit).toArray();

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForOfRepeat(),
])(
  "Stream Infinite Of Repeat Test",
  <T>(itemToRepeat: T, limit: number, expected: Array<T>) => {
    it("", () => {
      // When
      const stream = Stream.ofRepeat(itemToRepeat);
      const result = stream.limit(limit).toArray();

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForBooleans(),
])(
  "Stream Infinite Booleans Test",
  (repetitions: number | undefined, limit: number) => {
    it("", () => {
      // When
      const stream = Stream.ofBooleans(repetitions);
      const result = stream.limit(limit).toArray();

      // Then
      expect(result).toHaveLength(limit);
      expect(result.every(x => typeof x === 'boolean')).toBe(true);
    });
  }
);

function dataProviderForOfCount(): Array<[Array<number>, number, Array<number>]> {
  return [
    [
      [],
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      10,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [0],
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      [-1],
      5,
      [-1, 0, 1, 2, 3],
    ],
    [
      [1, 2],
      5,
      [1, 3, 5, 7, 9],
    ],
    [
      [0, -1],
      5,
      [0, -1, -2, -3, -4],
    ],
    [
      [-1, -2],
      5,
      [-1, -3, -5, -7, -9],
    ],
    [
      [2, 0.1],
      5,
      [2, 2.1, 2.2, 2.3, 2.4],
    ],
    [
      [-2.2, -1.2],
      5,
      [-2.2, -3.4, -4.6, -5.8, -7],
    ],
  ];
}

function dataProviderForOfCycle(): Array<[Array<unknown>, number, Array<unknown>]> {
  return [
    [
      [],
      5,
      [],
    ],
    [
      [''],
      3,
      ['', '', ''],
    ],
    [
      [null],
      5,
      [null, null, null, null, null],
    ],
    [
      [0, 1, 2],
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      [1, 1],
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      ['0', '1', '2'],
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      [[], []],
      6,
      [[], [], [], [], [], []],
    ],
    [
      [[], [1]],
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForOfRepeat(): Array<[unknown, number, Array<unknown>]> {
  return [
    [
      0,
      5,
      [0, 0, 0, 0, 0],
    ],
    [
      1,
      5,
      [1, 1, 1, 1, 1],
    ],
    [
      1.1,
      5,
      [1.1, 1.1, 1.1, 1.1, 1.1],
    ],
    [
      null,
      5,
      [null, null, null, null, null],
    ],
    [
      '',
      5,
      ['', '', '', '', ''],
    ],
    [
      [],
      5,
      [[], [], [], [], []],
    ],
    [
      [1, 2, 3],
      5,
      [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
    ],
    [
      {a: 1},
      5,
      [{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 1}],
    ],
    [
      {a: [[1]]},
      3,
      [{a: [[1]]}, {a: [[1]]}, {a: [[1]]}],
    ],
  ];
}

function dataProviderForBooleans(): Array<[number | undefined, number]> {
  return [
    [
      0,
      0,
    ],
    [
      undefined,
      5,
    ],
    [
      10,
      10,
    ],
    [
      3,
      3,
    ],
  ];
}
