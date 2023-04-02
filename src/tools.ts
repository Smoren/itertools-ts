import { LengthError } from "./exceptions";
import { reduce, single, Stream } from "./index";
import { toAsyncIterator, toIterator } from "./transform";
import { ZipTuple } from "./types";

export enum MultipleIterationMode {
  SHORTEST,
  LONGEST,
  STRICT_EQUAL,
}

/**
 * Creates iterable instance to iterate several iterables simultaneously.
 *
 * @param mode shortest, longest or strict equal
 * @param iterables
 * @param noValueFiller
 * @param iterables
 */
export function* createMultipleIterator<
  T extends Array<Iterable<unknown> | Iterator<unknown>>,
  F
>(
  mode: MultipleIterationMode,
  noValueFiller: F,
  ...iterables: T
): Iterable<ZipTuple<T, F>> {
  if (iterables.length === 0) {
    return;
  }

  const iterators = [];
  for (const it of iterables) {
    iterators.push(toIterator(it));
  }

  iterate: while (true) {
    const statuses = single.map(iterators, (it: Iterator<unknown>) =>
      it.next()
    );
    const values = [];

    let allValid = true;
    let anyValid = false;

    for (const status of statuses) {
      let value;

      if (status.done) {
        allValid = false;
        value = noValueFiller;
      } else {
        anyValid = true;
        value = status.value;
      }

      values.push(value);
    }

    if (!allValid && anyValid) {
      switch (mode) {
        case MultipleIterationMode.SHORTEST:
          break iterate;
        case MultipleIterationMode.STRICT_EQUAL:
          throw new LengthError("Iterators must have equal lengths");
      }
    }

    if (!anyValid) {
      break;
    }

    yield values as ZipTuple<T, F>;
  }
}

/**
 * Creates async iterable instance to iterate several iterables simultaneously.
 *
 * @param mode shortest, longest or strict equal
 * @param iterables
 * @param noValueFiller
 * @param iterables
 */
export async function* createAsyncMultipleIterator<
  T extends Array<
    | AsyncIterable<unknown>
    | AsyncIterator<unknown>
    | Iterable<unknown>
    | Iterator<unknown>
  >,
  F
>(
  mode: MultipleIterationMode,
  noValueFiller: F,
  ...iterables: T
): AsyncIterable<ZipTuple<T, F>> {
  if (iterables.length === 0) {
    return;
  }

  const iterators = [];
  for (const it of iterables) {
    iterators.push(toAsyncIterator(it));
  }

  iterate: while (true) {
    const statuses = [];
    for (const it of iterators) {
      const status = await it.next();
      statuses.push(status);
    }

    const values = [];

    let allValid = true;
    let anyValid = false;

    for (const status of statuses) {
      let value;

      if (status.done) {
        allValid = false;
        value = noValueFiller;
      } else {
        anyValid = true;
        value = status.value;
      }

      values.push(value);
    }

    if (!allValid && anyValid) {
      switch (mode) {
        case MultipleIterationMode.SHORTEST:
          break iterate;
        case MultipleIterationMode.STRICT_EQUAL:
          throw new LengthError("Iterators must have equal lengths");
      }
    }

    if (!anyValid) {
      break;
    }

    yield values as ZipTuple<T, F>;
  }
}

/**
 * Internal class for counting unique values usage.
 */
export class UsageMap {
  private addedMap: Map<unknown, Map<string, number>> = new Map();
  private deletedMap: Map<unknown, number> = new Map();

  /**
   * Adds new usage of value by given owner.
   *
   * @param value
   * @param owner
   */
  public addUsage(value: unknown, owner: string): void {
    if (!this.addedMap.has(value)) {
      this.addedMap.set(value, new Map());
    }

    const valueMap = this.addedMap.get(value) as Map<string, number>;

    if (!valueMap.has(owner)) {
      valueMap.set(owner, 0);
    }

    valueMap.set(owner, (valueMap.get(owner) as number) + 1);
  }

  /**
   * Removes usage of value.
   *
   * @param value
   */
  public deleteUsage(value: unknown): void {
    if (!this.deletedMap.has(value)) {
      this.deletedMap.set(value, 1);
    } else {
      this.deletedMap.set(value, (this.deletedMap.get(value) as number) + 1);
    }
  }

