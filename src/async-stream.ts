import {
  teeAsync,
  toArrayAsync,
  toAsyncIterable,
  toMapAsync,
  toSetAsync,
} from "./transform";
import {
  chunkwiseAsync,
  chunkwiseOverlapAsync,
  compressAsync,
  dropWhileAsync,
  enumerateAsync,
  filterAsync,
  flatMapAsync,
  flattenAsync,
  groupByAsync,
  keysAsync,
  limitAsync,
  mapAsync,
  pairwiseAsync,
  skipAsync,
  sliceAsync,
  sortAsync,
  takeWhileAsync,
  valuesAsync,
} from "./single";
import {
  chainAsync,
  zipAsync,
  zipEqualAsync,
  zipFilledAsync,
  zipLongestAsync,
} from "./multi";
import { runningTotalAsync, runningProductAsync } from "./math";
import {
  distinctAsync,
  intersectionAsync,
  partialIntersectionAsync,
  symmetricDifferenceAsync,
  unionAsync,
} from "./set";
import {
  toAverageAsync,
  toCountAsync,
  toFirstAndLastAsync,
  toFirstAsync,
  toLastAsync,
  toMaxAsync,
  toMinAsync,
  toMinMaxAsync,
  toProductAsync,
  toSumAsync,
  toValueAsync,
} from "./reduce";
import {
  allMatchAsync,
  allUniqueAsync,
  anyMatchAsync,
  isReversedAsync,
  isSortedAsync,
  noneMatchAsync,
  sameAsync,
  sameCountAsync,
} from "./summary";
import { AsyncFlatMapper, Comparable, Comparator } from "./types";

/**
 * Provides fluent interface for working with async iterables.
 */
export class AsyncStream {
  /**
   * Iterable source
   */
  protected data: AsyncIterable<unknown>;

  /**
   * Creates iterable instance with fluent interface.
   *
   * @param data
   */
  static of(
    data:
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
  ): AsyncStream {
    return new AsyncStream(toAsyncIterable(data));
  }

