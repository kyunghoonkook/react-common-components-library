---
sidebar_position: 1
---

# Accordion

접을 수 있는 콘텐츠 패널을 제공하는 컴포넌트입니다.

## 기본 사용법

```jsx
import { Accordion } from 'react-common-components-library';

function AccordionExample() {
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

  return (
    <Accordion items={items} className="custom-accordion" />
  );
}
```

## 다중 선택 사용법

여러 항목을 동시에 열 수 있는 아코디언을 만들 수 있습니다:

```jsx
import { Accordion } from 'react-common-components-library';

function MultiAccordionExample() {
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

  return (
    <Accordion 
      items={items} 
      allowMultiple 
      defaultExpanded={[0]} 
    />
  );
}
```

## 커스텀 스타일 예제

아코디언에 커스텀 스타일을 적용할 수 있습니다:

```jsx
import { Accordion } from 'react-common-components-library';

function CustomStyledAccordionExample() {
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

  return (
    <Accordion 
      items={items}
      titleClassName="custom-title"
      contentClassName="custom-content"
      itemClassName="custom-item"
      disableAnimation={true}
      itemGap={10}
    />
  );
}
```

## 커스텀 아이콘 예제

아코디언의 화살표 아이콘을 커스터마이징할 수 있습니다:

```jsx
import { Accordion } from 'react-common-components-library';

function CustomIconAccordionExample() {
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

  // 커스텀 아이콘 함수
  const customIcon = (isOpen) => (
    <span>{isOpen ? '📖' : '📘'}</span>
  );

  return (
    <Accordion 
      items={items}
      customIcon={customIcon}
    />
  );
}
```

## API 참조

### Accordion Props

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

## 접근성

Accordion 컴포넌트는 WAI-ARIA 아코디언 패턴을 준수합니다:

- 키보드 탐색을 지원합니다 (Tab 키로 아코디언 항목 간 이동, Enter 또는 Space 키로 아코디언 토글).
- 적절한 ARIA 속성을 사용하여 스크린 리더 사용자를 위한 접근성을 보장합니다.
- 확장/축소 상태가 적절하게 표시됩니다. 