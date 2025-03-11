---
sidebar_position: 23
---

# Slider

사용자가 특정 범위 내에서 값을 선택할 수 있게 해주는 수평 또는 수직 슬라이더 컴포넌트입니다.

## 특징

- 수평 및 수직 방향 지원
- 다양한 크기 및 색상 변형 지원
- 비활성화 상태 지원
- 다크 테마 및 자동 테마 감지 기능
- 값 레이블 및 툴팁 표시 옵션
- 커스텀 범위 및 단계 설정 가능
- 키보드 탐색 및 접근성 지원
- 제어/비제어 컴포넌트 모두 지원
- 애니메이션 효과

## 설치

```bash
npm install react-common-components-library
# 또는
yarn add react-common-components-library
```

## 사용법

```jsx
import { Slider } from 'react-common-components-library';
```

### 기본 사용법

```jsx
<Slider defaultValue={30} />
```

### 수직 슬라이더

```jsx
<div style={{ height: '200px' }}>
  <Slider orientation="vertical" defaultValue={50} />
</div>
```

### 값 레이블 표시

```jsx
<Slider defaultValue={40} showValueLabel />
```

### 다양한 크기

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
  <Slider defaultValue={30} size="sm" />
  <Slider defaultValue={50} size="md" /> {/* 기본 크기 */}
  <Slider defaultValue={70} size="lg" />
</div>
```

### 색상 변형

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
  <Slider defaultValue={50} variant="default" />
  <Slider defaultValue={50} variant="primary" /> {/* 기본 변형 */}
  <Slider defaultValue={50} variant="secondary" />
  <Slider defaultValue={50} variant="success" />
  <Slider defaultValue={50} variant="danger" />
  <Slider defaultValue={50} variant="warning" />
</div>
```

### 다크 테마

```jsx
<div style={{ background: '#1a202c', padding: '20px', borderRadius: '8px' }}>
  <Slider defaultValue={60} theme="dark" />
</div>
```

### 비활성화 상태

```jsx
<Slider defaultValue={30} disabled />
```

### 제어 컴포넌트로 사용

```jsx
import React, { useState } from 'react';
import { Slider } from 'react-common-components-library';

function ControlledSlider() {
  const [value, setValue] = useState(50);
  
  return (
    <div>
      <p>현재 값: {value}</p>
      <Slider 
        value={value} 
        onChange={setValue} 
        onChangeComplete={(val) => console.log('변경 완료:', val)} 
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setValue(Math.max(0, value - 10))}>- 10</button>
        <button onClick={() => setValue(Math.min(100, value + 10))} style={{ marginLeft: '10px' }}>+ 10</button>
        <button onClick={() => setValue(0)} style={{ marginLeft: '10px' }}>리셋</button>
      </div>
    </div>
  );
}
```

### 커스텀 범위 및 단계

```jsx
<Slider 
  min={-50} 
  max={50} 
  step={10} 
  defaultValue={0} 
  showValueLabel 
/>
```

### 커스텀 값 포맷팅

```jsx
<Slider 
  defaultValue={50} 
  showValueLabel 
  formatLabel={(value) => `${value}%`} 
/>
```

### 실제 사용 예시

#### 볼륨 컨트롤

```jsx
import React, { useState } from 'react';
import { Slider } from 'react-common-components-library';

function VolumeControl() {
  const [volume, setVolume] = useState(80);
  
  return (
    <div style={{ width: '250px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span role="img" aria-label="volume-low">🔈</span>
        <Slider 
          value={volume} 
          onChange={setVolume} 
          variant="primary"
          size="sm"
        />
        <span role="img" aria-label="volume-high">🔊</span>
      </div>
      <div style={{ textAlign: 'center', fontSize: '14px' }}>
        볼륨: {volume}%
      </div>
    </div>
  );
}
```

#### 온도 설정

