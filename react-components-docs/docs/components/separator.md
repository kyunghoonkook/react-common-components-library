---
sidebar_position: 22
---

# Separator

콘텐츠 영역을 시각적으로 구분하는 수평 또는 수직 구분선을 제공하는 컴포넌트입니다.

## 특징

- 수평 및 수직 방향 지원
- 데코레이티브 모드 (더 두꺼운 구분선)
- 다양한 색상 변형 (기본, 프라이머리, 세컨더리, 성공, 위험, 경고)
- 점선 스타일 옵션
- 라이트/다크 테마 지원
- 자동 간격 조정 기능
- 접근성 지원 (ARIA 속성)

## 설치

```bash
npm install react-common-components-library
# 또는
yarn add react-common-components-library
```

## 사용법

```jsx
import { Separator } from 'react-common-components-library';
```

### 기본 사용법

```jsx
<div>
  <div>상단 콘텐츠</div>
  <Separator />
  <div>하단 콘텐츠</div>
</div>
```

### 수직 구분선

```jsx
<div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
  <div>왼쪽 콘텐츠</div>
  <Separator orientation="vertical" style={{ height: '80%', margin: '0 16px' }} />
  <div>오른쪽 콘텐츠</div>
</div>
```

### 데코레이티브 구분선

```jsx
<div>
  <h1>제목</h1>
  <p>부제목</p>
  <Separator decorative />
  <div>본문 내용</div>
</div>
```

### 다양한 색상 변형

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Separator variant="default" />
  <Separator variant="primary" />
  <Separator variant="secondary" />
  <Separator variant="success" />
  <Separator variant="danger" />
  <Separator variant="warning" />
</div>
```

### 점선 스타일

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Separator dashed />
  <Separator dashed variant="primary" />
</div>
```

### 테마 지원

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Separator theme="light" />
  <Separator theme="dark" />
</div>
```

### 간격 조정

```jsx
<div>
  <div>첫 번째 섹션</div>
  <Separator withSpacing spacing={24} />
  <div>두 번째 섹션</div>
</div>
```

### 실제 사용 예시

#### 헤더 구분선

```jsx
<header>
  <h1>웹사이트 제목</h1>
  <nav>
    <a href="#">홈</a>
    <a href="#">소개</a>
    <a href="#">서비스</a>
    <a href="#">연락처</a>
  </nav>
  <Separator variant="primary" withSpacing />
</header>
```

#### 메뉴 구분선

```jsx
<div className="menu">
  <div className="menu-item">홈</div>
  <div className="menu-item">프로필</div>
  <Separator withSpacing spacing={8} />
  <div className="menu-item">설정</div>
  <div className="menu-item">도움말</div>
  <Separator withSpacing spacing={8} />
  <div className="menu-item">로그아웃</div>
</div>
```

## API 참조

### Separator

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 구분선 방향 |
| `decorative` | `boolean` | `false` | 데코레이티브 여부 (더 두껍게 표시) |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'` | `'default'` | 구분선 색상 변형 |
| `dashed` | `boolean` | `false` | 점선 스타일 사용 여부 |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 테마 모드 |
| `withSpacing` | `boolean` | `false` | 구분선 위아래(또는 좌우) 간격 추가 여부 |
| `spacing` | `number` | `16` | 간격 크기 (px) |
| `className` | `string` | - | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `React.CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |
| `aria-label` | `string` | - | ARIA 레이블 (접근성) |
| `aria-labelledby` | `string` | - | ARIA 레이블 ID (접근성) |

## 접근성

Separator 컴포넌트는 WAI-ARIA 디자인 패턴을 준수합니다:

- 기본적으로 `role="separator"`를 사용하여 스크린 리더에게 구분선임을 알립니다.
- `decorative` 속성이 `true`로 설정된 경우, `role="none"`을 사용하여 스크린 리더가 무시하도록 합니다.
- 필요한 경우 `aria-label` 또는 `aria-labelledby`를 통해 추가 설명을 제공할 수 있습니다.

## 스타일 커스터마이징

Separator 컴포넌트는 다음과 같은 방법으로 스타일을 커스터마이징할 수 있습니다:

### CSS 클래스 사용

```jsx
<Separator className="custom-separator" />
```

```css
.custom-separator {
  border-color: purple;
  border-width: 2px;
}
```

### 인라인 스타일 사용

```jsx
<Separator 
  style={{ 
    borderColor: 'purple', 
    borderWidth: '2px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }} 
/>
```

### CSS 변수 사용

Separator 컴포넌트는 다음과 같은 CSS 변수를 지원합니다:

```jsx
<Separator 
  style={{ 
    '--separator-color': 'purple',
    '--separator-thickness': '2px',
    '--separator-spacing': '20px'
  }} 
/>
``` 