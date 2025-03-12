import { percentage, percentageAsync } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';

describe('percentage()', () => {
  it('should generate values between 0 (inclusive) and 1 (exclusive)', () => {
    const gen = percentage(10);
    for (const num of gen) {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(1);
    }
  });

  it('should generate exactly the number of values specified', () => {
    const count = 5;
    const values = Array.from(percentage(count));
    expect(values.length).toBe(count);
  });

  it('should throw an error for negative repetitions', () => {
    expect(() => Array.from(percentage(-1))).toThrow(InvalidArgumentError);
  });

  it('should iterate infinitely if repetitions is undefined (testing first 5 values)', () => {
    const gen = percentage();
    const values: number[] = [];
    for (let i = 0; i < 5; i++) {
      const { value, done } = gen.next();
      if (done) break;
      values.push(value);
    }
    expect(values.length).toBe(5);
    values.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(1);
    });
  });
});

describe('percentageAsync()', () => {
  it('should generate async values between 0 and 1', async () => {
    const values: number[] = [];
    for await (const num of percentageAsync(10)) {
      values.push(num);
    }
    expect(values.length).toBe(10);
    values.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(1);
    });
  });

  it('should throw an error for negative repetitions asynchronously', async () => {
    const gen = percentageAsync(-1);
    await expect((async () => {
      for await (const _ of gen) {}
    })()).rejects.toThrow(InvalidArgumentError);
  });

  it('should iterate infinitely if repetitions is undefined (testing first 5 values)', async () => {
    const values: number[] = [];
    for await (const num of percentageAsync()) {
      values.push(num);
      if (values.length === 5) break;
    }
    expect(values.length).toBe(5);
    values.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(1);
    });
  });
});
