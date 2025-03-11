import {InvalidArgumentError, random} from '../../src'

describe("random.integers", () => {

  test("Throws exception with negative repetitions", () => {
    expect(() => {
      for (let _item of random.integers(0, 100, -1)) {}
    }).toThrow(InvalidArgumentError);
  })

  test("Throws exception when min > max", () => {
    expect(() => {
      for (let _item of random.integers(101, 100)) {}
    }).toThrow(InvalidArgumentError);
  })

  test("Returns always the same number if min === max", () => {
    const items = []
    for (let item of random.integers(100, 100, 5)) {
      items.push(item);
    }
    expect(items.filter(x => x === 100).length).toBe(5);
  })

  test("The length of the collected array corresponds to the repetitions", () => {
    const items = []
    for (let item of random.integers(1, 100, 5)) {
      items.push(item);
    }
    expect(items.length).toBe(5);
  })

  test("If no repetitions specified, array has no specific length", () => {
    let numberGenerated: boolean = false;
    for (let item of random.integers(1, 10)) {
      if(item === 5) {
        numberGenerated = true;
        break;
      }
    }
    expect(numberGenerated).toBe(true);
  })

})
