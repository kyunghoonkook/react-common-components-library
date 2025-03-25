import React, { useState, useEffect, useRef, createContext, useContext, forwardRef, useId } from 'react';
import './Tooltip.css';

// 툴팁 위치 타입
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

// 툴팁 크기 타입
export type TooltipSize = 'sm' | 'md' | 'lg';

// 툴팁 트리거 타입
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

// 툴팁 컨텍스트 타입
type TooltipContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: TooltipTrigger;
  placement: TooltipPlacement;
  size: TooltipSize;
  delayDuration: number;
  disableHoverableContent: boolean;
  id: string;
  registerArrow: (element: HTMLDivElement | null) => void;
  arrowElement: HTMLDivElement | null;
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLDivElement>;
};

// 컨텍스트 생성
const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

// 컨텍스트 사용을 위한 훅
const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip 컴포넌트는 Tooltip.Root 내부에서만 사용할 수 있습니다');
  }
  return context;
};

// 루트 Props
export interface TooltipRootProps {
  /**
   * 툴팁 표시 상태
   */
  open?: boolean;
  
  /**
   * 기본 표시 상태
   */
  defaultOpen?: boolean;
  
  /**
   * 툴팁 표시 상태 변경 콜백
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 툴팁 트리거 방식
   * @default 'hover'
   */
  trigger?: TooltipTrigger;
  
  /**
   * 툴팁 노출 지연 시간 (ms)
   * @default 700
   */
  delayDuration?: number;
  
  /**
   * 툴팁 표시 시간 (ms, 0이면 자동으로 닫히지 않음)
   * @default 0
   */
  showDuration?: number;
  
  /**
   * 툴팁 내용이 호버 가능한지 여부
   * @default false
   */
  disableHoverableContent?: boolean;
  
  /**
   * 자식 요소
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

// 트리거 Props
export interface TooltipTriggerProps {
  /**
   * 자식 요소
   */
  children: React.ReactNode;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * aria-label
   */
  'aria-label'?: string;
  
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 포인터 진입 이벤트 핸들러
   */
  onPointerEnter?: (e: React.PointerEvent<HTMLElement>) => void;
  
  /**
   * 포인터 이탈 이벤트 핸들러
   */
  onPointerLeave?: (e: React.PointerEvent<HTMLElement>) => void;
  
  /**
   * 포커스 이벤트 핸들러
   */
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  
  /**
   * 블러 이벤트 핸들러
   */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

// 컨텐츠 Props
export interface TooltipContentProps {
  /**
   * 툴팁 내용
   */
  children: React.ReactNode;
  
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
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 툴팁 내용 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * side offset
   */
  sideOffset?: number;
  
  /**
   * 마우스 진입 이벤트 핸들러
   */
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * 마우스 이탈 이벤트 핸들러
   */
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// 화살표 Props
export interface TooltipArrowProps {
  /**
   * 화살표 너비
   * @default 10
   */
  width?: number;
  
  /**
   * 화살표 높이
   * @default 5
   */
  height?: number;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 화살표 스타일
   */
  style?: React.CSSProperties;
}

// 루트 컴포넌트
const Root = forwardRef<HTMLDivElement, TooltipRootProps>(({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = 'hover',
  delayDuration = 700,
  showDuration = 0,
  disableHoverableContent = false,
  children,
  className
}, ref) => {
  // ID 생성
  const id = useId();
  const tooltipId = `tooltip-${id}`;
  
  // 내부 상태
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : isOpen;
  
  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  
  // 상태 변경 핸들러
  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setIsOpen(value);
    }
    
    onOpenChange?.(value);
  };
  
  // 타이머 정리
  const clearTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  };
  
  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return clearTimeouts;
  }, []);
  
  // showDuration이 설정된 경우 자동 닫기
  useEffect(() => {
    if (currentOpen && showDuration > 0) {
      clearTimeouts();
      
      showTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, showDuration);
    }
    
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [currentOpen, showDuration]);
  
  // 화살표 등록 함수
  const registerArrow = (element: HTMLDivElement | null) => {
    setArrowElement(element);
  };
  
  return (
    <TooltipContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        trigger,
        placement: 'top', // 기본값, 컨텐츠에서 오버라이드 가능
        size: 'md', // 기본값, 컨텐츠에서 오버라이드 가능
        delayDuration,
        disableHoverableContent,
        id: tooltipId,
        registerArrow,
        arrowElement,
        triggerRef,
        contentRef
      }}
    >
      <div ref={ref} className={`tooltip-provider ${className || ''}`}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
});

