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
        if (boardArr[y][x] === "s") {
            // square populated by a ship - 's'
            boardArr[y][x] = "HIT";
            return boardArr[y][x];
        } else {
            boardArr[y][x] = "MISS";
            return boardArr[y][x];
        }
    };

    return {
        boardArr,
        placeShip,
        currentShip,
        receiveAttack,
        allShipCoords,
        allShipObj,
    };
};

module.exports = Gameboard;
