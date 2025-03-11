import React, { useState, createContext, useContext, ReactNode, HTMLAttributes, forwardRef, CSSProperties } from 'react';
import './RadioGroup.css';

// Context 타입
type RadioGroupContextType = {
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

// RadioGroup Context
const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

// RadioGroup Props
export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 선택된 라디오 버튼의 값
   */
  value?: string;
  
  /**
   * 기본 선택값
   */
  defaultValue?: string;
  
  /**
   * 값이 변경될 때 호출되는 함수
   */
  onChange?: (value: string) => void;
  
  /**
   * 라디오 그룹의 이름
   */
  name?: string;
  
  /**
   * 라디오 버튼들
   */
  children: ReactNode;
  
  /**
   * 모든 라디오 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 라디오 버튼 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 라디오 버튼 방향
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * 라디오 그룹에 적용할 스타일
   */
  style?: CSSProperties;
  
  /**
   * 라디오 그룹에 적용할 CSS 클래스
   */
  className?: string;
}

// RadioItem Props
export interface RadioItemProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /**
   * 라디오 아이템의 값
   */
  value: string;
  
  /**
   * 라디오 아이템 레이블
   */
  children: ReactNode;
  
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 라디오 아이템에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 라벨에 적용할 CSS 클래스
   */
  labelClassName?: string;
}

// RadioGroup 컴포넌트
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    value: controlledValue,
    defaultValue,
    onChange,
    name = `radio-group-${Math.random().toString(36).substring(2, 9)}`,
    children,
    disabled = false,
    size = 'md',
    orientation = 'vertical',
    className = '',
    ...props
  }, ref) => {
    // 제어/비제어 상태 관리
    const [internalValue, setInternalValue] = useState<string>(defaultValue || '');
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    
    const handleChange = (newValue: string) => {
      if (disabled) return;
      
      setInternalValue(newValue);
      onChange?.(newValue);
    };
    
    return (
      <RadioGroupContext.Provider value={{ value, onChange: handleChange, name, disabled, size }}>
        <div 
          ref={ref}
          role="radiogroup"
          className={`radio-group ${orientation === 'horizontal' ? 'radio-horizontal' : ''} ${className}`}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// RadioItem 컴포넌트
export const RadioItem = forwardRef<HTMLLabelElement, RadioItemProps>(
  ({
    value,
    children,
    disabled = false,
    className = '',
    labelClassName = '',
    ...props
  }, ref) => {
    const context = useContext(RadioGroupContext);
    
    if (!context) {
      throw new Error('RadioItem must be used within a RadioGroup');
    }
    
    const { value: selectedValue, onChange, name, disabled: groupDisabled, size } = context;
    const isDisabled = disabled || groupDisabled;
    const isChecked = value === selectedValue;
    
    return (
      <label
        ref={ref}
        className={`radio-item ${isDisabled ? 'disabled' : ''} radio-size-${size} ${className}`}
        {...props}
      >
        <input
          type="radio"
          className="radio-input"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => onChange(value)}
        />
        <span className="radio-control" />
        <span className={`radio-label ${labelClassName}`}>{children}</span>
      </label>
    );
  }
);

RadioItem.displayName = 'RadioItem';

// 타입 내보내기
export type { RadioGroupContextType };

// 기본 export
const RadioGroupRoot = Object.assign(RadioGroup, {
  Item: RadioItem,
});

export default RadioGroupRoot; 