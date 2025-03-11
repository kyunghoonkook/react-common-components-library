import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup, { RadioGroup as RadioGroupComponent, RadioItem } from './RadioGroup';

const meta: Meta<typeof RadioGroupComponent> = {
  title: 'Components/RadioGroup',
  component: RadioGroupComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroupComponent>;

// 기본 사용 예제
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('default');
    
    return (
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Item value="default">Default</RadioGroup.Item>
        <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
        <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
      </RadioGroup>
    );
  },
};

// 이미지와 일치하는 예제 (Comfortable 선택 상태)
export const ImageMatchingExample: Story = {
  render: () => {
    const [value, setValue] = useState('comfortable');
    
    return (
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Item value="default">Default</RadioGroup.Item>
        <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
        <RadioGroup.Item value="compact">Compact</RadioGroup.Item>
      </RadioGroup>
    );
  },
};

// 가로 방향 예제
export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    
    return (
      <RadioGroup value={value} onChange={setValue} orientation="horizontal">
        <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
        <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
        <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
      </RadioGroup>
    );
  },
};

// 크기 변형 예제
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioGroup defaultValue="small" size="sm">
        <RadioGroup.Item value="small">Small Size</RadioGroup.Item>
        <RadioGroup.Item value="small2">Another Small Option</RadioGroup.Item>
      </RadioGroup>
      
      <RadioGroup defaultValue="medium" size="md">
        <RadioGroup.Item value="medium">Medium Size (Default)</RadioGroup.Item>
        <RadioGroup.Item value="medium2">Another Medium Option</RadioGroup.Item>
      </RadioGroup>
      
      <RadioGroup defaultValue="large" size="lg">
        <RadioGroup.Item value="large">Large Size</RadioGroup.Item>
        <RadioGroup.Item value="large2">Another Large Option</RadioGroup.Item>
      </RadioGroup>
    </div>
  ),
};

// 비활성화 예제
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioGroup defaultValue="option1" disabled>
        <RadioGroup.Item value="option1">Disabled Option 1</RadioGroup.Item>
        <RadioGroup.Item value="option2">Disabled Option 2</RadioGroup.Item>
        <RadioGroup.Item value="option3">Disabled Option 3</RadioGroup.Item>
      </RadioGroup>
      
      <RadioGroup defaultValue="option1">
        <RadioGroup.Item value="option1">Enabled Option 1</RadioGroup.Item>
        <RadioGroup.Item value="option2" disabled>Disabled Option 2</RadioGroup.Item>
        <RadioGroup.Item value="option3">Enabled Option 3</RadioGroup.Item>
      </RadioGroup>
    </div>
  ),
};

// 폼 제출 예제
export const FormExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');
    const [submittedValue, setSubmittedValue] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmittedValue(selectedValue);
    };
    
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <RadioGroup 
              value={selectedValue} 
              onChange={setSelectedValue}
              name="options"
            >
              <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
              <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
              <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
            </RadioGroup>
          </div>
          
          <button 
            type="submit" 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#0f172a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>
        
        {submittedValue && (
          <div style={{ marginTop: '16px' }}>
            <p>Submitted value: <strong>{submittedValue}</strong></p>
          </div>
        )}
      </div>
    );
  },
}; 