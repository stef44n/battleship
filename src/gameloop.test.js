const GameLoop = require("./gameloop");

describe("gameloop functions", () => {
    test("ask player to place more ships until board is populated", () => {
        let game = GameLoop();
        expect(game.initializeShips()).toMatch("place more ships");
        game.player.createShip(3, "horizontal", 2, 1);
        game.player.createShip(3, "horizontal", 2, 2);
        game.player.createShip(3, "horizontal", 2, 3);
        game.player.createShip(3, "horizontal", 2, 4);
        game.player.createShip(3, "horizontal", 2, 5);
        expect(game.initializeShips()).toBe("completed");
    });

    test("return default turns and test switch function", () => {
        let game = GameLoop();
        expect(game.player.playerTurn).toBe(true);
        expect(game.computer.computerTurn).toBe(false);

        game.turnSwitch();
        expect(game.player.playerTurn).toBe(false);
        expect(game.computer.computerTurn).toBe(true);
    });
});
