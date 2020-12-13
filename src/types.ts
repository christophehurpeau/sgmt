import type { EndRoute, Route } from './routes/interfaces';
import type * as routesTypes2 from './routes/types';

export type LocaleType = routesTypes2.LocaleType;
export type RouteRef = routesTypes2.RouteRef;
export type RoutePathInterface = routesTypes2.RoutePathInterface;
export type EndRoutePath = routesTypes2.EndRoutePath;
export type SegmentRoutePath = routesTypes2.SegmentRoutePath;

export type LocalizedPathsRecord<Locales extends LocaleType> = Record<
  Locales,
  string
>;

// export SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export type Routes<Locales> = Route<RoutePathInterface, Locales>[];
export type RouteMap<Locales extends LocaleType> = Map<
  string,
  EndRoute<Locales>
>;
