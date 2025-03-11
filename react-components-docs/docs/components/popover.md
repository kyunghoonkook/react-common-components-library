---
sidebar_position: 17
---

# Popover

Popover 컴포넌트는 특정 요소를 클릭했을 때 팝업 형태로 정보나 작업을 제공하는 컴포넌트입니다. 사용자에게 추가 정보를 표시하거나 설정을 변경할 수 있는 인터페이스를 제공합니다.

## 기본 사용법

Popover는 트리거 요소를 클릭했을 때 열리는 팝업 내용을 제공합니다. 제목, 설명 및 내용을 포함할 수 있습니다.

```jsx
import { Popover } from 'react-common-components-library';
import { Button } from 'react-common-components-library';

export default function PopoverDemo() {
  return (
    <Popover
      trigger={<Button>클릭하세요</Button>}
      title="팝오버 제목"
      description="팝오버 컴포넌트에 대한 설명입니다."
    >
      <div>
        <p>팝오버 내용을 여기에 넣을 수 있습니다.</p>
        <p>다양한 콘텐츠를 포함할 수 있습니다.</p>
      </div>
    </Popover>
  );
}
```

## 위치 옵션

Popover는 트리거 요소를 기준으로 다양한 위치에 표시될 수 있습니다. `position` 속성을 사용하여 위치를 지정할 수 있습니다.

```jsx
import { Popover } from 'react-common-components-library';
import { Button } from 'react-common-components-library';

export default function PopoverPositionDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
      <Popover
        trigger={<Button>상단</Button>}
        title="상단 팝오버"
        position="top"
      >
        <div>
          상단에 표시되는 팝오버입니다.
        </div>
      </Popover>
      
      <Popover
        trigger={<Button>우측</Button>}
        title="우측 팝오버"
        position="right"
      >
        <div>
          우측에 표시되는 팝오버입니다.
        </div>
      </Popover>
      
      <Popover
        trigger={<Button>하단</Button>}
        title="하단 팝오버"
        position="bottom"
      >
        <div>
          하단에 표시되는 팝오버입니다.
        </div>
      </Popover>
      
      <Popover
        trigger={<Button>좌측</Button>}
        title="좌측 팝오버"
        position="left"
      >
        <div>
          좌측에 표시되는 팝오버입니다.
        </div>
      </Popover>
    </div>
  );
}
```

## 치수 설정 예제

Popover와 함께 제공되는 `PopoverField` 컴포넌트를 사용하여 사용자 입력 필드를 쉽게 구현할 수 있습니다. 다음은 치수를 설정하는 예제입니다.

```jsx
import React, { useState } from 'react';
import { Popover, PopoverField } from 'react-common-components-library';
import { Button } from 'react-common-components-library';

export default function DimensionsDemo() {
  const [width, setWidth] = useState('100%');
  const [maxWidth, setMaxWidth] = useState('300px');
  const [height, setHeight] = useState('25px');
  const [maxHeight, setMaxHeight] = useState('none');
  
  return (
    <Popover
      trigger={<Button>치수 설정</Button>}
      title="치수 설정"
      description="Set the dimensions for the layer."
      width={260}
    >
      <PopoverField
        label="Width"
        value={width}
        onChange={setWidth}
      />
      <PopoverField
        label="Max. width"
        value={maxWidth}
        onChange={setMaxWidth}
      />
      <PopoverField
        label="Height"
        value={height}
        onChange={setHeight}
      />
      <PopoverField
        label="Max. height"
        value={maxHeight}
        onChange={setMaxHeight}
      />
    </Popover>
  );
}
```

## 제어 컴포넌트 방식

Popover를 외부 상태로 제어할 수 있습니다. 이를 통해 다른 UI 요소와 상태를 공유하거나 프로그래밍 방식으로 Popover를 제어할 수 있습니다.

```jsx
import React, { useState } from 'react';
import { Popover } from 'react-common-components-library';
import { Button } from 'react-common-components-library';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setOpen(!open)}>
          {open ? '팝오버 닫기' : '팝오버 열기'}
        </Button>
      </div>
      
      <Popover
        trigger={<Button>팝오버 트리거</Button>}
        title="제어 컴포넌트"
        description="외부 상태로 열림/닫힘을 제어할 수 있습니다."
        open={open}
        onOpenChange={setOpen}
      >
        <div>
          <p>이 팝오버는 외부 상태에 의해 제어됩니다.</p>
          <p>위의 버튼으로 열고 닫을 수 있습니다.</p>
        </div>
      </Popover>
    </div>
  );
}
```

