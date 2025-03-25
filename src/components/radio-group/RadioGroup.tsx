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

// Hook for using RadioGroup Context
const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup 컴포넌트는 RadioGroup.Root 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

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
  
  /**
   * 라디오 그룹의 ARIA 레이블
   */
  ariaLabel?: string;
  
  /**
   * 라디오 그룹의 ARIA 레이블 ID
   */
  ariaLabelledBy?: string;
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
  
  /**
   * 라디오 아이템의 ID
   */
  id?: string;
}

// RadioLabel Props
export interface RadioLabelProps {
  /**
   * 레이블 내용
   */
  children: ReactNode;
  
  /**
   * 레이블에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 연결할 라디오 아이템의 ID
   */
  htmlFor?: string;
}

// RadioGroup 컴포넌트
const Root = forwardRef<HTMLDivElement, RadioGroupProps>(
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
    ariaLabel,
    ariaLabelledBy,
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
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={`radio-group ${orientation === 'horizontal' ? 'radio-horizontal' : ''} ${className}`}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

Root.displayName = 'RadioGroup.Root';

// RadioItem 컴포넌트
const Item = forwardRef<HTMLLabelElement, RadioItemProps>(
  ({
    value,
    children,
    disabled = false,
    className = '',
    labelClassName = '',
    id,
    ...props
  }, ref) => {
    const { value: selectedValue, onChange, name, disabled: groupDisabled, size } = useRadioGroupContext();
    const isDisabled = disabled || groupDisabled;
    const isChecked = value === selectedValue;
    const itemId = id || `radio-${name}-${value}`;
    
    return (
      <label
        ref={ref}
        className={`radio-item ${isDisabled ? 'disabled' : ''} radio-size-${size} ${className}`}
        htmlFor={itemId}
        {...props}
      >
        <input
          id={itemId}
          type="radio"
          className="radio-input"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => onChange(value)}
          aria-checked={isChecked}
        />
        <span className="radio-control" />
        {typeof children === 'string' ? (
          <span className={`radio-label ${labelClassName}`}>{children}</span>
        ) : (
          children
        )}
      </label>
    );
  }
);

Item.displayName = 'RadioGroup.Item';

// RadioIndicator 컴포넌트
interface RadioIndicatorProps {
  /**
   * 인디케이터 내용
   */
  children?: ReactNode;
  
  /**
   * 인디케이터에 적용할 CSS 클래스
   */
  className?: string;
}

const Indicator = forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  ({
    children,
    className = '',
  }, ref) => {
    return (
      <span ref={ref} className={`radio-indicator ${className}`}>
        {children || <span className="radio-indicator-dot" />}
      </span>
    );
  }
);

Indicator.displayName = 'RadioGroup.Indicator';

// RadioLabel 컴포넌트
const Label = forwardRef<HTMLSpanElement, RadioLabelProps>(
  ({
    children,
    className = '',
    htmlFor,
  }, ref) => {
    return (
      <span
        ref={ref}
        className={`radio-label ${className}`}
        id={htmlFor ? `label-${htmlFor}` : undefined}
      >
        {children}
      </span>
    );
  }
);

Label.displayName = 'RadioGroup.Label';

// RadioGroup 객체로 컴포넌트 묶기
export const RadioGroup = {
  Root,
  Item,
  Indicator,
  Label
};

export type { RadioGroupContextType };

export default RadioGroup; 