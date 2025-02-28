# React Common Components Library

유용한 React 컴포넌트를 포함한 모던하고 접근성 높은 컴포넌트 라이브러리입니다.

## 설치

npm을 사용하여 패키지를 설치합니다:

```bash
npm install react-common-components-library
```

또는 yarn을 사용:

```bash
yarn add react-common-components-library
```

## 컴포넌트

### 1. Accordion

접을 수 있는 콘텐츠 패널을 제공하는 컴포넌트입니다.

#### 사용법

```jsx
import { Accordion } from 'react-common-components-library';

function App() {
  // 기본 사용법
  const items = [
    {
      title: "섹션 1",
      content: "섹션 1의 내용입니다."
    },
    {
      title: "섹션 2",
      content: "섹션 2의 내용입니다."
    }
  ];

  // 커스텀 아이콘 예제
  const customIcon = (isOpen) => (
    <span>{isOpen ? '📖' : '📘'}</span>
  );

  return (
    <div>
      {/* 기본 사용법 */}
      <Accordion items={items} className="custom-accordion" />
      
      {/* 다중 선택 사용법 */}
      <Accordion 
        items={items} 
        allowMultiple 
        defaultExpanded={[0]} 
      />
      
      {/* 커스텀 스타일 예제 */}
      <Accordion 
        items={items}
        titleClassName="custom-title"
        contentClassName="custom-content"
        itemClassName="custom-item"
        disableAnimation={true}
        itemGap={10}
      />
      
      {/* 커스텀 아이콘 예제 */}
      <Accordion 
        items={items}
        customIcon={customIcon}
      />
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | `Array<{title: ReactNode, content: ReactNode}>` | 필수 | 아코디언 항목 목록 |
| `titleStyle` | `CSSProperties` | - | 제목 스타일 |
| `contentStyle` | `CSSProperties` | - | 내용 스타일 |
| `style` | `CSSProperties` | - | 컨테이너 스타일 |
| `className` | `string` | '' | 아코디언 컨테이너에 적용할 추가 CSS 클래스 |
| `titleClassName` | `string` | '' | 아코디언 제목에 적용할 추가 CSS 클래스 |
| `contentClassName` | `string` | '' | 아코디언 내용에 적용할 추가 CSS 클래스 |
| `itemClassName` | `string` | '' | 아코디언 항목에 적용할 추가 CSS 클래스 |
| `iconClassName` | `string` | '' | 아코디언 화살표 아이콘에 적용할 추가 CSS 클래스 |
| `customIcon` | `(isOpen: boolean) => ReactNode` | - | 커스텀 화살표 아이콘 컴포넌트 |
| `disableAnimation` | `boolean` | false | 애니메이션 비활성화 여부 |
| `allowMultiple` | `boolean` | false | 여러 항목을 동시에 열 수 있는지 여부 |
| `defaultExpanded` | `number \| number[]` | - | 기본적으로 펼쳐진 항목의 인덱스 또는 인덱스 배열 |
| `onItemClick` | `(index: number, isOpen: boolean) => void` | - | 항목을 클릭할 때 호출되는 함수 |
| `itemGap` | `number` | 1 | 항목 간 간격 (픽셀) |
| `itemStyle` | `CSSProperties` | - | 아코디언 항목 스타일 |
| `iconStyle` | `CSSProperties` | - | 아이콘 스타일 |

### 2. AlertDialog

모달 형태의 경고 대화 상자를 제공하는 컴포넌트입니다.

#### 사용법

```jsx
import { AlertDialog } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>대화 상자 열기</button>
      
      <AlertDialog 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="정말 삭제하시겠습니까?"
        description="이 작업은 취소할 수 없으며 데이터가 영구적으로 삭제됩니다."
        cancelText="취소"
        confirmText="삭제"
        onConfirm={() => console.log('삭제됨')}
        className="custom-dialog"
        overlayClassName="custom-overlay"
      />
    </>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `isOpen` | `boolean` | 필수 | 대화 상자 표시 여부 |
