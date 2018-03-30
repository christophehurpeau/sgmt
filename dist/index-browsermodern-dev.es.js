import t from 'flow-runtime';
import pathToRegExp from 'path-to-regexp';
import Logger from 'nightingale-logger';

const RouteRefType = t.type("RouteRefType", t.any());

const RoutePathType = t.type("RoutePathType", t.exactObject(t.property("path", t.string()), t.property("completePath", t.string()), t.property("regExp", t.ref("RegExp")), t.property("namedParams", t.array(t.string())), t.property("toPath", t.function(t.param("args", t.object()), t.return(t.string())))));

const SegmentRoutePathType = t.type("SegmentRoutePathType", t.exactObject(t.property("path", t.string()), t.property("completePath", t.string()), t.property("regExp", t.ref("RegExp")), t.property("namedParams", t.array(t.string()))));

const LocaleType = t.type("LocaleType", t.string());

const RoutePathType$1 = t.tdz(function () {
  return RoutePathType;
});
const RouteRefType$1 = t.tdz(function () {
  return RouteRefType;
});
let EndRoute = class {

  constructor(path, ref) {
    let _pathType = t.ref(RoutePathType$1);

    let _refType = t.ref(RouteRefType$1);

    t.param('path', _pathType).assert(path);
    t.param('ref', _refType).assert(ref);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath() {
    const _returnType = t.return(t.ref(RoutePathType$1));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(false);
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

const LocaleType$1 = t.tdz(function () {
  return LocaleType;
});
const RoutePathType$2 = t.tdz(function () {
  return RoutePathType;
});
const RouteRefType$2 = t.tdz(function () {
  return RouteRefType;
});
let LocalizedEndRoute = class {

  constructor(localizedPaths, ref) {
    let _localizedPathsType = t.ref('Map', t.ref(LocaleType$1), t.ref(RoutePathType$2));

    let _refType = t.ref(RouteRefType$2);

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
    t.param('ref', _refType).assert(ref);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
    let _localeType = t.ref(LocaleType$1);

    const _returnType = t.return(t.nullable(t.ref(RoutePathType$2)));

    t.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(false);
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

const Route = t.tdz(function () {
  return EndRoute;
});
const SegmentRoutePathType$1 = t.tdz(function () {
  return SegmentRoutePathType;
});
let SegmentRoute = class {

  constructor(path) {
    this.nestedRoutes = [];

    let _pathType = t.ref(SegmentRoutePathType$1);

    t.param('path', _pathType).assert(path);

    this.path = path;
  }
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze


  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath() {
    const _returnType = t.return(t.ref(SegmentRoutePathType$1));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(true);
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

var _dec, _class, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['keys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['defineProperty'](target, property, desc);
    desc = null;
  }

  return desc;
}
const LocalizedRoute = t.tdz(function () {
  return LocalizedEndRoute;
});
const LocaleType$2 = t.tdz(function () {
  return LocaleType;
});
const SegmentRoutePathType$2 = t.tdz(function () {
  return SegmentRoutePathType;
});
let LocalizedSegmentRoute = (_dec = t.decorate(function () {
  return t.array(t.union(t.ref(LocalizedRoute), t.ref(LocalizedSegmentRoute)));
}), _class = class {

  constructor(localizedPaths) {
    _initDefineProp(this, 'nestedRoutes', _descriptor, this);

    let _localizedPathsType = t.ref('Map', t.ref(LocaleType$2), t.ref(SegmentRoutePathType$2));

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale) {
    let _localeType = t.ref(LocaleType$2);

    const _returnType = t.return(t.nullable(t.ref(SegmentRoutePathType$2)));

    t.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(true);
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, 'nestedRoutes', [_dec], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _class);

const RouteType = t.type('RouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute), t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
const SegmentRouteType = t.type('SegmentRouteType', t.union(t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
const EndRouteType = t.type('EndRouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute)));

const RouteRefType$3 = t.tdz(function () {
  return RouteRefType;
});
const RoutePathType$3 = t.tdz(function () {
  return RoutePathType;
});
const SegmentRoutePathType$3 = t.tdz(function () {
  return SegmentRoutePathType;
});
const LocaleType$3 = t.tdz(function () {
  return LocaleType;
});
const RouteType$1 = t.tdz(function () {
  return RouteType;
});
const EndRouteType$1 = t.tdz(function () {
  return EndRouteType;
});

const PathDictionaryType = t.type('PathDictionaryType', t.object(t.indexer('key', t.ref(LocaleType$3), t.string())));

const SegmentRouterBuilderType = t.type('SegmentRouterBuilderType', function (SegmentRouterBuilderType) {
  return t.exactObject(t.property('defaultRoute', t.function(t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))));
});

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

const RoutesType = t.type('RoutesType', t.array(t.ref(RouteType$1)));
const RouteMapType = t.type('RouteMapType', t.ref('Map', t.string(), t.ref(RouteType$1)));

const RouteMatchType = t.type('RouteMatchType', t.exactObject(t.property('ref', t.ref(RouteRefType$3)), t.property('path', t.string()), t.property('route', t.ref(RouteType$1)), t.property('routePath', t.union(t.ref(SegmentRoutePathType$3), t.ref(RoutePathType$3))), t.property('namedParams', t.nullable(t.ref('Map', t.string(), t.string()))), t.property('otherParams', t.nullable(t.array(t.string())))));

const RouterType = t.type('RouterType', t.exactObject(t.property('get', t.function(t.param('key', t.string()), t.return(t.nullable(t.ref(EndRouteType$1))))), t.property('find', t.function(t.param('path', t.string()), t.param('locale', t.nullable(t.string()), true), t.return(t.nullable(RouteMatchType)))), t.property('toPath', t.function(t.param('key', t.string()), t.param('args', t.any()), t.return(t.string()))), t.property('toLocalizedPath', t.function(t.param('locale', t.string()), t.param('key', t.string()), t.param('args', t.any()), t.return(t.string())))));

const RouterBuilderType = t.type('RouterBuilderType', t.exactObject(t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('getRoutes', t.function(t.return(RoutesType))), t.property('createRouter', t.function(t.return(RouterType)))));

const SegmentRoutePathType$4 = t.tdz(function () {
  return SegmentRoutePathType$3;
});
const RoutePathType$4 = t.tdz(function () {
  return RoutePathType$3;
});
const internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _segmentType = t.boolean();

  const _returnType = t.return(t.union(t.ref(SegmentRoutePathType$4), t.ref(RoutePathType$4)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('segment', _segmentType).assert(segment);

  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}(.*)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return _returnType.assert({ path, completePath, regExp, namedParams });

  return _returnType.assert({
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath)
  });
};

const createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  let _pathType2 = t.string();

  let _completePathType2 = t.string();

  const _returnType2 = t.return(t.ref(SegmentRoutePathType$4));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);
  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
};

const createRoutePath = function createRoutePath(path, completePath) {
  let _pathType3 = t.string();

  let _completePathType3 = t.string();

  const _returnType3 = t.return(t.ref(RoutePathType$4));

  t.param('path', _pathType3).assert(path);
  t.param('completePath', _completePathType3).assert(completePath);
  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
};

const LocaleType$4 = t.tdz(function () {
  return LocaleType$3;
});
const PathDictionaryType$1 = t.tdz(function () {
  return PathDictionaryType;
});
const RoutePathType$5 = t.tdz(function () {
  return RoutePathType$3;
});
const SegmentRoutePathType$5 = t.tdz(function () {
  return SegmentRoutePathType$3;
});
const RouteRefType$4 = t.tdz(function () {
  return RouteRefType$3;
});
const createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  let _pathDictionaryType = t.ref(PathDictionaryType$1);

  let _completePathDictionaryType = t.ref(PathDictionaryType$1);

  let _segmentType = t.boolean();

  t.param('pathDictionary', _pathDictionaryType).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType).assert(completePathDictionary);
  t.param('segment', _segmentType).assert(segment);

  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    let _localeType = t.ref(LocaleType$4);

    t.param('locale', _localeType).assert(locale);

    const path = pathDictionary[locale];
    if (segment) {
      const routerPath = t.ref(SegmentRoutePathType$5).assert(createRoutePathSegment(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = t.ref(RoutePathType$5).assert(createRoutePath(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = function checkRef(ref) {
  let _refType = t.any();

  t.param('ref', _refType).assert(ref);

  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

const createRoute = function createRoute(path, completePath, ref) {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _refType2 = t.ref(RouteRefType$4);

  const _returnType = t.return(t.ref(EndRoute));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('ref', _refType2).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  const routePath = t.ref(RoutePathType$5).assert(createRoutePath(path, completePath));
  return _returnType.assert(new EndRoute(routePath, ref));
};

const createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  let _pathDictionaryType2 = t.ref(PathDictionaryType$1);

  let _completePathDictionaryType2 = t.ref(PathDictionaryType$1);

  let _refType3 = t.ref(RouteRefType$4);

  const _returnType2 = t.return(t.ref(LocalizedEndRoute));

  t.param('pathDictionary', _pathDictionaryType2).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType2).assert(completePathDictionary);
  t.param('ref', _refType3).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return _returnType2.assert(new LocalizedEndRoute(localizedPaths, ref));
};

const createSegmentRoute = function createSegmentRoute(path, completePath) {
  let _pathType2 = t.string();

  let _completePathType2 = t.string();

  const _returnType3 = t.return(t.ref(SegmentRoute));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);

  const routePath = createRoutePathSegment(path, completePath);
  return _returnType3.assert(new SegmentRoute(routePath));
};

const createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  let _pathDictionaryType3 = t.ref(PathDictionaryType$1);

  let _completePathDictionaryType3 = t.ref(PathDictionaryType$1);

  const _returnType4 = t.return(t.ref(LocalizedSegmentRoute));

  t.param('pathDictionary', _pathDictionaryType3).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType3).assert(completePathDictionary);

  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return _returnType4.assert(new LocalizedSegmentRoute(localizedPaths));
};

const RouteType$2 = t.tdz(function () {
  return RouteType;
});
const RoutesType$1 = t.tdz(function () {
  return RoutesType;
});
const LocaleType$5 = t.tdz(function () {
  return LocaleType$3;
});
const RouteMatchType$1 = t.tdz(function () {
  return RouteMatchType;
});
const SegmentRoutePathType$6 = t.tdz(function () {
  return SegmentRoutePathType$3;
});
const RoutePathType$6 = t.tdz(function () {
  return RoutePathType$3;
});
const logger = new Logger('router-segments:findMatch');

const parseOtherParams = function parseOtherParams(wildcard) {
  let _wildcardType = t.string();

  t.param('wildcard', _wildcardType).assert(wildcard);
  return wildcard ? wildcard.split('/') : [];
};

const findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _routesType = t.ref(RoutesType$1);

  let _localeType = t.ref(LocaleType$5);

  let _namedParamsType = t.nullable(t.ref('Map', t.string(), t.string()));

  const _returnType = t.return(t.nullable(t.ref(RouteMatchType$1)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('routes', _routesType).assert(routes);
  t.param('locale', _localeType).assert(locale);
  t.param('namedParams', _namedParamsType).assert(namedParams);

  let result = null;

  routes.some(function (route) {
    let _routeType = t.ref(RouteType$2);

    t.param('route', _routeType).assert(route);

    const routePath = t.union(t.nullable(t.ref(SegmentRoutePathType$6)), t.ref(RoutePathType$6)).assert(route.getPath(locale));

    if (!routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }

    /* istanbul ignore next */
    logger.debug(`trying ${routePath.regExp}`);

    const match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = _namedParamsType.assert(new Map());

      routePath.namedParams.forEach(function (paramName) {
        let _paramNameType = t.string();

        t.param('paramName', _paramNameType).assert(paramName);

        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = findMatch(`/${restOfThePath}`, completePath, route.nestedRoutes, locale, namedParams);

        return result !== null;
      }

      if (!route.defaultRoute) {
        return false;
      }

      route = _routeType.assert(route.defaultRoute);
    }

    const otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      ref: route.ref,
      path: completePath,
      route,
      routePath,
      namedParams,
      otherParams
    });

    return true;
  });

  return _returnType.assert(result);
};

var findMatch$1 = (function (path, routes, locale = 'en') {
  let _pathType2 = t.string();

  let _routesType2 = t.ref(RoutesType$1);

  let _localeType2 = t.ref(LocaleType$5);

  const _returnType2 = t.return(t.nullable(t.ref(RouteMatchType$1)));

  t.param('path', _pathType2).assert(path);
  t.param('routes', _routesType2).assert(routes);
  t.param('locale', _localeType2).assert(locale);
  return _returnType2.assert(findMatch(path, path, routes, locale));
});

const EndRouteType$2 = t.tdz(function () {
  return EndRouteType;
});
const RoutesType$2 = t.tdz(function () {
  return RoutesType;
});
const RouteMapType$1 = t.tdz(function () {
  return RouteMapType;
});
const RouterType$1 = t.tdz(function () {
  return RouterType;
});
const RouteMatchType$2 = t.tdz(function () {
  return RouteMatchType;
});
var _createRouter = (function (routes, routeMap) {
  let _routesType = t.ref(RoutesType$2);

  let _routeMapType = t.ref(RouteMapType$1);

  const _returnType = t.return(t.ref(RouterType$1));

  t.param('routes', _routesType).assert(routes);
  t.param('routeMap', _routeMapType).assert(routeMap);

  const getRequiredRoute = function getRequiredRoute(routeKey) {
    let _routeKeyType = t.string();

    t.param('routeKey', _routeKeyType).assert(routeKey);

    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return _returnType.assert({
    get: function get(key) {
      let _keyType = t.string();

      const _returnType2 = t.return(t.nullable(t.ref(EndRouteType$2)));

      t.param('key', _keyType).assert(key);
      return _returnType2.assert(getRequiredRoute(key));
    },
    find: function find(path, locale) {
      let _pathType = t.string();

      let _localeType = t.nullable(t.string());

      const _returnType3 = t.return(t.nullable(t.ref(RouteMatchType$2)));

      t.param('path', _pathType).assert(path);
      t.param('locale', _localeType).assert(locale);
      return _returnType3.assert(findMatch$1(path, routes, locale));
    },
    toPath: function toPath(key, args) {
      let _keyType2 = t.string();

      let _argsType = t.any();

      const _returnType4 = t.return(t.string());

      t.param('key', _keyType2).assert(key);
      t.param('args', _argsType).assert(args);
      return _returnType4.assert(getRequiredRoute(key).getPath().toPath(args));
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      let _localeType2 = t.string();

      let _keyType3 = t.string();

      let _argsType2 = t.any();

      const _returnType5 = t.return(t.string());

      t.param('locale', _localeType2).assert(locale);
      t.param('key', _keyType3).assert(key);
      t.param('args', _argsType2).assert(args);
      return _returnType5.assert(getRequiredRoute(key).getPath(locale).toPath(args));
    }
  });
});

const RouteType$3 = t.tdz(function () {
  return RouteType$1;
});
const PathDictionaryType$2 = t.tdz(function () {
  return PathDictionaryType;
});
const RouteRefType$5 = t.tdz(function () {
  return RouteRefType$3;
});
const SegmentRouterBuilderType$1 = t.tdz(function () {
  return SegmentRouterBuilderType;
});
const SegmentRouteType$1 = t.tdz(function () {
  return SegmentRouteType;
});
const AddToRouteMapType = t.type('AddToRouteMapType', t.function(t.param('key', t.string()), t.param('route', t.ref(RouteType$3)), t.return(t.void())));

var createSegmentRouterBuilderCreator = (function (defaultLocale, addToRouteMap) {
  let _defaultLocaleType = t.nullable(t.string());

  t.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);
  t.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  const createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    let _segmentRouteType = t.ref(SegmentRouteType$1);

    t.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    const getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    const getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      let _localizedPathsType = t.ref(PathDictionaryType$2);

      const _returnType = t.return(t.ref(PathDictionaryType$2));

      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return `${segmentRoute.path.completePath}${path}`;
      } : function (path, locale) {
        return `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        let _localeType = t.string();

        t.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return _returnType.assert(completeLocalizedPaths);
    };

    const createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      let _pathType = t.string();

      t.param('path', _pathType).assert(path);

      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        return localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    const _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      let _localizedPathsType2 = t.ref(PathDictionaryType$2);

      let _refType = t.ref(RouteRefType$5);

      let _keyType = t.nullable(t.string());

      t.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType).assert(key);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey = t.string().assert(key || completeLocalizedPaths[defaultLocale]);
      const route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = function _createEndRoute(path, ref, key) {
      let _pathType2 = t.string();

      let _refType2 = t.ref(RouteRefType$5);

      let _keyType2 = t.nullable(t.string());

      t.param('path', _pathType2).assert(path);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType2).assert(key);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);
      const finalKey = t.string().assert(key || completePath);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      let _localizedPathsType3 = t.ref(PathDictionaryType$2);

      let _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

      t.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
      let _pathType3 = t.string();

      let _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

      t.param('path', _pathType3).assert(path);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
      }

      const completePath = getCompletePath(path);
      const route = createSegmentRoute(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: function defaultRoute(ref, key) {
        let _refType3 = t.ref(RouteRefType$5);

        let _keyType3 = t.nullable(t.string());

        t.param('ref', _refType3).assert(ref);
        t.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: function add(path, ref, key) {
        let _pathType4 = t.string();

        let _refType4 = t.ref(RouteRefType$5);

        let _keyType4 = t.nullable(t.string());

        t.return(t.void());
        t.param('path', _pathType4).assert(path);
        t.param('ref', _refType4).assert(ref);
        t.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: function addLocalized(localizedPaths, ref, key) {
        let _localizedPathsType4 = t.ref(PathDictionaryType$2);

        let _refType5 = t.ref(RouteRefType$5);

        let _keyType5 = t.nullable(t.string());

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);
        t.param('ref', _refType5).assert(ref);
        t.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: function addSegment(path, buildSegment) {
        let _pathType5 = t.string();

        let _buildSegmentType3 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

        t.return(t.void());
        t.param('path', _pathType5).assert(path);
        t.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        let _localizedPathsType5 = t.ref(PathDictionaryType$2);

        let _buildSegmentType4 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType5).assert(localizedPaths);
        t.param('buildSegment', _buildSegmentType4).assert(buildSegment);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };
  return createSegmentRouterBuilder;
});

const LocaleType$6 = t.tdz(function () {
  return LocaleType$3;
});
const RouterBuilderType$1 = t.tdz(function () {
  return RouterBuilderType;
});
const PathDictionaryType$3 = t.tdz(function () {
  return PathDictionaryType;
});
const RoutesType$3 = t.tdz(function () {
  return RoutesType;
});
const RouteMapType$2 = t.tdz(function () {
  return RouteMapType;
});
const RouteType$4 = t.tdz(function () {
  return RouteType$1;
});
const SegmentRouterBuilderType$2 = t.tdz(function () {
  return SegmentRouterBuilderType;
});
const RouteRefType$6 = t.tdz(function () {
  return RouteRefType$3;
});
var createRouterBuilder = (function (locales) {
  let _localesType = t.nullable(t.array(t.ref(LocaleType$6)));

  const _returnType = t.return(t.ref(RouterBuilderType$1));

  t.param('locales', _localesType).assert(locales);

  const defaultLocale = locales && locales[0];
  const routes = t.ref(RoutesType$3).assert([]);
  const routeMap = t.ref(RouteMapType$2).assert(new Map());

  const addToRouteMap = function addToRouteMap(key, route) {
    let _keyType = t.string();

    let _routeType = t.ref(RouteType$4);

    t.param('key', _keyType).assert(key);
    t.param('route', _routeType).assert(route);

    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);

  return _returnType.assert({
    add: function add(path, ref, key) {
      let _pathType = t.string();

      let _refType = t.ref(RouteRefType$6);

      let _keyType2 = t.nullable(t.string());

      t.return(t.void());
      t.param('path', _pathType).assert(path);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType2).assert(key);

      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = _keyType2.assert(path);
      addToRouteMap(key, route);
    },

    addLocalized: function addLocalized(localizedPaths, ref, key) {
      let _localizedPathsType = t.ref(PathDictionaryType$3);

      let _refType2 = t.ref(RouteRefType$6);

      let _keyType3 = t.nullable(t.string());

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType3).assert(key);

      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey = t.string().assert(key || localizedPaths[defaultLocale]);
      addToRouteMap(finalKey, route);
    },

    addSegment: function addSegment(path, buildSegment) {
      let _pathType2 = t.string();

      let _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$2)), t.return(t.void()));

      t.return(t.void());
      t.param('path', _pathType2).assert(path);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      let _localizedPathsType2 = t.ref(PathDictionaryType$3);

      let _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$2)), t.return(t.void()));

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: function getRoutes() {
      return routes;
    },
    createRouter: function createRouter() {
      return _createRouter(routes, routeMap);
    }
  });
});

export default createRouterBuilder;
//# sourceMappingURL=index-browsermodern-dev.es.js.map
