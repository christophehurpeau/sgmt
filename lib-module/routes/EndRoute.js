var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndRoute = function () {
  function EndRoute(path, ref) {
    _classCallCheck(this, EndRoute);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  _createClass(EndRoute, [{
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return false;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.path;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return EndRoute;
}();

export { EndRoute as default };
//# sourceMappingURL=EndRoute.js.map