Root.displayName = 'Tooltip.Root';

// 트리거 컴포넌트
const Trigger = forwardRef<HTMLElement, TooltipTriggerProps>(({
  children,
  className = '',
  'aria-label': ariaLabel,
  disabled = false,
  ...props
}, forwardedRef) => {
  const {
    open,
    setOpen,
    trigger,
    id,
    delayDuration,
    triggerRef
  } = useTooltip();
  
  // ref 병합
  const handleRef = (element: HTMLElement | null) => {
    // 내부 ref 설정
    if (triggerRef) {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = element;
    }
    
    // 외부 ref 설정
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else if (forwardedRef) {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = element;
    }
  };
  
  // 이벤트 핸들러
  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;
    
    props.onPointerEnter && props.onPointerEnter(e);
    
    if (trigger === 'hover' || trigger === 'manual') {
      clearTimeout((triggerRef.current as any)?.timeoutId);
      
      (triggerRef.current as any).timeoutId = setTimeout(() => {
        setOpen(true);
      }, delayDuration);
    }
  };
  
  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;
    
    props.onPointerLeave && props.onPointerLeave(e);
    
    if (trigger === 'hover') {
      clearTimeout((triggerRef.current as any)?.timeoutId);
      
      (triggerRef.current as any).timeoutId = setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (disabled) return;
    
    props.onFocus && props.onFocus(e);
    
    if (trigger === 'focus' || trigger === 'hover') {
      setOpen(true);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (disabled) return;
    
    props.onBlur && props.onBlur(e);
    
    if (trigger === 'focus') {
      setOpen(false);
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    
    props.onClick && props.onClick(e);
    
    if (trigger === 'click') {
      setOpen(!open);
    }
  };
  
  // 트리거 요소 복제
  const triggerElement = React.Children.only(children) as React.ReactElement;
  
  return React.cloneElement(triggerElement, {
    ref: handleRef,
    'aria-describedby': open ? id : undefined,
    'data-state': open ? 'open' : 'closed',
    'data-disabled': disabled ? '' : undefined,
    className: `tooltip-trigger ${className} ${triggerElement.props.className || ''}`,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick,
    ...props
  });
});

Trigger.displayName = 'Tooltip.Trigger';

// 툴팁 내용 위치 계산 함수
const calculatePosition = (
  triggerEl: HTMLElement | null,
  contentEl: HTMLElement | null,
  arrowEl: HTMLElement | null,
  placement: TooltipPlacement,
  sideOffset: number = 5
) => {
  if (!triggerEl || !contentEl) {
    return {
      contentStyle: {},
      arrowStyle: {},
      placement
    };
  }
  
  const triggerRect = triggerEl.getBoundingClientRect();
  const contentRect = contentEl.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const arrowSize = arrowEl ? arrowEl.offsetHeight : 0;
  const halfArrowWidth = arrowEl ? arrowEl.offsetWidth / 2 : 0;
  
  let finalPlacement = placement;
  let left = 0;
  let top = 0;
  let arrowLeft = 0;
  let arrowTop = 0;
  
  // 간격 계산
  const gap = arrowSize + sideOffset;
  
  // 가로 중앙 정렬
  const centeredLeft = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
  
  // 세로 중앙 정렬
  const centeredTop = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
  
  // 기본 위치 계산
  switch (placement) {
    case 'top':
      left = centeredLeft;
      top = triggerRect.top - contentRect.height - gap + window.scrollY;
      break;
      
    case 'bottom':
      left = centeredLeft;
      top = triggerRect.bottom + gap + window.scrollY;
      break;
      
    case 'left':
      left = triggerRect.left - contentRect.width - gap + window.scrollX;
      top = centeredTop;
      break;
      
    case 'right':
      left = triggerRect.right + gap + window.scrollX;
      top = centeredTop;
      break;
  }
  
  // 화면 경계 확인 및 자동 플립
  if (placement === 'top' && top < 0) {
    top = triggerRect.bottom + gap + window.scrollY;
    finalPlacement = 'bottom';
  } else if (placement === 'bottom' && top + contentRect.height > windowHeight) {
    top = triggerRect.top - contentRect.height - gap + window.scrollY;
    finalPlacement = 'top';
  } else if (placement === 'left' && left < 0) {
    left = triggerRect.right + gap + window.scrollX;
    finalPlacement = 'right';
  } else if (placement === 'right' && left + contentRect.width > windowWidth) {
    left = triggerRect.left - contentRect.width - gap + window.scrollX;
    finalPlacement = 'left';
  }
  
  // 수평 오버플로 방지
  left = Math.max(10, Math.min(left, windowWidth - contentRect.width - 10));
  
  // 화살표 위치 계산
  if (arrowEl) {
    switch (finalPlacement) {
      case 'top':
      case 'bottom':
        arrowLeft = triggerRect.left + triggerRect.width / 2 - left - halfArrowWidth;
        arrowTop = finalPlacement === 'top' ? contentRect.height - 1 : -arrowSize + 1;
        break;
        
      case 'left':
      case 'right':
        arrowLeft = finalPlacement === 'left' ? contentRect.width - 1 : -arrowSize + 1;
        arrowTop = triggerRect.top + triggerRect.height / 2 - top - halfArrowWidth;
        break;
    }
  }
  
  return {
    contentStyle: {
      left: `${left}px`,
      top: `${top}px`
    },
    arrowStyle: {
      left: arrowLeft ? `${arrowLeft}px` : undefined,
      top: arrowTop ? `${arrowTop}px` : undefined
    },
    placement: finalPlacement
  };
};

// 컨텐츠 컴포넌트
const Content = forwardRef<HTMLDivElement, TooltipContentProps>(({
  children,
  placement: propPlacement = 'top',
  size: propSize = 'md',
  className = '',
  style,
  sideOffset = 5,
  ...props
}, forwardedRef) => {
  const {
    open,
    setOpen,
    trigger,
    disableHoverableContent,
    id,
    registerArrow,
    arrowElement,
    triggerRef,
    contentRef
  } = useTooltip();
  
  // Local state to track position
  const [position, setPosition] = useState({
    contentStyle: {},
    arrowStyle: {},
    placement: propPlacement
  });
  
  // ref 병합
  const handleRef = (element: HTMLDivElement | null) => {
    // 내부 ref 설정
    if (contentRef) {
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
    
    // 외부 ref 설정
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else if (forwardedRef) {
      (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
    
    // 위치 계산 및 업데이트
    if (element && triggerRef.current) {
      const newPosition = calculatePosition(
        triggerRef.current,
        element,
        arrowElement,
        propPlacement,
        sideOffset
      );
      setPosition(newPosition);
    }
  };
  
  // 위치 업데이트
  useEffect(() => {
    if (open && contentRef.current && triggerRef.current) {
      const updatePosition = () => {
        const newPosition = calculatePosition(
          triggerRef.current,
          contentRef.current,
          arrowElement,
          propPlacement,
          sideOffset
        );
        setPosition(newPosition);
      };
      
      updatePosition();
      
      // 창 크기 조정 시 위치 업데이트
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [open, propPlacement, arrowElement, sideOffset]);
  
  // 마우스 호버 유지 관련 핸들러
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onMouseEnter && props.onMouseEnter(e);
    
    if (!disableHoverableContent && trigger === 'hover') {
      clearTimeout((triggerRef.current as any)?.timeoutId);
    }
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onMouseLeave && props.onMouseLeave(e);
    
    if (trigger === 'hover') {
      setOpen(false);
    }
  };
  
  if (!open) {
    return null;
  }
  
  // 병합된 스타일 및 클래스
  const mergedStyle = {
    ...style,
    ...position.contentStyle
  };
  
  return (
    <div
      ref={handleRef}
      role="tooltip"
      id={id}
      className={`tooltip-content tooltip-${propSize} ${className}`}
      style={mergedStyle}
      data-state={open ? 'open' : 'closed'}
      data-placement={position.placement}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});

Content.displayName = 'Tooltip.Content';

// 화살표 컴포넌트
const Arrow = forwardRef<HTMLDivElement, TooltipArrowProps>(({
  width = 10,
  height = 5,
  className = '',
  style,
  ...props
}, ref) => {
  const { registerArrow, open, arrowElement } = useTooltip();
  
  // 내부 ref 핸들러
  const handleRef = (element: HTMLDivElement | null) => {
    // 외부 ref 설정
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
    
    // 컨텍스트에 등록
    registerArrow(element);
  };
  
  if (!open) {
    return null;
  }
  
  return (
    <div
      ref={handleRef}
      className={`tooltip-arrow ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...(arrowElement ? {} : { position: 'absolute' }),
        ...(style || {})
      }}
      {...props}
    />
  );
});

Arrow.displayName = 'Tooltip.Arrow';

// 컴파운드 컴포넌트 익스포트
export const TooltipComponent = {
  Root,
  Trigger,
  Content,
  Arrow
};

// 주요 컴포넌트 export
export { TooltipComponent as Tooltip };

// 기본 Props 인터페이스 (기존 API와 호환성 유지)
export interface TooltipProps {
  /**
   * 툴팁 내용
   */
  content: React.ReactNode;
  
  /**
   * 트리거 요소
   */
  children: React.ReactNode;
  
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
   * 툴팁 표시 상태
   */
  open?: boolean;
  
  /**
   * 툴팁 표시 상태 변경 콜백
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 툴팁 트리거 방식
   * @default 'hover'
   */
  trigger?: TooltipTrigger;
  
  /**
   * 툴팁 노출 지연 시간 (ms)
   * @default 700
   */
  delayDuration?: number;
  
  /**
   * 툴팁 표시 시간 (ms, 0이면 자동으로 닫히지 않음)
   * @default 0
   */
  showDuration?: number;
  
  /**
   * 화살표 표시 여부
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * 화살표 너비
   * @default 10
   */
  arrowWidth?: number;
  
  /**
   * 화살표 높이
   * @default 5
   */
  arrowHeight?: number;
  
  /**
   * 툴팁 내용이 호버 가능한지 여부
   * @default false
   */
  disableHoverableContent?: boolean;
  
  /**
   * 컨테이너 CSS 클래스
   */
  className?: string;
  
  /**
   * 트리거 CSS 클래스
   */
  triggerClassName?: string;
  
  /**
   * 컨텐츠 CSS 클래스
   */
  contentClassName?: string;
  
  /**
   * 화살표 CSS 클래스
   */
  arrowClassName?: string;
  
  /**
   * 트리거 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 내용 스타일
   */
  contentStyle?: React.CSSProperties;
  
  /**
   * side offset
   */
  sideOffset?: number;
  
  /**
   * 테마 모드
   */
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Tooltip 컴포넌트
 *
 * 사용자가 요소에 마우스를 올리거나 포커스할 때 추가 정보를 표시하는 컴포넌트입니다.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  children,
  placement = 'top',
  size = 'md',
  open,
  onOpenChange,
  trigger = 'hover',
  delayDuration = 700,
  showDuration = 0,
  showArrow = true,
  arrowWidth = 10,
  arrowHeight = 5,
  disableHoverableContent = false,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  arrowClassName = '',
  disabled = false,
  contentStyle,
  sideOffset = 5,
  theme = 'light',
  ...props
}, ref) => {
  // 테마 클래스 계산
  const themeClass = theme === 'auto'
    ? `tooltip-theme-${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}`
    : `tooltip-theme-${theme}`;
  
  return (
    <Root
      ref={ref}
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      delayDuration={delayDuration}
      showDuration={showDuration}
      disableHoverableContent={disableHoverableContent}
      className={`${className} ${themeClass}`}
      {...props}
    >
      <Trigger 
        className={triggerClassName}
        disabled={disabled}
      >
        {children}
      </Trigger>
      
      <Content
        placement={placement}
        size={size}
        className={contentClassName}
        style={contentStyle}
        sideOffset={sideOffset}
      >
        {content}
        {showArrow && (
          <Arrow 
            width={arrowWidth} 
            height={arrowHeight}
            className={arrowClassName}
          />
        )}
      </Content>
    </Root>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip; 