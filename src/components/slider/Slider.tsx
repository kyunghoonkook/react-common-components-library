import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Slider.css';

interface ExtendedCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

export interface SliderProps {
  /**
   * 현재 슬라이더 값 (제어 컴포넌트로 사용 시)
   */
  value?: number;

  /**
   * 기본 슬라이더 값 (비제어 컴포넌트로 사용 시)
   * @default 0
   */
  defaultValue?: number;

  /**
   * 최솟값
   * @default 0
   */
  min?: number;

  /**
   * 최댓값
   * @default 100
   */
  max?: number;

  /**
   * 단계
   * @default 1
   */
  step?: number;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 슬라이더의 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * 슬라이더의 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 값 레이블 표시 여부
   * @default false
   */
  showValueLabel?: boolean;

  /**
   * 값 레이블 포맷 함수
   */
  formatLabel?: (value: number) => string;

  /**
   * 테마 모드
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * 슬라이더의 색상 변형
   * @default 'primary'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 인라인 스타일
   */
  style?: ExtendedCSSProperties;

  /**
   * 값 변경 시 호출될 함수
   */
  onChange?: (value: number) => void;

  /**
   * 슬라이더 조작이 완료되었을 때 호출될 함수
   */
  onChangeComplete?: (value: number) => void;

  /**
   * 슬라이더 트랙 클릭 가능 여부
   * @default true
   */
  trackClickable?: boolean;

  /**
   * 슬라이더 썸(핸들) 크기
   * @default 'md'
   */
  thumbSize?: 'sm' | 'md' | 'lg';

  /**
   * 슬라이더 이름 (form 제출용)
   */
  name?: string;

  /**
   * 슬라이더 ID
   */
  id?: string;
}

const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = 'horizontal',
  size = 'md',
  showValueLabel = false,
  formatLabel = (value) => `${value}`,
  theme = 'light',
  variant = 'primary',
  className = '',
  style,
  onChange,
  onChangeComplete,
  trackClickable = true,
  thumbSize = 'md',
  name,
  id,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value !== undefined ? value : defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : localValue;
  const internalId = useRef(`slider-${Math.random().toString(36).substring(2, 11)}`).current;
  
  // 시스템 테마 감지
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };
      
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [theme]);
  
  const actualTheme = theme === 'auto' ? systemTheme : theme;
  
  // 값 범위 내로 제한하는 함수
  const clamp = useCallback((value: number): number => {
    return Math.min(Math.max(value, min), max);
  }, [min, max]);
  
  // 단계별로 값 계산
  const calculateSteppedValue = useCallback((value: number): number => {
    const steppedValue = Math.round((value - min) / step) * step + min;
    return clamp(steppedValue);
  }, [min, step, clamp]);
  
  // 위치에서 값 계산
  const calculateValueFromPosition = useCallback((position: number, size: number): number => {
    const isVertical = orientation === 'vertical';
    const percentage = isVertical 
      ? (size - position) / size 
      : position / size;
    
    const rawValue = min + percentage * (max - min);
    return calculateSteppedValue(rawValue);
  }, [orientation, min, max, calculateSteppedValue]);
  
  // 값에서 백분율 계산
  const calculatePercentage = useCallback((): number => {
    return ((currentValue - min) / (max - min)) * 100;
  }, [currentValue, min, max]);
  
  // 위치 업데이트
  const updateValue = useCallback((clientX: number, clientY: number) => {
    if (disabled || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const isVertical = orientation === 'vertical';
    const position = isVertical 
      ? clientY - rect.top 
      : clientX - rect.left;
    const size = isVertical ? rect.height : rect.width;
    
    const newValue = calculateValueFromPosition(position, size);
    
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  }, [disabled, orientation, calculateValueFromPosition, isControlled, onChange]);
  
  // 드래그 시작
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    
    setIsDragging(true);
    setShowTooltip(true);
    
    if ('touches' in e) {
      updateValue(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      updateValue(e.clientX, e.clientY);
    }
    
    // 선택 방지
    e.preventDefault();
  }, [disabled, updateValue]);
  
  // 드래그 중
  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    if ('touches' in e) {
      updateValue(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      updateValue(e.clientX, e.clientY);
    }
    
    // 선택 방지
    e.preventDefault();
  }, [isDragging, updateValue]);
  
  // 드래그 종료
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setTimeout(() => setShowTooltip(false), 1000);
    
    if (onChangeComplete) {
      onChangeComplete(currentValue);
    }
  }, [isDragging, currentValue, onChangeComplete]);
  
  // 트랙 클릭
  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (disabled || !trackClickable) return;
    
    updateValue(e.clientX, e.clientY);
    
    if (onChangeComplete) {
      onChangeComplete(currentValue);
    }
  }, [disabled, trackClickable, updateValue, currentValue, onChangeComplete]);
  
  // 키보드 이벤트 처리
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    
    let newValue = currentValue;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = calculateSteppedValue(currentValue + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = calculateSteppedValue(currentValue - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    
    if (!isControlled) {
      setLocalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (onChangeComplete) {
      onChangeComplete(newValue);
    }
  }, [disabled, currentValue, step, calculateSteppedValue, min, max, isControlled, onChange, onChangeComplete]);
  
  // 마우스 이벤트
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDrag, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      document.addEventListener('touchcancel', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDrag);
        document.removeEventListener('touchend', handleDragEnd);
        document.removeEventListener('touchcancel', handleDragEnd);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);
  
  // 값 변경 시 외부 상태와 동기화
  useEffect(() => {
    if (isControlled) {
      setLocalValue(value);
    }
  }, [isControlled, value]);
  
  // CSS 변수 계산
  const getCssVariables = useCallback((): ExtendedCSSProperties => {
    return {
      '--slider-percentage': `${calculatePercentage()}%`,
    };
  }, [calculatePercentage]);
  
  const sliderClasses = [
    'slider',
    `slider-${orientation}`,
    `slider-size-${size}`,
    `slider-thumb-${thumbSize}`,
    `slider-${variant}`,
    actualTheme === 'dark' ? 'slider-dark' : '',
    disabled ? 'slider-disabled' : '',
    isDragging ? 'slider-dragging' : '',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={sliderClasses} 
      style={{...style, ...getCssVariables()}}
      ref={sliderRef}
      data-orientation={orientation}
      data-disabled={disabled}
    >
      {showValueLabel && (
        <div className="slider-value-label">
          {formatLabel(currentValue)}
        </div>
      )}
      
      <div 
        className="slider-track"
        onClick={handleTrackClick}
        ref={trackRef}
      >
        <div className="slider-track-fill" />
      </div>
      
      <div 
        className="slider-thumb-container"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        ref={thumbRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-orientation={orientation}
        aria-disabled={disabled}
        aria-label={`Slider value: ${currentValue}`}
        id={id || internalId}
        onKeyDown={handleKeyDown}
      >
        <div className="slider-thumb">
          {showTooltip && (
            <div className="slider-tooltip">
              {formatLabel(currentValue)}
            </div>
          )}
        </div>
      </div>
      
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={currentValue} 
        />
      )}
    </div>
  );
};

export default Slider; 