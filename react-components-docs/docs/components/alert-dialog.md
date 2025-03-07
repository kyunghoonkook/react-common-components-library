---
sidebar_position: 2
---

# AlertDialog

중요한 의사 결정을 위한 모달 대화상자입니다. 사용자에게 정보를 제공하고 확인이나 취소 같은 선택을 요구합니다.

## 기본 사용법

```jsx
import { AlertDialog } from 'react-common-components-library';
import { useState } from 'react';

function AlertDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        계정 삭제
      </button>
      
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="계정을 삭제하시겠습니까?"
        description="계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다. 이 작업은 되돌릴 수 없습니다."
        cancelText="취소"
        confirmText="삭제"
        onConfirm={() => {
          console.log('계정 삭제 확인됨');
          setIsOpen(false);
        }}
      />
    </>
  );
}
```

## 위험한 작업 예제

위험한 작업을 위한 색상 및 스타일을 사용할 수 있습니다:

```jsx
import { AlertDialog } from 'react-common-components-library';
import { useState } from 'react';

function DangerAlertDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        데이터베이스 초기화
      </button>
      
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="데이터베이스를 초기화하시겠습니까?"
        description="모든 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        cancelText="취소"
        confirmText="초기화"
        variant="danger"
        onConfirm={() => {
          console.log('데이터베이스 초기화 확인됨');
          setIsOpen(false);
        }}
      />
    </>
  );
}
```

## 사용자 정의 내용

AlertDialog에 사용자 정의 내용을 포함할 수 있습니다:

```jsx
import { AlertDialog } from 'react-common-components-library';
import { useState } from 'react';

function CustomContentAlertDialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        고급 작업 실행
      </button>
      
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="작업 확인"
        description="아래에 'CONFIRM'을 입력하여 작업을 확인하세요."
        cancelText="취소"
        confirmText="확인"
        isConfirmDisabled={confirmCode !== 'CONFIRM'}
        onConfirm={() => {
          console.log('작업 확인됨');
          setIsOpen(false);
        }}
      >
        <div>
          <input
            type="text"
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
            placeholder="CONFIRM 입력"
          />
          {confirmCode !== 'CONFIRM' && confirmCode !== '' && (
            <p style={{ color: 'red' }}>
              'CONFIRM'을 정확히 입력하세요
            </p>
          )}
        </div>
      </AlertDialog>
    </>
  );
}
```

## API 참조

### AlertDialog Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `isOpen` | `boolean` | 필수 | 다이얼로그 열림 상태 |
| `onClose` | `() => void` | 필수 | 다이얼로그 닫기 핸들러 |
| `title` | `ReactNode` | 필수 | 다이얼로그 제목 |
| `description` | `ReactNode` | 필수 | 다이얼로그 설명 |
| `children` | `ReactNode` | - | 다이얼로그 내용 (description과 함께 사용 가능) |
| `cancelText` | `string` | '취소' | 취소 버튼 텍스트 |
| `confirmText` | `string` | '확인' | 확인 버튼 텍스트 |
| `onConfirm` | `() => void` | 필수 | 확인 버튼 클릭 핸들러 |
| `variant` | `'default' \| 'danger'` | 'default' | 다이얼로그 변형 (위험한 작업을 위한 스타일) |
| `isConfirmDisabled` | `boolean` | false | 확인 버튼 비활성화 여부 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `overlayClassName` | `string` | '' | 오버레이에 적용할 추가 CSS 클래스 |
| `titleClassName` | `string` | '' | 제목에 적용할 추가 CSS 클래스 |
| `contentClassName` | `string` | '' | 내용에 적용할 추가 CSS 클래스 |
| `footerClassName` | `string` | '' | 하단 영역에 적용할 추가 CSS 클래스 |
| `cancelButtonClassName` | `string` | '' | 취소 버튼에 적용할 추가 CSS 클래스 |
| `confirmButtonClassName` | `string` | '' | 확인 버튼에 적용할 추가 CSS 클래스 |

## 접근성

AlertDialog 컴포넌트는 접근성을 염두에 두고 설계되었습니다:

- 다이얼로그가 열릴 때 포커스가 다이얼로그로 이동합니다.
- ESC 키를 눌러 다이얼로그를 닫을 수 있습니다.
- 트랩 포커스를 사용하여 다이얼로그가 열려 있을 때 포커스가 다이얼로그 내에서만 이동하도록 합니다.
- 적절한 ARIA 속성을 사용하여 스크린 리더 호환성을 보장합니다.
- 색상 대비가 WCAG 지침을 준수합니다. 