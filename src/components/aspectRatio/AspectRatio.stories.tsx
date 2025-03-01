import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AspectRatio, AspectRatioProps } from './AspectRatio';

export default {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  argTypes: {
    ratio: { control: 'number' },
    heightRatio: { control: 'number' },
    className: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<AspectRatioProps> = (args: JSX.IntrinsicAttributes & AspectRatioProps) => <AspectRatio {...args} />;

export const Default = Template.bind({});
Default.args = {
  ratio: 16,
  heightRatio: 9,
  children: (
    <div style={{ 
      backgroundColor: '#6366f1', 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    }}>
      16:9 비율
    </div>
  ),
};

export const Square = Template.bind({});
Square.args = {
  ratio: 1,
  heightRatio: 1,
  children: (
    <div style={{ 
      backgroundColor: '#f43f5e', 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    }}>
      1:1 비율
    </div>
  ),
};

export const Portrait = Template.bind({});
Portrait.args = {
  ratio: 9,
  heightRatio: 16,
  children: (
    <div style={{ 
      backgroundColor: '#10b981', 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    }}>
      9:16 비율
    </div>
  ),
}; 