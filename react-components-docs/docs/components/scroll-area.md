---
sidebar_position: 20
---

# ScrollArea

ScrollArea 컴포넌트는 제한된 공간 내에서 콘텐츠를 스크롤할 수 있게 해주며, 사용자 정의 스크롤바를 제공합니다. 기본 브라우저 스크롤바를 대체하여 더 일관되고 시각적으로 매력적인 UI를 구현할 수 있습니다. 기본적으로 얇은 보더와 미묘한 그림자가 적용되어 있어 콘텐츠 영역이 명확하게 구분됩니다.

## 기능

- 커스텀 스타일링 스크롤바
- 세로/가로/양방향 스크롤 지원
- 자동 숨김 기능
- 다크 모드 지원
- 접근성 고려
- 기본 보더 및 그림자 스타일 적용
- 프로그래매틱 스크롤 제어
- 미니멀한 디자인 스타일

## 설치

```bash
npm install @react-common-components/scroll-area
```

## 기본 사용법

```jsx
import { ScrollArea } from 'react-common-components-library';

function Demo() {
  return (
    <ScrollArea height={200} width={350}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">태그</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: i > 0 ? '8px' : 0 }}>
            태그 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## 예제

### 태그 목록 예제

간결하고 깔끔한 태그 목록 UI를 구현합니다.

```jsx
<ScrollArea 
  width="320px"
  height="400px"
  scrollbarSize={4}
  scrollbarRadius={4}
  thumbColor="rgba(0, 0, 0, 0.2)"
  thumbHoverColor="rgba(0, 0, 0, 0.3)"
  thumbDragColor="rgba(0, 0, 0, 0.4)"
  borderColor="rgba(229, 231, 235, 0.5)"
  shadowColor="rgba(0, 0, 0, 0.03)"
>
  <div>
    <h2 style={{ 
      fontSize: '1.75rem', 
      fontWeight: '600',
      margin: '0 0 1.5rem',
      padding: '0 0.5rem'
    }}>
      Tags
    </h2>
    <div className="tag-list">
      <div className="tag-item">v1.2.0-beta.50</div>
      <div className="tag-item">v1.2.0-beta.48</div>
      <div className="tag-item">v1.2.0-beta.47</div>
      <div className="tag-item">v1.2.0-beta.46</div>
      <div className="tag-item">v1.2.0-beta.45</div>
      <div className="tag-item">v1.2.0-beta.44</div>
      {/* 추가 태그 아이템 */}
    </div>
  </div>
</ScrollArea>
```

```css
/* 태그 목록 스타일 */
.tag-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tag-item {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border-bottom: 1px solid var(--border-color);
  font-size: 1rem;
  color: #111827;
  transition: background-color 150ms ease;
}

.tag-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.tag-item:last-child {
  border-bottom: none;
}
```

### 가로 스크롤

`orientation` 속성을 "horizontal"로 설정하여 가로 스크롤을 구현합니다.

```jsx
<ScrollArea 
  orientation="horizontal" 
  width={350}
  height="auto"
