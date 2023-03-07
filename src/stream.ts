import { toIterable } from './tools';
import { chunkwiseOverlap, filter, flatMap, map, pairwise } from './single';
import { chain, zip, zipEqual, zipLongest } from "./multi";
import { distinct } from "./set";
import { toValue } from "./reduce";

export class Stream {
  protected data: Iterable<unknown>;

  static of(data: Iterable<unknown>|Iterator<unknown>): Stream {
    return new Stream(toIterable(data));
  }

  static ofEmpty(): Stream {
    return new Stream([]);
  }

  zipWith(...iterables: Array<Iterable<unknown>|Iterator<unknown>>): Stream {
    this.data = zip(this.data, ...iterables);
    return this;
  }

  zipLongestWith(...iterables: Array<Iterable<unknown>|Iterator<unknown>>): Stream {
    this.data = zipLongest(this.data, ...iterables);
    return this;
  }

  zipEqualWith(...iterables: Array<Iterable<unknown>|Iterator<unknown>>): Stream {
    this.data = zipEqual(this.data, ...iterables);
    return this;
  }

  chainWith(...iterables: Array<Iterable<unknown>|Iterator<unknown>>): Stream {
    this.data = chain(this.data, ...iterables);
    return this;
  }

  chunkwiseOverlap(
    chunkSize: number,
    overlapSize: number,
    includeIncompleteTail: boolean = true,
  ): Stream {
    this.data = chunkwiseOverlap(this.data, chunkSize, overlapSize, includeIncompleteTail);
    return this;
  }

  filter(predicate: (item: unknown) => boolean): Stream {
    this.data = filter(this.data, predicate);
    return this;
  }

  map(mapper: (datum: unknown) => unknown): Stream {
    this.data = map(this.data, mapper);
    return this;
  }

  flatMap(mapper: (datum: unknown) => unknown): Stream {
    this.data = flatMap(this.data, mapper);
    return this;
  }

  pairwise(): Stream {
    this.data = pairwise(this.data);
    return this;
  }

  distinct(): Stream {
    this.data = distinct(this.data);
    return this;
  }

  toValue<T>(
    reducer: (carry: T|undefined, datum: unknown) => T,
    initialValue?: T,
  ): T|undefined {
    return toValue(this.data, reducer, initialValue);
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
