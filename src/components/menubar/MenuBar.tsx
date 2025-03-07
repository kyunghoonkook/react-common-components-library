import React, { useState, useRef, useEffect, forwardRef } from 'react';
import './MenuBar.css';

export interface MenuBarProps {
  /**
   * 메뉴바 아이템 배열
   */
  items: MenuBarItemProps[];
  
  /**
   * 메뉴바에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 메뉴바에 적용할 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * 메뉴바의 너비
   * @example '100%', '300px', 'auto'
   */
  width?: string;
}

export interface MenuBarItemProps {
  /**
   * 메뉴 아이템 레이블
   */
  label: string;
  
  /**
   * 메뉴 아이템 ID
   */
  id: string;
  
  /**
   * 메뉴 아이템 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 서브메뉴 항목
   */
  items?: MenuItemProps[];
  
  /**
   * 메뉴 아이템에 적용할 추가 CSS 클래스
   */
  className?: string;
}

// 구분선 타입과 메뉴 항목 타입을 구분하기 위한 인터페이스
export interface MenuSeparatorItem {
  /**
   * 항목 ID
   */
  id: string;
  
  /**
   * 구분선 여부 (true로 설정)
   */
  isSeparator: true;
  
  /**
   * 항목에 적용할 추가 CSS 클래스
   */
  className?: string;
}

export interface MenuActionItem {
  /**
   * 메뉴 항목 ID
   */
  id: string;
  
  /**
   * 메뉴 항목 레이블
   */
  label: React.ReactNode;
  
  /**
   * 메뉴 항목 클릭 핸들러
   */
  onClick?: () => void;
  
  /**
   * 메뉴 항목 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 단축키
   */
  shortcut?: string;
  
  /**
   * 아이콘
   */
  icon?: React.ReactNode;
  
  /**
   * 서브메뉴 항목 (사용 시 화살표 아이콘 표시)
   */
  items?: MenuItemProps[];
  
  /**
   * 메뉴 항목에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 구분선 여부 (false 또는 정의하지 않음)
   */
  isSeparator?: false;
}

// MenuItemProps는 구분선 또는 액션 아이템 중 하나
export type MenuItemProps = MenuSeparatorItem | MenuActionItem;

export interface MenuContentProps {
  /**
   * 메뉴 항목 배열
   */
  items?: MenuItemProps[];
  
  /**
   * 메뉴 컨텐츠에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 열기/닫기 상태 콜백
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * 보이는 상태 여부
   */
  visible: boolean;
  
  /**
   * 메뉴 컨텐츠가 위치할 앵커 요소의 참조
   */
  anchorRef: React.RefObject<HTMLElement>;
  
  /**
   * 메뉴 컨텐츠에 적용할 스타일
   */
  style?: React.CSSProperties;
  
  /**
   * 서브메뉴 여부
   */
  isSubmenu?: boolean;
}

export const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(({
  items,
  className = '',
  style,
  width,
}, ref) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Map<string, HTMLElement>>(new Map());
  
  const handleMenuClick = (id: string) => {
    setActiveMenuId(prevId => prevId === id ? null : id);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!ref || !('contains' in ref) || !(ref as any).contains(target)) {
      setActiveMenuId(null);
    }
  };
  
  useEffect(() => {
    if (activeMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId]);
  
  return (
    <div 
      ref={ref}
      className={`menubar ${className}`}
      style={{ 
        width: width,
        ...style
      }}
    >
      {items.map((item) => (
        <MenuBarItem
          key={item.id}
          {...item}
          active={activeMenuId === item.id}
          onClick={() => handleMenuClick(item.id)}
          ref={(el) => {
            if (el) menuRefs.current.set(item.id, el);
          }}
        >
          {activeMenuId === item.id && (
            <MenuContent
              items={item.items}
              visible={activeMenuId === item.id}
              anchorRef={{ current: menuRefs.current.get(item.id) || null }}
              onOpenChange={(open) => {
                if (!open) setActiveMenuId(null);
              }}
            />
          )}
        </MenuBarItem>
      ))}
    </div>
  );
});

