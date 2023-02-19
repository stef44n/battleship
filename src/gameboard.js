const Ship = require("./ship");

const Gameboard = (shipObj = {}) => {
    let boardArr = [];
    const boardSize = 10;

    const setBoardArr = () => {
        let arr = new Array(boardSize);
        for (let i = 0; i < boardSize; i++) {
            arr[i] = new Array(boardSize);
        }
        return arr;
    };

    boardArr = setBoardArr();

    let currentShip = shipObj;

    let allShipCoords = [];
    let allShipObj = [];
    let allAttacksReceived = [];

    // let shipExam = placeShip(currentShip);

    const placeShip = (shipObject = {}) => {
        // let placeShip = (len, pos, x, y) => {
        // let shipEx = Ship(len, pos, x, y);

        let sLength = shipObject["shipLength"];
        let sPosition = shipObject["position"];
        let sCoords = shipObject["shipCoords"];

        allShipObj.push(shipObject);

        // boardArr[0][0] = sCoords[0];

        for (let i = 0; i < sLength; i++) {
            let shipXcoor = sCoords[i][0];
            let shipYcoor = sCoords[i][1];
            boardArr[shipYcoor][shipXcoor] = "s"; // sCoords[i];

            let thisXY = [shipYcoor, shipXcoor];
            allShipCoords.push(thisXY);
        }

        return { sLength, sPosition, sCoords, boardArr, shipObject };
    };

    const receiveAttack = (x, y) => {
        let thisXY = [x, y];

        if (allAttacksReceived.length > 0) {
            for (let j = 0; j < allAttacksReceived.length; j++) {
                // check if the square was hit already or not
                if (
                    allAttacksReceived[j][0] === x &&
                    allAttacksReceived[j][1] === y
                ) {
                    return "square attacked already";
                }
            }
        }

        allAttacksReceived.push(thisXY);
        for (let i = 0; i < allShipObj.length; i++) {
            allShipObj[i].isHit(x, y);
        }

        return sunkShipStatus();

        // return "new attack added to array";
    };

    function sunkShipStatus() {
        let sunkStatus = 0;
        for (let i = 0; i < allShipObj.length; i++) {
            if (allShipObj[i].isSunk === true) {
                sunkStatus += 1;
            }
        }
        if (allShipObj.length === sunkStatus) {
            return "game over";
        }

        return `${sunkStatus} of ${allShipObj.length} have been sunk`;
    }

    return {
        boardArr,
        placeShip,
        currentShip,
        receiveAttack,
        allShipCoords,
        allShipObj,
        allAttacksReceived,
        sunkShipStatus,
    };
};

module.exports = Gameboard;
