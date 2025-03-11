import React, { CSSProperties } from 'react';
import './Progress.css';

export interface ProgressProps {
  /**
   * 진행률 (0-100)
   */
  value: number;
  
  /**
   * 최대값
   * @default 100
   */
  max?: number;
  
  /**
   * 진행 바 위에 표시될 레이블
   */
  label?: string;
  
  /**
   * 진행률 텍스트 표시 여부
   * @default false
   */
  showValue?: boolean;
  
  /**
   * 진행률 텍스트 형식
   * @default '{value}%'
   */
  valueFormat?: string;
  
  /**
   * 애니메이션 효과 적용 여부
   * @default false
   */
  animated?: boolean;
  
  /**
   * 진행 바 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 진행 바 색상
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컴포넌트에 적용할 인라인 스타일
   */
  style?: CSSProperties;
  
  /**
   * 진행 바 배경에 적용할 추가 CSS 클래스
   */
  containerClassName?: string;
  
  /**
   * 진행 바 인디케이터에 적용할 추가 CSS 클래스
   */
  indicatorClassName?: string;
  
  /**
   * 진행률 표시 텍스트에 적용할 추가 CSS 클래스
   */
  valueClassName?: string;
  
  /**
   * 레이블에 적용할 추가 CSS 클래스
   */
  labelClassName?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  valueFormat = '{value}%',
  animated = false,
  size = 'md',
  color = 'primary',
  className = '',
  style,
  containerClassName = '',
  indicatorClassName = '',
  valueClassName = '',
  labelClassName = '',
}) => {
  // 진행률 계산 (0-100 사이의 값으로 제한)
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;
  
  // 진행률 텍스트 포맷팅
  const formattedValue = valueFormat.replace('{value}', Math.round(percentage).toString());
  
  return (
    <div className={`${className}`} style={style}>
      {label && (
        <div className={`progress-label ${labelClassName}`}>
          {label}
        </div>
      )}
      
      <div className={`progress-container progress-${size} ${containerClassName}`}>
        <div
          className={`progress-indicator progress-${color} ${animated ? 'progress-animated' : ''} ${indicatorClassName}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
      
      {showValue && (
        <div className={`progress-indicator-value ${valueClassName}`}>
          {formattedValue}
        </div>
      )}
    </div>
  );
};

export default Progress; 