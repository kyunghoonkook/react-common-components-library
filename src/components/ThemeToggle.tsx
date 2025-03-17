import React from 'react';

interface ThemeToggleProps {
  onToggle?: () => void;
  isDark?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  onToggle, 
  isDark = false 
}) => {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: isDark ? '#333' : '#f0f0f0',
        color: isDark ? '#fff' : '#000',
        cursor: 'pointer',
      }}
    >
      {isDark ? '라이트 모드' : '다크 모드'}
    </button>
  );
}; 