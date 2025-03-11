import React, { useState, useRef, useEffect } from 'react';
import './NavigationMenu.css';

export interface NavigationLink {
  /**
   * 링크 제목
   */
  title: string;
  
  /**
   * 링크 설명
   */
  description?: string;
  
  /**
   * 링크 URL
   */
  href: string;
}

export interface NavigationContent {
  /**
   * 콘텐츠 제목
   */
  title?: string;
  
  /**
   * 콘텐츠 설명
   */
  description?: string;
  
  /**
   * 콘텐츠 내 링크 목록
   */
  links?: NavigationLink[];
  
  /**
   * 커스텀 콘텐츠
   */
  customContent?: React.ReactNode;
}

export interface NavigationItemProps {
  /**
   * 네비게이션 항목 제목
   */
  label: string;
  
  /**
   * 네비게이션 항목 콘텐츠
   */
  content?: NavigationContent;
  
  /**
   * 네비게이션 항목 링크 URL (content가 없을 경우 사용)
   */
  href?: string;
  
  /**
   * 현재 활성화된 항목인지 여부
   */
  active?: boolean;
  
  /**
   * 네비게이션 항목에 적용할 추가 CSS 클래스
   */
  className?: string;
}

export interface NavigationMenuProps {
  /**
   * 네비게이션 메뉴 항목 목록
   */
  items: NavigationItemProps[];
  
  /**
   * 네비게이션 메뉴에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 네비게이션 메뉴에 적용할 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * 네비게이션 메뉴의 너비
   */
  width?: string;
}

/**
 * NavigationMenu 컴포넌트
 */
export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  className = '',
  style,
  width,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const handleItemClick = (index: number) => {
    if (items[index].content) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  const handleItemHover = (index: number) => {
    if (items[index].content) {
      setOpenIndex(index);
    }
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenIndex(null);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleMouseLeave = () => {
    setOpenIndex(null);
  };
  
  return (
    <div 
      ref={menuRef}
      className={`navigation-menu ${className}`}
      style={{ width, ...style }}
    >
      <div className="navigation-menu-items">
        {items.map((item, index) => (
          <NavigationItem
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            label={item.label}
            content={item.content}
            href={item.href}
            active={item.active || openIndex === index}
            onClick={() => handleItemClick(index)}
            onHover={() => handleItemHover(index)}
            className={item.className}
          />
        ))}
      </div>
      
      {openIndex !== null && items[openIndex].content && (
        <NavigationContent
          content={items[openIndex].content!}
          visible={openIndex !== null}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

interface NavigationItemComponentProps extends NavigationItemProps {
  onClick: () => void;
  onHover: () => void;
}

const NavigationItem = React.forwardRef<HTMLDivElement, NavigationItemComponentProps>(({
  label,
  content,
  href,
  active = false,
  onClick,
  onHover,
  className = '',
}, ref) => {
  const hasDropdown = Boolean(content);
  
  const renderContent = () => (
    <div
      ref={ref}
      className={`navigation-item ${active ? 'navigation-item-active' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={onHover}
      role="menuitem"
      aria-haspopup={hasDropdown}
      aria-expanded={active && hasDropdown}
    >
      {label}
      {hasDropdown && (
        <span className="navigation-item-caret">
          {active ? '▲' : '▼'}
        </span>
      )}
    </div>
  );
  
  if (href && !hasDropdown) {
    return (
      <a href={href} className="navigation-item-link">
        {renderContent()}
      </a>
    );
  }
  
  return renderContent();
});

interface NavigationContentProps {
  content: NavigationContent;
  visible: boolean;
  onMouseLeave: () => void;
}

const NavigationContent: React.FC<NavigationContentProps> = ({
  content,
  visible,
  onMouseLeave,
}) => {
  if (!visible) return null;
  
  return (
    <div 
      className="navigation-content"
      onMouseLeave={onMouseLeave}
      role="menu"
    >
      <div className="navigation-content-inner">
        {content.title && (
          <h3 className="navigation-content-title">{content.title}</h3>
        )}
        
        {content.description && (
          <p className="navigation-content-description">{content.description}</p>
        )}
        
        {content.links && content.links.length > 0 && (
          <div className="navigation-content-links">
            {content.links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="navigation-content-link"
              >
                <div className="navigation-content-link-title">{link.title}</div>
                {link.description && (
                  <div className="navigation-content-link-description">{link.description}</div>
                )}
              </a>
            ))}
          </div>
        )}
        
        {content.customContent && (
          <div className="navigation-content-custom">
            {content.customContent}
          </div>
        )}
      </div>
    </div>
  );
};

NavigationItem.displayName = 'NavigationItem';

export default NavigationMenu; 