import * as transform from "./transform";
import * as single from "./single";
import * as multi from "./multi";
import * as math from "./math";
import * as set from "./set";
import * as combinatorics from "./combinatorics";
import * as reduce from "./reduce";
import * as summary from "./summary";
import * as random from "./random";
import * as infinite from "./infinite";
import type { Comparable, Comparator, FlatMapper, Numeric, ZipTuple } from "./types";

/**
 * Provides fluent interface for working with iterables.
 */
export class Stream<T> implements Iterable<T> {
  /**
   * Iterable source
   */
  protected data: Iterable<T>;

  /**
   * Creates iterable instance with fluent interface.
   *
   * @param data
   */
  static of<T>(data: Iterable<T> | Iterator<T>): Stream<T> {
    return new Stream(transform.toIterable(data));
  }

  /**
   * Creates iterable instance with fluent interface from empty iterable source.
   */
  static ofEmpty(): Stream<never> {
    return new Stream([]);
  }

  /**
   * Creates iterable instance with fluent interface from infinite count iterable.
   *
   * @param start (optional, default 1)
   * @param step (optional, default 1)
   *
   * @see infinite.count
   */
  static ofCount(start: number = 1, step: number = 1): Stream<number> {
    return new Stream(infinite.count(start, step));
  }

  /**
   * Creates iterable instance with fluent interface from infinite collection items repeating.
   *
   * @param iterable
   *
   * @see infinite.cycle
   */
  static ofCycle<T>(iterable: Iterable<T> | Iterator<T>): Stream<T> {
    return new Stream(infinite.cycle(iterable));
  }

  /**
   * Creates iterable instance with fluent interface from infinite item repeating.
   *
   * @param item
   *
   * @see infinite.repeat
   */
  static ofRepeat<T>(item: T): Stream<T> {
    return new Stream(infinite.repeat(item));
  }

  /**
   * Creates iterable instance with fluent interface from infinite random boolean values.
   *
   * @param repetitions (optional) If provided, generates exactly this many booleans.
   *                   If not provided, generates booleans infinitely.
   *
   * @see infinite.booleans
   */
  static ofBooleans(repetitions?: number): Stream<boolean> {
    return new Stream(random.booleans(repetitions));
  }

