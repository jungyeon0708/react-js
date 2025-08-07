import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import * as reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { js },
    extends: ['js/recommended', prettier],

    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginReact.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    rules: {
      // 콘솔 사용 제한
      // - 디버깅용 console.log 남용 방지
      // - warn, error만 허용하여 프로덕션 코드 품질 향상
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      // const 선호
      // - 재할당되지 않는 변수는 const 사용 강제
      // - 코드 안정성 향상 및 의도치 않은 변수 변경 방지
      'prefer-const': 'error',
      // var 사용 금지
      // - ES6+ let/const 사용 강제
      // - 호이스팅 문제 및 스코프 혼란 방지
      'no-var': 'error',
      // 미사용 변수 제거
      // - 코드 정리 및 메모리 최적화
      // - 밑줄(_)로 시작하는 매개변수는 예외 처리 (의도적 미사용)
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
      ],
      // 화살표 함수 본문 스타일
      // - 간결한 표현식 강제
      // - 단일 표현식일 때 중괄호와 return 생략 강제
      'arrow-body-style': ['error', 'as-needed'],
      // 중복 import 방지
      // - 동일 모듈의 여러 import 문 금지
      // - 번들 크기 최적화 및 코드 정리
      'no-duplicate-imports': 'error',
    },
  },
])
