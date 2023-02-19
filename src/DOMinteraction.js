const GameLoop = require("./gameloop");
import "./style.css";

let game = GameLoop();

// const document = document;

const container = document.createElement("div");
container.setAttribute("id", "container");
document.body.append(container);

const initBoards = document.createElement("button");
initBoards.innerText = "start boards";

container.append(initBoards);

const GBcontainer = document.createElement("div");
GBcontainer.setAttribute("id", "GBcontainer");
container.append(GBcontainer);

initBoards.addEventListener("click", createGameboards);

function createGameboards() {
    let plGb = game.player.playerGameboard;

    let rowNo = 0;
    // let placeShipMode = true;

    let plBoard = document.createElement("div");
    plBoard.setAttribute("id", "plBoard");
    GBcontainer.append(plBoard);

    plGb.boardArr.forEach((row) => {
        // let sq = row;

        row = document.createElement("div");
        row.setAttribute("class", "rows");
        row.classList.add(`r${rowNo}`);
        let sqNo = 0;

        for (let j = 0; j < 10; j++) {
            let sq = document.createElement("div");
            sq.setAttribute("class", "square");
            // sq.classList.add([rowNo, sqNo]);
            sq.classList.add(`c${sqNo}${rowNo}`);
            // sq.classList.add([sqNo]);
            // sq.classList.add("[rowNo, sqNo]");
            sq.addEventListener("click", function () {
                let x = Number(this.classList[1][1]);
                let y = Number(this.classList[1][2]);
                console.log([
                    x,
                    y,
                    // Number(this.classList[1][2]),
                    // Number(this.classList[1][1]),
                ]); // x , y
                // this.style.backgroundColor = "hotpink";

                shipX = x;
                shipY = y;
                dispCurSel();
            });
            sqNo++;
            row.append(sq);

            //onclick return x and y
        }
        rowNo++;

        plBoard.append(row);
    });

    // plboard
    // input length

    let shipLen = 0;
    let shipPos = "not selected";
    let shipX = 10;
    let shipY = 10;

    let shipInWaiting = [shipLen, shipPos, shipX, shipY];

    let selectShipOptions = document.createElement("div");

    let selection_label = document.createElement("p");
    let displayCurrentSelection = document.createElement("input");
    displayCurrentSelection.setAttribute(
        "placeholder",
        "Select LENGTH, ORIENTATION and LOCATION of the ship"
    );

    let ship_label = document.createElement("p");
    let ship1 = document.createElement("input");
    let ship2 = document.createElement("input");
    let ship3 = document.createElement("input");
    let ship4 = document.createElement("input");
    let ship5 = document.createElement("input");

    let pos_label = document.createElement("p");
    let posHor = document.createElement("input");
    let posVer = document.createElement("input");

    let confirm_label = document.createElement("p");
    let confirmBtn = document.createElement("button");

    selection_label.textContent = "Current selection:";
    ship_label.textContent = "Length:";
    pos_label.textContent = "Orientation:";
    confirm_label.textContent = "Place ship:";
    confirmBtn.textContent = "CONFIRM SELECTION";
    confirmBtn.disabled = true;

    ship1.setAttribute("type", "button");
    ship2.setAttribute("type", "button");
    ship3.setAttribute("type", "button");
    ship4.setAttribute("type", "button");
    ship5.setAttribute("type", "button");
    selectShipOptions.setAttribute("class", "select-options");
    ship1.setAttribute("class", "ship s1");
    ship2.setAttribute("class", "ship s2");
    ship3.setAttribute("class", "ship s3");
    ship4.setAttribute("class", "ship s4");
    ship5.setAttribute("class", "ship s5");
    posHor.setAttribute("type", "button");
    posVer.setAttribute("type", "button");

    // ship1.classList.add("shipParam");
    // ship2.classList.add("shipParam");
    // ship3.classList.add("shipParam");
    // ship4.classList.add("shipParam");
    // ship5.classList.add("shipParam");
    // posHor.classList.add("shipParam");
    // posVer.classList.add("shipParam");
    // const allShipParams = document.querySelectorAll("input.shipParam");

    // displayCurrentSelection.setAttribute("value", `${shipInWaiting}`);
    // displayCurrentSelection.disabled = true;
    displayCurrentSelection.style.pointerEvents = "none";

    ship1.setAttribute("value", "2");
    ship2.setAttribute("value", "2");
    ship3.setAttribute("value", "3");
    ship4.setAttribute("value", "4");
    ship5.setAttribute("value", "5");
    posHor.setAttribute("value", "horizontal");
    posVer.setAttribute("value", "vertical");

    plBoard.append(selectShipOptions);
    selectShipOptions.append(selection_label, displayCurrentSelection);
    selectShipOptions.append(ship_label, ship1, ship2, ship3, ship4, ship5);
    // plBoard.append(ship2);
    // plBoard.append(ship3);
    // plBoard.append(ship4);
    // plBoard.append(ship5);
    selectShipOptions.append(pos_label, posHor, posVer);
    selectShipOptions.append(confirm_label, confirmBtn);

    function returnThisValue() {
        console.log(this.value);
        let selectedValue = this.value;
        shipLen = selectedValue;
        dispCurSel();
    }

    function returnThisPosition() {
        console.log(this.value);
        let selectedPos = this.value;
        shipPos = selectedPos;
        dispCurSel();
    }

    function enableConfirmButton() {
        if (
            shipLen > 0 &&
            (shipPos === "horizontal" || shipPos === "vertical") &&
            shipX >= 0 &&
            shipX <= 9 &&
            shipY >= 0 &&
            shipY <= 9
        ) {
            console.log("confirm should work now");
            confirmBtn.disabled = false;
        }
    }

    function confirmShipSelection() {
        let shipToAdd = game.player.createShip(
            Number(shipInWaiting[0]),
            shipInWaiting[1],
            shipInWaiting[2],
            shipInWaiting[3]
        );

        // let shipToAdd1 = game.player.createShip(2, "horizontal", 1, 0); // TEST ONLY ****************
        // let shipToAdd2 = game.player.createShip(3, "horizontal", 1, 1); // TEST ONLY
        // let shipToAdd3 = game.player.createShip(4, "horizontal", 1, 2); // TEST ONLY
        // let shipToAdd4 = game.player.createShip(5, "horizontal", 1, 3); // TEST ONLY ****************
        // console.log(
        //     game.player.createShip(
        //         Number(shipInWaiting[0]),
        //         shipInWaiting[1],
        //         shipInWaiting[2],
        //         shipInWaiting[3]
        //     )
        // );
        console.log(shipToAdd);
        console.log(game.player.playerGameboard);
        console.log(game.player.playerGameboard.allShipCoords);
        console.log(game.player.playerGameboard.boardArr);

        if (shipToAdd === "ship placed successfully") {
            for (let i = 0; i < 10; i++) {
                // y
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                for (let j = 0; j < 10; j++) {
                    // x
                    if (plGb.boardArr[i][j] === "s") {
                        console.log("this is ship");
                        // thisCoordinate = plGb.boardArr[i][j];
                        // let currentSquare = document.querySelector(
                        //     "c" + `${j}` + `${i}`
                        // );
                        // currentSquare.innerHTML = "div";
                        let currSq = document.getElementsByClassName(
                            "c" + `${j}` + `${i}`
                        )[0];
                        console.log(currSq);
                        currSq.style.backgroundColor = "green";
                        // thisCoordinate.style.backgroundColor = "green";
                        // console.log(currentSquare);
                        // this.style.backgroundColor = "red";
                    }
                }
            }
            console.log(shipInWaiting[0]);
            let currentLengthSelected = shipInWaiting[0];
            console.log(currentLengthSelected);

            let thisShip = document.getElementsByClassName(
                "s" + `${currentLengthSelected}`
            )[0];
            if (
                currentLengthSelected == 2 &&
                document.getElementsByClassName("s2")[0].disabled === true
            ) {
                console.log("condition met");
                document.getElementsByClassName("s1")[0].disabled = true;
            }
            console.log(thisShip);
            console.log(plGb.allShipObj.length);
            thisShip.disabled = true;
            shipLen = 0;
            shipX = 10;
            shipY = 10;
            confirmBtn.disabled = true;
            dispCurSel();

            if (plGb.allShipObj.length === 5) {
                console.log("delete the div");
                selectShipOptions.remove();
                game.initializeShips();
                console.log(compGb);

                if (compGb.allShipObj.length === 5) {
                    console.log("comp created 5 ships");
                    for (let i = 0; i < 10; i++) {
                        // y
                        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                        for (let j = 0; j < 10; j++) {
                            // x
                            if (compGb.boardArr[i][j] === "s") {
                                // console.log("this is ship");
                                // thisCoordinate = plGb.boardArr[i][j];
                                // let currentSquare = document.querySelector(
                                //     "c" + `${j}` + `${i}`
                                // );
                                // currentSquare.innerHTML = "div";
                                let currSq = document.getElementsByClassName(
                                    "c" + `${j}` + `${i}`
                                )[1];
                                console.log(currSq);
                                // currSq.style.backgroundColor = "orange"; //+++++++++++++++++++++++++++++++++++
                                // thisCoordinate.style.backgroundColor = "green";
                                // console.log(currentSquare);
                                // this.style.backgroundColor = "red";
                            }
                        }
                    }
                    game.attackSquare();
                    console.log(game.player);
                }
            }
            // console.log(this);
            // DELETE or DISABLE LENGTH OPTION
            // when 5 ships created, delete the options, computer creates ships, start game
        }

        // console.log(shipInWaiting[0]);
        // console.log(shipInWaiting[1]);
        // console.log(shipInWaiting[2]);
        // console.log(shipInWaiting[3]);
    }

    ship1.addEventListener("click", returnThisValue);
    ship2.addEventListener("click", returnThisValue);
    ship3.addEventListener("click", returnThisValue);
    ship4.addEventListener("click", returnThisValue);
    ship5.addEventListener("click", returnThisValue);

    posHor.addEventListener("click", returnThisPosition);
    posVer.addEventListener("click", returnThisPosition);

    confirmBtn.addEventListener("click", confirmShipSelection);

    function dispCurSel() {
        // shipLen = ship1.addEventListener("click", returnThisValue);
        shipInWaiting = [shipLen, shipPos, shipX, shipY];
        displayCurrentSelection.setAttribute("value", `${shipInWaiting}`);
        enableConfirmButton();
    }

    // allShipParams.forEach((btn) => {
    //     btn.addEventListener("click", () => {
    //         returnThisValue;
    //     });
    // });

    // input position
    // click on start coord
    // submit 5 ships

    ///
    ///
    ///

    let compGb = game.computer.computerGameboard;

    let compBoard = document.createElement("div");
    compBoard.setAttribute("id", "compBoard");
    GBcontainer.append(compBoard);

    rowNo = 0;

    compGb.boardArr.forEach((row) => {
        // let sq = row;

        row = document.createElement("div");
        row.setAttribute("class", "rows");
        row.classList.add(`r${rowNo}`);
        let sqNo = 0;

        for (let j = 0; j < 10; j++) {
            let sq = document.createElement("div");
            sq.setAttribute("class", "square");
            // sq.classList.add([rowNo, sqNo]);
            sq.classList.add(`c${sqNo}${rowNo}`);
            // sq.classList.add([sqNo]);
            // sq.classList.add("[rowNo, sqNo]");
            sq.addEventListener("click", function () {
                console.log(
                    "CLICK***********************************************************"
                );
                // console.log(game.player.playerTurn);
                // console.log(game.computer.computerTurn);
                let x = Number(this.classList[1][1]);
                let y = Number(this.classList[1][2]);
                console.log([
                    x,
                    y,
                    // Number(this.classList[1][2]),
                    // Number(this.classList[1][1]),
                ]); // x , y
                this.style.backgroundColor = "royalblue";
                this.style.pointerEvents = "none";
                compGb.receiveAttack(x, y); //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                // console.log(game.attackHitCheck(x, y));
                // console.log(game.player.playerTurn);
                // console.log(game.computer.computerTurn);
                // game.attackHitCheck(x, y);
                // game.attackHitCheck(y, x);
                if (game.attackHitCheck(y, x) === "this PLAYER attack hit") {
                    this.style.backgroundColor = "purple";
                    return game.attackSquare();
                }
                game.turnSwitch();
                // console.log(game.player.playerTurn);
                // console.log(game.computer.computerTurn);
                game.attackSquare();
                // console.log(game.player.playerTurn);
                // console.log(game.computer.computerTurn);
                // player all attacks received colour in

                if (plGb.allAttacksReceived.length > 0) {
                    console.log("plGb attack received");
                    for (let z = 0; z < plGb.allAttacksReceived.length; z++) {
                        //
                        // let x = Number(this.classList[1][1]);
                        // let y = Number(this.classList[1][2]);
                        // console.log(x, y);

                        // for (let i = 0; i < 10; i++) {
                        // console.log(i);
                        // y
                        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                        // for (let j = 0; j < 10; j++) {
                        // console.log(j);
                        // x

                        // if (
                        //     plGb.allAttacksReceived[z][0] === x &&
                        //     plGb.allAttacksReceived[z][1] === y
                        // ) {
                        // console.log(plGb.allAttacksReceived[z]); //x y @z
                        // console.log(plGb.allAttacksReceived[z][0]); //x
                        // console.log(plGb.allAttacksReceived[z][1]); //y
                        // console.log("this is ship");
                        // thisCoordinate = plGb.boardArr[i][j];
                        // let currentSquare = document.querySelector(
                        //     "c" + `${j}` + `${i}`
                        // );
                        // currentSquare.innerHTML = "div";
                        // let currSq = document.getElementsByClassName(
                        //     "c" + `${j}` + `${i}`
                        // )[0];
                        let currSq = document.getElementsByClassName(
                            "c" +
                                `${plGb.allAttacksReceived[z][0]}` +
                                `${plGb.allAttacksReceived[z][1]}`
                        )[0];

                        let lastAttackReceivedIndex =
                            plGb.allAttacksReceived.length - 1;
                        // let currSq = document.getElementsByClassName(
                        //     "c" +
                        //         `${plGb.allAttacksReceived[lastAttackReceivedIndex][0]}` +
                        //         `${plGb.allAttacksReceived[lastAttackReceivedIndex][1]}`
                        // )[0];
                        console.log(currSq);
                        currSq.style.backgroundColor = "royalblue";
                        // console.log(currSq);

                        for (let q = 0; q < plGb.allShipCoords.length; q++) {
                            //
                            if (
                                plGb.allAttacksReceived[z][1] ===
                                    plGb.allShipCoords[q][0] &&
                                plGb.allAttacksReceived[z][0] ===
                                    plGb.allShipCoords[q][1]
                            ) {
                                //
                                currSq.style.backgroundColor = "darkred";
                            }
                        }
                        // game.turnSwitch();
                        // console.log(plGb.allAttacksReceived[z][0]);
                        // console.log(plGb.allAttacksReceived[z][1]);
                        // console.log(plGb.allAttacksReceived);
                        // console.log(plGb.allShipCoords);
                        // console.log(plGb.allShipCoords[z]);
                        // console.log(game.player.playerTurn);
                        // console.log(game.computer.computerTurn);
                        // console.log(
                        //     game.attackHitCheck(
                        //         plGb.allAttacksReceived[z][0],
                        //         plGb.allAttacksReceived[z][1]
                        //     )
                        // );
                        // let lastAttackReceivedIndex =
                        //     plGb.allAttacksReceived.length - 1;

                        let lastAttackReceived =
                            plGb.allAttacksReceived[lastAttackReceivedIndex];

                        console.log(lastAttackReceivedIndex);
                        console.log(lastAttackReceived);

                        // for (let k = 0; k < plGb.allShipCoords.length; k++) {
                        //     let m = plGb.allShipCoords[k][0];
                        //     let n = plGb.allShipCoords[k][1];
                        //     if (
                        //         lastAttackReceived[1] === m &&
                        //         lastAttackReceived[0] === n
                        //     ) {
                        //         console.log("yesssssssssssssssssssss");
                        //     } else {
                        //         console.log("nooooooo");
                        //         console.log(m);
                        //         console.log(lastAttackReceived[1]);
                        //     }
                        // }
                        // if (lastAttackReceived[0] ===
                        // console.log(
                        //     plGb.allAttacksReceived[lastAttackReceivedIndex]
                        // );
                        // console.log(
                        //     plGb.allAttacksReceived[lastAttackReceivedIndex][0]
                        // );
                        // console.log(
                        //     plGb.allAttacksReceived[lastAttackReceivedIndex][1]
                        // );

                        // if (
                        //     // z > 0 &&
                        //     game.attackHitCheck(
                        //         plGb.allShipCoords[
                        //             plGb.allAttacksReceived.length - 1
                        //         ][0],
                        //         plGb.allShipCoords[
                        //             plGb.allAttacksReceived.length - 1
                        //         ][1]
                        //     ) === "this attack hit"
                        // ) {
                        //     //
                        //     currSq.style.backgroundColor = "pink";
                        // }

                        // for (
                        //     let k = 0;
                        //     k < plGb.allAttacksReceived.length;
                        //     k++
                        // ) {
                        //     if ()
                        // }
                        // game.turnSwitch();

                        // if (
                        //     game.attackHitCheck(
                        //         plGb.allAttacksReceived[z][1],
                        //         plGb.allAttacksReceived[z][0]
                        //         // plGb.allShipCoords[z][0],
                        //         // plGb.allShipCoords[z][1]
                        //     ) === "attack missed"
                        // ) {
                        //     // this.style.backgroundColor = "purple";
                        //     currSq.style.backgroundColor = "royalblue";
                        //     console.log(currSq);

                        //     // return;

                        //     console.log("MISS");
                        //     // return game.attackSquare();
                        // }
                        // // if (
                        // //     game.attackHitCheck(
                        // //         plGb.allAttacksReceived[z][1],
                        // //         plGb.allAttacksReceived[z][0]
                        // //         // plGb.allShipCoords[z][0],
                        // //         // plGb.allShipCoords[z][1]
                        // //     ) === "this attack hit"
                        // // )
                        // else {
                        //     currSq.style.backgroundColor = "darkRed";
                        //     console.log(currSq);

                        //     console.log("HIT");
                        // }

                        // thisCoordinate.style.backgroundColor = "green";
                        // console.log(currentSquare);
                        // this.style.backgroundColor = "red";
                        // }
                        //     }
                        // }
                    }
                }

                // for (let i = 0; i < 10; i++) {
                //     // y
                //     //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //     for (let j = 0; j < 10; j++) {
                //         // x
                //         for (
                //             let z = 0;
                //             z < plGb.allAttacksReceived.length;
                //             z++
                //         ) {
                //             let x = Number(this.classList[1][1]);
                //             let y = Number(this.classList[1][2]);
                //             if (
                //                 plGb.allAttacksReceived[z][0] === x &&
                //                 plGb.allAttacksReceived[z][1] === y
                //             ) {
                //                 // console.log("this is ship");
                //                 thisCoordinate = plGb.boardArr[i][j];
                //                 // let currentSquare = document.querySelector(
                //                 //     "c" + `${j}` + `${i}`
                //                 // );
                //                 // currentSquare.innerHTML = "div";
                //                 let currSq = document.getElementsByClassName(
                //                     "c" + `${j}` + `${i}`
                //                 )[0];
                //                 console.log(currSq);
                //                 currSq.style.backgroundColor = "yellow";
                //                 // thisCoordinate.style.backgroundColor = "green";
                //                 // console.log(currentSquare);
                //                 // this.style.backgroundColor = "red";
                //             }
                //         }
                //     }
                // }
            });
            sqNo++;
            row.append(sq);

            //onclick return x and y
        }
        rowNo++;

        compBoard.append(row);
    });

    initBoards.disabled = true;
}

module.exports = createGameboards;
export default createGameboards;
