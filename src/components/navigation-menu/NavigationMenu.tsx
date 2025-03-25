import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import './NavigationMenu.css';

type NavigationMenuContextType = {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
};

const NavigationMenuContext = createContext<NavigationMenuContextType | undefined>(undefined);

function useNavigationMenuContext() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error('Navigation Menu 컴포넌트는 NavigationMenu.Root 내부에서만 사용할 수 있습니다.');
  }
  return context;
}

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
  
  /**
   * 아이템 인덱스
   */
  index?: number;
}

export interface NavigationMenuProps {
  /**
   * 네비게이션 메뉴 항목 목록
   */
  items?: NavigationItemProps[];
  
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
  
  /**
   * 네비게이션 메뉴의 자식 요소
   */
  children?: React.ReactNode;
  
  /**
   * 기본적으로 활성화된 항목 인덱스
   */
  defaultValue?: number;
  
  /**
   * 외부에서 제어되는 활성화된 항목 인덱스
   */
  value?: number;
  
  /**
   * 활성화된 항목이 변경될 때 호출되는 함수
   */
  onValueChange?: (value: number) => void;
}

/**
 * 네비게이션 메뉴 컴포넌트
 */
const Root: React.FC<NavigationMenuProps> = ({
  items,
  className = '',
  style,
  width,
  children,
  defaultValue,
  value,
  onValueChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : null
  );
  const menuRef = useRef<HTMLDivElement>(null);
  
  // 외부에서 제어되는 경우 값 동기화
  useEffect(() => {
    if (value !== undefined) {
      setActiveIndex(value);
    }
  }, [value]);
  
  const handleActiveIndexChange = (index: number | null) => {
    if (value === undefined) {
      setActiveIndex(index);
    }
    if (onValueChange && index !== null) {
      onValueChange(index);
    }
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleActiveIndexChange(null);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <NavigationMenuContext.Provider value={{ activeIndex, setActiveIndex: handleActiveIndexChange }}>
      <div 
        ref={menuRef}
        className={`navigation-menu ${className}`}
        style={{ width, ...style }}
        role="navigation"
      >
        {items ? (
          <List>
            {items.map((item, index) => (
              <Item
                key={index}
                label={item.label}
                content={item.content}
                href={item.href}
                active={item.active}
                className={item.className}
                index={index}
              />
            ))}
          </List>
        ) : (
          children
        )}
      </div>
    </NavigationMenuContext.Provider>
  );
};

interface NavigationListProps {
  children: React.ReactNode;
  className?: string;
}

const List: React.FC<NavigationListProps> = ({ 
  children,
  className = ''
}) => {
  return (
    <div className={`navigation-menu-items ${className}`}>
      {children}
    </div>
  );
};

interface NavigationItemComponentProps extends NavigationItemProps {
  children?: React.ReactNode;
}

const Item = React.forwardRef<HTMLDivElement, NavigationItemComponentProps>(({
  label,
  content,
  href,
  active = false,
  className = '',
  index,
  children,
}, ref) => {
  const { activeIndex, setActiveIndex } = useNavigationMenuContext();
  const isActive = active || (index !== undefined && activeIndex === index);
  const hasDropdown = Boolean(content || children);
  
  const handleClick = () => {
    if (hasDropdown && index !== undefined) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const handleHover = () => {
    if (hasDropdown && index !== undefined) {
      setActiveIndex(index);
    }
  };
  
  return (
    <>
      {children ? (
        <div
          ref={ref}
          className={`navigation-item ${isActive ? 'navigation-item-active' : ''} ${className}`}
          onClick={handleClick}
          onMouseEnter={handleHover}
          role="menuitem"
          aria-haspopup={hasDropdown}
          aria-expanded={isActive && hasDropdown}
        >
          {children}
        </div>
      ) : (
        <>
          {href && !hasDropdown ? (
            <a 
              href={href} 
              className="navigation-item-link"
              ref={ref as React.RefObject<HTMLAnchorElement>}
            >
              <div className={`navigation-item ${isActive ? 'navigation-item-active' : ''} ${className}`}>
                {label}
              </div>
            </a>
          ) : (
            <div
              ref={ref}
              className={`navigation-item ${isActive ? 'navigation-item-active' : ''} ${className}`}
              onClick={handleClick}
              onMouseEnter={handleHover}
              role="menuitem"
              aria-haspopup={hasDropdown}
              aria-expanded={isActive && hasDropdown}
            >
              {label}
              {hasDropdown && (
                <span className="navigation-item-caret">
                  {isActive ? '▲' : '▼'}
                </span>
              )}
              
              {isActive && content && (
                <Content content={content} />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
});

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
}

const Trigger: React.FC<TriggerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`navigation-trigger ${className}`}>
      {children}
    </div>
  );
};

interface ContentProps {
  content?: NavigationContent;
  children?: React.ReactNode;
  className?: string;
}

const Content: React.FC<ContentProps> = ({
  content,
  children,
  className = '',
}) => {
  return (
    <div 
      className={`navigation-content ${className}`}
      role="menu"
    >
      <div className="navigation-content-inner">
        {content ? (
          <>
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
                      <div className="navigation-content-link-description">
                        {link.description}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
            
            {content.customContent}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <a 
      href={href}
      className={`navigation-content-link ${className}`}
    >
      {children}
    </a>
  );
};

interface ViewportProps {
  children: React.ReactNode;
  className?: string;
}

const Viewport: React.FC<ViewportProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`navigation-viewport ${className}`}>
      {children}
    </div>
  );
};

export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Viewport,
}

export default NavigationMenu; 