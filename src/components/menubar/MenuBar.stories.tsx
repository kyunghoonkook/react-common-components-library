import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuBar } from './MenuBar';

// 아이콘 컴포넌트
const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const PrinterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const meta = {
  title: 'Components/MenuBar',
  component: MenuBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof MenuBar>;

// 기본 메뉴바
export const Basic: Story = {
  args: {
    items: [
      {
        id: 'file',
        label: 'File',
        items: [
          {
            id: 'new-tab',
            label: 'New Tab',
            shortcut: '⌘T',
            onClick: () => console.log('New Tab clicked'),
          },
          {
            id: 'new-window',
            label: 'New Window',
            shortcut: '⌘N',
            onClick: () => console.log('New Window clicked'),
          },
          {
            id: 'new-incognito',
            label: 'New Incognito Window',
            disabled: true,
          },
          {
            id: 'separator-1',
            isSeparator: true,
          },
          {
            id: 'share',
            label: 'Share',
            icon: <ShareIcon />,
            items: [
              {
                id: 'email',
                label: 'Email',
                onClick: () => console.log('Email clicked'),
              },
              {
                id: 'message',
                label: 'Message',
                onClick: () => console.log('Message clicked'),
              },
            ],
          },
          {
            id: 'separator-2',
            isSeparator: true,
          },
          {
            id: 'print',
            label: 'Print...',
            shortcut: '⌘P',
            icon: <PrinterIcon />,
            onClick: () => console.log('Print clicked'),
          },
        ],
      },
      {
        id: 'edit',
        label: 'Edit',
        items: [
          {
            id: 'undo',
            label: 'Undo',
            shortcut: '⌘Z',
            onClick: () => console.log('Undo clicked'),
          },
          {
            id: 'redo',
            label: 'Redo',
            shortcut: '⌘⇧Z',
            onClick: () => console.log('Redo clicked'),
          },
          {
            id: 'separator-3',
            isSeparator: true,
          },
          {
            id: 'cut',
            label: 'Cut',
            shortcut: '⌘X',
            onClick: () => console.log('Cut clicked'),
          },
          {
            id: 'copy',
            label: 'Copy',
            shortcut: '⌘C',
            onClick: () => console.log('Copy clicked'),
          },
          {
            id: 'paste',
            label: 'Paste',
            shortcut: '⌘V',
            onClick: () => console.log('Paste clicked'),
          },
        ],
      },
      {
        id: 'view',
        label: 'View',
        items: [
          {
            id: 'zoom-in',
            label: 'Zoom In',
            shortcut: '⌘+',
            onClick: () => console.log('Zoom In clicked'),
          },
          {
            id: 'zoom-out',
            label: 'Zoom Out',
            shortcut: '⌘-',
            onClick: () => console.log('Zoom Out clicked'),
          },
          {
            id: 'reset-zoom',
            label: 'Reset Zoom',
            shortcut: '⌘0',
            onClick: () => console.log('Reset Zoom clicked'),
          },
        ],
      },
      {
        id: 'profile',
        label: 'Profile',
        items: [
          {
            id: 'account',
            label: 'Account',
            icon: <FileIcon />,
            onClick: () => console.log('Account clicked'),
          },
          {
            id: 'settings',
            label: 'Settings',
            onClick: () => console.log('Settings clicked'),
          },
          {
            id: 'separator-4',
            isSeparator: true,
          },
          {
            id: 'logout',
            label: 'Log Out',
            onClick: () => console.log('Log Out clicked'),
          },
        ],
      },
    ],
  },
};

// 비활성화된 항목이 있는 메뉴바
export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: 'file',
        label: 'File',
        items: [
          {
            id: 'new-tab',
            label: 'New Tab',
            shortcut: '⌘T',
            onClick: () => console.log('New Tab clicked'),
          },
          {
            id: 'new-window',
            label: 'New Window',
            shortcut: '⌘N',
            onClick: () => console.log('New Window clicked'),
          },
          {
            id: 'new-incognito',
            label: 'New Incognito Window',
            disabled: true,
          },
        ],
      },
      {
        id: 'edit',
        label: 'Edit',
        disabled: true,
        items: [],
      },
      {
        id: 'view',
        label: 'View',
        items: [
          {
            id: 'zoom-in',
            label: 'Zoom In',
            shortcut: '⌘+',
            onClick: () => console.log('Zoom In clicked'),
          },
        ],
      },
    ],
  },
};

// 아이콘이 있는 메뉴바
export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'file',
        label: 'File',
        items: [
          {
            id: 'new-file',
            label: 'New File',
            icon: <FileIcon />,
            onClick: () => console.log('New File clicked'),
          },
          {
            id: 'separator-1',
            isSeparator: true,
          },
          {
            id: 'print',
            label: 'Print',
            icon: <PrinterIcon />,
            onClick: () => console.log('Print clicked'),
          },
          {
            id: 'share',
            label: 'Share',
            icon: <ShareIcon />,
            onClick: () => console.log('Share clicked'),
          },
        ],
      },
      {
        id: 'edit',
        label: 'Edit',
        items: [
          {
            id: 'copy',
            label: 'Copy',
            shortcut: '⌘C',
            onClick: () => console.log('Copy clicked'),
          },
          {
            id: 'paste',
            label: 'Paste',
            shortcut: '⌘V',
            onClick: () => console.log('Paste clicked'),
          },
        ],
      },
    ],
  },
};

// 너비 옵션을 보여주는 메뉴바 예제 추가
export const CustomWidth: Story = {
  args: {
    width: '100%', // 부모 컨테이너에 맞춤
    items: [
      {
        id: 'file',
        label: 'File',
        items: [
          {
            id: 'new-file',
            label: 'New File',
            onClick: () => console.log('New File clicked'),
          },
          {
            id: 'open',
            label: 'Open',
            onClick: () => console.log('Open clicked'),
          },
          {
            id: 'save',
            label: 'Save',
            onClick: () => console.log('Save clicked'),
          },
        ],
      },
      {
        id: 'edit',
        label: 'Edit',
        items: [
          {
            id: 'copy',
            label: 'Copy',
            onClick: () => console.log('Copy clicked'),
          },
          {
            id: 'paste',
            label: 'Paste',
            onClick: () => console.log('Paste clicked'),
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '메뉴바의 너비를 커스텀할 수 있습니다. 이 예제에서는 너비를 100%로 설정하여 부모 컨테이너의 너비에 맞춥니다.',
      },
    },
  },
}; 