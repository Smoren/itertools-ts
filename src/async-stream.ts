import * as transform from "./transform";
import * as single from "./single";
import * as multi from "./multi";
import * as math from "./math";
import * as set from "./set";
import * as combinatorics from "./combinatorics";
import * as reduce from "./reduce";
import * as summary from "./summary";
import * as infinite from "./infinite";
import * as random from "./random";
import { AsyncFlatMapper, Comparable, Comparator, Numeric, Pair, ZipTuple } from "./types";

/**
 * Provides fluent interface for working with async iterables.
 */
export class AsyncStream<T> implements AsyncIterable<T> {
  /**
   * Iterable source
   */
  protected data: AsyncIterable<T>;

  /**
   * Creates iterable instance with fluent interface.
   *
   * @param data
   */
  static of<T>(
    data:
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
  ): AsyncStream<T> {
    return new AsyncStream(transform.toAsyncIterable(data));
  }

  /**
   * Creates iterable instance with fluent interface from empty iterable source.
   */
  static ofEmpty(): AsyncStream<never> {
    return new AsyncStream(transform.toAsyncIterable([]));
  }

  /**
   * Creates iterable instance with fluent interface from infinite count iterable.
   *
   * @param start (optional, default 1)
   * @param step (optional, default 1)
   */
  static ofCount(start: number = 1, step: number = 1): AsyncStream<number> {
    return new AsyncStream(transform.toAsyncIterable(infinite.count(start, step)));
  }

  /**
   * Creates iterable instance with fluent interface from infinite collection items repeating.
   *
   * @param iterable
   */
  static ofCycle<T>(
    iterable:
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
  ): AsyncStream<T> {
    return new AsyncStream(infinite.cycleAsync(iterable));
  }

  /**
   * Creates iterable instance with fluent interface from infinite item repeating.
   *
   * @param item
   */
  static ofRepeat<T>(item: T): AsyncStream<T> {
    return new AsyncStream(transform.toAsyncIterable(infinite.repeat(item)));
  }

  /**
   * Creates iterable instance with fluent interface from infinite random boolean values.
   *
   * @param repetitions (optional) If provided, generates exactly this many booleans.
   *                   If not provided, generates booleans infinitely.
   *
   * @see random.booleansAsync
   */
  static ofBooleans(repetitions?: number): AsyncStream<boolean> {
    return new AsyncStream(random.booleansAsync(repetitions));
  }

