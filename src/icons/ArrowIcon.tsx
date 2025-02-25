import React from 'react';

interface ArrowIconProps {
  direction: 'up' | 'down';
  className?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ direction, className }) => {
  return (
    <span className={className}>
      {direction === 'up' ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </span>
  );
};

export default ArrowIcon; 