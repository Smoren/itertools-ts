import { percentage } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';
import { Stream } from '../../src/stream';

describe('Stream Integration - percentage()', () => {
  it('should generate values between 0 and 1 for streams', () => {
    const values = Array.from(percentage(10));
    expect(values.length).toBe(10);
    values.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(1);
    });
  });

  it('should throw an error for negative repetitions', () => {
    expect(() => Array.from(percentage(-1))).toThrow(InvalidArgumentError);
  });

  it('should allow usage in stream processing (example: summing first 5 numbers)', () => {
    const sum = Array.from(percentage(5)).reduce((acc, num) => acc + num, 0);
    expect(sum).toBeGreaterThanOrEqual(0);
    expect(sum).toBeLessThan(5);
  });

  it('should allow transformation using map function', () => {
    const transformed = Array.from(percentage(5)).map(num => num * 100);
    expect(transformed.length).toBe(5);
    transformed.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(100);
    });
  });
});

describe('Stream.percentage()', () => {
    it('should generate values between 0 and 1', () => {
      const values = Array.from(Stream.percentage(10));
      expect(values.length).toBe(10);
      values.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  });