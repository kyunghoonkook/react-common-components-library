import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import AlertDialog, { AlertDialogProps } from "./AlertDialog";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Components/AlertDialog",
  component: AlertDialog,
} as Meta<typeof AlertDialog>;

const Template: StoryFn<AlertDialogProps> = (args: JSX.IntrinsicAttributes & AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <AlertDialog 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onCancel={() => console.log('Cancelled')}
        onConfirm={() => console.log('Confirmed')}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Are you sure absolutely sure?",
  description: "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  cancelText: "Cancel",
  confirmText: "Continue",
};

export const Customized = Template.bind({});
Customized.args = {
  title: "Delete File?",
  description: "You are about to delete this file. This action cannot be undone.",
  cancelText: "No, Keep it",
  confirmText: "Yes, Delete",
  style: { maxWidth: '500px', borderRadius: '12px' },
  titleStyle: { fontSize: '22px', color: '#e11d48' },
  descriptionStyle: { fontSize: '16px', color: '#4b5563' },
  cancelButtonStyle: { backgroundColor: '#f3f4f6', color: '#1f2937' },
  confirmButtonStyle: { backgroundColor: '#e11d48', color: 'white' },
}; 