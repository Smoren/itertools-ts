/**
 * Count sequentially forever
 *
 * @param start (optional, default 1)
 * @param step (optional, default 1)
 */
export function* count<T>(start: number = 1, step: number = 1): Iterable<number> {
  for (let i = start; true; i += step) {
    yield i;
  }
}
