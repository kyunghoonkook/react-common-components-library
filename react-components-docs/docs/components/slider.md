---
sidebar_position: 23
title: Slider
---

# Slider

사용자가 특정 범위 내에서 값을 선택할 수 있게 해주는 수평 또는 수직 슬라이더 컴포넌트입니다. 슬라이더는 사용자가 볼륨, 밝기, 필터 등 숫자 값을 직관적으로 조절할 수 있게 해줍니다.

## 기본 사용법

Slider 컴포넌트를 사용하여 기본 슬라이더를 만들 수 있습니다. defaultValue 속성을 사용하여 초기값을 설정할 수 있습니다.

```
// 기본 슬라이더 예제
import { Slider } from 'react-common-components-library';

function Example() {
  return <Slider defaultValue={30} />;
}
```

기본 슬라이더는 다음과 같이 렌더링됩니다:
- 0부터 100까지의 범위를 가집니다.
- 가로 방향으로 표시됩니다.
- 기본 테마와 중간 크기로 설정됩니다.
- 드래그 가능한 썸(핸들)이 있습니다.

## 수직 슬라이더

orientation 속성을 "vertical"로 설정하여 수직 슬라이더를 만들 수 있습니다. 이때 컨테이너에 높이를 지정해주어야 합니다.

```
// 수직 슬라이더 예제
import { Slider } from 'react-common-components-library';

function VerticalExample() {
  return (
    <div style={{ height: '200px' }}>
      <Slider orientation="vertical" defaultValue={50} />
    </div>
  );
}
```

수직 슬라이더의 주요 특징:
- 위에서 아래로 값이 감소합니다.
- 컨테이너 높이를 기준으로 크기가 조정됩니다.
- 모바일 화면에서 좌우 스와이프가 아닌 상하 스와이프로 조작합니다.

## 값 레이블 표시

showValueLabel 속성을 true로 설정하여 값 레이블을 표시할 수 있습니다. 또한 formatLabel 함수를 사용하여 레이블 형식을 커스터마이징할 수 있습니다.

```
// 값 레이블 표시 예제
import { Slider } from 'react-common-components-library';

function LabeledExample() {
  return (
    <>
      {/* 기본 레이블 */}
      <Slider defaultValue={40} showValueLabel />
      
      {/* 커스텀 레이블 포맷 */}
      <Slider 
        defaultValue={60} 
        showValueLabel 
        formatLabel={(val) => `${val}%`} 
      />
    </>
  );
}
```

값 레이블 기능:
- 슬라이더의 현재 값을 시각적으로 표시합니다.
- 사용자 정의 포맷을 적용할 수 있습니다(예: 퍼센트, 통화 등).
- 슬라이더 조작 시 실시간으로 업데이트됩니다.

## 제어 컴포넌트로 사용

useState와 같은 상태 관리 훅을 사용하여 제어 컴포넌트로 사용할 수 있습니다. value와 onChange 속성을 설정하면 됩니다. 또한 onChangeComplete 속성을 사용하여 슬라이더 조작이 완료되었을 때 콜백을 설정할 수 있습니다.

```
// 제어 컴포넌트 예제
import React, { useState } from 'react';
import { Slider } from 'react-common-components-library';

function ControlledExample() {
  const [sliderValue, setSliderValue] = useState(50);
  
  // 값이 변경될 때마다 로그 출력
  const handleChange = (newValue) => {
    setSliderValue(newValue);
    console.log(`슬라이더 값 변경: ${newValue}`);
  };
  
  // 조작이 완료되었을 때 로그 출력
  const handleChangeComplete = (finalValue) => {
    console.log(`조작 완료, 최종값: ${finalValue}`);
  };
  
  return (
    <div>
      <p>현재 값: {sliderValue}</p>
      <Slider 
        value={sliderValue} 
        onChange={handleChange} 
        onChangeComplete={handleChangeComplete}
        showValueLabel 
      />
    </div>
  );
}
```

제어 컴포넌트 사용 시 이점:
- 슬라이더 값을 외부 상태에서 제어할 수 있습니다.
- 값 변경에 따른 추가 로직을 실행할 수 있습니다.
- 다른 UI 요소와 값을 동기화할 수 있습니다.
- 폼 제출 시 현재 값을 쉽게 접근할 수 있습니다.

## 커스텀 범위 및 단계

min, max 속성으로 범위를 설정하고 step 속성으로 단계를 설정할 수 있습니다.

```
// 커스텀 범위 및 단계 예제
import { Slider } from 'react-common-components-library';

function CustomRangeExample() {
  return (
    <>
      {/* 음수 범위 */}
      <Slider 
        min={-50} 
        max={50} 
        defaultValue={0} 
        showValueLabel 
      />
      
      {/* 단계 설정 */}
      <Slider 
        min={0} 
        max={100} 
        step={10} 
        defaultValue={30} 
        showValueLabel 
      />
      
      {/* 작은 소수점 단계 */}
      <Slider 
        min={0} 
        max={1} 
        step={0.01} 
        defaultValue={0.5} 
        showValueLabel 
        formatLabel={(val) => val.toFixed(2)} 
      />
    </>
  );
}
```

커스텀 범위 및 단계 설정의 사용 사례:
- 온도 조절기 (-20°C ~ 40°C)
- 오디오 이퀄라이저 (-12dB ~ +12dB)
- 확대/축소 컨트롤 (0.5x ~ 3x)
- 색상 선택기의 RGB 값 (0 ~ 255)

## 다양한 스타일 옵션

variant, size, thumbSize, theme 등의 속성을 사용하여 다양한 스타일을 적용할 수 있습니다. disabled 속성으로 슬라이더를 비활성화할 수도 있습니다.

