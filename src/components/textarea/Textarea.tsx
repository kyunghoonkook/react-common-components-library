import React, { TextareaHTMLAttributes, forwardRef, useId, createContext, useContext } from 'react';
import './Textarea.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

// Context 타입 정의
type TextareaContextType = {
  id: string;
  size: TextareaSize;
  error?: boolean;
  disabled?: boolean;
};

// Context 생성
const TextareaContext = createContext<TextareaContextType | undefined>(undefined);

// Context Hook
const useTextarea = () => {
  const context = useContext(TextareaContext);
  if (!context) {
    throw new Error('Textarea 컴포넌트 내에서 사용해야 합니다');
  }
  return context;
};

export interface TextareaRootProps {
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
   * 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 자식 요소
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
}

export interface TextareaLabelProps {
  /**
   * 레이블 내용
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface TextareaInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
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
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface TextareaDescriptionProps {
  /**
   * 설명 내용
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface TextareaErrorMessageProps {
  /**
   * 에러 메시지 내용
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

const Root = forwardRef<HTMLDivElement, TextareaRootProps>(({
  size = 'md',
  error = false,
  disabled = false,
  children,
  className = '',
  id: propId,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = propId || `textarea-${generatedId}`;
  
  return (
    <TextareaContext.Provider value={{ id, size, error, disabled }}>
      <div 
        ref={ref}
        className={`textarea-container ${className}`}
        data-disabled={disabled ? '' : undefined}
        {...props}
      >
        {children}
      </div>
    </TextareaContext.Provider>
  );
});

Root.displayName = 'Textarea.Root';

const Label = forwardRef<HTMLLabelElement, TextareaLabelProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { id, disabled } = useTextarea();
  
  return (
    <label
      ref={ref}
      htmlFor={id}
      className={`textarea-label ${className}`}
      data-disabled={disabled ? '' : undefined}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Textarea.Label';

const Input = forwardRef<HTMLTextAreaElement, TextareaInputProps>(({
  maxHeight,
  autoResize = false,
  className = '',
  onChange,
  onInput,
  rows = 3,
  disabled,
  ...props
}, ref) => {
  const { id, size, error, disabled: contextDisabled } = useTextarea();
  const isDisabled = disabled || contextDisabled;
  
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
    
    if (onInput) {
      onInput(e);
    }
  };
  
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      className={`textarea textarea-${size} ${error ? 'textarea-error' : ''} ${className}`}
      onChange={onChange}
      onInput={handleInput}
      style={maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}
      disabled={isDisabled}
      data-disabled={isDisabled ? '' : undefined}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  );
});

Input.displayName = 'Textarea.Input';

const Description = forwardRef<HTMLParagraphElement, TextareaDescriptionProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { id } = useTextarea();
  
  return (
    <p
      ref={ref}
      id={`${id}-description`}
      className={`textarea-description ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

Description.displayName = 'Textarea.Description';

const ErrorMessage = forwardRef<HTMLParagraphElement, TextareaErrorMessageProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { id, error } = useTextarea();
  
  if (!error) return null;
  
  return (
    <p
      ref={ref}
      id={`${id}-error`}
      className={`textarea-error-message ${className}`}
      aria-live="polite"
      {...props}
    >
      {children}
    </p>
  );
});

ErrorMessage.displayName = 'Textarea.ErrorMessage';

// 기존 API와의 호환성을 위한 타입
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  maxHeight?: number;
  autoResize?: boolean;
  rows?: number;
}

/**
 * Textarea 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 인터페이스를 제공합니다.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
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
  disabled,
  id,
  ...rest
}, ref) => {
  return (
    <Root size={size} error={error} disabled={disabled} className={containerClassName} id={id}>
      {label && <Label>{label}</Label>}
      <Input
        ref={ref}
        maxHeight={maxHeight}
        autoResize={autoResize}
        rows={rows}
        className={className}
        aria-describedby={description ? `${id || ''}-description` : undefined}
        {...rest}
      />
      {description && <Description>{description}</Description>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Root>
  );
});

Textarea.displayName = 'Textarea';

export const TextareaComponent = {
  Root,
  Label,
  Input,
  Description,
  ErrorMessage
};

export default Textarea; 