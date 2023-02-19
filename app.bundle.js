(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["app"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_0__);
// import { cube } from "./math.js";

function component() {
  const element = document.createElement("pre");
  element.innerHTML = ["Hello webpack!"
  // "5 cubed is equal to " + cube(5),
  ].join("\n\n");
  return element;
}
document.body.appendChild(component());
let ship1 = _ship_js__WEBPACK_IMPORTED_MODULE_0___default()(3, 0, false);
console.log(ship1);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ (function(module) {

// ships factory function

const Ship = (length, hits, sunk = false) => {
  // let getLength = length;
  //length
  this.length = length;
  const hitsTaken = () => {
    return this.hits++;
  };
  this.hits = hitsTaken();
  // isSunk()
  const isSunk = hits => {
    if (this.length === this.hits) {
      return true;
    }
  };
  this.sunk = isSunk(hits);
  return {
    length,
    hits,
    isSunk
  };
};
let ship1 = Ship(1, 2, 3);
module.exports = Ship;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUM2QjtBQUU3QixTQUFTQyxTQUFTLEdBQUc7RUFDakIsTUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDN0NGLE9BQU8sQ0FBQ0csU0FBUyxHQUFHLENBQ2hCO0VBQ0E7RUFBQSxDQUNILENBQUNDLElBQUksQ0FBQyxNQUFNLENBQUM7RUFFZCxPQUFPSixPQUFPO0FBQ2xCO0FBQ0FDLFFBQVEsQ0FBQ0ksSUFBSSxDQUFDQyxXQUFXLENBQUNQLFNBQVMsRUFBRSxDQUFDO0FBRXRDLElBQUlRLEtBQUssR0FBR1QsK0NBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUM3QlUsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUssQ0FBQzs7Ozs7Ozs7OztBQ2ZsQjs7QUFFQSxNQUFNVCxJQUFJLEdBQUcsQ0FBQ1ksTUFBTSxFQUFFQyxJQUFJLEVBQUVDLElBQUksR0FBRyxLQUFLLEtBQUs7RUFDekM7RUFDQTtFQUNBLFdBQVcsR0FBR0YsTUFBTTtFQUVwQixNQUFNRyxTQUFTLEdBQUcsTUFBTTtJQUNwQixPQUFPLElBQUksQ0FBQ0YsSUFBSSxFQUFFO0VBQ3RCLENBQUM7RUFDRCxTQUFTLEdBQUdFLFNBQVMsRUFBRTtFQUN2QjtFQUNBLE1BQU1DLE1BQU0sR0FBSUgsSUFBSSxJQUFLO0lBQ3JCLElBQUksSUFBSSxDQUFDRCxNQUFNLEtBQUssSUFBSSxDQUFDQyxJQUFJLEVBQUU7TUFDM0IsT0FBTyxJQUFJO0lBQ2Y7RUFDSixDQUFDO0VBQ0QsU0FBUyxHQUFHRyxNQUFNLENBQUNILElBQUksQ0FBQztFQUV4QixPQUFPO0lBQ0hELE1BQU07SUFDTkMsSUFBSTtJQUNKRztFQUNKLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBSVAsS0FBSyxHQUFHVCxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFekJpQixNQUFNLENBQUNDLE9BQU8sR0FBR2xCLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrX3RlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2tfdGVtcGxhdGUvLi9zcmMvc2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBjdWJlIH0gZnJvbSBcIi4vbWF0aC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIik7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBbXG4gICAgICAgIFwiSGVsbG8gd2VicGFjayFcIixcbiAgICAgICAgLy8gXCI1IGN1YmVkIGlzIGVxdWFsIHRvIFwiICsgY3ViZSg1KSxcbiAgICBdLmpvaW4oXCJcXG5cXG5cIik7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xuXG5sZXQgc2hpcDEgPSBTaGlwKDMsIDAsIGZhbHNlKTtcbmNvbnNvbGUubG9nKHNoaXAxKTtcbiIsIi8vIHNoaXBzIGZhY3RvcnkgZnVuY3Rpb25cblxuY29uc3QgU2hpcCA9IChsZW5ndGgsIGhpdHMsIHN1bmsgPSBmYWxzZSkgPT4ge1xuICAgIC8vIGxldCBnZXRMZW5ndGggPSBsZW5ndGg7XG4gICAgLy9sZW5ndGhcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcblxuICAgIGNvbnN0IGhpdHNUYWtlbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0cysrO1xuICAgIH07XG4gICAgdGhpcy5oaXRzID0gaGl0c1Rha2VuKCk7XG4gICAgLy8gaXNTdW5rKClcbiAgICBjb25zdCBpc1N1bmsgPSAoaGl0cykgPT4ge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IHRoaXMuaGl0cykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuc3VuayA9IGlzU3VuayhoaXRzKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0cyxcbiAgICAgICAgaXNTdW5rLFxuICAgIH07XG59O1xuXG5sZXQgc2hpcDEgPSBTaGlwKDEsIDIsIDMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XG4iXSwibmFtZXMiOlsiU2hpcCIsImNvbXBvbmVudCIsImVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJqb2luIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hpcDEiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwiaGl0cyIsInN1bmsiLCJoaXRzVGFrZW4iLCJpc1N1bmsiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==