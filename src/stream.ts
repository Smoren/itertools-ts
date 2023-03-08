import { toArray, toIterable } from './transform';
import {
  chunkwise,
  chunkwiseOverlap,
  enumerate,
  filter,
  flatMap,
  flatten,
  limit,
  map,
  pairwise,
  slice,
} from './single';
import { chain, zip, zipEqual, zipLongest } from "./multi";
import { distinct } from "./set";
import { toMin, toValue } from "./reduce";

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

  chunkwise(chunkSize: number): Stream {
    this.data = chunkwise(this.data, chunkSize);
    return this;
  }

  filter(predicate: (item: unknown) => boolean): Stream {
    this.data = filter(this.data, predicate);
    return this;
  }

  enumerate(): Stream {
    this.data = enumerate(this.data);
    return this;
  }

  limit(count: number): Stream {
    this.data = limit(this.data, count);
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

  flatten(dimensions: number = Infinity): Stream {
    this.data = flatten(this.data, dimensions);
    return this;
  }

  pairwise(): Stream {
    this.data = pairwise(this.data);
    return this;
  }

  slice(start: number = 0, count?: number, step: number = 1): Stream {
    this.data = slice(this.data, start, count, step);
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
    return toValue(this, reducer, initialValue);
  }

  toMin<TComparable>(compareBy?: (datum: unknown) => TComparable): unknown|undefined {
    return toMin(this, compareBy);
  }

  toArray(): Array<unknown> {
    return toArray(this);
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
