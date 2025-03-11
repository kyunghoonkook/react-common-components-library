import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input에 나타날 레이블
   */
  label?: ReactNode;

  /**
   * 에러 메시지
   */
  error?: string;

  /**
   * 성공 상태
   */
  success?: boolean;

  /**
   * 힌트 텍스트
   */
  helperText?: ReactNode;

  /**
   * 입력 필드 앞에 표시할 아이콘이나 요소
   */
  startAdornment?: ReactNode;

  /**
   * 입력 필드 뒤에 표시할 아이콘이나 요소
   */
  endAdornment?: ReactNode;

  /**
   * Input의 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Input의 변형
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled' | 'standard';

  /**
   * 가득 채우는 너비로 설정할지 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 컨테이너에 적용할 CSS 클래스
   */
  containerClassName?: string;

  /**
   * 입력 요소에 적용할 CSS 클래스
   */
  inputClassName?: string;

  /**
   * 레이블에 적용할 CSS 클래스
   */
  labelClassName?: string;

  /**
   * 컨테이너에 적용할 스타일
   */
  containerStyle?: React.CSSProperties;

  /**
   * 폼 ID 연결용 (레이블의 for 속성)
   */
  id?: string;
}

/**
 * Input 컴포넌트는 다양한 형태와 크기의 입력 필드를 제공합니다.
 * 레이블, 도움말 텍스트, 에러 상태, 아이콘 등 다양한 옵션을 지원합니다.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  success,
  helperText,
  startAdornment,
  endAdornment,
  size = 'md',
  variant = 'outlined',
  fullWidth = false,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  containerStyle,
  disabled,
  id,
  className,
  placeholder,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const getInputClasses = () => {
    const classes = ['input-field', `input-${size}`, `input-${variant}`];
    
    if (startAdornment) classes.push('with-start-adornment');
    if (endAdornment) classes.push('with-end-adornment');
    if (error) classes.push('input-error');
    if (success) classes.push('input-success');
    if (disabled) classes.push('input-disabled');
    if (inputClassName) classes.push(inputClassName);
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  const getContainerClasses = () => {
    const classes = ['input-container'];
    
    if (fullWidth) classes.push('input-full-width');
    if (containerClassName) classes.push(containerClassName);
    
    return classes.join(' ');
  };
  
  const getLabelClasses = () => {
    const classes = ['input-label'];
    
    if (labelClassName) classes.push(labelClassName);
    if (disabled) classes.push('input-label-disabled');
    if (error) classes.push('input-label-error');
    if (size === 'sm') classes.push('input-label-sm');
    if (size === 'lg') classes.push('input-label-lg');
    
    return classes.join(' ');
  };
  
  return (
    <div className={getContainerClasses()} style={containerStyle}>
      {label && (
        <label htmlFor={inputId} className={getLabelClasses()}>
          {label}
        </label>
      )}
      
      <div className="input-wrapper">
        {startAdornment && (
          <div className="input-adornment input-start-adornment">
            {startAdornment}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={getInputClasses()}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${inputId}-helper-text` : undefined}
          {...props}
        />
        
        {endAdornment && (
          <div className="input-adornment input-end-adornment">
            {endAdornment}
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <div 
          id={`${inputId}-helper-text`}
          className={`input-helper-text ${error ? 'input-error-text' : ''}`}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 