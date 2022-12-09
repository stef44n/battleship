const Computer = require("./computer");
// const Gameboard = require("./gameboard");

describe("computer functions and parameters", () => {
    test("return computer turn", () => {
        let computer1 = Computer();
        expect(computer1.computerTurn).toBe(false);
    });

    test("create only valid ships", () => {
        let computer1 = Computer();
        expect(computer1.createShip(3, "vertical", 3, 8)).toBe(
            "error: out of bounds"
        );
        expect(computer1.createShip(3, "vertical", 3, 4)).toBe(
            "ship placed successfully"
        );
        expect(computer1.createShip(3, "horizontal", 2, 5)).toBe(
            "error: ship exists already"
        );
    });
});
