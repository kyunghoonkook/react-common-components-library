import React from 'react';
import { createRoot } from 'react-dom/client';
// 트리쉐이킹 ESM 방식 (기본 임포트)
import { Button, Input, Accordion, Tabs, Dialog } from 'react-common-components-library';
// 아래 컴포넌트들은 사용하지 않으므로 트리쉐이킹이 제대로 작동한다면 번들에 포함되지 않아야 함
// import { ThemeProvider, ThemeToggle, Avatar, AlertDialog, AspectRatio, Label } from 'react-common-components-library';

// 간단한 앱 컴포넌트
const App = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>트리쉐이킹 적용 테스트 (ESM)</h1>
      <p>이 프로젝트는 ESM 모듈 방식을 사용하여 트리쉐이킹 최적화를 시도합니다.</p>
      
      <h2>버튼 컴포넌트</h2>
      <Button>기본 버튼</Button>
      
      <h2>입력 컴포넌트</h2>
      <Input label="이름" placeholder="이름을 입력하세요" />
      
      <h2>아코디언 컴포넌트</h2>
      <Accordion 
        items={[
          { title: '섹션 1', content: '첫 번째 섹션 내용입니다.' },
          { title: '섹션 2', content: '두 번째 섹션 내용입니다.' }
        ]}
      />
      
      <h2>탭 컴포넌트</h2>
      <Tabs 
        items={[
          { label: '탭 1', content: '첫 번째 탭 내용입니다.' },
          { label: '탭 2', content: '두 번째 탭 내용입니다.' }
        ]}
      />
      
      <h2>다이얼로그 컴포넌트</h2>
      <Dialog 
        trigger={<Button>다이얼로그 열기</Button>}
        title="다이얼로그 제목"
        content="다이얼로그 내용입니다."
      />
    </div>
  );
};

// React 18 방식으로 렌더링
const root = createRoot(document.getElementById('root'));
root.render(<App />); 