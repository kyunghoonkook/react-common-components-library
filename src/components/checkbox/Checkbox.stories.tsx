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

export const Checked = Template.bind({});
Checked.args = {
  children: '선택됨',
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  children: '미선택',
  checked: false,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  children: '부분 선택',
  indeterminate: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: '비활성화',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  children: '비활성화 & 선택',
  disabled: true,
  checked: true,
};

export const WithError = Template.bind({});
WithError.args = {
  children: '에러 상태',
  error: true,
};

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox size="sm">작은 크기</Checkbox>
    <Checkbox size="md">중간 크기</Checkbox>
    <Checkbox size="lg">큰 크기</Checkbox>
  </div>
); 