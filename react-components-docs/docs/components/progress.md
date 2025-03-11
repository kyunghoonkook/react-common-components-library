---
sidebar_position: 18
---

# Progress

Progress 컴포넌트는 작업의 완료 상태나 프로세스의 진행 상황을 시각적으로 표시하는 데 사용됩니다. 사용자에게 작업이 얼마나 진행되었는지 직관적으로 보여줍니다.

## 기본 사용법

가장 기본적인 형태의 Progress 컴포넌트는 value 속성만 필요합니다.

```jsx
import { Progress } from 'react-common-components-library';

export default function ProgressDemo() {
  return <Progress value={60} />;
}
```

## 레이블 및 값 표시

Progress 컴포넌트는 레이블과 진행률 값을 함께 표시할 수 있습니다.

```jsx
import { Progress } from 'react-common-components-library';

export default function ProgressWithLabelDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={60} label="진행 상태" />
      <Progress value={60} showValue />
      <Progress value={60} label="다운로드 진행률" showValue />
    </div>
  );
}
```

## 크기 변형

Progress 컴포넌트는 세 가지 크기를 지원합니다: small (sm), medium (md), large (lg).

```jsx
import { Progress } from 'react-common-components-library';

export default function ProgressSizesDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={60} size="sm" label="Small" />
      <Progress value={60} size="md" label="Medium (Default)" />
      <Progress value={60} size="lg" label="Large" />
    </div>
  );
}
```

## 색상 변형

Progress 컴포넌트는 다양한 색상 옵션을 제공합니다.

```jsx
import { Progress } from 'react-common-components-library';

export default function ProgressColorsDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={60} color="primary" label="Primary" />
      <Progress value={60} color="secondary" label="Secondary" />
      <Progress value={60} color="success" label="Success" />
      <Progress value={60} color="danger" label="Danger" />
      <Progress value={60} color="warning" label="Warning" />
      <Progress value={60} color="info" label="Info" />
    </div>
  );
}
```

## 애니메이션 효과

Progress 컴포넌트에 애니메이션 효과를 추가할 수 있습니다.

```jsx
import { Progress } from 'react-common-components-library';

export default function ProgressAnimatedDemo() {
  return (
    <Progress value={60} animated label="애니메이션 효과" />
  );
}
```

## 다양한 진행률

Progress 컴포넌트는 0에서 100까지의 다양한 값을 표현할 수 있습니다.

```jsx
import { Progress } from 'react-common-components-library';

export default function ProgressValuesDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={0} showValue label="0%" />
      <Progress value={25} showValue label="25%" />
      <Progress value={50} showValue label="50%" />
      <Progress value={75} showValue label="75%" />
      <Progress value={100} showValue label="100%" />
    </div>
  );
}
```

## 커스텀 스타일링

Progress 컴포넌트는 다양한 클래스명 속성을 통해 스타일을 커스터마이징할 수 있습니다.

```jsx
import { Progress } from 'react-common-components-library';

export default function CustomStyledProgressDemo() {
  return (
    <Progress
      value={60}
      label="커스텀 스타일"
      showValue
      className="custom-progress"
      containerClassName="custom-container"
      indicatorClassName="custom-indicator"
      valueClassName="custom-value"
      labelClassName="custom-label"
    />
  );
}
```

## API 참조

### Progress

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `number` | 필수 | 진행률 (0-100) |
| `max` | `number` | `100` | 최대값 |
| `label` | `string` | - | 진행 바 위에 표시될 레이블 |
| `showValue` | `boolean` | `false` | 진행률 텍스트 표시 여부 |
| `valueFormat` | `string` | `'{value}%'` | 진행률 텍스트 형식 |
| `animated` | `boolean` | `false` | 애니메이션 효과 적용 여부 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 진행 바 크기 |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | 진행 바 색상 |
| `className` | `string` | - | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |
| `containerClassName` | `string` | - | 진행 바 배경에 적용할 추가 CSS 클래스 |
| `indicatorClassName` | `string` | - | 진행 바 인디케이터에 적용할 추가 CSS 클래스 |
| `valueClassName` | `string` | - | 진행률 표시 텍스트에 적용할 추가 CSS 클래스 |
| `labelClassName` | `string` | - | 레이블에 적용할 추가 CSS 클래스 |

## 접근성

Progress 컴포넌트는 다음과 같은 접근성 기능을 제공합니다:

- **ARIA 속성**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` 속성을 사용하여 스크린 리더 사용자에게 진행 상태 정보를 제공합니다.
- **텍스트 레이블**: 레이블과 진행률 텍스트를 통해 시각적 정보를 보완하여 더 나은 접근성을 제공합니다.
- **색상 대비**: 진행 바와 배경 간의 적절한 색상 대비를 유지하여 시각적 인식성을 높입니다.
- **다크 모드 지원**: 다크 모드에서도 적절한 색상과 대비를 유지합니다.
- **키보드 접근성**: 단순한 표시 컴포넌트로, 키보드 인터랙션은 필요하지 않지만 스크린 리더와 호환됩니다. 