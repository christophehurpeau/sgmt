import type { Router } from '../router/createRouter';
import type { LocaleType, LocalizedPathsRecord, Routes, RouteRef } from '../types';
import type { SegmentRouterBuilder } from './createSegmentRouterBuilderCreator';
export interface RouterBuilder<Locales extends LocaleType | never> {
    add: (path: string, ref: RouteRef, key?: string) => void;
    addLocalized: (localizedPaths: LocalizedPathsRecord<Locales>, ref: RouteRef, key?: string) => void;
    addLocalizedSegment: (localizedPaths: LocalizedPathsRecord<Locales>, buildSegment: (builder: SegmentRouterBuilder<Locales>) => void) => void;
    addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilder<Locales>) => void) => void;
    createRouter: () => Router<Locales>;
    getRoutes: () => Routes<Locales>;
}
export declare function createRouterBuilder<Locales extends LocaleType>(locales?: Locales[]): RouterBuilder<Locales>;
//# sourceMappingURL=createRouterBuilder.d.ts.map