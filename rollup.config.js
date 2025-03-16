import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';

// 개발 모드인지 확인
const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: false, // 소스맵 비활성화
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named',
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: false, // 소스맵 비활성화
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true, // 브라우저 환경 최적화
    }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/*.stories.ts', 'src/stories/**/*'],
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
      extract: false, // CSS를 JS에 인라인으로 삽입
    }),
    // 개발용 코드 제거 (console.log, debugger, assert 등)
    isProduction && strip({
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      functions: ['console.log', 'assert.*', 'debug', 'alert'],
      debugger: true,
    }),
    // 프로덕션 빌드시 코드 최적화
    isProduction && terser({
      format: {
        comments: false, // 주석 제거
      },
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true, // debugger 문 제거
        pure_getters: true, // getter 최적화
        unsafe: true, // 안전하지 않은 최적화 허용
        unsafe_comps: true,
        passes: 2, // 여러 번 압축 패스 실행
      },
      mangle: {
        properties: {
          regex: /^_/,  // _로 시작하는 프로퍼티만 변경
        }
      }
    }),
    // 번들 분석 시각화 (stats.html 파일 생성)
    visualizer({
      filename: 'stats.html',
      title: 'Bundle Visualizer',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  external: ['react', 'react-dom', 'tslib'],
}; 