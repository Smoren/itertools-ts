import { createPipe, reduce, set, single, transform } from "../../src";
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

  const extendedPipe = pipe.add((x) => x**2);

  {
    const input = [1, 1, 2, 2, 3, 4, 5];
    expect(extendedPipe(input)).toBe(196);
  }

  {
    const input = [1, 1, 1, 2, 2, 2];
    expect(extendedPipe(input)).toBe(25);
  }
});

it("Chain pipe Usage Example Test", () => {
  const pipe = createPipe(set.distinct<number>)
    .add((input) => single.map(input, (x) => x**2))
    .add((input) => single.filter(input, (x) => x < 10))
    .add(reduce.toSum);

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

it("Another chain pipe Usage Example Test", () => {
  const pipe = createPipe()
    .add(set.distinct<number>)
    .add((input) => single.map(input, (x) => x**2))
    .add((input) => single.filter(input, (x) => x < 10))
    .add(reduce.toSum);

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
  const asyncPipe = createPipe<[
    AsyncIterable<number>,  // INPUT => set.distinctAsync
    AsyncIterable<number>,  // set.distinctAsync => single.mapAsync
    AsyncIterable<number>,  // single.mapAsync => single.filterAsync
    AsyncIterable<number>,  // single.filterAsync => reduce.toSumAsync
    Promise<number>         // reduce.toSumAsync => OUTPUT
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

it("Pipe Usage Example Without Type Annotations Test", () => {
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

it("Async Pipe Usage Example Without Type Annotations Test", async () => {
  const asyncPipe = createPipe(
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

it("Non-iterables Test", () => {
  const pipe = createPipe(
    (x: number) => x+1,
    (x) => x**3,
    (x) => Math.sqrt(x),
    (x) => Math.round(x)
  );

  {
    const result = pipe(2);
    expect(result).toBe(5);
  }

  {
    const result = pipe(10);
    expect(result).toBe(36);
  }
});

it("Non-iterables Async Test", async () => {
  const pipe = createPipe(
    async (x: Promise<number>) => (await x)+1,
    async (x) => (await x)**3,
    async (x) => Math.sqrt(await x),
    async (x) => Math.round(await x)
  );

  {
    const result = await pipe(Promise.resolve(2));
    expect(result).toBe(5);
  }

  {
    const result = await pipe(Promise.resolve(10));
    expect(result).toBe(36);
  }
});

it("Non-iterables to iterables Test", () => {
  const pipe = createPipe(
    ([x, repeats]: [number, number]) => single.repeat(x, repeats),
    (items) => single.map(items, (x) => x*3),
    (items) => transform.toArray(items)
  );

  {
    const result = pipe([2, 5]);
    expect(result).toEqual([6, 6, 6, 6, 6]);
  }

  {
    const result = pipe([10, 3]);
    expect(result).toEqual([30, 30, 30]);
  }
});

it("Async non-iterables to iterables Test", async () => {
  const pipe = createPipe(
    async (data: Promise<[number, number]>) => single.repeatAsync(...(await data)),
    async (items) => single.mapAsync(await items, (x) => x*3),
    async (items) => transform.toArrayAsync(await items)
  );

  {
    const result = await pipe(Promise.resolve([2, 5]));
    expect(result).toEqual([6, 6, 6, 6, 6]);
  }

  {
    const result = await pipe(Promise.resolve([10, 3]));
    expect(result).toEqual([30, 30, 30]);
  }
});
