---
sidebar_position: 6
---

# Checkbox

사용자가 여러 옵션 중에서 하나 이상을 선택할 수 있는 체크박스 컴포넌트입니다.

## 기본 사용법

```jsx
import { Checkbox } from 'react-common-components-library';

function CheckboxExample() {
  return (
    <Checkbox>이용약관에 동의합니다</Checkbox>
  );
}
```

## 다양한 상태

체크박스는 다양한 상태를 지원합니다:

```jsx
import { Checkbox } from 'react-common-components-library';
import { useState } from 'react';

function CheckboxStatesExample() {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* 기본 상태 */}
      <Checkbox>기본 체크박스</Checkbox>
      
      {/* 체크된 상태 */}
      <Checkbox defaultChecked>체크된 체크박스</Checkbox>
      
      {/* 비활성화 상태 */}
      <Checkbox isDisabled>비활성화 체크박스</Checkbox>
      
      {/* 비활성화 + 체크된 상태 */}
      <Checkbox isDisabled defaultChecked>비활성화 + 체크된 체크박스</Checkbox>
      
      {/* 불확실한 상태 */}
      <Checkbox isIndeterminate>불확실한 체크박스</Checkbox>
      
      {/* 제어 컴포넌트 */}
      <Checkbox 
        isChecked={isChecked} 
        onChange={(e) => setIsChecked(e.target.checked)}
      >
        {isChecked ? '체크됨' : '체크되지 않음'}
      </Checkbox>
    </div>
  );
}
```

## 체크박스 그룹

여러 체크박스를 그룹으로 관리할 수 있습니다:

```jsx
import { CheckboxGroup, Checkbox } from 'react-common-components-library';
import { useState } from 'react';

function CheckboxGroupExample() {
  const [value, setValue] = useState(['apple']);
  
  return (
    <CheckboxGroup 
      value={value} 
      onChange={setValue}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox value="apple">사과</Checkbox>
        <Checkbox value="banana">바나나</Checkbox>
        <Checkbox value="orange">오렌지</Checkbox>
      </div>
    </CheckboxGroup>
  );
}
```

## 부모-자식 관계 체크박스

부모 체크박스와 자식 체크박스 간의 관계를 구현할 수 있습니다:

```jsx
import { Checkbox } from 'react-common-components-library';
import { useState, useEffect } from 'react';

function ParentChildCheckboxExample() {
  const [parentChecked, setParentChecked] = useState(false);
  const [parentIndeterminate, setParentIndeterminate] = useState(false);
  
  const [child1, setChild1] = useState(false);
  const [child2, setChild2] = useState(false);
  const [child3, setChild3] = useState(false);
  
  // 자식 체크박스 상태에 따라 부모 체크박스 상태 업데이트
  useEffect(() => {
    const allChecked = child1 && child2 && child3;
    const someChecked = child1 || child2 || child3;
    
    setParentChecked(allChecked);
    setParentIndeterminate(someChecked && !allChecked);
  }, [child1, child2, child3]);
  
  // 부모 체크박스 변경 시 모든 자식 체크박스 상태 업데이트
  const handleParentChange = (e) => {
    const isChecked = e.target.checked;
    setParentChecked(isChecked);
    setParentIndeterminate(false);
    setChild1(isChecked);
    setChild2(isChecked);
    setChild3(isChecked);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox 
        isChecked={parentChecked}
        isIndeterminate={parentIndeterminate}
        onChange={handleParentChange}
      >
        모든 항목 선택
      </Checkbox>
      
      <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox 
          isChecked={child1}
          onChange={(e) => setChild1(e.target.checked)}
        >
          항목 1
        </Checkbox>
        
        <Checkbox 
          isChecked={child2}
          onChange={(e) => setChild2(e.target.checked)}
        >
          항목 2
        </Checkbox>
        
        <Checkbox 
          isChecked={child3}
          onChange={(e) => setChild3(e.target.checked)}
        >
          항목 3
        </Checkbox>
      </div>
    </div>
  );
}
```

## 커스텀 스타일

체크박스의 스타일을 커스터마이징할 수 있습니다:

```jsx
import { Checkbox } from 'react-common-components-library';

function CustomCheckboxExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox 
        colorScheme="red"
        size="lg"
      >
        빨간색 큰 체크박스
      </Checkbox>
      
      <Checkbox 
        colorScheme="green"
        size="md"
      >
        녹색 중간 체크박스
      </Checkbox>
      
      <Checkbox 
        colorScheme="purple"
        size="sm"
      >
        보라색 작은 체크박스
      </Checkbox>
    </div>
  );
}
```

## API 참조

### Checkbox Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 체크박스 레이블 |
| `isChecked` | `boolean` | - | 체크박스의 체크 상태 (제어 컴포넌트) |
| `defaultChecked` | `boolean` | false | 초기 체크 상태 (비제어 컴포넌트) |
| `isIndeterminate` | `boolean` | false | 불확실한 상태 표시 여부 |
| `isDisabled` | `boolean` | false | 체크박스 비활성화 여부 |
| `isRequired` | `boolean` | false | 필수 입력 여부 |
| `isInvalid` | `boolean` | false | 유효하지 않은 상태 표시 여부 |
| `value` | `string \| number` | - | 체크박스 값 (CheckboxGroup에서 사용) |
| `name` | `string` | - | 체크박스 이름 (폼 제출 시 사용) |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | 체크 상태 변경 시 호출되는 함수 |
| `onBlur` | `(event: FocusEvent<HTMLInputElement>) => void` | - | 포커스를 잃을 때 호출되는 함수 |
| `onFocus` | `(event: FocusEvent<HTMLInputElement>) => void` | - | 포커스를 얻을 때 호출되는 함수 |
| `colorScheme` | `string` | 'blue' | 체크박스 색상 스키마 |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 체크박스 크기 |
| `spacing` | `string \| number` | '0.5rem' | 체크박스와 레이블 사이의 간격 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### CheckboxGroup Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | Checkbox 컴포넌트를 포함하는 React 노드 |
| `value` | `Array<string \| number>` | - | 선택된 체크박스 값 배열 (제어 컴포넌트) |
| `defaultValue` | `Array<string \| number>` | [] | 초기 선택된 체크박스 값 배열 (비제어 컴포넌트) |
| `onChange` | `(value: Array<string \| number>) => void` | - | 선택 항목 변경 시 호출되는 함수 |
| `isDisabled` | `boolean` | false | 그룹 내 모든 체크박스 비활성화 여부 |
| `name` | `string` | - | 그룹 내 모든 체크박스의 이름 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

## 접근성

Checkbox 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 기본적으로 `<input type="checkbox">` 요소를 사용하여 스크린 리더 호환성을 보장합니다.
- 레이블과 체크박스는 적절히 연결되어 있어 레이블을 클릭해도 체크박스가 토글됩니다.
- 불확실한 상태(indeterminate)는 `aria-checked="mixed"`로 표시됩니다.
- 비활성화된 체크박스는 `aria-disabled="true"`로 표시됩니다.
- 필수 체크박스는 `aria-required="true"`로 표시됩니다.
- 키보드 사용자는 Tab 키로 체크박스에 접근하고 Space 키로 토글할 수 있습니다. 