  /**
   * Generate random percentages between 0 (inclusive) and 1 (exclusive).
   *
   * If optional param `repetitions` is not given, iterates infinitely.
   *
   * @param repetitions - Number of values to generate
   *
   * @see random.percentage
   */
  static ofPercentage(repetitions?: number): Stream<number> {
    return new Stream(random.percentage(repetitions));
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
  zipWith<
    U extends Array<Iterable<unknown> | Iterator<unknown>>
  >(...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = multi.zip(this.data, ...iterables) as Iterable<T>;
    return this as unknown as Stream<ZipTuple<[Iterable<T>, ...U], never>>;
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
  zipFilledWith<
    U extends Array<Iterable<unknown> | Iterator<unknown>>,
    F
  >(filler: F, ...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], F>> {
    this.data = multi.zipFilled(filler, this.data, ...iterables) as Iterable<T>;
    return this as unknown as Stream<ZipTuple<[Iterable<T>, ...U], F>>;
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
  zipLongestWith<
    U extends Array<Iterable<unknown> | Iterator<unknown>>
  >(...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], undefined>> {
    this.data = multi.zipLongest(this.data, ...iterables) as Iterable<T>;
    return this as unknown as Stream<ZipTuple<[Iterable<T>, ...U], undefined>>;
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
  zipEqualWith<
    U extends Array<Iterable<unknown> | Iterator<unknown>>
  >(...iterables: U): Stream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = multi.zipEqual(this.data, ...iterables) as Iterable<T>;
    return this as unknown as Stream<ZipTuple<[Iterable<T>, ...U], never>>;
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
  chainWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T> {
    this.data = multi.chain(this.data, ...iterables) as Iterable<T>;
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
  ): Stream<Array<T>> {
    this.data = single.chunkwiseOverlap(
      this.data,
      chunkSize,
      overlapSize,
      includeIncompleteTail
    ) as Iterable<T>;
    return this as unknown as Stream<Array<T>>;
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
  chunkwise(chunkSize: number): Stream<Array<T>> {
    this.data = single.chunkwise(this.data, chunkSize) as Iterable<T>;
    return this as unknown as Stream<Array<T>>;
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
  ): Stream<T> {
    this.data = single.compress(this.data, selectors);
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
  dropWhile(predicate: (item: T) => boolean): Stream<T> {
    this.data = single.dropWhile(this.data, predicate);
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning elements where there predicate function is true.
   *
   * @param predicate
   *
   * @see single.filter
   */
  filter(predicate: (item: T) => boolean): Stream<T> {
    this.data = single.filter(this.data, predicate);
    return this;
  }

  /**
   * Enumerates items of given collection.
   *
   * @see single.enumerate
   */
  enumerate(): Stream<[number, T]> {
    this.data = single.enumerate(this.data) as Iterable<T>;
    return this as unknown as Stream<[number, T]>;
  }

  /**
   * Iterates keys from the collection of key-value pairs.
   *
   * @see single.keys
   */
  keys(): Stream<T extends [infer TKey, infer _] ? TKey : never> {
    this.data = single.keys(this.data as Iterable<[unknown, unknown]>) as Iterable<T>;
    return this as unknown as Stream<T extends [infer TKey, infer _] ? TKey : never>;
  }

  /**
   * Limit iteration to a max size limit.
   *
   * @param count
   *
   * @see single.limit
   */
  limit(count: number): Stream<T> {
    this.data = single.limit(this.data, count);
    return this;
  }

  /**
   * Map a function onto every element of the stream
   *
   * @param mapper
   *
   * @see single.map
   */
  map<U>(mapper: (datum: T) => U): Stream<U> {
    this.data = single.map(this.data, mapper) as unknown as Iterable<T>;
    return this as unknown as Stream<U>;
  }

  /**
   * Returns a new collection formed by applying a given callback function
   * to each element of the stream, and then flattening the result by one level.
   *
   * @param mapper
   *
   * @see single.flatMap
   */
  flatMap<U>(mapper: FlatMapper<T, U>): Stream<U> {
    this.data = single.flatMap(this.data, mapper) as unknown as Iterable<T>;
    return this as unknown as Stream<U>;
  }

  /**
   * Flatten a stream.
   *
   * @param dimensions
   *
   * @see single.flatten
   */
  flatten(dimensions: number = Infinity): Stream<unknown> {
    this.data = single.flatten(this.data, dimensions) as Iterable<T>;
    return this as Stream<unknown>;
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
  groupBy<
    TItemKeyFunction extends ((item: T) => string) | undefined,
    TResultItem extends TItemKeyFunction extends undefined ? [string, Array<T>] : [string, Record<string, T>]
  >(
    groupKeyFunction: (item: T) => string,
    itemKeyFunction?: TItemKeyFunction
  ): Stream<TResultItem> {
    this.data = single.groupBy(this.data, groupKeyFunction, itemKeyFunction) as Iterable<T>;
    return this as unknown as Stream<TResultItem>;
  }

  /**
   * Return pairs of elements from iterable source.
   *
   * Produces empty generator if given collection contains less than 2 elements.
   *
   * @see single.pairwise
   */
  pairwise(): Stream<[T, T]> {
    this.data = single.pairwise(this.data) as Iterable<T>;
    return this as unknown as Stream<[T, T]>;
  }

  /**
   * Accumulate the running average (mean) over the stream.
   *
   * @param initialValue (Optional) If provided, the running average leads off with the initial value.
   *
   * @see math.runningAverage
   */
  runningAverage(initialValue?: number): Stream<number> {
    this.data = math.runningAverage(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
    return this as unknown as Stream<number>;
  }

  /**
   * Accumulate the running difference over the stream.
   *
   * @param initialValue (Optional) If provided, the running difference leads off with the initial value.
   *
   * @see math.runningDifference
   */
  runningDifference(initialValue?: number): Stream<number> {
    this.data = math.runningDifference(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
    return this as unknown as Stream<number>;
  }

  /**
   * Accumulate the running max over the stream.
   *
   * @param initialValue (Optional) If provided, the running max leads off with the initial value.
   *
   * @see math.runningMax
   */
  runningMax(initialValue?: number): Stream<number> {
    this.data = math.runningMax(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
    return this as unknown as Stream<number>;
  }

  /**
   * Accumulate the running min over the stream.
   *
   * @param initialValue (Optional) If provided, the running min leads off with the initial value.
   *
   * @see math.runningMin
   */
  runningMin(initialValue?: number): Stream<number> {
    this.data = math.runningMin(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
    return this as unknown as Stream<number>;
  }

  /**
   * Accumulate the running product over the stream.
   *
   * @param initialValue (Optional) If provided, the running product leads off with the initial value.
   *
   * @see math.runningProduct
   */
  runningProduct(initialValue?: number): Stream<number> {
    this.data = math.runningProduct(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
    return this as unknown as Stream<number>;
  }

  /**
   * Accumulate the running total over the stream.
   *
   * @param initialValue (Optional) If provided, the running total leads off with the initial value.
   *
   * @see math.runningTotal
   */
  runningTotal(initialValue?: number): Stream<number> {
    this.data = math.runningTotal(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
    return this as unknown as Stream<number>;
  }

  /**
   * Skip n elements in the stream after optional offset.
   *
   * @param count
   * @param offset
   *
   * @see single.skip
   */
  skip(count: number, offset = 0): Stream<T> {
    this.data = single.skip(this.data, count, offset);
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
  slice(start: number = 0, count?: number, step: number = 1): Stream<T> {
    this.data = single.slice(this.data, start, count, step);
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
  takeWhile(predicate: (item: T) => boolean): Stream<T> {
    this.data = single.takeWhile(this.data, predicate);
    return this;
  }

  /**
   * Iterates values from the collection of key-value pairs.
   *
   * @see single.values
   */
  values(): Stream<T extends [infer _, infer TValue] ? TValue : never> {
    this.data = single.values(this.data as Iterable<[unknown, unknown]>) as Iterable<T>;
    return this as unknown as Stream<T extends [infer _, infer TValue] ? TValue : never>;
  }

  /**
   * Sorts the stream.
   *
   * If comparator is `undefined`, then elements of the iterable source must be comparable.
   *
   * @see single.sort
   */
  sort(comparator?: Comparator<T>): Stream<T> {
    this.data = single.sort(this.data, comparator);
    return this;
  }

  /**
   * Filter out elements from the iterable source only returning unique elements.
   *
   * @param compareBy
   *
   * @see set.distinct
   */
  distinct(compareBy?: (datum: T) => Comparable): Stream<T> {
    this.data = set.distinct(this.data, compareBy);
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
  intersectionWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T> {
    this.data = set.intersection(this.data, ...iterables);
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
    ...iterables: Array<Iterable<T> | Iterator<T>>
  ): Stream<T> {
    this.data = set.partialIntersection(
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
  symmetricDifferenceWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T> {
    this.data = set.symmetricDifference(this.data, ...iterables);
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
  unionWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T> {
    this.data = set.union(this.data, ...iterables);
    return this;
  }

  /**
   * Iterates cartesian product of iterable source and given iterables.
   *
   * @param iterables
   *
   * @see combinatorics.cartesianProduct
   */
  cartesianProductWith<U extends Array<Iterable<unknown> | Iterator<unknown>>>(
    ...iterables: U
  ): Stream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = combinatorics.cartesianProduct(this.data, ...iterables) as Iterable<T>;
    return this as unknown as Stream<ZipTuple<[Iterable<T>, ...U], never>>;
  }

  /**
   * Iterates all permutations of iterable source.
   *
   * @param length
   *
   * @see combinatorics.permutations
   */
  permutations(length: number): Stream<Array<T>> {
    this.data = combinatorics.permutations(this.data, length) as Iterable<T>;
    return this as unknown as Stream<Array<T>>;
  }

  /**
   * Iterates all combinations of iterable source.
   *
   * @param length
   *
   * @see combinatorics.combinations
   */
  combinations(length: number): Stream<Array<T>> {
    this.data = combinatorics.combinations(this.data, length) as Iterable<T>;
    return this as unknown as Stream<Array<T>>;
  }

  /**
   * Peek at each element between other Stream operations to do some action without modifying the stream.
   *
   * Useful for debugging purposes.
   *
   * @param callback
   */
  peek(callback: (datum: unknown) => void): Stream<T> {
    const [data, peekable] = transform.tee(this.data, 2);
    this.data = data;

    for (const element of peekable) {
      callback(element);
    }

    return this;
  }

  /**
   * Peek at the entire stream between other Stream operations to do some action without modifying the stream.
   *
   * Useful for debugging purposes.
   *
   * @param callback
   */
  peekStream(callback: (datum: Stream<T>) => void): Stream<T> {
    const [data, peekable] = transform.tee(this.data, 2);
    this.data = data;

    callback(Stream.of(peekable));

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
  toValue<U>(
    reducer: (carry: U, datum: T) => U,
    initialValue?: U
  ): U {
    return reduce.toValue(this, reducer, initialValue as U);
  }

  /**
   * Reduces iterable source to the mean average of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toAverage
   */
  toAverage(): number | undefined {
    return reduce.toAverage(this as Iterable<number>);
  }

  /**
   * Reduces iterable source to its length.
   *
   * @see reduce.toCount
   */
  toCount(): number {
    return reduce.toCount(this as Iterable<number>);
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
  toMax(compareBy?: (datum: T) => Comparable): T | undefined {
    return reduce.toMax(this, compareBy);
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
  toMin(compareBy?: (datum: T) => Comparable): T | undefined {
    return reduce.toMin(this, compareBy);
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
  toMinMax(compareBy?: (item: T) => Comparable): [T?, T?] {
    return reduce.toMinMax(this, compareBy);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirst
   */
  toFirst(): T {
    return reduce.toFirst(this);
  }

  /**
   * Returns the first and last elements of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAndLast
   */
  toFirstAndLast(): [T, T] {
    return reduce.toFirstAndLast(this);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toLast
   */
  toLast(): T {
    return reduce.toLast(this);
  }

  /**
   * Reduces iterable source to the sum of its items.
   *
   * @see reduce.toSum
   */
  toSum(): number {
    return reduce.toSum(this as Iterable<number>);
  }

  /**
   * Reduces iterable source to the product of its items.
   *
   * Returns `undefined` if iterable source is empty.
   *
   * @see reduce.toProduct
   */
  toProduct(): number | undefined {
    return reduce.toProduct(this as Iterable<number>);
  }

  /**
   * Reduces given collection to its range.
   *
   * Returns 0 if given collection is empty.
   *
   * @see reduce.toRange
   */
  toRange(): number {
    return reduce.toRange(this as Iterable<number>);
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
  allMatch(predicate: (item: T) => boolean): boolean {
    return summary.allMatch(this, predicate);
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
    return summary.allUnique(this);
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
  anyMatch(predicate: (item: T) => boolean): boolean {
    return summary.anyMatch(this, predicate);
  }

  /**
   * Returns true if exactly n items in the iterable are true where the predicate function is true.
   *
   * Default predicate if not provided is the boolean value of each data item.
   *
   * @param n
   * @param predicate
   *
   * @see summary.exactlyN
   */
  exactlyN(n: number, predicate?: (item: T) => boolean): boolean {
    return summary.exactlyN(this, n, predicate);
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
    return summary.isSorted(this as Iterable<Comparable>);
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
    return summary.isReversed(this as Iterable<Comparable>);
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
  noneMatch(predicate: (item: T) => boolean): boolean {
    return summary.noneMatch(this, predicate);
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
  sameWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean {
    return summary.same(this.data, ...collections);
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
  sameCountWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean {
    return summary.sameCount(this.data, ...collections);
  }

  /**
   * Return several independent streams from current stream.
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
   * @see transform.tee
   */
  tee(count: number): Array<Stream<T>> {
    return transform.tee(this.data, count).map((iterable) => new Stream(iterable));
  }

  /**
   * Converts stream to Array.
   *
   * @see transform.toArray
   */
  toArray(): Array<T> {
    return transform.toArray(this);
  }

  /**
   * Converts stream to Map.
   *
   * Stream collection must contain only key-value pairs as elements.
   *
   * @see transform.toMap
   */
  toMap(): T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never {
    return transform.toMap(this as Iterable<[unknown, unknown]>) as T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never;
  }

  /**
   * Converts stream to Set.
   *
   * @see transform.toSet
   */
  toSet(): Set<T> {
    return transform.toSet(this);
  }

  /**
   * Aggregated iterator.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const datum of this.data) {
      yield datum;
    }
  }

  /**
   * Stream constructor.
   *
   * @param iterable
   */
  protected constructor(iterable: Iterable<T>) {
    this.data = iterable;
  }
}
