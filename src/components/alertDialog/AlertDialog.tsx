import React, { useEffect, useRef, ReactNode } from 'react';
import { useId } from '../../hooks/useId';
import './AlertDialog.css';

export interface AlertDialogProps {
  /**
   * 대화 상자 표시 여부
   */
  isOpen: boolean;
  
  /**
   * 닫기 핸들러
   */
  onClose: () => void;
  
  /**
   * 대화 상자 제목
   */
  title?: ReactNode;
  
  /**
   * 대화 상자 설명
   */
  description?: ReactNode;
  
  /**
   * 대화 상자 내용
   */
  children?: ReactNode;
  
  /**
   * 취소 버튼 텍스트
   * @default "취소"
   */
  cancelText?: string;
  
  /**
   * 확인 버튼 텍스트
   * @default "확인"
   */
  confirmText?: string;
  
  /**
   * 취소 버튼 클릭 핸들러
   */
  onCancel?: () => void;
  
  /**
   * 확인 버튼 클릭 핸들러
   */
  onConfirm?: () => void;
  
  /**
   * 대화 상자 변형
   * @default "default"
   */
  variant?: 'default' | 'danger' | 'warning' | 'success';
  
  /**
   * 확인 버튼 비활성화 여부
   * @default false
   */
  isConfirmDisabled?: boolean;
  
  /**
   * ESC 키로 닫기 허용 여부
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * 오버레이 클릭으로 닫기 허용 여부
   * @default true
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * 대화 상자에 적용할 추가 CSS 클래스
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
   * 설명에 적용할 추가 CSS 클래스
   */
  descriptionClassName?: string;
  
  /**
   * 하단 영역에 적용할 추가 CSS 클래스
   */
  footerClassName?: string;
  
  /**
   * 취소 버튼에 적용할 추가 CSS 클래스
   */
  cancelButtonClassName?: string;
  
  /**
   * 확인 버튼에 적용할 추가 CSS 클래스
   */
  confirmButtonClassName?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  cancelText = "취소",
  confirmText = "확인",
  onCancel,
  onConfirm,
  variant = "default",
  isConfirmDisabled = false,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  className = '',
  overlayClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  footerClassName = '',
  cancelButtonClassName = '',
  confirmButtonClassName = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      dialogRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousActiveElement.current && 'focus' in previousActiveElement.current) {
        (previousActiveElement.current as HTMLElement).focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div
      className={`alert-dialog-overlay ${overlayClassName}`}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={`alert-dialog ${variant} ${className}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <div className="alert-dialog-content">
          {title && (
            <h2 
              id={titleId}
              className={`alert-dialog-title ${titleClassName}`}
            >
              {title}
            </h2>
          )}
          {description && (
            <div 
              id={descriptionId}
              className={`alert-dialog-description ${descriptionClassName}`}
            >
              {description}
            </div>
          )}
          {children}
          <div className={`alert-dialog-footer ${footerClassName}`}>
            <button
              type="button"
              className={`alert-dialog-cancel ${cancelButtonClassName}`}
              onClick={handleCancel}
              autoFocus
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`alert-dialog-confirm ${variant} ${confirmButtonClassName}`}
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog; 