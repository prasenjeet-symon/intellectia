import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default async function () {
  const builds = [];

  builds.push({
    plugins: [typescript({ tsconfig: "./tsconfig.build.json" }), commonjs()],
    input: ["src/index.ts"],
    output: [
      {
        dir: "dist/esm/",
        format: "esm",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
      {
        dir: "dist/cjs/",
        format: "cjs",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    ],
  });

  return builds;
}
