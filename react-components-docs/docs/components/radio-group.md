---
sidebar_position: 19
---

# RadioGroup

RadioGroup 컴포넌트는 상호 배타적인 옵션 중 하나를 선택할 수 있는 라디오 버튼 그룹을 제공합니다. 사용자가 여러 옵션 중 하나만 선택해야 하는 경우에 적합합니다.

## 기본 사용법

RadioGroup 컴포넌트는 `RadioGroup`과 `RadioGroup.Item`을 함께 사용하는 복합 컴포넌트입니다.

```jsx
import { RadioGroup } from 'react-common-components-library';
import { useState } from 'react';

function Example() {
  const [value, setValue] = useState('default');
  
  return (
    <RadioGroup value={value} onChange={setValue}>
      <RadioGroup.Item value="default">Default</RadioGroup.Item>
      <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
      <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
    </RadioGroup>
  );
}
```

## 가로 방향 정렬

기본적으로 RadioGroup은 세로 방향으로 정렬되지만, `orientation` 속성을 사용하여 가로 방향으로 배치할 수 있습니다.

```jsx
<RadioGroup 
  value={value} 
  onChange={setValue} 
  orientation="horizontal"
>
  <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
  <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
  <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
</RadioGroup>
```

## 크기 변형

RadioGroup은 세 가지 크기 옵션을 제공합니다: 작음(sm), 중간(md), 큼(lg)

```jsx
// 작은 크기
<RadioGroup value="small" size="sm">
  <RadioGroup.Item value="small">Small</RadioGroup.Item>
</RadioGroup>

// 중간 크기 (기본값)
<RadioGroup value="medium" size="md">
  <RadioGroup.Item value="medium">Medium</RadioGroup.Item>
</RadioGroup>

// 큰 크기
<RadioGroup value="large" size="lg">
  <RadioGroup.Item value="large">Large</RadioGroup.Item>
</RadioGroup>
```

## 비활성화

전체 RadioGroup 또는 개별 RadioGroup.Item을 비활성화할 수 있습니다.

```jsx
// 전체 라디오 그룹 비활성화
<RadioGroup value="option1" disabled>
  <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
  <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
</RadioGroup>

// 개별 라디오 아이템 비활성화
<RadioGroup value="option1">
  <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
  <RadioGroup.Item value="option2" disabled>Option 2</RadioGroup.Item>
  <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
</RadioGroup>
```

## 폼 내에서 사용

RadioGroup은 폼 내에서 쉽게 사용할 수 있습니다.

```jsx
function FormExample() {
  const [formData, setFormData] = useState({ preference: 'default' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`선택된 옵션: ${formData.preference}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>선호 옵션:</label>
        <RadioGroup 
          value={formData.preference} 
          onChange={(value) => setFormData({...formData, preference: value})}
          name="preference"
        >
          <RadioGroup.Item value="default">Default</RadioGroup.Item>
          <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
          <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
        </RadioGroup>
      </div>
      
      <button type="submit">제출</button>
    </form>
  );
}
```

## 비제어 컴포넌트

RadioGroup은 비제어 방식으로도 사용할 수 있습니다.

```jsx
<RadioGroup defaultValue="comfortable">
  <RadioGroup.Item value="default">Default</RadioGroup.Item>
  <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
  <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
</RadioGroup>
```

## API

### RadioGroup

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | - | 선택된 라디오 버튼의 값 |
| `defaultValue` | `string` | - | 기본 선택값 |
| `onChange` | `(value: string) => void` | - | 값이 변경될 때 호출되는 함수 |
| `name` | `string` | 자동 생성 | 라디오 그룹의 이름 |
| `children` | `ReactNode` | 필수 | 라디오 버튼들 |
| `disabled` | `boolean` | false | 모든 라디오 버튼 비활성화 여부 |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 라디오 버튼 크기 |
| `orientation` | `'horizontal' \| 'vertical'` | 'vertical' | 라디오 버튼 방향 |
| `className` | `string` | - | 라디오 그룹에 적용할 CSS 클래스 |
| `style` | `CSSProperties` | - | 라디오 그룹에 적용할 스타일 |

### RadioGroup.Item

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string` | 필수 | 라디오 아이템의 값 |
| `children` | `ReactNode` | 필수 | 라디오 아이템 레이블 |
| `disabled` | `boolean` | false | 비활성화 여부 |
| `className` | `string` | - | 라디오 아이템에 적용할 CSS 클래스 |
| `labelClassName` | `string` | - | 라벨에 적용할 CSS 클래스 |

## 접근성

RadioGroup 컴포넌트는 접근성을 고려하여 설계되었습니다:

### 키보드 접근성

- `Tab`: RadioGroup 컴포넌트로 포커스를 이동합니다.
- `Space`: 현재 포커스된 라디오 버튼을 선택합니다.
- `방향키(상/하 또는 좌/우)`: 라디오 그룹 내에서 다음/이전 라디오 버튼으로 포커스를 이동하고 자동으로 해당 버튼을 선택합니다.

### ARIA 속성

RadioGroup 컴포넌트는 다음 ARIA 속성을 사용합니다:

- `role="radiogroup"`: RadioGroup 컴포넌트에 적용되어 스크린 리더에게 라디오 버튼 그룹임을 알립니다.
- `role="radio"`: 각 RadioGroup.Item에 적용됩니다.
- `aria-checked`: 선택된 상태에 따라 true 또는 false 값을 가집니다.
- `aria-disabled`: 비활성화된 상태에 따라 true 또는 false 값을 가집니다.

### 스크린 리더 호환성

RadioGroup 컴포넌트는 스크린 리더와 호환되도록 구현되었습니다. 각 RadioGroup.Item 요소는 명확한 레이블을 가지며, 선택 상태는 스크린 리더에 적절하게 전달됩니다.

### 시각적 포커스 표시

키보드로 탐색할 때 포커스된 요소를 시각적으로 구분할 수 있도록 포커스 링이 표시됩니다. 이는 키보드 사용자가 현재 포커스된 요소를 식별하는 데 도움이 됩니다. 