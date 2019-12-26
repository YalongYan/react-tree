"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./tree.css");

var _util = _interopRequireDefault(require("../utils/util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Tree =
/*#__PURE__*/
function (_Component) {
  _inherits(Tree, _Component);

  function Tree(props) {
    var _this;

    _classCallCheck(this, Tree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).call(this, props));
    _this.state = {
      treeData: {},
      treeArray: [],
      treeObj: {},
      type: 'tree',
      parentId: 'pid',
      id: 'id',
      value: 'value',
      label: 'label',
      children: 'children',
      checkBox: false
    };
    _this.checkMap = {
      2: 'checked',
      1: 'partChecked',
      0: ''
    };
    return _this;
  }

  _createClass(Tree, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.config.type.toLowerCase() === 'tree') {
        this.setState(_objectSpread({
          treeData: this.props.treeData
        }, this.props.config));
      } else {
        this.setState(_objectSpread({
          treeArray: this.props.treeData
        }, this.props.config));
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.type.toLowerCase() !== 'tree') {
        this.factoryArrayData();
      } else {
        this.factoryTreeData();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "factoryArrayData",
    value: function factoryArrayData() {
      var _this2 = this;

      var data = this.state.treeArray,
          obj = {},
          rootId = null;
      data.map(function (v, i) {
        if (v[_this2.state.parentId] || v[_this2.state.parentId] === 0) {
          if (obj[v[_this2.state.parentId]]) {
            if (obj[v[_this2.state.parentId]].children) {
              obj[v[_this2.state.parentId]].children.push(v);
            } else {
              obj[v[_this2.state.parentId]].children = [v];
            }
          } else {
            obj[v[_this2.state.parentId]] = {
              children: [v]
            };
          }
        } else {
          rootId = v[_this2.state.id];
        }

        if (obj[v[_this2.state.id]]) {
          v.children = obj[v[_this2.state.id]].children;
        }

        obj[v[_this2.state.id]] = v;
      });
      this.setState({
        treeData: obj[rootId],
        treeObj: obj
      });
    }
  }, {
    key: "factoryTreeData",
    value: function factoryTreeData() {
      var data = this.state.treeData;
      var stack = new _util["default"]();
      var obj = {};
      stack.push(data);

      while (stack.top) {
        var node = stack.pop();

        for (var i in node.children) {
          stack.push(node.children[i]);
        }

        obj[node[this.state.id]] = node;
      }

      this.setState({
        treeObj: obj
      });
    }
  }, {
    key: "openNode",
    value: function openNode(e, data) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }

      data.open = !data.open;
      this.forceUpdate();
    }
  }, {
    key: "selectNode",
    value: function selectNode(e, data) {
      var _this3 = this;

      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }

      this.setState({
        selectVal: data[this.state.value]
      }, function () {
        if (_this3.props.nodeClick) {
          _this3.props.nodeClick(data[_this3.state.value]);
        }
      });
    }
  }, {
    key: "selectCheckBox",
    value: function selectCheckBox(e, data) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }

      var check = data.checked;

      if (data.children && data.children.length) {
        var stack = new _util["default"]();
        stack.push(data);

        while (stack.top) {
          var node = stack.pop();

          for (var i in node.children) {
            stack.push(node.children[i]);
          }

          if (check === 2) {
            node.checked = 0;
          } else {
            node.checked = 2;
          }
        }
      } else {
        if (check === 2) {
          data.checked = 0;
        } else {
          data.checked = 2;
        }
      }

      if (data[this.state.parentId] || data[this.state.parentId] === 0) {
        this.updateParentNode(data);
      } else {
        this.forceUpdate();

        if (this.props.selectChange) {
          this.getCheckedItems();
        }
      }
    }
  }, {
    key: "updateParentNode",
    value: function updateParentNode(data) {
      var par = this.state.treeObj[data[this.state.parentId]],
          checkLen = 0,
          partChecked = false;

      for (var i in par.children) {
        if (par.children[i].checked === 2) {
          checkLen++;
        } else if (par.children[i].checked === 1) {
          partChecked = true;
          break;
        }
      }

      if (checkLen === par.children.length) {
        par.checked = 2;
      } else if (partChecked || checkLen < par.children.length && checkLen > 0) {
        par.checked = 1;
      } else {
        par.checked = 0;
      }

      if (this.state.treeObj[par[this.state.parentId]] || this.state.treeObj[par[this.state.parentId]] == 0) {
        this.updateParentNode(par);
      } else {
        this.forceUpdate();

        if (this.props.selectChange) {
          this.getCheckedItems();
        }
      }
    }
  }, {
    key: "getCheckedItems",
    value: function getCheckedItems() {
      var stack = new _util["default"]();
      var checkedArr = [];
      stack.push(this.state.treeData);

      while (stack.top) {
        var node = stack.pop();

        for (var i in node.children) {
          stack.push(node.children[i]);
        }

        if (node.checked === 2) {
          checkedArr.push(node[this.state.value]);
        }
      }

      this.props.selectChange(checkedArr);
    }
  }, {
    key: "renderTreeParent",
    value: function renderTreeParent() {
      var _this4 = this;

      var data = this.state.treeData;
      return _react["default"].createElement("div", {
        className: "parentNode childNode ".concat(data.open ? 'open' : 'close', " ").concat(data.children && data.children.length ? '' : 'noChildren')
      }, _react["default"].createElement("span", {
        onClick: function onClick(e) {
          return _this4.openNode(e, data);
        },
        className: "openNode"
      }), this.state.checkBox ? _react["default"].createElement("div", {
        className: "checkBox ".concat(this.checkMap[data.checked]),
        onClick: function onClick(e) {
          return _this4.selectCheckBox(e, data);
        }
      }) : _react["default"].createElement("div", {
        className: "fileBox"
      }, _react["default"].createElement("img", {
        src: "./images/file-icon.png",
        alt: ""
      })), _react["default"].createElement("div", {
        className: "nodeName ".concat(this.state.selectVal === data[this.state.value] ? 'active' : ''),
        onClick: function onClick(e) {
          return _this4.selectNode(e, data);
        }
      }, data[this.state.label]), this.state.treeData.children ? _react["default"].createElement("div", {
        className: "childList"
      }, this.renderTreeNode(data)) : null);
    }
  }, {
    key: "renderTreeNode",
    value: function renderTreeNode(data) {
      var _this5 = this;

      return data.children.map(function (val, ind) {
        return _react["default"].createElement("div", {
          key: ind,
          className: "childNode ".concat(val.open ? 'open' : 'close', " ").concat(val.children && val.children.length ? '' : 'noChildren')
        }, _react["default"].createElement("span", {
          onClick: function onClick(e) {
            return _this5.openNode(e, val);
          },
          className: "openNode"
        }), _this5.state.checkBox ? _react["default"].createElement("div", {
          className: "checkBox ".concat(_this5.checkMap[val.checked]),
          onClick: function onClick(e) {
            return _this5.selectCheckBox(e, val);
          }
        }) : _react["default"].createElement("div", {
          className: "fileBox"
        }, _react["default"].createElement("img", {
          src: "./images/file-icon.png",
          alt: ""
        })), ind === data.children.length - 1 ? _react["default"].createElement("span", {
          className: "lastNode"
        }) : null, _react["default"].createElement("div", {
          className: "nodeName ".concat(_this5.state.selectVal === val[_this5.state.value] ? 'active' : ''),
          onClick: function onClick(e) {
            return _this5.selectNode(e, val);
          }
        }, val[_this5.state.label]), val.children ? _react["default"].createElement("div", {
          className: "childList"
        }, _this5.renderTreeNode(val)) : null);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "tree"
      }, this.renderTreeParent());
    }
  }]);

  return Tree;
}(_react.Component);

var _default = Tree;
exports["default"] = _default;