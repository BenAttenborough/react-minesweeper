import "jest-canvas-mock";
import {
    inBounds,
    getAdjCells,
    getNumbersArray,
    getUniqueRandomNumbers
} from "./CreateBoard";

describe("getNumbersArray", () => {
    it("returns null if row or col < 0", () => {
        expect(inBounds(-1, 0)).toEqual(null);
        expect(inBounds(0, -1)).toEqual(null);
        expect(inBounds(-1, -1)).toEqual(null);
    });
    it("returns null if row > height - 1 or col > width - 1", () => {
        expect(inBounds(20, 0, 1, 10)).toEqual(null);
        expect(inBounds(0, 20, 10, 1)).toEqual(null);
    });
    it("returns { row, col } if co-ordinates ar in bounds", () => {
        expect(inBounds(1, 1, 2, 2)).toEqual({ row: 1, col: 1 });
        expect(inBounds(24, 35, 40, 25)).toEqual({ row: 24, col: 35 });
        expect(inBounds(99, 199, 200, 100)).toEqual({ row: 99, col: 199 });
    });
});

describe("getAdjCells", () => {
    it("returns three neighbouring cells for the input 0,0 (on big enough board) to return", () => {
        expect(getAdjCells(0, 0, 2, 2)).toEqual([
            { col: 0, row: 1 },
            { col: 1, row: 0 },
            { col: 1, row: 1 }
        ]);
    });
    it("returns eight neighbouring cells for input 1,1,2,2", () => {
        expect(getAdjCells(1, 1, 3, 3)).toEqual([
            { col: 0, row: 0 },
            { col: 0, row: 1 },
            { col: 0, row: 2 },
            { col: 1, row: 0 },
            { col: 1, row: 2 },
            { col: 2, row: 0 },
            { col: 2, row: 1 },
            { col: 2, row: 2 }
        ]);
    });
    it("returns one neighbouring cell for the input 0,0,1,2", () => {
        expect(getAdjCells(0, 0, 1, 2)).toEqual([{ col: 0, row: 1 }]);
    });
});

describe("getNumbersArray", () => {
    it("returns empty array if start > end", () => {
        expect(getNumbersArray(2, 1)).toEqual([]);
    });

    it("returns empty array containing just the start number if start === end", () => {
        expect(getNumbersArray(1, 1)).toEqual([1]);
        expect(getNumbersArray(5, 5)).toEqual([5]);
    });

    it("returns [1,2,3,4] when sent that values 1 and 4", () => {
        expect(getNumbersArray(1, 4)).toEqual([1, 2, 3, 4]);
    });
});

describe("getUniqueRandomNumbers", () => {
    it("returns empty array if start > end", () => {
        expect(getUniqueRandomNumbers(2, 1, 1)).toEqual([]);
    });
    it("returns array with all numbers if number of random numbers requested exceeds numbers provided", () => {
        expect(getUniqueRandomNumbers(1, 3, 5)).toEqual([1, 2, 3]);
    });
    it("returns x random numbers if x numbers requested from a list of x or more numbers", () => {
        expect(getUniqueRandomNumbers(1, 10, 5).length).toEqual(5);
        expect(getUniqueRandomNumbers(1, 10, 3).length).toEqual(3);
        expect(getUniqueRandomNumbers(1, 40, 23).length).toEqual(23);
    });
});
