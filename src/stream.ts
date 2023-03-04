import { toIterable } from './tools';
import { flatMap, map } from './single';

export class Stream {
  protected data: Iterable<unknown>;

  static of(data: Iterable<unknown>|Iterator<unknown>): Stream {
    return new Stream(toIterable(data));
  }

  static ofEmpty(): Stream {
    return new Stream([]);
  }

  map(mapper: (datum: unknown) => unknown): Stream {
    this.data = map(this.data, mapper);
    return this;
  }

  flatMap(mapper: (datum: unknown) => unknown): Stream {
    this.data = flatMap(this.data, mapper);
    return this;
  }

  toArray(): Array<unknown> {
    const result = [];
    for (const item of this) {
      result.push(item);
    }
    return result;
  }

  *[Symbol.iterator]() {
    for (const datum of this.data) {
      yield datum;
    }
  }

  protected constructor(iterable: Iterable<unknown>) {
    this.data = iterable;
  }
}
