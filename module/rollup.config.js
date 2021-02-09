import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss'

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.ts', 
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    postcss({
      plugins: []
    })
  ],
  output: [
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};