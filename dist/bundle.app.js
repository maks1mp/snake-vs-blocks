/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _field = __webpack_require__(1);

var _field2 = _interopRequireDefault(_field);

var _snake = __webpack_require__(2);

var _snake2 = _interopRequireDefault(_snake);

var _blocksRow = __webpack_require__(8);

var _blocksRow2 = _interopRequireDefault(_blocksRow);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootHTML = document.getElementById('app');
var field = new _field2.default(rootHTML, {
    width: '500px',
    height: '500px'
});
var snake = new _snake2.default({
    length: 20
});

field.init(snake);

// setInterval(() => {
field.push(new _blocksRow2.default([1, 2, 3, 4, 5]));
// }, 1000);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
    function Field(rootHTML, settings) {
        _classCallCheck(this, Field);

        this.rootHTML = rootHTML;
        this.initialSettings = settings;
        this.fieldHTML = this.createField();
        this.snakeOnField = null;
    }

    _createClass(Field, [{
        key: 'createField',
        value: function createField() {
            var fieldHTML = document.createElement('div'),
                _fieldSize = this.fieldSize,
                width = _fieldSize.width,
                height = _fieldSize.height;


            fieldHTML.style.width = width + 'px';
            fieldHTML.style.height = height + 'px';
            fieldHTML.style.border = '1px solid red';
            fieldHTML.style.position = 'relative';

            return fieldHTML;
        }
    }, {
        key: 'init',
        value: function init(snake) {
            var _this = this;

            this.snakeOnField = snake;

            this.fieldHTML.appendChild(this.snakeOnField.html);

            this.fieldHTML.addEventListener('mousemove', function (event) {
                var layerX = event.layerX,
                    layerY = event.layerY;


                _this.snakeOnField.move({ x: layerX, y: layerY });
            });

            this.rootHTML.appendChild(this.fieldHTML);
        }
    }, {
        key: 'push',
        value: function push(item) {
            this.fieldHTML.appendChild(item.html);

            this.startSlideDown({
                item: item,
                speed: 50
            });
        }
    }, {
        key: 'startSlideDown',
        value: function startSlideDown(_ref) {
            var _this2 = this;

            var item = _ref.item,
                speed = _ref.speed,
                initialTop = _ref.initialTop,
                _ref$ignoreBlock = _ref.ignoreBlock,
                ignoreBlock = _ref$ignoreBlock === undefined ? false : _ref$ignoreBlock,
                stopCount = _ref.stopCount;
            var style = item.html.style;

            var top = initialTop || 0;

            style.top = top;

            if (!ignoreBlock) {
                var timer = setInterval(function () {
                    if (_this2.snakeOnField.coordinates.y > 300 && _this2.snakeOnField.coordinates.y <= item.coordinates.y) {

                        clearInterval(timer);
                        setTimeout(function () {
                            var blockDeep = item.getItemDeep(_this2.snakeOnField.coordinates.x),
                                snakeLength = _this2.snakeOnField.len;

                            if (snakeLength > blockDeep && blockDeep > 0) {
                                _this2.snakeOnField.cut();
                                item.cut(_this2.snakeOnField.coordinates.x);
                                _this2.startSlideDown({ item: item, speed: speed, initialTop: top, stopCount: true });
                            } else {
                                _this2.startSlideDown({ item: item, speed: speed, initialTop: top, stopCount: false, ignoreBlock: true });
                            }
                        }, 100);
                    }

                    if (!stopCount) {
                        top += 3;
                        style.top = top + 'px';
                    }
                }, speed);
            } else {
                var deleteTimer = setInterval(function () {
                    if (item.coordinates.y <= 500) {
                        top += 3;
                        style.top = top + 'px';
                    } else {
                        item.html.remove();
                        clearInterval(deleteTimer);
                    }
                }, speed);
            }
        }
    }, {
        key: 'fieldSize',
        get: function get() {
            var _initialSettings = this.initialSettings,
                _initialSettings$widt = _initialSettings.width,
                width = _initialSettings$widt === undefined ? 500 : _initialSettings$widt,
                _initialSettings$heig = _initialSettings.height,
                height = _initialSettings$heig === undefined ? 500 : _initialSettings$heig;


            return {
                width: parseFloat(width),
                height: parseFloat(height)
            };
        }
    }]);

    return Field;
}();