| `onClose` | `() => void` | 필수 | 닫기 핸들러 |
| `title` | `ReactNode` | "Are you sure absolutely sure?" | 제목 |
| `description` | `ReactNode` | "This action cannot be undone..." | 설명 |
| `cancelText` | `string` | "Cancel" | 취소 버튼 텍스트 |
| `confirmText` | `string` | "Continue" | 확인 버튼 텍스트 |
| `onCancel` | `() => void` | - | 취소 버튼 클릭 핸들러 |
| `onConfirm` | `() => void` | - | 확인 버튼 클릭 핸들러 |
| `style` | `CSSProperties` | - | 대화 상자 스타일 |
| `titleStyle` | `CSSProperties` | - | 제목 스타일 |
| `descriptionStyle` | `CSSProperties` | - | 설명 스타일 |
| `actionsStyle` | `CSSProperties` | - | 버튼 영역 스타일 |
| `cancelButtonStyle` | `CSSProperties` | - | 취소 버튼 스타일 |
| `confirmButtonStyle` | `CSSProperties` | - | 확인 버튼 스타일 |
| `overlayStyle` | `CSSProperties` | - | 오버레이 스타일 |
| `className` | `string` | '' | 대화 상자에 적용할 추가 CSS 클래스 |
| `overlayClassName` | `string` | '' | 오버레이에 적용할 추가 CSS 클래스 |

### 3. AspectRatio

지정된 가로세로 비율을 유지하는 컨테이너를 제공하는 컴포넌트입니다.

#### 사용법

```jsx
import { AspectRatio } from 'react-common-components-library';

function App() {
  return (
    <div style={{ width: '300px' }}>
      <AspectRatio ratio={16} heightRatio={9}>
        <img 
          src="https://example.com/image.jpg" 
          alt="예시 이미지"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </AspectRatio>
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `ratio` | `number` | 필수 | 가로 비율 |
| `heightRatio` | `number` | 1 | 세로 비율 |
| `children` | `ReactNode` | 필수 | 컨테이너 내부에 표시될 콘텐츠 |
| `className` | `string` | - | 추가 CSS 클래스 |

### 4. Avatar

사용자 프로필 이미지나 이니셜을 표시하는 컴포넌트입니다.

#### 사용법

```jsx
import { Avatar } from 'react-common-components-library';

function App() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* 이미지가 있는 아바타 */}
      <Avatar 
        src="https://example.com/avatar.jpg" 
        alt="사용자 이름"
        size="md"
      />
      
      {/* 이미지 없이 이니셜을 표시하는 아바타 */}
      <Avatar 
        alt="홍길동"
        size="lg"
        shape="square"
        online={true}
      />
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `src` | `string` | - | 아바타에 표시할 이미지 URL |
| `alt` | `string` | '' | 이미지가 없을 경우 표시할 대체 텍스트 (이니셜) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 'md' | 아바타 크기 |
| `shape` | `'circle' \| 'square'` | 'circle' | 아바타 모양 |
| `bordered` | `boolean` | false | 아바타 테두리 표시 여부 |
| `online` | `boolean` | false | 온라인 상태 표시 여부 |
| `className` | `string` | - | 추가 CSS 클래스 |

### 5. Button

다양한 스타일과 기능을 가진 버튼 컴포넌트입니다.

#### 사용법

```jsx
import { Button } from 'react-common-components-library';

function App() {
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <Button variant="primary" onClick={() => alert('클릭됨')}>
        기본 버튼
      </Button>
      
      <Button 
        variant="secondary" 
        size="lg" 
        fullWidth={true}
      >
        크고 넓은 버튼
      </Button>
      
      <Button 
        variant="outline"
        leftIcon={<span>←</span>}
      >
        이전으로
      </Button>
      
      <Button 
        variant="ghost"
        rightIcon={<span>→</span>}
      >
        다음으로
      </Button>
      
      <Button 
        variant="primary"
        isLoading={true}
      >
        로딩 중
      </Button>
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | 버튼 내용 |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | 'primary' | 버튼 디자인 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 버튼 크기 |
| `fullWidth` | `boolean` | false | 버튼을 최대 너비로 확장할지 여부 |
| `isLoading` | `boolean` | false | 로딩 상태 표시 여부 |
| `leftIcon` | `ReactNode` | - | 버튼 왼쪽에 표시할 아이콘 |
| `rightIcon` | `ReactNode` | - | 버튼 오른쪽에 표시할 아이콘 |
| `className` | `string` | - | 추가 CSS 클래스 |
| + 기본 버튼 속성 | `ButtonHTMLAttributes<HTMLButtonElement>` | - | onClick, disabled 등 |

### 6. Checkbox

사용자가 하나 이상의 항목을 목록에서 선택할 수 있는 체크박스 컴포넌트입니다.

#### 사용법

```jsx
import { Checkbox } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Checkbox 
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        이용 약관에 동의합니다
      </Checkbox>
      
      <Checkbox disabled>
        비활성화된 체크박스
      </Checkbox>
      
      <Checkbox indeterminate>
        부분 선택된 체크박스
      </Checkbox>
      
      <Checkbox error>
        에러 상태 체크박스
      </Checkbox>
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 체크박스 라벨 |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 체크박스 크기 |
| `indeterminate` | `boolean` | false | 체크박스 인디터미네이트(부분 선택) 상태 |
| `error` | `boolean` | false | 에러 상태 표시 |
| `className` | `string` | '' | 체크박스 입력에 적용할 추가 CSS 클래스 |
| `wrapperClassName` | `string` | '' | 체크박스 컨테이너에 적용할 추가 CSS 클래스 |
| + 기본 input 속성 | `InputHTMLAttributes<HTMLInputElement>` | - | checked, onChange, disabled 등 |

