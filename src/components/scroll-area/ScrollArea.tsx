import React, { 
  useRef, 
  useState, 
  useEffect, 
  CSSProperties as ReactCSSProperties, 
  ReactNode, 
  forwardRef, 
  useImperativeHandle,
  createContext,
  useContext
} from 'react';
import './ScrollArea.css';

// CSSProperties를 확장하여 CSS 변수를 허용합니다
interface ExtendedCSSProperties extends ReactCSSProperties {
  [key: `--${string}`]: string | number;
}

// Context 타입 정의
type ScrollAreaContextType = {
  orientation: 'vertical' | 'horizontal' | 'both';
  autoHide: boolean;
  scrollbarPosition: 'inside' | 'outside';
  scrollbarSize: number;
  scrollbarRadius: number;
  hideDelay: number;
  isVerticalScrollVisible: boolean;
  isHorizontalScrollVisible: boolean;
  isScrollbarDragging: boolean;
  setIsScrollbarDragging: (dragging: boolean) => void;
  setViewportElement: (element: HTMLDivElement | null) => void;
  getViewportElement: () => HTMLDivElement | null;
  disableUserScroll?: boolean;
};

// Context 생성
const ScrollAreaContext = createContext<ScrollAreaContextType | undefined>(undefined);

// Context Hook
const useScrollArea = () => {
  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error('ScrollArea 컴포넌트는 ScrollArea.Root 내부에서만 사용할 수 있습니다');
  }
  return context;
};

export interface ScrollAreaRootProps {
  /**
   * 자식 요소
   */
  children: ReactNode;
  
  /**
   * 스크롤 방향
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal' | 'both';
  
  /**
   * 스크롤바 자동 숨김 여부
   * @default true
   */
  autoHide?: boolean;

  /**
   * 자동 숨김 지연 시간 (ms)
   * @default 1000
   */
  hideDelay?: number;
  
  /**
   * 스크롤바 위치
   * @default 'inside'
   */
  scrollbarPosition?: 'inside' | 'outside';

  /**
   * 스크롤바 두께 (px)
   * @default 6
   */
  scrollbarSize?: number;

  /**
   * 스크롤바 가장자리 둥글기
   * @default 9999
   */
  scrollbarRadius?: number;
  
  /**
   * 루트 요소에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 루트 요소에 적용할 인라인 스타일
   */
  style?: ExtendedCSSProperties;
  
  /**
   * 애니메이션 비활성화 여부
   * @default false
   */
  disableAnimation?: boolean;

  /**
   * 스크롤 이벤트 핸들러
   */
  onScroll?: (position: { scrollTop: number; scrollLeft: number; }) => void;

  /**
   * 스크롤 완료 이벤트 핸들러
   */
  onScrollEnd?: (position: { scrollTop: number; scrollLeft: number; }) => void;
  
  /**
   * 사용자 스크롤 비활성화 여부
   * @default false
   */
  disableUserScroll?: boolean;
}

export interface ScrollAreaViewportProps {
  /**
   * 자식 요소
   */
  children: ReactNode;
  
  /**
   * 스크롤 영역 너비
   */
  width?: string | number;
  
  /**
   * 스크롤 영역 높이
   */
  height?: string | number;
  
  /**
   * 스크롤 영역 최대 너비
   */
  maxWidth?: string | number;
  
  /**
   * 스크롤 영역 최대 높이
   */
  maxHeight?: string | number;
  
  /**
   * 뷰포트에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 뷰포트에 적용할 인라인 스타일
   */
  style?: ReactCSSProperties;
}

export interface ScrollAreaScrollbarProps {
  /**
   * 스크롤바 방향
   */
  orientation: 'vertical' | 'horizontal';
  
  /**
   * 스크롤바에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 스크롤바 트랙에 적용할 CSS 클래스
   */
  trackClassName?: string;
  
  /**
   * 스크롤바 썸(핸들)에 적용할 CSS 클래스
   */
  thumbClassName?: string;
  
  /**
   * 스크롤바 트랙 색상
   * @default 'transparent'
   */
  trackColor?: string;

  /**
   * 스크롤바 썸 색상
   * @default 'rgba(0, 0, 0, 0.15)'
   */
  thumbColor?: string;

