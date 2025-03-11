import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
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
}

/**
 * Label 컴포넌트는 사용자 입력에 대한 설명 레이블을 제공합니다.
 * 체크박스와 함께 사용하거나 단독으로 사용할 수 있습니다.
 */
const Label = forwardRef<HTMLInputElement, LabelProps>(({
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
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  
  const getLabelClasses = () => {
    const classes = ['label', `label-${size}`];
    
    if (error) classes.push('label-error');
    if (disabled) classes.push('label-disabled');
    if (labelClassName) classes.push(labelClassName);
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  const getCheckboxClasses = () => {
    const classes = ['label-checkbox', `checkbox-${size}`];
    
    if (error) classes.push('checkbox-error');
    if (disabled) classes.push('checkbox-disabled');
    if (checkboxClassName) classes.push(checkboxClassName);
    
    return classes.join(' ');
  };
  
  return (
    <div className="label-container">
      <label 
        htmlFor={htmlFor || checkboxId} 
        className={getLabelClasses()} 
        style={labelStyle}
      >
        {hasCheckbox && (
          <div className="checkbox-wrapper" style={checkboxStyle}>
            <input
              type="checkbox"
              id={checkboxId}
              className={getCheckboxClasses()}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              ref={ref}
              {...props}
            />
            <div className="checkbox-custom">
              <svg 
                className="checkbox-checkmark" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5 13l4 4L19 7" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
        <span className="label-text">
          {children}
          {required && <span className="label-required">*</span>}
        </span>
      </label>
      
      {error && errorMessage && (
        <div className="label-error-message">{errorMessage}</div>
      )}
    </div>
  );
});

Label.displayName = 'Label';

export default Label; 