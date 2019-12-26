"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./app.less");

var _Tree = _interopRequireDefault(require("./components/Tree.jsx"));

var _feakData = require("./data/feakData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _nodeClick(data) {
  console.log(data);
}

function _selectChange(data) {
  console.log(data);
}

_reactDom["default"].render(_react["default"].createElement(_Tree["default"], {
  config: _feakData.config,
  treeData: _feakData.treeData,
  selectChange: function selectChange(data) {
    return _selectChange(data);
  },
  nodeClick: function nodeClick(data) {
    return _nodeClick(data);
  }
}), document.getElementById('react-tree'));