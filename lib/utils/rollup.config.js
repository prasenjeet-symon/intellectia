import commonjs from "rollup-plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";
import typescript from "rollup-plugin-typescript2";

export default async function () {
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
