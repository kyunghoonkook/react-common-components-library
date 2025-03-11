import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover, { PopoverField } from './Popover';
import Button from '../button/Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// 기본 사용 예제
export const Basic: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Popover
        trigger={<Button>클릭하세요</Button>}
        title="팝오버 제목"
        description="팝오버 컴포넌트에 대한 설명입니다."
      >
        <div>
          <p>팝오버 내용을 여기에 넣을 수 있습니다.</p>
          <p>다양한 콘텐츠를 포함할 수 있습니다.</p>
        </div>
      </Popover>
    </div>
  ),
};

// 디자인 시안과 일치하는 치수 설정 예제
export const DimensionsExample: Story = {
  render: () => {
    // 필드 상태 관리
    const [width, setWidth] = useState('100%');
    const [maxWidth, setMaxWidth] = useState('300px');
    const [height, setHeight] = useState('25px');
    const [maxHeight, setMaxHeight] = useState('none');
    
    return (
      <div style={{ padding: '100px' }}>
        <Popover
          trigger={<Button>치수 설정</Button>}
          title="치수 설정"
          description="Set the dimensions for the layer."
          width={260}
        >
          <PopoverField
            label="Width"
            value={width}
            onChange={setWidth}
          />
          <PopoverField
            label="Max. width"
            value={maxWidth}
            onChange={setMaxWidth}
          />
          <PopoverField
            label="Height"
            value={height}
            onChange={setHeight}
          />
          <PopoverField
            label="Max. height"
            value={maxHeight}
            onChange={setMaxHeight}
          />
        </Popover>
      </div>
    );
  },
};

// 위치 옵션 예제
export const PositionVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', padding: '100px' }}>
      <Popover
        trigger={<Button>상단</Button>}
        title="상단 팝오버"
        position="top"
      >
        <div>
          상단에 표시되는 팝오버입니다.
        </div>
      </Popover>
      
      <Popover
        trigger={<Button>우측</Button>}
        title="우측 팝오버"
        position="right"
      >
        <div>
          우측에 표시되는 팝오버입니다.
        </div>
      </Popover>
      
      <Popover
        trigger={<Button>하단</Button>}
        title="하단 팝오버"
        position="bottom"
      >
        <div>
          하단에 표시되는 팝오버입니다.
        </div>
      </Popover>
      
      <Popover
        trigger={<Button>좌측</Button>}
        title="좌측 팝오버"
        position="left"
      >
        <div>
          좌측에 표시되는 팝오버입니다.
        </div>
      </Popover>
    </div>
  ),
};

// 제어 컴포넌트 방식 예제
export const ControlledExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '100px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Button onClick={() => setOpen(!open)}>
            {open ? '팝오버 닫기' : '팝오버 열기'}
          </Button>
        </div>
        
        <Popover
          trigger={<Button>팝오버 트리거</Button>}
          title="제어 컴포넌트"
          description="외부 상태로 열림/닫힘을 제어할 수 있습니다."
          open={open}
          onOpenChange={setOpen}
        >
          <div>
            <p>이 팝오버는 외부 상태에 의해 제어됩니다.</p>
            <p>위의 버튼으로 열고 닫을 수 있습니다.</p>
          </div>
        </Popover>
      </div>
    );
  },
};

// 복잡한 컨텐츠 예제
export const ComplexContent: Story = {
  render: () => {
    const [color, setColor] = useState('#6366F1');
    const [opacity, setOpacity] = useState('100');
    const [blur, setBlur] = useState('0');
    
    return (
      <div style={{ padding: '100px' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          backgroundColor: color,
          opacity: parseInt(opacity) / 100,
          filter: `blur(${blur}px)`,
          borderRadius: '8px'
        }} />
        
        <div style={{ marginTop: '20px' }}>
          <Popover
            trigger={<Button>스타일 설정</Button>}
            title="스타일 수정"
            description="박스의 스타일을 수정할 수 있습니다."
            width={260}
          >
            <PopoverField
              label="색상"
              type="color"
              value={color}
              onChange={setColor}
            />
            <PopoverField
              label="불투명도"
              type="range"
              value={opacity}
              onChange={setOpacity}
            />
            <PopoverField
              label="블러"
              type="range"
              value={blur}
              onChange={setBlur}
            />
          </Popover>
        </div>
      </div>
    );
  },
}; 