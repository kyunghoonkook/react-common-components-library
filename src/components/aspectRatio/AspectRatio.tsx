import React, { ReactNode } from 'react';
import './AspectRatio.css';

export interface AspectRatioProps {
  /**
   * 가로 비율
   */
  ratio: number;
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
}

/**
 * AspectRatio 컴포넌트는 지정된 가로세로 비율을 유지하는 컨테이너를 제공합니다.
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  heightRatio = 1,
  children,
  className = '',
}) => {
  const aspectRatio = ratio / heightRatio;

  return (
    <div 
      className={`aspect-ratio-container ${className}`}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <div className="aspect-ratio-content">
        {children}
      </div>
    </div>
  );
};

export default AspectRatio; 