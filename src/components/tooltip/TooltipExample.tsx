import React from 'react';
import Tooltip from './Tooltip';
import { Button } from '../../index';

const TooltipExample: React.FC = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Tooltip 예제</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>기본 사용법</h3>
          <Tooltip content="기본 툴팁입니다">
            <Button>마우스를 올려보세요</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>화살표 없음</h3>
          <Tooltip content="화살표 없는 툴팁입니다" arrow={false}>
            <Button>화살표 없음</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>상단 배치</h3>
          <Tooltip content="상단에 표시" placement="top">
            <Button>상단 툴팁</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>우측 배치</h3>
          <Tooltip content="우측에 표시" placement="right">
            <Button>우측 툴팁</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>하단 배치</h3>
          <Tooltip content="하단에 표시" placement="bottom">
            <Button>하단 툴팁</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>좌측 배치</h3>
          <Tooltip content="좌측에 표시" placement="left">
            <Button>좌측 툴팁</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>작은 크기</h3>
          <Tooltip content="작은 툴팁" size="sm">
            <Button>Small</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>중간 크기</h3>
          <Tooltip content="중간 크기 툴팁" size="md">
            <Button>Medium</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>큰 크기</h3>
          <Tooltip content="큰 크기 툴팁" size="lg">
            <Button>Large</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>클릭 시 표시</h3>
          <Tooltip content="클릭으로 표시/숨김" trigger="click">
            <Button>클릭하세요</Button>
          </Tooltip>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>긴 텍스트</h3>
          <Tooltip content="이것은 매우 긴 텍스트 내용입니다. 툴팁은 길이가 긴 텍스트를 표시할 때 자동으로 여러 줄로 나뉘어 표시됩니다. 텍스트가 충분히 길면 텍스트가 줄바꿈됩니다.">
            <Button>긴 텍스트</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TooltipExample; 