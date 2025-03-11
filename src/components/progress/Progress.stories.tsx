import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

// 기본 예제
export const Basic: Story = {
  args: {
    value: 60,
  },
};

// 레이블이 있는 예제
export const WithLabel: Story = {
  args: {
    value: 60,
    label: '진행 상태',
  },
};

// 값 표시 예제
export const WithValue: Story = {
  args: {
    value: 60,
    showValue: true,
  },
};

// 레이블과 값 모두 표시하는 예제
export const WithLabelAndValue: Story = {
  args: {
    value: 60,
    label: '진행 상태',
    showValue: true,
  },
};

// 다양한 크기 예제
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={60} size="sm" label="Small" />
      <Progress value={60} size="md" label="Medium (Default)" />
      <Progress value={60} size="lg" label="Large" />
    </div>
  ),
};

// 다양한 색상 예제
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={60} color="primary" label="Primary" />
      <Progress value={60} color="secondary" label="Secondary" />
      <Progress value={60} color="success" label="Success" />
      <Progress value={60} color="danger" label="Danger" />
      <Progress value={60} color="warning" label="Warning" />
      <Progress value={60} color="info" label="Info" />
    </div>
  ),
};

// 애니메이션 예제
export const Animated: Story = {
  args: {
    value: 60,
    animated: true,
    label: '애니메이션 효과',
  },
};

// 다양한 진행률 예제
export const DifferentValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Progress value={0} showValue label="0%" />
      <Progress value={25} showValue label="25%" />
      <Progress value={50} showValue label="50%" />
      <Progress value={75} showValue label="75%" />
      <Progress value={100} showValue label="100%" />
    </div>
  ),
};

// 이미지에서 보이는 것과 동일한 예제
export const MatchingImage: Story = {
  args: {
    value: 66,
    size: 'md',
    color: 'primary',
  },
}; 