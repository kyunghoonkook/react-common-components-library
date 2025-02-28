import React, { useState, CSSProperties, ReactNode } from "react";
import "./Accordion.css";
import ArrowIcon from '../../icons/ArrowIcon';

export interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  /**
   * 아코디언 항목 목록
   */
  items: AccordionItem[];
  
  /**
   * 제목 스타일
   */
  titleStyle?: CSSProperties;
  
  /**
   * 내용 스타일
   */
  contentStyle?: CSSProperties;
  
  /**
   * 컨테이너 스타일
   */
  style?: CSSProperties;
  
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
  customIcon?: (isOpen: boolean) => ReactNode;
  
  /**
   * 애니메이션 비활성화 여부
   * @default false
   */
  disableAnimation?: boolean;
  
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
  itemStyle?: CSSProperties;
  
  /**
   * 아이콘 스타일
   */
  iconStyle?: CSSProperties;
}

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
  allowMultiple = false,
  defaultExpanded,
  onItemClick,
  itemGap = 1,
  itemStyle,
  iconStyle,
}) => {
  // 기본 펼쳐진 항목 처리
  const getInitialState = () => {
    if (defaultExpanded === undefined) return [];
    if (Array.isArray(defaultExpanded)) return defaultExpanded;
    return [defaultExpanded];
  };
  
  const [expandedItems, setExpandedItems] = useState<number[]>(getInitialState());

  const isItemOpen = (index: number) => expandedItems.includes(index);

  const handleToggle = (index: number) => {
    const isOpen = isItemOpen(index);
    
    let newExpandedItems: number[];
    
    if (allowMultiple) {
      // 다중 항목 허용 시 토글
      newExpandedItems = isOpen
        ? expandedItems.filter(i => i !== index)
        : [...expandedItems, index];
    } else {
      // 하나만 허용 시 교체
      newExpandedItems = isOpen ? [] : [index];
    }
    
    setExpandedItems(newExpandedItems);
    
    if (onItemClick) {
      onItemClick(index, !isOpen);
    }
  };

  const accordionStyle: CSSProperties = {
    ...style,
  };

  const accordionItemStyle: CSSProperties = {
    ...itemStyle,
    marginBottom: `${itemGap}px`,
  };

  const animationClass = disableAnimation ? 'no-animation' : '';

  return (
    <div className={`accordion ${className}`} style={accordionStyle}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${isItemOpen(index) ? "open" : ""} ${itemClassName} ${animationClass}`}
          style={accordionItemStyle}
        >
          <button
            className={`accordion-title ${titleClassName}`}
            style={titleStyle}
            onClick={() => handleToggle(index)}
            aria-expanded={isItemOpen(index)}
          >
            {item.title}
            {customIcon ? (
              customIcon(isItemOpen(index))
            ) : (
              <div style={iconStyle} className={iconClassName}>
                <ArrowIcon
                  direction={isItemOpen(index) ? 'up' : 'down'}
                  className={`accordion-icon ${isItemOpen(index) ? 'open' : ''}`}
                />
              </div>
            )}
          </button>
          {isItemOpen(index) && (
            <div className={`accordion-content ${contentClassName} ${animationClass}`} style={contentStyle}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
