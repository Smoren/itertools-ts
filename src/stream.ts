import { toArray, toIterable, toMap, toSet, tee, toMapAsync } from "./transform";
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
  skip,
  slice,
  sort,
  takeWhile,
  values,
} from "./single";
import { chain, zip, zipEqual, zipFilled, zipLongest } from "./multi";
import {
  runningAverage,
  runningDifference,
  runningMax,
  runningMin,
  runningProduct,
  runningTotal,
} from "./math";
import {
  cartesianProduct,
  distinct,
  intersection,
  partialIntersection,
  permutations,
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
  toRange,
  toSum,
  toValue,
} from "./reduce";
import {
  allMatch,
  allUnique,
  anyMatch,
  exactlyN,
  isReversed,
  isSorted,
  noneMatch,
  same,
  sameCount,
} from "./summary";
import type { Comparable, Comparator, FlatMapper, Numeric, ZipTuple } from "./types";
import { infinite } from "./index";

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
    return new Stream(toIterable(data));
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
    this.data = zip(this.data, ...iterables) as Iterable<T>;
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
    this.data = zipFilled(filler, this.data, ...iterables) as Iterable<T>;
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
    this.data = zipLongest(this.data, ...iterables) as Iterable<T>;
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
    this.data = zipEqual(this.data, ...iterables) as Iterable<T>;
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
    this.data = chain(this.data, ...iterables) as Iterable<T>;
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
    this.data = chunkwiseOverlap(
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
    this.data = chunkwise(this.data, chunkSize) as Iterable<T>;
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
  dropWhile(predicate: (item: T) => boolean): Stream<T> {
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
  filter(predicate: (item: T) => boolean): Stream<T> {
    this.data = filter(this.data, predicate);
    return this;
  }

  /**
   * Enumerates items of given collection.
   *
   * @see single.enumerate
   */
  enumerate(): Stream<[number, T]> {
    this.data = enumerate(this.data) as Iterable<T>;
    return this as unknown as Stream<[number, T]>;
  }

  /**
   * Iterates keys from the collection of key-value pairs.
   *
   * @see single.keys
   */
  keys(): Stream<T extends [infer TKey, infer _] ? TKey : never> {
    this.data = keys(this.data as Iterable<[unknown, unknown]>) as Iterable<T>;
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
  map<U>(mapper: (datum: T) => U): Stream<U> {
    this.data = map(this.data, mapper) as Iterable<T>;
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
    this.data = flatMap(this.data, mapper) as Iterable<T>;
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
    this.data = flatten(this.data, dimensions) as Iterable<T>;
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
    this.data = groupBy(this.data, groupKeyFunction, itemKeyFunction) as Iterable<T>;
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
    this.data = pairwise(this.data) as Iterable<T>;
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
    this.data = runningAverage(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
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
    this.data = runningDifference(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
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
    this.data = runningMax(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
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
    this.data = runningMin(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
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
    this.data = runningProduct(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
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
    this.data = runningTotal(this.data as Iterable<Numeric>, initialValue) as Iterable<T>;
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
    this.data = skip(this.data, count, offset);
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
  takeWhile(predicate: (item: T) => boolean): Stream<T> {
    this.data = takeWhile(this.data, predicate);
    return this;
  }

  /**
   * Iterates values from the collection of key-value pairs.
   *
   * @see single.values
   */
  values(): Stream<T extends [infer _, infer TValue] ? TValue : never> {
    this.data = values(this.data as Iterable<[unknown, unknown]>) as Iterable<T>;
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
    this.data = sort(this.data, comparator);
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
    this.data = distinct(this.data, compareBy);
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
    ...iterables: Array<Iterable<T> | Iterator<T>>
  ): Stream<T> {
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
  symmetricDifferenceWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T> {
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
  unionWith(...iterables: Array<Iterable<T> | Iterator<T>>): Stream<T> {
    this.data = union(this.data, ...iterables);
    return this;
  }

  /**
   * Iterates cartesian product of iterable source and given iterables.
   *
   * @param iterables
   *
   * @see set.cartesianProduct
   */
  cartesianProductWith<U extends Array<Iterable<unknown> | Iterator<unknown>>>(
    ...iterables: U
  ): Stream<ZipTuple<[Iterable<T>, ...U], never>> {
    this.data = cartesianProduct(this.data, ...iterables) as Iterable<T>;
    return this as unknown as Stream<ZipTuple<[Iterable<T>, ...U], never>>;
  }

  /**
   * Generates all permutations of iterable source.
   *
   * @param length
   *
   * @see set.permutations
   */
  permutations(length: number): Stream<Array<T>> {
    this.data = permutations(this.data, length) as Iterable<T>;
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
    const [data, peekable] = tee(this.data, 2);
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
    const [data, peekable] = tee(this.data, 2);
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
  toMax(compareBy?: (datum: T) => Comparable): T | undefined {
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
  toMin(compareBy?: (datum: T) => Comparable): T | undefined {
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
  toMinMax(compareBy?: (item: T) => Comparable): [T?, T?] {
    return toMinMax(this, compareBy);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirst
   */
  toFirst(): T {
    return toFirst(this);
  }

  /**
   * Returns the first and last elements of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toFirstAndLast
   */
  toFirstAndLast(): [T, T] {
    return toFirstAndLast(this);
  }

  /**
   * Returns the first element of stream.
   *
   * @throws LengthError if stream is empty.
   *
   * @see reduce.toLast
   */
  toLast(): T {
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
   * Reduces given collection to its range.
   *
   * Returns 0 if given collection is empty.
   *
   * @see reduce.toRange
   */
  toRange(): number {
    return toRange(this as Iterable<number>);
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
  anyMatch(predicate: (item: T) => boolean): boolean {
    return anyMatch(this, predicate);
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
    return exactlyN(this, n, predicate);
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
  noneMatch(predicate: (item: T) => boolean): boolean {
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
  sameWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean {
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
  sameCountWith(...collections: Array<Iterable<unknown> | Iterator<unknown>>): boolean {
    return sameCount(this.data, ...collections);
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
    return tee(this.data, count).map((iterable) => new Stream(iterable));
  }

  /**
   * Converts stream to Array.
   *
   * @see transform.toArray
   */
  toArray(): Array<T> {
    return toArray(this);
  }

  /**
   * Converts stream to Map.
   *
   * Stream collection must contain only key-value pairs as elements.
   *
   * @see transform.toMap
   */
  toMap(): T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never {
    return toMap(this as Iterable<[unknown, unknown]>) as T extends [infer TKey, infer TValue] ? Map<TKey, TValue> : never;
  }

  /**
   * Converts stream to Set.
   *
   * @see transform.toSet
   */
  toSet(): Set<T> {
    return toSet(this);
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
