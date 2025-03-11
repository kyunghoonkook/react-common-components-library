import React, { useRef, useState, useEffect, CSSProperties as ReactCSSProperties, ReactNode, forwardRef, useImperativeHandle } from 'react';
import './ScrollArea.css';

// CSSProperties를 확장하여 CSS 변수를 허용합니다
interface ExtendedCSSProperties extends ReactCSSProperties {
  [key: `--${string}`]: string | number;
}

export interface ScrollAreaProps {
  /**
   * 스크롤 영역 내부에 들어갈 컨텐츠
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
   * 루트 요소에 적용할 CSS 클래스
   */
  className?: string;
  
  /**
   * 뷰포트(스크롤 영역)에 적용할 CSS 클래스
   */
  viewportClassName?: string;
  
  /**
   * 루트 요소에 적용할 인라인 스타일
   */
  style?: ExtendedCSSProperties;
  
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
   * 애니메이션 비활성화 여부
   * @default false
   */
  disableAnimation?: boolean;

  /**
   * 사용자 스크롤 비활성화 여부
   * @default false
   */
  disableUserScroll?: boolean;

  /**
   * 그림자 비활성화 여부
   * @default false
   */
  disableShadow?: boolean;

  /**
   * 프로그래매틱 스크롤 애니메이션 시간 (ms)
   * @default 300
   */
  scrollAnimationDuration?: number;

  /**
   * 테마 모드
   * @default 'auto'
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * 스크롤 이벤트 핸들러
   */
  onScroll?: (position: { scrollTop: number; scrollLeft: number; }) => void;

  /**
   * 스크롤 완료 이벤트 핸들러
   */
  onScrollEnd?: (position: { scrollTop: number; scrollLeft: number; }) => void;
}

export interface ScrollAreaRef {
  /**
   * 컨텐츠를 특정 위치로 스크롤
   */
  scrollTo: (options: ScrollToOptions) => void;
  
  /**
   * 특정 위치로 부드럽게 스크롤
   */
  scrollIntoView: (element: HTMLElement, options?: ScrollIntoViewOptions) => void;
  
  /**
   * 맨 위로 스크롤
   */
  scrollToTop: (options?: { behavior?: ScrollBehavior }) => void;
  
  /**
   * 맨 아래로 스크롤
   */
  scrollToBottom: (options?: { behavior?: ScrollBehavior }) => void;
  
  /**
   * 맨 왼쪽으로 스크롤
   */
  scrollToLeft: (options?: { behavior?: ScrollBehavior }) => void;
  
  /**
   * 맨 오른쪽으로 스크롤
   */
  scrollToRight: (options?: { behavior?: ScrollBehavior }) => void;

  /**
   * 뷰포트 요소 참조
   */
  viewportElement: HTMLDivElement | null;
}

