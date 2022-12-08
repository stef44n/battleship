const Player = require("./player");
// const Gameboard = require("./gameboard");

describe("player functions and parameters", () => {
    test("return default player turn", () => {
        let player1 = Player();
        expect(player1.playerTurn).toBe(true);
    });

    test("create only valid ships", () => {
        let player1 = Player();
        expect(player1.createShip(3, "vertical", 3, 8)).toBe(
            "error: out of bounds"
        );
        expect(player1.createShip(3, "vertical", 3, 4)).toBe(
            "ship placed successfully"
        );
        expect(player1.createShip(3, "horizontal", 2, 5)).toBe(
            "error: ship exists already"
        );
    });
});
