import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Separator from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '구분선 방향',
    },
    decorative: {
      control: 'boolean',
      description: '데코레이티브 여부 (더 두껍게 표시)',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning'],
      description: '구분선 색상 변형',
    },
    dashed: {
      control: 'boolean',
      description: '점선 스타일 사용 여부',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark', 'auto'],
      description: '테마 모드',
    },
    withSpacing: {
      control: 'boolean',
      description: '구분선 위아래(또는 좌우) 간격 추가 여부',
    },
    spacing: {
      control: 'number',
      description: '간격 크기 (px)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

// 기본 수평 구분선
export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <div>상단 콘텐츠</div>
      <Separator {...args} />
      <div>하단 콘텐츠</div>
    </div>
  ),
};

// 수직 구분선
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
      <div>왼쪽 콘텐츠</div>
      <Separator {...args} style={{ margin: '0 16px', height: '80%' }} />
      <div>오른쪽 콘텐츠</div>
    </div>
  ),
};

// 데코레이티브 구분선
export const Decorative: Story = {
  args: {
    decorative: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <div>상단 콘텐츠</div>
      <Separator {...args} />
      <div>하단 콘텐츠</div>
    </div>
  ),
};

// 색상 변형
export const ColorVariants: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div>기본</div>
        <Separator variant="default" />
      </div>
      <div>
        <div>프라이머리</div>
        <Separator variant="primary" />
      </div>
      <div>
        <div>세컨더리</div>
        <Separator variant="secondary" />
      </div>
      <div>
        <div>성공</div>
        <Separator variant="success" />
      </div>
      <div>
        <div>위험</div>
        <Separator variant="danger" />
      </div>
      <div>
        <div>경고</div>
        <Separator variant="warning" />
      </div>
    </div>
  ),
};

// 점선 스타일
export const Dashed: Story = {
  args: {
    dashed: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <div>상단 콘텐츠</div>
      <Separator {...args} />
      <div>하단 콘텐츠</div>
    </div>
  ),
};

// 다크 테마
export const DarkTheme: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <div style={{ width: '300px', color: 'white' }}>
      <div>상단 콘텐츠</div>
      <Separator {...args} />
      <div>하단 콘텐츠</div>
    </div>
  ),
};

// 간격이 있는 구분선
export const WithSpacing: Story = {
  args: {
    withSpacing: true,
    spacing: 24,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <div>상단 콘텐츠</div>
      <Separator {...args} />
      <div>하단 콘텐츠</div>
    </div>
  ),
};

// 실제 사용 예시 - 헤더 구분선
export const HeaderExample: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Radix Primitives</h1>
      <p style={{ margin: '0 0 16px 0' }}>An open-source UI component library.</p>
      <Separator decorative />
      <div style={{ display: 'flex', marginTop: '16px' }}>
        <span style={{ marginRight: '24px' }}>Blog</span>
        <Separator orientation="vertical" style={{ height: '20px', margin: '0 24px 0 0' }} />
        <span style={{ marginRight: '24px' }}>Docs</span>
        <Separator orientation="vertical" style={{ height: '20px', margin: '0 24px 0 0' }} />
        <span>Source</span>
      </div>
    </div>
  ),
};

// 메뉴 구분선 예시
export const MenuExample: Story = {
  render: () => (
    <div style={{ width: '200px', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <div style={{ padding: '8px' }}>프로필 보기</div>
      <div style={{ padding: '8px' }}>설정</div>
      <Separator withSpacing style={{ margin: '4px 0' }} />
      <div style={{ padding: '8px' }}>도움말</div>
      <div style={{ padding: '8px' }}>피드백 보내기</div>
      <Separator withSpacing style={{ margin: '4px 0' }} />
      <div style={{ padding: '8px', color: '#e53e3e' }}>로그아웃</div>
    </div>
  ),
}; 