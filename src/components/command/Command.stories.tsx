import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Command, { CommandProps } from './Command';
import './Command.css';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

const Template = (args: CommandProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Command</button>
      <Command
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

// 달력 아이콘
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// 이모지 아이콘
const EmojiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

// 계산기 아이콘
const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="16" y1="14" x2="16" y2="18"></line>
    <line x1="8" y1="14" x2="8" y2="18"></line>
    <line x1="12" y1="14" x2="12" y2="18"></line>
    <line x1="8" y1="10" x2="16" y2="10"></line>
    <line x1="8" y1="14" x2="16" y2="14"></line>
  </svg>
);

// 프로필 아이콘
const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// 결제 아이콘
const BillingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

// 설정 아이콘
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export const Default: Story = {
  render: Template,
  args: {
    groups: [
      {
        label: 'Suggestions',
        items: [
          {
            id: 'calendar',
            label: 'Calendar',
            icon: <CalendarIcon />,
            onSelect: () => console.log('Calendar selected'),
          },
          {
            id: 'emoji',
            label: 'Search Emojii',
            icon: <EmojiIcon />,
            onSelect: () => console.log('Emoji search selected'),
          },
          {
            id: 'calculator',
            label: 'Calculator',
            icon: <CalculatorIcon />,
            onSelect: () => console.log('Calculator selected'),
          },
        ],
      },
      {
        label: 'Settings',
        items: [
          {
            id: 'profile',
            label: 'Profile',
            icon: <ProfileIcon />,
            shortcut: '⌘P',
            onSelect: () => console.log('Profile selected'),
          },
          {
            id: 'billing',
            label: 'Billing',
            icon: <BillingIcon />,
            shortcut: '⌘B',
            onSelect: () => console.log('Billing selected'),
          },
          {
            id: 'settings',
            label: 'Settings',
            icon: <SettingsIcon />,
            shortcut: '⌘S',
            onSelect: () => console.log('Settings selected'),
          },
        ],
      },
    ],
  }
}; 