import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args: JSX.IntrinsicAttributes & ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: 'Button',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  children: 'Button',
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
  children: 'Button',
};

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Loading',
  isLoading: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Full Width Button',
  fullWidth: true,
};

export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
    <Button 
      leftIcon={<span>←</span>}
    >
      Back
    </Button>
    <Button 
      rightIcon={<span>→</span>}
    >
      Next
    </Button>
    <Button 
      leftIcon={<span>⬇</span>} 
      rightIcon={<span>⬇</span>}
    >
      Download
    </Button>
  </div>
); 