import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 내용
   */
  children: ReactNode;
  
  /**
   * 버튼 디자인 변형
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * 버튼을 최대 너비로 확장할지 여부
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 로딩 상태 표시 여부
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * 버튼 왼쪽에 표시할 아이콘
   */
  leftIcon?: ReactNode;
  
  /**
   * 버튼 오른쪽에 표시할 아이콘
   */
  rightIcon?: ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * Button 컴포넌트는 사용자 동작을 유도하는 클릭 가능한 요소입니다.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...rest
}) => {
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size}
    ${fullWidth ? 'button-full-width' : ''} 
    ${isLoading ? 'button-loading' : ''}
    ${className}
  `.trim();
  
  return (
    <button 
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="button-spinner"></span>}
      {!isLoading && leftIcon && <span className="button-icon button-left-icon">{leftIcon}</span>}
      <span className="button-content">{children}</span>
      {!isLoading && rightIcon && <span className="button-icon button-right-icon">{rightIcon}</span>}
    </button>
  );
};

export default Button; 