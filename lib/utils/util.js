"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stack =
/*#__PURE__*/
function () {
  function Stack() {
    _classCallCheck(this, Stack);

    this.top = 0; // 栈的长度

    this.items = [];
  }

  _createClass(Stack, [{
    key: "push",
    value: function push(item) {
      this.top++;
      this.items.push(item); // 入栈
    }
  }, {
    key: "pop",
    value: function pop() {
      --this.top;
      return this.items.pop(); // 出栈
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.items[this.top - 1]; // 查询栈顶元素
    }
  }]);

  return Stack;
}();

exports["default"] = Stack;