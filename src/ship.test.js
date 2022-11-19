const Ship = require("./ship");
const Gameboard = require("./gameboard");

describe("ship functions and parameters", () => {
    test("return correct position", () => {
        expect(Ship(4, "vertical").position).toMatch("vertical");
    });

    test("return correct coords based on x-input only", () => {
        expect(Ship(4, "vertical", 3).coords).toMatchObject([3, 0]);
    });

    test("return correct coords from x and y", () => {
        expect(Ship(4, "vertical", 2, 7).coords).toMatchObject([2, 7]);
    });

    test("return correct ship coords", () => {
        expect(Ship(3, "vertical", 4).shipCoords).toMatchObject([
            [4, 0],
            [4, 1],
            [4, 2],
        ]);
    });

    test.skip("return correct details", () => {
        expect(Ship(2, "horizontal")).toEqual({
            shipLength: 2,
            hits: 0,
            position: "horizontal",
            coords: [0, 0],
            isSunk: false,
            shipCoords: [
                [0, 0],
                [1, 0],
            ],
        });
    });

    test("return correct response to isHit method", () => {
        let shipEx = Ship(4, "vertical", 2, 5);

        expect(shipEx.isHit(2, 5)).toBe("yes");
    });
});
