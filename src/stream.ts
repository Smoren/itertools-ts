import { toArray, toIterable, toMap, toSet } from "./transform";
import {
  chunkwise,
  chunkwiseOverlap,
  compress,
  dropWhile,
  enumerate,
  filter,
  flatMap,
  flatten,
  groupBy,
  keys,
  limit,
  map,
  pairwise,
  slice,
  takeWhile,
  values,
} from "./single";
import { chain, zip, zipEqual, zipFilled, zipLongest } from "./multi";
import { runningTotal } from "./math";
import {
  distinct,
  intersection,
  partialIntersection,
  symmetricDifference,
  union,
} from "./set";
import {
  toAverage,
  toCount,
  toFirst,
  toFirstAndLast,
  toLast,
  toMax,
  toMin,
  toMinMax,
  toProduct,
  toSum,
  toValue,
} from "./reduce";
import {
  allMatch,
  allUnique,
  anyMatch,
  isReversed,
  isSorted,
  noneMatch,
  same,
  sameCount,
} from "./summary";
import { Comparable } from "./types";

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
   * Iterate stream collection with another iterable collections simultaneously.
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
   * Iterate stream collection with another iterable collections simultaneously.
   *
   * Make an iterator that aggregates items from multiple iterators.
   * Similar to Python's zip_longest function.
   *
   * Iteration continues until the longest iterable is exhausted.
   * For uneven lengths, the exhausted iterables will produce `filler` value for the remaining iterations.
   *
   * @param filler
   * @param iterables
   *
   * @see multi.zipLongest
   */
  zipFilledWith(
    filler: unknown,
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = zipFilled(filler, this.data, ...iterables);
    return this;
  }

  /**
   * Iterate stream collection with another iterable collections simultaneously.
   *
   * Make an iterator that aggregates items from multiple iterators.
   * Similar to Python's zip_longest function.
   *
   * Iteration continues until the longest iterable is exhausted.
   * For uneven lengths, the exhausted iterables will produce `undefined` for the remaining iterations.
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
   * Iterate stream collection with another iterable collections of equal lengths simultaneously.
   *
   * Works like multi.zip() method but throws LengthException if lengths not equal,
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
   * Chain stream collection withs given iterables together into a single iteration.
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
   * Compress an iterable source by filtering out data that is not selected.
   *
   * Selectors indicate which data. True value selects item. False value filters out data.
   *
   * @param selectors
   *
   * @see single.compress()
   */
  compress(
    selectors: Iterable<number | boolean> | Iterator<number | boolean>
  ): Stream {
    this.data = compress(this.data, selectors);
    return this;
  }

  /**
   * Drop elements from the iterable source while the predicate function is true.
   *
   * Once the predicate function returns false once, all remaining elements are returned.
   *
   * @param predicate
   *
   * @see single.dropWhile()
   */
  dropWhile(predicate: (item: unknown) => boolean): Stream {
    this.data = dropWhile(this.data, predicate);
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
   * Group stream data by a common data element.
   *
   * Iterate pairs of group name and collection of grouped items.
   *
   * Collection of grouped items may be an array or an object (depends on presence of `itemKeyFunction` param).
   *
   * The `groupKeyFunction` determines the key (or multiple keys) to group elements by.
   *
   * The `itemKeyFunction` (optional) determines the key of element in group.
   *
   * @param groupKeyFunction
   * @param itemKeyFunction
   *
   * @see single.groupBy
   */
  groupBy(
    groupKeyFunction: (item: unknown) => string,
    itemKeyFunction?: (item: unknown) => string
  ): Stream {
    this.data = groupBy(this.data, groupKeyFunction, itemKeyFunction);
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
   * Accumulate the running total over the stream.
   *
   * @param initialValue (Optional) If provided, the running total leads off with the initial value.
   *
   * @see math.runningTotal
   */
  runningTotal(initialValue?: number): Stream {
    this.data = runningTotal(this.data, initialValue);
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
   * Return elements from the iterable source as long as the predicate is true.
   *
   * If no predicate is provided, the boolean value of the data is used.
   *
   * @param predicate
   *
   * @see single.takeWhile()
   */
  takeWhile(predicate: (item: unknown) => boolean): Stream {
    this.data = takeWhile(this.data, predicate);
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
   * Iterates the intersection of iterable source and given iterables.
   *
   * Always treats different instances of objects and arrays as unequal.
   *
   * @param iterables
   *
   * @see set.intersection
   */
  intersectionWith(
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = intersection(this.data, ...iterables);
    return this;
  }

  /**
   * Iterates partial intersection of iterable source and given iterables.
   *
   * Always treats different instances of objects and arrays as unequal.
   *
   * @param minIntersectionCount
   * @param iterables
   *
   * @see set.partialIntersection
   */
  partialIntersectionWith(
    minIntersectionCount: number,
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = partialIntersection(
      minIntersectionCount,
      this.data,
      ...iterables
    );
    return this;
  }

  /**
   * Iterates the symmetric difference of iterable source and given iterables.
   *
   * Always treats different instances of objects and arrays as unequal.
   *
   * @param iterables
   *
   * @see set.symmetricDifference
   */
  symmetricDifferenceWith(
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = symmetricDifference(this.data, ...iterables);
    return this;
  }

  /**
   * Iterates union of iterable source and given iterables.
   *
   * Always treats different instances of objects and arrays as unequal.
   *
   * @param iterables
   *
   * @see set.union
   */
  unionWith(
    ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
  ): Stream {
    this.data = union(this.data, ...iterables);
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
  toMax(compareBy?: (datum: unknown) => Comparable): unknown | undefined {
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
  toMin(compareBy?: (datum: unknown) => Comparable): unknown | undefined {
    return toMin(this, compareBy);
  }

  /**
   * Reduces given collection to array of its upper and lower bounds.
   *
   * Callable param `compareBy` must return comparable value.
   *
   * If `compareBy` is not proposed then items of given collection must be comparable.
   *
   * Returns `[undefined, undefined]` if given collection is empty.
   *
   * @param compareBy
   */
  toMinMax(compareBy?: (item: unknown) => Comparable): [unknown?, unknown?] {
    return toMinMax(this, compareBy);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirst
   */
  toFirst(): unknown {
    return toFirst(this);
  }

  /**
   * Returns the first and last elements of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAndLast
   */
  toFirstAndLast(): unknown {
    return toFirstAndLast(this);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toLast
   */
  toLast(): unknown {
    return toLast(this);
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
   * Returns true if all elements of stream match the predicate function.
   *
   * For empty stream returns true.
   *
   * @param predicate
   *
   * @see summary.allMatch
   */
  allMatch(predicate: (item: unknown) => boolean): boolean {
    return allMatch(this, predicate);
  }

  /**
   * Returns true if all elements of stream are unique.
   *
   * For empty stream returns true.
   *
   * Considers different instances of data containers to be different, even if they have the same content.
   *
   * @see summary.allUnique
   */
  allUnique(): boolean {
    return allUnique(this);
  }

  /**
   * Returns true if any element of stream matches the predicate function.
   *
   * For empty stream returns false.
   *
   * @param predicate
   *
   * @see summary.anyMatch
   */
  anyMatch(predicate: (item: unknown) => boolean): boolean {
    return anyMatch(this, predicate);
  }

  /**
   * Returns true if stream is sorted in ascending order; otherwise false.
   *
   * Items of stream source must be comparable.
   *
   * Also returns true if stream is empty or has only one element.
   *
   * @see summary.isSorted
   */
  isSorted(): boolean {
    return isSorted(this as Iterable<Comparable>);
  }

  /**
   * Returns true if stream is sorted in descending order; otherwise false.
   *
   * Items of stream source must be comparable.
   *
   * Also returns true if stream is empty or has only one element.
   *
   * @see summary.isReversed
   */
  isReversed(): boolean {
    return isReversed(this as Iterable<Comparable>);
  }

  /**
   * Returns true if no element of stream matches the predicate function.
   *
   * For empty stream returns true.
   *
   * @param predicate
   *
   * @see summary.noneMatch
   */
  noneMatch(predicate: (item: unknown) => boolean): boolean {
    return noneMatch(this, predicate);
  }

  /**
   * Returns true if stream collection and all given collections are the same.
   *
   * For empty collections list returns true.
   *
   * @param collections
   *
   * @see summary.same
   */
  sameWith(
    ...collections: Array<Iterable<unknown> | Iterator<unknown>>
  ): boolean {
    return same(this.data, ...collections);
  }

  /**
   * Returns true if stream collection and all given collections have the same lengths.
   *
   * For empty collections list returns true.
   *
   * @param collections
   *
   * @see summary.sameCount
   */
  sameCountWith(
    ...collections: Array<Iterable<unknown> | Iterator<unknown>>
  ): boolean {
    return sameCount(this.data, ...collections);
  }

  /**
   * Converts stream to Array.
   *
   * @see transform.toArray
   */
  toArray(): Array<unknown> {
    return toArray(this);
  }

  /**
   * Converts stream to Map.
   *
   * Stream collection must contain only key-value pairs as elements.
   *
   * @see transform.toMap
   */
  toMap(): Map<unknown, unknown> {
    return toMap(this as Iterable<[unknown, unknown]>);
  }

  /**
   * Converts stream to Set.
   *
   * @see transform.toSet
   */
  toSet(): Set<unknown> {
    return toSet(this);
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
