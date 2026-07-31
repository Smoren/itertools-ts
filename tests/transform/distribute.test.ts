import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
} from "../fixture";
import { AsyncStream, InvalidArgumentError, Stream, transform } from "../../src";

describe.each(syncDataProvider())(
  "transform.distribute",
  (input, n, expected) => {
    it(`distributes input into ${n} groups`, () => {
      expect(Array.from(transform.distribute(input, n))).toEqual(expected);
    });
  }
);

describe.each(asyncDataProvider())(
  "transform.distributeAsync",
  (input, n, expected) => {
    it(`distributes input into ${n} groups`, async () => {
      expect(
        await transform.toArrayAsync(transform.distributeAsync(input, n))
      ).toEqual(expected);
    });
  }
);

describe("stream distribute methods", () => {
  it("distributes a Stream", () => {
    expect(Stream.of([1, 2, 3, 4, 5]).distribute(3).toArray()).toEqual([
      [1, 4],
      [2, 5],
      [3],
    ]);
  });

  it("distributes an AsyncStream", async () => {
    expect(
      await AsyncStream.of([1, 2, 3, 4, 5]).distribute(3).toArray()
    ).toEqual([[1, 4], [2, 5], [3]]);
  });
});

it.each([0, -1, 1.5, NaN, Infinity, "2", true])(
  "rejects invalid group count %s",
  (n) => {
    expect(() =>
      Array.from(transform.distribute([], n as number))
    ).toThrow(InvalidArgumentError);
  }
);

it.each([0, -1, 1.5, NaN, Infinity, "2", true])(
  "rejects invalid async group count %s",
  async (n) => {
    await expect(
      transform.toArrayAsync(transform.distributeAsync([], n as number))
    ).rejects.toThrow(InvalidArgumentError);
  }
);

function syncDataProvider(): Array<
  [Iterable<unknown> | Iterator<unknown>, number, Array<Array<unknown>>]
> {
  return [
    [[], 2, [[], []]],
    [[1, 2, 3, 4], 2, [[1, 3], [2, 4]]],
    [[1, 2, 3, 4, 5], 3, [[1, 4], [2, 5], [3]]],
    [[1, 2], 4, [[1], [2], [], []]],
    ["abcde", 2, [["a", "c", "e"], ["b", "d"]]],
    [new Set([1, 2, 3, 4]), 2, [[1, 3], [2, 4]]],
    [
      new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]),
      2,
      [
        [
          ["a", 1],
          ["c", 3],
        ],
        [["b", 2]],
      ],
    ],
    [createGeneratorFixture([1, 2, 3]), 2, [[1, 3], [2]]],
    [createIterableFixture([1, 2, 3]), 2, [[1, 3], [2]]],
    [createIteratorFixture([1, 2, 3]), 2, [[1, 3], [2]]],
  ];
}

function asyncDataProvider(): Array<
  [
    AsyncIterable<unknown> | AsyncIterator<unknown> | Iterable<unknown> | Iterator<unknown>,
    number,
    Array<Array<unknown>>
  ]
> {
  return [
    [[], 2, [[], []]],
    [[1, 2, 3, 4, 5], 3, [[1, 4], [2, 5], [3]]],
    [createAsyncGeneratorFixture([1, 2, 3, 4]), 2, [[1, 3], [2, 4]]],
    [createAsyncIterableFixture([1, 2, 3]), 2, [[1, 3], [2]]],
    [createAsyncIteratorFixture([1, 2, 3]), 2, [[1, 3], [2]]],
  ];
}
