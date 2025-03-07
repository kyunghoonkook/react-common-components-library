import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HoverCard, { HoverCardProps } from './HoverCard';
import './HoverCard.css';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
    width: { control: 'text' },
    showArrow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

// 기본 사용 예시
export const Basic: Story = {
  args: {
    trigger: <span style={{ fontWeight: 'bold', color: '#6366f1' }}>@홍길동</span>,
    content: (
      <div style={{ padding: '8px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>홍길동</div>
        <div>프론트엔드 개발자</div>
        <div>React | TypeScript</div>
      </div>
    ),
    position: 'bottom',
    openDelay: 300,
    closeDelay: 300,
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <span>이 글은 </span>
      <HoverCard {...args} />
      <span> 님이 작성했습니다.</span>
    </div>
  ),
};

// 다양한 위치 옵션 예시
export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '100px 50px', width: '600px' }}>
      <HoverCard
        trigger={<button>Top</button>}
        content={<div>상단에 표시되는 호버 카드입니다.</div>}
        position="top"
      />
      
      <HoverCard
        trigger={<button>Right</button>}
        content={<div>오른쪽에 표시되는 호버 카드입니다.</div>}
        position="right"
      />
      
      <HoverCard
        trigger={<button>Bottom</button>}
        content={<div>하단에 표시되는 호버 카드입니다.</div>}
        position="bottom"
      />
      
      <HoverCard
        trigger={<button>Left</button>}
        content={<div>왼쪽에 표시되는 호버 카드입니다.</div>}
        position="left"
      />
    </div>
  ),
};

// 지연 시간 조절 예시
export const Delays: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '50px' }}>
      <HoverCard
        trigger={<button>빠른 표시 (100ms)</button>}
        content={<div>마우스를 올리면 빠르게 표시됩니다.</div>}
        openDelay={100}
        closeDelay={300}
      />
      
      <HoverCard
        trigger={<button>느린 표시 (800ms)</button>}
        content={<div>마우스를 올리면 느리게 표시됩니다.</div>}
        openDelay={800}
        closeDelay={300}
      />
    </div>
  ),
};

// 프로필 카드 예시
export const ProfileCard: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <p>
        이 글은 
        <HoverCard
          trigger={<span style={{ fontWeight: 'bold', color: '#6366f1', margin: '0 4px' }}>@홍길동</span>}
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="https://i.pravatar.cc/100"
                  alt="홍길동"
                  style={{ width: '48px', height: '48px', borderRadius: '24px' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>홍길동</div>
                  <div style={{ color: '#666' }}>@honggildong</div>
                </div>
              </div>
              <div>프론트엔드 개발자 | React, TypeScript 전문</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div>팔로워: 1,234</div>
                <div>팔로잉: 567</div>
              </div>
              <button style={{ 
                backgroundColor: '#6366f1', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer'
              }}>
                팔로우
              </button>
            </div>
          }
          width="300px"
        />
        에 의해 작성되었습니다.
      </p>
    </div>
  ),
};

// 제어 컴포넌트 예시
const ControlledExample = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div style={{ padding: '50px' }}>
      <div style={{ marginBottom: '10px' }}>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          마우스를 올려보세요
        </button>
      </div>
      
      <div style={{ height: '100px' }}>
        {isHovered && (
          <div style={{ 
            position: 'relative', 
            border: '1px solid #e2e8f0',
            padding: '16px',
            borderRadius: '6px',
            width: '250px',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}>
            상태로 제어되는 호버 카드입니다.
          </div>
        )}
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />
};

// 커스텀 스타일링 예시
export const CustomStyles: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <HoverCard
        trigger={<span style={{ color: 'purple', textDecoration: 'underline', cursor: 'help' }}>용어 설명</span>}
        content={
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>호버 카드</h4>
            <p style={{ margin: 0 }}>마우스를 특정 요소 위에 올렸을 때 추가 정보를 제공하는 UI 요소입니다.</p>
          </div>
        }
        cardStyle={{ 
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
        }}
        showArrow={true}
        arrowStyle={{
          background: '#6366f1'
        }}
        width="300px"
      />
    </div>
  ),
}; 