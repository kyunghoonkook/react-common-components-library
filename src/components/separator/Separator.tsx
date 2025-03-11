import React, { forwardRef, useEffect, useState, CSSProperties } from 'react';
import './Separator.css';

// CSS 변수를 위한 확장 타입 정의
interface ExtendedCSSProperties extends CSSProperties {
  [key: `--${string}`]: string | number;
}

export interface SeparatorProps {
  /**
   * 구분선 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * 데코레이티브 여부 (더 두껍게 표시)
   * @default false
   */
  decorative?: boolean;
  
  /**
   * 구분선 색상 변형
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  
  /**
   * 점선 스타일 사용 여부
   * @default false
   */
  dashed?: boolean;
  
  /**
   * 테마 모드
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'auto';
  
  /**
   * 구분선 위아래(또는 좌우) 간격 추가 여부
   * @default false
   */
  withSpacing?: boolean;
  
  /**
   * 간격 크기 (px)
   * @default 16
   */
  spacing?: number;
  
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컴포넌트에 적용할 인라인 스타일
   */
  style?: ExtendedCSSProperties;
  
  /**
   * ARIA 레이블 (접근성)
   */
  'aria-label'?: string;
  
  /**
   * ARIA 레이블 ID (접근성)
   */
  'aria-labelledby'?: string;
}

/**
 * Separator 컴포넌트
 * 
 * 콘텐츠 영역을 시각적으로 구분하는 수평 또는 수직 구분선을 제공합니다.
 */
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({
  orientation = 'horizontal',
  decorative = false,
  variant = 'default',
  dashed = false,
  theme = 'light',
  withSpacing = false,
  spacing,
  className = '',
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}, ref) => {
  const [activeTheme, setActiveTheme] = useState(theme);
  
  // 테마 감지
  useEffect(() => {
    if (theme !== 'auto') {
      setActiveTheme(theme);
      return;
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setActiveTheme(e.matches ? 'dark' : 'light');
    };
    
    setActiveTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // CSS 클래스 구성
  const classes = [
    'separator',
    `separator-${orientation}`,
    decorative ? 'separator-decorative' : '',
    variant !== 'default' ? `separator-${variant}` : '',
    dashed ? 'separator-dashed' : '',
    activeTheme === 'dark' ? 'dark' : '',
    withSpacing ? 'separator-with-spacing' : '',
    className
  ].filter(Boolean).join(' ');
  
  // 인라인 스타일 구성
  const separatorStyle: ExtendedCSSProperties = {
    ...style,
  };
  
  // 사용자 정의 간격이 있는 경우 CSS 변수 설정
  if (spacing !== undefined) {
    separatorStyle['--separator-spacing'] = `${spacing}px`;
    separatorStyle['--separator-spacing-mobile'] = `${Math.max(8, spacing * 0.75)}px`;
  }
  
  // 접근성 속성 설정
  const accessibilityProps = decorative
    ? {
        role: 'none',
        'aria-hidden': true as const,
      }
    : {
        role: 'separator',
        'aria-orientation': orientation as 'horizontal' | 'vertical',
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
      };
  
  return (
    <div
      ref={ref}
      className={classes}
      style={separatorStyle}
      {...accessibilityProps}
      {...props}
    />
  );
});

Separator.displayName = 'Separator';

export default Separator; 