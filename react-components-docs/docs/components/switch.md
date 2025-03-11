---
sidebar_position: 24
---

# Switch

Switch 컴포넌트는 사용자가 설정을 켜거나 끄는 상태를 토글할 수 있게 합니다.

## 가져오기

```jsx
import { Switch } from 'react-common-components-library';
```

## 기본 사용법

```jsx
<Switch>비행기 모드</Switch>
```

## 켜진 상태

```jsx
<Switch checked>비행기 모드 켜짐</Switch>
```

## 비활성화 상태

```jsx
<Switch disabled>비활성화된 스위치</Switch>
<Switch disabled checked>비활성화된 켜진 스위치</Switch>
```

## 에러 상태

```jsx
<Switch error>에러 상태</Switch>
```

## 크기 변형

```jsx
<Switch size="sm">작은 크기</Switch>
<Switch size="md">중간 크기</Switch>
<Switch size="lg">큰 크기</Switch>
```

## 제어 컴포넌트 사용

```jsx
function ControlledSwitchExample() {
  const [checked, setChecked] = React.useState(false);
  
  return (
    <Switch
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      {checked ? '켜짐' : '꺼짐'}
    </Switch>
  );
}
```

## 속성

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 스위치 레이블 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 스위치 크기 |
| `error` | `boolean` | `false` | 에러 상태 표시 |
| `checked` | `boolean` | - | 스위치 체크 상태 (제어 컴포넌트로 사용할 때) |
| `defaultChecked` | `boolean` | - | 스위치 기본 체크 상태 (비제어 컴포넌트로 사용할 때) |
| `disabled` | `boolean` | `false` | 스위치 비활성화 여부 |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | 스위치 상태 변경 시 호출될 콜백 함수 |
| `className` | `string` | - | 루트 요소에 적용할 CSS 클래스 |
| `wrapperClassName` | `string` | - | 스위치 컨테이너에 적용할 CSS 클래스 | 