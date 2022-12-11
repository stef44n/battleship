const Player = require("./player");
const Computer = require("./computer");

const GameLoop = () => {
    let player = Player();
    let computer = Computer();

    function initializeShips() {
        if (player.playerGameboard.allShipObj.length < 5) {
            return "place more ships"; //manual
        }

        if (computer.computerGameboard.allShipObj.length < 5) {
            computer.createShips();
            return "completed";
        }
    }

    // play your move
    // function attackSquare() {
    //     //if playerturn==true
    //     // computer receive attack
    //     //else if computer turn ==true
    //     // player receive attack
    // }

    function computerAttack() {
        let attackCoords = computer.attackRandomSquare();
        console.log(attackCoords);
        let x = attackCoords[0];
        let y = attackCoords[1];
        console.log(x, y);
        let attack = player.playerGameboard.receiveAttack(x, y);
        return attack;
    }

    function turnSwitch() {
        if (player.playerTurn === true) {
            player.playerTurn = false;
            computer.computerTurn = true;
            // return
        } else {
            player.playerTurn = true;
            computer.computerTurn = false;
            // return
        }
    }

    return {
        player,
        computer,
        initializeShips,
        computerAttack,
        turnSwitch,
    };
};

module.exports = GameLoop;
