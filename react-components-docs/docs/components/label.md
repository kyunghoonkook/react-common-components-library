---
sidebar_position: 14
---

# Label

레이블 컴포넌트는 입력 필드나 체크박스 같은 사용자 인터페이스 요소에 설명을 제공합니다.

## 기본 사용법

레이블을 단독으로 사용할 수 있습니다.

```jsx
import { Label } from 'react-common-components-library';

function BasicExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="username">사용자명</Label>
      <input id="username" type="text" />
    </div>
  );
}
```

## 체크박스와 함께 사용

레이블 내에 체크박스를 포함할 수 있습니다.

```jsx
import { Label } from 'react-common-components-library';
import { useState } from 'react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <Label
      hasCheckbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      이용약관에 동의합니다
    </Label>
  );
}
```

## 필수 필드 표시

필수 입력 필드를 나타내기 위해 별표를 표시할 수 있습니다.

```jsx
import { Label } from 'react-common-components-library';

function RequiredExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="email" required>이메일</Label>
      <input id="email" type="email" required />
    </div>
  );
}
```

## 다양한 크기

Label 컴포넌트는 세 가지 크기를 제공합니다.

```jsx
import { Label } from 'react-common-components-library';

function SizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Label size="sm" hasCheckbox>작은 레이블</Label>
      <Label size="md" hasCheckbox>중간 레이블</Label>
      <Label size="lg" hasCheckbox>큰 레이블</Label>
    </div>
  );
}
```

## 에러 상태

에러 상태와 에러 메시지를 표시할 수 있습니다.

```jsx
import { Label } from 'react-common-components-library';
import { useState } from 'react';

function ErrorExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <Label
      hasCheckbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      error={!checked}
      errorMessage={!checked ? "계속하려면 동의해주세요" : undefined}
    >
      이용약관에 동의해주세요
    </Label>
  );
}
```

## 비활성화 상태

비활성화된 레이블을 표시할 수 있습니다.

```jsx
import { Label } from 'react-common-components-library';

function DisabledExample() {
  return (
    <Label hasCheckbox disabled>
      비활성화된 옵션
    </Label>
  );
}
```

## 이용 약관 동의 예제

이용 약관 동의를 위한 체크박스 레이블 예제입니다.

```jsx
import { Label } from 'react-common-components-library';
import { useState } from 'react';

function TermsAndConditionsExample() {
  const [accepted, setAccepted] = useState(false);
  
  return (
    <Label
      hasCheckbox
      checked={accepted}
      onChange={(e) => setAccepted(e.target.checked)}
      labelClassName="terms-label"
      checkboxClassName="terms-checkbox"
    >
      Accept terms and condition
    </Label>
  );
}
```

## 입력 필드와 함께 사용

다른 입력 컴포넌트와 함께 사용할 수 있습니다.

```jsx
import { Label, Input } from 'react-common-components-library';

function WithInputExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="name-input" required>이름</Label>
      <Input
        id="name-input"
        placeholder="이름을 입력하세요"
      />
    </div>
  );
}
```

## API 참조

### Label

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | 레이블 내용 |
| `hasCheckbox` | `boolean` | false | 체크박스 포함 여부 |
| `required` | `boolean` | false | 필수 필드 여부 (별표 표시) |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 레이블 크기 |
| `error` | `boolean` | false | 에러 상태 표시 |
| `errorMessage` | `string` | - | 에러 메시지 |
| `labelClassName` | `string` | '' | 레이블에 적용할 추가 클래스명 |
| `checkboxClassName` | `string` | '' | 체크박스에 적용할 추가 클래스명 |
| `checked` | `boolean` | - | 체크박스 상태 |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | - | 체크박스 상태 변경 핸들러 |
| `labelStyle` | `React.CSSProperties` | - | 레이블에 적용할 스타일 |
| `checkboxStyle` | `React.CSSProperties` | - | 체크박스에 적용할 스타일 |
| `htmlFor` | `string` | - | htmlFor 속성 (체크박스 ID 연결) |
| `id` | `string` | - | 체크박스 ID |
| `disabled` | `boolean` | false | 비활성화 상태 |

## 접근성

Label 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

1. **명시적 레이블 연결**: `htmlFor` 속성을 사용하여 레이블을 입력 요소와 명시적으로 연결합니다.

2. **암시적 레이블 연결**: 체크박스가 레이블 내부에 포함되어 있어 암시적으로 연결됩니다.

3. **키보드 접근성**: 체크박스는 키보드로 접근하고 토글할 수 있습니다.

4. **스크린 리더 지원**: 레이블 텍스트는 스크린 리더에서 체크박스에 대한 설명으로 사용됩니다.

5. **필수 필드 표시**: 필수 필드는 시각적으로 별표로 표시되며, 스크린 리더에도 필수 필드임을 알립니다.

6. **에러 상태 전달**: 에러 상태는 시각적인 스타일 변경과 에러 메시지를 통해 전달됩니다. 