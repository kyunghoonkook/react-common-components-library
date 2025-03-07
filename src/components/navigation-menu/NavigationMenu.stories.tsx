import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './NavigationMenu';

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Basic: Story = {
  args: {
    items: [
      {
        label: 'Getting started',
        content: {
          title: 'Introduction',
          description: 'Re-usable components built using Radix UI and Tailwind CSS',
          links: [
            {
              title: 'Introduction',
              description: 'Re-usable components built using Radix UI and Tailwind CSS',
              href: '#',
            },
            {
              title: 'Installation',
              description: 'How to install dependencies and structure your app.',
              href: '#',
            },
            {
              title: 'Typography',
              description: 'Styles for headings, paragraphs, lists...etc',
              href: '#',
            },
          ],
        },
        active: true,
      },
      {
        label: 'Components',
        content: {
          links: [
            {
              title: 'Accordion',
              description: 'A vertically stacked set of interactive headings.',
              href: '#',
            },
            {
              title: 'Alert Dialog',
              description: 'A modal dialog that interrupts the user with important content.',
              href: '#',
            },
            {
              title: 'Button',
              description: 'Displays a button or a component that looks like a button.',
              href: '#',
            },
            {
              title: 'Checkbox',
              description: 'A control that allows the user to toggle between checked and not checked.',
              href: '#',
            },
            {
              title: 'Dropdown Menu',
              description: 'Displays a menu to the user — such as a set of actions or functions.',
              href: '#',
            },
            {
              title: 'Input',
              description: 'Displays a form input field or a component that looks like an input field.',
              href: '#',
            },
          ],
        },
      },
      {
        label: 'Documentation',
        content: {
          links: [
            {
              title: 'API Reference',
              description: 'Complete API reference for all components.',
              href: '#',
            },
            {
              title: 'Styling Guide',
              description: 'Learn how to customize the look and feel of components.',
              href: '#',
            },
            {
              title: 'Accessibility',
              description: 'Making your app accessible to everyone.',
              href: '#',
            },
          ],
        },
      },
    ],
  },
};

export const WithCustomContent: Story = {
  args: {
    items: [
      {
        label: 'Getting started',
        href: '#getting-started',
      },
      {
        label: 'Components',
        content: {
          customContent: (
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ marginTop: 0 }}>Component Categories</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px' }}>Layout</h3>
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    <li>Container</li>
                    <li>Box</li>
                    <li>Grid</li>
                    <li>Stack</li>
                  </ul>
                </div>
                <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px' }}>Forms</h3>
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    <li>Input</li>
                    <li>Checkbox</li>
                    <li>Select</li>
                    <li>Radio</li>
                  </ul>
                </div>
                <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 8px' }}>Feedback</h3>
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    <li>Alert</li>
                    <li>Toast</li>
                    <li>Progress</li>
                    <li>Skeleton</li>
                  </ul>
                </div>
              </div>
            </div>
          ),
        },
      },
      {
        label: 'Blog',
        href: '#blog',
      },
      {
        label: 'Github',
        href: 'https://github.com',
      },
    ],
  },
}; 