  /**
   * Returns owners count of given value.
   *
   * @param value
   */
  public getOwnersCount(value: unknown): number {
    const deletesCount = this.deletedMap.get(value) ?? 0;

    return Stream.of(this.addedMap.get(value) ?? new Map())
      .map((datum) => (datum as [string, number])[1])
      .filter((count) => (count as number) > deletesCount)
      .toValue(
        (carry: number | undefined) => (carry as number) + 1,
        0
      ) as number;
  }

  /**
   * Returns usages count of given value.
   *
   * @param value
   * @param maxOwnersCount
   */
  public getUsagesCount(value: unknown, maxOwnersCount = 1): number {
    const deletesCount = this.deletedMap.get(value) ?? 0;

    let owners = Stream.of(this.addedMap.get(value) ?? new Map())
      .map((pair) => (pair as [string, number])[1])
      .map((value) => (value as number) - deletesCount)
      .filter((value) => (value as number) > 0)
      .toArray();

    while (owners.length > maxOwnersCount) {
      const minValue = reduce.toMin(owners) as number;
      owners = Stream.of(owners)
        .map((value) => (value as number) - minValue)
        .filter((value) => (value as number) > 0)
        .toArray();
    }

    return reduce.toSum(owners as Array<number>) as number;
  }
}

/**
 * No value filler monad.
 */
export class NoValueMonad {}

/**
 * Internal tool for duplicating another iterators using cache.
 */
export class TeeIterator<T> {
  private iterator: Iterator<T>;
  private related: Array<RelatedIterable<T>> = [];
  private positions: Array<number> = [];
  private cache: Map<number, T> = new Map();
  private lastCacheIndex = 0;
  private isValid = true;

  /**
   * TeeIterator constructor
   *
   * @param iterator
   * @param relatedCount
   */
  constructor(iterator: Iterator<T>, relatedCount: number) {
    this.iterator = iterator;

    for (let i = 0; i < relatedCount; ++i) {
      this.related.push(new RelatedIterable<T>(this, i));
      this.positions.push(0);
    }

    this.cacheNextValue();
  }

  /**
   * Returns current value of related iterable.
   *
   * @param relatedIterable
   */
  public current(relatedIterable: RelatedIterable<T>): T {
    const index = this.getPosition(relatedIterable);
    return this.cache.get(index) as T;
  }

  /**
   * Moves related iterable to the next element.
   *
   * @param relatedIterable
   */
  public next(relatedIterable: RelatedIterable<T>): void {
    const [relPos, minPos, maxPos] = [
      this.getPosition(relatedIterable),
      Math.min(...this.positions),
      Math.max(...this.positions),
    ];

    if (relPos === maxPos) {
      this.cacheNextValue();
    }

    this.positions[relatedIterable.getId()]++;

    if (minPos < Math.min(...this.positions)) {
      this.cache.delete(minPos);
    }
  }

  /**
   * Returns true if related iterable is not done.
   *
   * @param relatedIterable
   */
  public valid(relatedIterable: RelatedIterable<T>): boolean {
    const [relPos, maxPos] = [
      this.getPosition(relatedIterable),
      Math.max(...this.positions),
    ];
    return relPos !== maxPos || this.isValid;
  }

  /**
   * Returns related iterables list.
   */
  public getRelatedIterables(): Array<RelatedIterable<T>> {
    return this.related;
  }

  /**
   * Gets and caches the next element of parent iterator.
   *
   * @private
   */
  private cacheNextValue(): void {
    const status = this.iterator.next();
    if (!status.done) {
      this.cache.set(this.lastCacheIndex++, status.value);
    }
    this.isValid = !status.done;
  }

  /**
   * Returns current position index of related iterable.
   *
   * @param related
   */
  private getPosition(related: RelatedIterable<T>): number {
    return this.positions[related.getId()];
  }
}

/**
 * Duplicated iterable.
 */
export class RelatedIterable<T> implements IterableIterator<T> {
  private parent: TeeIterator<T>;
  private readonly id: number;

  /**
   * RelatedIterable constructor.
   *
   * @param parentIterable
   * @param id
   */
  constructor(parentIterable: TeeIterator<T>, id: number) {
    this.parent = parentIterable;
    this.id = id;
  }

  /**
   * Id getter.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Returns true if the iterator is valid.
   */
  public valid(): boolean {
    return this.parent.valid(this);
  }

  /**
   * Moves the iterator to the next element.
   */
  public next(): IteratorResult<T> {
    const result = { value: this.current(), done: !this.valid() };
    if (!result.done) {
      this.parent.next(this);
    }
    return result as IteratorResult<T>;
  }

