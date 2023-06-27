import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  outDir: 'build',
  dts: false,
  format: ['cjs'],
  target: 'node16',
  minify: false,
  skipNodeModulesBundle: true,
  tsconfig: 'tsconfig.json',
  bundle: false,
  shims: false,
  keepNames: true,
  splitting: false,
})