export const MenuBarItem = forwardRef<HTMLDivElement, MenuBarItemProps & {
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}>(({
  label,
  id,
  disabled = false,
  className = '',
  active = false,
  onClick,
  children,
}, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    // 스페이스, 엔터 또는 아래 화살표 키로 메뉴 열기
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      onClick?.();
    }
  };
  
  return (
    <div
      ref={ref}
      className={`menubar-item ${active ? 'menubar-item-active' : ''} ${disabled ? 'menubar-item-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="menuitem"
      aria-disabled={disabled}
      aria-haspopup={true}
      aria-expanded={active}
    >
      {label}
      {children}
    </div>
  );
});

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(({
  items = [],
  className = '',
  onOpenChange,
  visible,
  anchorRef,
  style,
  isSubmenu = false,
}, ref) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  const submenuRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  
  const positionMenu = () => {
    if (!menuRef.current || !anchorRef.current) return {};
    
    const menuRect = menuRef.current.getBoundingClientRect();
    const anchorRect = anchorRef.current.getBoundingClientRect();
    
    // 서브메뉴는 부모 항목의 오른쪽에, 메인 메뉴는 메뉴바 아이템 아래에 위치
    let top = isSubmenu ? anchorRect.top : anchorRect.bottom;
    let left = isSubmenu ? anchorRect.right + 2 : anchorRect.left;
    
    // 화면 오른쪽 경계를 벗어나는지 확인
    if (left + menuRect.width > window.innerWidth) {
      // 서브메뉴는 부모 항목의 왼쪽에 표시
      left = isSubmenu ? 
        anchorRect.left - menuRect.width - 2 : 
        anchorRect.right - menuRect.width;
    }
    
    // 화면 아래쪽 경계를 벗어나는지 확인
    if (top + menuRect.height > window.innerHeight) {
      // 서브메뉴는 가능한 한 위로 이동하되 화면 내에 유지
      // 메인 메뉴는 메뉴바 아이템 위에 표시
      top = isSubmenu ? 
        window.innerHeight - menuRect.height - 10 : 
        anchorRect.top - menuRect.height;
      
      // 화면 위쪽을 벗어나지 않도록 처리
      if (top < 0) {
        top = 10;
      }
    }
    
    return {
      position: 'fixed' as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: isSubmenu ? 101 : 100, // 서브메뉴는 부모 메뉴보다 높은 z-index를 가짐
      ...style,
    };
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onOpenChange?.(false);
      }
    };
    
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onOpenChange]);
  
  if (!visible) return null;
  
  const handleMouseEnter = (id: string) => {
    setActiveSubmenuId(id);
  };
  
  const handleMouseLeave = () => {
    setActiveSubmenuId(null);
  };
  
  const computedStyle = positionMenu();
  
  return (
    <div
      ref={menuRef}
      className={`menu-content ${className}`}
      style={computedStyle}
      role="menu"
    >
      <ul className="menu-list">
        {items.map((item) => (
          item.isSeparator ? (
            <MenuSeparator key={item.id} className={item.className} />
          ) : (
            <MenuItem
              key={item.id}
              {...item}
              onMouseEnter={() => handleMouseEnter(item.id)}
              ref={(el) => {
                if (el) submenuRefs.current.set(item.id, el);
              }}
            >
              {item.items && activeSubmenuId === item.id && (
                <MenuContent
                  items={item.items}
                  visible={activeSubmenuId === item.id}
                  anchorRef={{ current: submenuRefs.current.get(item.id) || null }}
                  onOpenChange={(open) => {
                    if (!open) setActiveSubmenuId(null);
                  }}
                  isSubmenu
                />
              )}
            </MenuItem>
          )
        ))}
      </ul>
    </div>
  );
});

export const MenuItem = forwardRef<HTMLLIElement, MenuActionItem & {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
}>(({
  id,
  label,
  onClick,
  disabled = false,
  shortcut,
  icon,
  items,
  className = '',
  onMouseEnter,
  onMouseLeave,
  children,
}, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    // 스페이스 또는 엔터 키로 클릭 이벤트 발생
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
    
    // 오른쪽 화살표 키로 서브메뉴 열기
    if (e.key === 'ArrowRight' && items && items.length > 0) {
      e.preventDefault();
      onMouseEnter?.();
    }
    
    // 왼쪽 화살표 키로 서브메뉴 닫기
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onMouseLeave?.();
    }
  };
  
  return (
    <li
      ref={ref}
      className={`menu-item ${disabled ? 'menu-item-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-haspopup={Boolean(items)}
    >
      <div className="menu-item-container">
        {icon && <span className="menu-item-icon">{icon}</span>}
        <span className="menu-item-label">{label}</span>
        {items && <span className="menu-item-chevron">›</span>}
        {shortcut && <MenuShortcut>{shortcut}</MenuShortcut>}
      </div>
      {children}
    </li>
  );
});

export const MenuSeparator = forwardRef<HTMLLIElement, { className?: string }>(({
  className = '',
}, ref) => {
  return (
    <li 
      ref={ref}
      className={`menu-separator ${className}`}
      role="separator"
    />
  );
});

export const MenuShortcut = forwardRef<HTMLSpanElement, { 
  children: React.ReactNode;
  className?: string;
}>(({
  children,
  className = '',
}, ref) => {
  return (
    <span 
      ref={ref}
      className={`menu-shortcut ${className}`}
    >
      {children}
    </span>
  );
});

MenuBar.displayName = 'MenuBar';
MenuBarItem.displayName = 'MenuBarItem';
MenuContent.displayName = 'MenuContent';
MenuItem.displayName = 'MenuItem';
MenuSeparator.displayName = 'MenuSeparator';
MenuShortcut.displayName = 'MenuShortcut';

export default MenuBar; 