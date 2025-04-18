import { expectToBeCloseToArray } from "../fixture";
import { infinite } from '../../src';

describe.each([
  ...dataProviderForBooleans(),
])(
  "Infinite Booleans Test",
  (repetitions: number | undefined, limit: number, expected: Array<boolean>) => {
    it("", () => {
      // When
      const generator = infinite.booleans(repetitions);
      const result = Array.from({ length: limit }, () => generator[Symbol.iterator]().next().value);

      // Then
      expect(result).toHaveLength(limit);
      expect(result.every(x => typeof x === 'boolean')).toBe(true);
    });
  }
);

describe.each([
  ...dataProviderForBooleansAsync(),
])(
  "Infinite Booleans Async Test",
  (repetitions: number | undefined, limit: number, expected: Array<boolean>) => {
    it("", async () => {
      // When
      const generator = infinite.booleansAsync(repetitions);
      const result = await Promise.all(Array.from({ length: limit }, () => generator[Symbol.asyncIterator]().next().then(r => r.value)));

      // Then
      expect(result).toHaveLength(limit);
      expect(result.every(x => typeof x === 'boolean')).toBe(true);
    });
  }
);

function dataProviderForBooleans(): Array<[number | undefined, number, Array<boolean>]> {
  return [
    [
      undefined,
      5,
      [true, false, true, false, true],
    ],
    [
      10,
      10,
      [true, false, true, false, true, false, true, false, true, false],
    ],
    [
      3,
      3,
      [true, false, true],
    ],
  ];
}

function dataProviderForBooleansAsync(): Array<[number | undefined, number, Array<boolean>]> {
  return dataProviderForBooleans();
}
