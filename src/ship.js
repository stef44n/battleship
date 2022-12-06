// ships factory function

const Ship = (
    len,
    pos = "horizontal",
    startX = 0,
    startY = 0
    // hitsTaken = 0,
    // sunk = false
) => {
    const shipLength = len;
    let position = pos;
    let xCoord = startX;
    let yCoord = startY;
    let coords = [xCoord, yCoord];
    let hits = 0;
    let isSunk = false;
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

    function isHit(x, y) {
        for (i = 0; i < shipCoords.length; i++) {
            if (shipCoords[i][0] === x && shipCoords[i][1] === y) {
                // hits++;
                this.hits += 1;
                this.isSunkFunc();
                // isSunk = isSunkFunc();
                return "yes"; //`yes hits:${hits}`; // HIT
            }
        }

        return `no ship at [${x}, ${y}]`; // MISS
    }

    function isSunkFunc() {
        if (this.shipLength === this.hits) {
            this.isSunk = true;
            return true;
        } else {
            return false;
        }
    }

    return {
        shipLength,
        hits,
        position,
        coords,
        isSunk,
        shipCoords,
        isHit,
        isSunkFunc,
    };
};

module.exports = Ship;
