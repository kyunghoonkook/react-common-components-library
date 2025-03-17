import React, { useState, useCallback, memo, createContext, useContext, KeyboardEvent } from "react";
import { useId } from "../../hooks/useId";
import { useControllableState } from "../../hooks/useControllableState";
import "./Accordion.css";
import ArrowIcon from '../../icons/ArrowIcon';

export type AccordionAnimationDuration = 'fast' | 'normal' | 'slow' | number;

// Context for Accordion state management
interface AccordionContextValue {
  expandedItems: number[];
  onToggle: (index: number) => void;
  allowMultiple: boolean;
  disableAnimation: boolean;
  animationDuration: AccordionAnimationDuration;
  level: number;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

// Hook for using Accordion context
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion");
  }
  return context;
};

export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  items?: AccordionItem[]; // 중첩 아코디언을 위한 하위 항목
}

export interface AccordionProps {
  /**
   * 아코디언 항목 목록
   */
  items: AccordionItem[];
  
  /**
   * 제목 스타일
   */
  titleStyle?: React.CSSProperties;
  
  /**
   * 내용 스타일
   */
  contentStyle?: React.CSSProperties;
  
  /**
   * 컨테이너 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * 아코디언 컨테이너에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 아코디언 제목에 적용할 추가 CSS 클래스
   */
  titleClassName?: string;
  
  /**
   * 아코디언 내용에 적용할 추가 CSS 클래스
   */
  contentClassName?: string;
  
  /**
   * 아코디언 항목에 적용할 추가 CSS 클래스
   */
  itemClassName?: string;
  
  /**
   * 아코디언 화살표 아이콘에 적용할 추가 CSS 클래스
   */
  iconClassName?: string;
  
  /**
   * 커스텀 화살표 아이콘 컴포넌트
   */
  customIcon?: (isOpen: boolean) => React.ReactNode;
  
  /**
   * 애니메이션 비활성화 여부
   * @default false
   */
  disableAnimation?: boolean;
  
  /**
   * 애니메이션 지속 시간
   */
  animationDuration?: AccordionAnimationDuration;
  
  /**
   * 여러 항목을 동시에 열 수 있는지 여부
   * @default false
   */
  allowMultiple?: boolean;
  
  /**
   * 기본적으로 펼쳐진 항목의 인덱스 또는 인덱스 배열
   */
  defaultExpanded?: number | number[];
  
  /**
   * 항목을 클릭할 때 호출되는 함수
   */
  onItemClick?: (index: number, isOpen: boolean) => void;
  
  /**
   * 항목 간 간격 (픽셀)
   * @default 1
   */
  itemGap?: number;
  
  /**
   * 아코디언 항목 스타일
   */
  itemStyle?: React.CSSProperties;
  
  /**
   * 아이콘 스타일
   */
  iconStyle?: React.CSSProperties;
  
  /**
   * 아코디언 항목 값
   */
  value?: number[];
  
  /**
   * 아코디언 항목 값 변경 함수
   */
  onChange?: (value: number[]) => void;
  
  /**
   * 아코디언 레벨
   */
  level?: number;
}

