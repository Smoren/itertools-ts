import { percentageAsync } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';
import { AsyncStream } from '../../src/async-stream';


describe('Async Stream Integration - percentageAsync()', () => {
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

  it('should throw an error for negative repetitions', async () => {
    const gen = percentageAsync(-1);
    await expect((async () => {
      for await (const _ of gen) {}
    })()).rejects.toThrow(InvalidArgumentError);
  });

  it('should process values in an async stream pipeline', async () => {
    let sum = 0;
    let count = 0;
    for await (const num of percentageAsync(5)) {
      sum += num;
      count++;
    }
    expect(count).toBe(5);
    expect(sum).toBeGreaterThanOrEqual(0);
    expect(sum).toBeLessThan(5);
  });

  it('should allow async transformations using map', async () => {
    const values: number[] = [];
    for await (const num of percentageAsync(5)) {
      values.push(num * 100);
    }
    expect(values.length).toBe(5);
    values.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(100);
    });
  });
});

describe('AsyncStream.percentage()', () => {
    it('should generate async values between 0 and 1', async () => {
      const values: number[] = [];
      for await (const num of AsyncStream.percentage(10)) {
        values.push(num);
      }
      expect(values.length).toBe(10);
      values.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  });
