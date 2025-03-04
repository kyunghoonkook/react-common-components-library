import React, { useEffect, useRef, useState, ReactNode } from 'react';
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
}

/**
 * ContextMenu 컴포넌트
 */
const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  onClose,
  sections,
  x,
  y,
  className = '',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });
  
  // 메뉴가 화면 바깥으로 나가지 않도록 위치 조정
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      
      let adjustedX = x;
      let adjustedY = y;
      
      // 가로 방향 조정
      if (x + rect.width > window.innerWidth) {
        adjustedX = window.innerWidth - rect.width;
      }
      
      // 세로 방향 조정
      if (y + rect.height > window.innerHeight) {
        adjustedY = window.innerHeight - rect.height;
      }
      
      setPosition({ x: adjustedX, y: adjustedY });
    }
  }, [isOpen, x, y]);
  
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
  
  // ESC 키 누를시 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // 메뉴 항목 렌더링
  const renderMenuItem = (item: MenuItem) => {
    // 구분선 렌더링
    if (item.type === 'separator') {
      return <div key={item.id || `sep-${Math.random()}`} className="context-menu-separator" />;
    }
    
    // 체크박스 타입 항목 렌더링
    if (item.type === 'checkbox') {
      return (
        <div
          key={item.id || `item-${Math.random()}`}
          className={`context-menu-item ${item.disabled ? 'disabled' : ''}`}
          onClick={() => {
            if (!item.disabled && item.onClick) {
              item.onClick();
              if (!item.items) {
                onClose();
              }
            }
          }}
        >
          <div className="context-menu-item-checkbox">
            {item.checked && <span className="context-menu-check">✓</span>}
          </div>
          <div className="context-menu-item-label">{item.label}</div>
          {item.shortcut && <div className="context-menu-item-shortcut">{item.shortcut}</div>}
          {item.items && <div className="context-menu-item-arrow">›</div>}
        </div>
      );
    }
    
    // 일반 항목 렌더링
    return (
      <div
        key={item.id || `item-${Math.random()}`}
        className={`context-menu-item ${item.disabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!item.disabled && item.onClick) {
            item.onClick();
            if (!item.items) {
              onClose();
            }
          }
        }}
      >
        {item.icon && <div className="context-menu-item-icon">{item.icon}</div>}
        <div className="context-menu-item-label">{item.label}</div>
        {item.shortcut && <div className="context-menu-item-shortcut">{item.shortcut}</div>}
        {item.items && <div className="context-menu-item-arrow">›</div>}
      </div>
    );
  };
  
  return (
    <div
      className={`context-menu ${className}`}
      ref={menuRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {sections.map((section, index) => (
        <div key={section.title || `section-${index}`} className="context-menu-section">
          {section.title && <div className="context-menu-section-title">{section.title}</div>}
          <div className="context-menu-items">
            {section.items.map(renderMenuItem)}
          </div>
          {index < sections.length - 1 && <div className="context-menu-section-separator" />}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu; 