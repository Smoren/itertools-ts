import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
} from "../fixture";
import { summary } from "../../src";

type SyncInput = Iterable<number> | Iterator<number>;
type AsyncInput =
  | AsyncIterable<number>
  | AsyncIterator<number>
  | Iterable<number>
  | Iterator<number>;

const syncInputFactories: Array<[string, (data: number[]) => SyncInput]> = [
  ["array", (data) => data],
  ["generator", createGeneratorFixture],
  ["iterable", createIterableFixture],
  ["iterator", createIteratorFixture],
  ["set", (data) => new Set(data)],
];

const asyncInputFactories: Array<[string, (data: number[]) => AsyncInput]> = [
  ["async generator", createAsyncGeneratorFixture],
  ["async iterable", createAsyncIterableFixture],
  ["async iterator", createAsyncIteratorFixture],
  ...syncInputFactories,
];

describe.each(syncInputFactories)(
  "Summary Not All Match Test with %s",
  (_, createInput) => {
    it("returns false for an empty collection", () => {
      expect(summary.notAllMatch(createInput([]), () => false)).toBeFalsy();
    });

    it("returns false when all elements match", () => {
      expect(
        summary.notAllMatch(createInput([2, 4, 6]), (item) => item % 2 === 0),
      ).toBeFalsy();
    });

    it("returns true when at least one element does not match", () => {
      expect(
        summary.notAllMatch(createInput([2, 3, 4]), (item) => item % 2 === 0),
      ).toBeTruthy();
    });

    it("returns true when no elements match", () => {
      expect(
        summary.notAllMatch(createInput([1, 3, 5]), (item) => item % 2 === 0),
      ).toBeTruthy();
    });
  },
);

describe.each(asyncInputFactories)(
  "Summary Not All Match Async Test with %s",
  (_, createInput) => {
    it("returns false for an empty collection", async () => {
      expect(
        await summary.notAllMatchAsync(createInput([]), async () => false),
      ).toBeFalsy();
    });

    it("returns false when all elements match", async () => {
      expect(
        await summary.notAllMatchAsync(
          createInput([2, 4, 6]),
          async (item) => item % 2 === 0,
        ),
      ).toBeFalsy();
    });

    it("returns true when at least one element does not match", async () => {
      expect(
        await summary.notAllMatchAsync(
          createInput([2, 3, 4]),
          async (item) => item % 2 === 0,
        ),
      ).toBeTruthy();
    });

    it("returns true when no elements match", async () => {
      expect(
        await summary.notAllMatchAsync(
          createInput([1, 3, 5]),
          async (item) => item % 2 === 0,
        ),
      ).toBeTruthy();
    });
  },
);

it("supports strings", () => {
  expect(
    summary.notAllMatch("ABCd", (item) => item.toUpperCase() === item),
  ).toBeTruthy();
});

it("supports maps", () => {
  expect(
    summary.notAllMatch(
      createMapFixture([2, 3, 4]),
      ([, item]) => item % 2 === 0,
    ),
  ).toBeTruthy();
});

it("stops evaluating after the first element that does not match", () => {
  let calls = 0;

  const result = summary.notAllMatch([2, 3, 4], (item) => {
    calls++;
    return item % 2 === 0;
  });

  expect(result).toBeTruthy();
  expect(calls).toBe(2);
});

it("stops async evaluation after the first element that does not match", async () => {
  let calls = 0;

  const result = await summary.notAllMatchAsync(
    createAsyncGeneratorFixture([2, 3, 4]),
    async (item) => {
      calls++;
      return item % 2 === 0;
    },
  );

  expect(result).toBeTruthy();
  expect(calls).toBe(2);
});
