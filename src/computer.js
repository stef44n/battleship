const Gameboard = require("./gameboard");
const Ship = require("./ship");

const Computer = () => {
    let computerGameboard = Gameboard();

    let computerTurn = false;

    function createShips() {
        // let newShip = Ship(len, pos, x, y);
        let newShip = randomShip();
        // return checkShipValidity(newShip);

        while (computerGameboard.allShipObj.length < 5) {
            if (checkShipValidity(newShip) === "SUCCESS") {
                // console.log(newShip.shipLength);
                let thisLength = newShip.shipLength;
                let index = lengthOptions.indexOf(thisLength);
                lengthOptions.splice(index, 1);
                computerGameboard.placeShip(newShip);
            } else {
                createShips();
            }
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

    let lengthOptions = [2, 2, 3, 4, 5];
    function randomShip() {
        let positionOptions = ["horizontal", "vertical"];
        let coordOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        function randomPick() {
            let randomLength =
                lengthOptions[Math.floor(Math.random() * lengthOptions.length)];

            let randomPositon =
                positionOptions[
                    Math.floor(Math.random() * positionOptions.length)
                ];

            let randomX =
                coordOptions[Math.floor(Math.random() * coordOptions.length)];

            let randomY =
                coordOptions[Math.floor(Math.random() * coordOptions.length)];

            let newShip = Ship(randomLength, randomPositon, randomX, randomY);

            return newShip;
        }

        return randomPick();
    }

    return {
        computerGameboard,
        computerTurn,
        createShips,
    };
};

module.exports = Computer;
