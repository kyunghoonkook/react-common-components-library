import React, { useState, useCallback, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import './Collapsible.css';

export interface CollapsibleProps {
  /**
   * 컴포넌트 제목
   */
  title: ReactNode;
  
  /**
   * 첫 번째 항목 (항상 표시됨)
   */
  firstItem: ReactNode;
  
  /**
   * 나머지 항목들 (토글 가능)
   */
  restItems: ReactNode[];
  
  /**
   * 기본 열림 상태
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * 외부에서 제어할 때 사용하는 열림 상태
   */
  open?: boolean;
  
  /**
   * 열림 상태가 변경될 때 호출되는 콜백
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;

  /**
   * 제목에 적용할 추가 CSS 클래스
   */
  titleClassName?: string;

  /**
   * 토글 버튼에 적용할 추가 CSS 클래스
   */
  toggleClassName?: string;

  /**
   * 첫 번째 항목에 적용할 추가 CSS 클래스
   */
  firstItemClassName?: string;

  /**
   * 나머지 항목들에 적용할 추가 CSS 클래스
   */
  itemClassName?: string;

  /**
   * 화살표에 적용할 추가 CSS 클래스
   */
  arrowClassName?: string;

  /**
   * 커스텀 위쪽 화살표 요소
   */
  customUpArrow?: ReactNode;

  /**
   * 커스텀 아래쪽 화살표 요소
   */
  customDownArrow?: ReactNode;

  /**
   * 애니메이션 비활성화 여부
   * @default false
   */
  disableAnimation?: boolean;

  /**
   * 항목 간 간격 (픽셀)
   * @default 12
   */
  itemGap?: number;

  /**
   * 컴포넌트에 적용할 인라인 스타일
   */
  style?: CSSProperties;

  /**
   * 제목에 적용할 인라인 스타일
   */
  titleStyle?: CSSProperties;

  /**
   * 토글 버튼에 적용할 인라인 스타일
   */
  toggleStyle?: CSSProperties;

  /**
   * 첫 번째 항목에 적용할 인라인 스타일
   */
  firstItemStyle?: CSSProperties;

  /**
   * 나머지 항목들에 적용할 인라인 스타일
   */
  itemStyle?: CSSProperties;

  /**
   * 중첩 레벨 (내부 사용)
   * @default 0
   */
  level?: number;

  /**
   * ID 접두사 (내부 사용)
   */
  idPrefix?: string;
}

/**
 * Collapsible 컴포넌트는 첫 번째 항목을 항상 표시하고, 나머지 항목을 토글할 수 있는 UI 요소입니다.
 */
const Collapsible = React.memo<CollapsibleProps>(({
  title,
  firstItem,
  restItems,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className = '',
  titleClassName = '',
  toggleClassName = '',
  firstItemClassName = '',
  itemClassName = '',
  arrowClassName = '',
  customUpArrow,
  customDownArrow,
  disableAnimation = false,
  itemGap = 12,
  style,
  titleStyle,
  toggleStyle,
  firstItemStyle,
  itemStyle,
  level = 0,
  idPrefix = 'collapsible',
}) => {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const uniqueId = `${idPrefix}-${level}`;
  
  const handleToggle = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(!uncontrolledOpen);
    }
    if (onOpenChange) {
      onOpenChange(!isOpen);
    }
  }, [isControlled, uncontrolledOpen, onOpenChange, isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        handleToggle();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (e.ctrlKey) {
          setUncontrolledOpen(false);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (e.ctrlKey) {
          setUncontrolledOpen(true);
        }
        break;
    }
  }, [handleToggle]);

  useEffect(() => {
    if (contentRef.current && !disableAnimation) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, disableAnimation, restItems]);

  // 커스텀 스타일 및 클래스 적용
  const contentStyle: CSSProperties = {
    gap: `${itemGap}px`,
  };

  const restItemsClassName = `collapsible-rest-items ${disableAnimation ? 'no-animation' : ''}`;
  
  return (
    <div 
      className={`collapsible ${className}`} 
      style={style}
      role="region"
      aria-labelledby={`${uniqueId}-header`}
    >
      <div 
        className="collapsible-header"
        role="heading"
        aria-level={level + 1}
        id={`${uniqueId}-header`}
      >
        <h3 className={`collapsible-title ${titleClassName}`} style={titleStyle}>
          {title}
        </h3>
        <button 
          className={`collapsible-toggle ${toggleClassName}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={`${uniqueId}-content`}
          aria-label={isOpen ? "접기" : "더 보기"}
          style={toggleStyle}
        >
          <div className="collapsible-toggle-content">
            <div className="double-arrow">
              {customUpArrow ? (
                <div className="arrow arrow-up" aria-hidden="true">{customUpArrow}</div>
              ) : (
                <svg 
                  className={`arrow arrow-up ${arrowClassName}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    d="M2 8L6 4L10 8" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {customDownArrow ? (
                <div className="arrow arrow-down" aria-hidden="true">{customDownArrow}</div>
              ) : (
                <svg 
                  className={`arrow arrow-down ${arrowClassName}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    d="M2 4L6 8L10 4" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </button>
      </div>
      
      <div 
        className="collapsible-content" 
        style={contentStyle}
        id={`${uniqueId}-content`}
        role="region"
        aria-labelledby={`${uniqueId}-header`}
      >
        <div 
          className={`collapsible-first-item ${firstItemClassName}`}
          style={firstItemStyle}
          role="listitem"
        >
          {firstItem}
        </div>
        
        {isOpen && restItems.length > 0 && (
          <div 
            ref={contentRef}
            className={restItemsClassName}
            style={{
              height: disableAnimation ? undefined : contentHeight,
              overflow: 'hidden',
              transition: disableAnimation ? undefined : 'height 0.3s ease'
            }}
            role="list"
          >
            {restItems.map((item, index) => (
              <div 
                key={index} 
                className={`collapsible-item ${itemClassName}`}
                style={itemStyle}
                role="listitem"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Collapsible.displayName = 'Collapsible';

export default Collapsible; 