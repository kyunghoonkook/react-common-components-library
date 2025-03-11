import React, { useState, useRef, useEffect, ReactNode, ReactElement, cloneElement } from 'react';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export type TooltipSize = 'sm' | 'md' | 'lg';
export type TooltipTrigger = 'hover' | 'click' | 'focus';

export interface TooltipProps {
  /**
   * 툴팁에 표시할 컨텐츠
   */
  content: ReactNode;
  
  /**
   * 툴팁을 표시할 대상 요소
   */
  children: ReactElement;
  
  /**
   * 툴팁 위치
   * @default 'top'
   */
  placement?: TooltipPlacement;
  
  /**
   * 툴팁 크기
   * @default 'md'
   */
  size?: TooltipSize;
  
  /**
   * 툴팁을 트리거하는 이벤트
   * @default 'hover'
   */
  trigger?: TooltipTrigger;
  
  /**
   * 툴팁 표시 지연 시간 (ms)
   * @default 0
   */
  delayShow?: number;
  
  /**
   * 툴팁 숨김 지연 시간 (ms)
   * @default 0
   */
  delayHide?: number;
  
  /**
   * 화살표 표시 여부
   * @default true
   */
  arrow?: boolean;
  
  /**
   * 기본적으로 표시할지 여부
   * @default false
   */
  defaultVisible?: boolean;
  
  /**
   * 툴팁 표시 여부 (제어 컴포넌트로 사용할 때)
   */
  visible?: boolean;
  
  /**
   * 툴팁 표시 상태 변경 시 호출될 함수
   */
  onVisibleChange?: (visible: boolean) => void;
  
  /**
   * 툴팁 컨테이너에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 툴팁 내용에 적용할 CSS 클래스
   */
  contentClassName?: string;
  
  /**
   * z-index 값
   * @default 1000
   */
  zIndex?: number;
  
  /**
   * 추가 스타일
   */
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  size = 'md',
  trigger = 'hover',
  delayShow = 0,
  delayHide = 0,
  arrow = true,
  defaultVisible = false,
  visible: controlledVisible,
  onVisibleChange,
  className = '',
  contentClassName = '',
  zIndex,
  style,
  ...rest
}) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [isLongText, setIsLongText] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 제어/비제어 모드
  const isControlled = controlledVisible !== undefined;
  const shouldShow = isControlled ? controlledVisible : isVisible;
  
  // 타임아웃 클리어 함수
  const clearTimeouts = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };
  
  // 툴팁 표시 함수
  const showTooltip = () => {
    clearTimeouts();
    
    if (delayShow > 0) {
      showTimeoutRef.current = setTimeout(() => {
        if (!isControlled) setIsVisible(true);
        if (onVisibleChange) onVisibleChange(true);
      }, delayShow);
    } else {
      if (!isControlled) setIsVisible(true);
      if (onVisibleChange) onVisibleChange(true);
    }
  };
  
  // 툴팁 숨김 함수
  const hideTooltip = () => {
    clearTimeouts();
    
    if (delayHide > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        if (!isControlled) setIsVisible(false);
        if (onVisibleChange) onVisibleChange(false);
      }, delayHide);
    } else {
      if (!isControlled) setIsVisible(false);
      if (onVisibleChange) onVisibleChange(false);
    }
  };
  
  // 텍스트 길이 확인
  useEffect(() => {
    if (shouldShow && tooltipRef.current) {
      const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
      setIsLongText(tooltipWidth >= 300);
    }
  }, [shouldShow, content]);
  
  // 타임아웃 정리
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);
  
  // 이벤트 핸들러 설정
  const getEventHandlers = () => {
    const handlers: Record<string, any> = {};
    
    if (trigger === 'hover') {
      handlers.onMouseEnter = showTooltip;
      handlers.onMouseLeave = hideTooltip;
    } else if (trigger === 'click') {
      handlers.onClick = () => {
        if (shouldShow) {
          hideTooltip();
        } else {
          showTooltip();
        }
      };
    } else if (trigger === 'focus') {
      handlers.onFocus = showTooltip;
      handlers.onBlur = hideTooltip;
    }
    
    return handlers;
  };
  
  // 자식 요소에 ref와 이벤트 핸들러 추가
  const childElement = cloneElement(children, getEventHandlers());
  
  // 툴팁 클래스 이름 생성
  const tooltipClasses = [
    'tooltip',
    `tooltip-${placement}`,
    `tooltip-${size}`,
    shouldShow ? 'show' : '',
    isLongText ? 'tooltip-multiline' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className="tooltip-container">
      {childElement}
      
      {(
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          style={{ 
            ...style,
            zIndex: zIndex 
          }}
          {...rest}
        >
          {content}
          {arrow && <div className="tooltip-arrow" />}
        </div>
      )}
    </div>
  );
};

export default Tooltip; 