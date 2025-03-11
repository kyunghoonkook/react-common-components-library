import React, { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import './Textarea.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 텍스트 영역 크기
   * @default 'md'
   */
  size?: TextareaSize;
  
  /**
   * 에러 상태 표시
   * @default false
   */
  error?: boolean;
  
  /**
   * 에러 메시지
   */
  errorMessage?: string;
  
  /**
   * 레이블
   */
  label?: string;
  
  /**
   * 설명 텍스트
   */
  description?: string;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컨테이너에 적용할 추가 CSS 클래스
   */
  containerClassName?: string;
  
  /**
   * 최대 높이 (px)
   */
  maxHeight?: number;
  
  /**
   * 자동 조절 여부 (입력 내용에 따라 높이 조절)
   * @default false
   */
  autoResize?: boolean;
  
  /**
   * 표시할 줄 수
   * @default 3
   */
  rows?: number;
}

/**
 * Textarea 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 인터페이스를 제공합니다.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  size = 'md',
  error = false,
  errorMessage,
  label,
  description,
  className = '',
  containerClassName = '',
  maxHeight,
  autoResize = false,
  rows = 3,
  id: propId,
  onChange,
  onInput,
  ...rest
}, ref) => {
  const uniqueId = useId();
  const id = propId || `textarea-${uniqueId}`;
  
  // 자동 크기 조절 핸들러
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      const target = e.target as HTMLTextAreaElement;
      target.style.height = 'auto';
      let newHeight = target.scrollHeight;
      
      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
        target.style.overflowY = 'auto';
      } else {
        target.style.overflowY = 'hidden';
      }
      
      target.style.height = `${newHeight}px`;
    }
    
    onInput?.(e);
  };
  
  return (
    <div className={`textarea-container ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`textarea textarea-${size} ${error ? 'textarea-error' : ''} ${className}`}
        onChange={onChange}
        onInput={handleInput}
        style={maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}
        {...rest}
      />
      
      {description && !error && (
        <p className="textarea-description">{description}</p>
      )}
      
      {error && errorMessage && (
        <p className="textarea-error-message">{errorMessage}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea; 