import React, { useState, useEffect, useCallback, forwardRef, useId, createContext, useContext, MutableRefObject } from 'react';
import ReactDOM from 'react-dom';
import './Select.css';

// Context 타입 정의
type SelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
  id: string;
  listboxId: string;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
};

// Context 생성
const SelectContext = createContext<SelectContextType | undefined>(undefined);

// Context Hook
const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select 컴포넌트는 Select.Root 내부에서만 사용할 수 있습니다');
  }
  return context;
};

// 옵션 인터페이스
export interface SelectOption {
  /**
   * 옵션 값
   */
  value: string;
  
  /**
   * 옵션 레이블
   */
  label: string;
  
  /**
   * 옵션 비활성화 여부
   */
  disabled?: boolean;
}

// 옵션 그룹 인터페이스
export interface SelectGroup {
  /**
   * 그룹 레이블
   */
  label: string;
  
  /**
   * 그룹 내 옵션 목록
   */
  options: SelectOption[];
}

// 옵션이 그룹인지 확인하는 타입 가드
const isGroup = (option: SelectOption | SelectGroup): option is SelectGroup => {
  return (option as SelectGroup).options !== undefined;
};

// Check 아이콘 컴포넌트
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 화살표 아이콘 컴포넌트
const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Root Props
export interface SelectRootProps {
  /**
   * 현재 선택된 값
   */
  value?: string;
  
  /**
   * 기본 선택 값 (제어되지 않는 컴포넌트로 사용 시)
   */
  defaultValue?: string;
  
  /**
   * 선택 시 호출될 콜백 함수
   */
  onValueChange?: (value: string) => void;
  
  /**
   * 드롭다운 열림/닫힘 상태
   */
  open?: boolean;
  
  /**
   * 드롭다운 기본 열림 상태
   */
  defaultOpen?: boolean;
  
  /**
   * 드롭다운 열림/닫힘 시 호출될 콜백 함수
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 컴포넌트 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 자식 컴포넌트
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컴포넌트 ID
   */
  id?: string;
  
  /**
   * 크기
   */
  size?: 'sm' | 'md' | 'lg';
}

// Trigger Props
export interface SelectTriggerProps {
  /**
   * 기본적으로 표시할 플레이스홀더 텍스트
   */
  placeholder?: string;
  
  /**
   * 트리거에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 화살표 아이콘 사용 여부
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * aria-label
   */
  'aria-label'?: string;
}

// Content Props
export interface SelectContentProps {
  /**
   * 자식 요소
   */
  children: React.ReactNode;
  
  /**
   * 컨텐츠에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 최대 높이 (px)
   */
  maxHeight?: number;
  
  /**
   * 포털로 렌더링할지 여부
   * @default false
   */
  portal?: boolean;
  
  /**
   * 배치 방향
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';
}

// Group Props
export interface SelectGroupProps {
  /**
   * 그룹 레이블
   */
  label: string;
  
