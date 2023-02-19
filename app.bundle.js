(self["webpackChunkbattleships"] = self["webpackChunkbattleships"] || []).push([["app"],{

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  }; // import a list of modules into the list

  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/DOMinteraction.js":
/*!*******************************!*\
  !*** ./src/DOMinteraction.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* module decorator */ module = __webpack_require__.hmd(module);
const GameLoop = __webpack_require__(/*! ./gameloop */ "./src/gameloop.js");

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
  plGb.boardArr.forEach(row => {
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
        console.log([x, y
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
  displayCurrentSelection.setAttribute("placeholder", "Select LENGTH, ORIENTATION and LOCATION of the ship");
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
    if (shipLen > 0 && (shipPos === "horizontal" || shipPos === "vertical") && shipX >= 0 && shipX <= 9 && shipY >= 0 && shipY <= 9) {
      console.log("confirm should work now");
      confirmBtn.disabled = false;
    }
  }
  function confirmShipSelection() {
    let shipToAdd = game.player.createShip(Number(shipInWaiting[0]), shipInWaiting[1], shipInWaiting[2], shipInWaiting[3]);

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
            let currSq = document.getElementsByClassName("c" + `${j}` + `${i}`)[0];
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
      let thisShip = document.getElementsByClassName("s" + `${currentLengthSelected}`)[0];
      if (currentLengthSelected == 2 && document.getElementsByClassName("s2")[0].disabled === true) {
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
                let currSq = document.getElementsByClassName("c" + `${j}` + `${i}`)[1];
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
  compGb.boardArr.forEach(row => {
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
        console.log("CLICK***********************************************************");
        // console.log(game.player.playerTurn);
        // console.log(game.computer.computerTurn);
        let x = Number(this.classList[1][1]);
        let y = Number(this.classList[1][2]);
        console.log([x, y
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
            let currSq = document.getElementsByClassName("c" + `${plGb.allAttacksReceived[z][0]}` + `${plGb.allAttacksReceived[z][1]}`)[0];
            let lastAttackReceivedIndex = plGb.allAttacksReceived.length - 1;
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
              if (plGb.allAttacksReceived[z][1] === plGb.allShipCoords[q][0] && plGb.allAttacksReceived[z][0] === plGb.allShipCoords[q][1]) {
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

            let lastAttackReceived = plGb.allAttacksReceived[lastAttackReceivedIndex];
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGameboards);

/***/ }),

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gameboard = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
const Ship = __webpack_require__(/*! ./ship */ "./src/ship.js");
const Computer = () => {
  let computerGameboard = Gameboard();
  let computerTurn = false;
  function createShips() {
    // let newShip = Ship(len, pos, x, y);
    let newShip = randomShip();
    // return checkShipValidity(newShip);

    while (computerGameboard.allShipObj.length < 5) {
      if (checkShipValidity(newShip) === "SUCCESS") {
        // console.log(newShip.shipLength);
        let thisLength = newShip.shipLength;
        let index = lengthOptions.indexOf(thisLength);
        lengthOptions.splice(index, 1);
        computerGameboard.placeShip(newShip);
      } else {
        createShips();
      }
    }
  }
  function checkShipValidity(shipObject = {}) {
    let sLength = shipObject["shipLength"];
    let sPosition = shipObject["position"];
    let sXcoord = shipObject["coords"][0];
    let sYcoord = shipObject["coords"][1];
    let sCoords = shipObject["shipCoords"];
    if (sPosition === "horizontal" && sLength + sXcoord <= 10 || sPosition === "vertical" && sLength + sYcoord <= 10) {
      for (let i = 0; i < sCoords.length; i++) {
        let xC = sCoords[i][0];
        let yC = sCoords[i][1];
        if (computerGameboard.boardArr[yC][xC] === "s") {
          return "ERROR - collision"; // if any of the squares are a ship - 's' // INVALID pick
        }
      }

      return "SUCCESS";
    } else {
      return "ERROR - OOB";
    }
  }
  let lengthOptions = [2, 2, 3, 4, 5];
  function randomShip() {
    let positionOptions = ["horizontal", "vertical"];
    let coordOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    function randomPick() {
      let randomLength = lengthOptions[Math.floor(Math.random() * lengthOptions.length)];
      let randomPositon = positionOptions[Math.floor(Math.random() * positionOptions.length)];
      let randomX = coordOptions[Math.floor(Math.random() * coordOptions.length)];
      let randomY = coordOptions[Math.floor(Math.random() * coordOptions.length)];
      let newShip = Ship(randomLength, randomPositon, randomX, randomY);
      return newShip;
    }
    return randomPick();
  }
  function allSquares() {
    let allPossibleCoordinates = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        let coord = [x, y];
        allPossibleCoordinates.push(coord);
      }
    }
    return allPossibleCoordinates;
  }
  let squaresToAttack = allSquares();
  function attackRandomSquare() {
    let randomSquare = squaresToAttack[Math.floor(Math.random() * squaresToAttack.length)];
    // let x = randomSquare[0];
    // let y = randomSquare[1];
    let index = squaresToAttack.indexOf(randomSquare);
    squaresToAttack.splice(index, 1);
    return randomSquare;
  }
  return {
    computerGameboard,
    computerTurn,
    createShips,
    squaresToAttack,
    attackRandomSquare
  };
};
module.exports = Computer;

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Ship = __webpack_require__(/*! ./ship */ "./src/ship.js");
const Gameboard = (shipObj = {}) => {
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
  let currentShip = shipObj;
  let allShipCoords = [];
  let allShipObj = [];
  let allAttacksReceived = [];

  // let shipExam = placeShip(currentShip);

  const placeShip = (shipObject = {}) => {
    // let placeShip = (len, pos, x, y) => {
    // let shipEx = Ship(len, pos, x, y);

    let sLength = shipObject["shipLength"];
    let sPosition = shipObject["position"];
    let sCoords = shipObject["shipCoords"];
    allShipObj.push(shipObject);

    // boardArr[0][0] = sCoords[0];

    for (let i = 0; i < sLength; i++) {
      let shipXcoor = sCoords[i][0];
      let shipYcoor = sCoords[i][1];
      boardArr[shipYcoor][shipXcoor] = "s"; // sCoords[i];

      let thisXY = [shipYcoor, shipXcoor];
      allShipCoords.push(thisXY);
    }
    return {
      sLength,
      sPosition,
      sCoords,
      boardArr,
      shipObject
    };
  };
  const receiveAttack = (x, y) => {
    let thisXY = [x, y];
    if (allAttacksReceived.length > 0) {
      for (let j = 0; j < allAttacksReceived.length; j++) {
        // check if the square was hit already or not
        if (allAttacksReceived[j][0] === x && allAttacksReceived[j][1] === y) {
          return "square attacked already";
        }
      }
    }
    allAttacksReceived.push(thisXY);
    for (let i = 0; i < allShipObj.length; i++) {
      allShipObj[i].isHit(x, y);
    }
    return sunkShipStatus();

    // return "new attack added to array";
  };

  function sunkShipStatus() {
    let sunkStatus = 0;
    for (let i = 0; i < allShipObj.length; i++) {
      if (allShipObj[i].isSunk === true) {
        sunkStatus += 1;
      }
    }
    if (allShipObj.length === sunkStatus) {
      return "game over";
    }
    return `${sunkStatus} of ${allShipObj.length} have been sunk`;
  }
  return {
    boardArr,
    placeShip,
    currentShip,
    receiveAttack,
    allShipCoords,
    allShipObj,
    allAttacksReceived,
    sunkShipStatus
  };
};
module.exports = Gameboard;

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Player = __webpack_require__(/*! ./player */ "./src/player.js");
const Computer = __webpack_require__(/*! ./computer */ "./src/computer.js");
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
    if (player.playerGameboard.sunkShipStatus() === "game over" || computer.computerGameboard.sunkShipStatus() === "game over") {
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
      console.log("current turn: computer");
      // computerAttack()
      let attack = computerAttack();
      // if hit, attack again, else
      // console.log(attackHitCheck(attack));
      console.log(attack);
      let attackX = attack["x"];
      let attackY = attack["y"];
      console.log(attackX);
      console.log(attackY);
      // console.log(attack["x"]);
      // console.log(attack["y"]);
      if (attackHitCheck(attackY, attackX) === "this attack hit") {
        return attackSquare();
      }
      turnSwitch();
      attackSquare();
      // if hit attack again
      // if attack(x,y) === any of coords in the (pla/comp.) allShipCoords
      // if miss switch turn and recurse attackSquare again
    }

    // if (computer.computerTurn === true) {
    //     // computerAttack()
    //     let attack = computerAttack();
    //     // if hit, attack again, else
    //     if (attackHitCheck(attack) === "this attack hit") {
    //         //ooooooooooooo
    //         return attackSquare();
    //     }
    //     turnSwitch();
    //     attackSquare();
    //     // if hit attack again
    //     // if attack(x,y) === any of coords in the (pla/comp.) allShipCoords
    //     // if miss switch turn and recurse attackSquare again
    // }
    //if playerturn==true
    // computer receive attack
    //else if computer turn ==true
    // player receive attack
  }

  // function attackHitCheck(coords = {}) {
  //     let x = coords["x"];
  //     let y = coords["y"];
  //     if (player.playerTurn === true) {
  //         for (
  //             let i = 0;
  //             i < computer.computerGameboard.allShipCoords.length;
  //             i++
  //         ) {
  //             if (
  //                 computer.computerGameboard.allShipCoords[i][0] === x &&
  //                 computer.computerGameboard.allShipCoords[i][1] === y
  //             ) {
  //                 return "this attack hit";
  //             } else {
  //                 return "this attack missed";
  //             }
  //         }
  //     } else {
  //         for (
  //             let i = 0;
  //             i < player.playerGameboard.allShipCoords.length;
  //             i++
  //         ) {
  //             if (
  //                 player.playerGameboard.allShipCoords[i][0] === x &&
  //                 player.playerGameboard.allShipCoords[i][1] === y
  //             ) {
  //                 return "this attack hit";
  //             } else {
  //                 return "this attack missed";
  //             }
  //         }
  //     }
  // }

  function attackHitCheck(xx, yy) {
    // let x = coords["x"];
    // let y = coords["y"];
    let x = xx;
    let y = yy;
    console.log(player.playerTurn);
    if (player.playerTurn === true) {
      console.log("TURN: PLAYER? YES");
      for (let i = 0; i < computer.computerGameboard.allShipCoords.length; i++) {
        if (computer.computerGameboard.allShipCoords[i][0] === x && computer.computerGameboard.allShipCoords[i][1] === y) {
          console.log("play attack HITTTT");
          return "this PLAYER attack hit";
        } else {
          // console.log(computer.computerGameboard.allShipCoords[i][0]);
          // console.log(computer.computerGameboard.allShipCoords[i][1]);
          // console.log(
          //     computer.computerGameboard.allShipCoords.length
          // );
          console.log("play attack missed");
          // return "this attack missed";
        }
      }
    } else {
      for (let i = 0; i < player.playerGameboard.allShipCoords.length; i++) {
        if (player.playerGameboard.allShipCoords[i][0] === x && player.playerGameboard.allShipCoords[i][1] === y) {
          console.log("comp attack hit!!!!!!!!!!!!");
          return "this attack hit";
        } else {
          console.log("comp attack missed");
          // console.log(player.playerGameboard.allShipCoords[i][0]);
          // console.log(player.playerGameboard.allShipCoords[i][1]);
          // console.log(player.playerGameboard.allShipCoords.length);
          // return "this attack missed";
        }
      }
    }

    return "attack missed";
  }

  // function computerAttack() {
  //     let attackCoords = computer.attackRandomSquare();
  //     // console.log(attackCoords);
  //     let x = attackCoords[0];
  //     let y = attackCoords[1];
  //     // console.log(x, y);
  //     let attack = player.playerGameboard.receiveAttack(x, y);
  //     return attack;
  // }

  function computerAttack() {
    let attackCoords = computer.attackRandomSquare();
    console.log(attackCoords);
    let x = attackCoords[0];
    let y = attackCoords[1];
    console.log(x, y);
    // let attack =
    player.playerGameboard.receiveAttack(x, y);
    // attackHitCheck(y, x);
    // return attack;
    return {
      x,
      y
    };
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
    attackHitCheck
  };
};
module.exports = GameLoop;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gameboard_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_player_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _computer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./computer.js */ "./src/computer.js");
/* harmony import */ var _computer_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_computer_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _gameloop_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameloop.js */ "./src/gameloop.js");
/* harmony import */ var _gameloop_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_gameloop_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DOMinteraction_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DOMinteraction.js */ "./src/DOMinteraction.js");
// import { cube } from "./math.js";








// function component() {
//     const element = document.createElement("pre");
//     element.innerHTML = [
//         "Hello webpack!MMk",
//         // "5 cubed is equal to " + cube(5),
//     ].join("\n\n");

//     return element;
// }
// document.body.appendChild(component());

// let ship1 = ship(3, 0, false);
// console.log(ship1);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// import Gameboard from "Gameboard";
const Gameboard = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
const Ship = __webpack_require__(/*! ./ship */ "./src/ship.js");
const Player = () => {
  //create gameboard
  //choose ship (length)
  //choose positioning (H/V)
  //place ship (x,y)
  //attack a square
  let playerGameboard = Gameboard();
  let playerTurn = true;
  function createShip(len, pos, x, y) {
    let newShip = Ship(len, pos, x, y);
    // return checkShipValidity(newShip);
    if (checkShipValidity(newShip) === "SUCCESS") {
      playerGameboard.placeShip(newShip);
      return "ship placed successfully";
    } else if (checkShipValidity(newShip) === "ERROR - OOB") {
      return "error: out of bounds";
    } else if (checkShipValidity(newShip) === "ERROR - collision") {
      return "error: ship exists already";
    }
  }
  function checkShipValidity(shipObject = {}) {
    let sLength = shipObject["shipLength"];
    let sPosition = shipObject["position"];
    let sXcoord = shipObject["coords"][0];
    let sYcoord = shipObject["coords"][1];
    let sCoords = shipObject["shipCoords"];
    if (sPosition === "horizontal" && sLength + sXcoord <= 10 || sPosition === "vertical" && sLength + sYcoord <= 10) {
      for (let i = 0; i < sCoords.length; i++) {
        let xC = sCoords[i][0];
        let yC = sCoords[i][1];
        if (playerGameboard.boardArr[yC][xC] === "s") {
          return "ERROR - collision"; // if any of the squares are a ship - 's' // INVALID pick
        }
      }

      return "SUCCESS";
    } else {
      return "ERROR - OOB";
    }
  }
  return {
    playerGameboard,
    playerTurn,
    createShip
  };
};
module.exports = Player;

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

// ships factory function

const Ship = (len, pos = "horizontal", startX = 0, startY = 0
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
    isSunkFunc
  };
};
module.exports = Ship;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div {\n    border: solid black 1px;\n}\n\n.square {\n    width: 40px;\n    height: 40px;\n    border: 2px solid darkgray;\n}\n\n.rows {\n    display: flex;\n    width: fit-content;\n}\n\n/* .square.c00,\n.square.c99 {\n    background-color: red;\n} */\n\n.square:hover {\n    border: solid green 2px;\n    background-color: rgba(0, 255, 255, 0.5);\n    /* border-radius: 5%; */\n}\n\n#GBcontainer {\n    display: flex;\n    padding: 20px;\n    justify-content: space-around;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,kBAAkB;AACtB;;AAEA;;;GAGG;;AAEH;IACI,uBAAuB;IACvB,wCAAwC;IACxC,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,aAAa;IACb,6BAA6B;AACjC","sourcesContent":["div {\n    border: solid black 1px;\n}\n\n.square {\n    width: 40px;\n    height: 40px;\n    border: 2px solid darkgray;\n}\n\n.rows {\n    display: flex;\n    width: fit-content;\n}\n\n/* .square.c00,\n.square.c99 {\n    background-color: red;\n} */\n\n.square:hover {\n    border: solid green 2px;\n    background-color: rgba(0, 255, 255, 0.5);\n    /* border-radius: 5%; */\n}\n\n#GBcontainer {\n    display: flex;\n    padding: 20px;\n    justify-content: space-around;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvRE9NaW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImNvbnN0IEdhbWVMb29wID0gcmVxdWlyZShcIi4vZ2FtZWxvb3BcIik7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuXG5sZXQgZ2FtZSA9IEdhbWVMb29wKCk7XG5cbi8vIGNvbnN0IGRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb250YWluZXJcIik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChjb250YWluZXIpO1xuXG5jb25zdCBpbml0Qm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmluaXRCb2FyZHMuaW5uZXJUZXh0ID0gXCJzdGFydCBib2FyZHNcIjtcblxuY29udGFpbmVyLmFwcGVuZChpbml0Qm9hcmRzKTtcblxuY29uc3QgR0Jjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuR0Jjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJHQmNvbnRhaW5lclwiKTtcbmNvbnRhaW5lci5hcHBlbmQoR0Jjb250YWluZXIpO1xuXG5pbml0Qm9hcmRzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVHYW1lYm9hcmRzKTtcblxuZnVuY3Rpb24gY3JlYXRlR2FtZWJvYXJkcygpIHtcbiAgICBsZXQgcGxHYiA9IGdhbWUucGxheWVyLnBsYXllckdhbWVib2FyZDtcblxuICAgIGxldCByb3dObyA9IDA7XG4gICAgLy8gbGV0IHBsYWNlU2hpcE1vZGUgPSB0cnVlO1xuXG4gICAgbGV0IHBsQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBsQm9hcmQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbEJvYXJkXCIpO1xuICAgIEdCY29udGFpbmVyLmFwcGVuZChwbEJvYXJkKTtcblxuICAgIHBsR2IuYm9hcmRBcnIuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgIC8vIGxldCBzcSA9IHJvdztcblxuICAgICAgICByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dzXCIpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZChgciR7cm93Tm99YCk7XG4gICAgICAgIGxldCBzcU5vID0gMDtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBzcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzcS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNxdWFyZVwiKTtcbiAgICAgICAgICAgIC8vIHNxLmNsYXNzTGlzdC5hZGQoW3Jvd05vLCBzcU5vXSk7XG4gICAgICAgICAgICBzcS5jbGFzc0xpc3QuYWRkKGBjJHtzcU5vfSR7cm93Tm99YCk7XG4gICAgICAgICAgICAvLyBzcS5jbGFzc0xpc3QuYWRkKFtzcU5vXSk7XG4gICAgICAgICAgICAvLyBzcS5jbGFzc0xpc3QuYWRkKFwiW3Jvd05vLCBzcU5vXVwiKTtcbiAgICAgICAgICAgIHNxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIodGhpcy5jbGFzc0xpc3RbMV1bMV0pO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKHRoaXMuY2xhc3NMaXN0WzFdWzJdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhbXG4gICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgIC8vIE51bWJlcih0aGlzLmNsYXNzTGlzdFsxXVsyXSksXG4gICAgICAgICAgICAgICAgICAgIC8vIE51bWJlcih0aGlzLmNsYXNzTGlzdFsxXVsxXSksXG4gICAgICAgICAgICAgICAgXSk7IC8vIHggLCB5XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImhvdHBpbmtcIjtcblxuICAgICAgICAgICAgICAgIHNoaXBYID0geDtcbiAgICAgICAgICAgICAgICBzaGlwWSA9IHk7XG4gICAgICAgICAgICAgICAgZGlzcEN1clNlbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzcU5vKys7XG4gICAgICAgICAgICByb3cuYXBwZW5kKHNxKTtcblxuICAgICAgICAgICAgLy9vbmNsaWNrIHJldHVybiB4IGFuZCB5XG4gICAgICAgIH1cbiAgICAgICAgcm93Tm8rKztcblxuICAgICAgICBwbEJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH0pO1xuXG4gICAgLy8gcGxib2FyZFxuICAgIC8vIGlucHV0IGxlbmd0aFxuXG4gICAgbGV0IHNoaXBMZW4gPSAwO1xuICAgIGxldCBzaGlwUG9zID0gXCJub3Qgc2VsZWN0ZWRcIjtcbiAgICBsZXQgc2hpcFggPSAxMDtcbiAgICBsZXQgc2hpcFkgPSAxMDtcblxuICAgIGxldCBzaGlwSW5XYWl0aW5nID0gW3NoaXBMZW4sIHNoaXBQb3MsIHNoaXBYLCBzaGlwWV07XG5cbiAgICBsZXQgc2VsZWN0U2hpcE9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgbGV0IHNlbGVjdGlvbl9sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxldCBkaXNwbGF5Q3VycmVudFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkaXNwbGF5Q3VycmVudFNlbGVjdGlvbi5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwicGxhY2Vob2xkZXJcIixcbiAgICAgICAgXCJTZWxlY3QgTEVOR1RILCBPUklFTlRBVElPTiBhbmQgTE9DQVRJT04gb2YgdGhlIHNoaXBcIlxuICAgICk7XG5cbiAgICBsZXQgc2hpcF9sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxldCBzaGlwMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBsZXQgc2hpcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgbGV0IHNoaXAzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGxldCBzaGlwNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBsZXQgc2hpcDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICBsZXQgcG9zX2xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbGV0IHBvc0hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBsZXQgcG9zVmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG4gICAgbGV0IGNvbmZpcm1fbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsZXQgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBzZWxlY3Rpb25fbGFiZWwudGV4dENvbnRlbnQgPSBcIkN1cnJlbnQgc2VsZWN0aW9uOlwiO1xuICAgIHNoaXBfbGFiZWwudGV4dENvbnRlbnQgPSBcIkxlbmd0aDpcIjtcbiAgICBwb3NfbGFiZWwudGV4dENvbnRlbnQgPSBcIk9yaWVudGF0aW9uOlwiO1xuICAgIGNvbmZpcm1fbGFiZWwudGV4dENvbnRlbnQgPSBcIlBsYWNlIHNoaXA6XCI7XG4gICAgY29uZmlybUJ0bi50ZXh0Q29udGVudCA9IFwiQ09ORklSTSBTRUxFQ1RJT05cIjtcbiAgICBjb25maXJtQnRuLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIHNoaXAxLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgc2hpcDIuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBzaGlwMy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIHNoaXA0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgc2hpcDUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBzZWxlY3RTaGlwT3B0aW9ucy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1vcHRpb25zXCIpO1xuICAgIHNoaXAxLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBzMVwiKTtcbiAgICBzaGlwMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgczJcIik7XG4gICAgc2hpcDMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHMzXCIpO1xuICAgIHNoaXA0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBzNFwiKTtcbiAgICBzaGlwNS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgczVcIik7XG4gICAgcG9zSG9yLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgcG9zVmVyLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG5cbiAgICAvLyBzaGlwMS5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcmFtXCIpO1xuICAgIC8vIHNoaXAyLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFyYW1cIik7XG4gICAgLy8gc2hpcDMuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJhbVwiKTtcbiAgICAvLyBzaGlwNC5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcmFtXCIpO1xuICAgIC8vIHNoaXA1LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFyYW1cIik7XG4gICAgLy8gcG9zSG9yLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFyYW1cIik7XG4gICAgLy8gcG9zVmVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFyYW1cIik7XG4gICAgLy8gY29uc3QgYWxsU2hpcFBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dC5zaGlwUGFyYW1cIik7XG5cbiAgICAvLyBkaXNwbGF5Q3VycmVudFNlbGVjdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHtzaGlwSW5XYWl0aW5nfWApO1xuICAgIC8vIGRpc3BsYXlDdXJyZW50U2VsZWN0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBkaXNwbGF5Q3VycmVudFNlbGVjdGlvbi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG5cbiAgICBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIjJcIik7XG4gICAgc2hpcDIuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCIyXCIpO1xuICAgIHNoaXAzLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiM1wiKTtcbiAgICBzaGlwNC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIjRcIik7XG4gICAgc2hpcDUuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCI1XCIpO1xuICAgIHBvc0hvci5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcImhvcml6b250YWxcIik7XG4gICAgcG9zVmVyLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwidmVydGljYWxcIik7XG5cbiAgICBwbEJvYXJkLmFwcGVuZChzZWxlY3RTaGlwT3B0aW9ucyk7XG4gICAgc2VsZWN0U2hpcE9wdGlvbnMuYXBwZW5kKHNlbGVjdGlvbl9sYWJlbCwgZGlzcGxheUN1cnJlbnRTZWxlY3Rpb24pO1xuICAgIHNlbGVjdFNoaXBPcHRpb25zLmFwcGVuZChzaGlwX2xhYmVsLCBzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCwgc2hpcDUpO1xuICAgIC8vIHBsQm9hcmQuYXBwZW5kKHNoaXAyKTtcbiAgICAvLyBwbEJvYXJkLmFwcGVuZChzaGlwMyk7XG4gICAgLy8gcGxCb2FyZC5hcHBlbmQoc2hpcDQpO1xuICAgIC8vIHBsQm9hcmQuYXBwZW5kKHNoaXA1KTtcbiAgICBzZWxlY3RTaGlwT3B0aW9ucy5hcHBlbmQocG9zX2xhYmVsLCBwb3NIb3IsIHBvc1Zlcik7XG4gICAgc2VsZWN0U2hpcE9wdGlvbnMuYXBwZW5kKGNvbmZpcm1fbGFiZWwsIGNvbmZpcm1CdG4pO1xuXG4gICAgZnVuY3Rpb24gcmV0dXJuVGhpc1ZhbHVlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnZhbHVlKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBzaGlwTGVuID0gc2VsZWN0ZWRWYWx1ZTtcbiAgICAgICAgZGlzcEN1clNlbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJldHVyblRoaXNQb3NpdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy52YWx1ZSk7XG4gICAgICAgIGxldCBzZWxlY3RlZFBvcyA9IHRoaXMudmFsdWU7XG4gICAgICAgIHNoaXBQb3MgPSBzZWxlY3RlZFBvcztcbiAgICAgICAgZGlzcEN1clNlbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZUNvbmZpcm1CdXR0b24oKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHNoaXBMZW4gPiAwICYmXG4gICAgICAgICAgICAoc2hpcFBvcyA9PT0gXCJob3Jpem9udGFsXCIgfHwgc2hpcFBvcyA9PT0gXCJ2ZXJ0aWNhbFwiKSAmJlxuICAgICAgICAgICAgc2hpcFggPj0gMCAmJlxuICAgICAgICAgICAgc2hpcFggPD0gOSAmJlxuICAgICAgICAgICAgc2hpcFkgPj0gMCAmJlxuICAgICAgICAgICAgc2hpcFkgPD0gOVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29uZmlybSBzaG91bGQgd29yayBub3dcIik7XG4gICAgICAgICAgICBjb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtU2hpcFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IHNoaXBUb0FkZCA9IGdhbWUucGxheWVyLmNyZWF0ZVNoaXAoXG4gICAgICAgICAgICBOdW1iZXIoc2hpcEluV2FpdGluZ1swXSksXG4gICAgICAgICAgICBzaGlwSW5XYWl0aW5nWzFdLFxuICAgICAgICAgICAgc2hpcEluV2FpdGluZ1syXSxcbiAgICAgICAgICAgIHNoaXBJbldhaXRpbmdbM11cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBsZXQgc2hpcFRvQWRkMSA9IGdhbWUucGxheWVyLmNyZWF0ZVNoaXAoMiwgXCJob3Jpem9udGFsXCIsIDEsIDApOyAvLyBURVNUIE9OTFkgKioqKioqKioqKioqKioqKlxuICAgICAgICAvLyBsZXQgc2hpcFRvQWRkMiA9IGdhbWUucGxheWVyLmNyZWF0ZVNoaXAoMywgXCJob3Jpem9udGFsXCIsIDEsIDEpOyAvLyBURVNUIE9OTFlcbiAgICAgICAgLy8gbGV0IHNoaXBUb0FkZDMgPSBnYW1lLnBsYXllci5jcmVhdGVTaGlwKDQsIFwiaG9yaXpvbnRhbFwiLCAxLCAyKTsgLy8gVEVTVCBPTkxZXG4gICAgICAgIC8vIGxldCBzaGlwVG9BZGQ0ID0gZ2FtZS5wbGF5ZXIuY3JlYXRlU2hpcCg1LCBcImhvcml6b250YWxcIiwgMSwgMyk7IC8vIFRFU1QgT05MWSAqKioqKioqKioqKioqKioqXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAvLyAgICAgZ2FtZS5wbGF5ZXIuY3JlYXRlU2hpcChcbiAgICAgICAgLy8gICAgICAgICBOdW1iZXIoc2hpcEluV2FpdGluZ1swXSksXG4gICAgICAgIC8vICAgICAgICAgc2hpcEluV2FpdGluZ1sxXSxcbiAgICAgICAgLy8gICAgICAgICBzaGlwSW5XYWl0aW5nWzJdLFxuICAgICAgICAvLyAgICAgICAgIHNoaXBJbldhaXRpbmdbM11cbiAgICAgICAgLy8gICAgIClcbiAgICAgICAgLy8gKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcFRvQWRkKTtcbiAgICAgICAgY29uc29sZS5sb2coZ2FtZS5wbGF5ZXIucGxheWVyR2FtZWJvYXJkKTtcbiAgICAgICAgY29uc29sZS5sb2coZ2FtZS5wbGF5ZXIucGxheWVyR2FtZWJvYXJkLmFsbFNoaXBDb29yZHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhnYW1lLnBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYm9hcmRBcnIpO1xuXG4gICAgICAgIGlmIChzaGlwVG9BZGQgPT09IFwic2hpcCBwbGFjZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIHlcbiAgICAgICAgICAgICAgICAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAvLyB4XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbEdiLmJvYXJkQXJyW2ldW2pdID09PSBcInNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHNoaXBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzQ29vcmRpbmF0ZSA9IHBsR2IuYm9hcmRBcnJbaV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VycmVudFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJjXCIgKyBgJHtqfWAgKyBgJHtpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50U3F1YXJlLmlubmVySFRNTCA9IFwiZGl2XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VyclNxID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNcIiArIGAke2p9YCArIGAke2l9YFxuICAgICAgICAgICAgICAgICAgICAgICAgKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJTcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyU3Euc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpc0Nvb3JkaW5hdGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwSW5XYWl0aW5nWzBdKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGVuZ3RoU2VsZWN0ZWQgPSBzaGlwSW5XYWl0aW5nWzBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudExlbmd0aFNlbGVjdGVkKTtcblxuICAgICAgICAgICAgbGV0IHRoaXNTaGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgICBcInNcIiArIGAke2N1cnJlbnRMZW5ndGhTZWxlY3RlZH1gXG4gICAgICAgICAgICApWzBdO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZW5ndGhTZWxlY3RlZCA9PSAyICYmXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInMyXCIpWzBdLmRpc2FibGVkID09PSB0cnVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbmRpdGlvbiBtZXRcIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInMxXCIpWzBdLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXNTaGlwKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsR2IuYWxsU2hpcE9iai5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpc1NoaXAuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2hpcExlbiA9IDA7XG4gICAgICAgICAgICBzaGlwWCA9IDEwO1xuICAgICAgICAgICAgc2hpcFkgPSAxMDtcbiAgICAgICAgICAgIGNvbmZpcm1CdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGlzcEN1clNlbCgpO1xuXG4gICAgICAgICAgICBpZiAocGxHYi5hbGxTaGlwT2JqLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVsZXRlIHRoZSBkaXZcIik7XG4gICAgICAgICAgICAgICAgc2VsZWN0U2hpcE9wdGlvbnMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbml0aWFsaXplU2hpcHMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wR2IpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBHYi5hbGxTaGlwT2JqLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXAgY3JlYXRlZCA1IHNoaXBzXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBHYi5ib2FyZEFycltpXVtqXSA9PT0gXCJzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIGlzIHNoaXBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXNDb29yZGluYXRlID0gcGxHYi5ib2FyZEFycltpXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJjXCIgKyBgJHtqfWAgKyBgJHtpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudFNxdWFyZS5pbm5lckhUTUwgPSBcImRpdlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VyclNxID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiICsgYCR7an1gICsgYCR7aX1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJTcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGN1cnJTcS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIm9yYW5nZVwiOyAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXNDb29yZGluYXRlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5hdHRhY2tTcXVhcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZS5wbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICAgICAgLy8gREVMRVRFIG9yIERJU0FCTEUgTEVOR1RIIE9QVElPTlxuICAgICAgICAgICAgLy8gd2hlbiA1IHNoaXBzIGNyZWF0ZWQsIGRlbGV0ZSB0aGUgb3B0aW9ucywgY29tcHV0ZXIgY3JlYXRlcyBzaGlwcywgc3RhcnQgZ2FtZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coc2hpcEluV2FpdGluZ1swXSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNoaXBJbldhaXRpbmdbMV0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzaGlwSW5XYWl0aW5nWzJdKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2hpcEluV2FpdGluZ1szXSk7XG4gICAgfVxuXG4gICAgc2hpcDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHVyblRoaXNWYWx1ZSk7XG4gICAgc2hpcDIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHVyblRoaXNWYWx1ZSk7XG4gICAgc2hpcDMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHVyblRoaXNWYWx1ZSk7XG4gICAgc2hpcDQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHVyblRoaXNWYWx1ZSk7XG4gICAgc2hpcDUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHVyblRoaXNWYWx1ZSk7XG5cbiAgICBwb3NIb3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHVyblRoaXNQb3NpdGlvbik7XG4gICAgcG9zVmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXR1cm5UaGlzUG9zaXRpb24pO1xuXG4gICAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29uZmlybVNoaXBTZWxlY3Rpb24pO1xuXG4gICAgZnVuY3Rpb24gZGlzcEN1clNlbCgpIHtcbiAgICAgICAgLy8gc2hpcExlbiA9IHNoaXAxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXR1cm5UaGlzVmFsdWUpO1xuICAgICAgICBzaGlwSW5XYWl0aW5nID0gW3NoaXBMZW4sIHNoaXBQb3MsIHNoaXBYLCBzaGlwWV07XG4gICAgICAgIGRpc3BsYXlDdXJyZW50U2VsZWN0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGAke3NoaXBJbldhaXRpbmd9YCk7XG4gICAgICAgIGVuYWJsZUNvbmZpcm1CdXR0b24oKTtcbiAgICB9XG5cbiAgICAvLyBhbGxTaGlwUGFyYW1zLmZvckVhY2goKGJ0bikgPT4ge1xuICAgIC8vICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyAgICAgICAgIHJldHVyblRoaXNWYWx1ZTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cbiAgICAvLyBpbnB1dCBwb3NpdGlvblxuICAgIC8vIGNsaWNrIG9uIHN0YXJ0IGNvb3JkXG4gICAgLy8gc3VibWl0IDUgc2hpcHNcblxuICAgIC8vL1xuICAgIC8vL1xuICAgIC8vL1xuXG4gICAgbGV0IGNvbXBHYiA9IGdhbWUuY29tcHV0ZXIuY29tcHV0ZXJHYW1lYm9hcmQ7XG5cbiAgICBsZXQgY29tcEJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb21wQm9hcmQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb21wQm9hcmRcIik7XG4gICAgR0Jjb250YWluZXIuYXBwZW5kKGNvbXBCb2FyZCk7XG5cbiAgICByb3dObyA9IDA7XG5cbiAgICBjb21wR2IuYm9hcmRBcnIuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgIC8vIGxldCBzcSA9IHJvdztcblxuICAgICAgICByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dzXCIpO1xuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZChgciR7cm93Tm99YCk7XG4gICAgICAgIGxldCBzcU5vID0gMDtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBzcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzcS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNxdWFyZVwiKTtcbiAgICAgICAgICAgIC8vIHNxLmNsYXNzTGlzdC5hZGQoW3Jvd05vLCBzcU5vXSk7XG4gICAgICAgICAgICBzcS5jbGFzc0xpc3QuYWRkKGBjJHtzcU5vfSR7cm93Tm99YCk7XG4gICAgICAgICAgICAvLyBzcS5jbGFzc0xpc3QuYWRkKFtzcU5vXSk7XG4gICAgICAgICAgICAvLyBzcS5jbGFzc0xpc3QuYWRkKFwiW3Jvd05vLCBzcU5vXVwiKTtcbiAgICAgICAgICAgIHNxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIFwiQ0xJQ0sqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLnBsYXllci5wbGF5ZXJUdXJuKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLmNvbXB1dGVyLmNvbXB1dGVyVHVybik7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIodGhpcy5jbGFzc0xpc3RbMV1bMV0pO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKHRoaXMuY2xhc3NMaXN0WzFdWzJdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhbXG4gICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgIC8vIE51bWJlcih0aGlzLmNsYXNzTGlzdFsxXVsyXSksXG4gICAgICAgICAgICAgICAgICAgIC8vIE51bWJlcih0aGlzLmNsYXNzTGlzdFsxXVsxXSksXG4gICAgICAgICAgICAgICAgXSk7IC8vIHggLCB5XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJveWFsYmx1ZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIGNvbXBHYi5yZWNlaXZlQXR0YWNrKHgsIHkpOyAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLmF0dGFja0hpdENoZWNrKHgsIHkpKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLnBsYXllci5wbGF5ZXJUdXJuKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLmNvbXB1dGVyLmNvbXB1dGVyVHVybik7XG4gICAgICAgICAgICAgICAgLy8gZ2FtZS5hdHRhY2tIaXRDaGVjayh4LCB5KTtcbiAgICAgICAgICAgICAgICAvLyBnYW1lLmF0dGFja0hpdENoZWNrKHksIHgpO1xuICAgICAgICAgICAgICAgIGlmIChnYW1lLmF0dGFja0hpdENoZWNrKHksIHgpID09PSBcInRoaXMgUExBWUVSIGF0dGFjayBoaXRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicHVycGxlXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lLmF0dGFja1NxdWFyZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnYW1lLnR1cm5Td2l0Y2goKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLnBsYXllci5wbGF5ZXJUdXJuKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLmNvbXB1dGVyLmNvbXB1dGVyVHVybik7XG4gICAgICAgICAgICAgICAgZ2FtZS5hdHRhY2tTcXVhcmUoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLnBsYXllci5wbGF5ZXJUdXJuKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLmNvbXB1dGVyLmNvbXB1dGVyVHVybik7XG4gICAgICAgICAgICAgICAgLy8gcGxheWVyIGFsbCBhdHRhY2tzIHJlY2VpdmVkIGNvbG91ciBpblxuXG4gICAgICAgICAgICAgICAgaWYgKHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbEdiIGF0dGFjayByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZC5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB4ID0gTnVtYmVyKHRoaXMuY2xhc3NMaXN0WzFdWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB5ID0gTnVtYmVyKHRoaXMuY2xhc3NMaXN0WzFdWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8geVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB4XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFt6XVswXSA9PT0geCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzFdID09PSB5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdKTsgLy94IHkgQHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzBdKTsgLy94XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFt6XVsxXSk7IC8veVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIGlzIHNoaXBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzQ29vcmRpbmF0ZSA9IHBsR2IuYm9hcmRBcnJbaV1bal07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VycmVudFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJjXCIgKyBgJHtqfWAgKyBgJHtpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50U3F1YXJlLmlubmVySFRNTCA9IFwiZGl2XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VyclNxID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBcImNcIiArIGAke2p9YCArIGAke2l9YFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyU3EgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7cGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWRbel1bMF19YCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3BsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzFdfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIClbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXN0QXR0YWNrUmVjZWl2ZWRJbmRleCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWQubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBjdXJyU3EgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiY1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgYCR7cGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWRbbGFzdEF0dGFja1JlY2VpdmVkSW5kZXhdWzBdfWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBgJHtwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFtsYXN0QXR0YWNrUmVjZWl2ZWRJbmRleF1bMV19YFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJTcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyU3Euc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyb3lhbGJsdWVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJTcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHEgPSAwOyBxIDwgcGxHYi5hbGxTaGlwQ29vcmRzLmxlbmd0aDsgcSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzFdID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxHYi5hbGxTaGlwQ29vcmRzW3FdWzBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzBdID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxHYi5hbGxTaGlwQ29vcmRzW3FdWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJTcS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImRhcmtyZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnYW1lLnR1cm5Td2l0Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsR2IuYWxsU2hpcENvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbEdiLmFsbFNoaXBDb29yZHNbel0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS5wbGF5ZXIucGxheWVyVHVybik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLmNvbXB1dGVyLmNvbXB1dGVyVHVybik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBnYW1lLmF0dGFja0hpdENoZWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFt6XVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWRbel1bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGxhc3RBdHRhY2tSZWNlaXZlZEluZGV4ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZC5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdEF0dGFja1JlY2VpdmVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFtsYXN0QXR0YWNrUmVjZWl2ZWRJbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RBdHRhY2tSZWNlaXZlZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RBdHRhY2tSZWNlaXZlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGsgPSAwOyBrIDwgcGxHYi5hbGxTaGlwQ29vcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG0gPSBwbEdiLmFsbFNoaXBDb29yZHNba11bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IG4gPSBwbEdiLmFsbFNoaXBDb29yZHNba11bMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsYXN0QXR0YWNrUmVjZWl2ZWRbMV0gPT09IG0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGFzdEF0dGFja1JlY2VpdmVkWzBdID09PSBuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwieWVzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJub29vb29vb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2cobSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGxhc3RBdHRhY2tSZWNlaXZlZFsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGxhc3RBdHRhY2tSZWNlaXZlZFswXSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW2xhc3RBdHRhY2tSZWNlaXZlZEluZGV4XVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW2xhc3RBdHRhY2tSZWNlaXZlZEluZGV4XVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW2xhc3RBdHRhY2tSZWNlaXZlZEluZGV4XVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIHogPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZ2FtZS5hdHRhY2tIaXRDaGVjayhcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcGxHYi5hbGxTaGlwQ29vcmRzW1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWQubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBdWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwbEdiLmFsbFNoaXBDb29yZHNbXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZC5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIF1bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICApID09PSBcInRoaXMgYXR0YWNrIGhpdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGN1cnJTcS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInBpbmtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIChcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgayA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgayA8IHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBrKytcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICgpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnYW1lLnR1cm5Td2l0Y2goKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGdhbWUuYXR0YWNrSGl0Q2hlY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBsR2IuYWxsQXR0YWNrc1JlY2VpdmVkW3pdWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFt6XVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBwbEdiLmFsbFNoaXBDb29yZHNbel1bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIHBsR2IuYWxsU2hpcENvb3Jkc1t6XVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICkgPT09IFwiYXR0YWNrIG1pc3NlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicHVycGxlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY3VyclNxLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicm95YWxibHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coY3VyclNxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTUlTU1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyByZXR1cm4gZ2FtZS5hdHRhY2tTcXVhcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC8vIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC8vICAgICBnYW1lLmF0dGFja0hpdENoZWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLy8gICAgICAgICBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZFt6XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC8vICAgICAgICAgcGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWRbel1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC8vICAgICAgICAgLy8gcGxHYi5hbGxTaGlwQ29vcmRzW3pdWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLy8gICAgICAgICAvLyBwbEdiLmFsbFNoaXBDb29yZHNbel1bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC8vICAgICApID09PSBcInRoaXMgYXR0YWNrIGhpdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAvLyApXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjdXJyU3Euc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJkYXJrUmVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coY3VyclNxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiSElUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzQ29vcmRpbmF0ZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50U3F1YXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8geVxuICAgICAgICAgICAgICAgIC8vICAgICAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgICAgICAgICAgICAgIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIHhcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHogPSAwO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHogPCBwbEdiLmFsbEF0dGFja3NSZWNlaXZlZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgeisrXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBsZXQgeCA9IE51bWJlcih0aGlzLmNsYXNzTGlzdFsxXVsxXSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIodGhpcy5jbGFzc0xpc3RbMV1bMl0pO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgcGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWRbel1bMF0gPT09IHggJiZcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgcGxHYi5hbGxBdHRhY2tzUmVjZWl2ZWRbel1bMV0gPT09IHlcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIGlzIHNoaXBcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXNDb29yZGluYXRlID0gcGxHYi5ib2FyZEFycltpXVtqXTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgXCJjXCIgKyBgJHtqfWAgKyBgJHtpfWBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gY3VycmVudFNxdWFyZS5pbm5lckhUTUwgPSBcImRpdlwiO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY3VyclNxID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwiY1wiICsgYCR7an1gICsgYCR7aX1gXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIClbMF07XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJTcSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGN1cnJTcS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyB0aGlzQ29vcmRpbmF0ZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRTcXVhcmUpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzcU5vKys7XG4gICAgICAgICAgICByb3cuYXBwZW5kKHNxKTtcblxuICAgICAgICAgICAgLy9vbmNsaWNrIHJldHVybiB4IGFuZCB5XG4gICAgICAgIH1cbiAgICAgICAgcm93Tm8rKztcblxuICAgICAgICBjb21wQm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfSk7XG5cbiAgICBpbml0Qm9hcmRzLmRpc2FibGVkID0gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVHYW1lYm9hcmRzO1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZWJvYXJkcztcbiIsImNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoXCIuL2dhbWVib2FyZFwiKTtcbmNvbnN0IFNoaXAgPSByZXF1aXJlKFwiLi9zaGlwXCIpO1xuXG5jb25zdCBDb21wdXRlciA9ICgpID0+IHtcbiAgICBsZXQgY29tcHV0ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICAgIGxldCBjb21wdXRlclR1cm4gPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKCkge1xuICAgICAgICAvLyBsZXQgbmV3U2hpcCA9IFNoaXAobGVuLCBwb3MsIHgsIHkpO1xuICAgICAgICBsZXQgbmV3U2hpcCA9IHJhbmRvbVNoaXAoKTtcbiAgICAgICAgLy8gcmV0dXJuIGNoZWNrU2hpcFZhbGlkaXR5KG5ld1NoaXApO1xuXG4gICAgICAgIHdoaWxlIChjb21wdXRlckdhbWVib2FyZC5hbGxTaGlwT2JqLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgIGlmIChjaGVja1NoaXBWYWxpZGl0eShuZXdTaGlwKSA9PT0gXCJTVUNDRVNTXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdTaGlwLnNoaXBMZW5ndGgpO1xuICAgICAgICAgICAgICAgIGxldCB0aGlzTGVuZ3RoID0gbmV3U2hpcC5zaGlwTGVuZ3RoO1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGxlbmd0aE9wdGlvbnMuaW5kZXhPZih0aGlzTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBsZW5ndGhPcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKG5ld1NoaXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVTaGlwcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTaGlwVmFsaWRpdHkoc2hpcE9iamVjdCA9IHt9KSB7XG4gICAgICAgIGxldCBzTGVuZ3RoID0gc2hpcE9iamVjdFtcInNoaXBMZW5ndGhcIl07XG4gICAgICAgIGxldCBzUG9zaXRpb24gPSBzaGlwT2JqZWN0W1wicG9zaXRpb25cIl07XG4gICAgICAgIGxldCBzWGNvb3JkID0gc2hpcE9iamVjdFtcImNvb3Jkc1wiXVswXTtcbiAgICAgICAgbGV0IHNZY29vcmQgPSBzaGlwT2JqZWN0W1wiY29vcmRzXCJdWzFdO1xuICAgICAgICBsZXQgc0Nvb3JkcyA9IHNoaXBPYmplY3RbXCJzaGlwQ29vcmRzXCJdO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChzUG9zaXRpb24gPT09IFwiaG9yaXpvbnRhbFwiICYmIHNMZW5ndGggKyBzWGNvb3JkIDw9IDEwKSB8fFxuICAgICAgICAgICAgKHNQb3NpdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiICYmIHNMZW5ndGggKyBzWWNvb3JkIDw9IDEwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc0Nvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB4QyA9IHNDb29yZHNbaV1bMF07XG4gICAgICAgICAgICAgICAgbGV0IHlDID0gc0Nvb3Jkc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuYm9hcmRBcnJbeUNdW3hDXSA9PT0gXCJzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRVJST1IgLSBjb2xsaXNpb25cIjsgLy8gaWYgYW55IG9mIHRoZSBzcXVhcmVzIGFyZSBhIHNoaXAgLSAncycgLy8gSU5WQUxJRCBwaWNrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiU1VDQ0VTU1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiRVJST1IgLSBPT0JcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBsZW5ndGhPcHRpb25zID0gWzIsIDIsIDMsIDQsIDVdO1xuICAgIGZ1bmN0aW9uIHJhbmRvbVNoaXAoKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbk9wdGlvbnMgPSBbXCJob3Jpem9udGFsXCIsIFwidmVydGljYWxcIl07XG4gICAgICAgIGxldCBjb29yZE9wdGlvbnMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOF07XG5cbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tUGljaygpIHtcbiAgICAgICAgICAgIGxldCByYW5kb21MZW5ndGggPVxuICAgICAgICAgICAgICAgIGxlbmd0aE9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuZ3RoT3B0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgbGV0IHJhbmRvbVBvc2l0b24gPVxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3B0aW9uc1tcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zaXRpb25PcHRpb25zLmxlbmd0aClcbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBsZXQgcmFuZG9tWCA9XG4gICAgICAgICAgICAgICAgY29vcmRPcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvb3JkT3B0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgbGV0IHJhbmRvbVkgPVxuICAgICAgICAgICAgICAgIGNvb3JkT3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb29yZE9wdGlvbnMubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIGxldCBuZXdTaGlwID0gU2hpcChyYW5kb21MZW5ndGgsIHJhbmRvbVBvc2l0b24sIHJhbmRvbVgsIHJhbmRvbVkpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3U2hpcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYW5kb21QaWNrKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWxsU3F1YXJlcygpIHtcbiAgICAgICAgbGV0IGFsbFBvc3NpYmxlQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29vcmQgPSBbeCwgeV07XG4gICAgICAgICAgICAgICAgYWxsUG9zc2libGVDb29yZGluYXRlcy5wdXNoKGNvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxsUG9zc2libGVDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBsZXQgc3F1YXJlc1RvQXR0YWNrID0gYWxsU3F1YXJlcygpO1xuXG4gICAgZnVuY3Rpb24gYXR0YWNrUmFuZG9tU3F1YXJlKCkge1xuICAgICAgICBsZXQgcmFuZG9tU3F1YXJlID1cbiAgICAgICAgICAgIHNxdWFyZXNUb0F0dGFja1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzcXVhcmVzVG9BdHRhY2subGVuZ3RoKV07XG4gICAgICAgIC8vIGxldCB4ID0gcmFuZG9tU3F1YXJlWzBdO1xuICAgICAgICAvLyBsZXQgeSA9IHJhbmRvbVNxdWFyZVsxXTtcbiAgICAgICAgbGV0IGluZGV4ID0gc3F1YXJlc1RvQXR0YWNrLmluZGV4T2YocmFuZG9tU3F1YXJlKTtcbiAgICAgICAgc3F1YXJlc1RvQXR0YWNrLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgcmV0dXJuIHJhbmRvbVNxdWFyZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21wdXRlckdhbWVib2FyZCxcbiAgICAgICAgY29tcHV0ZXJUdXJuLFxuICAgICAgICBjcmVhdGVTaGlwcyxcbiAgICAgICAgc3F1YXJlc1RvQXR0YWNrLFxuICAgICAgICBhdHRhY2tSYW5kb21TcXVhcmUsXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcHV0ZXI7XG4iLCJjb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKTtcblxuY29uc3QgR2FtZWJvYXJkID0gKHNoaXBPYmogPSB7fSkgPT4ge1xuICAgIGxldCBib2FyZEFyciA9IFtdO1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IDEwO1xuXG4gICAgY29uc3Qgc2V0Qm9hcmRBcnIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhcnIgPSBuZXcgQXJyYXkoYm9hcmRTaXplKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZFNpemU7IGkrKykge1xuICAgICAgICAgICAgYXJyW2ldID0gbmV3IEFycmF5KGJvYXJkU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9O1xuXG4gICAgYm9hcmRBcnIgPSBzZXRCb2FyZEFycigpO1xuXG4gICAgbGV0IGN1cnJlbnRTaGlwID0gc2hpcE9iajtcblxuICAgIGxldCBhbGxTaGlwQ29vcmRzID0gW107XG4gICAgbGV0IGFsbFNoaXBPYmogPSBbXTtcbiAgICBsZXQgYWxsQXR0YWNrc1JlY2VpdmVkID0gW107XG5cbiAgICAvLyBsZXQgc2hpcEV4YW0gPSBwbGFjZVNoaXAoY3VycmVudFNoaXApO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBPYmplY3QgPSB7fSkgPT4ge1xuICAgICAgICAvLyBsZXQgcGxhY2VTaGlwID0gKGxlbiwgcG9zLCB4LCB5KSA9PiB7XG4gICAgICAgIC8vIGxldCBzaGlwRXggPSBTaGlwKGxlbiwgcG9zLCB4LCB5KTtcblxuICAgICAgICBsZXQgc0xlbmd0aCA9IHNoaXBPYmplY3RbXCJzaGlwTGVuZ3RoXCJdO1xuICAgICAgICBsZXQgc1Bvc2l0aW9uID0gc2hpcE9iamVjdFtcInBvc2l0aW9uXCJdO1xuICAgICAgICBsZXQgc0Nvb3JkcyA9IHNoaXBPYmplY3RbXCJzaGlwQ29vcmRzXCJdO1xuXG4gICAgICAgIGFsbFNoaXBPYmoucHVzaChzaGlwT2JqZWN0KTtcblxuICAgICAgICAvLyBib2FyZEFyclswXVswXSA9IHNDb29yZHNbMF07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzaGlwWGNvb3IgPSBzQ29vcmRzW2ldWzBdO1xuICAgICAgICAgICAgbGV0IHNoaXBZY29vciA9IHNDb29yZHNbaV1bMV07XG4gICAgICAgICAgICBib2FyZEFycltzaGlwWWNvb3JdW3NoaXBYY29vcl0gPSBcInNcIjsgLy8gc0Nvb3Jkc1tpXTtcblxuICAgICAgICAgICAgbGV0IHRoaXNYWSA9IFtzaGlwWWNvb3IsIHNoaXBYY29vcl07XG4gICAgICAgICAgICBhbGxTaGlwQ29vcmRzLnB1c2godGhpc1hZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHNMZW5ndGgsIHNQb3NpdGlvbiwgc0Nvb3JkcywgYm9hcmRBcnIsIHNoaXBPYmplY3QgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgICAgIGxldCB0aGlzWFkgPSBbeCwgeV07XG5cbiAgICAgICAgaWYgKGFsbEF0dGFja3NSZWNlaXZlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFsbEF0dGFja3NSZWNlaXZlZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzcXVhcmUgd2FzIGhpdCBhbHJlYWR5IG9yIG5vdFxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgYWxsQXR0YWNrc1JlY2VpdmVkW2pdWzBdID09PSB4ICYmXG4gICAgICAgICAgICAgICAgICAgIGFsbEF0dGFja3NSZWNlaXZlZFtqXVsxXSA9PT0geVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzcXVhcmUgYXR0YWNrZWQgYWxyZWFkeVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFsbEF0dGFja3NSZWNlaXZlZC5wdXNoKHRoaXNYWSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsU2hpcE9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYWxsU2hpcE9ialtpXS5pc0hpdCh4LCB5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW5rU2hpcFN0YXR1cygpO1xuXG4gICAgICAgIC8vIHJldHVybiBcIm5ldyBhdHRhY2sgYWRkZWQgdG8gYXJyYXlcIjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3Vua1NoaXBTdGF0dXMoKSB7XG4gICAgICAgIGxldCBzdW5rU3RhdHVzID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxTaGlwT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsU2hpcE9ialtpXS5pc1N1bmsgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzdW5rU3RhdHVzICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbFNoaXBPYmoubGVuZ3RoID09PSBzdW5rU3RhdHVzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJnYW1lIG92ZXJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHtzdW5rU3RhdHVzfSBvZiAke2FsbFNoaXBPYmoubGVuZ3RofSBoYXZlIGJlZW4gc3Vua2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYm9hcmRBcnIsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgY3VycmVudFNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGFsbFNoaXBDb29yZHMsXG4gICAgICAgIGFsbFNoaXBPYmosXG4gICAgICAgIGFsbEF0dGFja3NSZWNlaXZlZCxcbiAgICAgICAgc3Vua1NoaXBTdGF0dXMsXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xuIiwiY29uc3QgUGxheWVyID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xuY29uc3QgQ29tcHV0ZXIgPSByZXF1aXJlKFwiLi9jb21wdXRlclwiKTtcblxuY29uc3QgR2FtZUxvb3AgPSAoKSA9PiB7XG4gICAgbGV0IHBsYXllciA9IFBsYXllcigpO1xuICAgIGxldCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplU2hpcHMoKSB7XG4gICAgICAgIGlmIChwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmFsbFNoaXBPYmoubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICAgcmV0dXJuIFwicGxhY2UgbW9yZSBzaGlwc1wiOyAvL21hbnVhbFxuICAgICAgICAgICAgLy8gY3JlYXRlIHNoaXBzIHByb21wdCAvIGNob29zZSBsZW5ndGggZnJvbSBhcnJheS9yZW1vdmUgc2FpZCBsZW5ndGgvIGgvdiAvIHBpY2sgc3F1YXJlIHcgbW91c2UgZm9yIHggeVxuICAgICAgICAgICAgLy8gcmV0dXJuIGluaXRpYWxpemVTaGlwcygpIC8vIHJlY3Vyc2UgdW50aWwgNSBzaGlwcyBjcmVhdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcHV0ZXIuY29tcHV0ZXJHYW1lYm9hcmQuYWxsU2hpcE9iai5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICBjb21wdXRlci5jcmVhdGVTaGlwcygpO1xuICAgICAgICAgICAgcmV0dXJuIFwiY29tcGxldGVkXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwbGF5IHlvdXIgbW92ZVxuICAgIGZ1bmN0aW9uIGF0dGFja1NxdWFyZSgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGxheWVyLnBsYXllckdhbWVib2FyZC5zdW5rU2hpcFN0YXR1cygpID09PSBcImdhbWUgb3ZlclwiIHx8XG4gICAgICAgICAgICBjb21wdXRlci5jb21wdXRlckdhbWVib2FyZC5zdW5rU2hpcFN0YXR1cygpID09PSBcImdhbWUgb3ZlclwiXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZ2FtZSBvdmVyXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxheWVyLnBsYXllclR1cm4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vZ2l2ZSBhdHRhY2svL1xuICAgICAgICAgICAgLy8gcHJvbXB0IHVzZXIgdG8gcGljayBhIHNxdWFyZVxuICAgICAgICAgICAgLy8gb24gY2xpY2sgZ2V0IHggYW5kIHlcbiAgICAgICAgICAgIC8vIGNvbXB1dGVyLmNvbXB1dGVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgICAgIC8vIGlmIGhpdCBhdHRhY2sgYWdhaW4gKGFsbFNoaXBDb29yZHMgbmVlZGVkKVxuICAgICAgICAgICAgLy8gaWYgbWlzcyBzd2l0Y2ggdHVybiBhbmQgcmVjdXJzZSB0aGUgZnVuY3Rpb24gdW50aWwgZ2FtZSBvdmVyIGlzIHJlYWNoZWRcbiAgICAgICAgICAgIC8vIHR1cm5Td2l0Y2goKTtcbiAgICAgICAgICAgIC8vIGF0dGFja1NxdWFyZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFwiY3VycmVudCB0dXJuOiBwbGF5ZXJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wdXRlci5jb21wdXRlclR1cm4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudCB0dXJuOiBjb21wdXRlclwiKTtcbiAgICAgICAgICAgIC8vIGNvbXB1dGVyQXR0YWNrKClcbiAgICAgICAgICAgIGxldCBhdHRhY2sgPSBjb21wdXRlckF0dGFjaygpO1xuICAgICAgICAgICAgLy8gaWYgaGl0LCBhdHRhY2sgYWdhaW4sIGVsc2VcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGF0dGFja0hpdENoZWNrKGF0dGFjaykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrKTtcblxuICAgICAgICAgICAgbGV0IGF0dGFja1ggPSBhdHRhY2tbXCJ4XCJdO1xuICAgICAgICAgICAgbGV0IGF0dGFja1kgPSBhdHRhY2tbXCJ5XCJdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNrWCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tZKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGF0dGFja1tcInhcIl0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYXR0YWNrW1wieVwiXSk7XG4gICAgICAgICAgICBpZiAoYXR0YWNrSGl0Q2hlY2soYXR0YWNrWSwgYXR0YWNrWCkgPT09IFwidGhpcyBhdHRhY2sgaGl0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXR0YWNrU3F1YXJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0dXJuU3dpdGNoKCk7XG4gICAgICAgICAgICBhdHRhY2tTcXVhcmUoKTtcbiAgICAgICAgICAgIC8vIGlmIGhpdCBhdHRhY2sgYWdhaW5cbiAgICAgICAgICAgIC8vIGlmIGF0dGFjayh4LHkpID09PSBhbnkgb2YgY29vcmRzIGluIHRoZSAocGxhL2NvbXAuKSBhbGxTaGlwQ29vcmRzXG4gICAgICAgICAgICAvLyBpZiBtaXNzIHN3aXRjaCB0dXJuIGFuZCByZWN1cnNlIGF0dGFja1NxdWFyZSBhZ2FpblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKGNvbXB1dGVyLmNvbXB1dGVyVHVybiA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyAgICAgLy8gY29tcHV0ZXJBdHRhY2soKVxuICAgICAgICAvLyAgICAgbGV0IGF0dGFjayA9IGNvbXB1dGVyQXR0YWNrKCk7XG4gICAgICAgIC8vICAgICAvLyBpZiBoaXQsIGF0dGFjayBhZ2FpbiwgZWxzZVxuICAgICAgICAvLyAgICAgaWYgKGF0dGFja0hpdENoZWNrKGF0dGFjaykgPT09IFwidGhpcyBhdHRhY2sgaGl0XCIpIHtcbiAgICAgICAgLy8gICAgICAgICAvL29vb29vb29vb29vb29cbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gYXR0YWNrU3F1YXJlKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICB0dXJuU3dpdGNoKCk7XG4gICAgICAgIC8vICAgICBhdHRhY2tTcXVhcmUoKTtcbiAgICAgICAgLy8gICAgIC8vIGlmIGhpdCBhdHRhY2sgYWdhaW5cbiAgICAgICAgLy8gICAgIC8vIGlmIGF0dGFjayh4LHkpID09PSBhbnkgb2YgY29vcmRzIGluIHRoZSAocGxhL2NvbXAuKSBhbGxTaGlwQ29vcmRzXG4gICAgICAgIC8vICAgICAvLyBpZiBtaXNzIHN3aXRjaCB0dXJuIGFuZCByZWN1cnNlIGF0dGFja1NxdWFyZSBhZ2FpblxuICAgICAgICAvLyB9XG4gICAgICAgIC8vaWYgcGxheWVydHVybj09dHJ1ZVxuICAgICAgICAvLyBjb21wdXRlciByZWNlaXZlIGF0dGFja1xuICAgICAgICAvL2Vsc2UgaWYgY29tcHV0ZXIgdHVybiA9PXRydWVcbiAgICAgICAgLy8gcGxheWVyIHJlY2VpdmUgYXR0YWNrXG4gICAgfVxuXG4gICAgLy8gZnVuY3Rpb24gYXR0YWNrSGl0Q2hlY2soY29vcmRzID0ge30pIHtcbiAgICAvLyAgICAgbGV0IHggPSBjb29yZHNbXCJ4XCJdO1xuICAgIC8vICAgICBsZXQgeSA9IGNvb3Jkc1tcInlcIl07XG4gICAgLy8gICAgIGlmIChwbGF5ZXIucGxheWVyVHVybiA9PT0gdHJ1ZSkge1xuICAgIC8vICAgICAgICAgZm9yIChcbiAgICAvLyAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgLy8gICAgICAgICAgICAgaSA8IGNvbXB1dGVyLmNvbXB1dGVyR2FtZWJvYXJkLmFsbFNoaXBDb29yZHMubGVuZ3RoO1xuICAgIC8vICAgICAgICAgICAgIGkrK1xuICAgIC8vICAgICAgICAgKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKFxuICAgIC8vICAgICAgICAgICAgICAgICBjb21wdXRlci5jb21wdXRlckdhbWVib2FyZC5hbGxTaGlwQ29vcmRzW2ldWzBdID09PSB4ICYmXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbXB1dGVyLmNvbXB1dGVyR2FtZWJvYXJkLmFsbFNoaXBDb29yZHNbaV1bMV0gPT09IHlcbiAgICAvLyAgICAgICAgICAgICApIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhpcyBhdHRhY2sgaGl0XCI7XG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhpcyBhdHRhY2sgbWlzc2VkXCI7XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgZm9yIChcbiAgICAvLyAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgLy8gICAgICAgICAgICAgaSA8IHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkcy5sZW5ndGg7XG4gICAgLy8gICAgICAgICAgICAgaSsrXG4gICAgLy8gICAgICAgICApIHtcbiAgICAvLyAgICAgICAgICAgICBpZiAoXG4gICAgLy8gICAgICAgICAgICAgICAgIHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkc1tpXVswXSA9PT0geCAmJlxuICAgIC8vICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmFsbFNoaXBDb29yZHNbaV1bMV0gPT09IHlcbiAgICAvLyAgICAgICAgICAgICApIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhpcyBhdHRhY2sgaGl0XCI7XG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhpcyBhdHRhY2sgbWlzc2VkXCI7XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gYXR0YWNrSGl0Q2hlY2soeHgsIHl5KSB7XG4gICAgICAgIC8vIGxldCB4ID0gY29vcmRzW1wieFwiXTtcbiAgICAgICAgLy8gbGV0IHkgPSBjb29yZHNbXCJ5XCJdO1xuICAgICAgICBsZXQgeCA9IHh4O1xuICAgICAgICBsZXQgeSA9IHl5O1xuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIucGxheWVyVHVybik7XG4gICAgICAgIGlmIChwbGF5ZXIucGxheWVyVHVybiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUVVJOOiBQTEFZRVI/IFlFU1wiKTtcbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgIGkgPCBjb21wdXRlci5jb21wdXRlckdhbWVib2FyZC5hbGxTaGlwQ29vcmRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXIuY29tcHV0ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkc1tpXVswXSA9PT0geCAmJlxuICAgICAgICAgICAgICAgICAgICBjb21wdXRlci5jb21wdXRlckdhbWVib2FyZC5hbGxTaGlwQ29vcmRzW2ldWzFdID09PSB5XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheSBhdHRhY2sgSElUVFRUXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0aGlzIFBMQVlFUiBhdHRhY2sgaGl0XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29tcHV0ZXIuY29tcHV0ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkc1tpXVswXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbXB1dGVyLmNvbXB1dGVyR2FtZWJvYXJkLmFsbFNoaXBDb29yZHNbaV1bMV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbXB1dGVyLmNvbXB1dGVyR2FtZWJvYXJkLmFsbFNoaXBDb29yZHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheSBhdHRhY2sgbWlzc2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gXCJ0aGlzIGF0dGFjayBtaXNzZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgICBpIDwgcGxheWVyLnBsYXllckdhbWVib2FyZC5hbGxTaGlwQ29vcmRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXllckdhbWVib2FyZC5hbGxTaGlwQ29vcmRzW2ldWzBdID09PSB4ICYmXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkc1tpXVsxXSA9PT0geVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXAgYXR0YWNrIGhpdCEhISEhISEhISEhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhpcyBhdHRhY2sgaGl0XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wIGF0dGFjayBtaXNzZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkc1tpXVswXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkc1tpXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcENvb3Jkcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gXCJ0aGlzIGF0dGFjayBtaXNzZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiYXR0YWNrIG1pc3NlZFwiO1xuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIGNvbXB1dGVyQXR0YWNrKCkge1xuICAgIC8vICAgICBsZXQgYXR0YWNrQ29vcmRzID0gY29tcHV0ZXIuYXR0YWNrUmFuZG9tU3F1YXJlKCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGF0dGFja0Nvb3Jkcyk7XG4gICAgLy8gICAgIGxldCB4ID0gYXR0YWNrQ29vcmRzWzBdO1xuICAgIC8vICAgICBsZXQgeSA9IGF0dGFja0Nvb3Jkc1sxXTtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coeCwgeSk7XG4gICAgLy8gICAgIGxldCBhdHRhY2sgPSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgLy8gICAgIHJldHVybiBhdHRhY2s7XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soKSB7XG4gICAgICAgIGxldCBhdHRhY2tDb29yZHMgPSBjb21wdXRlci5hdHRhY2tSYW5kb21TcXVhcmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYXR0YWNrQ29vcmRzKTtcbiAgICAgICAgbGV0IHggPSBhdHRhY2tDb29yZHNbMF07XG4gICAgICAgIGxldCB5ID0gYXR0YWNrQ29vcmRzWzFdO1xuICAgICAgICBjb25zb2xlLmxvZyh4LCB5KTtcbiAgICAgICAgLy8gbGV0IGF0dGFjayA9XG4gICAgICAgIHBsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgLy8gYXR0YWNrSGl0Q2hlY2soeSwgeCk7XG4gICAgICAgIC8vIHJldHVybiBhdHRhY2s7XG4gICAgICAgIHJldHVybiB7IHgsIHkgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0dXJuU3dpdGNoKCkge1xuICAgICAgICBpZiAocGxheWVyLnBsYXllclR1cm4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBsYXllci5wbGF5ZXJUdXJuID0gZmFsc2U7XG4gICAgICAgICAgICBjb21wdXRlci5jb21wdXRlclR1cm4gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIFwibmV4dCB0dXJuOiBjb21wXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXIucGxheWVyVHVybiA9IHRydWU7XG4gICAgICAgICAgICBjb21wdXRlci5jb21wdXRlclR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBcIm5leHQgdHVybjogcGxheWVyXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwbGF5ZXIsXG4gICAgICAgIGNvbXB1dGVyLFxuICAgICAgICBpbml0aWFsaXplU2hpcHMsXG4gICAgICAgIGNvbXB1dGVyQXR0YWNrLFxuICAgICAgICB0dXJuU3dpdGNoLFxuICAgICAgICBhdHRhY2tTcXVhcmUsXG4gICAgICAgIGF0dGFja0hpdENoZWNrLFxuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVMb29wO1xuIiwiLy8gaW1wb3J0IHsgY3ViZSB9IGZyb20gXCIuL21hdGguanNcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IGNvbXB1dGVyIGZyb20gXCIuL2NvbXB1dGVyLmpzXCI7XG5pbXBvcnQgR2FtZUxvb3AgZnJvbSBcIi4vZ2FtZWxvb3AuanNcIjtcbmltcG9ydCBjcmVhdGVHYW1lYm9hcmRzIGZyb20gXCIuL0RPTWludGVyYWN0aW9uLmpzXCI7XG5cbi8vIGZ1bmN0aW9uIGNvbXBvbmVudCgpIHtcbi8vICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcbi8vICAgICBlbGVtZW50LmlubmVySFRNTCA9IFtcbi8vICAgICAgICAgXCJIZWxsbyB3ZWJwYWNrIU1Na1wiLFxuLy8gICAgICAgICAvLyBcIjUgY3ViZWQgaXMgZXF1YWwgdG8gXCIgKyBjdWJlKDUpLFxuLy8gICAgIF0uam9pbihcIlxcblxcblwiKTtcblxuLy8gICAgIHJldHVybiBlbGVtZW50O1xuLy8gfVxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQoKSk7XG5cbi8vIGxldCBzaGlwMSA9IHNoaXAoMywgMCwgZmFsc2UpO1xuLy8gY29uc29sZS5sb2coc2hpcDEpO1xuIiwiLy8gaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiR2FtZWJvYXJkXCI7XG5jb25zdCBHYW1lYm9hcmQgPSByZXF1aXJlKFwiLi9nYW1lYm9hcmRcIik7XG5jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKTtcblxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICAgIC8vY3JlYXRlIGdhbWVib2FyZFxuICAgIC8vY2hvb3NlIHNoaXAgKGxlbmd0aClcbiAgICAvL2Nob29zZSBwb3NpdGlvbmluZyAoSC9WKVxuICAgIC8vcGxhY2Ugc2hpcCAoeCx5KVxuICAgIC8vYXR0YWNrIGEgc3F1YXJlXG4gICAgbGV0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICAgIGxldCBwbGF5ZXJUdXJuID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNoaXAobGVuLCBwb3MsIHgsIHkpIHtcbiAgICAgICAgbGV0IG5ld1NoaXAgPSBTaGlwKGxlbiwgcG9zLCB4LCB5KTtcbiAgICAgICAgLy8gcmV0dXJuIGNoZWNrU2hpcFZhbGlkaXR5KG5ld1NoaXApO1xuICAgICAgICBpZiAoY2hlY2tTaGlwVmFsaWRpdHkobmV3U2hpcCkgPT09IFwiU1VDQ0VTU1wiKSB7XG4gICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKG5ld1NoaXApO1xuICAgICAgICAgICAgcmV0dXJuIFwic2hpcCBwbGFjZWQgc3VjY2Vzc2Z1bGx5XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tTaGlwVmFsaWRpdHkobmV3U2hpcCkgPT09IFwiRVJST1IgLSBPT0JcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3I6IG91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja1NoaXBWYWxpZGl0eShuZXdTaGlwKSA9PT0gXCJFUlJPUiAtIGNvbGxpc2lvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlcnJvcjogc2hpcCBleGlzdHMgYWxyZWFkeVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTaGlwVmFsaWRpdHkoc2hpcE9iamVjdCA9IHt9KSB7XG4gICAgICAgIGxldCBzTGVuZ3RoID0gc2hpcE9iamVjdFtcInNoaXBMZW5ndGhcIl07XG4gICAgICAgIGxldCBzUG9zaXRpb24gPSBzaGlwT2JqZWN0W1wicG9zaXRpb25cIl07XG4gICAgICAgIGxldCBzWGNvb3JkID0gc2hpcE9iamVjdFtcImNvb3Jkc1wiXVswXTtcbiAgICAgICAgbGV0IHNZY29vcmQgPSBzaGlwT2JqZWN0W1wiY29vcmRzXCJdWzFdO1xuICAgICAgICBsZXQgc0Nvb3JkcyA9IHNoaXBPYmplY3RbXCJzaGlwQ29vcmRzXCJdO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChzUG9zaXRpb24gPT09IFwiaG9yaXpvbnRhbFwiICYmIHNMZW5ndGggKyBzWGNvb3JkIDw9IDEwKSB8fFxuICAgICAgICAgICAgKHNQb3NpdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiICYmIHNMZW5ndGggKyBzWWNvb3JkIDw9IDEwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc0Nvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB4QyA9IHNDb29yZHNbaV1bMF07XG4gICAgICAgICAgICAgICAgbGV0IHlDID0gc0Nvb3Jkc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmJvYXJkQXJyW3lDXVt4Q10gPT09IFwic1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVSUk9SIC0gY29sbGlzaW9uXCI7IC8vIGlmIGFueSBvZiB0aGUgc3F1YXJlcyBhcmUgYSBzaGlwIC0gJ3MnIC8vIElOVkFMSUQgcGlja1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlNVQ0NFU1NcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIkVSUk9SIC0gT09CXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwbGF5ZXJHYW1lYm9hcmQsXG4gICAgICAgIHBsYXllclR1cm4sXG4gICAgICAgIGNyZWF0ZVNoaXAsXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyO1xuIiwiLy8gc2hpcHMgZmFjdG9yeSBmdW5jdGlvblxuXG5jb25zdCBTaGlwID0gKFxuICAgIGxlbixcbiAgICBwb3MgPSBcImhvcml6b250YWxcIixcbiAgICBzdGFydFggPSAwLFxuICAgIHN0YXJ0WSA9IDBcbiAgICAvLyBoaXRzVGFrZW4gPSAwLFxuICAgIC8vIHN1bmsgPSBmYWxzZVxuKSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbjtcbiAgICBsZXQgcG9zaXRpb24gPSBwb3M7XG4gICAgbGV0IHhDb29yZCA9IHN0YXJ0WDtcbiAgICBsZXQgeUNvb3JkID0gc3RhcnRZO1xuICAgIGxldCBjb29yZHMgPSBbeENvb3JkLCB5Q29vcmRdO1xuICAgIGxldCBoaXRzID0gMDtcbiAgICBsZXQgaXNTdW5rID0gZmFsc2U7XG4gICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcblxuICAgIGNvbnN0IGdldFNoaXBDb29yZHMgPSAobGVuLCBwb3MsIHN0YXJ0WCwgc3RhcnRZKSA9PiB7XG4gICAgICAgIC8vIHNoaXBDb29yZHMucHVzaChjb29yZHMpO1xuICAgICAgICBpZiAocG9zID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgbGV0IHNxdWFyZVggPSBzdGFydFg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNDb29yZHMgPSBbc3F1YXJlWCwgc3RhcnRZXTtcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goc0Nvb3Jkcyk7XG4gICAgICAgICAgICAgICAgc3F1YXJlWCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNxdWFyZVkgPSBzdGFydFk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNDb29yZHMgPSBbc3RhcnRYLCBzcXVhcmVZXTtcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goc0Nvb3Jkcyk7XG4gICAgICAgICAgICAgICAgc3F1YXJlWSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwQ29vcmRzO1xuICAgIH07XG4gICAgZ2V0U2hpcENvb3JkcyhsZW4sIHBvcywgc3RhcnRYLCBzdGFydFkpO1xuXG4gICAgZnVuY3Rpb24gaXNIaXQoeCwgeSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2hpcENvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNoaXBDb29yZHNbaV1bMF0gPT09IHggJiYgc2hpcENvb3Jkc1tpXVsxXSA9PT0geSkge1xuICAgICAgICAgICAgICAgIC8vIGhpdHMrKztcbiAgICAgICAgICAgICAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3Vua0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAvLyBpc1N1bmsgPSBpc1N1bmtGdW5jKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwieWVzXCI7IC8vYHllcyBoaXRzOiR7aGl0c31gOyAvLyBISVRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgbm8gc2hpcCBhdCBbJHt4fSwgJHt5fV1gOyAvLyBNSVNTXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTdW5rRnVuYygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcExlbmd0aCA9PT0gdGhpcy5oaXRzKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3VuayA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNoaXBMZW5ndGgsXG4gICAgICAgIGhpdHMsXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgICBjb29yZHMsXG4gICAgICAgIGlzU3VuayxcbiAgICAgICAgc2hpcENvb3JkcyxcbiAgICAgICAgaXNIaXQsXG4gICAgICAgIGlzU3Vua0Z1bmMsXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2IHtcXG4gICAgYm9yZGVyOiBzb2xpZCBibGFjayAxcHg7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgICB3aWR0aDogNDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBkYXJrZ3JheTtcXG59XFxuXFxuLnJvd3Mge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi8qIC5zcXVhcmUuYzAwLFxcbi5zcXVhcmUuYzk5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn0gKi9cXG5cXG4uc3F1YXJlOmhvdmVyIHtcXG4gICAgYm9yZGVyOiBzb2xpZCBncmVlbiAycHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjU1LCAyNTUsIDAuNSk7XFxuICAgIC8qIGJvcmRlci1yYWRpdXM6IDUlOyAqL1xcbn1cXG5cXG4jR0Jjb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtBQUN0Qjs7QUFFQTs7O0dBR0c7O0FBRUg7SUFDSSx1QkFBdUI7SUFDdkIsd0NBQXdDO0lBQ3hDLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2IsNkJBQTZCO0FBQ2pDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImRpdiB7XFxuICAgIGJvcmRlcjogc29saWQgYmxhY2sgMXB4O1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgZGFya2dyYXk7XFxufVxcblxcbi5yb3dzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xcbn1cXG5cXG4vKiAuc3F1YXJlLmMwMCxcXG4uc3F1YXJlLmM5OSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59ICovXFxuXFxuLnNxdWFyZTpob3ZlciB7XFxuICAgIGJvcmRlcjogc29saWQgZ3JlZW4gMnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDI1NSwgMjU1LCAwLjUpO1xcbiAgICAvKiBib3JkZXItcmFkaXVzOiA1JTsgKi9cXG59XFxuXFxuI0dCY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlIiwic291cmNlUm9vdCIsIkdhbWVMb29wIiwicmVxdWlyZSIsImdhbWUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJib2R5IiwiYXBwZW5kIiwiaW5pdEJvYXJkcyIsImlubmVyVGV4dCIsIkdCY29udGFpbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZUdhbWVib2FyZHMiLCJwbEdiIiwicGxheWVyIiwicGxheWVyR2FtZWJvYXJkIiwicm93Tm8iLCJwbEJvYXJkIiwiYm9hcmRBcnIiLCJmb3JFYWNoIiwicm93IiwiY2xhc3NMaXN0IiwiYWRkIiwic3FObyIsImoiLCJzcSIsIngiLCJOdW1iZXIiLCJ5IiwiY29uc29sZSIsImxvZyIsInNoaXBYIiwic2hpcFkiLCJkaXNwQ3VyU2VsIiwic2hpcExlbiIsInNoaXBQb3MiLCJzaGlwSW5XYWl0aW5nIiwic2VsZWN0U2hpcE9wdGlvbnMiLCJzZWxlY3Rpb25fbGFiZWwiLCJkaXNwbGF5Q3VycmVudFNlbGVjdGlvbiIsInNoaXBfbGFiZWwiLCJzaGlwMSIsInNoaXAyIiwic2hpcDMiLCJzaGlwNCIsInNoaXA1IiwicG9zX2xhYmVsIiwicG9zSG9yIiwicG9zVmVyIiwiY29uZmlybV9sYWJlbCIsImNvbmZpcm1CdG4iLCJ0ZXh0Q29udGVudCIsImRpc2FibGVkIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwicmV0dXJuVGhpc1ZhbHVlIiwidmFsdWUiLCJzZWxlY3RlZFZhbHVlIiwicmV0dXJuVGhpc1Bvc2l0aW9uIiwic2VsZWN0ZWRQb3MiLCJlbmFibGVDb25maXJtQnV0dG9uIiwiY29uZmlybVNoaXBTZWxlY3Rpb24iLCJzaGlwVG9BZGQiLCJjcmVhdGVTaGlwIiwiYWxsU2hpcENvb3JkcyIsImN1cnJTcSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjdXJyZW50TGVuZ3RoU2VsZWN0ZWQiLCJ0aGlzU2hpcCIsImFsbFNoaXBPYmoiLCJyZW1vdmUiLCJpbml0aWFsaXplU2hpcHMiLCJjb21wR2IiLCJhdHRhY2tTcXVhcmUiLCJjb21wdXRlciIsImNvbXB1dGVyR2FtZWJvYXJkIiwiY29tcEJvYXJkIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja0hpdENoZWNrIiwidHVyblN3aXRjaCIsImFsbEF0dGFja3NSZWNlaXZlZCIsInoiLCJsYXN0QXR0YWNrUmVjZWl2ZWRJbmRleCIsInEiLCJsYXN0QXR0YWNrUmVjZWl2ZWQiLCJHYW1lYm9hcmQiLCJTaGlwIiwiQ29tcHV0ZXIiLCJjb21wdXRlclR1cm4iLCJjcmVhdGVTaGlwcyIsIm5ld1NoaXAiLCJyYW5kb21TaGlwIiwiY2hlY2tTaGlwVmFsaWRpdHkiLCJ0aGlzTGVuZ3RoIiwic2hpcExlbmd0aCIsImluZGV4IiwibGVuZ3RoT3B0aW9ucyIsImluZGV4T2YiLCJzcGxpY2UiLCJwbGFjZVNoaXAiLCJzaGlwT2JqZWN0Iiwic0xlbmd0aCIsInNQb3NpdGlvbiIsInNYY29vcmQiLCJzWWNvb3JkIiwic0Nvb3JkcyIsInhDIiwieUMiLCJwb3NpdGlvbk9wdGlvbnMiLCJjb29yZE9wdGlvbnMiLCJyYW5kb21QaWNrIiwicmFuZG9tTGVuZ3RoIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tUG9zaXRvbiIsInJhbmRvbVgiLCJyYW5kb21ZIiwiYWxsU3F1YXJlcyIsImFsbFBvc3NpYmxlQ29vcmRpbmF0ZXMiLCJjb29yZCIsInNxdWFyZXNUb0F0dGFjayIsImF0dGFja1JhbmRvbVNxdWFyZSIsInJhbmRvbVNxdWFyZSIsInNoaXBPYmoiLCJib2FyZFNpemUiLCJzZXRCb2FyZEFyciIsImFyciIsIkFycmF5IiwiY3VycmVudFNoaXAiLCJzaGlwWGNvb3IiLCJzaGlwWWNvb3IiLCJ0aGlzWFkiLCJpc0hpdCIsInN1bmtTaGlwU3RhdHVzIiwic3Vua1N0YXR1cyIsImlzU3VuayIsIlBsYXllciIsInBsYXllclR1cm4iLCJhdHRhY2siLCJjb21wdXRlckF0dGFjayIsImF0dGFja1giLCJhdHRhY2tZIiwieHgiLCJ5eSIsImF0dGFja0Nvb3JkcyIsInNoaXAiLCJnYW1lYm9hcmQiLCJsZW4iLCJwb3MiLCJzdGFydFgiLCJzdGFydFkiLCJwb3NpdGlvbiIsInhDb29yZCIsInlDb29yZCIsImNvb3JkcyIsImhpdHMiLCJzaGlwQ29vcmRzIiwiZ2V0U2hpcENvb3JkcyIsInNxdWFyZVgiLCJzcXVhcmVZIiwiaXNTdW5rRnVuYyJdLCJzb3VyY2VSb290IjoiIn0=