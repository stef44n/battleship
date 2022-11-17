const Ship = require("./ship");

const Gameboard = () => {
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

    boardArr[0][6] = "06";
    boardArr[0][9] = "09";
    boardArr[9][0] = "90";

    let shipEx = Ship(3, "vertical", 4, 4);

    let placeShip = () => {
        let sLength = shipEx["shipLength"];
        let sPosition = shipEx["position"];
        let sCoords = shipEx["shipCoords"];

        // boardArr[0][0] = sCoords[0];

        for (let i = 0; i < sLength; i++) {
            let shipXcoor = sCoords[i][0];
            let shipYcoor = sCoords[i][1];
            boardArr[shipYcoor][shipXcoor] = "s"; // sCoords[i];
        }

        return { sLength, sPosition, sCoords, boardArr };
    };

    return { boardArr, placeShip };
};

module.exports = Gameboard;
