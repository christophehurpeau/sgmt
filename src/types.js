import type { RouteType } from './routes';

export type { RouteType };

export type LocaleType = string;

export type PathDictionaryType = { [LocaleType]: string };

export type RouteRefType = any;

export type SegmentRouterBuilderType = {|
  defaultRoute: (ref: RouteRefType, key: ?string) => void,
  add: (path: string, ref: RouteRefType, key: ?string) => void,
  addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  addSegment: (path: string, buildSegment: SegmentRouterBuilderType) => void,
  addLocalizedSegment: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
|};

export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export type SegmentRoutePathType = {|
  path: string,
  completePath: string,
  regExp: RegExp,
  namedParams: Array<string>,
|};

export type RoutePathType = {|
  path: string,
  completePath: string,
  regExp: RegExp,
  namedParams: Array<string>,
  toPath: (args: Object) => string,
|};

export type RoutesType = Array<RouteType>;
export type RouteMapType = Map<string, RouteType>;

export type RouteMatchType = {|
  ref: RouteRefType,
  path: string,
  route: RouteType,
  routePath: RoutePathType,
  namedParams: ?Map<string, string>,
  otherParams: ?Array<string>,
|};

export type RouterType = {|
  get: (path: string) => ?RouteType,
  find: (path: string) => ?RouteMatchType,
  toPath: (key: string, args: any) => string,
  toLocalizedPath: (locale: string, key: string, args: any) => string,
|};

export type RouterBuilderType = {|
  add: (path: string, ref: RouteRefType, key: ?string) => void,
  addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  addSegment: (path: string, buildSegment: SegmentRouterBuilderType) => void,
  addLocalizedSegment: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  getRoutes: () => RoutesType,
  createRouter: () => RouterType,
|};
