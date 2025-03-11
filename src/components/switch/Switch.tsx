import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Switch.css';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 스위치 라벨
   */
  children?: React.ReactNode;
  
  /**
   * 스위치 크기
   * @default 'md'
   */
  size?: SwitchSize;
  
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
   * 스위치 컨테이너에 적용할 추가 CSS 클래스
   */
  wrapperClassName?: string;
}

/**
 * Switch 컴포넌트는 사용자가 설정을 켜거나 끄는 상태를 토글할 수 있게 합니다.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  children,
  size = 'md',
  error = false,
  className = '',
  wrapperClassName = '',
  disabled,
  checked,
  ...rest
}, ref) => {
  return (
    <label
      className={`switch-wrapper switch-${size} ${disabled ? 'switch-disabled' : ''} ${wrapperClassName}`}
    >
      <span className="switch-container">
        <input
          ref={ref}
          type="checkbox"
          className={`switch-input ${error ? 'switch-error' : ''} ${className}`}
          disabled={disabled}
          checked={checked}
          {...rest}
        />
        <span className="switch-track">
          <span className="switch-thumb"></span>
        </span>
      </span>
      {children && <span className="switch-label">{children}</span>}
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch; 