  /**
   * 스크롤바 호버 시 썸 색상
   * @default 'rgba(0, 0, 0, 0.25)'
   */
  thumbHoverColor?: string;

  /**
   * 스크롤바 드래그 시 썸 색상
   * @default 'rgba(0, 0, 0, 0.35)'
   */
  thumbDragColor?: string;
}

export interface ScrollAreaCornerProps {
  /**
   * 코너에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 코너 배경 색상
   */
  backgroundColor?: string;
}

export interface ScrollAreaRef {
  /**
   * 컨텐츠를 특정 위치로 스크롤
   */
  scrollTo: (options: ScrollToOptions) => void;
  
  /**
   * 뷰포트 요소에 직접 접근
   */
  viewport: HTMLDivElement | null;
}

// Root 컴포넌트
const Root = forwardRef<ScrollAreaRef, ScrollAreaRootProps>(({
  children,
  orientation = 'vertical',
  autoHide = true,
  hideDelay = 1000,
  scrollbarPosition = 'inside',
  scrollbarSize = 6,
  scrollbarRadius = 9999,
  className = '',
  style,
  disableAnimation = false,
  onScroll,
  onScrollEnd,
  disableUserScroll = false,
}, ref) => {
  // 일반 참조로 생성 (읽기 전용이므로 직접 업데이트 불가)
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevScrollTop = useRef<number>(0);
  const prevScrollLeft = useRef<number>(0);
  const [isVerticalScrollVisible, setIsVerticalScrollVisible] = useState(false);
  const [isHorizontalScrollVisible, setIsHorizontalScrollVisible] = useState(false);
  const [isScrollbarDragging, setIsScrollbarDragging] = useState(false);
  
  // 내부적으로만 사용할 viewport 요소 설정 함수
  // 안전한 타입 캐스팅 (의도적으로 읽기 전용 속성에 쓰기 위함)
  const setViewportElement = (element: HTMLDivElement | null) => {
    (viewportRef as any).current = element;
  };
  
  // viewport 요소 반환 함수
  const getViewportElement = () => viewportRef.current;
  
  // 외부에서 사용할 메서드 제공
  useImperativeHandle(ref, () => ({
    scrollTo: (options: ScrollToOptions) => {
      if (viewportRef.current) {
        viewportRef.current.scrollTo(options);
      }
    },
    viewport: viewportRef.current
  }));
  
  // 스크롤 가능 여부 체크 및 스크롤바 표시
  const checkScrollability = () => {
    if (viewportRef.current) {
      const viewport = viewportRef.current;
      const hasVerticalScroll = viewport.scrollHeight > viewport.clientHeight;
      const hasHorizontalScroll = viewport.scrollWidth > viewport.clientWidth;
      
      setIsVerticalScrollVisible(hasVerticalScroll && (orientation === 'vertical' || orientation === 'both'));
      setIsHorizontalScrollVisible(hasHorizontalScroll && (orientation === 'horizontal' || orientation === 'both'));
    }
  };
  
  // 초기 및 리사이즈시 스크롤 가능 여부 체크
  useEffect(() => {
    checkScrollability();
    
    const handleResize = () => {
      checkScrollability();
    };
    
    window.addEventListener('resize', handleResize);
    
    // MutationObserver를 이용해 내용 변화 감지
    if (viewportRef.current) {
      const observer = new MutationObserver(checkScrollability);
      observer.observe(viewportRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true
      });
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [orientation]);
  
  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (!viewportRef.current) return;
    
    const { scrollTop, scrollLeft } = viewportRef.current;
    
    // 스크롤 이벤트 콜백
    if (onScroll) {
      onScroll({ scrollTop, scrollLeft });
    }
    
    // 스크롤 완료 감지를 위한 타임아웃 설정
    if (onScrollEnd) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        if (
          prevScrollTop.current === scrollTop && 
          prevScrollLeft.current === scrollLeft
        ) {
          onScrollEnd({ scrollTop, scrollLeft });
        }
      }, 100);
      
      prevScrollTop.current = scrollTop;
      prevScrollLeft.current = scrollLeft;
    }
  };
  
  // 컴포넌트 unmount시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // 루트 클래스 생성
  const rootClasses = [
    'scroll-area-root',
    disableAnimation ? 'scroll-area-no-animation' : '',
    scrollbarPosition === 'outside' ? 'scroll-area-scrollbar-outside' : '',
    className
  ].filter(Boolean).join(' ');
  
  // CSS 변수 스타일 생성
  const cssVars: ExtendedCSSProperties = {
    '--scrollbar-size': `${scrollbarSize}px`,
    '--scrollbar-radius': `${scrollbarRadius}px`,
    '--scrollbar-hide-delay': `${hideDelay}ms`,
    ...(style || {})
  };
  
  // 컨텍스트 값
  const contextValue: ScrollAreaContextType = {
    orientation,
    autoHide,
    scrollbarPosition,
    scrollbarSize,
    scrollbarRadius,
    hideDelay,
    isVerticalScrollVisible,
    isHorizontalScrollVisible,
    isScrollbarDragging,
    setIsScrollbarDragging,
    setViewportElement,
    getViewportElement,
    disableUserScroll
  };
  
  return (
    <ScrollAreaContext.Provider value={contextValue}>
      <div 
        className={rootClasses} 
        style={cssVars}
        data-orientation={orientation}
        data-state={isScrollbarDragging ? 'scrolling' : 'idle'}
      >
        {children}
      </div>
    </ScrollAreaContext.Provider>
  );
});

