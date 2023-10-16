import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "rollup-plugin-typescript2";

export default async function ({ watch }) {
  const builds = [];

  builds.push({
    plugins: [
        typescript(),
        json(),
        commonjs(),
    ],
    input: ["src/index.ts"],
    output: [
      {
        dir: "dist/",
        format: "esm",
        entryFileNames: "server.js",
        chunkFileNames: "server.js",
      }
    ],
  });

  return builds;
}
