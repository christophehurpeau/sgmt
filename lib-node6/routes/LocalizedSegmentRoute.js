'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let SegmentRoute = class {

  constructor(localizedPaths) {
    this.nestedRoutes = [];

    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale) {
    return this.localizedPaths.get(locale);
  }

  isSegment() {
    return true;
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};
exports.default = SegmentRoute;
//# sourceMappingURL=LocalizedSegmentRoute.js.map