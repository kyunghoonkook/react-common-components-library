# React Common Components Library

모던하고 접근성 높은 React 컴포넌트 라이브러리입니다.

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

### 8. Command

키보드 중심의 명령어 팔레트 컴포넌트로, macOS Spotlight 또는 VSCode 명령어 팔레트와 유사한 인터페이스를 제공합니다.

#### 사용법

```jsx
import { Command } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 명령어 그룹 정의
  const commandGroups = [
    {
      label: '자주 사용하는 기능',
      items: [
        {
          id: 'calendar',
          label: '캘린더',
          icon: <CalendarIcon />, // 적절한 아이콘 컴포넌트 사용
          onSelect: () => console.log('캘린더 선택됨'),
        },
        {
          id: 'calculator',
          label: '계산기',
          icon: <CalculatorIcon />, // 적절한 아이콘 컴포넌트 사용
          onSelect: () => console.log('계산기 선택됨'),
        },
      ],
    },
    {
      label: '설정',
      items: [
        {
          id: 'profile',
          label: '프로필',
          shortcut: '⌘P',
          icon: <ProfileIcon />, // 적절한 아이콘 컴포넌트 사용
          onSelect: () => console.log('프로필 선택됨'),
        },
        {
          id: 'settings',
          label: '설정',
          shortcut: '⌘S',
          icon: <SettingsIcon />, // 적절한 아이콘 컴포넌트 사용
          onSelect: () => console.log('설정 선택됨'),
        },
      ],
    },
  ];
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        명령어 팔레트 열기
      </button>
      
      <Command
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        groups={commandGroups}
        placeholder="명령어 입력 또는 검색..."
      />
    </>
  );
}

// 아이콘 컴포넌트 예시
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `isOpen` | `boolean` | 필수 | 컴포넌트 열림 상태 |
| `onClose` | `() => void` | 필수 | 컴포넌트 닫기 핸들러 |
| `groups` | `CommandGroup[]` | 필수 | 명령어 그룹 목록 |
| `placeholder` | `string` | "Type a command or search..." | 검색 입력 필드 플레이스홀더 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |

#### 타입

```typescript
interface CommandGroup {
  /**
   * 그룹 제목
   */
  label: string;
  /**
   * 그룹에 속한 명령어 항목들
   */
  items: CommandItem[];
}

interface CommandItem {
  /**
   * 항목의 고유 식별자
   */
  id: string;
  /**
   * 항목에 표시될 이름
   */
  label: string;
  /**
   * 항목의 아이콘
   */
  icon: ReactNode;
  /**
   * 항목의 키보드 단축키 (선택 사항)
   */
  shortcut?: string;
  /**
   * 항목 선택 시 실행할 작업
   */
  onSelect: () => void;
}
```

### 9. ContextMenu

사용자 인터페이스에 맞춤형 컨텍스트 메뉴(우클릭 메뉴)를 제공하는 컴포넌트입니다.

#### 사용법

```jsx
import { ContextMenu } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // 메뉴 섹션 정의
  const menuSections = [
    {
      items: [
        {
          type: 'normal',
          label: '뒤로',
          shortcut: '⌘[',
          onClick: () => console.log('뒤로 클릭됨'),
        },
        {
          type: 'normal',
          label: '앞으로',
          shortcut: '⌘]',
          disabled: true,
        },
        {
          type: 'normal',
          label: '새로고침',
          shortcut: '⌘R',
          onClick: () => console.log('새로고침 클릭됨'),
        },
      ],
    },
    {
      items: [
        {
          type: 'checkbox',
          label: '북마크 바 표시',
          shortcut: '⌘⇧B',
          checked: true,
          onClick: () => console.log('북마크 바 토글됨'),
        },
      ],
    },
    {
      title: '사용자',
      items: [
        {
          type: 'normal',
          label: '홍길동',
          onClick: () => console.log('홍길동 선택됨'),
        },
        {
          type: 'normal',
          label: '김철수',
          onClick: () => console.log('김철수 선택됨'),
        },
      ],
    },
  ];
  
  // 우클릭 핸들러
  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div 
      style={{ width: '500px', height: '300px', background: '#f5f5f5' }}
      onContextMenu={handleContextMenu}
    >
      이 영역에서 마우스 오른쪽 버튼을 클릭하세요
      
      <ContextMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        x={position.x}
        y={position.y}
        sections={menuSections}
      />
    </div>
  );
}
```

#### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `isOpen` | `boolean` | 필수 | 메뉴 표시 여부 |
| `onClose` | `() => void` | 필수 | 메뉴 닫기 핸들러 |
| `sections` | `MenuSection[]` | 필수 | 메뉴 섹션 목록 |
| `x` | `number` | 필수 | 메뉴 표시 X 좌표 |
| `y` | `number` | 필수 | 메뉴 표시 Y 좌표 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |

#### 타입

```typescript
type MenuItemType = 'normal' | 'separator' | 'checkbox';

