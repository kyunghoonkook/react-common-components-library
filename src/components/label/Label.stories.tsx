import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Label from './Label';
import './Label.css';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    hasCheckbox: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// 기본 레이블
export const Default: Story = {
  args: {
    children: '이름',
    htmlFor: 'name-input',
  },
};

// 체크박스 레이블
export const WithCheckbox: Story = {
  args: {
    children: '이용약관에 동의합니다',
    hasCheckbox: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Label
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Label size="sm" hasCheckbox>작은 레이블</Label>
      <Label size="md" hasCheckbox>중간 레이블</Label>
      <Label size="lg" hasCheckbox>큰 레이블</Label>
    </div>
  ),
};

// 필수 필드
export const Required: Story = {
  args: {
    children: '이름',
    required: true,
    htmlFor: 'required-input',
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    children: '이용약관에 동의해주세요',
    hasCheckbox: true,
    error: true,
    errorMessage: '계속하려면 이용약관에 동의해야 합니다',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    children: '비활성화된 옵션',
    hasCheckbox: true,
    disabled: true,
  },
};

// 이미지에서 본 Accept terms and condition 예제
export const AcceptTerms: Story = {
  render: () => {
    const [accepted, setAccepted] = useState(false);
    return (
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <Label
          hasCheckbox
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          labelClassName="terms-label"
          checkboxClassName="terms-checkbox"
        >
          Accept terms and condition
        </Label>
      </div>
    );
  },
};

// 입력 필드와 함께 사용
export const WithInputField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
      <Label htmlFor="email-input" required>이메일</Label>
      <input
        type="email"
        id="email-input"
        placeholder="이메일을 입력하세요"
        style={{
          padding: '0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #cbd5e1',
          fontSize: '1rem',
        }}
      />
    </div>
  ),
}; 