## 복잡한 컨텐츠

Popover는 다양한 형태의 컨텐츠를 포함할 수 있습니다. 다음은 색상, 불투명도, 블러 효과를 조정하는 예제입니다.

```jsx
import React, { useState } from 'react';
import { Popover, PopoverField } from 'react-common-components-library';
import { Button } from 'react-common-components-library';

export default function ComplexContentDemo() {
  const [color, setColor] = useState('#6366F1');
  const [opacity, setOpacity] = useState('100');
  const [blur, setBlur] = useState('0');
  
  return (
    <div>
      <div style={{ 
        width: '100px', 
        height: '100px', 
        backgroundColor: color,
        opacity: parseInt(opacity) / 100,
        filter: `blur(${blur}px)`,
        borderRadius: '8px',
        marginBottom: '20px'
      }} />
      
      <Popover
        trigger={<Button>스타일 설정</Button>}
        title="스타일 수정"
        description="박스의 스타일을 수정할 수 있습니다."
        width={400}
      >
        <PopoverField
          label="색상"
          type="color"
          value={color}
          onChange={setColor}
        />
        <PopoverField
          label="불투명도"
          type="range"
          value={opacity}
          onChange={setOpacity}
        />
        <PopoverField
          label="블러"
          type="range"
          value={blur}
          onChange={setBlur}
        />
      </Popover>
    </div>
  );
}
```

## API 참조

### Popover

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `trigger` | `ReactNode` | 필수 | Popover를 열기 위한 트리거 요소 |
| `title` | `ReactNode` | - | Popover의 제목 |
| `description` | `ReactNode` | - | Popover의 설명 |
| `children` | `ReactNode` | 필수 | Popover의 내용 |
| `defaultOpen` | `boolean` | `false` | Popover가 기본적으로 열려있는지 여부 |
| `open` | `boolean` | - | 외부에서 제어하는 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태가 변경될 때 호출되는 함수 |
| `closeOnOutsideClick` | `boolean` | `true` | 클릭 외부에서 Popover를 닫을지 여부 |
| `closeOnEscape` | `boolean` | `true` | ESC 키를 눌렀을 때 Popover를 닫을지 여부 |
| `width` | `string \| number` | - | Popover 컨텐츠의 너비 |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Popover가 열리는 위치 |
| `triggerClassName` | `string` | - | Popover 트리거에 적용할 클래스 |
| `contentClassName` | `string` | - | Popover 컨텐츠에 적용할 클래스 |
| `titleClassName` | `string` | - | Popover 제목에 적용할 클래스 |
| `descriptionClassName` | `string` | - | Popover 설명에 적용할 클래스 |
| `triggerStyle` | `CSSProperties` | - | Popover 트리거에 적용할 스타일 |
| `contentStyle` | `CSSProperties` | - | Popover 컨텐츠에 적용할 스타일 |

### PopoverField

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `label` | `string` | 필수 | 필드 레이블 |
| `type` | `string` | `'text'` | 입력 타입 |
| `value` | `string` | 필수 | 입력 값 |
| `onChange` | `(value: string) => void` | 필수 | 값이 변경될 때 호출되는 함수 |
| `placeholder` | `string` | - | 플레이스홀더 |
| `className` | `string` | - | 필드 클래스 |

## 접근성

Popover 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- **ARIA 속성**: `role="dialog"` 및 `aria-modal="true"` 속성을 사용하여 스크린 리더 사용자에게 적절한 컨텍스트를 제공합니다.
- **키보드 접근성**: ESC 키를 누르면 팝오버가 닫히며 `closeOnEscape` 속성으로 이 기능을 제어할 수 있습니다.
- **포커스 관리**: 팝오버가 열릴 때 포커스가 적절히 관리되어 키보드 탐색이 자연스럽게 이루어집니다.
- **클릭 외부 닫기**: 팝오버 외부를 클릭하면 팝오버가 닫히며 `closeOnOutsideClick` 속성으로 이 기능을 제어할 수 있습니다.
- **스크롤 및 리사이즈 대응**: 페이지 스크롤이나 창 크기 조정 시 팝오버 위치가 자동으로 조정됩니다.
- **모바일 최적화**: 모바일 화면에서는 하단에서 슬라이드 업되는 형태로 표시되어 접근성과 사용성을 개선합니다. 