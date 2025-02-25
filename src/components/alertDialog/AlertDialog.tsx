import React, { ReactNode, CSSProperties } from 'react';
import './AlertDialog.css';

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  content?: ReactNode;
  actions?: ReactNode;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  actionsStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title,
  content,
  actions,
  style,
  titleStyle,
  contentStyle,
  actionsStyle,
  overlayStyle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="alert-dialog-overlay" style={overlayStyle} onClick={onClose}>
      <div 
        className="alert-dialog" 
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="alert-dialog-title" style={titleStyle}>
            {title}
          </div>
        )}
        {content && (
          <div className="alert-dialog-content" style={contentStyle}>
            {content}
          </div>
        )}
        {actions && (
          <div className="alert-dialog-actions" style={actionsStyle}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertDialog; 