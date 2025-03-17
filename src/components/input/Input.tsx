import React, { forwardRef, InputHTMLAttributes, ReactNode, useMemo, memo } from 'react';
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

  /**
   * 레이블이 필수 필드임을 나타내는지 여부
   * @default false
   */
  required?: boolean;

  /**
   * 읽기 전용 상태
   * @default false
   */
  readOnly?: boolean;

  /**
   * 자동 포커스 여부
   * @default false
   */
  autoFocus?: boolean;

  /**
   * 입력값이 변경될 때 실행될 콜백
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * 최대 길이
   */
  maxLength?: number;

  /**
   * 현재 값 길이 표시 여부
   * @default false
   */
  showCharacterCount?: boolean;
}

/**
 * Input 컴포넌트는 다양한 형태와 크기의 입력 필드를 제공합니다.
 * 레이블, 도움말 텍스트, 에러 상태, 아이콘 등 다양한 옵션을 지원합니다.
 */
const Input = memo(forwardRef<HTMLInputElement, InputProps>(({
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
  required = false,
  readOnly = false,
  autoFocus = false,
  maxLength,
  showCharacterCount = false,
  onChange,
  value,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasHelper = !!helperText || !!error;
  const helperId = hasHelper ? `${inputId}-helper-text` : undefined;
  
  // 문자 수 계산
  const currentLength = typeof value === 'string' ? value.length : 0;
  const isNearMaxLength = maxLength && currentLength >= maxLength * 0.8;
  
  // 클래스 계산 메모이제이션
  const inputClasses = useMemo(() => {
    const classes = ['input-field', `input-${size}`, `input-${variant}`];
    
    if (startAdornment) classes.push('with-start-adornment');
    if (endAdornment) classes.push('with-end-adornment');
    if (error) classes.push('input-error');
    if (success) classes.push('input-success');
    if (disabled) classes.push('input-disabled');
    if (readOnly) classes.push('input-readonly');
    if (isNearMaxLength) classes.push('input-near-limit');
    if (inputClassName) classes.push(inputClassName);
    if (className) classes.push(className);
    
    return classes.join(' ');
  }, [
    size, variant, startAdornment, endAdornment, error, success, 
    disabled, readOnly, isNearMaxLength, inputClassName, className
  ]);
  
  const containerClasses = useMemo(() => {
    const classes = ['input-container'];
    
    if (fullWidth) classes.push('input-full-width');
    if (containerClassName) classes.push(containerClassName);
    
    return classes.join(' ');
  }, [fullWidth, containerClassName]);
  
  const labelClasses = useMemo(() => {
    const classes = ['input-label'];
    
    if (labelClassName) classes.push(labelClassName);
    if (disabled) classes.push('input-label-disabled');
    if (error) classes.push('input-label-error');
    if (size === 'sm') classes.push('input-label-sm');
    if (size === 'lg') classes.push('input-label-lg');
    
    return classes.join(' ');
  }, [labelClassName, disabled, error, size]);
  
  return (
    <div className={containerClasses} style={containerStyle}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="input-required-indicator">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {startAdornment && (
          <div className="input-adornment input-start-adornment" aria-hidden="true">
            {startAdornment}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={helperId}
          aria-required={required}
          required={required}
          readOnly={readOnly}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
          {...props}
        />
        
        {endAdornment && (
          <div className="input-adornment input-end-adornment" aria-hidden="true">
            {endAdornment}
          </div>
        )}
      </div>
      
      <div className="input-footer">
        {hasHelper && (
          <div 
            id={helperId}
            className={`input-helper-text ${error ? 'input-error-text' : ''}`}
          >
            {error || helperText}
          </div>
        )}
        
        {showCharacterCount && maxLength && (
          <div 
            className={`input-character-count ${isNearMaxLength ? 'input-count-near-limit' : ''}`}
            aria-live="polite"
          >
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}));

Input.displayName = 'Input';

export default Input; 