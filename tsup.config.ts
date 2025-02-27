import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true, // This enables declaration file generation
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: [
    "@milkdown/core",
    "@milkdown/prose",
    "@milkdown/ctx",
    "@milkdown/transformer",
    "@milkdown/utils",
    "@milkdown/kit",
    "@milkdown/preset-commonmark",
    "atomico",
    "clsx",
    "material-file-icons",
    "remark-directive",
  ],
  treeshake: true,
})
