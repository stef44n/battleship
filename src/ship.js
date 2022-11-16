// ships factory function

const Ship = (len, pos) => {
    const shipLength = len;
    let hitsTaken = 0;
    let position = pos;
    let coords = [0, 0];
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
