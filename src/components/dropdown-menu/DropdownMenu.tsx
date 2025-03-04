import React, { useState, useRef, useEffect, ReactNode } from 'react';
import './DropdownMenu.css';

export interface DropdownMenuItem {
  /**
   * 메뉴 항목의 고유 ID
   */
  id: string;
  
  /**
   * 메뉴 항목에 표시될 레이블
   */
  label: string;
  
  /**
   * 항목의 아이콘 (ReactNode)
   */
  icon?: ReactNode;
  
  /**
   * 단축키 표시
   */
  shortcut?: string;
  
  /**
   * 항목 클릭 시 실행할 함수
   */
  onClick?: () => void;
  
  /**
   * 하위 메뉴가 있는지 여부
   */
  hasSubmenu?: boolean;
  
  /**
   * 하위 메뉴 항목들
   */
  subItems?: DropdownMenuItem[];
  
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 항목에 적용할 추가 CSS 클래스
   */
  className?: string;
}

export interface DropdownMenuSection {
  /**
   * 섹션 제목 (선택적)
   */
  title?: string;
  
  /**
   * 섹션에 포함된 메뉴 항목들
   */
  items: DropdownMenuItem[];
  
  /**
   * 섹션에 적용할 추가 CSS 클래스
   */
  className?: string;
}

export interface DropdownMenuProps {
  /**
   * 드롭다운 메뉴 제목
   */
  title?: string;
  
  /**
   * 드롭다운 메뉴 섹션들
   */
  sections: DropdownMenuSection[];
  
  /**
   * 메뉴 열림 상태
   */
  isOpen: boolean;
  
  /**
   * 메뉴 닫기 핸들러
   */
  onClose: () => void;
  
  /**
   * 트리거 요소 (드롭다운을 열기 위한 버튼/요소)
   */
  trigger?: ReactNode;
  
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 메뉴 컨테이너에 적용할 추가 CSS 클래스
   */
  menuClassName?: string;
  
  /**
   * 메뉴의 너비
   */
  width?: string;
  
  /**
   * 메뉴가 트리거 요소 기준으로 표시될 위치
   */
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  sections,
  isOpen,
  onClose,
  trigger,
  className = '',
  menuClassName = '',
  width = '300px',
  position = 'bottom-start',
}) => {
  // 활성화된 아이템의 ID를 상태로 관리
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // 마우스가 일시적으로 서브메뉴를 떠날 때 지연시간을 위한 타이머
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 서브메뉴가 있는 모든 아이템의 ID 목록 (디버깅 및 추적용)
  const itemsWithSubmenu = sections.flatMap(section => 
    section.items.filter(item => item.subItems && item.subItems.length > 0)
  ).map(item => item.id);

  // 컴포넌트가 마운트/언마운트되거나 isOpen 상태가 변경될 때 이벤트 리스너 설정
  useEffect(() => {
    if (!isOpen) {
      setActiveItemId(null);
      return;
    }

    // 메뉴 외부를 클릭하면 메뉴를 닫음
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
        setActiveItemId(null);
      }
    };

    // ESC 키를 누르면 메뉴를 닫음
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setActiveItemId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너와 타이머 정리
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, onClose]);

  // 메뉴 아이템에 마우스를 올렸을 때 호출되는 함수
  const handleItemMouseEnter = (item: DropdownMenuItem) => {
    // 타이머 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 아이템에 서브메뉴가 있을 경우 해당 아이템을 활성화
    if (item.subItems && item.subItems.length > 0) {
      setActiveItemId(item.id);
    } else {
      // 서브메뉴가 없는 경우 활성화된 아이템 초기화
      setActiveItemId(null);
    }
  };

  // 메뉴 아이템에서 마우스가 벗어났을 때 호출되는 함수
  const handleItemMouseLeave = () => {
    // 일시적으로 마우스가 서브메뉴와 메인 메뉴 사이의 간격으로 이동할 수 있으므로,
    // 타이머를 설정하여 약간의 지연 후에 서브메뉴를 닫음
    timeoutRef.current = setTimeout(() => {
      setActiveItemId(null);
    }, 150); // 150ms 지연
  };

  // 서브메뉴에 마우스가 들어왔을 때 호출되는 함수
  const handleSubmenuMouseEnter = () => {
    // 타이머 취소하여 서브메뉴가 닫히지 않도록 함
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 서브메뉴에서 마우스가 벗어났을 때 호출되는 함수
  const handleSubmenuMouseLeave = () => {
    // 지연 후 서브메뉴 닫기
    timeoutRef.current = setTimeout(() => {
      setActiveItemId(null);
    }, 150);
  };

  // 메뉴 아이템 렌더링 함수
  const renderItem = (item: DropdownMenuItem, index: number) => {
    // 이 아이템에 서브메뉴가 있는지 여부 확인
    const hasSubmenu = item.subItems && item.subItems.length > 0;
    // 이 아이템의 서브메뉴가 현재 활성화되어 있는지 여부 확인
    const isActive = activeItemId === item.id;

    return (
      <div
        key={item.id || `item-${index}`}
        className={`dropdown-menu-item ${item.disabled ? 'disabled' : ''} ${isActive ? 'active' : ''} ${item.className || ''}`}
        onClick={() => {
          if (!item.disabled && item.onClick && !hasSubmenu) {
            item.onClick();
            onClose();
          }
        }}
        onMouseEnter={() => handleItemMouseEnter(item)}
        onMouseLeave={handleItemMouseLeave}
      >
        {item.icon && <span className="dropdown-menu-item-icon">{item.icon}</span>}
        <span className="dropdown-menu-item-label">{item.label}</span>
        {item.shortcut && <span className="dropdown-menu-item-shortcut">{item.shortcut}</span>}
        {hasSubmenu && <span className="dropdown-menu-item-arrow">›</span>}
        
        {/* 서브메뉴 렌더링 */}
        {hasSubmenu && isActive && (
          <div 
            className="dropdown-submenu"
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}
          >
            <div className="dropdown-menu-list">
              {item.subItems?.map((subItem, subIndex) => (
                <div
                  key={subItem.id || `${item.id}-sub-${subIndex}`}
                  className={`dropdown-menu-item ${subItem.disabled ? 'disabled' : ''} ${subItem.className || ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!subItem.disabled && subItem.onClick) {
                      subItem.onClick();
                      onClose();
                    }
                  }}
                >
                  {subItem.icon && <span className="dropdown-menu-item-icon">{subItem.icon}</span>}
                  <span className="dropdown-menu-item-label">{subItem.label}</span>
                  {subItem.shortcut && <span className="dropdown-menu-item-shortcut">{subItem.shortcut}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 메뉴가 닫혀 있을 때는 트리거만 렌더링
  if (!isOpen) return <>{trigger}</>;

  return (
    <div className={`dropdown-menu-container ${className}`} ref={menuRef}>
      {trigger}
      <div 
        className={`dropdown-menu position-${position} ${menuClassName}`}
        style={{ width }}
      >
        {title && <div className="dropdown-menu-title">{title}</div>}
        <div className="dropdown-menu-content">
          {sections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className={`dropdown-menu-section ${section.className || ''}`}>
              {section.title && (
                <div className="dropdown-menu-section-title">{section.title}</div>
              )}
              <div className="dropdown-menu-list">
                {section.items.map((item, itemIndex) => renderItem(item, itemIndex))}
              </div>
              {sectionIndex < sections.length - 1 && <div className="dropdown-menu-divider" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu; 