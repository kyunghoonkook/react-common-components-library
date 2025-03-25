import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';
import glob from 'glob';
import path from 'path';

const packageJson = require('./package.json');
const isProduction = process.env.NODE_ENV === 'production';

// 공통 플러그인 설정
const plugins = [
  external(),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist',
  }),
  postcss({
    extensions: ['.css'],
    minimize: isProduction,
    inject: false,
    extract: false,
  }),
  isProduction && strip({
    include: ['**/*.js', '**/*.ts', '**/*.tsx'],
    functions: ['console.log', 'console.warn', 'console.error'],
  }),
  isProduction && terser(),
  isProduction && visualizer({
    filename: 'stats.html',
    title: 'React Components Library Bundle Analysis',
  }),
];

// 메인 번들 구성
const mainBundle = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-common-components-library',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
    external: ['react', 'react-dom', '@radix-ui/react-id'],
  },
];

// 개별 컴포넌트 진입점 생성
const componentEntrypoints = glob.sync('src/components-index/*.ts').map(file => {
  const name = path.basename(file, '.ts').toLowerCase();
  return {
    input: file,
    output: [
      {
        file: `dist/cjs/components/${name}/index.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `dist/esm/components/${name}/index.js`,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
    external: ['react', 'react-dom', '@radix-ui/react-id'],
  };
});

// 타입 정의 번들
const typesBundle = {
  input: 'dist/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [dts()],
  external: [/\.css$/],
};

export default [...mainBundle, ...componentEntrypoints, typesBundle]; 