interface MenuItem {
  /**
   * 메뉴 항목 ID (선택적)
   */
  id?: string;
  /**
   * 메뉴 항목 타입
   */
  type: MenuItemType;
  /**
   * 메뉴 항목에 표시될 레이블
   */
  label?: ReactNode;
  /**
   * 메뉴 항목 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 메뉴 항목 클릭시 실행할 작업
   */
  onClick?: () => void;
  /**
   * 키보드 단축키 표시 (선택적)
   */
  shortcut?: string;
  /**
   * 체크 여부 (checkbox 타입에서만 사용)
   */
  checked?: boolean;
  /**
   * 서브메뉴 항목들 (선택적)
   */
  items?: MenuItem[];
  /**
   * 항목 앞에 표시할 아이콘 (선택적)
   */
  icon?: ReactNode;
}

interface MenuSection {
  /**
   * 섹션 제목 (선택적)
   */
  title?: string;
  /**
   * 섹션에 포함된 메뉴 항목들
   */
  items: MenuItem[];
}
```

### 10. Dialog

사용자를 중요한 내용으로 중단시키고 응답을 기대하는 모달 다이얼로그입니다. 주의를 필요로 하는 중요한 정보를 표시하거나 사용자의 결정이 필요한 상황에서 사용합니다. 폼 레이아웃을 포함할 수 있어 프로필 편집과 같은 작업에도 적합합니다.

#### 사용법

```jsx
import { Dialog, FormField } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        다이얼로그 열기
      </button>
      
      {/* 기본 다이얼로그 */}
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
      
      {/* 프로필 편집 폼 */}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
        onSubmit={(e) => {
          e.preventDefault();
          // 폼 데이터 처리
          setIsOpen(false);
        }}
      >
        <FormField label="Name">
          <input
            type="text"
            name="name"
            defaultValue="Email"
            placeholder="Enter your name"
          />
        </FormField>
        
        <FormField label="Username">
          <input
            type="text"
            name="username"
            defaultValue="@peduarte"
            placeholder="Enter your username"
          />
        </FormField>
      </Dialog>
    </div>
  );
}
```

#### Props

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

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `ReactNode` | 필수 | 필드 레이블 |
| `children` | `ReactNode` | 필수 | 필드 입력 요소 |
| `labelClassName` | `string` | '' | 레이블에 적용할 추가 CSS 클래스 |
| `className` | `string` | '' | 필드 컨테이너에 적용할 추가 CSS 클래스 |

### 11. DropdownMenu

드롭다운 메뉴를 제공하는 컴포넌트입니다. 계층적인 메뉴 구조, 아이콘, 단축키, 하위 메뉴 등을 지원합니다. 

#### 사용법

```jsx
import { DropdownMenu } from 'react-common-components-library';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 아이콘 컴포넌트 정의
  const ProfileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
  
  const SettingsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );
  
  const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );
  
  const HelpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
  
  const ChatIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  return (
    <div>
      {/* 기본 사용법 */}
      <DropdownMenu
        title="내 계정"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sections={[
          {
            items: [
              { 
                id: 'profile', 
                label: '프로필', 
                icon: <ProfileIcon />, 
                onClick: () => console.log('프로필 클릭됨') 
              },
              { 
                id: 'settings', 
                label: '설정', 
                icon: <SettingsIcon />,
                shortcut: '⌘S', 
                onClick: () => console.log('설정 클릭됨') 
              },
            ]
          },
          {
            items: [
              { 
                id: 'logout', 
                label: '로그아웃', 
                icon: <LogoutIcon />, 
                onClick: () => console.log('로그아웃 클릭됨') 
              },
            ]
          }
        ]}
        trigger={
          <button onClick={() => setIsOpen(!isOpen)}>
            계정 메뉴
          </button>
        }
      />
      
      {/* 서브메뉴 사용 예제 */}
      <DropdownMenu
        title="지원 메뉴"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sections={[
          {
            items: [
              { 
                id: 'support', 
                label: '고객 지원', 
                icon: <HelpIcon />,
                hasSubmenu: true, // 선택적으로 사용 가능
                subItems: [
                  {
                    id: 'help',
                    label: '도움말 센터',
                    icon: <HelpIcon />,
                    onClick: () => console.log('도움말 센터 클릭됨')
                  },
                  {
                    id: 'chat',
                    label: '실시간 채팅',
                    icon: <ChatIcon />,
                    onClick: () => console.log('실시간 채팅 클릭됨')
                  }
                ]
              }
            ]
          }
        ]}
        trigger={
          <button onClick={() => setIsOpen(!isOpen)}>
            지움말 메뉴
          </button>
        }
      />
      
      {/* 다양한 위치 옵션 */}
      <DropdownMenu
        title="메뉴 위치"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom-end"
        sections={[
          {
            items: [
              { id: 'item1', label: '항목 1', onClick: () => {} },
              { id: 'item2', label: '항목 2', onClick: () => {} },
            ]
          }
        ]}
        trigger={<button onClick={() => setIsOpen(!isOpen)}>오른쪽 정렬 메뉴</button>}
      />
      
      {/* 섹션 제목 사용 */}
      <DropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sections={[
          {
            title: "계정 설정",
            items: [
              { id: 'profile', label: '프로필', onClick: () => {} },
              { id: 'settings', label: '설정', onClick: () => {} },
            ]
          },
          {
            title: "지원",
            items: [
              { id: 'help', label: '도움말', onClick: () => {} },
              { id: 'feedback', label: '피드백 보내기', onClick: () => {} },
            ]
          }
        ]}
        trigger={<button onClick={() => setIsOpen(!isOpen)}>섹션 메뉴</button>}
      />
    </div>
  );
}
```

#### Props

##### DropdownMenuProps

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `ReactNode` | - | 드롭다운 메뉴 제목 |
| `sections` | `DropdownMenuSection[]` | 필수 | 드롭다운 메뉴 섹션들 |
| `isOpen` | `boolean` | 필수 | 메뉴 열림 상태 |
| `onClose` | `() => void` | 필수 | 메뉴 닫기 핸들러 |
| `trigger` | `ReactNode` | - | 트리거 요소 (드롭다운을 열기 위한 버튼/요소) |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `menuClassName` | `string` | '' | 메뉴 컨테이너에 적용할 추가 CSS 클래스 |
| `width` | `string` | '300px' | 메뉴의 너비 |
| `position` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'right-start' \| 'left-start'` | 'bottom-start' | 메뉴가 트리거 요소 기준으로 표시될 위치 |

##### DropdownMenuSection

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | - | 섹션 제목 (선택적) |
| `items` | `DropdownMenuItem[]` | 필수 | 섹션에 포함된 메뉴 항목들 |
| `className` | `string` | '' | 섹션에 적용할 추가 CSS 클래스 |

##### DropdownMenuItem

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `id` | `string` | 필수 | 메뉴 항목의 고유 ID |
| `label` | `string` | 필수 | 메뉴 항목에 표시될 레이블 |
| `icon` | `ReactNode` | - | 항목의 아이콘 |
| `shortcut` | `string` | - | 단축키 표시 |
| `onClick` | `() => void` | - | 항목 클릭 시 실행할 함수 |
| `hasSubmenu` | `boolean` | false | 하위 메뉴가 있는지 여부 |
| `subItems` | `DropdownMenuItem[]` | - | 하위 메뉴 항목들. 메뉴 항목에 마우스를 올리면 표시됨 |
| `disabled` | `boolean` | false | 비활성화 여부 |
| `className` | `string` | '' | 항목에 적용할 추가 CSS 클래스 |

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
