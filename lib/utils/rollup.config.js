const commonjs = require("rollup-plugin-commonjs");
const multiInput = require("rollup-plugin-multi-input");
const typescript = require("rollup-plugin-typescript2");

module.exports = async function () {
  const builds = [];

  // You can add more sub-modules here. Note that every submodule should have index.ts file inside that export all the necessary exports.
  const inputs = ["src/index.ts", "src/validators/index.ts"];

  builds.push({
    input: inputs,
    output: [
      {
        dir: "dist/esm/",
        format: "esm",
      },
      {
        dir: "dist/cjs/",
        format: "cjs",
      },
    ],
    plugins: [
      multiInput.default(),
      typescript({ tsconfig: "./tsconfig.build.json" }),
      commonjs(),
    ],
  });

  return builds;
}
