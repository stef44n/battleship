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

    // let shipExam = placeShip(currentShip);

    const placeShip = (shipObject = {}) => {
        // let placeShip = (len, pos, x, y) => {
        // let shipEx = Ship(len, pos, x, y);

        let sLength = shipObject["shipLength"];
        let sPosition = shipObject["position"];
        let sCoords = shipObject["shipCoords"];

        // boardArr[0][0] = sCoords[0];

        for (let i = 0; i < sLength; i++) {
            let shipXcoor = sCoords[i][0];
            let shipYcoor = sCoords[i][1];
            boardArr[shipYcoor][shipXcoor] = "s"; // sCoords[i];
        }

        return { sLength, sPosition, sCoords, boardArr, shipObject };
    };

    return { boardArr, placeShip, currentShip };
};

module.exports = Gameboard;
