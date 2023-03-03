"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const fixture_1 = require("../fixture");
const single_1 = require("../../src/single");
const tools_1 = require("../../src/tools");
describe.each([
    ...dataProviderForArrays(),
    ...dataProviderForGenerators(),
    ...dataProviderForIterators(),
    ...dataProviderForStrings(),
    ...dataProviderForSets(),
    ...dataProviderForMaps(),
])("Single Flat Map Test", (input, mapper, expected) => {
    it("", () => {
        // Given
        const result = [];
        // When
        for (const item of (0, single_1.flatMap)(input, mapper)) {
            result.push(item);
        }
        // Then
        expect(result).toEqual(expected);
    });
});
function dataProviderForArrays() {
    return [
        [
            [],
            (item) => [item],
            [],
        ],
        [
            [0],
            (item) => [item],
            [0],
        ],
        [
            [1],
            (item) => [item],
            [1],
        ],
        [
            [2],
            (item) => [item],
            [2],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (item) => [item],
            [0, 1, 2, 3, 4, 5],
        ],
        [
            [2],
            (item) => [item, item],
            [2, 2],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (item) => [item, item],
            [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (item) => [item, -item],
            [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
        ],
        [
            [],
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            [0],
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            [1],
            (item) => (0, single_1.repeat)(item, item),
            [1],
        ],
        [
            [2],
            (item) => (0, single_1.repeat)(item, item),
            [2, 2],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (item) => (0, single_1.repeat)(item, item),
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        ],
        [
            [
                { 'name': 'bird', 'eggs': 2 },
                { 'name': 'lizard', 'eggs': 3 },
                { 'name': 'echidna', 'eggs': 1 },
                { 'name': 'tyrannosaur', 'eggs': 0 },
            ],
            (animal) => (0, single_1.repeat)(animal['name'], animal['eggs']),
            ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
        ],
        [
            [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : [item],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : item,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            [1, 2, 3, 4, 5],
            (item) => item + 1,
            [2, 3, 4, 5, 6]
        ],
        [
            [1, 2, 3, 4, 5],
            (item) => (item % 2 === 0) ? [item, item] : item,
            [1, 2, 2, 3, 4, 4, 5]
        ],
        [
            [1, 2, [3], [4, 5], 6, []],
            (x) => x,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (item) => [item, item, [item]],
            [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
        ],
        [
            ["it's Sunny in", "", "California"],
            (words) => words.split(' '),
            ["it's", "Sunny", "in", "", "California"],
        ],
        [
            [5, 4, -3, 20, 17, -33, -4, 18],
            (x) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
            [4, 1, 4, 20, 16, 1, 18],
        ],
    ];
}
function dataProviderForGenerators() {
    return [
        [
            (0, fixture_1.createGeneratorFixture)([]),
            (item) => [item],
            [],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0]),
            (item) => [item],
            [0],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1]),
            (item) => [item],
            [1],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([2]),
            (item) => [item],
            [2],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item],
            [0, 1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([2]),
            (item) => [item, item],
            [2, 2],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item, item],
            [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item, -item],
            [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([]),
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0]),
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1]),
            (item) => (0, single_1.repeat)(item, item),
            [1],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([2]),
            (item) => (0, single_1.repeat)(item, item),
            [2, 2],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => (0, single_1.repeat)(item, item),
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([
                { 'name': 'bird', 'eggs': 2 },
                { 'name': 'lizard', 'eggs': 3 },
                { 'name': 'echidna', 'eggs': 1 },
                { 'name': 'tyrannosaur', 'eggs': 0 },
            ]),
            (animal) => (0, single_1.repeat)(animal['name'], animal['eggs']),
            ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : [item],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : item,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1, 2, 3, 4, 5]),
            (item) => item + 1,
            [2, 3, 4, 5, 6]
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1, 2, 3, 4, 5]),
            (item) => (item % 2 === 0) ? [item, item] : item,
            [1, 2, 2, 3, 4, 4, 5]
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1, 2, [3], [4, 5], 6, []]),
            (x) => x,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item, item, [item]],
            [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
        ],
        [
            (0, fixture_1.createGeneratorFixture)(["it's Sunny in", "", "California"]),
            (words) => words.split(' '),
            ["it's", "Sunny", "in", "", "California"],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([5, 4, -3, 20, 17, -33, -4, 18]),
            (x) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
            [4, 1, 4, 20, 16, 1, 18],
        ],
    ];
}
function dataProviderForIterators() {
    return [
        [
            (0, fixture_1.createIteratorFixture)([]),
            (item) => [item],
            [],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0]),
            (item) => [item],
            [0],
        ],
        [
            (0, fixture_1.createIteratorFixture)([1]),
            (item) => [item],
            [1],
        ],
        [
            (0, fixture_1.createIteratorFixture)([2]),
            (item) => [item],
            [2],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item],
            [0, 1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createIteratorFixture)([2]),
            (item) => [item, item],
            [2, 2],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item, item],
            [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item, -item],
            [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
        ],
        [
            (0, fixture_1.createIteratorFixture)([]),
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0]),
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            (0, fixture_1.createIteratorFixture)([1]),
            (item) => (0, single_1.repeat)(item, item),
            [1],
        ],
        [
            (0, fixture_1.createIteratorFixture)([2]),
            (item) => (0, single_1.repeat)(item, item),
            [2, 2],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => (0, single_1.repeat)(item, item),
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        ],
        [
            (0, fixture_1.createIteratorFixture)([
                { 'name': 'bird', 'eggs': 2 },
                { 'name': 'lizard', 'eggs': 3 },
                { 'name': 'echidna', 'eggs': 1 },
                { 'name': 'tyrannosaur', 'eggs': 0 },
            ]),
            (animal) => (0, single_1.repeat)(animal['name'], animal['eggs']),
            ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
        ],
        [
            (0, fixture_1.createIteratorFixture)([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : [item],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            (0, fixture_1.createIteratorFixture)([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : item,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            (0, fixture_1.createIteratorFixture)([1, 2, 3, 4, 5]),
            (item) => item + 1,
            [2, 3, 4, 5, 6]
        ],
        [
            (0, fixture_1.createIteratorFixture)([1, 2, 3, 4, 5]),
            (item) => (item % 2 === 0) ? [item, item] : item,
            [1, 2, 2, 3, 4, 4, 5]
        ],
        [
            (0, fixture_1.createIteratorFixture)([1, 2, [3], [4, 5], 6, []]),
            (x) => x,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item, item, [item]],
            [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
        ],
        [
            (0, fixture_1.createIteratorFixture)(["it's Sunny in", "", "California"]),
            (words) => words.split(' '),
            ["it's", "Sunny", "in", "", "California"],
        ],
        [
            (0, fixture_1.createIteratorFixture)([5, 4, -3, 20, 17, -33, -4, 18]),
            (x) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
            [4, 1, 4, 20, 16, 1, 18],
        ],
    ];
}
function dataProviderForStrings() {
    return [
        [
            '',
            (item) => [item],
            [],
        ],
        [
            '0',
            (item) => [item],
            ['0'],
        ],
        [
            '1',
            (item) => [item],
            ['1'],
        ],
        [
            '2',
            (item) => [item],
            ['2'],
        ],
        [
            '012345',
            (item) => [item],
            ['0', '1', '2', '3', '4', '5'],
        ],
        [
            '2',
            (item) => [item, item],
            ['2', '2'],
        ],
        [
            '012345',
            (item) => [item, item],
            ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5'],
        ],
        [
            '012345',
            (item) => [parseInt(item), -parseInt(item)],
            [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
        ],
        [
            '',
            (item) => (0, single_1.repeat)(item, parseInt(item)),
            [],
        ],
        [
            '0',
            (item) => (0, single_1.repeat)(item, parseInt(item)),
            [],
        ],
        [
            '1',
            (item) => (0, single_1.repeat)(item, parseInt(item)),
            ['1'],
        ],
        [
            '2',
            (item) => (0, single_1.repeat)(item, parseInt(item)),
            ['2', '2'],
        ],
        [
            '012345',
            (item) => (0, single_1.repeat)(parseInt(item), parseInt(item)),
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        ],
    ];
}
function dataProviderForSets() {
    return [
        [
            new Set([]),
            (item) => [item],
            [],
        ],
        [
            new Set([0]),
            (item) => [item],
            [0],
        ],
        [
            new Set([1]),
            (item) => [item],
            [1],
        ],
        [
            new Set([2]),
            (item) => [item],
            [2],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (item) => [item],
            [0, 1, 2, 3, 4, 5],
        ],
        [
            new Set([2]),
            (item) => [item, item],
            [2, 2],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (item) => [item, item],
            [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (item) => [item, -item],
            [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
        ],
        [
            new Set([]),
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            new Set([0]),
            (item) => (0, single_1.repeat)(item, item),
            [],
        ],
        [
            new Set([1]),
            (item) => (0, single_1.repeat)(item, item),
            [1],
        ],
        [
            new Set([2]),
            (item) => (0, single_1.repeat)(item, item),
            [2, 2],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (item) => (0, single_1.repeat)(item, item),
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        ],
        [
            new Set([
                { 'name': 'bird', 'eggs': 2 },
                { 'name': 'lizard', 'eggs': 3 },
                { 'name': 'echidna', 'eggs': 1 },
                { 'name': 'tyrannosaur', 'eggs': 0 },
            ]),
            (animal) => (0, single_1.repeat)(animal['name'], animal['eggs']),
            ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
        ],
        [
            new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : [item],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item)
                ? (0, single_1.flatMap)(item, func)
                : item,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            new Set([1, 2, 3, 4, 5]),
            (item) => item + 1,
            [2, 3, 4, 5, 6]
        ],
        [
            new Set([1, 2, 3, 4, 5]),
            (item) => (item % 2 === 0) ? [item, item] : item,
            [1, 2, 2, 3, 4, 4, 5]
        ],
        [
            new Set([1, 2, [3], [4, 5], 6, []]),
            (x) => x,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (item) => [item, item, [item]],
            [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
        ],
        [
            new Set(["it's Sunny in", "", "California"]),
            (words) => words.split(' '),
            ["it's", "Sunny", "in", "", "California"],
        ],
        [
            new Set([5, 4, -3, 20, 17, -33, -4, 18]),
            (x) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
            [4, 1, 4, 20, 16, 1, 18],
        ],
    ];
}
function dataProviderForMaps() {
    return [
        [
            (0, fixture_1.createMapFixture)([]),
            (item) => [item],
            [],
        ],
        [
            (0, fixture_1.createMapFixture)([0]),
            (item) => [item[1]],
            [0],
        ],
        [
            (0, fixture_1.createMapFixture)([1]),
            (item) => [item[1]],
            [1],
        ],
        [
            (0, fixture_1.createMapFixture)([2]),
            (item) => [item[1]],
            [2],
        ],
        [
            (0, fixture_1.createMapFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item[1]],
            [0, 1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createMapFixture)([2]),
            (item) => [item[1], item[1]],
            [2, 2],
        ],
        [
            (0, fixture_1.createMapFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item[1], item[1]],
            [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
        ],
        [
            (0, fixture_1.createMapFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item[1], -item[1]],
            [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
        ],
        [
            (0, fixture_1.createMapFixture)([]),
            (item) => (0, single_1.repeat)(item[1], item[1]),
            [],
        ],
        [
            (0, fixture_1.createMapFixture)([0]),
            (item) => (0, single_1.repeat)(item[1], item[1]),
            [],
        ],
        [
            (0, fixture_1.createMapFixture)([1]),
            (item) => (0, single_1.repeat)(item[1], item[1]),
            [1],
        ],
        [
            (0, fixture_1.createMapFixture)([2]),
            (item) => (0, single_1.repeat)(item[1], item[1]),
            [2, 2],
        ],
        [
            (0, fixture_1.createMapFixture)([0, 1, 2, 3, 4, 5]),
            (item) => (0, single_1.repeat)(item[1], item[1]),
            [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        ],
        [
            (0, fixture_1.createMapFixture)([
                { 'name': 'bird', 'eggs': 2 },
                { 'name': 'lizard', 'eggs': 3 },
                { 'name': 'echidna', 'eggs': 1 },
                { 'name': 'tyrannosaur', 'eggs': 0 },
            ]),
            (animal) => (0, single_1.repeat)(animal[1]['name'], animal[1]['eggs']),
            ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
        ],
        [
            (0, fixture_1.createMapFixture)([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item[1])
                ? (0, single_1.flatMap)((0, fixture_1.createMapFixture)(item[1]), func)
                : [item[1]],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            (0, fixture_1.createMapFixture)([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
            (item, func) => (0, tools_1.isIterable)(item[1])
                ? (0, single_1.flatMap)((0, fixture_1.createMapFixture)(item[1]), func)
                : item[1],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            (0, fixture_1.createMapFixture)([1, 2, 3, 4, 5]),
            (item) => item[1] + 1,
            [2, 3, 4, 5, 6]
        ],
        [
            (0, fixture_1.createMapFixture)([1, 2, 3, 4, 5]),
            (item) => (item[1] % 2 === 0) ? [item[1], item[1]] : item[1],
            [1, 2, 2, 3, 4, 4, 5]
        ],
        [
            (0, fixture_1.createMapFixture)([1, 2, [3], [4, 5], 6, []]),
            (x) => x[1],
            [1, 2, 3, 4, 5, 6],
        ],
        [
            (0, fixture_1.createMapFixture)([0, 1, 2, 3, 4, 5]),
            (item) => [item[1], item[1], [item[1]]],
            [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
        ],
        [
            (0, fixture_1.createMapFixture)(["it's Sunny in", "", "California"]),
            (words) => words[1].split(' '),
            ["it's", "Sunny", "in", "", "California"],
        ],
        [
            (0, fixture_1.createMapFixture)([5, 4, -3, 20, 17, -33, -4, 18]),
            (x) => x[1] < 0 ? [] : (x[1] % 2 === 0 ? [x[1]] : [x[1] - 1, 1]),
            [4, 1, 4, 20, 16, 1, 18],
        ],
    ];
}