>
  <div className="flex p-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div 
        key={i} 
        style={{ 
          width: '100px', 
          height: '100px', 
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: i % 2 === 0 ? '#f4f4f5' : '#e4e4e7',
          border: '1px solid #e4e4e7',
          borderRadius: '4px',
          marginRight: '8px',
          fontWeight: 500,
        }}
      >
        항목 {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>
```

### 양방향 스크롤

`orientation` 속성을 "both"로 설정하면 세로와 가로 방향 모두 스크롤할 수 있습니다.

```jsx
<ScrollArea 
  orientation="both" 
  height={300}
  width={400}
>
  <div style={{ width: '800px' }}>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {Array.from({ length: 10 }).map((_, i) => (
            <th key={i}>칼럼 {i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 15 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 10 }).map((_, colIndex) => (
              <td key={colIndex}>
                셀 {rowIndex + 1}-{colIndex + 1}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</ScrollArea>
```

### 스크롤바 항상 표시

`autoHide` 속성을 `false`로 설정하면 스크롤바가 항상 표시됩니다.

```jsx
<ScrollArea 
  autoHide={false}
  height={200}
  width={350}
>
  <div className="p-4">
    {/* 내용 */}
  </div>
</ScrollArea>
```

### 외부 스크롤바

`scrollbarPosition` 속성을 "outside"로 설정하면 스크롤바가 컨텐츠 영역 외부에 표시됩니다.

```jsx
<ScrollArea 
  scrollbarPosition="outside"
  height={200}
  width={350}
>
  <div className="p-4">
    {/* 내용 */}
  </div>
</ScrollArea>
```

### 커스텀 색상

스크롤바와 배경의 색상을 커스터마이징할 수 있습니다.

```jsx
<ScrollArea 
  thumbColor="rgba(14, 165, 233, 0.4)"
  thumbHoverColor="rgba(14, 165, 233, 0.6)"
  thumbDragColor="rgba(14, 165, 233, 0.8)"
  borderColor="rgba(14, 165, 233, 0.2)"
  backgroundColor="#f0f9ff"
  height={200}
  width={350}
>
  <div className="p-4">
    {/* 내용 */}
  </div>
</ScrollArea>
```

### 그림자 비활성화

`disableShadow` 속성을 `true`로 설정하면 그림자 효과가 제거됩니다.

```jsx
<ScrollArea 
  disableShadow={true}
  height={200}
  width={350}
>
  <div className="p-4">
    {/* 내용 */}
  </div>
</ScrollArea>
```

### 다크 테마

`theme` 속성을 "dark"로 설정하면 다크 테마가 적용됩니다.

```jsx
<ScrollArea 
  theme="dark"
  height={200}
  width={350}
>
  <div className="p-4">
    {/* 내용 */}
  </div>
</ScrollArea>
```

### 프로그래매틱 스크롤 제어

`ref`를 사용하여 스크롤 위치를 프로그래매틱 방식으로 제어할 수 있습니다.

```jsx
import { useRef } from 'react';
import { ScrollArea, ScrollAreaRef } from 'react-common-components-library';

function ScrollDemo() {
  const scrollAreaRef = useRef<ScrollAreaRef>(null);
  
  const handleScrollToTop = () => {
    scrollAreaRef.current?.scrollToTop();
  };
  
  const handleScrollToBottom = () => {
    scrollAreaRef.current?.scrollToBottom();
  };
  
  const handleScrollToPosition = () => {
    scrollAreaRef.current?.scrollTo({ top: 150 });
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button onClick={handleScrollToTop}>맨 위로</button>
        <button onClick={handleScrollToBottom}>맨 아래로</button>
        <button onClick={handleScrollToPosition}>중간 위치로</button>
      </div>
      <ScrollArea 
        ref={scrollAreaRef}
        height={200}
        width={350}
      >
        <div className="p-4">
          {/* 내용 */}
        </div>
      </ScrollArea>
    </div>
  );
}
```

## API

### ScrollArea

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactNode` | 필수 | 스크롤 영역 내부에 들어갈 컨텐츠 |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | 'vertical' | 스크롤 방향 |
| `autoHide` | `boolean` | true | 스크롤바 자동 숨김 여부 |
| `hideDelay` | `number` | 1000 | 자동 숨김 지연 시간 (ms) |
| `width` | `string \| number` | - | 스크롤 영역 너비 |
| `height` | `string \| number` | - | 스크롤 영역 높이 |
| `maxWidth` | `string \| number` | - | 스크롤 영역 최대 너비 |
| `maxHeight` | `string \| number` | - | 스크롤 영역 최대 높이 |
| `className` | `string` | - | 루트 요소에 적용할 CSS 클래스 |
| `style` | `CSSProperties` | - | 루트 요소에 적용할 인라인 스타일 |
| `scrollbarPosition` | `'inside' \| 'outside'` | 'inside' | 스크롤바 위치 |
| `scrollbarSize` | `number` | 6 | 스크롤바 두께 (px) |
| `scrollbarRadius` | `number` | 9999 | 스크롤바 둥글기 (px) |
| `trackColor` | `string` | 'transparent' | 스크롤바 트랙 색상 |
| `thumbColor` | `string` | 'rgba(0, 0, 0, 0.15)' | 스크롤바 썸 색상 |
| `thumbHoverColor` | `string` | 'rgba(0, 0, 0, 0.25)' | 스크롤바 호버 시 썸 색상 |
| `thumbDragColor` | `string` | 'rgba(0, 0, 0, 0.35)' | 스크롤바 드래그 시 썸 색상 |
| `borderColor` | `string` | 'rgba(229, 231, 235, 1)' | 보더 색상 |
| `shadowColor` | `string` | 'rgba(0, 0, 0, 0.05)' | 그림자 색상 |
| `backgroundColor` | `string` | '#ffffff' | 배경 색상 |
| `textColor` | `string` | 'inherit' | 텍스트 색상 |
| `disableAnimation` | `boolean` | false | 애니메이션 비활성화 여부 |
| `disableUserScroll` | `boolean` | false | 사용자 스크롤 비활성화 여부 |
| `disableShadow` | `boolean` | false | 그림자 비활성화 여부 |
| `scrollAnimationDuration` | `number` | 300 | 프로그래매틱 스크롤 애니메이션 시간 (ms) |
| `theme` | `'light' \| 'dark' \| 'auto'` | 'auto' | 테마 모드 |
| `onScroll` | `(position: { scrollTop: number; scrollLeft: number; }) => void` | - | 스크롤 이벤트 핸들러 |
| `onScrollEnd` | `(position: { scrollTop: number; scrollLeft: number; }) => void` | - | 스크롤 완료 이벤트 핸들러 |

### CSS 변수

컴포넌트는 다음 CSS 변수를 사용하여 스타일을 커스터마이징할 수 있습니다:

| 변수 | 기본값 (라이트 테마) | 기본값 (다크 테마) | 설명 |
|------|------|--------|------|
| `--track-color` | `transparent` | `transparent` | 스크롤바 트랙 색상 |
| `--thumb-color` | `rgba(0, 0, 0, 0.15)` | `rgba(255, 255, 255, 0.1)` | 스크롤바 썸 색상 |
| `--thumb-hover-color` | `rgba(0, 0, 0, 0.25)` | `rgba(255, 255, 255, 0.15)` | 스크롤바 호버 시 썸 색상 |
| `--thumb-drag-color` | `rgba(0, 0, 0, 0.35)` | `rgba(255, 255, 255, 0.2)` | 스크롤바 드래그 시 썸 색상 |
| `--scrollbar-size` | `6px` | `6px` | 스크롤바 두께 |
| `--scrollbar-radius` | `9999px` | `9999px` | 스크롤바 둥글기 |
| `--border-color` | `rgba(229, 231, 235, 1)` | `rgba(55, 65, 81, 1)` | 스크롤 영역 보더 색상 |
| `--shadow-color` | `rgba(0, 0, 0, 0.05)` | `rgba(0, 0, 0, 0.2)` | 스크롤 영역 그림자 색상 |

### ScrollAreaRef

| 메서드 | 설명 |
|------|------|
| `scrollTo(options: ScrollToOptions)` | 컨텐츠를 특정 위치로 스크롤 |
| `scrollIntoView(element: HTMLElement, options?: ScrollIntoViewOptions)` | 특정 요소가 보이도록 스크롤 |
| `scrollToTop(options?: { behavior?: ScrollBehavior })` | 맨 위로 스크롤 |
| `scrollToBottom(options?: { behavior?: ScrollBehavior })` | 맨 아래로 스크롤 |
| `scrollToLeft(options?: { behavior?: ScrollBehavior })` | 맨 왼쪽으로 스크롤 |
| `scrollToRight(options?: { behavior?: ScrollBehavior })` | 맨 오른쪽으로 스크롤 |
| `viewportElement` | 뷰포트 요소 참조 |

## 접근성

ScrollArea 컴포넌트는 접근성을 고려하여 설계되었습니다:

### 키보드 접근성

ScrollArea 컴포넌트는 키보드 사용자를 위한 기본 브라우저 스크롤 동작을 유지합니다:

- `Tab`: 컴포넌트 내부의 포커스 가능한 요소로 이동
- `Arrow Keys`: 콘텐츠 스크롤 (포커스가 컴포넌트 내부에 있을 때)
- `Page Up/Down`: 페이지 단위로 스크롤
- `Home/End`: 콘텐츠의 시작 또는 끝으로 스크롤

### 스크린 리더 지원

ScrollArea는 스크린 리더 사용자가 스크롤 가능한 콘텐츠와 상호 작용할 수 있도록 적절한 ARIA 속성을 포함합니다.

### 모션 감소 선호 설정 지원

`prefers-reduced-motion` 미디어 쿼리를 지원하여 사용자의 모션 감소 선호 설정을 존중합니다. 이 설정이 활성화된 경우 모든 애니메이션이 비활성화됩니다. 