const Computer = require("./computer");
// const Gameboard = require("./gameboard");

describe("computer functions and parameters", () => {
    test("return computer turn", () => {
        let computer1 = Computer();
        expect(computer1.computerTurn).toBe(false);
    });
});
