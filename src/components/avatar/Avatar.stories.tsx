import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
    bordered: { control: 'boolean' },
    online: { control: 'boolean' },
    className: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<AvatarProps> = (args: JSX.IntrinsicAttributes & AvatarProps) => <Avatar {...args} />;

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://i.pravatar.cc/300',
  alt: '사용자 이미지',
  size: 'md',
  shape: 'circle',
};

export const WithInitials = Template.bind({});
WithInitials.args = {
  alt: '홍길동',
  size: 'md',
  shape: 'circle',
};

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Avatar size="xs" alt="XS" />
    <Avatar size="sm" alt="SM" />
    <Avatar size="md" alt="MD" />
    <Avatar size="lg" alt="LG" />
    <Avatar size="xl" alt="XL" />
  </div>
);

export const Shapes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Avatar shape="circle" alt="원형" />
    <Avatar shape="square" alt="사각형" />
  </div>
);

export const WithStatus = Template.bind({});
WithStatus.args = {
  src: 'https://i.pravatar.cc/300',
  alt: '온라인 사용자',
  online: true,
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  src: 'https://i.pravatar.cc/300',
  alt: '테두리 있는 아바타',
  bordered: true,
}; 