  /**
   * Returns current value of the iterator.
   */
  public current(): T | undefined {
    return this.parent.valid(this) ? this.parent.current(this) : undefined;
  }

  /**
   * Aggregated iterator.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    while (this.parent.valid(this)) {
      yield this.parent.current(this);
      this.parent.next(this);
    }
  }
}

/**
 * Internal tool for duplicating another async iterators using cache.
 */
export class AsyncTeeIterator<T> {
  private iterator: AsyncIterator<T>;
  private related: Array<AsyncRelatedIterable<T>> = [];
  private positions: Array<number> = [];
  private cache: Map<number, T> = new Map();
  private lastCacheIndex = 0;
  private isValid = true;
  private isFirstIteration = true;

  /**
   * AsyncTeeIterator constructor
   *
   * @param iterator
   * @param relatedCount
   */
  constructor(iterator: AsyncIterator<T>, relatedCount: number) {
    this.iterator = iterator;

    for (let i = 0; i < relatedCount; ++i) {
      this.related.push(new AsyncRelatedIterable<T>(this, i));
      this.positions.push(0);
    }
  }

  /**
   * Returns current value of related iterable.
   *
   * @param relatedIterable
   */
  public async current(relatedIterable: AsyncRelatedIterable<T>): Promise<T> {
    if (this.isFirstIteration) {
      await this.cacheNextValue();
    }

    const index = this.getPosition(relatedIterable);
    return this.cache.get(index) as T;
  }

  /**
   * Moves related iterable to the next element.
   *
   * @param relatedIterable
   */
  public async next(relatedIterable: AsyncRelatedIterable<T>): Promise<void> {
    const [relPos, minPos, maxPos] = [
      this.getPosition(relatedIterable),
      Math.min(...this.positions),
      Math.max(...this.positions),
    ];

    if (relPos === maxPos) {
      await this.cacheNextValue();
    }

    this.positions[relatedIterable.getId()]++;

    if (minPos < Math.min(...this.positions)) {
      this.cache.delete(minPos);
    }
  }

  /**
   * Returns true if related iterable is not done.
   *
   * @param relatedIterable
   */
  public async valid(
    relatedIterable: AsyncRelatedIterable<T>
  ): Promise<boolean> {
    if (this.isFirstIteration) {
      await this.cacheNextValue();
    }

    const [relPos, maxPos] = [
      this.getPosition(relatedIterable),
      Math.max(...this.positions),
    ];
    return relPos !== maxPos || this.isValid;
  }

  /**
   * Returns related iterables list.
   */
  public getRelatedIterables(): Array<AsyncRelatedIterable<T>> {
    return this.related;
  }

  /**
   * Gets and caches the next element of parent iterator.
   *
   * @private
   */
  private async cacheNextValue(): Promise<void> {
    this.isFirstIteration = false;

    const status = await this.iterator.next();
    if (!status.done) {
      this.cache.set(this.lastCacheIndex++, status.value);
    }
    this.isValid = !status.done;
  }

  /**
   * Returns current position index of related iterable.
   *
   * @param related
   */
  private getPosition(related: AsyncRelatedIterable<T>): number {
    return this.positions[related.getId()];
  }
}

/**
 * Duplicated async iterable.
 */
export class AsyncRelatedIterable<T> implements AsyncIterableIterator<T> {
  private parent: AsyncTeeIterator<T>;
  private readonly id: number;

  /**
   * AsyncRelatedIterable constructor.
   *
   * @param parentIterable
   * @param id
   */
  constructor(parentIterable: AsyncTeeIterator<T>, id: number) {
    this.parent = parentIterable;
    this.id = id;
  }

  /**
   * Id getter.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Returns true if the iterator is valid.
   */
  public async valid(): Promise<boolean> {
    return await this.parent.valid(this);
  }

  /**
   * Moves the iterator to the next element.
   */
  public async next(): Promise<IteratorResult<T>> {
    const result = { value: await this.current(), done: !(await this.valid()) };
    if (!result.done) {
      await this.parent.next(this);
    }
    return result as IteratorResult<T>;
  }

  /**
   * Returns current value of the iterator.
   */
  public async current(): Promise<T | undefined> {
    return (await this.parent.valid(this))
      ? await this.parent.current(this)
      : undefined;
  }

  /**
   * Aggregated iterator.
   */
  async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
    while (await this.parent.valid(this)) {
      yield await this.parent.current(this);
      await this.parent.next(this);
    }
  }
}
