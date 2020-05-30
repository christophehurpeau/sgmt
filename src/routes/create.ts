import { PRODUCTION } from 'pob-babel';
import {
  LocaleType,
  LocalizedPathsRecord,
  EndRoutePath,
  SegmentRoutePath,
  RouteRef,
} from '../types';
import { getKeys } from '../utils/getKeys';
import { createRoutePath, createRoutePathSegment } from './createRoutePath';
import Route from './NotLocalizedEndRoute';
import LocalizedEndRoute from './LocalizedEndRoute';
import NotLocalizedSegmentRoute from './NotLocalizedSegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

const createLocalizedPaths = <
  Locales extends LocaleType,
  Path extends SegmentRoutePath | EndRoutePath
>(
  localizedPathsRecord: LocalizedPathsRecord<Locales>,
  completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>,
  segment: boolean,
): Map<Locales, Path> => {
  const localizedPaths = new Map();
  getKeys(localizedPathsRecord).forEach((locale: Locales) => {
    const path = localizedPathsRecord[locale];
    if (segment) {
      const routerPath: SegmentRoutePath = createRoutePathSegment(
        path,
        completeLocalizedPathsRecord[locale],
      );
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath: EndRoutePath = createRoutePath(
        path,
        completeLocalizedPathsRecord[locale],
      );
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = (ref: RouteRef): void => {
  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

export const createRoute = (
  path: string,
  completePath: string,
  ref: RouteRef,
): Route => {
  /* istanbul ignore if */
  if (!PRODUCTION) checkRef(ref);
  const routePath: EndRoutePath = createRoutePath(path, completePath);
  return new Route(routePath, ref);
};

export const createLocalizedRoute = <Locales extends LocaleType>(
  localizedPathsRecord: LocalizedPathsRecord<Locales>,
  completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>,
  ref: RouteRef,
): LocalizedEndRoute<Locales> => {
  /* istanbul ignore if */
  if (!PRODUCTION) checkRef(ref);
  const localizedPaths = createLocalizedPaths<Locales, EndRoutePath>(
    localizedPathsRecord,
    completeLocalizedPathsRecord,
    false,
  );
  return new LocalizedEndRoute(localizedPaths, ref);
};

export const createSegmentRoute = (
  path: string,
  completePath: string,
): NotLocalizedSegmentRoute => {
  const routePath = createRoutePathSegment(path, completePath);
  return new NotLocalizedSegmentRoute(routePath);
};

export const createLocalizedSegmentRoute = <Locales extends LocaleType>(
  localizedPathsRecord: LocalizedPathsRecord<Locales>,
  completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>,
): LocalizedSegmentRoute<Locales> => {
  const localizedPaths = createLocalizedPaths<Locales, SegmentRoutePath>(
    localizedPathsRecord,
    completeLocalizedPathsRecord,
    true,
  );
  return new LocalizedSegmentRoute(localizedPaths);
};
