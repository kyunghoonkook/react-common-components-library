import React, { useState, useEffect, useRef, ReactNode, CSSProperties, createContext, useContext } from 'react';
import './Popover.css';

type PopoverContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  position: 'top' | 'right' | 'bottom' | 'left';
};

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover 컴포넌트는 Popover.Root 내부에서만 사용할 수 있습니다.');
  }
  return context;
}

export interface PopoverRootProps {
  /**
   * Popover가 기본적으로 열려있는지 여부
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * 외부에서 제어하는 열림 상태
   */
  open?: boolean;
  
  /**
   * 열림 상태가 변경될 때 호출되는 함수
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 클릭 외부에서 Popover를 닫을지 여부
   * @default true
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * ESC 키를 눌렀을 때 Popover를 닫을지 여부
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Popover가 열리는 위치
   * @default 'bottom'
   */
  position?: 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * 자식 요소
   */
  children: ReactNode;
}

export interface PopoverTriggerProps {
  /**
   * 트리거 요소의 자식
   */
  children: ReactNode;
  
  /**
   * 트리거에 적용할 클래스
   */
  className?: string;
  
  /**
   * 트리거에 적용할 스타일
   */
  style?: CSSProperties;
  
  /**
   * 트리거의 aria-label
   */
  ariaLabel?: string;
}

export interface PopoverContentProps {
  /**
   * 컨텐츠 요소의 자식
   */
  children: ReactNode;
  
  /**
   * 컨텐츠에 적용할 클래스
   */
  className?: string;
  
  /**
   * 컨텐츠에 적용할 스타일
   */
  style?: CSSProperties;
  
  /**
   * 컨텐츠의 너비
   */
  width?: string | number;
  
  /**
   * 포지셔닝 오프셋(픽셀)
   */
  sideOffset?: number;
  
  /**
   * 정렬 오프셋(픽셀)
   */
  alignOffset?: number;
}

export interface PopoverFieldProps {
  /**
   * 필드 레이블
   */
  label: string;
  
  /**
   * 입력 타입
   * @default 'text'
   */
  type?: string;
  
  /**
   * 입력 값
   */
  value: string;
  
  /**
   * 값이 변경될 때 호출되는 함수
   */
  onChange: (value: string) => void;
  
  /**
   * 플레이스홀더
   */
  placeholder?: string;
  
  /**
   * 필드 클래스
   */
  className?: string;
}

/**
 * Popover 루트 컴포넌트
 */
const Root: React.FC<PopoverRootProps> = ({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  position = 'bottom',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 제어/비제어 모드 처리
  const open = controlledOpen !== undefined ? controlledOpen : isOpen;
  
  const setOpen = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };
  
  // 외부 클릭 감지
  useEffect(() => {
    if (!closeOnOutsideClick) return;
    
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const triggerEl = triggerRef.current;
      const contentEl = contentRef.current;
      
      if (
        open &&
        contentEl &&
        triggerEl &&
        !contentEl.contains(target) &&
        !triggerEl.contains(target)
      ) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, closeOnOutsideClick]);
  
  // ESC 키 감지
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') {
        setOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, closeOnEscape]);
  
  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef, position }}>
      {children}
    </PopoverContext.Provider>
  );
};

/**
 * Popover 트리거 컴포넌트
 */
const Trigger: React.FC<PopoverTriggerProps> = ({
  children,
  className = '',
  style,
  ariaLabel,
}) => {
  const { open, setOpen, triggerRef } = usePopoverContext();
  
  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <div 
      ref={triggerRef} 
      className={`popover-trigger ${className || ''}`}
      style={style}
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children}
    </div>
  );
};

/**
 * Popover 컨텐츠 컴포넌트
 */
const Content: React.FC<PopoverContentProps> = ({
  children,
  className = '',
  style,
  width,
  sideOffset = 8,
  alignOffset = 0,
}) => {
  const { open, contentRef, triggerRef, position } = usePopoverContext();
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({});
  
  // Popover 위치 계산
  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;
    
    const calculatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const popoverRect = contentRef.current?.getBoundingClientRect();
      
      if (!triggerRect || !popoverRect) return;
      
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      let top, left;
      
      switch (position) {
        case 'top':
          top = triggerRect.top + scrollY - popoverRect.height - sideOffset;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2) + alignOffset;
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (popoverRect.height / 2) + alignOffset;
          left = triggerRect.right + scrollX + sideOffset;
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (popoverRect.height / 2) + alignOffset;
          left = triggerRect.left + scrollX - popoverRect.width - sideOffset;
          break;
        default: // bottom
          top = triggerRect.bottom + scrollY + sideOffset;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2) + alignOffset;
      }
      
      // 화면 밖으로 나가지 않도록 조정
      const maxLeft = window.innerWidth - popoverRect.width - 16;
      const maxTop = window.innerHeight - popoverRect.height - 16;
      
      left = Math.max(16, Math.min(left, maxLeft + scrollX));
      top = Math.max(16, Math.min(top, maxTop + scrollY));
      
      setPopoverStyle({
        width: width,
        top: `${top}px`,
        left: `${left}px`,
        position: 'absolute',
        zIndex: 1000,
      });
    };
    
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [open, position, width, sideOffset, alignOffset]);
  
  if (!open) return null;
  
  return (
    <div
      ref={contentRef}
      className={`popover-content ${className || ''}`}
      style={{ ...popoverStyle, ...style }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

/**
 * Popover 헤더 컴포넌트
 */
const Title: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <h3 className={`popover-title ${className}`}>
      {children}
    </h3>
  );
};

/**
 * Popover 설명 컴포넌트
 */
const Description: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <p className={`popover-description ${className}`}>
      {children}
    </p>
  );
};

/**
 * Popover 필드 컴포넌트
 */
const Field: React.FC<PopoverFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className={`popover-field ${className || ''}`}>
      <label className="popover-field-label">{label}</label>
      <input
        type={type}
        className="popover-field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

/**
 * Popover 닫기 버튼 컴포넌트
 */
const Close: React.FC<{ 
  children?: ReactNode; 
  className?: string;
  ariaLabel?: string;
}> = ({ 
  children, 
  className = '',
  ariaLabel = '닫기' 
}) => {
  const { setOpen } = usePopoverContext();
  
  return (
    <button 
      className={`popover-close ${className}`}
      onClick={() => setOpen(false)}
      aria-label={ariaLabel}
    >
      {children || '×'}
    </button>
  );
};

export const Popover = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Field,
  Close
};

export default Popover; 