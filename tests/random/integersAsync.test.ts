import {random} from '../../src'

describe("random.integersAsync", () => {

  test("Throws exception with negative repetitions", () => {
    expect(async () => {
      for await (let _item of random.integersAsync(0, 100, -1)) {
        console.log("ITEM", _item);
      }
    }).rejects.toThrow('Number of repetitions cannot be negative: -1');
  })

  test("Throws exception when min > max",
    () => {
      expect(async () => {
        for await (let _item of random.integersAsync(101, 100)) {
        }
      }).rejects.toThrow('Max 100 cannot be less than min 101');
    })

  test("Returns always the same number if min === max", async () => {
    const items = []
    for await (let item of random.integersAsync(100, 100, 5)) {
      items.push(item);
    }
    expect(items.filter(x => x === 100).length).toBe(5);
  })

  test("The length of the collected array corresponds to the repetitions", async () => {
    const items = []
    for await (let item of random.integersAsync(1, 100, 5)) {
      items.push(item);
    }
    expect(items.length).toBe(5);
  })

  test("If no repetitions specified, array has no specific length", async  () => {
    let numberGenerated: boolean = false;
    for await (let item of random.integersAsync(1, 10)) {
      if(item === 5) {
        numberGenerated = true;
        break;
      }
    }
    expect(numberGenerated).toBe(true);
  })

})