Root.displayName = 'ScrollArea.Root';

// Viewport 컴포넌트
const Viewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(({
  children,
  width,
  height,
  maxWidth,
  maxHeight,
  className = '',
  style,
}, ref) => {
  const { setViewportElement, disableUserScroll } = useScrollArea();
  
  // ref 결합
  const handleRefCallback = (el: HTMLDivElement | null) => {
    setViewportElement(el);
    
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };
  
  const viewportStyle: ReactCSSProperties = {
    width,
    height,
    maxWidth,
    maxHeight,
    ...(style || {})
  };
  
  return (
    <div
      ref={handleRefCallback}
      className={`scroll-area-viewport ${className}`}
      style={viewportStyle}
      data-user-select={disableUserScroll ? 'none' : undefined}
      tabIndex={0}
    >
      <div className="scroll-area-content">
        {children}
      </div>
    </div>
  );
});

Viewport.displayName = 'ScrollArea.Viewport';

// Scrollbar 컴포넌트
const Scrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(({
  orientation,
  className = '',
  trackClassName = '',
  thumbClassName = '',
  trackColor = 'transparent',
  thumbColor = 'rgba(0, 0, 0, 0.15)',
  thumbHoverColor = 'rgba(0, 0, 0, 0.25)',
  thumbDragColor = 'rgba(0, 0, 0, 0.35)',
}, ref) => {
  const { 
    autoHide, 
    scrollbarPosition, 
    scrollbarSize,
    hideDelay,
    isVerticalScrollVisible, 
    isHorizontalScrollVisible,
    isScrollbarDragging,
    setIsScrollbarDragging,
    getViewportElement
  } = useScrollArea();
  
  // 내부용 스크롤바 ref 추가
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const initialClientPositionRef = useRef<number>(0);
  const initialScrollPositionRef = useRef<number>(0);
  
  // ref 합치기
  const handleScrollbarRef = (el: HTMLDivElement | null) => {
    // 내부 ref 설정
    if (el) {
      (scrollbarRef as any).current = el;
    }
    
    // 외부 ref 전달
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };
  
  const [thumbSize, setThumbSize] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [isThumbHovered, setIsThumbHovered] = useState(false);
  const [isVisibleState, setIsVisibleState] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 스크롤바 표시 여부 확인
  const isVisible = orientation === 'vertical' 
    ? isVerticalScrollVisible 
    : isHorizontalScrollVisible;
  
  // 스크롤바 업데이트 (크기 및 위치)
  const updateScrollbar = () => {
    const viewport = getViewportElement();
    if (!viewport || !thumbRef.current) return;
    
    if (orientation === 'vertical') {
      const viewportHeight = viewport.clientHeight;
      const contentHeight = viewport.scrollHeight;
      const thumbHeight = Math.max((viewportHeight / contentHeight) * viewportHeight, 40);
      const scrollPosition = viewport.scrollTop;
      const maxScrollTop = contentHeight - viewportHeight;
      const thumbOffset = maxScrollTop === 0 ? 0 : (scrollPosition / maxScrollTop) * (viewportHeight - thumbHeight);
      
      setThumbSize(thumbHeight);
      setThumbPosition(thumbOffset);
    } else {
      const viewportWidth = viewport.clientWidth;
      const contentWidth = viewport.scrollWidth;
      const thumbWidth = Math.max((viewportWidth / contentWidth) * viewportWidth, 40);
      const scrollPosition = viewport.scrollLeft;
      const maxScrollLeft = contentWidth - viewportWidth;
      const thumbOffset = maxScrollLeft === 0 ? 0 : (scrollPosition / maxScrollLeft) * (viewportWidth - thumbWidth);
      
      setThumbSize(thumbWidth);
      setThumbPosition(thumbOffset);
    }
  };
  
  // 스크롤 이벤트 처리
  useEffect(() => {
    const viewport = getViewportElement();
    if (!viewport) return;
    
    const handleScroll = () => {
      updateScrollbar();
      
      if (autoHide) {
        setIsVisibleState(true);
        
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        
        hideTimeoutRef.current = setTimeout(() => {
          if (!isThumbHovered && !isScrollbarDragging) {
            setIsVisibleState(false);
          }
        }, hideDelay);
      }
    };
    
    viewport.addEventListener('scroll', handleScroll);
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [autoHide, hideDelay, isThumbHovered, isScrollbarDragging]);
  
  // 초기 및 크기 변화 시 스크롤바 업데이트
  useEffect(() => {
    updateScrollbar();
    
    const handleResize = () => {
      updateScrollbar();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [orientation, isVerticalScrollVisible, isHorizontalScrollVisible]);
  
  // 드래그 시작 핸들러
  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 이미 클릭 중이면 무시
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const thumbEl = e.currentTarget;
    thumbEl.setPointerCapture(e.pointerId);
    
    const viewport = getViewportElement();
    if (!viewport) return;
    
    setIsScrollbarDragging(true);
    
    // 초기 위치 저장
    const initialMousePosition = orientation === 'vertical' ? e.clientY : e.clientX;
    const initialThumbPosition = thumbPosition;
    
    // 문서 이벤트 핸들러 정의
    const handleDocumentPointerMove = (e: PointerEvent) => {
      const currentMousePosition = orientation === 'vertical' ? e.clientY : e.clientX;
      const delta = currentMousePosition - initialMousePosition;
      
      // 내부 ref 사용 (타입 안전)
      const scrollbar = scrollbarRef.current;
      if (!scrollbar) return;
      
      const scrollbarRect = scrollbar.getBoundingClientRect();
      const scrollbarSize = orientation === 'vertical' ? scrollbarRect.height : scrollbarRect.width;
      const contentSize = orientation === 'vertical' ? viewport.scrollHeight : viewport.scrollWidth;
      const viewportSize = orientation === 'vertical' ? viewport.clientHeight : viewport.clientWidth;
      
      const scrollbarRatio = viewportSize / contentSize;
      const maxScrollDistance = contentSize - viewportSize;
      const maxThumbPosition = scrollbarSize - thumbSize;
      
      const newThumbPosition = Math.max(0, Math.min(initialThumbPosition + delta, maxThumbPosition));
      setThumbPosition(newThumbPosition);
      
      // 스크롤 위치 계산
      const scrollRatio = newThumbPosition / maxThumbPosition;
      const newScrollPosition = scrollRatio * maxScrollDistance;
      
      if (orientation === 'vertical') {
        viewport.scrollTop = newScrollPosition;
      } else {
        viewport.scrollLeft = newScrollPosition;
      }
    };
    
    // 문서 이벤트 핸들러 정의
    const handleDocumentPointerUp = (e: PointerEvent) => {
      thumbEl.releasePointerCapture(e.pointerId);
      setIsScrollbarDragging(false);
      
      document.removeEventListener('pointermove', handleDocumentPointerMove);
      document.removeEventListener('pointerup', handleDocumentPointerUp);
      
      if (autoHide && !isThumbHovered) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisibleState(false);
        }, hideDelay);
      }
    };
    
    // 문서 이벤트 리스너 등록
    document.addEventListener('pointermove', handleDocumentPointerMove);
    document.addEventListener('pointerup', handleDocumentPointerUp);
  };
  
  // 클린업
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);
  
  if (!isVisibleState) return null;
  
  // 스크롤바 스타일 설정
  const getScrollbarStyle = (): ReactCSSProperties => {
    const style = {
      '--track-color': trackColor,
      '--thumb-color': thumbColor,
      '--thumb-hover-color': thumbHoverColor,
      '--thumb-drag-color': thumbDragColor,
    } as ReactCSSProperties;
    
    if (orientation === 'vertical') {
      style.height = '100%';
      style.top = '0';
      style.right = scrollbarPosition === 'outside' ? `-${scrollbarSize}px` : '0';
    } else {
      style.width = '100%';
      style.left = '0';
      style.bottom = scrollbarPosition === 'outside' ? `-${scrollbarSize}px` : '0';
    }
    
    return style;
  };
  
  // 썸 스타일 설정
  const getThumbStyle = (): ReactCSSProperties => {
    return orientation === 'vertical'
      ? { height: `${thumbSize}px`, transform: `translateY(${thumbPosition}px)` }
      : { width: `${thumbSize}px`, transform: `translateX(${thumbPosition}px)` };
  };
  
  return (
    <div
      ref={handleScrollbarRef}
      className={`scroll-area-scrollbar scroll-area-scrollbar-${orientation} ${className} ${isVisible || isScrollbarDragging ? 'visible' : ''}`}
      style={getScrollbarStyle()}
      onMouseEnter={() => {
        setIsThumbHovered(true);
        setIsVisibleState(true);
      }}
      onMouseLeave={() => {
        setIsThumbHovered(false);
        if (autoHide && !isScrollbarDragging) {
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
          hideTimeoutRef.current = setTimeout(() => {
            setIsVisibleState(false);
          }, hideDelay);
        }
      }}
      data-orientation={orientation}
      data-state={isScrollbarDragging ? 'dragging' : isThumbHovered ? 'hover' : 'idle'}
    >
      <div className={`scroll-area-track ${trackClassName}`}>
        <div
          ref={thumbRef}
          className={`scroll-area-thumb ${thumbClassName}`}
          style={getThumbStyle()}
          onPointerDown={handleThumbPointerDown}
        />
      </div>
    </div>
  );
});