exports.default = Field;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = function () {
    function Snake(settings) {
        _classCallCheck(this, Snake);

        var _settings$length = settings.length,
            length = _settings$length === undefined ? 5 : _settings$length;


        this.length = length;
        this.createSnakeTamplate();
        this.setInitialState();
    }

    _createClass(Snake, [{
        key: 'createSnakeTamplate',
        value: function createSnakeTamplate() {
            var _this = this;

            this.template = document.createElement('div');
            this.template.classList.add('snake');

            Array.from({ length: this.length }).forEach(function () {
                var snakePart = document.createElement('div');

                snakePart.classList.add('snake-block');
                _this.template.appendChild(snakePart);
            });
        }
    }, {
        key: 'cut',
        value: function cut() {
            this.template.children[this.template.children.length - 1].remove();
            this.length -= 1;
        }
    }, {
        key: 'setInitialState',
        value: function setInitialState() {
            this.y = 350;
            this.template.style.top = this.y + 'px';
        }
    }, {
        key: 'move',
        value: function move(_ref) {
            var x = _ref.x,
                y = _ref.y;

            this.x = x;

            this.template.style.left = this.x + 'px';
        }
    }, {
        key: 'len',
        get: function get() {
            return this.template.children.length;
        }
    }, {
        key: 'html',
        get: function get() {
            return this.template;
        }
    }, {
        key: 'coordinates',
        get: function get() {
            return { x: this.x, y: this.y };
        }
    }]);

    return Snake;
}();

exports.default = Snake;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlocksRow = function () {
    function BlocksRow(blocksDeep) {
        _classCallCheck(this, BlocksRow);

        this.blocksDeep = blocksDeep;
        this.quantity = blocksDeep.length;

        this.row = this.createHtmlRow();
    }

    _createClass(BlocksRow, [{
        key: 'getItemDeep',
        value: function getItemDeep(x) {
            var currentPart = this.getPartsCoordinates(x);

            return parseFloat(this.row.children[currentPart].innerHTML);
        }
    }, {
        key: 'cut',
        value: function cut(x) {
            var currentPart = this.getPartsCoordinates(x),
                currentValue = parseFloat(this.row.children[currentPart].innerHTML),
                newValue = currentValue - 1;

            this.row.children[currentPart].innerHTML = currentValue - 1;

            if (newValue === 0) {
                this.row.children[currentPart].style.opacity = 0;
            }
        }
    }, {
        key: 'getPartsCoordinates',
        value: function getPartsCoordinates(x) {
            var coordinates = [];

            [].forEach.call(this.row.children, function (itemHTML, index) {
                var itemWidth = parseFloat(getComputedStyle(itemHTML).width);

                coordinates.push(index === 0 ? itemWidth : Math.round(itemWidth * index) + itemWidth);
            });

            return coordinates.findIndex(function (i) {
                return i >= x;
            });
        }
    }, {
        key: 'createHtmlRow',
        value: function createHtmlRow() {
            var htmlRow = document.createElement('div');

            htmlRow.classList.add('blocks-row');
            this.blocksDeep.map(this.createBlock, this).forEach(function (htmlBlock) {
                return htmlRow.appendChild(htmlBlock);
            });

            return htmlRow;
        }
    }, {
        key: 'createBlock',
        value: function createBlock(item) {
            var blockItem = document.createElement('div');

            blockItem.classList.add('blocks-row-item');

            blockItem.innerHTML = item;

            return blockItem;
        }
    }, {
        key: 'html',
        get: function get() {
            return this.row;
        }
    }, {
        key: 'coordinates',
        get: function get() {
            return {
                x: parseFloat(this.html.style.left || 500),
                y: parseFloat(this.html.style.top || 500) + 20
            };
        }
    }]);

    return BlocksRow;
}();

exports.default = BlocksRow;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.app.js.map