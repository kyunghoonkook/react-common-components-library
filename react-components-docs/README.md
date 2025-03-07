# React Components Library 문서

이 프로젝트는 [React Common Components Library](https://github.com/your-github-username/react-components-library)의 공식 문서를 제공하는 웹사이트입니다. [Docusaurus](https://docusaurus.io/)를 사용하여 구축되었습니다.

## 문서 내용

이 문서는 다음 내용을 포함합니다:

- 라이브러리 설치 및 시작하기 가이드
- 각 컴포넌트에 대한 상세한 사용법 및 예제
- API 참조 문서
- 접근성 가이드

## 개발 환경 설정

### 필수 조건

- Node.js 버전 18 이상

### 설치

```bash
# 의존성 설치
npm install
```

### 로컬 개발 서버 실행

```bash
# 개발 서버 시작 (기본적으로 http://localhost:3000에서 실행)
npm start
```

### 빌드

```bash
# 정적 파일로 빌드
npm run build
```

### 정적 콘텐츠 배포

GitHub Pages를 통해 배포할 수 있습니다:

```bash
npm run deploy
```

## GitHub Pages 배포 구성

`docusaurus.config.js` 파일에서 다음 필드를 업데이트하세요:

```js
url: 'https://your-github-username.github.io',
baseUrl: '/react-components-library/',
organizationName: 'your-github-username',
projectName: 'react-components-library',
```

## 문서 추가 및 수정

새 컴포넌트를 추가하려면:

1. `docs/components/` 디렉토리에 새 마크다운 파일 추가
2. `sidebars.js`에 새 문서 항목 추가
3. 필요한 경우 예제와 API 참조 정보 추가

## 라이센스

MIT 