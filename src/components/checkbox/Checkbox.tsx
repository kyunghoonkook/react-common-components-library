import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import './Checkbox.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 체크박스 라벨
   */
  children?: React.ReactNode;
  
  /**
   * 체크박스 크기
   * @default 'md'
   */
  size?: CheckboxSize;
  
  /**
   * 체크박스 인디터미네이트(부분 선택) 상태
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * 에러 상태 표시
   * @default false
   */
  error?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 체크박스 컨테이너에 적용할 추가 CSS 클래스
   */
  wrapperClassName?: string;
}

/**
 * Checkbox 컴포넌트는 사용자가 하나 이상의 항목을 목록에서 선택할 수 있게 합니다.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  size = 'md',
  indeterminate = false,
  error = false,
  className = '',
  wrapperClassName = '',
  disabled,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  return (
    <label
      className={`checkbox-wrapper checkbox-${size} ${disabled ? 'checkbox-disabled' : ''} ${wrapperClassName}`}
    >
      <span className="checkbox-container">
        <input
          ref={inputRef}
          type="checkbox"
          className={`checkbox-input ${error ? 'checkbox-error' : ''} ${className}`}
          disabled={disabled}
          {...rest}
        />
        <span className="checkbox-checkmark"></span>
      </span>
      {children && <span className="checkbox-label">{children}</span>}
    </label>
  );
};

export default Checkbox; 