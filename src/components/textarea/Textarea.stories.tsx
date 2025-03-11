import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Textarea, TextareaProps } from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    rows: { control: 'number' },
    maxHeight: { control: 'number' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<TextareaProps> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '텍스트를 입력하세요...',
  rows: 3,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: '코멘트',
  placeholder: '코멘트를 입력하세요...',
  rows: 3,
};

export const WithDescriptionAndLabel = Template.bind({});
WithDescriptionAndLabel.args = {
  label: '자기 소개',
  description: '간단한 자기 소개를 작성해 주세요.',
  placeholder: '자기 소개를 입력하세요...',
  rows: 4,
};

export const WithError = Template.bind({});
WithError.args = {
  label: '바이오',
  placeholder: '자기 소개를 입력하세요...',
  error: true,
  errorMessage: '바이오는 필수 입력 항목입니다.',
  rows: 3,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: '코멘트',
  placeholder: '텍스트를 입력하세요...',
  disabled: true,
  value: '이 텍스트는 수정할 수 없습니다.',
  rows: 3,
};

export const WithAutoResize = Template.bind({});
WithAutoResize.args = {
  label: '자동 크기 조절',
  placeholder: '텍스트를 입력하면 높이가 자동으로 조절됩니다...',
  autoResize: true,
  rows: 2,
  maxHeight: 200,
};

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <Textarea
      label="작은 크기 (Small)"
      placeholder="작은 크기 텍스트 영역..."
      size="sm"
    />
    
    <Textarea
      label="중간 크기 (Medium)"
      placeholder="중간 크기 텍스트 영역..."
      size="md"
    />
    
    <Textarea
      label="큰 크기 (Large)"
      placeholder="큰 크기 텍스트 영역..."
      size="lg"
    />
  </div>
);

export const ProfileBio = Template.bind({});
ProfileBio.args = {
  label: '자기 소개',
  placeholder: '당신에 대해 알려주세요...',
  rows: 5,
  maxHeight: 300,
  defaultValue: 'UI/UX 디자이너이자 개발자입니다. 사용자 친화적인 인터페이스와 깔끔한 코드를 작성하기 위해 노력하고 있습니다.',
}; 