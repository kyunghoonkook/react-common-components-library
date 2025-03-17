import React, { useEffect, useRef, useState, useCallback, ReactNode, useMemo } from 'react';
import './ContextMenu.css';

/**
 * 메뉴 항목 타입 - 일반 항목, 구분선, 체크 항목으로 구분됩니다
 */
export type MenuItemType = 'normal' | 'separator' | 'checkbox';

/**
 * 메뉴 항목 인터페이스
 */
export interface MenuItem {
  /**
   * 메뉴 항목 ID (선택적)
   */
  id?: string;
  
  /**
   * 메뉴 항목 타입
   */
  type: MenuItemType;
  
  /**
   * 메뉴 항목에 표시될 레이블
   */
  label?: ReactNode;
  
  /**
   * 메뉴 항목 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 메뉴 항목 클릭시 실행할 작업
   */
  onClick?: () => void;
  
  /**
   * 키보드 단축키 표시 (선택적)
   */
  shortcut?: string;
  
  /**
   * 체크 여부 (checkbox 타입에서만 사용)
   */
  checked?: boolean;
  
  /**
   * 서브메뉴 항목들 (선택적)
   */
  items?: MenuItem[];
  
  /**
   * 항목 앞에 표시할 아이콘 (선택적)
   */
  icon?: ReactNode;

  /**
   * 항목의 설명 (선택적)
   */
  description?: string;

  /**
   * 항목의 키보드 단축키 (선택적)
   */
  keyboardShortcut?: {
    key: string;
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  };
}

/**
 * 메뉴 섹션 인터페이스
 */
export interface MenuSection {
  /**
   * 섹션 제목 (선택적)
   */
  title?: string;
  
  /**
   * 섹션에 포함된 메뉴 항목들
   */
  items: MenuItem[];
}

/**
 * ContextMenu 컴포넌트 속성
 */
export interface ContextMenuProps {
  /**
   * 메뉴 표시 여부
   */
  isOpen: boolean;
  
  /**
   * 메뉴 닫기 핸들러
   */
  onClose: () => void;
  
  /**
   * 메뉴 섹션들
   */
  sections: MenuSection[];
  
  /**
   * 메뉴 위치 X 좌표
   */
  x: number;
  
  /**
   * 메뉴 위치 Y 좌표
   */
  y: number;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 서브메뉴 열림 딜레이 (ms)
   * @default 200
   */
  submenuDelay?: number;

  /**
   * 메뉴 ID (내부 사용)
   */
  id?: string;

  /**
   * 부모 메뉴 ID (내부 사용)
   */
  parentId?: string;
}

/**
 * ContextMenu 컴포넌트
 */
