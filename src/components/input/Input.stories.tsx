import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import './Input.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    success: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 Input
export const Default: Story = {
  args: {
    placeholder: '입력해주세요',
  },
};

// 레이블이 있는 Input
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

// 여러 크기의 Input
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input size="sm" placeholder="작은 Input" />
      <Input size="md" placeholder="중간 Input" />
      <Input size="lg" placeholder="큰 Input" />
    </div>
  ),
};

// 여러 변형의 Input
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input variant="outlined" placeholder="Outlined Input" />
      <Input variant="filled" placeholder="Filled Input" />
      <Input variant="standard" placeholder="Standard Input" />
    </div>
  ),
};

// 비활성화된 Input
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 Input',
    label: '비활성화됨',
  },
};

// 에러 상태의 Input
export const Error: Story = {
  args: {
    error: '올바른 이메일을 입력해주세요',
    placeholder: '이메일',
    value: 'invalid-email',
  },
};

// 성공 상태의 Input
export const Success: Story = {
  args: {
    success: true,
    placeholder: '이메일',
    value: 'user@example.com',
    helperText: '올바른 이메일 형식입니다',
  },
};

// 어도먼트가 있는 Input
export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input
        startAdornment={<SearchIcon />}
        placeholder="검색어를 입력하세요"
      />
      <Input
        endAdornment={<PasswordIcon />}
        type="password"
        placeholder="비밀번호"
      />
      <Input
        startAdornment={<DollarIcon />}
        endAdornment={<InfoIcon />}
        placeholder="금액을 입력하세요"
      />
    </div>
  ),
};

// 이미지에서 본 구독 폼
export const SubscribeForm: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <div>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Email</h2>
        <div className="subscribe-container">
          <Input
            placeholder="Email"
            className="subscribe-input"
            fullWidth
            aria-label="이메일 구독"
          />
          <button className="subscribe-button">
            Subscribe
          </button>
        </div>
        <p style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
          Enter your email address
        </p>
      </div>
    </div>
  ),
};

// 헬퍼 컴포넌트들 (아이콘)
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PasswordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="8"></line>
  </svg>
); 