  /**
   * Generate random percentages between 0 (inclusive) and 1 (exclusive) asynchronously.
   *
   * If optional param `repetitions` is not given, iterates infinitely.
   *
   * @param repetitions - Number of values to generate
   *
   * @see random.percentageAsync
   */
  static ofPercentage(repetitions?: number): AsyncStream<number> {
    return new AsyncStream(random.percentageAsync(repetitions));
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
  zipWith<
    U extends Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  >(...iterables: U): AsyncStream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = multi.zipAsync(this.data, ...iterables) as AsyncIterable<T>;
    return this as unknown as AsyncStream<ZipTuple<[Iterable<T>, ...U], never>>;
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
  zipFilledWith<
    U extends Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >,
    F
  >(filler: F, ...iterables: U): AsyncStream<ZipTuple<[Iterable<T>, ...U], F>> {
    this.data = multi.zipFilledAsync(filler, this.data, ...iterables) as AsyncIterable<T>;
    return this as unknown as AsyncStream<ZipTuple<[Iterable<T>, ...U], F>>;
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
  zipLongestWith<
    U extends Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  >(...iterables: U): AsyncStream<ZipTuple<[Iterable<T>, ...U], undefined>> {
    this.data = multi.zipLongestAsync(this.data, ...iterables) as AsyncIterable<T>;
    return this as unknown as AsyncStream<ZipTuple<[Iterable<T>, ...U], undefined>>;
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
  zipEqualWith<
    U extends Array<
      | AsyncIterable<unknown>
      | AsyncIterator<unknown>
      | Iterable<unknown>
      | Iterator<unknown>
    >
  >(...iterables: U): AsyncStream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = multi.zipEqualAsync(this.data, ...iterables) as AsyncIterable<T>;
    return this as unknown as AsyncStream<ZipTuple<[Iterable<T>, ...U], never>>;
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
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
    >
  ): AsyncStream<T> {
    this.data = multi.chainAsync(this.data, ...iterables) as AsyncIterable<T>;
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
  ): AsyncStream<Array<T>> {
    this.data = single.chunkwiseOverlapAsync(
      this.data,
      chunkSize,
      overlapSize,
      includeIncompleteTail
    ) as AsyncIterable<T>;
    return this as unknown as AsyncStream<Array<T>>;
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
  chunkwise(chunkSize: number): AsyncStream<Array<T>> {
    this.data = single.chunkwiseAsync(this.data, chunkSize) as AsyncIterable<T>;
    return this as unknown as AsyncStream<Array<T>>;
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
  ): AsyncStream<T> {
    this.data = single.compressAsync(this.data, selectors);
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
    predicate: (item: T) => Promise<boolean> | boolean
  ): AsyncStream<T> {
    this.data = single.dropWhileAsync(this.data, predicate);
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
    predicate: (item: T) => Promise<boolean> | boolean
  ): AsyncStream<T> {
    this.data = single.filterAsync(this.data, predicate);
    return this;
  }

  /**
   * Enumerates items of given collection.
   *
   * @see single.enumerateAsync
   */
  enumerate(): AsyncStream<[number, T]> {
    this.data = single.enumerateAsync(this.data) as AsyncIterable<T>;
    return this as unknown as AsyncStream<[number, T]>;
  }

  /**
   * Iterates keys from the collection of key-value pairs.
   *
   * @see single.keysAsync
   */
  keys(): AsyncStream<T extends [infer TKey, infer _] ? TKey : never> {
    this.data = single.keysAsync(this.data as AsyncIterable<[unknown, unknown]>) as AsyncIterable<T>;
    return this as AsyncStream<T extends [infer TKey, infer _] ? TKey : never>;
  }

  /**
   * Limit iteration to a max size limit.
   *
   * @param count
   *
   * @see single.limitAsync
   */
  limit(count: number): AsyncStream<T> {
    this.data = single.limitAsync(this.data, count);
    return this;
  }

  /**
   * Map a function onto every element of the stream
   *
   * @param mapper
   *
   * @see single.mapAsync
   */
  map<U>(mapper: (datum: T) => Promise<U> | U): AsyncStream<U> {
    this.data = single.mapAsync(this.data, mapper) as unknown as AsyncIterable<T>;
    return this as unknown as AsyncStream<U>;
  }

  /**
   * Returns a new collection formed by applying a given callback function
   * to each element of the stream, and then flattening the result by one level.
   *
   * @param mapper
   *
   * @see single.flatMapAsync
   */
  flatMap<U>(mapper: AsyncFlatMapper<T, U>): AsyncStream<U> {
    this.data = single.flatMapAsync(this.data, mapper) as unknown as AsyncIterable<T>;
    return this as unknown as AsyncStream<U>;
  }

  /**
   * Flatten a stream.
   *
   * @param dimensions
   *
   * @see single.flattenAsync
   */
  flatten(dimensions = Infinity): AsyncStream<unknown> {
    this.data = single.flattenAsync(this.data, dimensions) as AsyncIterable<T>;
    return this as AsyncStream<unknown>;
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
  groupBy<
    TItemKeyFunction extends ((item: T) => string) | undefined,
    TResultItem extends TItemKeyFunction extends undefined ? [string, Array<T>] : [string, Record<string, T>]
  >(
    groupKeyFunction: (item: T) => Promise<string> | string,
    itemKeyFunction?: TItemKeyFunction
  ): AsyncStream<TResultItem> {
    this.data = single.groupByAsync(this.data, groupKeyFunction, itemKeyFunction) as AsyncIterable<T>;
    return this as unknown as AsyncStream<TResultItem>;
  }

  /**
   * Return pairs of elements from iterable source.
   *
   * Produces empty generator if given collection contains less than 2 elements.
   *
   * @see single.pairwiseAsync
   */
  pairwise(): AsyncStream<Pair<T>> {
    this.data = single.pairwiseAsync(this.data) as AsyncIterable<T>;
    return this as unknown as AsyncStream<Pair<T>>;
  }

  /**
   * Accumulate the running average (mean) over the stream.
   *
   * @param initialValue (Optional) If provided, the running average leads off with the initial value.
   *
   * @see math.runningAverageAsync
   */
  runningAverage(initialValue?: number): AsyncStream<number> {
    this.data = math.runningAverageAsync(this.data as AsyncIterable<Numeric>, initialValue) as AsyncIterable<T>;
    return this as unknown as AsyncStream<number>;
  }

  /**
   * Accumulate the running difference over the stream.
   *
   * @param initialValue (Optional) If provided, the running difference leads off with the initial value.
   *
   * @see math.runningDifferenceAsync
   */
  runningDifference(initialValue?: number): AsyncStream<number> {
    this.data = math.runningDifferenceAsync(this.data as AsyncIterable<Numeric>, initialValue) as AsyncIterable<T>;
    return this as unknown as AsyncStream<number>;
  }

  /**
   * Accumulate the running max over the stream.
   *
   * @param initialValue (Optional) If provided, the running max leads off with the initial value.
   *
   * @see math.runningMaxAsync
   */
  runningMax(initialValue?: number): AsyncStream<number> {
    this.data = math.runningMaxAsync(this.data as AsyncIterable<Numeric>, initialValue) as AsyncIterable<T>;
    return this as unknown as AsyncStream<number>;
  }

  /**
   * Accumulate the running min over the stream.
   *
   * @param initialValue (Optional) If provided, the running min leads off with the initial value.
   *
   * @see math.runningMinAsync
   */
  runningMin(initialValue?: number): AsyncStream<number> {
    this.data = math.runningMinAsync(this.data as AsyncIterable<Numeric>, initialValue) as AsyncIterable<T>;
    return this as unknown as AsyncStream<number>;
  }

  /**
   * Accumulate the running product over the stream.
   *
   * @param initialValue (Optional) If provided, the running product leads off with the initial value.
   *
   * @see math.runningProductAsync
   */
  runningProduct(initialValue?: number): AsyncStream<number> {
    this.data = math.runningProductAsync(this.data as AsyncIterable<Numeric>, initialValue) as AsyncIterable<T>;
    return this as unknown as AsyncStream<number>;
  }

  /**
   * Accumulate the running total over the stream.
   *
   * @param initialValue (Optional) If provided, the running total leads off with the initial value.
   *
   * @see math.runningTotalAsync
   */
  runningTotal(initialValue?: number): AsyncStream<number> {
    this.data = math.runningTotalAsync(this.data as AsyncIterable<Numeric>, initialValue) as AsyncIterable<T>;
    return this as unknown as AsyncStream<number>;
  }

  /**
   * Skip n elements in the stream after optional offset.
   *
   * @param count
   * @param offset
   *
   * @see single.skipAsync
   */
  skip(count: number, offset = 0): AsyncStream<T> {
    this.data = single.skipAsync(this.data, count, offset);
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
  slice(start: number = 0, count?: number, step: number = 1): AsyncStream<T> {
    this.data = single.sliceAsync(this.data, start, count, step);
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
    predicate: (item: T) => Promise<boolean> | boolean
  ): AsyncStream<T> {
    this.data = single.takeWhileAsync(this.data, predicate);
    return this;
  }

  /**
   * Iterates values from the collection of key-value pairs.
   *
   * @see single.valuesAsync
   */
  values(): AsyncStream<T extends [infer _, infer TValue] ? TValue : never> {
    this.data = single.valuesAsync(this.data as AsyncIterable<[unknown, unknown]>) as AsyncIterable<T>;
    return this as AsyncStream<T extends [infer _, infer TValue] ? TValue : never>;
  }

  /**
   * Sorts the stream.
   *
   * If comparator is `undefined`, then elements of the iterable source must be comparable.
   *
   * @see single.sort
   */
  sort(comparator?: Comparator<T>): AsyncStream<T> {
    this.data = single.sortAsync(this.data, comparator);
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning unique elements.
   *
   * @param compareBy
   *
   * @see set.distinctAsync
   */
  distinct(compareBy?: (datum: T) => Comparable): AsyncStream<T> {
    this.data = set.distinctAsync(this.data, compareBy);
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
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
    >
  ): AsyncStream<T> {
    this.data = set.intersectionAsync(this.data, ...iterables);
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
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
    >
  ): AsyncStream<T> {
    this.data = set.partialIntersectionAsync(
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
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
    >
  ): AsyncStream<T> {
    this.data = set.symmetricDifferenceAsync(this.data, ...iterables);
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
      | AsyncIterable<T>
      | AsyncIterator<T>
      | Iterable<T>
      | Iterator<T>
    >
  ): AsyncStream<T> {
    this.data = set.unionAsync(this.data, ...iterables);
    return this;
  }

  /**
   * Iterates cartesian product of iterable source and given iterables.
   *
   * @param iterables
   *
   * @see combinatorics.cartesianProductAsync
   */
  cartesianProductWith<U extends Array<
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
  >>(...iterables: U): AsyncStream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = combinatorics.cartesianProductAsync(this.data, ...iterables) as AsyncIterable<T>;
    return this as unknown as AsyncStream<ZipTuple<[Iterable<T>, ...U], never>>;
  }

  /**
   * Iterates all permutations of iterable source.
   *
   * @param length
   *
   * @see combinatorics.permutations
   */
  permutations(length: number): AsyncStream<Array<T>> {
    this.data = combinatorics.permutationsAsync(this.data, length) as AsyncIterable<T>;
    return this as unknown as AsyncStream<Array<T>>;
  }

  /**
   * Iterates all combinations of iterable source.
   *
   * @param length
   *
   * @see combinatorics.combinations
   */
  combinations(length: number): AsyncStream<Array<T>> {
    this.data = combinatorics.combinationsAsync(this.data, length) as AsyncIterable<T>;
    return this as unknown as AsyncStream<Array<T>>;
  }

  /**
   * Peek at each element between other Stream operations to do some action without modifying the stream.
   *
   * Useful for debugging purposes.
   *
   * @param callback
   */
  peek(callback: (datum: unknown) => void): AsyncStream<T> {
    const [data, peekable] = transform.teeAsync(this.data, 2);
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
  peekStream(callback: (datum: AsyncStream<T>) => void): AsyncStream<T> {
    const [data, peekable] = transform.teeAsync(this.data, 2);
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
  async toValue<U>(
    reducer: (carry: U, datum: T) => Promise<U> | U,
    initialValue?: U
  ): Promise<U> {
    return await reduce.toValueAsync(this, reducer, initialValue as U);
  }

  /**
   * Reduces iterable source to the mean average of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toAverageAsync
   */
  async toAverage(): Promise<number | undefined> {
    return await reduce.toAverageAsync(this as AsyncIterable<number>);
  }

  /**
   * Reduces iterable source to its length.
   *
   * @see reduce.toCountAsync
   */
  async toCount(): Promise<number> {
    return await reduce.toCountAsync(this as AsyncIterable<number>);
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
  async toMax(compareBy?: (datum: T) => Promise<Comparable> | Comparable): Promise<T | undefined> {
    return await reduce.toMaxAsync(this, compareBy);
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
  async toMin(compareBy?: (datum: T) => Promise<Comparable> | Comparable): Promise<T | undefined> {
    return await reduce.toMinAsync(this, compareBy);
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
  async toMinMax(compareBy?: (item: T) => Promise<Comparable> | Comparable): Promise<[T?, T?]> {
    return await reduce.toMinMaxAsync(this, compareBy);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAsync
   */
  async toFirst(): Promise<T> {
    return await reduce.toFirstAsync(this);
  }

  /**
   * Returns the first and last elements of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAndLastAsync
   */
  async toFirstAndLast(): Promise<[T, T]> {
    return await reduce.toFirstAndLastAsync(this);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toLastAsync
   */
  async toLast(): Promise<T> {
    return await reduce.toLastAsync(this);
  }

  /**
   * Reduces iterable source to the sum of its items.
   *
   * @see reduce.toSumAsync
   */
  async toSum(): Promise<number> {
    return await reduce.toSumAsync(this as AsyncIterable<number>);
  }

  /**
   * Reduces iterable source to the product of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toProductAsync
   */
  async toProduct(): Promise<number | undefined> {
    return await reduce.toProductAsync(this as AsyncIterable<number>);
  }

  /**
   * Reduces given collection to its range.
   *
   * Returns 0 if given collection is empty.
   *
   * @see reduce.toRangeAsync
   */
  async toRange(): Promise<number> {
    return await reduce.toRangeAsync(this as AsyncIterable<number>);
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
  async allMatch(predicate: (item: T) => Promise<boolean> | boolean): Promise<boolean> {
    return await summary.allMatchAsync(this, predicate);
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
    return await summary.allUniqueAsync(this);
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
  async anyMatch(predicate: (item: T) => Promise<boolean> | boolean): Promise<boolean> {
    return await summary.anyMatchAsync(this, predicate);
  }

  /**
   * Returns true if exactly n items in the async iterable are true where the predicate function is true.
   *
   * Default predicate if not provided is the boolean value of each data item.
   *
   * @param n
   * @param predicate
   *
   * @see summary.exactlyNAsync
   */
  async exactlyN(n: number, predicate?: (item: T) => Promise<boolean> | boolean): Promise<boolean> {
    return summary.exactlyNAsync(this, n, predicate);
  }

  /**
   * Returns true if given stream is empty.
   * 
   * @see summary.isEmptyAsync
   */
  async isEmpty(): Promise<boolean> {
    return summary.isEmptyAsync(this);
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
    return await summary.isSortedAsync(this as AsyncIterable<Comparable>);
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
    return await summary.isReversedAsync(this as AsyncIterable<Comparable>);
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
    predicate: (item: T) => Promise<boolean> | boolean
  ): Promise<boolean> {
    return await summary.noneMatchAsync(this, predicate);
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
    return await summary.sameAsync(this.data, ...collections);
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
    return await summary.sameCountAsync(this.data, ...collections);
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
  tee(count: number): Array<AsyncStream<T>> {
    return transform.teeAsync(this.data, count).map(
      (iterable) => new AsyncStream(iterable)
    );
  }

  /**
   * Converts stream to Array.
   *
   * @see transform.toArrayAsync
   */
  async toArray(): Promise<Array<T>> {
    return await transform.toArrayAsync(this);
  }

  /**
   * Converts stream to Map.
   *
   * Stream collection must contain only key-value pairs as elements.
   *
   * @see transform.toMapAsync
   */
  async toMap(): Promise<T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never> {
    return await transform.toMapAsync(this as AsyncIterable<[unknown, unknown]>) as unknown as Promise<T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never>;
  }

  /**
   * Converts stream to Set.
   *
   * @see transform.toSetAsync
   */
  async toSet(): Promise<Set<T>> {
    return await transform.toSetAsync(this);
  }

  /**
   * Aggregated iterator.
   */
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    for await (const datum of this.data) {
      yield datum;
    }
  }

  /**
   * Stream constructor.
   *
   * @param iterable
   */
  protected constructor(iterable: AsyncIterable<T>) {
    this.data = iterable;
  }
}
