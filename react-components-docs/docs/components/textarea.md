---
sidebar_position: 26
---

# Textarea

Textarea 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 인터페이스를 제공합니다.

## 가져오기

```jsx
import { Textarea } from 'react-common-components-library';
```

## 기본 사용법

```jsx
<Textarea placeholder="텍스트를 입력하세요..." />
```

## 레이블 사용

```jsx
<Textarea
  label="코멘트"
  placeholder="코멘트를 입력하세요..."
/>
```

## 설명 텍스트 추가

```jsx
<Textarea
  label="자기 소개"
  description="간단한 자기 소개를 작성해 주세요."
  placeholder="자기 소개를 입력하세요..."
/>
```

## 에러 상태

```jsx
<Textarea
  label="바이오"
  placeholder="자기 소개를 입력하세요..."
  error={true}
  errorMessage="바이오는 필수 입력 항목입니다."
/>
```

## 비활성화 상태

```jsx
<Textarea
  label="코멘트"
  disabled
  value="이 텍스트는 수정할 수 없습니다."
/>
```

## 자동 크기 조절

입력 내용에 따라 높이가 자동으로 조절됩니다.

```jsx
<Textarea
  label="자동 크기 조절"
  placeholder="텍스트를 입력하면 높이가 자동으로 조절됩니다..."
  autoResize
  rows={2}
  maxHeight={200}
/>
```

## 크기 변형

```jsx
<Textarea
  label="작은 크기"
  placeholder="작은 크기 텍스트 영역..."
  size="sm"
/>

<Textarea
  label="중간 크기"
  placeholder="중간 크기 텍스트 영역..."
  size="md"
/>

<Textarea
  label="큰 크기"
  placeholder="큰 크기 텍스트 영역..."
  size="lg"
/>
```

## 속성

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 텍스트 영역 크기 |
| `error` | `boolean` | `false` | 에러 상태 표시 |
| `errorMessage` | `string` | - | 에러 메시지 |
| `label` | `string` | - | 레이블 |
| `description` | `string` | - | 설명 텍스트 |
| `className` | `string` | - | 텍스트 영역에 적용할 CSS 클래스 |
| `containerClassName` | `string` | - | 컨테이너에 적용할 CSS 클래스 |
| `maxHeight` | `number` | - | 최대 높이 (px) |
| `autoResize` | `boolean` | `false` | 자동 크기 조절 여부 |
| `rows` | `number` | `3` | 표시할 줄 수 |
| `value` | `string` | - | 텍스트 영역 값 (제어 컴포넌트로 사용 시) |
| `defaultValue` | `string` | - | 초기 값 (비제어 컴포넌트로 사용 시) |
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `onChange` | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | - | 값 변경 시 호출될 함수 |
| `onBlur` | `(e: FocusEvent<HTMLTextAreaElement>) => void` | - | 포커스를 잃을 때 호출될 함수 | 