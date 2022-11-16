const Ship = require("./ship");

describe("ship functions and parameters", () => {
    test("return correct info", () => {
        expect(Ship(5, "horizontal")).toEqual({
            shipLength: 5,
            hitsTaken: 0,
            position: "horizontal",
            coords: [0, 0],
            sunk: false,
        });
    });

    test("return correct position", () => {
        expect(Ship(4, "vertical").position).toMatch("vertical");
    });

    test("return correct coords based on x-input only", () => {
        expect(Ship(4, "vertical", 3).coords).toMatchObject([3, 0]);
    });

    test("return correct coords", () => {
        expect(Ship(4, "vertical", 2, 7).coords).toMatchObject([2, 7]);
    });
});
