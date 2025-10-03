import { InvalidArgumentError, LengthError } from "./exceptions";
import {
  toArray,
  toArrayAsync,
} from "./transform";

/**
 * Generates random percentages between 0 (inclusive) and 1 (exclusive).
 * 
 * If optional param `repetitions` is not given, iterates infinitely.
 * 
 * @param repetitions - Number of values to generate
 * @throws {InvalidArgumentError} If repetitions is negative
 * @see percentageAsync For asynchronous version
 */
export function* percentage(repetitions?: number): Generator<number> {
    if (repetitions !== undefined && repetitions < 0) {
        throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
    }

    let count = 0;
    while (repetitions === undefined || count < repetitions) {
        yield Math.random();
        if (repetitions !== undefined) count++;
    }
}

/**
 * Asynchronously generates random percentages between 0 (inclusive) and 1 (exclusive).
 * 
 * If optional param `repetitions` is not given, iterates infinitely.
 * 
 * @param repetitions - Number of values to generate
 * @throws {InvalidArgumentError} If repetitions is negative
 * @see percentage For synchronous version
 */
export async function* percentageAsync(repetitions?: number): AsyncGenerator<number> {
    if (repetitions !== undefined && repetitions < 0) {
        throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
    }

    let count = 0;
    while (repetitions === undefined || count < repetitions) {
        yield Math.random();
        if (repetitions !== undefined) count++;
    }
}

/**
 * Generates random elements from the given collection.
 * 
 * If optional param `repetitions` is not given, iterates infinitely.
 * 
 * @param data - Source collection to choose from
 * @param repetitions - Number of values to generate
 * @throws {InvalidArgumentError} If repetitions is negative
 * @throws {LengthError} if stream is empty
 * @see choiceAsync For asynchronous version
 */
export function* choice<T>(
  data: Iterable<T> | Iterator<T>,
  repetitions?: number
): Iterable<T> {
    if (repetitions !== undefined && repetitions < 0) {
        throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
    }

    const arr = toArray(data);

    if (arr.length === 0) {
        throw new LengthError("Collection is empty");
    }

    let i = 0;
    while (repetitions === undefined || i < repetitions) {
        const idx = Math.floor(Math.random() * arr.length);
        yield arr[idx];
        i++;
    }
}

/**
 * Asynchronously generates random elements from the given collection.
 * 
 * If optional param `repetitions` is not given, iterates infinitely.
 * 
 * @param data - Source collection to choose from
 * @param repetitions - Number of values to generate
 * @throws {InvalidArgumentError} If repetitions is negative
 * @throws {LengthError} if stream is empty
 * @see choice For synchronous version
 */
export async function* choiceAsync<T>(
  data: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>,
  repetitions?: number
): AsyncIterable<T> {
    if (repetitions !== undefined && repetitions < 0) {
        throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
    }

    const arr = await toArrayAsync(data);

    if (arr.length === 0) {
        throw new LengthError("Collection is empty");
    }

    let i = 0;
    while (repetitions === undefined || i < repetitions) {
        const idx = Math.floor(Math.random() * arr.length);
        yield arr[idx];
        i++;
    }
}
