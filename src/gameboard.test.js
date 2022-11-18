const Gameboard = require("./gameboard");
const Ship = require("./ship");

describe("gameboard functions and parameters", () => {
    test("return correct length of a ship", () => {
        let shipExample = Ship(4);
        expect(shipExample.shipLength).toBe(4);
    });

    test("return correct position of a ship on the gameboard", () => {
        let shipExample = Ship(4, "vertical", 2, 2);
        let gbExample = Gameboard(shipExample);

        expect(gbExample.currentShip.position).toBe("vertical");
    });

    test("return correct coords of a ship on the gameboard", () => {
        let shipExample = Ship(3, "vertical", 4, 4);
        let gbExample = Gameboard();
        gbExample.placeShip(shipExample);

        expect(gbExample.placeShip(shipExample).sCoords).toMatchObject([
            [4, 4],
            [4, 5],
            [4, 6],
        ]);
    });

    test("return correct empty board", () => {
        expect(Gameboard().boardArr).toMatchObject([
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
        ]);
    });

    test("return correct board with one ship", () => {
        let shipExample = Ship(3, "vertical", 4, 0);
        let gbExample = Gameboard();
        gbExample.placeShip(shipExample);

        expect(gbExample.boardArr).toMatchObject([
            [, , , , "s", , , , ,],
            [, , , , "s", , , , ,],
            [, , , , "s", , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
        ]);
    });

    test("return correct board with three ships", () => {
        let shipExample = Ship(3, "vertical", 4, 0);
        let shipExample2 = Ship(3, "vertical", 0, 3);
        let shipExample3 = Ship(4, "horizontal", 3, 6);

        let gbExample = Gameboard();
        gbExample.placeShip(shipExample);
        gbExample.placeShip(shipExample2);
        gbExample.placeShip(shipExample3);

        expect(gbExample.boardArr).toMatchObject([
            [, , , , "s", , , , ,],
            [, , , , "s", , , , ,],
            [, , , , "s", , , , ,],
            ["s", , , , , , , , ,],
            ["s", , , , , , , , ,],
            ["s", , , , , , , , ,],
            [, , , "s", "s", "s", "s", , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
            [, , , , , , , , ,],
        ]);
    });

    test.skip("return a new gameboard", () => {
        let game00 = Gameboard();
        expect(game00).toMatch(5);
    });
});