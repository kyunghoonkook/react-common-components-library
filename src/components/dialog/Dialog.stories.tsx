import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dialog, { FormField } from './Dialog';
import './Dialog.css';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    title: { control: 'text' },
    description: { control: 'text' },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    width: { control: 'text' },
    maxWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// 인터랙티브 예제를 위한 컴포넌트
const DialogExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#4F46E5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        다이얼로그 열기
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="다이얼로그 제목"
        description="이것은 기본 다이얼로그 예제입니다. 모달 형태로 화면에 표시되며, 배경을 클릭하거나 ESC 키를 눌러 닫을 수 있습니다."
        footer={
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              style={{
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
              onClick={() => setIsOpen(false)}
            >
              취소
            </button>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                alert('확인 버튼이 클릭되었습니다.');
                setIsOpen(false);
              }}
            >
              확인
            </button>
          </div>
        }
      >
        <p>다이얼로그 내용을 여기에 작성합니다.</p>
        <p>여러 줄의 내용을 표시할 수 있습니다.</p>
      </Dialog>
    </div>
  );
};

// 기본 다이얼로그 예제
export const Default: Story = {
  render: () => <DialogExample />,
};

// 프로필 편집 폼 예제
const ProfileFormExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Email',
    username: '@peduarte',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`프로필 저장됨:\n이름: ${formData.name}\n사용자명: ${formData.username}`);
    setIsOpen(false);
  };
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#111827',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        프로필 편집
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
        submitText="Save changes"
        onSubmit={handleSubmit}
        style={{ maxWidth: '600px' }}
      >
        <FormField label="Name">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormField>
        
        <FormField label="Username">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormField>
      </Dialog>
    </div>
  );
};

export const ProfileForm: Story = {
  render: () => <ProfileFormExample />,
};

// 커스텀 내용이 있는 다이얼로그
const CustomContentExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#10B981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        커스텀 다이얼로그 열기
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="커스텀 콘텐츠"
        maxWidth="400px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <img 
            src="https://placekitten.com/400/200" 
            alt="Random cat" 
            style={{ borderRadius: '4px', width: '100%' }}
          />
          <p style={{ margin: 0 }}>
            이 다이얼로그는 이미지와 같은 커스텀 콘텐츠를 포함합니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export const CustomContent: Story = {
  render: () => <CustomContentExample />,
};

// 확인 다이얼로그
const ConfirmationExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        삭제 확인 다이얼로그
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="정말 삭제하시겠습니까?"
        description="이 작업은 되돌릴 수 없으며, 모든 관련 데이터가 영구적으로 삭제됩니다."
        maxWidth="400px"
        footer={
          <div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f1f5f9',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                marginRight: '8px',
                cursor: 'pointer',
              }}
            >
              취소
            </button>
            <button
              onClick={() => {
                alert('아이템이 삭제되었습니다.');
                setIsOpen(false);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          </div>
        }
      />
    </div>
  );
};

export const Confirmation: Story = {
  render: () => <ConfirmationExample />,
}; 