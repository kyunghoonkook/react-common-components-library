import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
import './ContextMenu.css';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

// 데모 영역 컴포넌트
const DemoArea = (args: Partial<ContextMenuProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  // 데모 메뉴 항목 정의
  const browserMenuSections = [
    {
      items: [
        {
          type: 'normal' as const,
          label: 'Back',
          shortcut: '⌘[',
          onClick: () => console.log('Back clicked'),
        },
        {
          type: 'normal' as const,
          label: 'Forward',
          shortcut: '⌘]',
          disabled: true,
        },
        {
          type: 'normal' as const,
          label: 'Reload',
          shortcut: '⌘R',
          onClick: () => console.log('Reload clicked'),
        },
        {
          type: 'normal' as const,
          label: 'More Tools',
          items: [], // 서브메뉴 항목들
          onClick: () => console.log('More Tools clicked'),
        },
      ],
    },
    {
      items: [
        {
          type: 'checkbox' as const,
          label: 'Show Bookmark Bar',
          shortcut: '⌘⇧B',
          checked: true,
          onClick: () => console.log('Show Bookmark Bar toggled'),
        },
        {
          type: 'normal' as const,
          label: 'Show Full Urls',
          onClick: () => console.log('Show Full Urls clicked'),
        },
      ],
    },
    {
      title: 'People',
      items: [
        {
          type: 'normal' as const,
          label: 'Pedro Duarte',
          onClick: () => console.log('Pedro selected'),
        },
        {
          type: 'normal' as const,
          label: 'Colm Tuite',
          onClick: () => console.log('Colm selected'),
        },
        {
          type: 'normal' as const,
          label: 'Pietro Schirano',
          onClick: () => console.log('Pietro selected'),
        },
      ],
    },
  ];
  
  return (
    <div
      style={{
        width: '500px',
        height: '300px',
        backgroundColor: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative',
      }}
      onContextMenu={handleContextMenu}
    >
      <p>마우스 오른쪽 버튼을 클릭하여 컨텍스트 메뉴를 엽니다</p>
      
      <ContextMenu
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        x={position.x}
        y={position.y}
        sections={browserMenuSections}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <DemoArea />,
};

// 커스텀 예제 컴포넌트
const CustomExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  // 파일 관리 메뉴 예제
  const fileMenuSections = [
    {
      items: [
        {
          type: 'normal' as const,
          label: '열기',
          shortcut: '⌘O',
          onClick: () => console.log('Open clicked'),
        },
        {
          type: 'normal' as const,
          label: '다운로드',
          shortcut: '⌘D',
          onClick: () => console.log('Download clicked'),
        },
        {
          type: 'normal' as const,
          label: '이름 변경',
          shortcut: '⌘R',
          onClick: () => console.log('Rename clicked'),
        },
      ],
    },
    {
      items: [
        {
          type: 'normal' as const,
          label: '복사',
          shortcut: '⌘C',
          onClick: () => console.log('Copy clicked'),
        },
        {
          type: 'normal' as const,
          label: '붙여넣기',
          shortcut: '⌘V',
          onClick: () => console.log('Paste clicked'),
        },
        {
          type: 'normal' as const,
          label: '잘라내기',
          shortcut: '⌘X',
          onClick: () => console.log('Cut clicked'),
        },
      ],
    },
    {
      items: [
        {
          type: 'normal' as const,
          label: '삭제',
          shortcut: '⌫',
          onClick: () => console.log('Delete clicked'),
        },
      ],
    },
  ];
  
  return (
    <div
      style={{
        width: '500px',
        height: '300px',
        backgroundColor: '#e9f5e9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative',
        border: '1px dashed #4caf50',
      }}
      onContextMenu={handleContextMenu}
    >
      <p>파일 관리 컨텍스트 메뉴 예제 - 마우스 오른쪽 버튼을 클릭하세요</p>
      
      <ContextMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        x={position.x}
        y={position.y}
        sections={fileMenuSections}
      />
    </div>
  );
};

export const FileContextMenu: Story = {
  render: () => <CustomExample />,
}; 