  /**
   * 자식 요소
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// Item Props
export interface SelectItemProps extends SelectOption {
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// Label Props
export interface SelectLabelProps {
  /**
   * 레이블 내용
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// Separator Props
export interface SelectSeparatorProps {
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// Root 컴포넌트
const Root = forwardRef<HTMLDivElement, SelectRootProps>(({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  children,
  className = '',
  id: propId,
  size = 'md',
}, ref) => {
  const generatedId = useId();
  const id = propId || `select-${generatedId}`;
  const listboxId = `${id}-listbox`;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  
  // 내부 상태 관리
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  
  // 제어/비제어 모드 처리
  const isOpenControlled = open !== undefined;
  const isValueControlled = value !== undefined;
  
  const currentOpen = isOpenControlled ? open : isOpen;
  const currentValue = isValueControlled ? value : internalValue;
  
  // 상태 변경 핸들러
  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isOpenControlled) {
      setIsOpen(newOpen);
    }
    
    onOpenChange?.(newOpen);
  }, [isOpenControlled, onOpenChange]);
  
  const handleValueChange = useCallback((newValue: string) => {
    if (!isValueControlled) {
      setInternalValue(newValue);
    }
    
    onValueChange?.(newValue);
    handleOpenChange(false);
  }, [isValueControlled, onValueChange, handleOpenChange]);
  
  // 외부 클릭 처리
  useEffect(() => {
    if (!currentOpen) return;
    
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [currentOpen, handleOpenChange]);
  
  // ESC 키 처리
  useEffect(() => {
    if (!currentOpen) return;
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpenChange(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [currentOpen, handleOpenChange]);
  
  return (
    <SelectContext.Provider
      value={{
        open: currentOpen,
        setOpen: handleOpenChange,
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        id,
        listboxId,
        triggerRef
      }}
    >
      <div 
        ref={ref}
        className={`select-container select-${size} ${disabled ? 'select-disabled' : ''} ${className}`}
        data-state={currentOpen ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
});

Root.displayName = 'Select.Root';

// Trigger 컴포넌트
const Trigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({
  placeholder = '옵션 선택',
  className = '',
  showArrow = true,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const { open, setOpen, value, disabled, id, listboxId, triggerRef } = useSelect();
  
  // 선택된 값 표시 텍스트
  const displayText = value || placeholder;
  
  // ref 결합
  const handleRefCallback = (el: HTMLButtonElement | null) => {
    if (triggerRef) {
      triggerRef.current = el;
    }
    
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };
  
  // 클릭 핸들러
  const handleClick = () => {
    if (!disabled) {
      setOpen(!open);
    }
  };
  
  // 키보드 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setOpen(!open);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setOpen(true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setOpen(true);
        break;
    }
  };
  
  return (
    <button
      ref={handleRefCallback}
      id={id}
      type="button"
      className={`select-trigger ${className}`}
      aria-controls={listboxId}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-label={ariaLabel || '옵션 선택'}
      aria-disabled={disabled}
      data-state={open ? 'open' : 'closed'}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="select-value">{displayText}</span>
      {showArrow && (
        <span className="select-icon">
          <ArrowDownIcon />
        </span>
      )}
    </button>
  );
});

Trigger.displayName = 'Select.Trigger';

// Content 컴포넌트
const Content = forwardRef<HTMLDivElement, SelectContentProps>(({
  children,
  className = '',
  maxHeight,
  portal = false,
  position = 'bottom',
  ...props
}, ref) => {
  const { open, listboxId, triggerRef } = useSelect();
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);
  
  // 트리거 너비에 맞게 컨텐츠 너비 설정
  useEffect(() => {
    if (open && triggerRef.current) {
      setMaxWidth(triggerRef.current.offsetWidth);
    }
  }, [open, triggerRef]);
  
  // 드롭다운 위치 계산
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    
    const updatePosition = () => {
      if (!triggerRef.current) return;
      
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      if (position === 'bottom') {
        setDropdownStyle({
          minWidth: `${triggerRect.width}px`,
          maxWidth: maxWidth ? `${maxWidth}px` : undefined,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          top: `${triggerRect.bottom + scrollY}px`,
          left: `${triggerRect.left}px`,
          position: 'absolute',
        });
      } else {
        setDropdownStyle({
          minWidth: `${triggerRect.width}px`,
          maxWidth: maxWidth ? `${maxWidth}px` : undefined,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          bottom: `${window.innerHeight - triggerRect.top + scrollY}px`,
          left: `${triggerRect.left}px`,
          position: 'absolute',
        });
      }
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, maxWidth, maxHeight, position, triggerRef]);
  
  if (!open) return null;
  
  const content = (
    <div
      ref={ref}
      className={`select-content ${className}`}
      style={dropdownStyle}
      data-position={position}
      data-state="open"
      {...props}
    >
      <div 
        className="select-viewport"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      >
        <div 
          id={listboxId}
          role="listbox"
          className="select-listbox"
          tabIndex={-1}
        >
          {children}
        </div>
      </div>
    </div>
  );
  
  if (portal) {
    return ReactDOM.createPortal(content, document.body);
  }
  
  return content;
});

Content.displayName = 'Select.Content';

// Group 컴포넌트
const Group = forwardRef<HTMLDivElement, SelectGroupProps>(({
  label,
  children,
  className = '',
  ...props
}, ref) => {
  const id = useId();
  
  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={id}
      className={`select-group ${className}`}
      {...props}
    >
      <div id={id} className="select-group-label">
        {label}
      </div>
      {children}
    </div>
  );
});

Group.displayName = 'Select.Group';

// Item 컴포넌트
const Item = forwardRef<HTMLDivElement, SelectItemProps>(({
  value: itemValue,
  label,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const { value: selectedValue, onValueChange } = useSelect();
  const isSelected = selectedValue === itemValue;
  const id = useId();
  
  const handleSelect = () => {
    if (!disabled) {
      onValueChange(itemValue);
    }
  };
  
  return (
    <div
      ref={ref}
      id={id}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      className={`select-item ${isSelected ? 'select-item-selected' : ''} ${disabled ? 'select-item-disabled' : ''} ${className}`}
      tabIndex={disabled ? undefined : 0}
      data-state={isSelected ? 'selected' : 'idle'}
      data-disabled={disabled ? '' : undefined}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
      {...props}
    >
      <span className="select-item-indicator">
        {isSelected && <CheckIcon />}
      </span>
      <span className="select-item-text">{label}</span>
    </div>
  );
});

Item.displayName = 'Select.Item';

// Label 컴포넌트
const Label = forwardRef<HTMLLabelElement, SelectLabelProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { id, disabled } = useSelect();
  
  return (
    <label
      ref={ref}
      htmlFor={id}
      className={`select-label ${className}`}
      data-disabled={disabled ? '' : undefined}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Select.Label';

// Separator 컴포넌트
const Separator = forwardRef<HTMLDivElement, SelectSeparatorProps>(({
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className={`select-separator ${className}`}
      {...props}
    />
  );
});

Separator.displayName = 'Select.Separator';

// 기존 API와의 호환성을 위한 컴포넌트
export interface SelectProps {
  /**
   * 기본적으로 표시할 플레이스홀더 텍스트
   */
  placeholder?: string;
  
