import type {
  LocalesType,
  RouterBuilderType,
  PathDictionaryType,
  RoutesType,
  RouteMapType,
  RouteType,
  SegmentCallbackType,
  RouteRefType,
} from '../types';
import {
  createRoute,
  createLocalizedRoute,
  createSegmentRoute,
  createLocalizedSegmentRoute,
} from '../routes/create';
import createRouter from '../router/createRouter';
import createSegmentRouterBuilderCreator from './createSegmentRouterBuilderCreator';

export default (locales: ?LocalesType): RouterBuilderType => {
  const defaultLocale = locales && locales[0];
  const routes: RoutesType = [];
  const routeMap: RouteMapType = new Map();

  const addToRouteMap = (key: string, route: RouteType) => {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(
    defaultLocale,
    addToRouteMap,
  );

  return {
    add: (path: string, ref: RouteRefType, key: ?string): void => {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },

    addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string): void => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPath, localizedPath, ref);
      routes.push(route);
      const finalKey: string = key || localizedPath[defaultLocale];
      addToRouteMap(finalKey, route);
    },

    addSegment: (path: string, buildSegment: SegmentCallbackType): void => {
      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: (
      localizedPaths: PathDictionaryType,
      buildSegment: SegmentCallbackType,
    ): void => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: () => routes,
    createRouter: () => createRouter(routes, routeMap),
  };
};
