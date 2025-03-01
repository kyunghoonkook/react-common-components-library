import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Collapsible, { CollapsibleProps } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    firstItem: { control: 'text' },
    restItems: { control: 'object' },
    defaultOpen: { control: 'boolean' },
    onOpenChange: { action: 'openChanged' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

// 기본 예제
export const Default: Story = {
  args: {
    title: '@peduarte starred 3 repositories',
    firstItem: '@radix-ui/primitives',
    restItems: [
      '@radix-ui/colors',
      '@stitches/react'
    ],
  },
};

// 기본적으로 열린 상태
export const DefaultOpen: Story = {
  args: {
    ...Default.args,
    defaultOpen: true,
  },
};

// 긴 목록 예제
export const LongList: Story = {
  args: {
    title: '최근 검색어',
    firstItem: 'React 컴포넌트 라이브러리',
    restItems: [
      'TypeScript 튜토리얼',
      'CSS Grid 레이아웃',
      'JavaScript 비동기 프로그래밍',
      'React Query 사용법',
      'Next.js SSR vs SSG'
    ],
  },
};

// 제어 컴포넌트
export const Controlled: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div style={{ maxWidth: '350px' }}>
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => setOpen(!open)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#0969da', 
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          외부에서 {open ? '접기' : '펼치기'}
        </button>
      </div>
      
      <Collapsible
        title="제어 컴포넌트 예제"
        firstItem="항상 표시되는 첫 번째 항목"
        restItems={[
          "제어되는 항목 1",
          "제어되는 항목 2",
          "제어되는 항목 3"
        ]}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}; 