import React from 'react';
import { Tooltip } from './Tooltip';

export const TooltipExample: React.FC = () => {
  return (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="이것은 툴팁입니다">
        <button style={{ padding: '10px 20px' }}>마우스를 올려보세요</button>
      </Tooltip>
    </div>
  );
}; 