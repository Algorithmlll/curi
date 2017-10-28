import { join, stripLeadingSlash, withLeadingSlash } from './utils/path';
import once from './utils/once';
import createPath from './path';

import { HickoryLocation, ToArgument } from '@hickory/root';
import { RegExpOptions } from 'path-to-regexp';
import { Path } from './path';
import { RawParams, Params, AddonGet } from './interface';

export type Title = string | ((params?: object, data?: any) => string);
export interface LoadRoute {
  params: object;
  location: object;
  name: string;
}
export type LoadFn = (
  route?: LoadRoute,
  modifiers?: LoadModifiers,
  addons?: { [key: string]: AddonGet }
) => Promise<any>;
export type PreloadFn = () => Promise<any>;

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface Match {
  route: Route;
  params: Params;
}

export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: RegExpOptions;
  params?: ParamParsers;
  body?: () => any;
  children?: Array<RouteDescriptor>;
  preload?: PreloadFn;
  load?: LoadFn;
  title?: Title;
  extra?: { [key: string]: any };
}

// this is a terrible name, but describes an object whose children
// is already created Routes (instead of RouteDescriptors). This should
// never be used externally since
export interface RouteMidCreation extends RouteDescriptor {
  children: Array<Route>;
}

export interface Route {
  name: string;
  path: string;
  body: () => any;
  getBody: () => any;
  children: Array<Route>;
  preload: PreloadFn;
  load: LoadFn;
  keys: Array<string | number>;
  match: (
    pathname: string,
    matches: Array<Match>,
    parentPath?: string
  ) => boolean;
  title: Title;
  paramParsers: ParamParsers;
  extra: { [key: string]: any };
}

export interface LoadModifiers {
  fail: (err: any) => void;
  redirect: (to: any, status?: number) => void;
  setData: (data: any) => void;
  setStatus: (status: number) => void;
}

const createRoute = (options: RouteMidCreation): Route => {
  const {
    name,
    path,
    pathOptions = {},
    body,
    children,
    preload,
    load,
    title,
    extra,
    params: paramParsers
  } =
    options || <RouteMidCreation>{};

  // end defaults to true, so end has to be hardcoded for it to be false
  const expectedExact = pathOptions.end == null || pathOptions.end;
  // when we have child routes, we need to perform non-end matching
  if (children.length) {
    pathOptions.end = false;
  }
  const regexPath: Path = createPath(path, pathOptions);

  return {
    name,
    path: path,
    body,
    getBody: function() {
      return this.body && this.body();
    },
    children,
    preload: preload ? once(preload) : undefined,
    load,
    keys: regexPath.keys.map(key => key.name),
    title,
    extra,
    paramParsers,
    match: function(
      pathname: string,
      matches: Array<Match>,
      parentPath?: string
    ): boolean {
      const testPath: string = stripLeadingSlash(pathname);
      const match: RegExpMatchArray = regexPath.re.exec(testPath);
      if (!match) {
        return false;
      }
      const [segment, ...parsed] = match;
      const params: RawParams = {};
      regexPath.keys.forEach((key, index) => {
        params[key.name] = parsed[index];
      });
      const uriString =
        parentPath != null
          ? join(parentPath, segment)
          : withLeadingSlash(segment);

      matches.push({ route: this, params });
      // if there are no children, then we accept the match
      if (!children || !children.length) {
        return true;
      }
      // children only need to match against unmatched segments
      const remainder = testPath.slice(segment.length);
      const notExact = !!remainder.length;
      const hasChildMatch = children.some(c =>
        c.match(remainder, matches, uriString)
      );
      // if the route has children, but none of them match, remove the match unless it
      // is exact
      if (expectedExact && notExact && !hasChildMatch) {
        matches.pop();
        return false;
      }
      return true;
    }
  };
};

export default createRoute;