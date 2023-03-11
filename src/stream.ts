import { toArray, toIterable } from "./transform";
import {
  chunkwise,
  chunkwiseOverlap,
  enumerate,
  filter,
  flatMap,
  flatten,
  keys,
  limit,
  map,
  pairwise,
  slice,
  values,
} from "./single";
import { chain, zip, zipEqual, zipLongest } from "./multi";
import { distinct } from "./set";
import { toAverage, toCount, toMax, toMin, toProduct, toSum, toValue } from "./reduce";

/**
 * Provides fluent interface for working with iterables.
 */
export class Stream {
  /**
   * Iterable source
   */
  protected data: Iterable<unknown>;

  /**
   * Creates iterable instance with fluent interface.
   *
   * @param data
   */
  static of(data: Iterable<unknown> | Iterator<unknown>): Stream {
    return new Stream(toIterable(data));
  }

  /**
   * Creates iterable instance with fluent interface from empty iterable source.
   */
  static ofEmpty(): Stream {
    return new Stream([]);
  }

  /**
   * Iterate iterable source with another iterable collections simultaneously.
   *
   * Make an iterator that aggregates items from multiple iterators.
   * Similar to Python's zip function.
   *
   * For uneven lengths, iterations stops when the shortest iterable is exhausted.
   *
   * @param iterables
   *
   * @see multi.zip
   */
  zipWith(...iterables: Array<Iterable<unknown> | Iterator<unknown>>): Stream {
    this.data = zip(this.data, ...iterables);
    return this;
  }

  /**
   * Iterate iterable source with another iterable collections simultaneously.
   *
   * Make an iterator that aggregates items from multiple iterators.
   * Similar to Python's zip_longest function
   *
   * Iteration continues until the longest iterable is exhausted.
   * For uneven lengths, the exhausted iterables will produce null for the remaining iterations.
   *
   * @param iterables
   *
   * @see multi.zipLongest
   */
  zipLongestWith(
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = zipLongest(this.data, ...iterables);
    return this;
  }

  /**
   * Iterate iterable source with another iterable collections of equal lengths simultaneously.
   *
   * Works like Multi::zip() method but throws \LengthException if lengths not equal,
   * i.e., at least one iterator ends before the others.
   *
   * @param iterables
   *
   * @see multi.zipEqual
   */
  zipEqualWith(
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = zipEqual(this.data, ...iterables);
    return this;
  }

  /**
   * Chain iterable source withs given iterables together into a single iteration.
   *
   * Makes a single continuous sequence out of multiple sequences.
   *
   * @param iterables
   *
   * @see multi.chain
   */
  chainWith(
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = chain(this.data, ...iterables);
    return this;
  }

  /**
   * Return overlapped chunks of elements from iterable source.
   *
   * Chunk size must be at least 1.
   *
   * Overlap size must be less than chunk size.
   *
   * @param chunkSize
   * @param overlapSize
   * @param includeIncompleteTail
   *
   * @see single.chunkwiseOverlap
   */
  chunkwiseOverlap(
    chunkSize: number,
    overlapSize: number,
    includeIncompleteTail = true
  ): Stream {
    this.data = chunkwiseOverlap(
      this.data,
      chunkSize,
      overlapSize,
      includeIncompleteTail
    );
    return this;
  }

