import React, { forwardRef, InputHTMLAttributes, ReactNode, useMemo, memo } from 'react';
import './Label.css';

export interface LabelProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * 레이블 내용
   */
  children: ReactNode;

  /**
   * 체크박스 포함 여부
   * @default false
   */
  hasCheckbox?: boolean;

  /**
   * 필수 필드 여부 (별표 표시)
   * @default false
   */
  required?: boolean;

  /**
   * 레이블 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 에러 상태 표시
   * @default false
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorMessage?: string;

  /**
   * 레이블에 적용할 추가 클래스명
   */
  labelClassName?: string;

  /**
   * 체크박스에 적용할 추가 클래스명
   */
  checkboxClassName?: string;

  /**
   * 체크박스 상태
   */
  checked?: boolean;

  /**
   * 체크박스 상태 변경 핸들러
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 레이블에 적용할 스타일
   */
  labelStyle?: React.CSSProperties;

  /**
   * 체크박스에 적용할 스타일
   */
  checkboxStyle?: React.CSSProperties;

  /**
   * htmlFor 속성 (체크박스 ID 연결)
   */
  htmlFor?: string;

  /**
   * 체크박스 ID
   */
  id?: string;

  /**
   * 인라인 표시 여부
   * @default false
   */
  inline?: boolean;

  /**
   * 중간 상태 (indeterminate) 여부
   * @default false
   */
  indeterminate?: boolean;

  /**
   * 도움말 텍스트
   */
  helperText?: ReactNode;
}

/**
 * Label 컴포넌트는 사용자 입력에 대한 설명 레이블을 제공합니다.
 * 체크박스와 함께 사용하거나 단독으로 사용할 수 있습니다.
 */
const Label = memo(forwardRef<HTMLInputElement, LabelProps>(({
  children,
  hasCheckbox = false,
  required = false,
  size = 'md',
  error = false,
  errorMessage,
  labelClassName = '',
  checkboxClassName = '',
  checked,
  onChange,
  labelStyle,
  checkboxStyle,
  htmlFor,
  id,
  disabled,
  className,
  inline = false,
  indeterminate = false,
  helperText,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  const helperId = helperText ? `${checkboxId}-helper` : undefined;
  
  // 클래스 메모이제이션
  const labelClasses = useMemo(() => {
    const classes = ['label', `label-${size}`];
    
    if (error) classes.push('label-error');
    if (disabled) classes.push('label-disabled');
    if (inline) classes.push('label-inline');
    if (labelClassName) classes.push(labelClassName);
    if (className) classes.push(className);
    
    return classes.join(' ');
  }, [size, error, disabled, inline, labelClassName, className]);
  
  const checkboxClasses = useMemo(() => {
    const classes = ['label-checkbox', `checkbox-${size}`];
    
    if (error) classes.push('checkbox-error');
    if (disabled) classes.push('checkbox-disabled');
    if (indeterminate) classes.push('checkbox-indeterminate');
    if (checkboxClassName) classes.push(checkboxClassName);
    
    return classes.join(' ');
  }, [size, error, disabled, indeterminate, checkboxClassName]);

  // 체크박스 참조 설정 및 indeterminate 상태 적용
  const handleCheckboxRef = (element: HTMLInputElement | null) => {
    if (element) {
      element.indeterminate = indeterminate;
      
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    }
  };
  
  return (
    <div className={`label-container ${inline ? 'label-container-inline' : ''}`}>
      <label 
        htmlFor={htmlFor || checkboxId} 
        className={labelClasses} 
        style={labelStyle}
      >
        {hasCheckbox && (
          <div className="checkbox-wrapper" style={checkboxStyle}>
            <input
              type="checkbox"
              id={checkboxId}
              className={checkboxClasses}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              ref={handleCheckboxRef}
              aria-invalid={error}
              aria-describedby={helperId}
              aria-checked={indeterminate ? 'mixed' : checked}
              {...props}
            />
            <div className="checkbox-custom" aria-hidden="true">
              <svg 
                className="checkbox-checkmark" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {indeterminate ? (
                  <path 
                    d="M5 12h14" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                ) : (
                  <path 
                    d="M5 13l4 4L19 7" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </div>
          </div>
        )}
        <span className="label-text">
          {children}
          {required && <span className="label-required" aria-hidden="true">*</span>}
        </span>
      </label>
      
      {error && errorMessage && (
        <div className="label-error-message" id={`${checkboxId}-error`} role="alert">
          {errorMessage}
        </div>
      )}

      {helperText && !error && (
        <div className="label-helper-text" id={helperId}>
          {helperText}
        </div>
      )}
    </div>
  );
}));

Label.displayName = 'Label';

export default Label; 