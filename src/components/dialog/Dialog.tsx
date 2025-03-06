import React, { useEffect, useRef, ReactNode } from 'react';
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
}

/**
 * FormField 컴포넌트 - 레이블과 입력 필드를 묶어서 표시
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  labelClassName = '',
  className = '',
}) => {
  return (
    <div className={`dialog-form-field ${className}`}>
      <div className={`dialog-form-field-label ${labelClassName}`}>
        {label}
      </div>
      <div className="dialog-form-field-input">
        {children}
      </div>
    </div>
  );
};

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
   * 다이얼로그 내용 (description 대신 사용 가능)
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
   * 다이얼로그 너비 (px 또는 %)
   */
  width?: string;
  
  /**
   * 최대 너비 (px 또는 %)
   * @default '500px'
   */
  maxWidth?: string;
  
  /**
   * 다이얼로그 컨테이너에 적용할 스타일
   */
  style?: React.CSSProperties;
}

/**
 * 다이얼로그 컴포넌트
 */
const Dialog: React.FC<DialogProps> = ({
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
  width,
  maxWidth = '500px',
  style,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  
  // 다이얼로그가 열릴 때 포커스 설정 및 포커스 트랩 구현
  useEffect(() => {
    if (isOpen) {
      // 현재 활성 요소 저장
      previousActiveElement.current = document.activeElement;
      
      // 다이얼로그에 포커스 설정
      if (dialogRef.current) {
        dialogRef.current.focus();
      }
      
      // 스크롤 막기
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 허용
      document.body.style.overflow = '';
      
      // 포커스 복원
      if (previousActiveElement.current && 'focus' in previousActiveElement.current) {
        (previousActiveElement.current as HTMLElement).focus();
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // ESC 키 눌림 감지
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);
  
  // 다이얼로그가 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;
  
  // 오버레이 클릭 핸들러
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };
  
  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    if (onSubmit) {
      onSubmit(e);
    }
  };
  
  return (
    <div className={`dialog-overlay ${overlayClassName}`} onClick={handleOverlayClick}>
      <div 
        className={`dialog ${className}`} 
        style={{ 
          ...(width ? { width } : {}),
          ...(maxWidth ? { maxWidth } : {}),
          ...style
        }}
      >
        {title && (
          <h2 className={`dialog-title ${titleClassName}`}>{title}</h2>
        )}
        
        {description && (
          <p className={`dialog-description`}>{description}</p>
        )}
        
        {onSubmit ? (
          <form onSubmit={handleSubmit}>
            <div className={`dialog-content ${contentClassName}`}>
              {children}
            </div>
            
            <div className={`dialog-footer ${footerClassName}`}>
              <button type="submit" className="dialog-submit">
                {submitText}
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
};

export default Dialog; 