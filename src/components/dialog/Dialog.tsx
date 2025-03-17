import React, { useEffect, useRef, ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';

/**
 * FormField 컴포넌트의 props 인터페이스
 */
export interface FormFieldProps {
  /**
   * 필드 레이블
   */
  label: ReactNode;
  
  /**
   * 필드 입력 요소
   */
  children: ReactNode;
  
  /**
   * 레이블에 적용할 추가 CSS 클래스
   */
  labelClassName?: string;
  
  /**
   * 필드 컨테이너에 적용할 추가 CSS 클래스
   */
  className?: string;

  /**
   * 필수 필드 여부
   */
  required?: boolean;

  /**
   * 에러 메시지
   */
  error?: string;

  /**
   * 도움말 텍스트
   */
  helpText?: string;
}

/**
 * FormField 컴포넌트 - 레이블과 입력 필드를 묶어서 표시
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  labelClassName = '',
  className = '',
  required = false,
  error,
  helpText,
}) => {
  const id = useRef(`field-${Math.random().toString(36).substr(2, 9)}`).current;

  return (
    <div className={`dialog-form-field ${className}`}>
      <div className={`dialog-form-field-label ${labelClassName}`}>
        <label htmlFor={id}>
          {label}
          {required && <span className="dialog-form-field-required">*</span>}
        </label>
      </div>
      <div className="dialog-form-field-input">
        {React.cloneElement(children as React.ReactElement, { id, 'aria-describedby': error ? `${id}-error` : helpText ? `${id}-help` : undefined })}
        {error && <div id={`${id}-error`} className="dialog-form-field-error" role="alert">{error}</div>}
        {helpText && <div id={`${id}-help`} className="dialog-form-field-help">{helpText}</div>}
      </div>
    </div>
  );
};

/**
 * Dialog 크기 프리셋
 */
export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Dialog 컴포넌트의 props 인터페이스
 */
export interface DialogProps {
  /**
   * 다이얼로그 열림 상태
   */
  isOpen: boolean;
  
  /**
   * 다이얼로그 닫기 핸들러
   */
  onClose: () => void;
  
  /**
   * 다이얼로그 제목
   */
  title?: ReactNode;
  
  /**
   * 다이얼로그 설명 또는 내용
   */
  description?: ReactNode;
  
  /**
   * 다이얼로그 내용
   */
  children?: ReactNode;
  
  /**
   * 다이얼로그 하단 버튼 또는 액션 영역
   */
  footer?: ReactNode;
  
  /**
   * 제출 버튼 텍스트
   * @default "Save changes"
   */
  submitText?: string;
  
  /**
   * 폼 제출 핸들러
   */
  onSubmit?: (e: React.FormEvent) => void;
  
  /**
   * 배경 클릭시 닫기 허용 여부
   * @default true
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * ESC 키로 닫기 허용 여부
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 오버레이에 적용할 추가 CSS 클래스
   */
  overlayClassName?: string;
  
  /**
   * 제목에 적용할 추가 CSS 클래스
   */
  titleClassName?: string;
  
  /**
   * 내용에 적용할 추가 CSS 클래스
   */
  contentClassName?: string;
  
  /**
   * 하단 영역에 적용할 추가 CSS 클래스
   */
  footerClassName?: string;
  
  /**
   * 다이얼로그 크기
   * @default 'md'
   */
  size?: DialogSize;
  
  /**
   * 다이얼로그 너비 (size보다 우선 적용)
   */
  width?: string;
  
  /**
   * 최대 너비 (size보다 우선 적용)
   */
  maxWidth?: string;
  
  /**
   * 다이얼로그 컨테이너에 적용할 스타일
   */
  style?: React.CSSProperties;

  /**
   * 로딩 상태
   */
  isLoading?: boolean;

  /**
   * 초기 포커스를 받을 요소의 ref
   */
  initialFocusRef?: React.RefObject<HTMLElement>;

  /**
   * 닫힐 때 포커스를 받을 요소의 ref
   */
  finalFocusRef?: React.RefObject<HTMLElement>;

  /**
   * 트랜지션 지속 시간 (ms)
   * @default 200
   */
  transitionDuration?: number;

  /**
   * 중첩 레벨 (내부용)
   */
  nestingLevel?: number;
}

const SIZES: Record<DialogSize, string> = {
  xs: '320px',
  sm: '384px',
  md: '448px',
  lg: '512px',
  xl: '576px',
  full: '100%'
};

/**
 * 다이얼로그 컴포넌트
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  submitText = "Save changes",
  onSubmit,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
  overlayClassName = '',
  titleClassName = '',
  contentClassName = '',
  footerClassName = '',
  size = 'md',
  width,
  maxWidth,
  style,
  isLoading = false,
  initialFocusRef,
  finalFocusRef,
  transitionDuration = 200,
  nestingLevel = 0,
}, ref) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const [exiting, setExiting] = useState(false);

  // 포커스 가능한 요소 찾기
  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return [];
    return Array.from(
      dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  }, []);

  // 포커스 트랩 구현
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, [getFocusableElements]);

  // 키보드 이벤트 처리
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEsc) {
      onClose();
    } else if (e.key === 'Tab') {
      handleTabKey(e);
    }
  }, [closeOnEsc, onClose, handleTabKey]);

  // 다이얼로그가 열릴 때 포커스 설정
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else if (dialogRef.current) {
          dialogRef.current.focus();
        }
      }

      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        
        if (finalFocusRef?.current) {
          finalFocusRef.current.focus();
        } else if (previousActiveElement.current && 'focus' in previousActiveElement.current) {
          (previousActiveElement.current as HTMLElement).focus();
        }
      }
    };
  }, [isOpen, handleKeyDown, initialFocusRef, finalFocusRef, getFocusableElements]);

  // 오버레이 클릭 핸들러
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && !isLoading) {
      onSubmit(e);
    }
  }, [onSubmit, isLoading]);

  // 애니메이션 처리
  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onClose();
    }, transitionDuration);
  }, [onClose, transitionDuration]);

  if (!isOpen) return null;

  const dialogContent = (
    <div 
      className={`dialog-overlay ${overlayClassName} ${exiting ? 'exiting' : ''}`} 
      onClick={handleOverlayClick}
      style={{ 
        '--dialog-transition-duration': `${transitionDuration}ms`,
        '--dialog-z-index': `${1000 + nestingLevel * 10}`,
      } as React.CSSProperties}
    >
      <div 
        ref={ref || dialogRef}
        className={`dialog ${className} ${exiting ? 'exiting' : ''}`} 
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
        tabIndex={-1}
        style={{ 
          width: width || SIZES[size],
          maxWidth: maxWidth || (size === 'full' ? '100%' : SIZES.xl),
          ...style
        }}
      >
        {title && (
          <h2 id="dialog-title" className={`dialog-title ${titleClassName}`}>
            {title}
          </h2>
        )}
        
        {description && (
          <p id="dialog-description" className="dialog-description">
            {description}
          </p>
        )}
        
        {onSubmit ? (
          <form onSubmit={handleSubmit}>
            <div className={`dialog-content ${contentClassName}`}>
              {children}
            </div>
            
            <div className={`dialog-footer ${footerClassName}`}>
              <button 
                type="submit" 
                className="dialog-submit"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : submitText}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={`dialog-content ${contentClassName}`}>
              {children}
            </div>
            
            {footer && (
              <div className={`dialog-footer ${footerClassName}`}>
                {footer}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
});

Dialog.displayName = 'Dialog';

export default Dialog; 