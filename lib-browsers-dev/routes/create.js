'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLocalizedSegmentRoute = exports.createSegmentRoute = exports.createLocalizedRoute = exports.createRoute = undefined;

var _createRoutePath = require('./createRoutePath');

var _types = require('../types');

var _EndRoute = require('./EndRoute');

var _EndRoute2 = _interopRequireDefault(_EndRoute);

var _LocalizedEndRoute = require('./LocalizedEndRoute');

var _LocalizedEndRoute2 = _interopRequireDefault(_LocalizedEndRoute);

var _SegmentRoute = require('./SegmentRoute');

var _SegmentRoute2 = _interopRequireDefault(_SegmentRoute);

var _LocalizedSegmentRoute = require('./LocalizedSegmentRoute');

var _LocalizedSegmentRoute2 = _interopRequireDefault(_LocalizedSegmentRoute);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocaleType = _flowRuntime2.default.tdz(function () {
  return _types.LocaleType;
});

var PathDictionaryType = _flowRuntime2.default.tdz(function () {
  return _types.PathDictionaryType;
});

var RoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.RoutePathType;
});

var SegmentRoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.SegmentRoutePathType;
});

var RouteRefType = _flowRuntime2.default.tdz(function () {
  return _types.RouteRefType;
});

var createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  var _pathDictionaryType = _flowRuntime2.default.ref(PathDictionaryType);

  var _completePathDictionaryType = _flowRuntime2.default.ref(PathDictionaryType);

  var _segmentType = _flowRuntime2.default.boolean();

  _flowRuntime2.default.param('pathDictionary', _pathDictionaryType).assert(pathDictionary);

  _flowRuntime2.default.param('completePathDictionary', _completePathDictionaryType).assert(completePathDictionary);

  _flowRuntime2.default.param('segment', _segmentType).assert(segment);

  var localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    var _localeType = _flowRuntime2.default.ref(LocaleType);

    _flowRuntime2.default.param('locale', _localeType).assert(locale);

    var path = pathDictionary[locale];
    if (segment) {
      var routerPath = _flowRuntime2.default.ref(SegmentRoutePathType).assert((0, _createRoutePath.createRoutePathSegment)(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = _flowRuntime2.default.ref(RoutePathType).assert((0, _createRoutePath.createRoutePath)(path, completePathDictionary[locale]));
      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var checkRef = function checkRef(ref) {
  var _refType = _flowRuntime2.default.any();

  _flowRuntime2.default.param('ref', _refType).assert(ref);

  if (!ref) throw new Error('Invalid ref: "' + ref + '"');
};

var createRoute = exports.createRoute = function createRoute(path, completePath, ref) {
  var _pathType = _flowRuntime2.default.string();

  var _completePathType = _flowRuntime2.default.string();

  var _refType2 = _flowRuntime2.default.ref(RouteRefType);

  var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(_EndRoute2.default));

  _flowRuntime2.default.param('path', _pathType).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType).assert(completePath);

  _flowRuntime2.default.param('ref', _refType2).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  var routePath = _flowRuntime2.default.ref(RoutePathType).assert((0, _createRoutePath.createRoutePath)(path, completePath));
  return _returnType.assert(new _EndRoute2.default(routePath, ref));
};

var createLocalizedRoute = exports.createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  var _pathDictionaryType2 = _flowRuntime2.default.ref(PathDictionaryType);

  var _completePathDictionaryType2 = _flowRuntime2.default.ref(PathDictionaryType);

  var _refType3 = _flowRuntime2.default.ref(RouteRefType);

  var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.ref(_LocalizedEndRoute2.default));

  _flowRuntime2.default.param('pathDictionary', _pathDictionaryType2).assert(pathDictionary);

  _flowRuntime2.default.param('completePathDictionary', _completePathDictionaryType2).assert(completePathDictionary);

  _flowRuntime2.default.param('ref', _refType3).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return _returnType2.assert(new _LocalizedEndRoute2.default(localizedPaths, ref));
};

var createSegmentRoute = exports.createSegmentRoute = function createSegmentRoute(path, completePath) {
  var _pathType2 = _flowRuntime2.default.string();

  var _completePathType2 = _flowRuntime2.default.string();

  var _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.ref(_SegmentRoute2.default));

  _flowRuntime2.default.param('path', _pathType2).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType2).assert(completePath);

  var routePath = (0, _createRoutePath.createRoutePathSegment)(path, completePath);
  return _returnType3.assert(new _SegmentRoute2.default(routePath));
};

var createLocalizedSegmentRoute = exports.createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  var _pathDictionaryType3 = _flowRuntime2.default.ref(PathDictionaryType);

  var _completePathDictionaryType3 = _flowRuntime2.default.ref(PathDictionaryType);

  var _returnType4 = _flowRuntime2.default.return(_flowRuntime2.default.ref(_LocalizedSegmentRoute2.default));

  _flowRuntime2.default.param('pathDictionary', _pathDictionaryType3).assert(pathDictionary);

  _flowRuntime2.default.param('completePathDictionary', _completePathDictionaryType3).assert(completePathDictionary);

  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return _returnType4.assert(new _LocalizedSegmentRoute2.default(localizedPaths));
};
//# sourceMappingURL=create.js.map