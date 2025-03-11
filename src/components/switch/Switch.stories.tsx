import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<SwitchProps> = (args: JSX.IntrinsicAttributes & SwitchProps) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '비행기 모드',
};

export const Checked = Template.bind({});
Checked.args = {
  children: '비행기 모드 켜짐',
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  children: '비행기 모드 꺼짐',
  checked: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: '비활성화',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  children: '비활성화 & 켜짐',
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
    <Switch size="sm">작은 크기</Switch>
    <Switch size="md">중간 크기</Switch>
    <Switch size="lg">큰 크기</Switch>
  </div>
);

export const ControlledSwitch = () => {
  const [checked, setChecked] = React.useState(false);
  
  return (
    <Switch
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      {checked ? '켜짐' : '꺼짐'}
    </Switch>
  );
}; 