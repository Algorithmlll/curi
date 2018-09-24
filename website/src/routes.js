// components that are not code split
import Home from "./components/routes/Home";
import PackageList from "./components/routes/PackageList";
import GuideList from "./components/routes/GuideList";
import ExampleList from "./components/routes/ExampleList";
import TutorialBase from "./components/routes/TutorialBase";
import NotFound from "./components/routes/NotFound";

import TUTORIAL_API from "./constants/tutorials";
import GUIDE_API from "./constants/guides";
import PACKAGE_API from "./constants/packages";
import EXAMPLE_API from "./constants/examples";

import catchImportError from "./catchImportError";

export default [
  {
    name: "Home",
    path: "",
    response: () => {
      return {
        body: Home,
        title: "Curi"
      };
    }
  },
  {
    name: "Tutorials",
    path: "tutorial/",
    response: () => {
      return {
        body: TutorialBase,
        title: "Tutorials"
      };
    },
    children: [
      {
        name: "Tutorial",
        path: ":slug/",
        resolve: {
          body: () =>
            import(/* webpackChunkName: 'tutorial' */ "./components/routes/Tutorial").then(
              module => module.default,
              catchImportError("tutorial")
            )
        },
        response: ({ match, resolved }) => {
          const tutorial = TUTORIAL_API.find(match.params.slug);
          return {
            body: resolved.body,
            title: tutorial
              ? `Tutorial ${tutorial.title}`
              : "Tutorial Not Found"
          };
        }
      }
    ]
  },
  {
    name: "Guides",
    path: "guides/",
    response: () => {
      return {
        body: GuideList,
        title: "Guides"
      };
    },
    children: [
      {
        name: "Guide",
        path: ":slug/",
        resolve: {
          body: () =>
            import(/* webpackChunkName: 'guide' */ "./components/routes/Guide").then(
              module => module.default,
              catchImportError("guide")
            )
        },
        response: ({ match, resolved, set }) => {
          const guide = GUIDE_API.find(match.params.slug);
          return {
            body: resolved.body,
            data: guide,
            title: guide ? `${guide.name} Guide` : "Guide Not Found"
          };
        }
      }
    ]
  },
  {
    name: "Packages",
    path: "packages/",
    response: () => {
      return {
        body: PackageList,
        title: "Curi Packages"
      };
    },
    children: [
      {
        name: "Package",
        path: "@curi/:package/",
        resolve: {
          body: () =>
            import(/* webpackChunkName: 'package' */ "./components/routes/Package").then(
              module => module.default,
              catchImportError("package")
            )
        },
        response: ({ match, resolved }) => {
          const pkg = PACKAGE_API.find(match.params.package);
          return {
            body: resolved.body,
            title: `@curi/${match.params.package}`,
            data: pkg
          };
        }
      }
    ]
  },
  {
    name: "Examples",
    path: "examples/",
    response: () => {
      return {
        body: ExampleList,
        title: "Examples"
      };
    },
    children: [
      {
        name: "Example",
        path: ":category/:slug/",
        resolve: {
          body: () =>
            import(/* webpackChunkName: 'example' */ "./components/routes/Example").then(
              module => module.default,
              catchImportError("example")
            )
        },
        response: ({ match, resolved }) => {
          const { category, slug } = match.params;
          const example = EXAMPLE_API.find(category, slug);
          return {
            body: resolved.body,
            data: example,
            title: example ? `${example.name} Example` : "Example Not Found"
          };
        }
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound
      };
    }
  }
];
