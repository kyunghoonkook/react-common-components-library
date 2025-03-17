import React, { forwardRef, useEffect, useRef, useImperativeHandle, InputHTMLAttributes } from 'react';
import './Checkbox.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'success' | 'warning' | 'error';

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
   * 체크박스 변형
   * @default 'default'
   */
  variant?: CheckboxVariant;
  
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

  /**
   * 커스텀 아이콘 컴포넌트
   */
  icon?: React.ReactNode;

  /**
   * 체크박스 그룹에서 사용할 값
   */
  value?: string | number;

  /**
   * 체크박스 그룹에서 사용할 이름
   */
  name?: string;

  /**
   * 체크박스 설명
   */
  description?: string;
}

/**
 * Checkbox 컴포넌트는 사용자가 하나 이상의 항목을 목록에서 선택할 수 있게 합니다.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  children,
  size = 'md',
  variant = 'default',
  indeterminate = false,
  error = false,
  className = '',
  wrapperClassName = '',
  disabled,
  icon,
  value,
  name,
  description,
  checked,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => inputRef.current!, []);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };
  
  return (
    <label
      className={`checkbox-wrapper checkbox-${size} checkbox-${variant} ${disabled ? 'checkbox-disabled' : ''} ${wrapperClassName}`}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled}
      aria-invalid={error}
    >
      <span className="checkbox-container">
        <input
          ref={inputRef}
          type="checkbox"
          className={`checkbox-input ${error ? 'checkbox-error' : ''} ${className}`}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          name={name}
          aria-describedby={description ? `${name}-description` : undefined}
          {...rest}
        />
        <span className="checkbox-checkmark">
          {icon}
        </span>
      </span>
      <div className="checkbox-content">
        {children && <span className="checkbox-label">{children}</span>}
        {description && (
          <span id={`${name}-description`} className="checkbox-description">
            {description}
          </span>
        )}
      </div>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 