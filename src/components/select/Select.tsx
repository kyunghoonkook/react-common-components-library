import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import './Select.css';

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

// Select 컴포넌트 Props 인터페이스
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
  maxDropdownHeight
}, ref) => {
  // 제어 여부 확인
  const isControlled = value !== undefined;
  
  // 내부 상태 관리
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const [activeTheme, setActiveTheme] = useState(theme);
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
  const [contentNode, setContentNode] = useState<HTMLDivElement | null>(null);
  
  // 실제 사용할 값 (제어/비제어 컴포넌트 모두 지원)
  const selectedValue = isControlled ? value : internalValue;
  
  // Select 열기/닫기 핸들러
  const handleToggle = useCallback(() => {
    if (!disabled) {
      const newOpen = !open;
      setOpen(newOpen);
      onOpenChange?.(newOpen);
    }
  }, [open, disabled, onOpenChange]);
  
  // 옵션 선택 핸들러
  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;
    
    // 제어되지 않는 컴포넌트의 경우 내부 상태 업데이트
    if (!isControlled) {
      setInternalValue(option.value);
    }
    
    // 콜백 호출
    onChange?.(option.value);
    setOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onChange, onOpenChange]);
  
  // 선택된 옵션 찾기
  const findSelectedOption = useCallback(() => {
    for (const item of options) {
      if (isGroup(item)) {
        const found = item.options.find(option => option.value === selectedValue);
        if (found) return found;
      } else if (item.value === selectedValue) {
        return item;
      }
    }
    return undefined;
  }, [options, selectedValue]);
  
  // 선택된 옵션
  const selectedOption = findSelectedOption();
  
  // 외부 클릭 감지 핸들러
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerNode && 
        !containerNode.contains(event.target as Node) &&
        open
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onOpenChange, containerNode]);
  
  // 테마 감지
  useEffect(() => {
    if (theme !== 'auto') {
      setActiveTheme(theme);
      return;
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setActiveTheme(e.matches ? 'dark' : 'light');
    };
    
    setActiveTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // 드롭다운 스타일
  const dropdownStyle = maxDropdownHeight ? { maxHeight: `${maxDropdownHeight}px` } : {};
  
  // ref 설정 함수
  const setContainerRef = (node: HTMLDivElement | null) => {
    // 외부 ref 설정
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
    
    // 내부 상태 업데이트
    setContainerNode(node);
  };
  
  return (
    <div 
      ref={setContainerRef}
      className={`select-container ${activeTheme === 'dark' ? 'dark' : ''} ${className}`}
      style={style}
    >
      <div
        className="select-trigger"
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-required={required}
        id={id}
        data-disabled={disabled ? true : undefined}
      >
        <span className={selectedOption ? '' : 'select-trigger-placeholder'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="select-trigger-icon" data-state={open ? 'open' : 'closed'}>
          <ArrowDownIcon />
        </span>
      </div>
      
      <div
        ref={setContentNode}
        className={`select-content ${!open ? 'select-content-hidden' : ''}`}
        style={dropdownStyle}
        data-state={open ? 'open' : 'closed'}
        role="listbox"
        aria-labelledby={id}
      >
        {options.map((item, index) => {
          if (isGroup(item)) {
            return (
              <div key={`group-${index}`} className="select-group" role="group" aria-labelledby={`select-group-${index}`}>
                <div className="select-group-label" id={`select-group-${index}`}>{item.label}</div>
                {item.options.map((option, optionIndex) => (
                  <div
                    key={`option-${index}-${optionIndex}`}
                    className={`select-item ${option.disabled ? 'select-item-disabled' : ''} ${option.value === selectedValue ? 'select-item-selected' : ''}`}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={option.value === selectedValue}
                    aria-disabled={option.disabled}
                  >
                    {option.value === selectedValue && (
                      <span className="select-item-check">
                        <CheckIcon />
                      </span>
                    )}
                    {option.label}
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div
                key={`option-${index}`}
                className={`select-item ${item.disabled ? 'select-item-disabled' : ''} ${item.value === selectedValue ? 'select-item-selected' : ''}`}
                onClick={() => handleSelect(item)}
                role="option"
                aria-selected={item.value === selectedValue}
                aria-disabled={item.disabled}
              >
                {item.value === selectedValue && (
                  <span className="select-item-check">
                    <CheckIcon />
                  </span>
                )}
                {item.label}
              </div>
            );
          }
        })}
      </div>
      
      {/* 숨겨진 네이티브 select 요소 (폼 제출용) */}
      {name && (
        <select
          name={name}
          aria-hidden="true"
          tabIndex={-1}
          style={{ display: 'none' }}
          value={selectedValue}
          required={required}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((item, index) => {
            if (isGroup(item)) {
              return item.options.map((option, optionIndex) => (
                <option
                  key={`native-option-${index}-${optionIndex}`}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ));
            } else {
              return (
                <option
                  key={`native-option-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.label}
                </option>
              );
            }
          })}
        </select>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select; 