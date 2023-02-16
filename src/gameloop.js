const Player = require("./player");
const Computer = require("./computer");

const GameLoop = () => {
    let player = Player();
    let computer = Computer();

    function initializeShips() {
        if (player.playerGameboard.allShipObj.length < 5) {
            return "place more ships"; //manual
            // create ships prompt / choose length from array/remove said length/ h/v / pick square w mouse for x y
            // return initializeShips() // recurse until 5 ships created
        }

        if (computer.computerGameboard.allShipObj.length < 5) {
            computer.createShips();
            return "completed";
        }
    }

    // play your move
    function attackSquare() {
        if (
            player.playerGameboard.sunkShipStatus() === "game over" ||
            computer.computerGameboard.sunkShipStatus() === "game over"
        ) {
            return "game over";
        }

        if (player.playerTurn === true) {
            //give attack//
            // prompt user to pick a square
            // on click get x and y
            // computer.computerGameboard.receiveAttack(x, y)
            // if hit attack again (allShipCoords needed)
            // if miss switch turn and recurse the function until game over is reached
            // turnSwitch();
            // attackSquare();
            return "current turn: player";
        }

        if (computer.computerTurn === true) {
            // computerAttack()
            let attack = computerAttack();
            // if hit, attack again, else
            if (attackHitCheck(attack) === "this attack hit") {
                return attackSquare();
            }
            turnSwitch();
            attackSquare();
            // if hit attack again
            // if attack(x,y) === any of coords in the (pla/comp.) allShipCoords
            // if miss switch turn and recurse attackSquare again
        }
        //if playerturn==true
        // computer receive attack
        //else if computer turn ==true
        // player receive attack
    }

    function attackHitCheck(coords = {}) {
        let x = coords["x"];
        let y = coords["y"];
        if (player.playerTurn === true) {
            for (
                let i = 0;
                i < computer.computerGameboard.allShipCoords.length;
                i++
            ) {
                if (
                    computer.computerGameboard.allShipCoords[i][0] === x &&
                    computer.computerGameboard.allShipCoords[i][1] === y
                ) {
                    return "this attack hit";
                } else {
                    return "this attack missed";
                }
            }
        } else {
            for (
                let i = 0;
                i < player.playerGameboard.allShipCoords.length;
                i++
            ) {
                if (
                    player.playerGameboard.allShipCoords[i][0] === x &&
                    player.playerGameboard.allShipCoords[i][1] === y
                ) {
                    return "this attack hit";
                } else {
                    return "this attack missed";
                }
            }
        }
    }

    function computerAttack() {
        let attackCoords = computer.attackRandomSquare();
        // console.log(attackCoords);
        let x = attackCoords[0];
        let y = attackCoords[1];
        // console.log(x, y);
        let attack = player.playerGameboard.receiveAttack(x, y);
        return attack;
    }

    function turnSwitch() {
        if (player.playerTurn === true) {
            player.playerTurn = false;
            computer.computerTurn = true;
            return "next turn: comp";
        } else {
            player.playerTurn = true;
            computer.computerTurn = false;
            return "next turn: player";
        }
    }

    return {
        player,
        computer,
        initializeShips,
        computerAttack,
        turnSwitch,
        attackSquare,
    };
};

module.exports = GameLoop;