Scrollbar.displayName = 'ScrollArea.Scrollbar';

// Corner 컴포넌트
const Corner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>(({
  className = '',
  backgroundColor = '#f1f1f1',
}, ref) => {
  const { isVerticalScrollVisible, isHorizontalScrollVisible, scrollbarSize } = useScrollArea();
  
  // 두 스크롤바가 모두 필요할 때만 코너 표시
  if (!isVerticalScrollVisible || !isHorizontalScrollVisible) {
    return null;
  }
  
  return (
    <div
      ref={ref}
      className={`scroll-area-corner ${className}`}
      style={{
        width: scrollbarSize,
        height: scrollbarSize,
        backgroundColor
      }}
    />
  );
});

Corner.displayName = 'ScrollArea.Corner';

export interface ScrollAreaProps extends ScrollAreaRootProps {
  /**
   * 스크롤 영역 너비
   */
  width?: string | number;
  
  /**
   * 스크롤 영역 높이
   */
  height?: string | number;
  
  /**
   * 스크롤 영역 최대 너비
   */
  maxWidth?: string | number;
  
  /**
   * 스크롤 영역 최대 높이
   */
  maxHeight?: string | number;
  
  /**
   * 뷰포트(스크롤 영역)에 적용할 CSS 클래스
   */
  viewportClassName?: string;
  