const ScrollArea = forwardRef<ScrollAreaRef, ScrollAreaProps>(
  (
    {
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
      style,
      viewportStyle,
      scrollbarClassName = '',
      trackClassName = '',
      thumbClassName = '',
      scrollbarPosition = 'inside',
      scrollbarSize = 6,
      scrollbarRadius = 9999,
      trackColor,
      thumbColor,
      thumbHoverColor,
      thumbDragColor,
      borderColor,
      shadowColor,
      backgroundColor,
      textColor,
      disableAnimation = false,
      disableUserScroll = false,
      disableShadow = false,
      scrollAnimationDuration = 300,
      theme = 'auto',
      onScroll,
      onScrollEnd,
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const verticalScrollbarRef = useRef<HTMLDivElement>(null);
    const horizontalScrollbarRef = useRef<HTMLDivElement>(null);
    const verticalThumbRef = useRef<HTMLDivElement>(null);
    const horizontalThumbRef = useRef<HTMLDivElement>(null);
    
    const [showVerticalScrollbar, setShowVerticalScrollbar] = useState(!autoHide);
    const [showHorizontalScrollbar, setShowHorizontalScrollbar] = useState(!autoHide);
    const [isDraggingVertical, setIsDraggingVertical] = useState(false);
    const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startTop, setStartTop] = useState(0);
    const [startLeft, setStartLeft] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [scrollTimer, setScrollTimer] = useState<NodeJS.Timeout | null>(null);
    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(theme === 'auto' ? 'light' : theme);

    // 스크롤 관련 함수들을 외부로 노출
    useImperativeHandle(ref, () => ({
      scrollTo: (options: ScrollToOptions) => {
        if (contentRef.current) {
          if (disableAnimation) {
            contentRef.current.scrollTo(options);
          } else {
            contentRef.current.scrollTo({
              behavior: 'smooth',
              ...options,
            });
          }
        }
      },
      scrollIntoView: (element: HTMLElement, options?: ScrollIntoViewOptions) => {
        if (element) {
          element.scrollIntoView({
            behavior: disableAnimation ? 'auto' : 'smooth',
            block: 'nearest',
            inline: 'nearest',
            ...options,
          });
        }
      },
      scrollToTop: (options) => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: 0,
            behavior: options?.behavior || (disableAnimation ? 'auto' : 'smooth'),
          });
        }
      },
      scrollToBottom: (options) => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: options?.behavior || (disableAnimation ? 'auto' : 'smooth'),
          });
        }
      },
      scrollToLeft: (options) => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            left: 0,
            behavior: options?.behavior || (disableAnimation ? 'auto' : 'smooth'),
          });
        }
      },
      scrollToRight: (options) => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            left: contentRef.current.scrollWidth,
            behavior: options?.behavior || (disableAnimation ? 'auto' : 'smooth'),
          });
        }
      },
      viewportElement: contentRef.current,
    }));

    // 테마 감지
    useEffect(() => {
      if (theme !== 'auto') {
        setEffectiveTheme(theme);
        return;
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      };

      // 초기값 설정
      setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light');

      // 변경 이벤트 구독
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }, [theme]);
    
    // 스크롤바 크기와 위치 계산
    const updateThumbPosition = () => {
      if (!contentRef.current) return;
      
      const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = contentRef.current;
      
      if (verticalThumbRef.current && (orientation === 'vertical' || orientation === 'both')) {
        const trackHeight = clientHeight - 8; // 상하 패딩 고려
        const thumbHeight = Math.max(20, (clientHeight / scrollHeight) * trackHeight);
        const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - thumbHeight) + 4; // 상단 패딩 고려
        
        verticalThumbRef.current.style.height = `${thumbHeight}px`;
        verticalThumbRef.current.style.top = `${thumbTop}px`;
      }
      
      if (horizontalThumbRef.current && (orientation === 'horizontal' || orientation === 'both')) {
        const trackWidth = clientWidth - 8; // 좌우 패딩 고려
        const thumbWidth = Math.max(20, (clientWidth / scrollWidth) * trackWidth);
        const thumbLeft = (scrollLeft / (scrollWidth - clientWidth)) * (trackWidth - thumbWidth) + 4; // 좌측 패딩 고려
        
        horizontalThumbRef.current.style.width = `${thumbWidth}px`;
        horizontalThumbRef.current.style.left = `${thumbLeft}px`;
      }

      // 스크롤 이벤트 콜백
      if (onScroll && !disableUserScroll) {
        onScroll({ scrollTop, scrollLeft });
      }

      if (isScrolling) {
        // 이미 스크롤 중이면 타이머 초기화
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }

        // 새 타이머 설정
        const newTimer = setTimeout(() => {
          setIsScrolling(false);
          if (onScrollEnd && hasScrolled) {
            onScrollEnd({ scrollTop, scrollLeft });
            setHasScrolled(false);
          }
        }, 150); // 스크롤 종료 감지 지연
        
        setScrollTimer(newTimer);
      } else {
        setIsScrolling(true);
        setHasScrolled(true);
      }
    };
    
    // 스크롤바 표시 여부 업데이트
    const updateScrollbarVisibility = () => {
      if (!contentRef.current) return;
      
      const { clientHeight, clientWidth, scrollHeight, scrollWidth } = contentRef.current;
      
      if (orientation === 'vertical' || orientation === 'both') {
        setShowVerticalScrollbar(scrollHeight > clientHeight);
      }
      
      if (orientation === 'horizontal' || orientation === 'both') {
        setShowHorizontalScrollbar(scrollWidth > clientWidth);
      }
    };
    
    // 리사이즈 이벤트 핸들러
    useEffect(() => {
      const handleResize = () => {
        updateThumbPosition();
        updateScrollbarVisibility();
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    // 스크롤 이벤트 핸들러
    useEffect(() => {
      if (disableUserScroll) return;

      const handleScroll = () => {
        updateThumbPosition();
        
        if (autoHide) {
          setShowVerticalScrollbar(true);
          setShowHorizontalScrollbar(true);
          
          clearTimeout(rootRef.current?.dataset.scrollTimer as any);
          rootRef.current!.dataset.scrollTimer = setTimeout(() => {
            if (!isDraggingVertical && !isDraggingHorizontal) {
              setShowVerticalScrollbar(false);
              setShowHorizontalScrollbar(false);
            }
          }, hideDelay) as any;
        }
      };
      
      contentRef.current?.addEventListener('scroll', handleScroll);
      
      return () => {
        contentRef.current?.removeEventListener('scroll', handleScroll);
      };
    }, [autoHide, hideDelay, isDraggingVertical, isDraggingHorizontal, disableUserScroll]);
    
    // 세로 스크롤바 드래그 이벤트 핸들러
    const handleVerticalDragStart = (e: React.MouseEvent) => {
      if (disableUserScroll) return;
      
      setIsDraggingVertical(true);
      setStartY(e.clientY);
      if (verticalThumbRef.current) {
        setStartTop(parseFloat(verticalThumbRef.current.style.top || '0'));
      }
      
      document.addEventListener('mousemove', handleVerticalDragMove);
      document.addEventListener('mouseup', handleVerticalDragEnd);
      e.preventDefault();
    };
    
    const handleVerticalDragMove = (e: MouseEvent) => {
      if (!isDraggingVertical || !contentRef.current || !verticalThumbRef.current) return;
      
      const deltaY = e.clientY - startY;
      const { clientHeight, scrollHeight } = contentRef.current;
      
      const trackHeight = clientHeight - 8; // 상하 패딩 고려
      const thumbHeight = parseFloat(getComputedStyle(verticalThumbRef.current).height);
      const maxThumbTop = trackHeight - thumbHeight + 4; // 상단 패딩 고려
      
      const newThumbTop = Math.max(4, Math.min(startTop + deltaY, maxThumbTop));
      const scrollRatio = (scrollHeight - clientHeight) / (trackHeight - thumbHeight);
      const scrollTop = (newThumbTop - 4) * scrollRatio;
      
      contentRef.current.scrollTop = scrollTop;
    };
    
    const handleVerticalDragEnd = () => {
      setIsDraggingVertical(false);
      document.removeEventListener('mousemove', handleVerticalDragMove);
      document.removeEventListener('mouseup', handleVerticalDragEnd);
      
      if (autoHide) {
        setTimeout(() => {
          if (!isDraggingHorizontal) {
            setShowVerticalScrollbar(false);
            setShowHorizontalScrollbar(false);
          }
        }, hideDelay);
      }
    };
    
    // 가로 스크롤바 드래그 이벤트 핸들러
    const handleHorizontalDragStart = (e: React.MouseEvent) => {
      if (disableUserScroll) return;
      
      setIsDraggingHorizontal(true);
      setStartX(e.clientX);
      if (horizontalThumbRef.current) {
        setStartLeft(parseFloat(horizontalThumbRef.current.style.left || '0'));
      }
      
      document.addEventListener('mousemove', handleHorizontalDragMove);
      document.addEventListener('mouseup', handleHorizontalDragEnd);
      e.preventDefault();
    };
    
    const handleHorizontalDragMove = (e: MouseEvent) => {
      if (!isDraggingHorizontal || !contentRef.current || !horizontalThumbRef.current) return;
      
      const deltaX = e.clientX - startX;
      const { clientWidth, scrollWidth } = contentRef.current;
      
      const trackWidth = clientWidth - 8; // 좌우 패딩 고려
      const thumbWidth = parseFloat(getComputedStyle(horizontalThumbRef.current).width);
      const maxThumbLeft = trackWidth - thumbWidth + 4; // 좌측 패딩 고려
      
      const newThumbLeft = Math.max(4, Math.min(startLeft + deltaX, maxThumbLeft));
      const scrollRatio = (scrollWidth - clientWidth) / (trackWidth - thumbWidth);
      const scrollLeft = (newThumbLeft - 4) * scrollRatio;
      
      contentRef.current.scrollLeft = scrollLeft;
    };
    
    const handleHorizontalDragEnd = () => {
      setIsDraggingHorizontal(false);
      document.removeEventListener('mousemove', handleHorizontalDragMove);
      document.removeEventListener('mouseup', handleHorizontalDragEnd);
      
      if (autoHide) {
        setTimeout(() => {
          if (!isDraggingVertical) {
            setShowVerticalScrollbar(false);
            setShowHorizontalScrollbar(false);
          }
        }, hideDelay);
      }
    };
    
    // 스크롤 트랙 클릭 이벤트 핸들러
    const handleVerticalTrackClick = (e: React.MouseEvent) => {
      if (disableUserScroll || !contentRef.current || !verticalThumbRef.current || !verticalScrollbarRef.current) return;
      
      // 썸을 클릭한 경우 무시
      if (e.target === verticalThumbRef.current) return;
      
      const { clientHeight, scrollHeight } = contentRef.current;
      const { top } = verticalScrollbarRef.current.getBoundingClientRect();
      const thumbHeight = parseFloat(getComputedStyle(verticalThumbRef.current).height);
      const clickPosition = e.clientY - top;
      const trackHeight = clientHeight - 8; // 상하 패딩 고려
      
      // 썸의 절반 높이만큼 오프셋을 주어 클릭한 위치가 썸의 중앙에 오도록 함
      const offset = thumbHeight / 2;
      const clickRatio = (clickPosition - offset) / (trackHeight - thumbHeight);
      const scrollTop = clickRatio * (scrollHeight - clientHeight);
      
      if (disableAnimation) {
        contentRef.current.scrollTop = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
      } else {
        contentRef.current.scrollTo({
          top: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
          behavior: 'smooth',
        });
      }
    };
    
    const handleHorizontalTrackClick = (e: React.MouseEvent) => {
      if (disableUserScroll || !contentRef.current || !horizontalThumbRef.current || !horizontalScrollbarRef.current) return;
      
      // 썸을 클릭한 경우 무시
      if (e.target === horizontalThumbRef.current) return;
      
      const { clientWidth, scrollWidth } = contentRef.current;
      const { left } = horizontalScrollbarRef.current.getBoundingClientRect();
      const thumbWidth = parseFloat(getComputedStyle(horizontalThumbRef.current).width);
      const clickPosition = e.clientX - left;
      const trackWidth = clientWidth - 8; // 좌우 패딩 고려
      
      // 썸의 절반 너비만큼 오프셋을 주어 클릭한 위치가 썸의 중앙에 오도록 함
      const offset = thumbWidth / 2;
      const clickRatio = (clickPosition - offset) / (trackWidth - thumbWidth);
      const scrollLeft = clickRatio * (scrollWidth - clientWidth);
      
      if (disableAnimation) {
        contentRef.current.scrollLeft = Math.max(0, Math.min(scrollLeft, scrollWidth - clientWidth));
      } else {
        contentRef.current.scrollTo({
          left: Math.max(0, Math.min(scrollLeft, scrollWidth - clientWidth)),
          behavior: 'smooth',
        });
      }
    };
    
    // 마우스 호버 이벤트 핸들러
    const handleMouseEnter = () => {
      if (autoHide) {
        setShowVerticalScrollbar(true);
        setShowHorizontalScrollbar(true);
      }
    };
    
    const handleMouseLeave = () => {
      if (autoHide && !isDraggingVertical && !isDraggingHorizontal) {
        setShowVerticalScrollbar(false);
        setShowHorizontalScrollbar(false);
      }
    };
    
    // 동적 스타일 생성
    const getScrollbarInlineStyles = (): ExtendedCSSProperties => {
      const styles: ExtendedCSSProperties = {};
      
      if (trackColor) {
        styles['--track-color'] = trackColor;
      }
      
      if (thumbColor) {
        styles['--thumb-color'] = thumbColor;
      }
      
      if (thumbHoverColor) {
        styles['--thumb-hover-color'] = thumbHoverColor;
      }
      
      if (thumbDragColor) {
        styles['--thumb-drag-color'] = thumbDragColor;
      }
      
      if (scrollbarSize) {
        styles['--scrollbar-size'] = `${scrollbarSize}px`;
      }
      
      if (scrollbarRadius) {
        styles['--scrollbar-radius'] = `${scrollbarRadius}px`;
      }
      
      if (borderColor) {
        styles['--border-color'] = borderColor;
      }
      
      if (shadowColor) {
        styles['--shadow-color'] = shadowColor;
      }
      
      return styles;
    };
    
    // 컴포넌트 스타일
    const rootStyle: ExtendedCSSProperties = {
      width: width,
      height: height,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      ...(backgroundColor ? { backgroundColor } : {}),
      ...(textColor ? { color: textColor } : {}),
      ...(disableShadow ? { boxShadow: 'none' } : {}),
      ...(style as ExtendedCSSProperties),
    };
    
    const showVertical = (orientation === 'vertical' || orientation === 'both') && showVerticalScrollbar;
    const showHorizontal = (orientation === 'horizontal' || orientation === 'both') && showHorizontalScrollbar;
    
    const setRootRef = (node: HTMLDivElement | null) => {
      rootRef.current = node;
    };
    
    return (
      <div
        ref={setRootRef}
        className={`scroll-area ${className} ${scrollbarPosition === 'outside' ? 'scroll-area--outside' : ''} ${disableAnimation ? 'scroll-area--no-animation' : ''} theme-${effectiveTheme}`}
        style={{ ...rootStyle, ...getScrollbarInlineStyles() }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-theme={effectiveTheme}
      >
        <div
          ref={contentRef}
          className={`scroll-area-viewport ${viewportClassName} ${disableUserScroll ? 'scroll-area-viewport--no-user-scroll' : ''}`}
          style={viewportStyle}
        >
          {children}
        </div>
        
        {showVertical && (
          <div
            ref={verticalScrollbarRef}
            className={`scroll-area-scrollbar ${scrollbarClassName}`}
            data-orientation="vertical"
            data-state={isDraggingVertical ? 'dragging' : (showVerticalScrollbar ? 'visible' : 'hidden')}
            onClick={handleVerticalTrackClick}
          >
            <div className={`scroll-area-track ${trackClassName}`}>
              <div
                ref={verticalThumbRef}
                className={`scroll-area-thumb ${thumbClassName}`}
                onMouseDown={handleVerticalDragStart}
              />
            </div>
          </div>
        )}
        
        {showHorizontal && (
          <div
            ref={horizontalScrollbarRef}
            className={`scroll-area-scrollbar ${scrollbarClassName}`}
            data-orientation="horizontal"
            data-state={isDraggingHorizontal ? 'dragging' : (showHorizontalScrollbar ? 'visible' : 'hidden')}
            onClick={handleHorizontalTrackClick}
          >
            <div className={`scroll-area-track ${trackClassName}`}>
              <div
                ref={horizontalThumbRef}
                className={`scroll-area-thumb ${thumbClassName}`}
                onMouseDown={handleHorizontalDragStart}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea; 