---
sidebar_position: 4
---

# Avatar

사용자 프로필 이미지 또는 이니셜을 표시하는 컴포넌트입니다. 다양한 크기와 상태를 지원합니다.

## 기본 사용법

```jsx
import { Avatar } from 'react-common-components-library';

function AvatarExample() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* 이미지 아바타 */}
      <Avatar 
        src="https://i.pravatar.cc/150?img=1" 
        alt="Jane Doe" 
        size="md" 
      />
      
      {/* 이미지가 없을 때 이니셜 사용 */}
      <Avatar 
        name="John Smith" 
        size="md" 
      />
      
      {/* 색상 지정 */}
      <Avatar 
        name="Alex Johnson" 
        size="md"
        color="#6366F1"
      />
    </div>
  );
}
```

## 다양한 크기

Avatar 컴포넌트는 여러 크기를 지원합니다:

```jsx
import { Avatar } from 'react-common-components-library';

function AvatarSizesExample() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="SM" />
      <Avatar size="md" name="MD" />
      <Avatar size="lg" name="LG" />
      <Avatar size="xl" name="XL" />
      <Avatar size="2xl" name="2XL" />
    </div>
  );
}
```

## 그룹 아바타

여러 아바타를 겹쳐서 표시할 수 있습니다:

```jsx
import { AvatarGroup } from 'react-common-components-library';
import { Avatar } from 'react-common-components-library';

function AvatarGroupExample() {
  return (
    <AvatarGroup max={3}>
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="사용자 1" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="사용자 2" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="사용자 3" />
      <Avatar src="https://i.pravatar.cc/150?img=4" alt="사용자 4" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="사용자 5" />
    </AvatarGroup>
  );
}
```

## 상태 표시기

아바타에 온라인/오프라인 상태를 표시할 수 있습니다:

```jsx
import { Avatar } from 'react-common-components-library';

function AvatarStatusExample() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Avatar 
        src="https://i.pravatar.cc/150?img=1" 
        alt="온라인 사용자" 
        status="online" 
      />
      
      <Avatar 
        src="https://i.pravatar.cc/150?img=2" 
        alt="오프라인 사용자" 
        status="offline" 
      />
      
      <Avatar 
        src="https://i.pravatar.cc/150?img=3" 
        alt="자리비움 사용자" 
        status="away" 
      />
      
      <Avatar 
        src="https://i.pravatar.cc/150?img=4" 
        alt="다른 용무중 사용자" 
        status="busy" 
      />
    </div>
  );
}
```

## API 참조

### Avatar Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `src` | `string` | - | 아바타 이미지 URL |
| `name` | `string` | - | 사용자 이름 (이미지가 없을 때 이니셜 생성에 사용) |
| `alt` | `string` | - | 이미지 대체 텍스트 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | 'md' | 아바타 크기 |
| `color` | `string` | - | 이니셜 배경 색상 |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | - | 상태 표시기 |
| `statusPosition` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | 'bottom-right' | 상태 표시기 위치 |
| `shape` | `'circle' \| 'square'` | 'circle' | 아바타 모양 |
| `border` | `boolean` | false | 테두리 표시 여부 |
| `borderColor` | `string` | - | 테두리 색상 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

### AvatarGroup Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `ReactElement<AvatarProps>[]` | 필수 | Avatar 컴포넌트 목록 |
| `max` | `number` | - | 표시할 최대 아바타 수 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | 'md' | 그룹 내 모든 아바타의 크기 |
| `spacing` | `number \| string` | -10 | 아바타 간 간격 (음수 값은 겹침) |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

## 접근성

Avatar 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- 이미지 아바타에는 `alt` 속성을 통해 적절한 대체 텍스트를 제공해야 합니다.
- 이미지가 로드되지 않을 경우 대체 텍스트나 이니셜이 표시됩니다.
- 상태 표시기가 있는 경우 스크린 리더에게 상태를 알려주는 aria-label이 자동으로 적용됩니다.
- 아바타 그룹은 적절한 ARIA 속성을 사용하여 스크린 리더 호환성을 보장합니다. 