/**
 * Count sequentially forever
 *
 * @param start (optional, default 1)
 * @param step (optional, default 1)
 */
export function* count(start = 1, step = 1): Iterable<number> {
  for (let i = start; true; i += step) {
    yield i;
  }
}
