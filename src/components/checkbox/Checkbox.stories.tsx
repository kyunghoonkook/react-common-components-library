import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<CheckboxProps> = (args: JSX.IntrinsicAttributes & CheckboxProps) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '이용 약관에 동의합니다',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  children: '마케팅 정보 수신 동의',
  description: '신규 서비스 및 이벤트 정보를 받아보실 수 있습니다.',
};

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox variant="default">기본 체크박스</Checkbox>
    <Checkbox variant="success" checked>성공 상태</Checkbox>
    <Checkbox variant="warning">경고 상태</Checkbox>
    <Checkbox variant="error">에러 상태</Checkbox>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox size="sm">작은 크기</Checkbox>
    <Checkbox size="md">중간 크기</Checkbox>
    <Checkbox size="lg">큰 크기</Checkbox>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox checked>선택됨</Checkbox>
    <Checkbox>미선택</Checkbox>
    <Checkbox indeterminate>부분 선택</Checkbox>
    <Checkbox disabled>비활성화</Checkbox>
    <Checkbox disabled checked>비활성화 & 선택</Checkbox>
    <Checkbox error>에러 상태</Checkbox>
  </div>
);

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  children: '커스텀 아이콘',
  icon: (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M13.3334 4L6.00008 11.3333L2.66675 8" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  ),
}; 