### 7. Collapsible

첫 번째 항목은 항상 표시하고 나머지 항목들은 토글 버튼으로 표시/숨김을 제어할 수 있는 컴포넌트입니다.

#### 사용법

```jsx
import { Collapsible } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: '400px' }}>
      {/* 기본 사용법 */}
      <Collapsible 
        title="저장된 리포지토리"
        firstItem="@radix-ui/primitives"
        restItems={[
          "@radix-ui/colors",
          "@stitches/react",
          "@tailwindcss/ui"
        ]}
      />
      
      {/* 제어 컴포넌트 */}
      <Collapsible
        title="제어 컴포넌트 예제"
        firstItem="항상 표시되는 첫 번째 항목"
        restItems={[
          "제어되는 항목 1",
          "제어되는 항목 2",
          "제어되는 항목 3"
        ]}
        open={open}
        onOpenChange={setOpen}
      />

      {/* 커스텀 스타일링 */}
      <Collapsible
        title="커스텀 스타일 예제"
        firstItem="커스텀 첫 번째 항목"
        restItems={[
          "커스텀 항목 1",
          "커스텀 항목 2"
        ]}
        titleClassName="custom-title"
        firstItemClassName="custom-first-item"
        itemClassName="custom-item"
        toggleClassName="custom-toggle"
        disableAnimation={true}
        itemGap={20}
      />

      {/* 커스텀 화살표 */}
      <Collapsible
        title="커스텀 화살표 예제"
        firstItem="커스텀 화살표 항목"
        restItems={["항목 1", "항목 2"]}
        customUpArrow={<span>▲</span>}
        customDownArrow={<span>▼</span>}
      />
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `ReactNode` | 필수 | 컴포넌트 제목 |
| `firstItem` | `ReactNode` | 필수 | 항상 표시되는 첫 번째 항목 |
| `restItems` | `ReactNode[]` | 필수 | 토글로 표시/숨김 가능한 나머지 항목들 |
| `defaultOpen` | `boolean` | false | 초기 열림 상태 |
| `open` | `boolean` | - | 외부에서 제어할 경우 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태가 변경될 때 호출되는 콜백 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `titleClassName` | `string` | '' | 제목에 적용할 추가 CSS 클래스 |
| `toggleClassName` | `string` | '' | 토글 버튼에 적용할 추가 CSS 클래스 |
| `firstItemClassName` | `string` | '' | 첫 번째 항목에 적용할 추가 CSS 클래스 |
| `itemClassName` | `string` | '' | 나머지 항목들에 적용할 추가 CSS 클래스 |
| `arrowClassName` | `string` | '' | 화살표에 적용할 추가 CSS 클래스 |
| `customUpArrow` | `ReactNode` | - | 커스텀 위쪽 화살표 요소 |
| `customDownArrow` | `ReactNode` | - | 커스텀 아래쪽 화살표 요소 |
| `disableAnimation` | `boolean` | false | 애니메이션 비활성화 여부 |
| `itemGap` | `number` | 12 | 항목 간 간격 (픽셀) |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |
| `titleStyle` | `CSSProperties` | - | 제목에 적용할 인라인 스타일 |
| `toggleStyle` | `CSSProperties` | - | 토글 버튼에 적용할 인라인 스타일 |
| `firstItemStyle` | `CSSProperties` | - | 첫 번째 항목에 적용할 인라인 스타일 |
| `itemStyle` | `CSSProperties` | - | 나머지 항목들에 적용할 인라인 스타일 |

## TypeScript 지원

이 라이브러리는 TypeScript로 작성되었으며 모든 컴포넌트에 대한 타입 정의를 제공합니다.

```tsx
import { Button, ButtonProps } from 'react-common-components-library';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 라이센스

MIT 라이센스로 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.
