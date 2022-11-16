// ships factory function

const Ship = (
    len,
    pos = "horizontal",
    startX = 0,
    startY = 0,
    hitsTaken = 0,
    sunk = false
) => {
    const shipLength = len;
    let position = pos;
    let xCoord = startX;
    let yCoord = startY;
    let coords = [xCoord, yCoord];
    let hits = hitsTaken;
    let isSunk = sunk;
    let shipCoords = [];

    const getShipCoords = (len, pos, startX, startY) => {
        // shipCoords.push(coords);
        if (pos === "horizontal") {
            let squareX = startX;
            for (let i = 0; i < len; i++) {
                let sCoords = [squareX, startY];
                shipCoords.push(sCoords);
                squareX++;
            }
        } else {
            let squareY = startY;
            for (let i = 0; i < len; i++) {
                let sCoords = [startX, squareY];
                shipCoords.push(sCoords);
                squareY++;
            }
        }
        return shipCoords;
    };
    getShipCoords(len, pos, startX, startY);

    return {
        shipLength,
        hits,
        position,
        coords,
        isSunk,
        shipCoords,
    };
};

module.exports = Ship;