  /**
   * 뷰포트에 적용할 인라인 스타일
   */
  viewportStyle?: ReactCSSProperties;
  
  /**
   * 스크롤바에 적용할 CSS 클래스
   */
  scrollbarClassName?: string;
  
  /**
   * 스크롤바 트랙에 적용할 CSS 클래스
   */
  trackClassName?: string;
  
  /**
   * 스크롤바 썸(핸들)에 적용할 CSS 클래스
   */
  thumbClassName?: string;
  
  /**
   * 스크롤바 트랙 색상
   * @default 'transparent'
   */
  trackColor?: string;

  /**
   * 스크롤바 썸 색상
   * @default 'rgba(0, 0, 0, 0.15)'
   */
  thumbColor?: string;

  /**
   * 스크롤바 호버 시 썸 색상
   * @default 'rgba(0, 0, 0, 0.25)'
   */
  thumbHoverColor?: string;

  /**
   * 스크롤바 드래그 시 썸 색상
   * @default 'rgba(0, 0, 0, 0.35)'
   */
  thumbDragColor?: string;

  /**
   * 보더 색상
   * @default 'rgba(229, 231, 235, 1)'
   */
  borderColor?: string;

  /**
   * 그림자 색상
   * @default 'rgba(0, 0, 0, 0.05)'
   */
  shadowColor?: string;

