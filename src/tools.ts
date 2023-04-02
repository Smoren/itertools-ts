import { LengthError } from "./exceptions";
import { reduce, single, Stream } from "./index";
import { toAsyncIterator, toIterator } from "./transform";

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
): Iterable<{ [K in keyof T]: (T[K] extends (infer V)[] ? V : never) | F }> {
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

    yield values as {
      [K in keyof T]: (T[K] extends (infer V)[] ? V : never) | F;
    };
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
): AsyncIterable<{
  [K in keyof T]: (T[K] extends (infer V)[] ? V : never) | F;
}> {
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

    yield values as {
      [K in keyof T]: (T[K] extends (infer V)[] ? V : never) | F;
    };
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
 * Tool for duplicating another iterators using cache.
 */
export class TeeIterator<T> {
  private iterator: Iterator<T>;
  private related: Array<RelatedIterable<T>> = [];
  private positions: Array<number> = [];
  private cache: Map<number, T> = new Map();
  private lastCacheIndex = 0;
  private isValid = true;

  constructor(iterator: Iterator<T>, relatedCount: number) {
    this.iterator = iterator;

    for (let i = 0; i < relatedCount; ++i) {
      this.related.push(new RelatedIterable<T>(this, i));
      this.positions.push(0);
    }

    this.cacheNextValue();
  }

  public current(relatedIterable: RelatedIterable<T>): T {
    const index = this.getPosition(relatedIterable);
    return this.cache.get(index) as T;
  }

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

  public valid(relatedIterable: RelatedIterable<T>): boolean {
    const [relPos, maxPos] = [this.getPosition(relatedIterable), Math.max(...this.positions)];
    return relPos !== maxPos || this.isValid;
  }

  public getRelatedIterables(): Array<RelatedIterable<T>> {
    return this.related;
  }

  private cacheNextValue(): void {
    const status = this.iterator.next();
    if (!status.done) {
      this.cache.set(this.lastCacheIndex++, status.value);
    }
    this.isValid = !status.done;
  }

  private getPosition(related: RelatedIterable<T>): number {
    return this.positions[related.getId()];
  }
}

/**
 * Duplicated iterable.
 */
export class RelatedIterable<T> {
  private parent: TeeIterator<T>;
  private readonly id: number;

  constructor(parentIterable: TeeIterator<T>, id: number) {
    this.parent = parentIterable;
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public valid(): boolean {
    return this.parent.valid(this);
  }

  public next(): { value: T | undefined, done: boolean } {
    const result = { value: this.current(), done: !this.valid() }
    if (!result.done) {
      this.parent.next(this);
    }
    return result;
  }

  public current(): T | undefined {
    return this.parent.valid(this)
      ? this.parent.current(this)
      : undefined;
  }

  *[Symbol.iterator](): Iterator<T> {
    while (this.parent.valid(this)) {
      yield this.parent.current(this);
      this.parent.next(this);
    }
  }
}