const ContextMenu = React.memo<ContextMenuProps>(({
  isOpen,
  onClose,
  sections,
  x,
  y,
  className = '',
  submenuDelay = 200,
  id = 'root',
  parentId,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const submenuTimerRef = useRef<NodeJS.Timeout>();
  
  // 모든 메뉴 항목을 플랫하게 만들기
  const flatItems = useMemo(() => {
    return sections.flatMap(section => section.items.filter(item => item.type !== 'separator'));
  }, [sections]);

  // 메뉴가 화면 바깥으로 나가지 않도록 위치 조정
  const adjustPosition = useCallback(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    
    let adjustedX = x;
    let adjustedY = y;
    
    // 가로 방향 조정
    if (x + rect.width > window.innerWidth) {
      if (parentId) {
        // 서브메뉴인 경우 왼쪽으로 표시
        adjustedX = x - rect.width;
      } else {
        adjustedX = window.innerWidth - rect.width;
      }
    }
    
    // 세로 방향 조정
    if (y + rect.height > window.innerHeight) {
      adjustedY = window.innerHeight - rect.height;
    }
    
    setPosition({ x: adjustedX, y: adjustedY });
  }, [x, y, parentId]);
  
  useEffect(() => {
    if (isOpen) {
      adjustPosition();
    }
  }, [isOpen, adjustPosition]);
  
  // 외부 클릭시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => {
          const next = prev + 1;
          return next >= flatItems.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => {
          const next = prev - 1;
          return next < 0 ? flatItems.length - 1 : next;
        });
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (selectedIndex >= 0 && flatItems[selectedIndex].items) {
          setActiveSubmenu(flatItems[selectedIndex].id || `item-${selectedIndex}`);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (parentId) {
          onClose();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const item = flatItems[selectedIndex];
          if (!item.disabled && item.onClick) {
            item.onClick();
            if (!item.items) {
              onClose();
            }
          }
        }
        break;
    }
  }, [isOpen, onClose, flatItems, selectedIndex, parentId]);
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // 서브메뉴 처리
  const handleSubmenuEnter = useCallback((itemId: string) => {
    if (submenuTimerRef.current) {
      clearTimeout(submenuTimerRef.current);
    }
    submenuTimerRef.current = setTimeout(() => {
      setActiveSubmenu(itemId);
    }, submenuDelay);
  }, [submenuDelay]);

  const handleSubmenuLeave = useCallback(() => {
    if (submenuTimerRef.current) {
      clearTimeout(submenuTimerRef.current);
    }
    submenuTimerRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, submenuDelay);
  }, [submenuDelay]);

  // 단축키 처리
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (!isOpen) return;

      flatItems.forEach(item => {
        if (item.keyboardShortcut) {
          const { key, ctrl, alt, shift, meta } = item.keyboardShortcut;
          if (
            e.key.toLowerCase() === key.toLowerCase() &&
            (!ctrl || e.ctrlKey) &&
            (!alt || e.altKey) &&
            (!shift || e.shiftKey) &&
            (!meta || e.metaKey)
          ) {
            e.preventDefault();
            if (!item.disabled && item.onClick) {
              item.onClick();
              onClose();
            }
          }
        }
      });
    };

    if (isOpen) {
      document.addEventListener('keydown', handleShortcut);
    }

    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [isOpen, onClose, flatItems]);

  // 메뉴 항목 렌더링
  const renderMenuItem = useCallback((item: MenuItem, index: number) => {
    const itemId = item.id || `item-${index}`;
    const isSelected = index === selectedIndex;
    
    // 구분선 렌더링
    if (item.type === 'separator') {
      return (
        <div 
          key={itemId} 
          className="context-menu-separator" 
          role="separator" 
        />
      );
    }
    
    // 체크박스 타입 항목 렌더링
    if (item.type === 'checkbox') {
      return (
        <div
          key={itemId}
          id={itemId}
          className={`context-menu-item ${item.disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (!item.disabled && item.onClick) {
              item.onClick();
              if (!item.items) {
                onClose();
              }
            }
          }}
          onMouseEnter={() => {
            setSelectedIndex(index);
            if (item.items) {
              handleSubmenuEnter(itemId);
            } else {
              handleSubmenuLeave();
            }
          }}
          role="menuitemcheckbox"
          aria-checked={item.checked}
          aria-disabled={item.disabled}
          aria-haspopup={item.items ? 'menu' : undefined}
          aria-expanded={item.items ? activeSubmenu === itemId : undefined}
          tabIndex={-1}
        >
          <div className="context-menu-item-checkbox" aria-hidden="true">
            {item.checked && <span className="context-menu-check">✓</span>}
          </div>
          <div className="context-menu-item-content">
            <div className="context-menu-item-label">{item.label}</div>
            {item.description && (
              <div className="context-menu-item-description">{item.description}</div>
            )}
          </div>
          {item.shortcut && (
            <div className="context-menu-item-shortcut" aria-hidden="true">
              {item.shortcut}
            </div>
          )}
          {item.items && <div className="context-menu-item-arrow" aria-hidden="true">›</div>}
          {item.items && activeSubmenu === itemId && (
            <ContextMenu
              isOpen={true}
              onClose={onClose}
              sections={[{ items: item.items }]}
              x={position.x + menuRef.current!.offsetWidth}
              y={position.y + (index * 36)} // 36px는 메뉴 항목의 높이
              submenuDelay={submenuDelay}
              id={itemId}
              parentId={id}
            />
          )}
        </div>
      );
    }
    
    // 일반 항목 렌더링
    return (
      <div
        key={itemId}
        id={itemId}
        className={`context-menu-item ${item.disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => {
          if (!item.disabled && item.onClick) {
            item.onClick();
            if (!item.items) {
              onClose();
            }
          }
        }}
        onMouseEnter={() => {
          setSelectedIndex(index);
          if (item.items) {
            handleSubmenuEnter(itemId);
          } else {
            handleSubmenuLeave();
          }
        }}
        role="menuitem"
        aria-disabled={item.disabled}
        aria-haspopup={item.items ? 'menu' : undefined}
        aria-expanded={item.items ? activeSubmenu === itemId : undefined}
        tabIndex={-1}
      >
        {item.icon && (
          <div className="context-menu-item-icon" aria-hidden="true">
            {item.icon}
          </div>
        )}
        <div className="context-menu-item-content">
          <div className="context-menu-item-label">{item.label}</div>
          {item.description && (
            <div className="context-menu-item-description">{item.description}</div>
          )}
        </div>
        {item.shortcut && (
          <div className="context-menu-item-shortcut" aria-hidden="true">
            {item.shortcut}
          </div>
        )}
        {item.items && <div className="context-menu-item-arrow" aria-hidden="true">›</div>}
        {item.items && activeSubmenu === itemId && (
          <ContextMenu
            isOpen={true}
            onClose={onClose}
            sections={[{ items: item.items }]}
            x={position.x + menuRef.current!.offsetWidth}
            y={position.y + (index * 36)} // 36px는 메뉴 항목의 높이
            submenuDelay={submenuDelay}
            id={itemId}
            parentId={id}
          />
        )}
      </div>
    );
  }, [
    selectedIndex,
    activeSubmenu,
    handleSubmenuEnter,
    handleSubmenuLeave,
    onClose,
    position,
    submenuDelay,
    id
  ]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className={`context-menu ${className}`}
      ref={menuRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      role="menu"
      aria-orientation="vertical"
      onMouseLeave={handleSubmenuLeave}
    >
      {sections.map((section, sectionIndex) => (
        <div 
          key={section.title || `section-${sectionIndex}`} 
          className="context-menu-section"
          role="presentation"
        >
          {section.title && (
            <div 
              className="context-menu-section-title" 
              role="presentation"
            >
              {section.title}
            </div>
          )}
          <div 
            className="context-menu-items"
            role="presentation"
          >
            {section.items.map((item, index) => renderMenuItem(item, index))}
          </div>
          {sectionIndex < sections.length - 1 && (
            <div 
              className="context-menu-section-separator" 
              role="separator"
            />
          )}
        </div>
      ))}
    </div>
  );
});

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu; 