  /**
   * 현재 선택된 값
   */
  value?: string;
  
  /**
   * 기본 선택 값 (제어되지 않는 컴포넌트로 사용 시)
   */
  defaultValue?: string;
  
  /**
   * 옵션 목록 또는 옵션 그룹 목록
   */
  options: (SelectOption | SelectGroup)[];
  
  /**
   * 컴포넌트 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 컴포넌트의 크기
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 테마 모드
   */
  theme?: 'light' | 'dark' | 'auto';
  
  /**
   * 선택 시 호출될 콜백 함수
   */
  onChange?: (value: string) => void;
  
  /**
   * 드롭다운 열림/닫힘 시 호출될 콜백 함수
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컴포넌트에 적용할 인라인 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * 선택 필수 여부
   */
  required?: boolean;
  
  /**
   * 컴포넌트 ID
   */
  id?: string;
  
  /**
   * 컴포넌트 이름
   */
  name?: string;
  
  /**
   * 최대 드롭다운 높이 (px)
   */
  maxDropdownHeight?: number;
}

/**
 * Select 컴포넌트
 * 
 * 사용자가 옵션 목록에서 선택할 수 있는 드롭다운 컴포넌트입니다.
 * 옵션 그룹화 및 비활성화 옵션을 지원합니다.
 */
const Select = forwardRef<HTMLDivElement, SelectProps>(({
  placeholder = '옵션 선택',
  value,
  defaultValue,
  options,
  disabled = false,
  size = 'md',
  theme = 'light',
  onChange,
  onOpenChange,
  className = '',
  style,
  required = false,
  id,
  name,
  maxDropdownHeight,
}, ref) => {
  // 테마 클래스
  const themeClass = `select-theme-${theme}`;
  
  return (
    <Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange || (() => {})}
      onOpenChange={onOpenChange}
      disabled={disabled || false}
      className={`${className} ${themeClass}`}
      id={id}
      size={size}
    >
      {name && value && (
        <input type="hidden" name={name} value={value} required={required} />
      )}
      
      <Trigger placeholder={placeholder} />
      
      <Content maxHeight={maxDropdownHeight}>
        {options.map((option, index) => {
          if (isGroup(option)) {
            return (
              <Group key={option.label} label={option.label}>
                {option.options.map((groupOption) => (
                  <Item
                    key={groupOption.value}
                    value={groupOption.value}
                    label={groupOption.label}
                    disabled={groupOption.disabled}
                  />
                ))}
              </Group>
            );
          } else {
            return (
              <Item
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            );
          }
        })}
      </Content>
    </Root>
  );
});

Select.displayName = 'Select';

export const SelectComponent = {
  Root,
  Trigger,
  Content,
  Group,
  Item,
  Label,
  Separator
};

export default Select; 