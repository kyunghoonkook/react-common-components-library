import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import './HoverCard.css';

export interface HoverCardProps {
  /**
   * 호버 시 카드가 표시될 트리거 요소
   */
  trigger: ReactNode;
  
  /**
   * 호버 카드에 표시될 내용
   */
  content: ReactNode;
  
  /**
   * 카드가 표시되기까지의 지연 시간 (밀리초)
   * @default 300
   */
  openDelay?: number;
  
  /**
   * 카드가 닫히기까지의 지연 시간 (밀리초)
   * @default 300
   */
  closeDelay?: number;
  
  /**
   * 카드 위치
   * @default 'bottom'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * 외부에서 제어할 때 사용하는 열림 상태
   */
  open?: boolean;
  
  /**
   * 열림 상태가 변경될 때 호출되는 콜백
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 카드 너비
   * @default '250px'
   */
  width?: string;
  
  /**
   * 부모 요소 스타일
   */
  style?: CSSProperties;
  
  /**
   * 카드 스타일
   */
  cardStyle?: CSSProperties;
  
  /**
   * 부모 요소에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 카드에 적용할 추가 CSS 클래스
   */
  cardClassName?: string;
  
  /**
   * 카드가 트리거보다 앞에 렌더링될지 여부
   * @default false
   */
  inPortal?: boolean;
  
  /**
   * 화살표 표시 여부
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * 화살표에 적용할 추가 CSS 클래스
   */
  arrowClassName?: string;
  
  /**
   * 화살표 스타일
   */
  arrowStyle?: CSSProperties;
}

const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  content,
  openDelay = 300,
  closeDelay = 300,
  position = 'bottom',
  open: controlledOpen,
  onOpenChange,
  width = '250px',
  style,
  cardStyle,
  className = '',
  cardClassName = '',
  inPortal = false,
  showArrow = true,
  arrowClassName = '',
  arrowStyle,
}) => {
  const [isOpen, setIsOpen] = useState(controlledOpen || false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 외부에서 제어하는 경우 상태 동기화
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen);
    }
  }, [controlledOpen]);
  
  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);
  
  // 카드 위치 계산
  const calculatePosition = () => {
    if (!triggerRef.current || !cardRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = triggerRect.top - cardRect.height - 10;
        left = triggerRect.left + (triggerRect.width / 2) - (cardRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + 10;
        left = triggerRect.left + (triggerRect.width / 2) - (cardRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - (cardRect.height / 2);
        left = triggerRect.left - cardRect.width - 10;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (cardRect.height / 2);
        left = triggerRect.right + 10;
        break;
    }
    
    // 뷰포트 경계 확인 및 조정
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 왼쪽 경계
    if (left < 10) left = 10;
    
    // 오른쪽 경계
    if (left + cardRect.width > viewportWidth - 10) {
      left = viewportWidth - cardRect.width - 10;
    }
    
    // 상단 경계
    if (top < 10) top = 10;
    
    // 하단 경계
    if (top + cardRect.height > viewportHeight - 10) {
      top = viewportHeight - cardRect.height - 10;
    }
    
    setCoords({ top, left });
  };
  
  // 열림 상태 변경 핸들러
  const handleOpenChange = (nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setIsOpen(nextOpen);
    }
    
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  };
  
  // 마우스 진입 핸들러
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    if (!isOpen) {
      openTimeoutRef.current = setTimeout(() => {
        handleOpenChange(true);
        // DOM이 업데이트된 후 위치 계산
        setTimeout(calculatePosition, 0);
      }, openDelay);
    }
  };
  
  // 마우스 이탈 핸들러
  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    
    closeTimeoutRef.current = setTimeout(() => {
      handleOpenChange(false);
    }, closeDelay);
  };
  
  // 카드 컨텐츠가 화면에 보일 때 위치 계산
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      // 리사이즈 시 위치 재계산
      const handleResize = () => calculatePosition();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);
  
  // 화살표 위치 및 스타일 계산
  const getArrowStyle = () => {
    const baseStyle: CSSProperties = {
      ...arrowStyle
    };
    
    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderRight: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderLeft: '1px solid #e2e8f0',
          borderTop: '1px solid #e2e8f0',
        };
      case 'left':
        return {
          ...baseStyle,
          right: '-8px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderRight: '1px solid #e2e8f0',
          borderTop: '1px solid #e2e8f0',
        };
      case 'right':
        return {
          ...baseStyle,
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderLeft: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        };
    }
  };
  
  return (
    <div 
      className={`hover-card-root ${className}`}
      style={style} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div ref={triggerRef} className="hover-card-trigger">
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={cardRef}
          className={`hover-card ${cardClassName} hover-card-${position}`}
          style={{
            ...cardStyle,
            width,
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showArrow && (
            <div 
              className={`hover-card-arrow ${arrowClassName}`} 
              style={getArrowStyle()}
            />
          )}
          <div className="hover-card-content">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverCard; 