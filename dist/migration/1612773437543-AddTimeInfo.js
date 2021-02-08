"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddTimeInfo1612773437543 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeorm = require("typeorm");

var AddTimeInfo1612773437543 = /*#__PURE__*/function () {
  function AddTimeInfo1612773437543() {
    (0, _classCallCheck2["default"])(this, AddTimeInfo1612773437543);
  }

  (0, _createClass2["default"])(AddTimeInfo1612773437543, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        var addTimeInfo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                addTimeInfo = /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return queryRunner.addColumns(name, [new _typeorm.TableColumn({
                              name: 'createdAt',
                              type: 'time',
                              isNullable: false,
                              "default": 'now()'
                            }), new _typeorm.TableColumn({
                              name: 'updatedAt',
                              type: 'time',
                              isNullable: false,
                              "default": 'now()'
                            })]);

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function addTimeInfo(_x2) {
                    return _ref.apply(this, arguments);
                  };
                }();

                _context2.next = 3;
                return addTimeInfo('users');

              case 3:
                _context2.next = 5;
                return addTimeInfo('posts');

              case 5:
                _context2.next = 7;
                return addTimeInfo('comments');

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function up(_x) {
        return _up.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(queryRunner) {
        var dropTimeInfo;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dropTimeInfo = /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name) {
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return queryRunner.dropColumn(name, 'createdAt');

                          case 2:
                            _context3.next = 4;
                            return queryRunner.dropColumn(name, 'updatedAt');

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function dropTimeInfo(_x4) {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context4.next = 3;
                return dropTimeInfo('users');

              case 3:
                _context4.next = 5;
                return dropTimeInfo('posts');

              case 5:
                _context4.next = 7;
                return dropTimeInfo('comments');

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function down(_x3) {
        return _down.apply(this, arguments);
      }

      return down;
    }()
  }]);
  return AddTimeInfo1612773437543;
}();

exports.AddTimeInfo1612773437543 = AddTimeInfo1612773437543;