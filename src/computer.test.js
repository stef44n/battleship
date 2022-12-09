const Computer = require("./computer");
// const Gameboard = require("./gameboard");

describe("computer functions and parameters", () => {
    test("return computer turn", () => {
        let computer1 = Computer();
        expect(computer1.computerTurn).toBe(false);
    });

    test("return correct amount and collective length of ships", () => {
        let computer1 = Computer();
        computer1.createShips();
        let ship1 = computer1.computerGameboard.allShipObj[0]["shipLength"];
        let ship2 = computer1.computerGameboard.allShipObj[1]["shipLength"];
        let ship3 = computer1.computerGameboard.allShipObj[2]["shipLength"];
        let ship4 = computer1.computerGameboard.allShipObj[3]["shipLength"];
        let ship5 = computer1.computerGameboard.allShipObj[4]["shipLength"];

        let allLengths = ship1 + ship2 + ship3 + ship4 + ship5;
        expect(computer1.computerGameboard.allShipObj.length).toBe(5);
        expect(allLengths).toBe(16);
    });
});