```
// 스타일 옵션 예제
import { Slider } from 'react-common-components-library';

function StyleOptionsExample() {
  return (
    <>
      {/* 다양한 크기 */}
      <Slider variant="primary" size="sm" defaultValue={25} />
      <Slider variant="primary" size="md" defaultValue={50} />
      <Slider variant="primary" size="lg" defaultValue={75} />
      
      {/* 다양한 색상 변형 */}
      <Slider variant="primary" defaultValue={60} />
      <Slider variant="secondary" defaultValue={50} />
      <Slider variant="success" defaultValue={70} />
      <Slider variant="danger" defaultValue={30} />
      <Slider variant="warning" defaultValue={40} />
      
      {/* 테마 적용 */}
      <div style={{ padding: '20px', background: '#333' }}>
        <Slider variant="success" theme="dark" defaultValue={40} />
      </div>
      
      {/* 비활성화 상태 */}
      <Slider variant="primary" disabled defaultValue={20} />
      
      {/* 커스텀 썸 크기 */}
      <Slider variant="primary" thumbSize="sm" defaultValue={30} />
      <Slider variant="primary" thumbSize="md" defaultValue={40} />
      <Slider variant="primary" thumbSize="lg" defaultValue={50} />
    </>
  );
}
```

## 접근성 지원

Slider 컴포넌트는 다음과 같은 접근성 기능을 지원합니다:

- 키보드 조작: 방향키를 사용하여 값을 조절할 수 있습니다.
- 스크린 리더 호환: ARIA 속성을 통해 현재 값과 범위 정보를 제공합니다.
- 고대비 테마: 시각적으로 구분하기 쉬운 디자인을 적용했습니다.

접근성을 향상시키기 위해 aria-label이나 aria-labelledby 속성을 추가하는 것이 좋습니다:

```
// 접근성 향상 예제
import { Slider } from 'react-common-components-library';

function AccessibleExample() {
  return (
    <>
      <label id="volume-label">음량</label>
      <Slider 
        defaultValue={70} 
        aria-labelledby="volume-label" 
        showValueLabel 
      />
      
      <Slider 
        defaultValue={50} 
        aria-label="밝기 조절" 
        showValueLabel 
      />
    </>
  );
}
```

## 속성

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `defaultValue` | `number` | `0` | 기본 슬라이더 값 (비제어 컴포넌트로 사용 시) |
| `value` | `number` | - | 현재 슬라이더 값 (제어 컴포넌트로 사용 시) |
| `min` | `number` | `0` | 최솟값 |
| `max` | `number` | `100` | 최댓값 |
| `step` | `number` | `1` | 단계 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 슬라이더의 방향 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 슬라이더의 크기 |
| `showValueLabel` | `boolean` | `false` | 값 레이블 표시 여부 |
| `formatLabel` | `(value: number) => string` | 기본 함수 | 값 레이블 포맷 함수 |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | 테마 모드 |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'` | `'primary'` | 슬라이더의 색상 변형 |
| `className` | `string` | `''` | 추가 CSS 클래스 |
| `trackClickable` | `boolean` | `true` | 슬라이더 트랙 클릭 가능 여부 |
| `thumbSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | 슬라이더 썸(핸들) 크기 |
| `onChange` | `(sliderValue: number) => void` | - | 값 변경 시 호출될 함수 |
| `onChangeComplete` | `(sliderValue: number) => void` | - | 슬라이더 조작이 완료되었을 때 호출될 함수 |
| `aria-label` | `string` | - | 슬라이더의 접근성 레이블 |
| `aria-labelledby` | `string` | - | 슬라이더를 설명하는 요소의 ID |

## 응용 예제

### 이미지 편집기의 필터 강도 조절

```
// 이미지 필터 예제
import React, { useState } from 'react';
import { Slider } from 'react-common-components-library';

function ImageFilterExample() {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  
  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
  };
  
  return (
    <div>
      <img 
        src="/example-image.jpg" 
        alt="편집 이미지" 
        style={imageStyle} 
      />
      
      <div>
        <label id="brightness-label">밝기: {brightness}%</label>
        <Slider 
          min={0} 
          max={200} 
          value={brightness} 
          onChange={setBrightness} 
          aria-labelledby="brightness-label" 
        />
      </div>
      
      <div>
        <label id="contrast-label">대비: {contrast}%</label>
        <Slider 
          min={0} 
          max={200} 
          value={contrast} 
          onChange={setContrast} 
          aria-labelledby="contrast-label" 
        />
      </div>
      
      <div>
        <label id="saturation-label">채도: {saturation}%</label>
        <Slider 
          min={0} 
          max={200} 
          value={saturation} 
          onChange={setSaturation} 
          aria-labelledby="saturation-label" 
        />
      </div>
    </div>
  );
}
```

### 가격 범위 필터

```
// 가격 범위 필터 예제
import React, { useState } from 'react';
import { Slider } from 'react-common-components-library';

function PriceRangeExample() {
  const [priceRange, setPriceRange] = useState(50000);
  
  // 가격 포맷 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(price);
  };
  
  return (
    <div>
      <h3>최대 가격: {formatPrice(priceRange)}</h3>
      
      <Slider 
        min={10000} 
        max={200000} 
        step={1000}
        value={priceRange} 
        onChange={setPriceRange}
        showValueLabel
        formatLabel={(val) => formatPrice(val)}
      />
      
      <div>
        <p>선택된 가격 범위: {formatPrice(0)} ~ {formatPrice(priceRange)}</p>
      </div>
    </div>
  );
}
``` 