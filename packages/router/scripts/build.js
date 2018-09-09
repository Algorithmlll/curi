const rimraf = require("rimraf");
const path = require("path");
const typescript = require("rollup-plugin-typescript2");

const rollupBuild = require("../../../scripts/build");

const dist = path.join(__dirname, "..", "dist");
const types = path.join(__dirname, "..", "types");
rimraf.sync(dist);
rimraf.sync(types);

// don't bundle dependencies for es/cjs builds
const pkg = require("../package.json");
const deps = Object.keys(pkg.dependencies).map(key => key);

const base = {
  name: "Curi",
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
};

rollupBuild([
  [
    "ESM",
    {
      ...base,
      format: "esm",
      file: "dist/curi-router.es.js",
      external: deps,
      replaceNodeEnv: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "CommonJS",
    {
      ...base,
      format: "cjs",
      file: "dist/curi-router.js",
      external: deps,
      replaceNodeEnv: false
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-router.umd.js"
    },
    { NODE_ENV: "development", BABEL_ENV: "build" }
  ],

  [
    "minimized UMD",
    {
      ...base,
      format: "umd",
      file: "dist/curi-router.min.js",
      uglify: true
    },
    { NODE_ENV: "production", BABEL_ENV: "build" }
  ]
]);
