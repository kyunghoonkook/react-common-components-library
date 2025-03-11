---
sidebar_position: 12
---

# HoverCard

마우스를 특정 요소 위에 올렸을 때 추가 정보를 카드 형태로 표시하는 컴포넌트입니다.

## 기본 사용법

마우스 호버 시 추가 정보를 보여주는 기본적인 사용법 예시입니다.

```jsx
import { HoverCard } from 'react-common-components-library';

function BasicExample() {
  return (
    <div>
      <HoverCard
        trigger={<span>@홍길동</span>}
        content={
          <div style={{ padding: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>홍길동</div>
            <div>프론트엔드 개발자</div>
            <div>React | TypeScript</div>
          </div>
        }
      />
      <span> 님이 새 글을 작성했습니다.</span>
    </div>
  );
}
```

## 다양한 위치 옵션

HoverCard는 트리거 요소를 기준으로 상단, 하단, 좌측, 우측 등 다양한 위치에 표시할 수 있습니다.

```jsx
import { HoverCard } from 'react-common-components-library';

function PositionExample() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
      <HoverCard
        trigger={<button>Top</button>}
        content={<div>상단에 표시되는 호버 카드입니다.</div>}
        position="top"
      />
      
      <HoverCard
        trigger={<button>Right</button>}
        content={<div>오른쪽에 표시되는 호버 카드입니다.</div>}
        position="right"
      />
      
      <HoverCard
        trigger={<button>Bottom</button>}
        content={<div>하단에 표시되는 호버 카드입니다.</div>}
        position="bottom"
      />
      
      <HoverCard
        trigger={<button>Left</button>}
        content={<div>왼쪽에 표시되는 호버 카드입니다.</div>}
        position="left"
      />
    </div>
  );
}
```

## 지연 시간 조정

`openDelay`와 `closeDelay` 속성을 사용하여 카드가 나타나고 사라지는 지연 시간을 조정할 수 있습니다.

```jsx
import { HoverCard } from 'react-common-components-library';

function DelayExample() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <HoverCard
        trigger={<button>빠른 표시 (100ms)</button>}
        content={<div>마우스를 올리면 빠르게 표시됩니다.</div>}
        openDelay={100}
        closeDelay={300}
      />
      
      <HoverCard
        trigger={<button>느린 표시 (800ms)</button>}
        content={<div>마우스를 올리면 느리게 표시됩니다.</div>}
        openDelay={800}
        closeDelay={300}
      />
    </div>
  );
}
```

## 프로필 카드 예제

HoverCard를 사용하여 소셜 미디어 스타일의 프로필 카드를 구현하는 예시입니다.

```jsx
import { HoverCard } from 'react-common-components-library';
import { Avatar } from 'react-common-components-library';

function ProfileCardExample() {
  return (
    <div>
      <p>
        이 글은 
        <HoverCard
          trigger={<span style={{ fontWeight: 'bold', color: '#6366f1', margin: '0 4px' }}>@홍길동</span>}
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar
                  src="https://i.pravatar.cc/100"
                  alt="홍길동"
                  size="lg"
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>홍길동</div>
                  <div style={{ color: '#666' }}>@honggildong</div>
                </div>
              </div>
              <div>프론트엔드 개발자 | React, TypeScript 전문</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div>팔로워: 1,234</div>
                <div>팔로잉: 567</div>
              </div>
              <button style={{ 
                backgroundColor: '#6366f1', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer'
              }}>
                팔로우
              </button>
            </div>
          }
          width="300px"
        />
        에 의해 작성되었습니다.
      </p>
    </div>
  );
}
```

## 컨트롤드 컴포넌트

외부 상태를 사용하여 HoverCard의 열림/닫힘 상태를 제어할 수 있습니다.

```jsx
import { HoverCard } from 'react-common-components-library';
import { useState } from 'react';

function ControlledExample() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        마우스를 올려보세요
      </button>
      
      <HoverCard
        trigger={<span />} // 빈 트리거 사용
        content={<div>상태로 제어되는 호버 카드입니다.</div>}
        open={isHovered}
        onOpenChange={setIsHovered}
        position="right"
      />
    </div>
  );
}
```

## 커스텀 스타일링

HoverCard의 스타일을 다양하게 커스터마이징할 수 있습니다.

```jsx
import { HoverCard } from 'react-common-components-library';

function CustomStyleExample() {
  return (
    <div>
      <HoverCard
        trigger={<span style={{ color: 'purple', textDecoration: 'underline', cursor: 'help' }}>용어 설명</span>}
        content={
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>호버 카드</h4>
            <p style={{ margin: 0 }}>마우스를 특정 요소 위에 올렸을 때 추가 정보를 제공하는 UI 요소입니다.</p>
          </div>
        }
        cardStyle={{ 
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
        }}
        showArrow={true}
        arrowStyle={{
          background: '#6366f1'
        }}
        width="300px"
      />
    </div>
  );
}
```

## API 참조

### HoverCard

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `trigger` | `ReactNode` | 필수 | 호버 시 카드가 표시될 트리거 요소 |
| `content` | `ReactNode` | 필수 | 호버 카드에 표시될 내용 |
| `openDelay` | `number` | 300 | 카드가 표시되기까지의 지연 시간 (밀리초) |
| `closeDelay` | `number` | 300 | 카드가 닫히기까지의 지연 시간 (밀리초) |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | 'bottom' | 카드 위치 |
| `open` | `boolean` | - | 외부에서 제어할 때 사용하는 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태가 변경될 때 호출되는 콜백 |
| `width` | `string` | '250px' | 카드 너비 |
| `style` | `CSSProperties` | - | 부모 요소 스타일 |
| `cardStyle` | `CSSProperties` | - | 카드 스타일 |
| `className` | `string` | '' | 부모 요소에 적용할 추가 CSS 클래스 |
| `cardClassName` | `string` | '' | 카드에 적용할 추가 CSS 클래스 |
| `inPortal` | `boolean` | false | 카드가 트리거보다 앞에 렌더링될지 여부 |
| `showArrow` | `boolean` | true | 화살표 표시 여부 |
| `arrowClassName` | `string` | '' | 화살표에 적용할 추가 CSS 클래스 |
| `arrowStyle` | `CSSProperties` | - | 화살표 스타일 |

## 접근성

HoverCard 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

1. **키보드 접근성**: 마우스 호버 외에도 키보드 포커스에 반응하여 호버 카드가 표시됩니다.

2. **ARIA 속성**: 필요한 ARIA 속성을 자동으로 적용하여 스크린 리더와의 호환성을 보장합니다:
   - `aria-expanded`: 호버 카드 표시 여부에 따라 올바르게 설정됩니다.
   - `aria-controls`: 호버 카드 내용을 참조하는 ID가 자동으로 생성되어 설정됩니다.
   - `aria-haspopup`: 호버 카드가 팝업으로 작동함을 명시합니다.

3. **포커스 관리**: 호버 카드가 닫히면 트리거 요소로 포커스가 돌아갑니다.

4. **ESC 키 지원**: ESC 키를 눌러 호버 카드를 닫을 수 있습니다. 