const Ship = require("./ship");

describe("ship functions and parameters", () => {
    test("return correct info", () => {
        expect(Ship(4)).toEqual({
            shipLength: 4,
            hitsTaken: 0,
            position: "horizontal",
            coords: [0, 0],
            sunk: false,
        });
    });
});