// Memoized AccordionItem component
const AccordionItem = memo(({ 
  item, 
  index, 
  styles,
  classNames,
  customIcon,
  level = 0
}: { 
  item: AccordionItem;
  index: number;
  styles: {
    title?: React.CSSProperties;
    content?: React.CSSProperties;
    item?: React.CSSProperties;
    icon?: React.CSSProperties;
  };
  classNames: {
    title?: string;
    content?: string;
    item?: string;
    icon?: string;
  };
  customIcon?: (isOpen: boolean) => React.ReactNode;
  level?: number;
}) => {
  const { 
    expandedItems, 
    onToggle, 
    disableAnimation, 
    animationDuration,
    allowMultiple 
  } = useAccordion();
  
  const isOpen = expandedItems.includes(index);
  const id = useId();
  const headerId = `${id}-header`;
  const panelId = `${id}-panel`;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case 'Space':
        e.preventDefault();
        if (!item.disabled) {
          onToggle(index);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextButton = e.currentTarget.parentElement?.nextElementSibling?.querySelector('button');
        nextButton?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevButton = e.currentTarget.parentElement?.previousElementSibling?.querySelector('button');
        prevButton?.focus();
        break;
      case 'Home':
        e.preventDefault();
        const firstButton = e.currentTarget.parentElement?.parentElement?.querySelector('button');
        firstButton?.focus();
        break;
      case 'End':
        e.preventDefault();
        const buttons = e.currentTarget.parentElement?.parentElement?.querySelectorAll('button');
        const lastButton = buttons?.[buttons.length - 1];
        lastButton?.focus();
        break;
    }
  };

  const animationStyle = {
    ...styles.content,
    '--accordion-animation-duration': typeof animationDuration === 'number' 
      ? `${animationDuration}ms`
      : `var(--accordion-duration-${animationDuration || 'normal'})`,
  };

  return (
    <div
      className={`accordion-item ${isOpen ? "open" : ""} ${item.disabled ? "disabled" : ""} ${classNames.item || ""}`}
      style={styles.item}
      data-level={level}
    >
      <button
        id={headerId}
        className={`accordion-title ${classNames.title || ""}`}
        style={styles.title}
        onClick={() => !item.disabled && onToggle(index)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-disabled={item.disabled}
        disabled={item.disabled}
        tabIndex={item.disabled ? -1 : 0}
      >
        {item.title}
        {customIcon ? (
          customIcon(isOpen)
        ) : (
          <div style={styles.icon} className={classNames.icon || ""}>
            <ArrowIcon
              direction={isOpen ? 'up' : 'down'}
              className={`accordion-icon ${isOpen ? 'open' : ''}`}
            />
          </div>
        )}
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className={`accordion-content ${classNames.content || ""} ${
            disableAnimation ? "no-animation" : ""
          }`}
          style={animationStyle}
        >
          {item.content}
          {item.items && (
            <Accordion
              items={item.items}
              {...{
                titleStyle: styles.title,
                contentStyle: styles.content,
                itemStyle: styles.item,
                iconStyle: styles.icon,
                classNames,
                customIcon,
                disableAnimation,
                animationDuration,
                allowMultiple,
                level: level + 1
              }}
            />
          )}
        </div>
      )}
    </div>
  );
});

const Accordion: React.FC<AccordionProps> = ({
  items,
  titleStyle,
  contentStyle,
  style,
  className = '',
  titleClassName = '',
  contentClassName = '',
  itemClassName = '',
  iconClassName = '',
  customIcon,
  disableAnimation = false,
  animationDuration = 'normal',
  allowMultiple = false,
  defaultExpanded,
  value,
  onChange,
  onItemClick,
  itemGap = 1,
  itemStyle,
  iconStyle,
  level = 0,
}) => {
  // Use controllable state
  const [expandedItems, setExpandedItems] = useControllableState({
    value,
    defaultValue: Array.isArray(defaultExpanded) 
      ? defaultExpanded 
      : defaultExpanded !== undefined ? [defaultExpanded] : [],
    onChange,
  });

  // Memoized toggle handler
  const handleToggle = useCallback((index: number) => {
    const isOpen = expandedItems.includes(index);
    let newExpandedItems: number[];

    if (allowMultiple) {
      newExpandedItems = isOpen
        ? expandedItems.filter((item: number) => item !== index)
        : [...expandedItems, index];
    } else {
      newExpandedItems = isOpen ? [] : [index];
    }

    setExpandedItems(newExpandedItems);
    onItemClick?.(index, !isOpen);
  }, [expandedItems, allowMultiple, setExpandedItems, onItemClick]);

  const styles = {
    title: titleStyle,
    content: contentStyle,
    item: { ...itemStyle, marginBottom: `${itemGap}px` },
    icon: iconStyle,
  };

  const classNames = {
    title: titleClassName,
    content: contentClassName,
    item: itemClassName,
    icon: iconClassName,
  };

  return (
    <AccordionContext.Provider
      value={{
        expandedItems,
        onToggle: handleToggle,
        allowMultiple,
        disableAnimation,
        animationDuration,
        level,
      }}
    >
      <div 
        className={`accordion ${className}`} 
        style={style}
        role="presentation"
      >
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            index={index}
            styles={styles}
            classNames={classNames}
            customIcon={customIcon}
            level={level}
          />
        ))}
      </div>
    </AccordionContext.Provider>
  );
};

export default memo(Accordion);