```jsx
import React, { useState } from 'react';
import { Slider } from 'react-common-components-library';

function TemperatureSetting() {
  const [temperature, setTemperature] = useState(22);
  
  // 온도에 따른 색상 변경
  const getColor = (temp) => {
    if (temp < 18) return 'secondary';
    if (temp > 25) return 'danger';
    return 'primary';
  };
  
  return (
    <div style={{ width: '280px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>온도 설정</h3>
      <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '20px' }}>
        {temperature}°C
      </div>
      <Slider 
        value={temperature} 
        onChange={setTemperature} 
        min={16}
        max={30}
        step={0.5}
        variant={getColor(temperature)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px' }}>
        <span>16°C</span>
        <span>30°C</span>
      </div>
    </div>
  );
}
```

## API 참조

### Slider

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `number` | - | 현재 슬라이더 값 (제어 컴포넌트로 사용 시) |
| `defaultValue` | `number` | `0` | 기본 슬라이더 값 (비제어 컴포넌트로 사용 시) |
| `min` | `number` | `0` | 최솟값 |
| `max` | `number` | `100` | 최댓값 |
| `step` | `number` | `1` | 단계 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 슬라이더의 방향 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 슬라이더의 크기 |
| `showValueLabel` | `boolean` | `false` | 값 레이블 표시 여부 |
| `formatLabel` | `(value: number) => string` | `(value) => \`${value}\`` | 값 레이블 포맷 함수 |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 테마 모드 |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'` | `'primary'` | 슬라이더의 색상 변형 |
| `className` | `string` | `''` | 추가 CSS 클래스 |
| `style` | `React.CSSProperties & { [key: \`--${string}\`]: string \| number }` | - | 인라인 스타일 |
| `onChange` | `(value: number) => void` | - | 값 변경 시 호출될 함수 |
| `onChangeComplete` | `(value: number) => void` | - | 슬라이더 조작이 완료되었을 때 호출될 함수 |
| `trackClickable` | `boolean` | `true` | 슬라이더 트랙 클릭 가능 여부 |
| `thumbSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | 슬라이더 썸(핸들) 크기 |
| `name` | `string` | - | 슬라이더 이름 (form 제출용) |
| `id` | `string` | - | 슬라이더 ID |

## 접근성

Slider 컴포넌트는 WAI-ARIA 디자인 패턴을 준수합니다:

- `role="slider"` 속성으로 스크린 리더에게 슬라이더임을 알립니다.
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` 속성으로 값 범위를 제공합니다.
- `aria-disabled` 속성으로 비활성화 상태를 알립니다.
- `aria-orientation` 속성으로 방향을 알립니다.
- 키보드 탐색을 지원합니다:
  - 좌/우 화살표: 수평 슬라이더의 값 조절
  - 위/아래 화살표: 수직 슬라이더의 값 조절
  - Home/End: 최소/최대값으로 이동

## 스타일 커스터마이징

Slider 컴포넌트는 다음과 같은 방법으로 스타일을 커스터마이징할 수 있습니다:

### CSS 클래스 사용

```jsx
<Slider className="custom-slider" />
```

```css
.custom-slider {
  /* 슬라이더 컨테이너 스타일 */
}

.custom-slider .slider-track {
  /* 트랙 스타일 */
}

.custom-slider .slider-thumb {
  /* 썸(핸들) 스타일 */
}
```

### 인라인 스타일 사용

```jsx
<Slider 
  style={{ 
    /* 슬라이더 컨테이너 스타일 */
  }} 
/>
```

### CSS 변수 사용

Slider 컴포넌트는 CSS 변수를 통한 스타일 커스터마이징을 지원합니다:

```jsx
<Slider 
  style={{ 
    '--slider-track-color': 'rgba(0, 0, 0, 0.2)',
    '--slider-thumb-color': 'purple',
    '--slider-track-height': '6px',
    '--slider-thumb-size': '20px',
  }} 
/>
``` 