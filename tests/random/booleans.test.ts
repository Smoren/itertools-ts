import { random } from '../../src';

describe.each([
  ...dataProviderForBooleans(),
])(
  "Infinite Booleans Test",
  (repetitions: number | undefined, limit: number) => {
    it("", () => {
      // When
      const generator = random.booleans(repetitions);
      const result = Array.from({ length: limit }, () => generator[Symbol.iterator]().next().value);

      // Then
      expect(result).toHaveLength(limit);
      expect(result.every(x => typeof x === 'boolean')).toBe(true);
    });
  }
);

describe.each([
  ...dataProviderForBooleans(),
])(
  "Infinite Booleans Async Test",
  (repetitions: number | undefined, limit: number) => {
    it("", async () => {
      // When
      const generator = random.booleansAsync(repetitions);
      const result = await Promise.all(Array.from({ length: limit }, () => generator[Symbol.asyncIterator]().next().then(r => r.value)));

      // Then
      expect(result).toHaveLength(limit);
      expect(result.every(x => typeof x === 'boolean')).toBe(true);
    });
  }
);

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
