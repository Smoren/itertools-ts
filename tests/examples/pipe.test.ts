import { createAsyncPipe, createPipe, reduce, set, single } from "../../src";
// @ts-ignore
import { createAsyncIterableFixture } from "../fixture";

it("Pipe Usage Example Test", () => {
  const pipe = createPipe<[
    Iterable<number>,  // INPUT => set.distinct
    Iterable<number>,  // set.distinct => single.map
    Iterable<number>,  // single.map => single.filter
    Iterable<number>,  // single.filter => reduce.toSum
    number             // reduce.toSum => OUTPUT
  ]>(
    set.distinct,
    (input) => single.map(input, (x) => x**2),
    (input) => single.filter(input, (x) => x < 10),
    reduce.toSum,
  );

  {
    const input = [1, 1, 2, 2, 3, 4, 5];
    const result = pipe(input);

    expect(result).toBe(14);
  }

  {
    const input = [1, 1, 1, 2, 2, 2];
    const result = pipe(input);

    expect(result).toBe(5);
  }
});


it("Pipe Usage Example Test", () => {
  const pipe = createPipe(
    set.distinct<number>,
    (input) => single.map(input, (x) => x**2),
    (input) => single.filter(input, (x) => x < 10),
    reduce.toSum,
  );

  {
    const input = [1, 1, 2, 2, 3, 4, 5];
    const result = pipe(input);

    expect(result).toBe(14);
  }

  {
    const input = [1, 1, 1, 2, 2, 2];
    const result = pipe(input);

    expect(result).toBe(5);
  }
});

it("Async Pipe Usage Example Test", async () => {
  const asyncPipe = createAsyncPipe<[
    AsyncIterable<number>,  // INPUT => set.distinctAsync
    AsyncIterable<number>,  // set.distinctAsync => single.mapAsync
    AsyncIterable<number>,  // single.mapAsync => single.filterAsync
    AsyncIterable<number>,  // single.filterAsync => reduce.toSumAsync
    number                  // reduce.toSumAsync => OUTPUT
  ]>(
    set.distinctAsync,
    (input) => single.mapAsync(input, (x) => x**2),
    (input) => single.filterAsync(input, (x) => x < 10),
    reduce.toSumAsync,
  );

  {
    const input = createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]);
    const result = await asyncPipe(input);

    expect(result).toBe(14);
  }

  {
    const input = createAsyncIterableFixture([1, 1, 1, 2, 2, 2]);
    const result = await asyncPipe(input);

    expect(result).toBe(5);
  }
});

it("Async Pipe Usage Example Test", async () => {
  const asyncPipe = createAsyncPipe(
    set.distinctAsync<number>,
    (input) => single.mapAsync(input, async (x) => x**2),
    (input) => single.filterAsync(input, (x) => x < 10),
    reduce.toSumAsync,
  );

  {
    const input = createAsyncIterableFixture([1, 1, 2, 2, 3, 4, 5]);
    const result = await asyncPipe(input);

    expect(result).toBe(14);
  }

  {
    const input = createAsyncIterableFixture([1, 1, 1, 2, 2, 2]);
    const result = await asyncPipe(input);

    expect(result).toBe(5);
  }
});