  /**
   * 배경 색상
   * @default '#ffffff'
   */
  backgroundColor?: string;

  /**
   * 텍스트 색상
   * @default 'inherit'
   */
  textColor?: string;

  /**
   * 그림자 비활성화 여부
   * @default false
   */
  disableShadow?: boolean;
}

// 기존 호환성을 위한 통합 컴포넌트
const ScrollArea = forwardRef<ScrollAreaRef, ScrollAreaProps>(({
  children,
  orientation = 'vertical',
  autoHide = true,
  hideDelay = 1000,
  width,
  height,
  maxWidth,
  maxHeight,
  className = '',
  viewportClassName = '',
  scrollbarClassName = '',
  trackClassName = '',
  thumbClassName = '',
  style,
  viewportStyle,
  scrollbarPosition = 'inside',
  scrollbarSize = 6,
  scrollbarRadius = 9999,
  trackColor = 'transparent',
  thumbColor = 'rgba(0, 0, 0, 0.15)',
  thumbHoverColor = 'rgba(0, 0, 0, 0.25)',
  thumbDragColor = 'rgba(0, 0, 0, 0.35)',
  borderColor,
  shadowColor,
  backgroundColor,
  textColor,
  disableAnimation = false,
  disableUserScroll = false,
  disableShadow = false,
  onScroll,
  onScrollEnd,
}, ref) => {
  // 루트 스타일 확장
  const rootStyle: ExtendedCSSProperties = {
    ...(style || {}),
  };
  
  // 추가 스타일 변수 설정
  if (borderColor) rootStyle['--scroll-border-color'] = borderColor;
  if (shadowColor) rootStyle['--scroll-shadow-color'] = shadowColor;
  if (backgroundColor) rootStyle['--scroll-background-color'] = backgroundColor;
  if (textColor) rootStyle['--scroll-text-color'] = textColor;
  
  // 뷰포트 스타일 확장
  const extendedViewportStyle: ReactCSSProperties = {
    ...(viewportStyle || {})
  };
  
  // 그림자 비활성화 클래스
  const shadowClass = disableShadow ? 'scroll-area-no-shadow' : '';
  
  return (
    <Root
      ref={ref}
      orientation={orientation}
      autoHide={autoHide}
      hideDelay={hideDelay}
      scrollbarPosition={scrollbarPosition}
      scrollbarSize={scrollbarSize}
      scrollbarRadius={scrollbarRadius}
      className={`${className} ${shadowClass}`}
      style={rootStyle}
      disableAnimation={disableAnimation}
      disableUserScroll={disableUserScroll}
      onScroll={onScroll}
      onScrollEnd={onScrollEnd}
    >
      <Viewport
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        className={viewportClassName}
        style={extendedViewportStyle}
      >
        {children}
      </Viewport>
      
      {orientation === 'vertical' || orientation === 'both' ? (
        <Scrollbar
          orientation="vertical"
          className={scrollbarClassName}
          trackClassName={trackClassName}
          thumbClassName={thumbClassName}
          trackColor={trackColor}
          thumbColor={thumbColor}
          thumbHoverColor={thumbHoverColor}
          thumbDragColor={thumbDragColor}
        />
      ) : null}
      
      {orientation === 'horizontal' || orientation === 'both' ? (
        <Scrollbar
          orientation="horizontal"
          className={scrollbarClassName}
          trackClassName={trackClassName}
          thumbClassName={thumbClassName}
          trackColor={trackColor}
          thumbColor={thumbColor}
          thumbHoverColor={thumbHoverColor}
          thumbDragColor={thumbDragColor}
        />
      ) : null}
      
      <Corner backgroundColor={backgroundColor || '#f1f1f1'} />
    </Root>
  );
});

ScrollArea.displayName = 'ScrollArea';

export const ScrollAreaComponent = {
  Root,
  Viewport,
  Scrollbar,
  Corner
};

export default ScrollArea; 