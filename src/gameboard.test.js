const Gameboard = require("./gameboard");

describe("gameboard functions and parameters", () => {
    test("return correct length", () => {
        expect(Gameboard().placeShip().sLength).toEqual(3);
    });

    test("return correct position", () => {
        expect(Gameboard().placeShip().sPosition).toBe("vertical");
    });

    test("return correct coords", () => {
        expect(Gameboard().placeShip().sCoords).toMatchObject([
            [4, 4],
            [4, 5],
            [4, 6],
        ]);
    });

    test.skip("return correct board", () => {
        expect(Gameboard().placeShip().boardArr).toMatch("board array");
    });
});
