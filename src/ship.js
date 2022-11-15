// ships factory function

const Ship = () => {
    const shipLength = 0;
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

module.exports = { Ship };
