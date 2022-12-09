const Gameboard = require("./gameboard");
const Ship = require("./ship");

const Computer = () => {
    //create gameboard
    //choose ship (length)
    //choose positioning (H/V)
    //place ship (x,y)
    //attack a square
    let computerGameboard = Gameboard();

    let computerTurn = false;

    function createShip(len, pos, x, y) {
        let newShip = Ship(len, pos, x, y);
        // return checkShipValidity(newShip);
        if (checkShipValidity(newShip) === "SUCCESS") {
            computerGameboard.placeShip(newShip);
            return "ship placed successfully";
        } else if (checkShipValidity(newShip) === "ERROR - OOB") {
            return "error: out of bounds";
        } else if (checkShipValidity(newShip) === "ERROR - collision") {
            return "error: ship exists already";
        }
    }

    function checkShipValidity(shipObject = {}) {
        let sLength = shipObject["shipLength"];
        let sPosition = shipObject["position"];
        let sXcoord = shipObject["coords"][0];
        let sYcoord = shipObject["coords"][1];
        let sCoords = shipObject["shipCoords"];

        if (
            (sPosition === "horizontal" && sLength + sXcoord <= 10) ||
            (sPosition === "vertical" && sLength + sYcoord <= 10)
        ) {
            for (let i = 0; i < sCoords.length; i++) {
                let xC = sCoords[i][0];
                let yC = sCoords[i][1];
                if (computerGameboard.boardArr[yC][xC] === "s") {
                    return "ERROR - collision"; // if any of the squares are a ship - 's' // INVALID pick
                }
            }
            return "SUCCESS";
        } else {
            return "ERROR - OOB";
        }
    }

    return {
        computerGameboard,
        computerTurn,
        createShip,
    };
};

module.exports = Computer;
