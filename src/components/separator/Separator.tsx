import React, { forwardRef, HTMLAttributes } from 'react';
import './Separator.css';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 구분선 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * 데코레이션 여부
   * @default false
   */
  decorative?: boolean;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 구분선 타입
   * @default 'solid'
   */
  type?: 'solid' | 'dashed' | 'dotted';
  
  /**
   * 구분선 두께
   * @default 'regular'
   */
  weight?: 'thin' | 'regular' | 'bold';
  
  /**
   * 구분선 색상
   * @default 'neutral'
   */
  color?: 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

/**
 * Separator 컴포넌트는 컨텐츠 그룹 사이의 구분선을 제공합니다.
 */
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({
  orientation = 'horizontal',
  decorative = false,
  className = '',
  type = 'solid',
  weight = 'regular',
  color = 'neutral',
  ...props
}, ref) => {
  // 접근성 속성 설정
  const ariaProps = decorative
    ? { 'aria-hidden': true, role: 'none' }
    : { role: 'separator', 'aria-orientation': orientation };
  
  return (
    <div
      ref={ref}
      className={`separator separator-${orientation} separator-${type} separator-${weight} separator-${color} ${className}`}
      data-orientation={orientation}
      {...ariaProps}
      {...props}
    />
  );
});

Separator.displayName = 'Separator';

export default Separator; 