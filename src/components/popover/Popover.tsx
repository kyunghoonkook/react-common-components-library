import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import './Popover.css';

export interface PopoverProps {
  /**
   * Popover를 열기 위한 트리거 요소
   */
  trigger: ReactNode;
  
  /**
   * Popover의 제목
   */
  title?: ReactNode;
  
  /**
   * Popover의 설명
   */
  description?: ReactNode;
  
  /**
   * Popover의 내용
   */
  children: ReactNode;
  
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
   * Popover 컨텐츠의 너비
   */
  width?: string | number;
  
  /**
   * Popover가 열리는 위치
   * @default 'bottom'
   */
  position?: 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * Popover 트리거에 적용할 클래스
   */
  triggerClassName?: string;
  
  /**
   * Popover 컨텐츠에 적용할 클래스
   */
  contentClassName?: string;
  
  /**
   * Popover 제목에 적용할 클래스
   */
  titleClassName?: string;
  
  /**
   * Popover 설명에 적용할 클래스
   */
  descriptionClassName?: string;
  
  /**
   * Popover 트리거에 적용할 스타일
   */
  triggerStyle?: CSSProperties;
  
  /**
   * Popover 컨텐츠에 적용할 스타일
   */
  contentStyle?: CSSProperties;
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

export const PopoverField: React.FC<PopoverFieldProps> = ({
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

const Popover: React.FC<PopoverProps> = ({
  trigger,
  title,
  description,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  width,
  position = 'bottom',
  triggerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  triggerStyle,
  contentStyle,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({});
  
  // 제어/비제어 모드 처리
  const open = controlledOpen !== undefined ? controlledOpen : isOpen;
  
  // 토글 함수
  const toggle = () => {
    const newOpen = !open;
    setIsOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };
  
  // 닫기 함수
  const close = () => {
    setIsOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  // 외부 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!closeOnOutsideClick) return;
      
      const target = event.target as Node;
      const triggerEl = triggerRef.current;
      const popoverEl = popoverRef.current;
      
      if (
        open &&
        popoverEl &&
        triggerEl &&
        !popoverEl.contains(target) &&
        !triggerEl.contains(target)
      ) {
        close();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, closeOnOutsideClick]);
  
  // ESC 키 감지
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEscape && open && event.key === 'Escape') {
        close();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, closeOnEscape]);
  
  // Popover 위치 계산
  useEffect(() => {
    if (!open || !triggerRef.current || !popoverRef.current) return;
    
    const calculatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const popoverRect = popoverRef.current?.getBoundingClientRect();
      
      if (!triggerRect || !popoverRect) return;
      
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      let top, left;
      
      switch (position) {
        case 'top':
          top = triggerRect.top + scrollY - popoverRect.height - 8;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (popoverRect.height / 2);
          left = triggerRect.right + scrollX + 8;
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (popoverRect.height / 2);
          left = triggerRect.left + scrollX - popoverRect.width - 8;
          break;
        default: // bottom
          top = triggerRect.bottom + scrollY + 8;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (popoverRect.width / 2);
      }
      
      // 화면 밖으로 나가지 않도록 조정
      const maxLeft = window.innerWidth - popoverRect.width - 16;
      const maxTop = window.innerHeight - popoverRect.height - 16;
      
      left = Math.max(16, Math.min(left, maxLeft + scrollX));
      top = Math.max(16, Math.min(top, maxTop + scrollY));
      
      setPopoverStyle({
        width: width,
        top: `${top}px`,
        left: `${left}px`
      });
    };
    
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [open, position, width]);
  
  return (
    <>
      <div 
        ref={triggerRef} 
        className={`popover-trigger ${triggerClassName || ''}`}
        style={triggerStyle}
        onClick={toggle}
      >
        {trigger}
      </div>
      
      {open && (
        <div
          ref={popoverRef}
          className={`popover-content ${contentClassName || ''}`}
          style={{ ...popoverStyle, ...contentStyle }}
          role="dialog"
        >
          {title && (
            <h3 className={`popover-title ${titleClassName || ''}`}>
              {title}
            </h3>
          )}
          
          {description && (
            <p className={`popover-description ${descriptionClassName || ''}`}>
              {description}
            </p>
          )}
          
          {children}
        </div>
      )}
    </>
  );
};

export default Popover; 