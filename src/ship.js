// ships factory function

const Ship = (len, pos = "horizontal", startX = 0, startY = 0) => {
    const shipLength = len;
    let position = pos;
    let xCoord = startX;
    let yCoord = startY;
    let coords = [xCoord, yCoord];
    let hitsTaken = 0;
    let sunk = false;

    return {
        shipLength,
        hitsTaken,
        position,
        coords,
        sunk,
    };
};

module.exports = Ship;
