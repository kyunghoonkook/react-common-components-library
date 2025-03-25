import React, { useState, useEffect, useCallback, forwardRef, createContext, useContext, useId } from 'react';
import './Switch.css';

// Switch Context 타입 정의
type SwitchContextType = {
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
  required: boolean;
  name: string | undefined;
  value: string | undefined;
  id: string;
};

// Context 생성
const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

// Context 사용 Hook
const useSwitch = () => {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error('Switch 컴포넌트는 Switch.Root 내부에서만 사용할 수 있습니다');
  }
  return context;
};

// 기본 Props 인터페이스
export interface SwitchRootProps {
  /**
   * 현재 스위치의 상태
   */
  checked?: boolean;

  /**
   * 기본 스위치 상태 (제어되지 않는 컴포넌트로 사용 시)
   */
  defaultChecked?: boolean;

  /**
   * 상태 변경 시 호출될 콜백 함수
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * 컴포넌트 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 필수 필드 여부
   */
  required?: boolean;

  /**
   * form 제출 시 사용될 이름
   */
  name?: string;

  /**
   * form 제출 시 사용될 값
   */
  value?: string;

  /**
   * 컴포넌트 ID
   */
  id?: string;

  /**
   * 자식 컴포넌트
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 인라인 스타일
   */
  style?: React.CSSProperties;

  /**
   * 크기 (sm, md, lg)
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 색상 테마
   */
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * 테마 모드
   */
  theme?: 'light' | 'dark' | 'auto';
}

// 트랙 Props 인터페이스
export interface SwitchTrackProps {
  /**
   * 자식 컴포넌트
   */
  children?: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// 썸 Props 인터페이스
export interface SwitchThumbProps {
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// 라벨 Props 인터페이스
export interface SwitchLabelProps {
  /**
   * 자식 컴포넌트 (라벨 텍스트)
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 라벨 위치 (스위치 앞/뒤)
   */
  position?: 'start' | 'end';
}

// Root 컴포넌트
const Root = forwardRef<HTMLLabelElement, SwitchRootProps>(({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  name,
  value = 'on',
  id: propId,
  children,
  className = '',
  size = 'md',
  color = 'primary',
  theme = 'light',
  style,
}, ref) => {
  // ID 생성
  const generatedId = useId();
  const id = propId || `switch-${generatedId}`;
  
  // 제어/비제어 상태 관리
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;
  
  // 테마 관리
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme
  );
  
  // 테마 감지 (자동 모드)
  useEffect(() => {
    if (theme !== 'auto') {
      setThemeMode(theme);
      return;
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeMode(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);
  
  // 상태 변경 핸들러
  const handleChange = useCallback((newChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onCheckedChange?.(newChecked);
  }, [isControlled, onCheckedChange]);
  
  return (
    <SwitchContext.Provider 
      value={{
        checked: currentChecked,
        disabled,
        onCheckedChange: handleChange,
        required,
        name,
        value,
        id
      }}
    >
      <label 
        ref={ref}
        htmlFor={id}
        className={`switch-container switch-${size} switch-${color} ${disabled ? 'switch-disabled' : ''} ${className} ${themeMode === 'dark' ? 'switch-dark' : ''}`}
        data-state={currentChecked ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        style={style}
      >
        {children}
      </label>
    </SwitchContext.Provider>
  );
});

Root.displayName = 'Switch.Root';

// Track 컴포넌트
const Track = forwardRef<HTMLDivElement, SwitchTrackProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { checked, disabled, id, onCheckedChange } = useSwitch();
  
  const handleClick = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };
  
  return (
    <div
      ref={ref}
      className={`switch-track ${className}`}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled ? '' : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});

Track.displayName = 'Switch.Track';

// Thumb 컴포넌트
const Thumb = forwardRef<HTMLDivElement, SwitchThumbProps>(({
  className = '',
  ...props
}, ref) => {
  const { checked, disabled } = useSwitch();
  
  return (
    <div
      ref={ref}
      className={`switch-thumb ${className}`}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled ? '' : undefined}
      {...props}
    />
  );
});

Thumb.displayName = 'Switch.Thumb';

// Label 컴포넌트
const Label = forwardRef<HTMLSpanElement, SwitchLabelProps>(({
  children,
  className = '',
  position = 'end',
  ...props
}, ref) => {
  const { disabled } = useSwitch();
  
  return (
    <span
      ref={ref}
      className={`switch-label switch-label-${position} ${className}`}
      data-disabled={disabled ? '' : undefined}
      {...props}
    >
      {children}
    </span>
  );
});

Label.displayName = 'Switch.Label';

// 기존 API와의 호환성을 위한 통합 컴포넌트
export interface SwitchProps {
  /**
   * 현재 스위치의 상태
   */
  checked?: boolean;
  
  /**
   * 기본 스위치 상태 (제어되지 않는 컴포넌트로 사용 시)
   */
  defaultChecked?: boolean;
  
  /**
   * 상태 변경 시 호출될 콜백 함수
   */
  onChange?: (checked: boolean) => void;
  
  /**
   * 컴포넌트 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 필수 필드 여부
   */
  required?: boolean;
  
  /**
   * form 제출 시 사용될 이름
   */
  name?: string;
  
  /**
   * form 제출 시 사용될 값
   */
  value?: string;
  
  /**
   * 컴포넌트 ID
   */
  id?: string;
  
  /**
   * 라벨 텍스트
   */
  label?: React.ReactNode;
  
  /**
   * 라벨 위치 (스위치 앞/뒤)
   */
  labelPosition?: 'start' | 'end';
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 인라인 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * 크기 (sm, md, lg)
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 색상 테마
   */
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * 테마 모드
   */
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Switch 컴포넌트
 * 
 * 사용자가 설정을 온/오프 할 수 있는 토글 스위치 컴포넌트입니다.
 */
const Switch = forwardRef<HTMLLabelElement, SwitchProps>(({
  checked,
  defaultChecked,
  onChange,
  disabled,
  required,
  name,
  value,
  id,
  label,
  labelPosition = 'end',
  className = '',
  style,
  size = 'md',
  color = 'primary',
  theme = 'light',
}, ref) => {
  return (
    <Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      id={id}
      className={className}
      size={size}
      color={color}
      theme={theme}
      style={style}
    >
      {labelPosition === 'start' && label && (
        <Label position="start">{label}</Label>
      )}
      
      <Track>
        <Thumb />
      </Track>
      
      {labelPosition === 'end' && label && (
        <Label position="end">{label}</Label>
      )}
    </Root>
  );
});

Switch.displayName = 'Switch';

// 컴파운드 컴포넌트 익스포트
export const SwitchComponent = {
  Root,
  Track,
  Thumb,
  Label
};

export default Switch; 