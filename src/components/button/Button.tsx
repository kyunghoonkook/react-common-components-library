import React, { forwardRef, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingPosition = 'start' | 'end' | 'center';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * 버튼 내용
   */
  children?: ReactNode;
  
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
   * 로딩 상태일 때 표시할 텍스트
   */
  loadingText?: string;

  /**
   * 로딩 인디케이터 위치
   * @default 'center'
   */
  loadingPosition?: LoadingPosition;
  
  /**
   * 버튼 왼쪽에 표시할 아이콘
   */
  leftIcon?: ReactNode;
  
  /**
   * 버튼 오른쪽에 표시할 아이콘
   */
  rightIcon?: ReactNode;

  /**
   * 버튼을 둥글게 만들지 여부
   * @default false
   */
  rounded?: boolean;

  /**
   * 버튼에 그림자 효과를 줄지 여부
   * @default false
   */
  elevated?: boolean;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * Button 컴포넌트는 사용자 동작을 유도하는 클릭 가능한 요소입니다.
 * 다양한 스타일과 상태를 지원하며, 접근성을 고려하여 설계되었습니다.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  loadingText,
  loadingPosition = 'center',
  leftIcon,
  rightIcon,
  rounded = false,
  elevated = false,
  className = '',
  disabled,
  type = 'button',
  ...rest
}, ref) => {
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size}
    ${fullWidth ? 'button-full-width' : ''} 
    ${isLoading ? 'button-loading' : ''}
    ${rounded ? 'button-rounded' : ''}
    ${elevated ? 'button-elevated' : ''}
    ${className}
  `.trim();

  const contentClasses = `
    button-content
    ${isLoading && !loadingText ? 'button-content-hidden' : ''}
  `.trim();

  const spinnerClasses = `
    button-spinner
    ${loadingPosition === 'start' ? 'button-spinner-start' : ''}
    ${loadingPosition === 'end' ? 'button-spinner-end' : ''}
    ${loadingPosition === 'center' ? 'button-spinner-center' : ''}
  `.trim();
  
  return (
    <button 
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <div className={spinnerClasses}>
          <div className="button-spinner-default" />
          {loadingText && (
            <span className="button-loading-text">{loadingText}</span>
          )}
        </div>
      )}
      {!isLoading && leftIcon && (
        <span className="button-icon button-left-icon" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={contentClasses}>
        {children}
      </span>
      {!isLoading && rightIcon && (
        <span className="button-icon button-right-icon" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 