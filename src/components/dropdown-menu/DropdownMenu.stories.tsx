import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './DropdownMenu';
import './DropdownMenu.css';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    width: { control: 'text' },
    position: { 
      control: { type: 'select' }, 
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'] 
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// 아이콘 컴포넌트들
const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BillingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const KeyboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
    <path d="M6 8h.01"></path>
    <path d="M10 8h.01"></path>
    <path d="M14 8h.01"></path>
    <path d="M18 8h.01"></path>
    <path d="M6 12h.01"></path>
    <path d="M10 12h.01"></path>
    <path d="M14 12h.01"></path>
    <path d="M18 12h.01"></path>
    <path d="M6 16h.01"></path>
    <path d="M10 16h.01"></path>
    <path d="M14 16h.01"></path>
    <path d="M18 16h.01"></path>
  </svg>
);

const TeamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const InviteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// 상태를 포함한 드롭다운 예제 컴포넌트
const DropdownExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 사용자 초대 섹션
  const inviteMenuSection = {
    items: [
      {
        id: 'invite-users',
        label: '사용자 초대',
        icon: <EmailIcon />,
        subItems: [
          {
            id: 'invite-email',
            label: '이메일로 초대',
            icon: <EmailIcon />,
            onClick: () => console.log('이메일로 초대 클릭됨')
          },
          {
            id: 'invite-link',
            label: '초대 링크 생성',
            icon: <LinkIcon />,
            onClick: () => console.log('초대 링크 클릭됨')
          }
        ]
      }
    ]
  };
  
  // 지원 섹션
  const supportMenuSection = {
    items: [
      {
        id: 'support',
        label: '지원',
        icon: <SupportIcon />,
        subItems: [
          {
            id: 'help-center',
            label: '도움말 센터',
            icon: <SupportIcon />,
            onClick: () => console.log('도움말 센터 클릭됨')
          },
          {
            id: 'live-chat',
            label: '실시간 채팅',
            icon: <ChatIcon />,
            onClick: () => console.log('실시간 채팅 클릭됨')
          },
          {
            id: 'email-support',
            label: '이메일 지원',
            icon: <EmailIcon />,
            onClick: () => console.log('이메일 지원 클릭됨')
          }
        ]
      }
    ]
  };
  
  // 기본 메뉴 항목
  const baseMenuSection = {
    items: [
      {
        id: 'profile',
        label: '프로필',
        icon: <ProfileIcon />,
        onClick: () => console.log('프로필 클릭됨')
      },
      {
        id: 'settings',
        label: '설정',
        icon: <SettingsIcon />,
        shortcut: '⌘S',
        onClick: () => console.log('설정 클릭됨')
      }
    ]
  };
  
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DropdownMenu
        title="메뉴 예제"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sections={[baseMenuSection, inviteMenuSection, supportMenuSection]}
        trigger={
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              padding: '8px 16px', 
              background: '#4F46E5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            메뉴 열기
          </button>
        }
      />
    </div>
  );
};

// Link 아이콘 추가
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

// 기본 스토리
export const Default: Story = {
  render: () => <DropdownExample />
};

// 다양한 위치 옵션
export const PositionVariants = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  
  const toggleMenu = (id: string) => {
    setOpenMenus({
      ...openMenus,
      [id]: !openMenus[id]
    });
  };
  
  const positions = [
    'bottom-start', 
    'bottom-end', 
    'top-start', 
    'top-end', 
    'right-start', 
    'left-start'
  ];
  
  const menuItems = [
    { id: 'item1', label: '항목 1', onClick: () => {} },
    { id: 'item2', label: '항목 2', onClick: () => {} },
  ];
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3>위치 변형</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {positions.map((pos) => (
          <div key={pos} style={{ padding: 10, border: '1px dashed #ccc' }}>
            <DropdownMenu
              title={`Position: ${pos}`}
              isOpen={openMenus[pos] || false}
              onClose={() => toggleMenu(pos)}
              position={pos as any}
              sections={[{ items: menuItems }]}
              trigger={
                <button 
                  onClick={() => toggleMenu(pos)}
                  style={{ 
                    padding: '8px 16px', 
                    background: '#4F46E5', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {pos}
                </button>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 