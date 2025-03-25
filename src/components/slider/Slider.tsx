import React, { createContext, useContext, useState, useRef, useEffect, forwardRef, useId, useCallback } from 'react';
import './Slider.css';

// Context 타입
type SliderContextType = {
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  orientation: 'horizontal' | 'vertical';
  values: number[];
  id: string;
  onValueChange?: (values: number[]) => void;
  onValueCommit?: (values: number[]) => void;
};

// Context 생성
const SliderContext = createContext<SliderContextType | undefined>(undefined);

const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('Slider 컴포넌트는 Slider.Root 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

// 슬라이더 방향 타입
export type SliderOrientation = 'horizontal' | 'vertical';

// 슬라이더 크기 타입
export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderRootProps {
  /**
   * 슬라이더의 현재 값(들)
   */
  value?: number | number[];
  
  /**
   * 슬라이더의 초기 값(들)
   */
  defaultValue?: number | number[];
  
  /**
   * 값이 변경될 때 호출되는 콜백
   */
  onValueChange?: (value: number | number[]) => void;
  
  /**
   * 사용자가 상호작용을 완료했을 때 호출되는 콜백
   */
  onValueCommit?: (value: number | number[]) => void;
  
  /**
   * 슬라이더의 최소값
   * @default 0
   */
  min?: number;
  
  /**
   * 슬라이더의 최대값
   * @default 100
   */
  max?: number;
  
  /**
   * 슬라이더의 단계 값
   * @default 1
   */
  step?: number;
  
  /**
   * 슬라이더의 방향
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;
  
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 크기
   * @default 'md'
   */
  size?: SliderSize;
  
  /**
   * 사용자 정의 클래스
   */
  className?: string;
  
  /**
   * 자식 요소
   */
  children?: React.ReactNode;
  
  /**
   * 컴포넌트 ID
   */
  id?: string;
}

export interface SliderTrackProps {
  /**
   * 사용자 정의 클래스
   */
  className?: string;
  
  /**
   * 자식 요소
   */
  children?: React.ReactNode;
}

export interface SliderRangeProps {
  /**
   * 사용자 정의 클래스
   */
  className?: string;
}

export interface SliderThumbProps {
  /**
   * 썸네일 인덱스 (다중 슬라이더의 경우)
   * @default 0
   */
  index?: number;
  
  /**
   * 사용자 정의 클래스
   */
  className?: string;
  
  /**
   * ARIA 레이블
   */
  'aria-label'?: string;
}

const getValueFromPosition = (
  position: number,
  trackRect: DOMRect,
  min: number,
  max: number,
  step: number,
  orientation: SliderOrientation
): number => {
  const trackLength = orientation === 'horizontal' ? trackRect.width : trackRect.height;
  const trackStart = orientation === 'horizontal' ? trackRect.left : trackRect.bottom;
  
  let positionInTrack = orientation === 'horizontal' 
    ? position - trackStart
    : trackStart - position;
  
  // 범위를 0-1 사이로 클램핑
  let percent = Math.max(0, Math.min(1, positionInTrack / trackLength));
  
  // min-max 범위로 변환
  let rawValue = min + percent * (max - min);
  
  // step에 맞춰 조정
  const steppedValue = Math.round(rawValue / step) * step;
  
  // 최종 값을 min-max 범위 내로 제한
  return Math.max(min, Math.min(max, steppedValue));
};

const Root = forwardRef<HTMLDivElement, SliderRootProps>(({
  value,
  defaultValue = 0,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  disabled = false,
  size = 'md',
  className = '',
  children,
  id: propId,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = propId || `slider-${generatedId}`;
  
  // 단일 값 또는 배열 값 처리
  const initialValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  const [values, setValues] = useState<number[]>(
    value !== undefined 
      ? (Array.isArray(value) ? value : [value]) 
      : initialValue
  );
  
  // 제어/비제어 모드 처리
  useEffect(() => {
    if (value !== undefined) {
      setValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);
  
  // 값 업데이트 함수
  const updateValues = useCallback((newValues: number[], commit = false) => {
    if (value === undefined) {
      setValues(newValues);
    }
    
    // 콜백 호출
    if (onValueChange) {
      onValueChange(newValues.length === 1 ? newValues[0] : newValues);
    }
    
    if (commit && onValueCommit) {
      onValueCommit(newValues.length === 1 ? newValues[0] : newValues);
    }
  }, [value, onValueChange, onValueCommit]);
  
  return (
    <SliderContext.Provider
      value={{
        min,
        max,
        step,
        disabled,
        orientation,
        values,
        id,
        onValueChange: (newValues) => updateValues(newValues),
        onValueCommit: (newValues) => updateValues(newValues, true)
      }}
    >
      <div
        ref={ref}
        id={id}
        className={`slider slider-${size} slider-${orientation} ${disabled ? 'slider-disabled' : ''} ${className}`}
        role="group"
        aria-disabled={disabled}
        data-disabled={disabled ? '' : undefined}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
});

Root.displayName = 'Slider.Root';

const Track = forwardRef<HTMLDivElement, SliderTrackProps>(({
  className = '',
  children,
  ...props
}, ref) => {
  const { orientation } = useSliderContext();
  
  return (
    <div
      ref={ref}
      className={`slider-track ${className}`}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
});

Track.displayName = 'Slider.Track';

const Range = forwardRef<HTMLDivElement, SliderRangeProps>(({
  className = '',
  ...props
}, ref) => {
  const { orientation, min, max, values } = useSliderContext();
  
  // 범위 스타일 계산
  const getProgressStyles = () => {
    const start = ((values[0] - min) / (max - min)) * 100;
    const end = values[1] !== undefined 
      ? ((values[1] - min) / (max - min)) * 100 
      : 100;
    
    if (orientation === 'horizontal') {
      return {
        left: `${Math.min(start, end)}%`,
        width: `${Math.abs(end - start)}%`
      };
    } else {
      return {
        bottom: `${Math.min(start, end)}%`,
        height: `${Math.abs(end - start)}%`
      };
    }
  };
  
  return (
    <div
      ref={ref}
      className={`slider-range ${className}`}
      data-orientation={orientation}
      style={getProgressStyles()}
      {...props}
    />
  );
});

Range.displayName = 'Slider.Range';

const Thumb = forwardRef<HTMLDivElement, SliderThumbProps>(({
  index = 0,
  className = '',
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const { min, max, values, orientation, id, disabled, onValueChange, onValueCommit } = useSliderContext();
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  
  // 썸 위치 계산
  const getThumbPosition = () => {
    const value = values[index] || min;
    const percent = ((value - min) / (max - min)) * 100;
    
    if (orientation === 'horizontal') {
      return { left: `${percent}%` };
    } else {
      return { bottom: `${percent}%` };
    }
  };
  
  // 포인터 이벤트 핸들러
  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    
    // 캡처를 위한 설정
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    
    // 현재 트랙 엘리먼트 찾기
    trackRef.current = e.currentTarget.closest('.slider-track') as HTMLDivElement;
    
    // 바로 값을 업데이트
    handlePointerMove(e);
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current || disabled) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const position = orientation === 'horizontal' ? e.clientX : e.clientY;
    
    // 새 값 계산
    const newValue = getValueFromPosition(
      position,
      trackRect,
      min,
      max,
      1, // 여기서는 step을 무시하고 부드럽게 움직이게 합니다
      orientation
    );
    
    // 새 값 배열 생성
    const newValues = [...values];
    newValues[index] = newValue;
    
    // 값 업데이트
    if (onValueChange) {
      onValueChange(newValues);
    }
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || disabled) return;
    
    // 캡처 해제
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
    
    // 최종 값 커밋
    if (onValueCommit) {
      onValueCommit(values);
    }
  };
  
  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    let newValue = values[index];
    
    // 슬라이더 키보드 조작
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, newValue + (e.shiftKey ? 10 : 1));
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, newValue - (e.shiftKey ? 10 : 1));
        e.preventDefault();
        break;
      case 'Home':
        newValue = min;
        e.preventDefault();
        break;
      case 'End':
        newValue = max;
        e.preventDefault();
        break;
      default:
        return;
    }
    
    // 값 업데이트
    const newValues = [...values];
    newValues[index] = newValue;
    
    if (onValueChange) {
      onValueChange(newValues);
    }
    
    if (onValueCommit) {
      onValueCommit(newValues);
    }
  };
  
  // 상태 텍스트 생성
  const valueText = `${values[index]}`;
  
  return (
    <div
      ref={(node) => {
        // ref 병합
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
        thumbRef.current = node;
      }}
      className={`slider-thumb ${className}`}
      style={getThumbPosition()}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={values[index]}
      aria-valuetext={valueText}
      aria-label={ariaLabel || `슬라이더 ${index + 1}`}
      aria-disabled={disabled}
      aria-orientation={orientation}
      tabIndex={disabled ? undefined : 0}
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      data-active={isDraggingRef.current ? '' : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

Thumb.displayName = 'Slider.Thumb';

// 기존 인터페이스 확장
export interface SliderProps extends Omit<SliderRootProps, 'children'> {
  /**
   * 레이블 텍스트
   */
  label?: string;
  
  /**
   * 값 표시 여부
   * @default false
   */
  showValue?: boolean;
}

/**
 * 이전 버전과의 호환성을 위한 컴포넌트
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  label,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  disabled = false,
  size = 'md',
  className = '',
  showValue = false,
  ...props
}, ref) => {
  return (
    <div className="slider-container">
      {label && (
        <label className="slider-label">
          {label}
          {showValue && value !== undefined && (
            <span className="slider-value">{Array.isArray(value) ? value.join(' - ') : value}</span>
          )}
        </label>
      )}
      <Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        disabled={disabled}
        size={size}
        className={className}
        {...props}
      >
        <Track>
          <Range />
          <Thumb />
          {Array.isArray(value) && value.length > 1 && <Thumb index={1} />}
        </Track>
      </Root>
    </div>
  );
});

Slider.displayName = 'Slider';

export const SliderComponent = {
  Root,
  Track,
  Range,
  Thumb
};

export default Slider; 