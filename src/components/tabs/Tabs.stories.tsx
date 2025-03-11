import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Tabs, TabsProps } from './Tabs';
import Label from '../label/Label';
import Input from '../input/Input';
import Button from '../button/Button';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    defaultValue: { control: 'text' },
    className: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<TabsProps> = (args) => (
  <Tabs {...args}>
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      <div style={{ padding: '16px 0' }}>
        <p style={{ marginBottom: '24px', color: '#64748b' }}>
          Make changes to your account here. Click save when you're done.
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
            Name
          </Label>
          <Input
            id="name"
            defaultValue="Pietro Schirano"
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <Label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
            Username
          </Label>
          <Input
            id="username"
            defaultValue="@skirano"
            style={{ width: '100%' }}
          />
        </div>
        
        <Button variant="primary">Save changes</Button>
      </div>
    </Tabs.Content>
    <Tabs.Content value="password">
      <div style={{ padding: '16px 0' }}>
        <p style={{ marginBottom: '24px', color: '#64748b' }}>
          Update your password here. After saving, you'll be logged out.
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="current" style={{ display: 'block', marginBottom: '8px' }}>
            Current Password
          </Label>
          <Input
            id="current"
            type="password"
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Label htmlFor="new" style={{ display: 'block', marginBottom: '8px' }}>
            New Password
          </Label>
          <Input
            id="new"
            type="password"
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <Label htmlFor="confirm" style={{ display: 'block', marginBottom: '8px' }}>
            Confirm Password
          </Label>
          <Input
            id="confirm"
            type="password"
            style={{ width: '100%' }}
          />
        </div>
        
        <Button variant="primary">Change Password</Button>
      </div>
    </Tabs.Content>
  </Tabs>
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'account',
};

export const PasswordTab = Template.bind({});
PasswordTab.args = {
  defaultValue: 'password',
};

export const Controlled = () => {
  const [tab, setTab] = useState('account');
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <strong>Active Tab:</strong> {tab}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Button 
          onClick={() => setTab('account')} 
          variant={tab === 'account' ? 'primary' : 'secondary'}
          style={{ marginRight: '8px' }}
        >
          Account Tab
        </Button>
        <Button 
          onClick={() => setTab('password')} 
          variant={tab === 'password' ? 'primary' : 'secondary'}
        >
          Password Tab
        </Button>
      </div>
      
      <Tabs value={tab} onValueChange={setTab}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <div style={{ padding: '16px 0' }}>
            <p>Account content</p>
          </div>
        </Tabs.Content>
        <Tabs.Content value="password">
          <div style={{ padding: '16px 0' }}>
            <p>Password content</p>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}; 