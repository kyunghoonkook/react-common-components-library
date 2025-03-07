---
sidebar_position: 2
---

# 설치 및 시작하기

React Common Components Library를 프로젝트에 통합하는 방법을 알아보세요.

## 설치

npm을 사용하여 라이브러리를 설치합니다:

```bash
npm install react-common-components-library
```

또는 yarn을 사용하여 설치합니다:

```bash
yarn add react-common-components-library
```

## 기본 사용법

라이브러리에서 컴포넌트를 가져와 사용하는 방법은 다음과 같습니다:

```jsx
import { Button, Dialog, DropdownMenu } from 'react-common-components-library';
import 'react-common-components-library/dist/styles.css'; // 스타일 가져오기

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('클릭됨')}>
        버튼 클릭
      </Button>
    </div>
  );
}
```

## Peer Dependencies

이 라이브러리는 다음 버전의 React를 peer dependency로 가집니다:

```json
{
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
    "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
  }
}
```

## TypeScript 지원

이 라이브러리는 TypeScript로 작성되었으며, 모든 컴포넌트에 대한 타입 정의를 내장하고 있습니다:

```tsx
import { Button, ButtonProps } from 'react-common-components-library';

// 타입이 적용된 커스텀 버튼 컴포넌트
const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} className="custom-button" />;
};
``` 