  /**
   * Return chunks of elements from iterable source.
   *
   * Chunk size must be at least 1.
   *
   * @param chunkSize
   *
   * @see single.chunkwise
   */
  chunkwise(chunkSize: number): Stream {
    this.data = chunkwise(this.data, chunkSize);
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning elements where there predicate function is true.
   *
   * @param predicate
   *
   * @see single.filter
   */
  filter(predicate: (item: unknown) => boolean): Stream {
    this.data = filter(this.data, predicate);
    return this;
  }

  /**
   * Enumerates items of given collection.
   *
   * @see single.enumerate
   */
  enumerate(): Stream {
    this.data = enumerate(this.data);
    return this;
  }

  /**
   * Iterates keys from the collection of key-value pairs.
   *
   * @see single.keys
   */
  keys(): Stream {
    this.data = keys(
      this.data as Iterable<[unknown, unknown]> | Iterator<[unknown, unknown]>
    );
    return this;
  }

  /**
   * Limit iteration to a max size limit.
   *
   * @param count
   *
   * @see single.limit
   */
  limit(count: number): Stream {
    this.data = limit(this.data, count);
    return this;
  }

  /**
   * Map a function onto every element of the stream
   *
   * @param mapper
   *
   * @see single.map
   */
  map(mapper: (datum: unknown) => unknown): Stream {
    this.data = map(this.data, mapper);
    return this;
  }

  /**
   * Returns a new collection formed by applying a given callback function
   * to each element of the stream, and then flattening the result by one level.
   *
   * @param mapper
   *
   * @see single.flatMap
   */
  flatMap(mapper: (datum: unknown) => unknown): Stream {
    this.data = flatMap(this.data, mapper);
    return this;
  }

  /**
   * Flatten a stream.
   *
   * @param dimensions
   *
   * @see single.flatten
   */
  flatten(dimensions = Infinity): Stream {
    this.data = flatten(this.data, dimensions);
    return this;
  }

  /**
   * Return pairs of elements from iterable source.
   *
   * Produces empty generator if given collection contains less than 2 elements.
   *
   * @see single.pairwise
   */
  pairwise(): Stream {
    this.data = pairwise(this.data);
    return this;
  }

  /**
   * Extract a slice of the stream.
   *
   * @param start
   * @param count
   * @param step
   *
   * @see single.slice
   */
  slice(start = 0, count?: number, step = 1): Stream {
    this.data = slice(this.data, start, count, step);
    return this;
  }

  /**
   * Iterates values from the collection of key-value pairs.
   *
   * @see single.values
   */
  values(): Stream {
    this.data = values(
      this.data as Iterable<[unknown, unknown]> | Iterator<[unknown, unknown]>
    );
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning unique elements.
   *
   * @see set.distinct
   */
  distinct(): Stream {
    this.data = distinct(this.data);
    return this;
  }

  /**
   * Reduces iterable source like `array.reduce()` function.
   *
   * @param reducer
   * @param initialValue
   *
   * @see reduce.toValue
   */
  toValue<T>(
    reducer: (carry: T | undefined, datum: unknown) => T,
    initialValue?: T
  ): T | undefined {
    return toValue(this, reducer, initialValue);
  }

  /**
   * Reduces iterable source to the mean average of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toAverage
   */
  toAverage(): number | undefined {
    return toAverage(this as Iterable<number>);
  }

  /**
   * Reduces iterable source to its length.
   *
   * @see reduce.toCount
   */
  toCount(): number {
    return toCount(this as Iterable<number>);
  }

  /**
   * Reduces iterable source to its max value.
   *
   * Callable param `compareBy` must return comparable value.
   *
   * If `compareBy` is not proposed then items of iterable source must be comparable.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @param compareBy
   *
   * @see reduce.toMax
   */
  toMax<TComparable>(
    compareBy?: (datum: unknown) => TComparable
  ): unknown | undefined {
    return toMax(this, compareBy);
  }

  /**
   * Reduces iterable source to its min value.
   *
   * Callable param `compareBy` must return comparable value.
   *
   * If `compareBy` is not proposed then items of iterable source must be comparable.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @param compareBy
   *
   * @see reduce.toMin
   */
  toMin<TComparable>(
    compareBy?: (datum: unknown) => TComparable
  ): unknown | undefined {
    return toMin(this, compareBy);
  }

  /**
   * Reduces iterable source to the sum of its items.
   *
   * @see reduce.toSum
   */
  toSum(): number {
    return toSum(this as Iterable<number>);
  }

  /**
   * Reduces iterable source to the product of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toProduct
   */
  toProduct(): number | undefined {
    return toProduct(this as Iterable<number>);
  }

  /**
   * Converts iterable source to array.
   *
   * @see transform.toArray
   */
  toArray(): Array<unknown> {
    return toArray(this);
  }

  /**
   * Aggregated iterator.
   */
  *[Symbol.iterator](): Iterator<unknown> {
    for (const datum of this.data) {
      yield datum;
    }
  }

  /**
   * Stream constructor.
   *
   * @param iterable
   */
  protected constructor(iterable: Iterable<unknown>) {
    this.data = iterable;
  }
}
