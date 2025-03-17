import React, { forwardRef, ReactNode } from 'react';
import './AspectRatio.css';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 가로 비율
   * @default 1
   */
  ratio?: number;

  /**
   * 세로 비율
   * @default 1
   */
  heightRatio?: number;

  /**
   * 컨테이너 내부에 표시될 컨텐츠
   */
  children: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 컨텐츠 영역에 적용할 추가 CSS 클래스
   */
  contentClassName?: string;
}

/**
 * AspectRatio 컴포넌트는 지정된 가로세로 비율을 유지하는 컨테이너를 제공합니다.
 * 이미지, 비디오, 지도 등 비율을 유지해야 하는 콘텐츠에 유용합니다.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(({
  ratio = 1,
  heightRatio = 1,
  children,
  className = '',
  contentClassName = '',
  style,
  ...props
}, ref) => {
  const aspectRatio = ratio / heightRatio;
  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      ref={ref}
      className={`aspect-ratio-container ${className}`}
      style={{
        ...style,
        paddingBottom,
      }}
      {...props}
    >
      <div className={`aspect-ratio-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
});

AspectRatio.displayName = 'AspectRatio';

export default AspectRatio; 