export const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export function *createGeneratorFixture<T>(data: Array<T>): Generator<T> {
  for (const datum of data) {
    yield datum;
  }
}

export async function *createAsyncGeneratorFixture<T>(data: Array<T>): AsyncGenerator<T> {
  for (const datum of data) {
    await asyncTimeout(1);
    yield datum;
  }
}

export function createIteratorFixture<T>(data: Array<T>): Iterator<T> {
  let nextIndex = 0;
  return {
    next(): IteratorResult<T> {
      if (nextIndex < data.length) {
        return { value: data[nextIndex++], done: false };
      } else {
        return { value: nextIndex, done: true };
      }
    },
  };
}

export function createAsyncIteratorFixture<T>(data: Array<T>): AsyncIterator<T> {
  let nextIndex = 0;
  return {
    async next(): Promise<IteratorResult<T>> {
      await asyncTimeout(1);
      if (nextIndex < data.length) {
        return Promise.resolve({ value: data[nextIndex++], done: false });
      } else {
        return Promise.resolve({ value: nextIndex, done: true });
      }
    },
  };
}

export function createIterableFixture<T>(data: Array<T>): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return createIteratorFixture(data);
    }
  };
}

export function createAsyncIterableFixture<T>(data: Array<T>): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return createAsyncIteratorFixture(data);
    }
  };
}

export function createMapFixture<T>(data: Array<T>): Map<number, T> {
  const result = new Map();

  for (let i = 0; i < data.length; ++i) {
    result.set(i, data[i]);
  }

  return result;
}

export function roundEpsilon(n: number|string): number {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

export function expectToBeCloseToArray(actual: Array<number>, expected: Array<number>) {
  expect(actual.length).toBe(expected.length)
  for (let i=0; i< actual.length; ++i) {
    expect(actual[i]).toBeCloseTo(expected[i]);
  }
}
