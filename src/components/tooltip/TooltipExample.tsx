import React from 'react';
import Tooltip from './Tooltip';
import { Button } from '../../index';

const TooltipExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Tooltip 컴포넌트 예시</h2>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>기본 사용법</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Tooltip content="기본 툴팁">
            <Button>기본 툴팁</Button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>다양한 위치</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <Tooltip content="상단 툴팁" placement="top">
            <Button>상단</Button>
          </Tooltip>
          <Tooltip content="우측 툴팁" placement="right">
            <Button>우측</Button>
          </Tooltip>
          <Tooltip content="하단 툴팁" placement="bottom">
            <Button>하단</Button>
          </Tooltip>
          <Tooltip content="좌측 툴팁" placement="left">
            <Button>좌측</Button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>다양한 크기</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Tooltip content="작은 크기 툴팁" size="sm">
            <Button>Small</Button>
          </Tooltip>
          <Tooltip content="중간 크기 툴팁" size="md">
            <Button>Medium</Button>
          </Tooltip>
          <Tooltip content="큰 크기 툴팁" size="lg">
            <Button>Large</Button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>트리거 타입</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Tooltip content="호버 시 표시" trigger="hover">
            <Button>Hover</Button>
          </Tooltip>
          <Tooltip content="클릭 시 표시" trigger="click">
            <Button>Click</Button>
          </Tooltip>
          <Tooltip content="포커스 시 표시" trigger="focus">
            <Button>Focus</Button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>화살표 옵션</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Tooltip content="화살표 있음" showArrow={true}>
            <Button>화살표 있음</Button>
          </Tooltip>
          <Tooltip content="화살표 없음" showArrow={false}>
            <Button>화살표 없음</Button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>딜레이</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Tooltip 
            content="표시 딜레이: 1000ms" 
            delayDuration={1000}>
            <Button>긴 딜레이</Button>
          </Tooltip>
          <Tooltip 
            content="표시 딜레이: 200ms" 
            delayDuration={200}>
            <Button>짧은 딜레이</Button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>컨트롤드 모드</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button onClick={() => setVisible(!visible)}>
            {visible ? '툴팁 숨기기' : '툴팁 표시하기'}
          </Button>
          <div style={{ marginTop: '20px' }}>
            <Tooltip
              content="controlled 모드 툴팁"
              open={visible}
              onOpenChange={setVisible}
            >
              <Button>Controlled 툴팁</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>다양한 내용</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <Tooltip 
            content={
              <div>
                <h4 style={{ margin: '0 0 8px 0' }}>커스텀 내용</h4>
                <p style={{ margin: 0 }}>다양한 HTML 요소와 스타일을 포함할 수 있습니다.</p>
              </div>
            }
          >
            <Button>HTML 내용</Button>
          </Tooltip>
          <Tooltip 
            content="이것은 매우 긴 텍스트 내용입니다. 툴팁은 길이가 긴 텍스트를 표시할 때 자동으로 여러 줄로 나뉘어 표시됩니다. 텍스트가 충분히 길면 텍스트가 줄바꿈됩니다."
          >
            <Button>긴 텍스트</Button>
          </Tooltip>
        </div>
      </section>
    </div>
  );
};

export default TooltipExample; 