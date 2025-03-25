import React, { CSSProperties, createContext, useContext } from 'react';
import './Progress.css';

type ProgressContextType = {
  value: number;
  max: number;
  percentage: number;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('Progress 컴포넌트는 Progress.Root 내부에서만 사용할 수 있습니다.');
  }
  return context;
}

export interface ProgressRootProps {
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
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 컴포넌트에 적용할 인라인 스타일
   */
  style?: CSSProperties;
  
  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

export interface ProgressIndicatorProps {
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
   * 진행 바 인디케이터에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 진행 바 배경에 적용할 추가 CSS 클래스
   */
  containerClassName?: string;
}

export interface ProgressLabelProps {
  /**
   * 레이블 내용
   */
  children: React.ReactNode;
  
  /**
   * 레이블에 적용할 추가 CSS 클래스
   */
  className?: string;
}

export interface ProgressValueProps {
  /**
   * 진행률 텍스트 형식
   * @default '{value}%'
   */
  format?: string;
  
  /**
   * 진행률 표시 텍스트에 적용할 추가 CSS 클래스
   */
  className?: string;
}

/**
 * Progress 루트 컴포넌트
 */
const Root: React.FC<ProgressRootProps> = ({
  value,
  max = 100,
  className = '',
  style,
  children,
}) => {
  // 진행률 계산 (0-100 사이의 값으로 제한)
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;
  
  return (
    <ProgressContext.Provider value={{ value: normalizedValue, max, percentage }}>
      <div 
        className={`progress ${className}`} 
        style={style}
      >
        {children}
      </div>
    </ProgressContext.Provider>
  );
};

/**
 * Progress 인디케이터 컴포넌트
 */
const Indicator: React.FC<ProgressIndicatorProps> = ({
  animated = false,
  size = 'md',
  color = 'primary',
  className = '',
  containerClassName = '',
}) => {
  const { value, max, percentage } = useProgressContext();
  
  return (
    <div className={`progress-container progress-${size} ${containerClassName}`}>
      <div
        className={`progress-indicator progress-${color} ${animated ? 'progress-animated' : ''} ${className}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
};

/**
 * Progress 레이블 컴포넌트
 */
const Label: React.FC<ProgressLabelProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`progress-label ${className}`}>
      {children}
    </div>
  );
};

/**
 * Progress 값 표시 컴포넌트
 */
const Value: React.FC<ProgressValueProps> = ({
  format = '{value}%',
  className = '',
}) => {
  const { percentage } = useProgressContext();
  
  // 진행률 텍스트 포맷팅
  const formattedValue = format.replace('{value}', Math.round(percentage).toString());
  
  return (
    <div className={`progress-indicator-value ${className}`}>
      {formattedValue}
    </div>
  );
};

export const Progress = {
  Root,
  Indicator,
  Label,
  Value
};

export default Progress; 