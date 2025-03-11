---
sidebar_position: 21
---

# Select

Select 컴포넌트는 사용자가 미리 정의된 옵션 목록에서 선택할 수 있는 드롭다운 선택 인터페이스를 제공합니다. 카테고리별로 옵션을 그룹화하고, 개별 옵션의 비활성화를 지원하며, 다양한 스타일 옵션과 함께 접근성이 향상된 경험을 제공합니다.

## 기능

- 드롭다운 형태의 선택 인터페이스
- 단일 항목 선택 지원
- 카테고리별 옵션 그룹화
- 개별 옵션 비활성화 기능
- 시각적 포커스 및 선택 표시
- 키보드 접근성 지원
- 라이트/다크 테마 적용
- 반응형 디자인
- 제어/비제어 컴포넌트 모두 지원

## 설치

```bash
npm install @react-common-components/select
```

## 기본 사용법

```jsx
import { Select } from 'react-common-components-library';

function Demo() {
  return (
    <Select
      placeholder="옵션 선택"
      options={[
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
        { value: 'option4', label: '옵션 4' },
      ]}
      onChange={(value) => console.log('선택된 값:', value)}
    />
  );
}
```

## 예제

### 그룹화된 옵션

카테고리별로 옵션을 그룹화하여 정리된 형태로 표시할 수 있습니다.

```jsx
<Select
  placeholder="카테고리에서 선택"
  options={[
    {
      label: '과일',
      options: [
        { value: 'apple', label: '사과' },
        { value: 'banana', label: '바나나' },
        { value: 'blueberry', label: '블루베리' },
        { value: 'grapes', label: '포도' },
        { value: 'pineapple', label: '파인애플' },
      ],
    },
    {
      label: '채소',
      options: [
        { value: 'aubergine', label: '가지' },
        { value: 'broccoli', label: '브로콜리' },
        { value: 'carrot', label: '당근' },
        { value: 'leek', label: '파' },
      ],
    },
    {
      label: '육류',
      options: [
        { value: 'beef', label: '소고기' },
        { value: 'chicken', label: '닭고기' },
        { value: 'lamb', label: '양고기' },
      ],
    },
  ]}
  onChange={(value) => console.log('선택된 값:', value)}
/>
```

### 기본 선택 값 설정

`defaultValue` 속성을 사용하여 초기 선택 값을 설정할 수 있습니다.

```jsx
<Select
  placeholder="선택하세요"
  defaultValue="option2"
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ]}
  onChange={(value) => console.log('선택된 값:', value)}
/>
```

### 비활성화된 옵션

특정 옵션을 비활성화하여 선택할 수 없게 만들 수 있습니다.

```jsx
<Select
  placeholder="선택하세요"
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2', disabled: true },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4', disabled: true },
  ]}
  onChange={(value) => console.log('선택된 값:', value)}
/>
```

### 컴포넌트 비활성화

전체 Select 컴포넌트를 비활성화할 수 있습니다.

```jsx
<Select
  placeholder="비활성화됨"
  disabled={true}
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ]}
/>
```

### 다크 테마

다크 테마를 적용하여 어두운 배경에서 사용할 수 있습니다.

```jsx
<Select
  placeholder="다크 테마"
  theme="dark"
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ]}
  onChange={(value) => console.log('선택된 값:', value)}
/>
```

### 제어 컴포넌트로 사용

상태 관리를 통해 제어 컴포넌트로 사용할 수 있습니다.

```jsx
function ControlledDemo() {
  const [value, setValue] = React.useState('');
  
  return (
    <>
      <Select
        placeholder="제어 컴포넌트"
        value={value}
        options={[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
          { value: 'option3', label: '옵션 3' },
        ]}
        onChange={(newValue) => setValue(newValue)}
      />
      <div>선택된 값: {value}</div>
    </>
  );
}
```

### 드롭다운 높이 제한

`maxDropdownHeight` 속성을 사용하여 드롭다운 메뉴의 최대 높이를 제한할 수 있습니다.

```jsx
<Select
  placeholder="스크롤 가능한 드롭다운"
  maxDropdownHeight={200}
  options={Array.from({ length: 20 }, (_, i) => ({
    value: `option-${i + 1}`,
    label: `옵션 ${i + 1}`
  }))}
  onChange={(value) => console.log('선택된 값:', value)}
/>
```

## API

### Select

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| placeholder | string | '옵션 선택' | 기본적으로 표시할 플레이스홀더 텍스트 |
| value | string | - | 현재 선택된 값 (제어 컴포넌트로 사용 시) |
| defaultValue | string | - | 기본 선택 값 (비제어 컴포넌트로 사용 시) |
| options | (SelectOption \| SelectGroup)[] | [] | 선택 가능한 옵션 목록 또는 그룹화된 옵션 목록 |
| disabled | boolean | false | 컴포넌트 비활성화 여부 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 컴포넌트의 크기 |
| theme | 'light' \| 'dark' \| 'auto' | 'light' | 테마 모드 |
| onChange | (value: string) => void | - | 선택 시 호출될 콜백 함수 |
| onOpenChange | (open: boolean) => void | - | 드롭다운 열림/닫힘 시 호출될 콜백 함수 |
| className | string | - | 컴포넌트에 적용할 추가 CSS 클래스 |
| style | React.CSSProperties | - | 컴포넌트에 적용할 인라인 스타일 |
| required | boolean | false | 선택 필수 여부 |
| id | string | - | 컴포넌트 ID |
| name | string | - | 컴포넌트 이름 (폼 제출용) |
| maxDropdownHeight | number | - | 최대 드롭다운 높이 (px) |

### 타입

```typescript
interface SelectOption {
  /**
   * 옵션 값
   */
  value: string;
  
  /**
   * 옵션 레이블
   */
  label: string;
  
  /**
   * 옵션 비활성화 여부
   */
  disabled?: boolean;
}

interface SelectGroup {
  /**
   * 그룹 레이블
   */
  label: string;
  
  /**
   * 그룹 내 옵션 목록
   */
  options: SelectOption[];
}
```

## 접근성

Select 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 적절한 WAI-ARIA 역할 및 속성 (combobox, listbox, option)
- 키보드 탐색 지원 (Tab, Space, Enter, 화살표 키)
- 스크린 리더 호환성
- 고대비 모드 지원
- 비활성화된 상태에 대한 시각적 및 프로그래밍적 표시

## 스타일 커스터마이징

Select 컴포넌트는 다양한 CSS 클래스를 제공하여 스타일을 커스터마이징할 수 있습니다.

```css
/* 예시: 커스텀 스타일 */
.my-select .select-trigger {
  background-color: #f8f9fa;
  border-color: #dfe2e5;
  border-radius: 4px;
}

.my-select .select-item-selected {
  background-color: #e6f7ff;
}

.my-select .select-item:hover:not(.select-item-disabled) {
  background-color: #f1f5f9;
}
```

```jsx
<Select
  className="my-select"
  placeholder="커스텀 스타일"
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ]}
/>
``` 