import React, { ReactNode, CSSProperties } from 'react';
import './AlertDialog.css';

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
  actionsStyle?: CSSProperties;
  cancelButtonStyle?: CSSProperties;
  confirmButtonStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  /**
   * 대화 상자에 적용할 추가 CSS 클래스
   */
  className?: string;
  /**
   * 오버레이에 적용할 추가 CSS 클래스
   */
  overlayClassName?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title = "Are you sure absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  cancelText = "Cancel",
  confirmText = "Continue",
  onCancel,
  onConfirm,
  style,
  titleStyle,
  descriptionStyle,
  actionsStyle,
  cancelButtonStyle,
  confirmButtonStyle,
  overlayStyle,
  className = '',
  overlayClassName = '',
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <div className={`alert-dialog-overlay ${overlayClassName}`} style={overlayStyle} onClick={onClose}>
      <div 
        className={`alert-dialog ${className}`} 
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="alert-dialog-content">
          {title && (
            <div className="alert-dialog-title" style={titleStyle}>
              {title}
            </div>
          )}
          {description && (
            <div className="alert-dialog-description" style={descriptionStyle}>
              {description}
            </div>
          )}
          <div className="alert-dialog-actions" style={actionsStyle}>
            <button 
              className="alert-dialog-cancel" 
              onClick={handleCancel}
              style={cancelButtonStyle}
            >
              {cancelText}
            </button>
            <button 
              className="alert-dialog-confirm" 
              onClick={handleConfirm}
              style={confirmButtonStyle}
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