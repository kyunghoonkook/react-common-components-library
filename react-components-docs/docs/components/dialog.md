---
sidebar_position: 10
---

# Dialog

사용자를 중요한 내용으로 중단시키고 응답을 기대하는 모달 다이얼로그입니다. 주의를 필요로 하는 중요한 정보를 표시하거나 사용자의 결정이 필요한 상황에서 사용합니다. 폼 레이아웃을 포함할 수 있어 프로필 편집과 같은 작업에도 적합합니다.

## 기본 사용법

```jsx
import { Dialog } from 'react-common-components-library';
import { useState } from 'react';

function BasicDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        다이얼로그 열기
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="다이얼로그 제목"
        description="이것은 기본 다이얼로그 내용입니다. 모달 형태로 표시되며 배경을 클릭하거나 ESC 키를 눌러 닫을 수 있습니다."
        footer={
          <div>
            <button onClick={() => setIsOpen(false)}>
              취소
            </button>
            <button 
              onClick={() => {
                alert('확인 버튼이 클릭되었습니다.');
                setIsOpen(false);
              }}
            >
              확인
            </button>
          </div>
        }
      >
        <p>다이얼로그 내용을 여기에 작성합니다.</p>
      </Dialog>
    </>
  );
}
```

## 폼 레이아웃 사용법

Dialog 컴포넌트는 프로필 편집과 같은 폼 레이아웃에 최적화되어 있습니다:

```jsx
import { Dialog, FormField } from 'react-common-components-library';
import { useState } from 'react';

function ProfileFormDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    username: '@johndoe'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`저장된 데이터: ${JSON.stringify(formData)}`);
    setIsOpen(false);
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        프로필 편집
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
        onSubmit={handleSubmit}
      >
        <FormField label="Name">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </FormField>
        
        <FormField label="Username">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </FormField>
      </Dialog>
    </>
  );
}
```

## 닫기 옵션 제어

배경 클릭이나 ESC 키로 다이얼로그를 닫는 기능을 제어할 수 있습니다:

```jsx
import { Dialog } from 'react-common-components-library';
import { useState } from 'react';

function ControlledClosingDialog() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        다이얼로그 열기
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="중요한 작업"
        description="이 다이얼로그는 배경 클릭이나 ESC 키로 닫을 수 없습니다."
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <p>이 작업을 완료하려면 아래 버튼을 클릭하세요.</p>
        <button onClick={() => setIsOpen(false)}>
          완료
        </button>
      </Dialog>
    </>
  );
}
```

## API 참조

### Dialog Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `isOpen` | `boolean` | 필수 | 다이얼로그 열림 상태 |
| `onClose` | `() => void` | 필수 | 다이얼로그 닫기 핸들러 |
| `title` | `ReactNode` | - | 다이얼로그 제목 |
| `description` | `ReactNode` | - | 다이얼로그 설명 또는 내용 |
| `children` | `ReactNode` | - | 다이얼로그 내용 (description과 함께 사용 가능) |
| `footer` | `ReactNode` | - | 하단 버튼 또는 액션 영역 |
| `submitText` | `string` | "Save changes" | 제출 버튼 텍스트 |
| `onSubmit` | `(e: React.FormEvent) => void` | - | 폼 제출 핸들러 |
| `closeOnOverlayClick` | `boolean` | true | 배경 클릭시 닫기 허용 여부 |
| `closeOnEsc` | `boolean` | true | ESC 키로 닫기 허용 여부 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `overlayClassName` | `string` | '' | 오버레이에 적용할 추가 CSS 클래스 |
| `titleClassName` | `string` | '' | 제목에 적용할 추가 CSS 클래스 |
| `contentClassName` | `string` | '' | 내용에 적용할 추가 CSS 클래스 |
| `footerClassName` | `string` | '' | 하단 영역에 적용할 추가 CSS 클래스 |
| `width` | `string` | - | 다이얼로그 너비 (px 또는 %) |
| `maxWidth` | `string` | '500px' | 다이얼로그 최대 너비 (px 또는 %) |
| `style` | `CSSProperties` | - | 다이얼로그 컨테이너에 적용할 스타일 |

### FormField Props

FormField 컴포넌트는 Dialog와 함께 사용하기 위한 레이블-입력 쌍을 제공합니다:

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `ReactNode` | 필수 | 필드 레이블 |
| `children` | `ReactNode` | 필수 | 필드 입력 요소 |
| `labelClassName` | `string` | '' | 레이블에 적용할 추가 CSS 클래스 |
| `className` | `string` | '' | 필드 컨테이너에 적용할 추가 CSS 클래스 |

## 접근성

Dialog 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 다이얼로그가 열릴 때 포커스가 다이얼로그로 이동합니다.
- 트랩 포커스를 사용하여 다이얼로그가 열려 있을 때 포커스가 다이얼로그 내에서만 이동하도록 합니다.
- ESC 키를 눌러 다이얼로그를 닫을 수 있습니다 (closeOnEsc가 true일 때).
- 적절한 ARIA 속성을 사용하여 스크린 리더 호환성을 보장합니다. 