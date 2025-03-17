import React, { useState, useRef, useEffect, ReactNode, CSSProperties, useCallback, memo } from 'react';
import ReactDOM from 'react-dom';
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
   * @default true
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

  /**
   * Hover 카드의 ID (접근성 목적)
   */
  id?: string;

  /**
   * Hover 카드의 제목 (접근성 목적)
   */
  title?: string;

  /**
   * 포커스할 때 카드 열기 활성화
   * @default true
   */
  openOnFocus?: boolean;

  /**
   * 포커스를 잃었을 때 카드 닫기 활성화
   * @default true
   */
  closeOnBlur?: boolean;
}

const HoverCard = memo<HoverCardProps>(({
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
  inPortal = true,
  showArrow = true,
  arrowClassName = '',
  arrowStyle,
  id,
  title,
  openOnFocus = true,
  closeOnBlur = true,
}) => {
  const [isOpen, setIsOpen] = useState(controlledOpen || false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 카드 ID 생성
  const cardId = id || `hover-card-${Math.random().toString(36).substring(2, 9)}`;
  
  // 포털 컨테이너 설정
  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    setPortalContainer(container);
    
    return () => {
      document.body.removeChild(container);
    };
  }, []);
  
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
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    
    // 트리거 요소의 위치 정보
    const triggerRect = triggerRef.current.getBoundingClientRect();
    
    // 스토리북의 Iframe 요소를 찾기
    const iframes = document.querySelectorAll('iframe');
    let iframeOffset = { x: 0, y: 0 };
    
    // 페이지 내 모든 iframe을 검사하여 해당 컴포넌트가 iframe 내부에 있는지 확인
    iframes.forEach(iframe => {
      try {
        if (iframe.contentDocument?.body.contains(triggerRef.current)) {
          const iframeRect = iframe.getBoundingClientRect();
          iframeOffset = { x: iframeRect.left, y: iframeRect.top };
        }
      } catch (e) {
        // 보안 제한으로 접근할 수 없는 iframe은 무시
      }
    });
    
    // 스크롤 위치 고려
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 카드 요소의 크기 (없는 경우 기본값 사용)
    const cardWidth = parseInt(width, 10) || 250;
    const cardHeight = cardRef.current ? cardRef.current.getBoundingClientRect().height : 150;
    
    let top = 0;
    let left = 0;
    
    // 오프셋 값 (카드와 트리거 사이 거리)
    const offset = 3;
    
    switch (position) {
      case 'top':
        top = triggerRect.top + iframeOffset.y - cardHeight - offset;
        left = triggerRect.left + iframeOffset.x + (triggerRect.width / 2) - (cardWidth / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + iframeOffset.y + offset;
        left = triggerRect.left + iframeOffset.x + (triggerRect.width / 2) - (cardWidth / 2);
        break;
      case 'left':
        top = triggerRect.top + iframeOffset.y + (triggerRect.height / 2) - (cardHeight / 2);
        left = triggerRect.left + iframeOffset.x - cardWidth - offset;
        break;
      case 'right':
        top = triggerRect.top + iframeOffset.y + (triggerRect.height / 2) - (cardHeight / 2);
        left = triggerRect.right + iframeOffset.x + offset;
        break;
    }
    
    // 뷰포트 경계 확인 및 조정
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 왼쪽 경계
    if (left < 5) left = 5;
    
    // 오른쪽 경계
    if (left + cardWidth > viewportWidth - 5) {
      left = viewportWidth - cardWidth - 5;
    }
    
    // 상단 경계
    if (top < 5) top = 5;
    
    // 하단 경계
    if (top + cardHeight > viewportHeight - 5) {
      top = viewportHeight - cardHeight - 5;
    }
    
    // 최종 위치 설정 (스크롤 포함)
    setCoords({ top: top + scrollTop, left: left + scrollLeft });
  }, [position, width]);
  
  // 열림 상태 변경 핸들러
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setIsOpen(nextOpen);
    }
    
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  }, [controlledOpen, onOpenChange]);
  
  // 마우스 진입 핸들러
  const handleMouseEnter = useCallback(() => {
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
  }, [isOpen, openDelay, handleOpenChange, calculatePosition]);
  
  // 마우스 이탈 핸들러
  const handleMouseLeave = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    
    closeTimeoutRef.current = setTimeout(() => {
      handleOpenChange(false);
    }, closeDelay);
  }, [closeDelay, handleOpenChange]);

  // 포커스 핸들러
  const handleFocus = useCallback(() => {
    if (openOnFocus) {
      handleMouseEnter();
    }
  }, [openOnFocus, handleMouseEnter]);

  // 블러 핸들러
  const handleBlur = useCallback(() => {
    if (closeOnBlur) {
      handleMouseLeave();
    }
  }, [closeOnBlur, handleMouseLeave]);

  // 키 핸들러 (Escape로 닫기)
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      handleOpenChange(false);
    }
  }, [isOpen, handleOpenChange]);
  
  // 카드 컨텐츠가 화면에 보일 때 위치 계산
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      // 리사이즈 시 위치 재계산
      const handleResize = () => calculatePosition();
      window.addEventListener('resize', handleResize);
      
      // 스크롤 시 위치 재계산
      window.addEventListener('scroll', handleResize, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize, true);
      };
    }
  }, [isOpen, calculatePosition]);
  
  // 화살표 위치 및 스타일 계산
  const getArrowStyle = useCallback(() => {
    const baseStyle: CSSProperties = {
      ...arrowStyle
    };
    
    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderRight: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderLeft: '1px solid #e2e8f0',
          borderTop: '1px solid #e2e8f0',
        };
      case 'left':
        return {
          ...baseStyle,
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderRight: '1px solid #e2e8f0',
          borderTop: '1px solid #e2e8f0',
        };
      case 'right':
        return {
          ...baseStyle,
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderLeft: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        };
      default:
        return baseStyle;
    }
  }, [position, arrowStyle]);
  
  // 카드 렌더링
  const renderCard = () => {
    if (!isOpen) return null;
    
    const card = (
      <div
        id={cardId}
        ref={cardRef}
        className={`hover-card hover-card-${position} ${cardClassName}`}
        style={{
          ...cardStyle,
          position: inPortal ? 'fixed' : 'absolute',
          top: `${coords.top}px`,
          left: `${coords.left}px`,
          width,
          pointerEvents: 'auto',
        }}
        role="tooltip"
        aria-live="polite"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title && (
          <div className="hover-card-title">
            {title}
          </div>
        )}
        <div className="hover-card-content">
          {content}
        </div>
        
        {showArrow && (
          <div
            className={`hover-card-arrow ${arrowClassName}`}
            style={getArrowStyle()}
            aria-hidden="true"
          />
        )}
      </div>
    );
    
    // 포털 사용 여부에 따라 다르게 렌더링
    if (inPortal && portalContainer) {
      return ReactDOM.createPortal(card, portalContainer);
    }
    
    return card;
  };
  
  return (
    <div 
      className={`hover-card-root ${className}`} 
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="hover-card-trigger" 
        ref={triggerRef}
        aria-describedby={isOpen ? cardId : undefined}
        tabIndex={0}
      >
        {trigger}
      </div>
      
      {renderCard()}
    </div>
  );
});

HoverCard.displayName = 'HoverCard';

export default HoverCard; 