---
sidebar_position: 3
---

# AspectRatio

지정된 가로세로 비율을 유지하는 컨테이너 컴포넌트입니다. 이미지, 비디오 또는 기타 콘텐츠의 비율을 유지하는 데 유용합니다.

## 기본 사용법

```jsx
import { AspectRatio } from 'react-common-components-library';

function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9} style={{ maxWidth: '600px' }}>
      <img 
        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
        alt="우주에서 본 지구"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </AspectRatio>
  );
}
```

## 다양한 비율 예제

여러 가지 일반적인 가로세로 비율을 사용할 수 있습니다:

```jsx
import { AspectRatio } from 'react-common-components-library';

function MultipleRatiosExample() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
      <div>
        <h3>16:9 (와이드스크린)</h3>
        <AspectRatio ratio={16 / 9}>
          <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            16:9
          </div>
        </AspectRatio>
      </div>
      
      <div>
        <h3>4:3 (기존 TV)</h3>
        <AspectRatio ratio={4 / 3}>
          <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            4:3
          </div>
        </AspectRatio>
      </div>
      
      <div>
        <h3>1:1 (정사각형)</h3>
        <AspectRatio ratio={1}>
          <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            1:1
          </div>
        </AspectRatio>
      </div>
      
      <div>
        <h3>9:16 (모바일)</h3>
        <AspectRatio ratio={9 / 16}>
          <div style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            9:16
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
```

## 비디오 포함하기

AspectRatio는 비디오와 같은 미디어 요소를 포함하는 데 특히 유용합니다:

```jsx
import { AspectRatio } from 'react-common-components-library';

function VideoAspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9} style={{ maxWidth: '800px' }}>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube 비디오"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </AspectRatio>
  );
}
```

## API 참조

### AspectRatio Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `ratio` | `number` | 1 | 가로세로 비율 (가로/세로) |
| `children` | `ReactNode` | 필수 | 컨테이너 내부에 렌더링할 콘텐츠 |
| `className` | `string` | '' | 컴포넌트에 적용할 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 컴포넌트에 적용할 인라인 스타일 |

## 일반적인 가로세로 비율

| 이름 | 비율 | 용도 |
|------|------|------|
| 16:9 | 1.78:1 | 현대 TV, 모니터, 유튜브 비디오 |
| 4:3 | 1.33:1 | 기존 TV와 모니터 |
| 1:1 | 1:1 | 정사각형, 프로필 사진 |
| 21:9 | 2.33:1 | 울트라와이드 모니터, 시네마스코프 |
| 3:2 | 1.5:1 | 35mm 필름, 디지털 카메라 |
| 9:16 | 0.56:1 | 모바일 전체 화면, 틱톡/인스타그램 릴스 |

## 접근성

AspectRatio 컴포넌트는 단순한 레이아웃 컴포넌트이지만 접근성을 고려할 때 다음 사항을 권장합니다:

- 내부에 이미지나 비디오를 포함할 때 적절한 대체 텍스트나 제목을 제공하세요.
- 비디오를 포함할 때 가능한 경우 자막을 제공하는 것이 좋습니다.
- AspectRatio 자체는 접근성 속성을 필요로 하지 않지만, 내부 콘텐츠는 접근성 지침을 따라야 합니다. 