  /**
   * Creates iterable instance with fluent interface from empty iterable source.
   */
  static ofEmpty(): AsyncStream {
    return new AsyncStream(toAsyncIterable([]));
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
   * @see multi.zipAsync
   */
  zipWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = zipAsync(this.data, ...iterables);
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
   * @see multi.zipLongestAsync
   */
  zipFilledWith(
    filler: unknown,
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = zipFilledAsync(filler, this.data, ...iterables);
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
   * @see multi.zipLongestAsync
   */
  zipLongestWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = zipLongestAsync(this.data, ...iterables);
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
   * @see multi.zipEqualAsync
   */
  zipEqualWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = zipEqualAsync(this.data, ...iterables);
    return this;
  }

  /**
   * Chain stream collection withs given iterables together into a single iteration.
   *
   * Makes a single continuous sequence out of multiple sequences.
   *
   * @param iterables
   *
   * @see multi.chainAsync
   */
  chainWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = chainAsync(this.data, ...iterables);
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
   * @see single.chunkwiseOverlapAsync
   */
  chunkwiseOverlap(
    chunkSize: number,
    overlapSize: number,
    includeIncompleteTail = true
  ): AsyncStream {
    this.data = chunkwiseOverlapAsync(
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
   * @see single.chunkwiseAsync
   */
  chunkwise(chunkSize: number): AsyncStream {
    this.data = chunkwiseAsync(this.data, chunkSize);
    return this;
  }

  /**
   * Compress an iterable source by filtering out data that is not selected.
   *
   * Selectors indicate which data. True value selects item. False value filters out data.
   *
   * @param selectors
   *
   * @see single.compressAsync
   */
  compress(
    selectors:
      | AsyncIterable<number | boolean>
      | AsyncIterator<number | boolean>
      | Iterable<number | boolean>
      | Iterator<number | boolean>
  ): AsyncStream {
    this.data = compressAsync(this.data, selectors);
    return this;
  }

  /**
   * Drop elements from the iterable source while the predicate function is true.
   *
   * Once the predicate function returns false once, all remaining elements are returned.
   *
   * @param predicate
   *
   * @see single.dropWhileAsync
   */
  dropWhile(
    predicate: (item: unknown) => Promise<boolean> | boolean
  ): AsyncStream {
    this.data = dropWhileAsync(this.data, predicate);
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning elements where there predicate function is true.
   *
   * @param predicate
   *
   * @see single.filterAsync
   */
  filter(
    predicate: (item: unknown) => Promise<boolean> | boolean
  ): AsyncStream {
    this.data = filterAsync(this.data, predicate);
    return this;
  }

  /**
   * Enumerates items of given collection.
   *
   * @see single.enumerateAsync
   */
  enumerate(): AsyncStream {
    this.data = enumerateAsync(this.data);
    return this;
  }

  /**
   * Iterates keys from the collection of key-value pairs.
   *
   * @see single.keysAsync
   */
  keys(): AsyncStream {
    this.data = keysAsync(
      this.data as
        | AsyncIterable<[unknown, unknown]>
        | AsyncIterator<[unknown, unknown]>
        | Iterable<[unknown, unknown]>
        | Iterator<[unknown, unknown]>
    );
    return this;
  }

  /**
   * Limit iteration to a max size limit.
   *
   * @param count
   *
   * @see single.limitAsync
   */
  limit(count: number): AsyncStream {
    this.data = limitAsync(this.data, count);
    return this;
  }

  /**
   * Map a function onto every element of the stream
   *
   * @param mapper
   *
   * @see single.mapAsync
   */
  map(mapper: (datum: unknown) => Promise<unknown> | unknown): AsyncStream {
    this.data = mapAsync(this.data, mapper);
    return this;
  }

  /**
   * Returns a new collection formed by applying a given callback function
   * to each element of the stream, and then flattening the result by one level.
   *
   * @param mapper
   *
   * @see single.flatMapAsync
   */
  flatMap(mapper: AsyncFlatMapper<unknown, unknown>): AsyncStream {
    this.data = flatMapAsync(this.data, mapper);
    return this;
  }

  /**
   * Flatten a stream.
   *
   * @param dimensions
   *
   * @see single.flattenAsync
   */
  flatten(dimensions = Infinity): AsyncStream {
    this.data = flattenAsync(this.data, dimensions);
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
   * @see single.groupByAsync
   */
  groupBy(
    groupKeyFunction: (item: unknown) => Promise<string> | string,
    itemKeyFunction?: (item: unknown) => Promise<string> | string
  ): AsyncStream {
    this.data = groupByAsync(this.data, groupKeyFunction, itemKeyFunction);
    return this;
  }

  /**
   * Return pairs of elements from iterable source.
   *
   * Produces empty generator if given collection contains less than 2 elements.
   *
   * @see single.pairwiseAsync
   */
  pairwise(): AsyncStream {
    this.data = pairwiseAsync(this.data);
    return this;
  }

  /**
   * Accumulate the running total over the stream.
   *
   * @param initialValue (Optional) If provided, the running total leads off with the initial value.
   *
   * @see math.runningTotalAsync
   */
  runningTotal(initialValue?: number): AsyncStream {
    this.data = runningTotalAsync(this.data, initialValue);
    return this;
  }

  /**
   * Accumulate the running product over the stream.
   *
   * @param initialValue (Optional) If provided, the running product leads off with the initial value.
   *
   * @see math.runningProductAsync
   */
  runningProduct(initialValue?: number): AsyncStream {
    this.data = runningProductAsync(this.data, initialValue);
    return this;
  }

  /**
   * Skip n elements in the stream after optional offset.
   *
   * @param count
   * @param offset
   *
   * @see single.skipAsync
   */
  skip(count: number, offset = 0): AsyncStream {
    this.data = skipAsync(this.data, count, offset);
    return this;
  }

  /**
   * Extract a slice of the stream.
   *
   * @param start
   * @param count
   * @param step
   *
   * @see single.sliceAsync
   */
  slice(start = 0, count?: number, step = 1): AsyncStream {
    this.data = sliceAsync(this.data, start, count, step);
    return this;
  }

  /**
   * Return elements from the iterable source as long as the predicate is true.
   *
   * If no predicate is provided, the boolean value of the data is used.
   *
   * @param predicate
   *
   * @see single.takeWhileAsync
   */
  takeWhile(
    predicate: (item: unknown) => Promise<boolean> | boolean
  ): AsyncStream {
    this.data = takeWhileAsync(this.data, predicate);
    return this;
  }

  /**
   * Iterates values from the collection of key-value pairs.
   *
   * @see single.valuesAsync
   */
  values(): AsyncStream {
    this.data = valuesAsync(
      this.data as
        | AsyncIterable<[unknown, unknown]>
        | AsyncIterator<[unknown, unknown]>
        | Iterable<[unknown, unknown]>
        | Iterator<[unknown, unknown]>
    );
    return this;
  }

  /**
   * Sorts the stream.
   *
   * If comparator is `undefined`, then elements of the iterable source must be comparable.
   *
   * @see single.sort
   */
  sort(comparator?: Comparator<unknown>): AsyncStream {
    this.data = sortAsync(this.data, comparator);
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning unique elements.
   *
   * @see set.distinctAsync
   */
  distinct(): AsyncStream {
    this.data = distinctAsync(this.data);
    return this;
  }

  /**
   * Iterates the intersection of iterable source and given iterables.
   *
   * Always treats different instances of objects and arrays as unequal.
   *
   * @param iterables
   *
   * @see set.intersectionAsync
   */
  intersectionWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = intersectionAsync(this.data, ...iterables);
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
   * @see set.partialIntersectionAsync
   */
  partialIntersectionWith(
    minIntersectionCount: number,
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = partialIntersectionAsync(
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
   * @see set.symmetricDifferenceAsync
   */
  symmetricDifferenceWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = symmetricDifferenceAsync(this.data, ...iterables);
    return this;
  }

  /**
   * Iterates union of iterable source and given iterables.
   *
   * Always treats different instances of objects and arrays as unequal.
   *
   * @param iterables
   *
   * @see set.unionAsync
   */
  unionWith(
    ...iterables: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): AsyncStream {
    this.data = unionAsync(this.data, ...iterables);
    return this;
  }

  /**
   * Peek at each element between other Stream operations to do some action without modifying the stream.
   *
   * Useful for debugging purposes.
   *
   * @param callback
   */
  public peek(callback: (datum: unknown) => void): AsyncStream {
    const [data, peekable] = teeAsync(this.data, 2);
    this.data = data;

    (async () => {
      for await (const element of peekable) {
        callback(element);
      }
    })();

    return this;
  }

  /**
   * Peek at the entire stream between other Stream operations to do some action without modifying the stream.
   *
   * Useful for debugging purposes.
   *
   * @param callback
   */
  public peekStream(callback: (datum: AsyncStream) => void): AsyncStream {
    const [data, peekable] = teeAsync(this.data, 2);
    this.data = data;

    callback(AsyncStream.of(peekable));

    return this;
  }

  /**
   * Reduces iterable source like `array.reduce()` function.
   *
   * @param reducer
   * @param initialValue
   *
   * @see reduce.toValueAsync
   */
  async toValue<T>(
    reducer: (carry: T | undefined, datum: unknown) => Promise<T> | T,
    initialValue?: T
  ): Promise<T | undefined> {
    return await toValueAsync(this, reducer, initialValue);
  }

  /**
   * Reduces iterable source to the mean average of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toAverageAsync
   */
  async toAverage(): Promise<number | undefined> {
    return await toAverageAsync(this as AsyncIterable<number>);
  }

  /**
   * Reduces iterable source to its length.
   *
   * @see reduce.toCountAsync
   */
  async toCount(): Promise<number> {
    return await toCountAsync(this as AsyncIterable<number>);
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
   * @see reduce.toMaxAsync
   */
  async toMax(
    compareBy?: (datum: unknown) => Promise<Comparable> | Comparable
  ): Promise<unknown | undefined> {
    return await toMaxAsync(this, compareBy);
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
   * @see reduce.toMinAsync
   */
  async toMin(
    compareBy?: (datum: unknown) => Promise<Comparable> | Comparable
  ): Promise<unknown | undefined> {
    return await toMinAsync(this, compareBy);
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
   *
   * @see reduce.toMinMaxAsync
   */
  async toMinMax(
    compareBy?: (item: unknown) => Promise<Comparable> | Comparable
  ): Promise<[unknown?, unknown?]> {
    return await toMinMaxAsync(this, compareBy);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAsync
   */
  async toFirst(): Promise<unknown> {
    return await toFirstAsync(this);
  }

  /**
   * Returns the first and last elements of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAndLastAsync
   */
  async toFirstAndLast(): Promise<unknown> {
    return await toFirstAndLastAsync(this);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toLastAsync
   */
  async toLast(): Promise<unknown> {
    return await toLastAsync(this);
  }

  /**
   * Reduces iterable source to the sum of its items.
   *
   * @see reduce.toSumAsync
   */
  async toSum(): Promise<number> {
    return await toSumAsync(this as AsyncIterable<number>);
  }

  /**
   * Reduces iterable source to the product of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toProductAsync
   */
  async toProduct(): Promise<number | undefined> {
    return await toProductAsync(this as AsyncIterable<number>);
  }

  /**
   * Returns true if all elements of stream match the predicate function.
   *
   * For empty stream returns true.
   *
   * @param predicate
   *
   * @see summary.allMatchAsync
   */
  async allMatch(
    predicate: (item: unknown) => Promise<boolean> | boolean
  ): Promise<boolean> {
    return await allMatchAsync(this, predicate);
  }

  /**
   * Returns true if all elements of stream are unique.
   *
   * For empty stream returns true.
   *
   * Considers different instances of data containers to be different, even if they have the same content.
   *
   * @see summary.allUniqueAsync
   */
  async allUnique(): Promise<boolean> {
    return await allUniqueAsync(this);
  }

  /**
   * Returns true if any element of stream matches the predicate function.
   *
   * For empty stream returns false.
   *
   * @param predicate
   *
   * @see summary.anyMatchAsync
   */
  async anyMatch(
    predicate: (item: unknown) => Promise<boolean> | boolean
  ): Promise<boolean> {
    return await anyMatchAsync(this, predicate);
  }

  /**
   * Returns true if stream is sorted in ascending order; otherwise false.
   *
   * Items of stream source must be comparable.
   *
   * Also returns true if stream is empty or has only one element.
   *
   * @see summary.isSortedAsync
   */
  async isSorted(): Promise<boolean> {
    return await isSortedAsync(this as AsyncIterable<Comparable>);
  }

  /**
   * Returns true if stream is sorted in descending order; otherwise false.
   *
   * Items of stream source must be comparable.
   *
   * Also returns true if stream is empty or has only one element.
   *
   * @see summary.isReversedAsync
   */
  async isReversed(): Promise<boolean> {
    return await isReversedAsync(this as AsyncIterable<Comparable>);
  }

  /**
   * Returns true if no element of stream matches the predicate function.
   *
   * For empty stream returns true.
   *
   * @param predicate
   *
   * @see summary.noneMatchAsync
   */
  async noneMatch(
    predicate: (item: unknown) => Promise<boolean> | boolean
  ): Promise<boolean> {
    return await noneMatchAsync(this, predicate);
  }

  /**
   * Returns true if stream collection and all given collections are the same.
   *
   * For empty collections list returns true.
   *
   * @param collections
   *
   * @see summary.sameAsync
   */
  async sameWith(
    ...collections: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): Promise<boolean> {
    return await sameAsync(this.data, ...collections);
  }

  /**
   * Returns true if stream collection and all given collections have the same lengths.
   *
   * For empty collections list returns true.
   *
   * @param collections
   *
   * @see summary.sameCountAsync
   */
  async sameCountWith(
    ...collections: Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  ): Promise<boolean> {
    return await sameCountAsync(this.data, ...collections);
  }

  /**
   * Return several independent async streams from current stream.
   *
   * Once a tee() has been created, the original iterable should not be used anywhere else;
   * otherwise, the iterable could get advanced without the tee objects being informed.
   *
   * This tool may require significant auxiliary storage (depending on how much temporary data needs to be stored).
   * In general, if one iterator uses most or all of the data before another iterator starts,
   * it is faster to use toArray() instead of tee().
   *
   * @param count
   *
   * @see transform.teeAsync
   */
  public tee(count: number): Array<AsyncStream> {
    return teeAsync(this.data, count).map(
      (iterable) => new AsyncStream(iterable)
    );
  }

  /**
   * Converts stream to Array.
   *
   * @see transform.toArrayAsync
   */
  async toArray(): Promise<Array<unknown>> {
    return await toArrayAsync(this);
  }

  /**
   * Converts stream to Map.
   *
   * Stream collection must contain only key-value pairs as elements.
   *
   * @see transform.toMapAsync
   */
  async toMap(): Promise<Map<unknown, unknown>> {
    return await toMapAsync(this as AsyncIterable<[unknown, unknown]>);
  }

  /**
   * Converts stream to Set.
   *
   * @see transform.toSetAsync
   */
  async toSet(): Promise<Set<unknown>> {
    return await toSetAsync(this);
  }

  /**
   * Aggregated iterator.
   */
  async *[Symbol.asyncIterator](): AsyncIterator<unknown> {
    for await (const datum of this.data) {
      yield datum;
    }
  }

  /**
   * Stream constructor.
   *
   * @param iterable
   */
  protected constructor(iterable: AsyncIterable<unknown>) {
    this.data = iterable;
  }
}
