import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '기본적으로 표시할 플레이스홀더 텍스트',
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
    },
    defaultValue: {
      control: 'text',
      description: '기본 선택 값 (제어되지 않는 컴포넌트로 사용 시)',
    },
    disabled: {
      control: 'boolean',
      description: '컴포넌트 비활성화 여부',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '컴포넌트의 크기',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark', 'auto'],
      description: '테마 모드',
    },
    required: {
      control: 'boolean',
      description: '선택 필수 여부',
    },
    maxDropdownHeight: {
      control: 'number',
      description: '최대 드롭다운 높이 (px)',
    },
    onChange: { action: 'onChange' },
    onOpenChange: { action: 'onOpenChange' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// 기본 예제
export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'grapes', label: 'Grapes' },
      { value: 'pineapple', label: 'Pineapple' },
    ],
    onChange: fn(),
  },
};

// 그룹 옵션 예제 (이미지와 동일한 예제)
export const GroupedOptions: Story = {
  args: {
    placeholder: 'Select an option',
    defaultValue: 'grapes',
    options: [
      {
        label: 'Fruits',
        options: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'blueberry', label: 'Blueberry' },
          { value: 'grapes', label: 'Grapes' },
          { value: 'pineapple', label: 'Pineapple' },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          { value: 'aubergine', label: 'Auberigine' },
          { value: 'broccoli', label: 'Broccoli' },
          { value: 'carrot', label: 'Carrot', disabled: true },
          { value: 'leek', label: 'Leek' },
        ],
      },
      {
        label: 'Meat',
        options: [
          { value: 'beef', label: 'Beef' },
          { value: 'chicken', label: 'Chicken' },
          { value: 'lamb', label: 'Lamb' },
        ],
      },
    ],
    onChange: fn(),
  },
};

// 비활성화된 Select
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled select',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
    ],
    disabled: true,
    onChange: fn(),
  },
};

// 다크 테마
export const DarkTheme: Story = {
  args: {
    placeholder: 'Select an option',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'grapes', label: 'Grapes' },
      { value: 'pineapple', label: 'Pineapple' },
    ],
    theme: 'dark',
    onChange: fn(),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 비활성화된 옵션이 있는 예제
export const WithDisabledOptions: Story = {
  args: {
    placeholder: 'Select an option',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'grapes', label: 'Grapes', disabled: true },
      { value: 'pineapple', label: 'Pineapple' },
    ],
    onChange: fn(),
  },
};

// 긴 목록 예제
export const LongList: Story = {
  args: {
    placeholder: 'Select an option',
    options: Array.from({ length: 20 }, (_, i) => ({ 
      value: `option-${i + 1}`, 
      label: `Option ${i + 1}` 
    })),
    maxDropdownHeight: 250,
    onChange: fn(),
  },
}; 