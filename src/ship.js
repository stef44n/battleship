// ships factory function

const Ship = (len) => {
    const shipLength = len;
    let hitsTaken = 0;
    let position = "horizontal";
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
