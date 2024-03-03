import { multi, Stream, AsyncStream } from "../../src";

it("Loop example", () => {
  // When
  const result = [];

  for (const [letter, number] of multi.zip(['a', 'b'], [1, 2])) {
    result.push(`${letter}${number}`);
  }

  expect(result).toStrictEqual(['a1', 'b2']);
});

it("Loop async example", async () => {
  // When
  const result = [];

  const letters = ['a', 'b'].map((x) => Promise.resolve(x));
  const numbers = [1, 2].map((x) => Promise.resolve(x))

  for await (const [letter, number] of multi.zipAsync(letters, numbers)) {
    result.push(`${letter}${number}`);
  }

  expect(result).toStrictEqual(['a1', 'b2']);
});

it("Stream example", () => {
  // When
  const result = Stream.of([1, 1, 2, 2, 3, 4, 5])
    .distinct()
    .map((x) => Number(x)**2)
    .filter((x) => Number(x) < 10)
    .toSum();

  expect(result).toEqual(14);
});

it("Stream async example", async () => {
  // When
  const result = await AsyncStream.of([1, 1, 2, 2, 3, 4, 5].map((x) => Promise.resolve(x)))
    .distinct()
    .map((x) => Number(x)**2)
    .filter((x) => Number(x) < 10)
    .toSum();

  expect(result).toEqual(14);
});
