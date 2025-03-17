import React, { useState, useRef, useEffect, forwardRef, useCallback, useMemo, ReactNode, KeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
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

  /**
   * 메뉴바가 활성화될 때 호출되는 콜백
   */
  onActivate?: () => void;

  /**
   * 메뉴바가 비활성화될 때 호출되는 콜백
   */
  onDeactivate?: () => void;
  
  /**
   * 접근성을 위한 레이블
   */
  ariaLabel?: string;
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

  /**
   * 아이템이 선택되었을 때 호출되는 콜백
   */
  onSelect?: () => void;
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

  /**
   * 설명 텍스트
   */
  description?: string;
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

  /**
   * 메뉴 계층 수준
   */
  level?: number;
}

export const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(({
  items,
  className = '',
  style,
  width,
  onActivate,
  onDeactivate,
  ariaLabel = '메뉴'
}, ref) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const menuRefs = useRef<Map<string, HTMLElement>>(new Map());
  const menuBarRef = useRef<HTMLDivElement | null>(null);
  
  const handleMenuClick = useCallback((id: string) => {
    const wasActive = activeMenuId === id;
    setActiveMenuId(prevId => prevId === id ? null : id);
    
    if (!wasActive) {
      onActivate?.();
    } else {
      onDeactivate?.();
    }
  }, [activeMenuId, onActivate, onDeactivate]);
  
  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => {
    const target = event.target as Node;
    const menuBarElement = menuBarRef.current;
    
    if (menuBarElement && !menuBarElement.contains(target)) {
      setActiveMenuId(null);
      onDeactivate?.();
    }
  }, [onDeactivate]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    // 왼쪽/오른쪽 화살표로 메뉴 아이템 간 이동
    if (e.key === 'ArrowLeft') {
      setFocusedItemIndex(prev => (prev <= 0 ? items.length - 1 : prev - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setFocusedItemIndex(prev => (prev >= items.length - 1 ? 0 : prev + 1));
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setActiveMenuId(null);
      onDeactivate?.();
      e.preventDefault();
    } else if (e.key === 'Home') {
      setFocusedItemIndex(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      setFocusedItemIndex(items.length - 1);
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (focusedItemIndex >= 0 && focusedItemIndex < items.length) {
        const item = items[focusedItemIndex];
        if (!item.disabled) {
          handleMenuClick(item.id);
          item.onSelect?.();
        }
      }
      e.preventDefault();
    }
  }, [items, focusedItemIndex, handleMenuClick, onDeactivate]);
  
  useEffect(() => {
    if (activeMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId, handleClickOutside]);
  
  // 포커스된 아이템 변경 시 포커스 이동
  useEffect(() => {
    if (focusedItemIndex >= 0 && focusedItemIndex < items.length) {
      const itemId = items[focusedItemIndex].id;
      const itemElement = menuRefs.current.get(itemId);
      itemElement?.focus();
    }
  }, [focusedItemIndex, items]);

  const menuBarClasses = useMemo(() => {
    return `menubar ${className}`;
  }, [className]);

  return (
    <div 
      ref={(node) => {
        // useRef와 forwardRef를 동시에 사용하기 위한 처리
        menuBarRef.current = node;
        
        // forwardRef에 전달
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          // @ts-ignore - ref가 React.MutableRefObject 타입일 때 할당
          ref.current = node;
        }
      }}
      className={menuBarClasses}
      style={{ 
        width: width,
        ...style
      }}
      role="menubar"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <MenuBarItem
          key={item.id}
          {...item}
          active={activeMenuId === item.id}
          onClick={() => {
            handleMenuClick(item.id);
            item.onSelect?.();
          }}
          onFocus={() => setFocusedItemIndex(index)}
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
                if (!open) {
                  setActiveMenuId(null);
                  onDeactivate?.();
                }
              }}
              level={1}
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
  onFocus?: () => void;
  children?: React.ReactNode;
}>(({
  label,
  id,
  disabled = false,
  className = '',
  active = false,
  onClick,
  onFocus,
  children,
}, ref) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    
    // 스페이스, 엔터 또는 아래 화살표 키로 메뉴 열기
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      onClick?.();
    }
  }, [disabled, onClick]);
  
  const menuItemClasses = useMemo(() => {
    return `menubar-item ${active ? 'menubar-item-active' : ''} ${disabled ? 'menubar-item-disabled' : ''} ${className}`;
  }, [active, className, disabled]);

  return (
    <div
      ref={ref}
      className={menuItemClasses}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
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
  level = 0
}, ref) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const submenuRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  
  const positionMenu = useCallback(() => {
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
      zIndex: 100 + level, // 중첩된 메뉴일수록 높은 z-index를 가짐
      ...style,
    };
  }, [anchorRef, isSubmenu, level, style]);
  
  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onOpenChange?.(false);
    }
  }, [onOpenChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    // 위/아래 화살표로 메뉴 아이템 간 이동
    const actionItems = items.filter(item => !item.isSeparator);
    
    if (e.key === 'ArrowDown') {
      setFocusedItemIndex(prev => (prev >= actionItems.length - 1 ? 0 : prev + 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setFocusedItemIndex(prev => (prev <= 0 ? actionItems.length - 1 : prev - 1));
      e.preventDefault();
    } else if (e.key === 'Escape') {
      onOpenChange?.(false);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && activeSubmenuId === null) {
      // 오른쪽 화살표 키로 첫 번째 서브메뉴 열기
      const firstItemWithSubmenu = actionItems.find(item => 
        !item.isSeparator && item.items && item.items.length > 0
      );
      if (firstItemWithSubmenu && !firstItemWithSubmenu.isSeparator) {
        setActiveSubmenuId(firstItemWithSubmenu.id);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && isSubmenu) {
      // 왼쪽 화살표 키로 서브메뉴 닫기
      onOpenChange?.(false);
      e.preventDefault();
    } else if (e.key === 'Home') {
      setFocusedItemIndex(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      setFocusedItemIndex(actionItems.length - 1);
      e.preventDefault();
    }
  }, [items, focusedItemIndex, activeSubmenuId, isSubmenu, onOpenChange]);
  
  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      // 메뉴가 열리면 첫 번째 항목에 포커스
      setFocusedItemIndex(0);
    } else {
      setActiveSubmenuId(null);
      setFocusedItemIndex(-1);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, handleClickOutside]);
  
  // 포커스된 아이템 변경 시 포커스 이동
  useEffect(() => {
    if (focusedItemIndex >= 0) {
      const actionItems = items.filter(item => !item.isSeparator);
      if (focusedItemIndex < actionItems.length) {
        const itemId = actionItems[focusedItemIndex].id;
        const itemElement = itemRefs.current.get(itemId);
        itemElement?.focus();
      }
    }
  }, [focusedItemIndex, items]);
  
  if (!visible) return null;
  
  const handleMouseEnter = useCallback((id: string) => {
    setActiveSubmenuId(id);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setActiveSubmenuId(null);
  }, []);
  
  const computedStyle = positionMenu();
  
  const actionItems = items.filter(item => !item.isSeparator);
  
  return (
    <div
      ref={menuRef}
      className={`menu-content ${className}`}
      style={computedStyle}
      role="menu"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
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
              onFocus={() => {
                const index = actionItems.findIndex(i => i.id === item.id);
                if (index !== -1) {
                  setFocusedItemIndex(index);
                }
              }}
              ref={(el) => {
                if (el) {
                  submenuRefs.current.set(item.id, el);
                  itemRefs.current.set(item.id, el);
                }
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
                  level={level + 1}
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
  onFocus?: () => void;
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
  description,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  children,
}, ref) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, [disabled, items, onClick, onMouseEnter, onMouseLeave]);
  
  const menuItemClasses = useMemo(() => {
    return `menu-item ${disabled ? 'menu-item-disabled' : ''} ${className}`;
  }, [className, disabled]);

  return (
    <li
      ref={ref}
      className={menuItemClasses}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-haspopup={Boolean(items)}
      aria-description={description}
    >
      <div className="menu-item-container">
        {icon && <span className="menu-item-icon" aria-hidden="true">{icon}</span>}
        <span className="menu-item-label">{label}</span>
        {items && <span className="menu-item-chevron" aria-hidden="true">›</span>}
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
      aria-hidden="true"
    >
      {children}
    </span>
  );
});

// Memoized components
const MemoizedMenuItem = React.memo(MenuItem);
const MemoizedMenuSeparator = React.memo(MenuSeparator);
const MemoizedMenuShortcut = React.memo(MenuShortcut);
const MemoizedMenuContent = React.memo(MenuContent);
const MemoizedMenuBarItem = React.memo(MenuBarItem);

MenuBar.displayName = 'MenuBar';
MenuBarItem.displayName = 'MenuBarItem';
MenuContent.displayName = 'MenuContent';
MenuItem.displayName = 'MenuItem';
MenuSeparator.displayName = 'MenuSeparator';
MenuShortcut.displayName = 'MenuShortcut';

export default MenuBar; 