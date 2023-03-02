export function *createGeneratorFixture<T>(data: Array<T>): Iterable<T> {
  for (const datum of data) {
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

export function createIterableFixture<T>(data: Array<T>): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return createIteratorFixture(data);
    }
  };
}
