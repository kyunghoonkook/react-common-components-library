import React, { useState, useRef, useEffect, ReactNode, useCallback, useMemo, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import './DropdownMenu.css';

// 드롭다운 메뉴 컨텍스트
interface DropdownMenuContextType {
  closeMenu: () => void;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
  hoverDelay: number;
  isSubmenuOpen: boolean;
  setIsSubmenuOpen: (isOpen: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('useDropdownMenu must be used within a DropdownMenuProvider');
  }
  return context;
};

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

  /**
   * 체크박스 타입 여부
   */
  isCheckbox?: boolean;

  /**
   * 체크 상태 (체크박스 타입일 때만 사용)
   */
  checked?: boolean;

  /**
   * 라디오 그룹 ID (라디오 타입일 때만 사용)
   */
  radioGroup?: string;

  /**
   * 설명 텍스트
   */
  description?: string;
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

  /**
   * 호버 딜레이 (ms)
   * @default 150
   */
  hoverDelay?: number;

  /**
   * 초기 포커스를 받을 항목의 ID
   */
  initialFocusId?: string;

  /**
   * 메뉴가 열릴 때 실행할 콜백
   */
  onOpen?: () => void;

  /**
   * 항목이 선택될 때 실행할 콜백
   */
  onSelect?: (item: DropdownMenuItem) => void;

  /**
   * 라디오 그룹의 선택된 값
   */
  radioValues?: Record<string, string>;

  /**
   * 라디오 그룹 값이 변경될 때 실행할 콜백
   */
  onRadioChange?: (groupId: string, itemId: string) => void;
}

const DropdownMenu = React.memo<DropdownMenuProps>(({
  title,
  sections,
  isOpen,
  onClose,
  trigger,
  className = '',
  menuClassName = '',
  width = '300px',
  position = 'bottom-start',
  hoverDelay = 150,
  initialFocusId,
  onOpen,
  onSelect,
  radioValues = {},
  onRadioChange,
}) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 모든 메뉴 항목을 플랫하게 만들기
  const flatItems = useMemo(() => {
    return sections.flatMap(section => 
      section.items.filter(item => !item.disabled)
    );
  }, [sections]);

  // 키보드 네비게이션을 위한 인덱스 관리
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // 메뉴가 열릴 때 초기 설정
  useEffect(() => {
    if (isOpen) {
      if (initialFocusId) {
        setActiveItemId(initialFocusId);
        const index = flatItems.findIndex(item => item.id === initialFocusId);
        if (index !== -1) {
          setFocusedIndex(index);
        }
      }
      onOpen?.();
    } else {
      setActiveItemId(null);
      setFocusedIndex(-1);
    }
  }, [isOpen, initialFocusId, flatItems, onOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => {
          const next = prev + 1;
          return next >= flatItems.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          const next = prev - 1;
          return next < 0 ? flatItems.length - 1 : next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          const item = flatItems[focusedIndex];
          if (item.subItems) {
            setActiveItemId(item.id);
            setIsSubmenuOpen(true);
          } else {
            item.onClick?.();
            onSelect?.(item);
            if (item.radioGroup && onRadioChange) {
              onRadioChange(item.radioGroup, item.id);
            }
            if (!item.isCheckbox) {
              onClose();
            }
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (isSubmenuOpen) {
          setIsSubmenuOpen(false);
          setActiveItemId(null);
        } else {
          onClose();
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (focusedIndex >= 0) {
          const item = flatItems[focusedIndex];
          if (item.subItems) {
            setActiveItemId(item.id);
            setIsSubmenuOpen(true);
          }
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (isSubmenuOpen) {
          setIsSubmenuOpen(false);
          setActiveItemId(null);
        }
        break;
    }
  }, [isOpen, focusedIndex, flatItems, isSubmenuOpen, onClose, onSelect, onRadioChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 서브메뉴 처리
  const handleItemMouseEnter = useCallback((item: DropdownMenuItem) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (item.subItems) {
      timeoutRef.current = setTimeout(() => {
        setActiveItemId(item.id);
        setIsSubmenuOpen(true);
      }, hoverDelay);
    }
  }, [hoverDelay]);

  const handleItemMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveItemId(null);
      setIsSubmenuOpen(false);
    }, hoverDelay);
  }, [hoverDelay]);

  // 메뉴 항목 렌더링
  const renderMenuItem = useCallback((item: DropdownMenuItem, index: number) => {
    const isActive = activeItemId === item.id;
    const isFocused = focusedIndex === index;
    const hasSubmenu = item.subItems && item.subItems.length > 0;
    const isChecked = item.radioGroup ? radioValues[item.radioGroup] === item.id : item.checked;

    return (
      <div
        key={item.id}
        className={`dropdown-menu-item ${item.disabled ? 'disabled' : ''} ${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''} ${item.className || ''}`}
        onClick={() => {
          if (!item.disabled) {
            if (hasSubmenu) {
              setActiveItemId(item.id);
              setIsSubmenuOpen(true);
            } else {
              item.onClick?.();
              onSelect?.(item);
              if (item.radioGroup && onRadioChange) {
                onRadioChange(item.radioGroup, item.id);
              }
              if (!item.isCheckbox) {
                onClose();
              }
            }
          }
        }}
        onMouseEnter={() => handleItemMouseEnter(item)}
        onMouseLeave={handleItemMouseLeave}
        role={item.isCheckbox ? 'menuitemcheckbox' : item.radioGroup ? 'menuitemradio' : 'menuitem'}
        aria-checked={item.isCheckbox || item.radioGroup ? isChecked : undefined}
        aria-disabled={item.disabled}
        aria-expanded={hasSubmenu ? isActive : undefined}
        tabIndex={isFocused ? 0 : -1}
      >
        <div className="dropdown-menu-item-content">
          {item.icon && (
            <span className="dropdown-menu-item-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="dropdown-menu-item-label">
            {item.label}
            {item.description && (
              <span className="dropdown-menu-item-description">
                {item.description}
              </span>
            )}
          </span>
          {item.shortcut && (
            <span className="dropdown-menu-item-shortcut" aria-hidden="true">
              {item.shortcut}
            </span>
          )}
          {hasSubmenu && (
            <span className="dropdown-menu-item-arrow" aria-hidden="true">
              ›
            </span>
          )}
        </div>
        
        {hasSubmenu && isActive && isSubmenuOpen && (
          <DropdownMenu
            sections={[{ items: item.subItems! }]}
            isOpen={true}
            onClose={() => {
              setIsSubmenuOpen(false);
              setActiveItemId(null);
            }}
            position="right-start"
            className="dropdown-submenu"
            menuClassName="dropdown-submenu-menu"
            hoverDelay={hoverDelay}
            onSelect={onSelect}
            radioValues={radioValues}
            onRadioChange={onRadioChange}
          />
        )}
      </div>
    );
  }, [
    activeItemId,
    focusedIndex,
    handleItemMouseEnter,
    handleItemMouseLeave,
    hoverDelay,
    isSubmenuOpen,
    onClose,
    onSelect,
    radioValues,
    onRadioChange
  ]);

  // 메뉴가 닫혀있을 때는 트리거만 렌더링
  if (!isOpen) {
    return (
      <div className={`dropdown-menu-trigger-container ${className}`}>
        {trigger}
      </div>
    );
  }

  // CSS 기반 위치 지정으로 변경
  return (
    <div className={`dropdown-menu-container ${className}`}>
      <div className="dropdown-menu-trigger">
        {trigger}
      </div>
      <div 
        className={`dropdown-menu position-${position} ${menuClassName}`}
        style={{ width }}
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
      >
        {title && (
          <div className="dropdown-menu-title" role="presentation">
            {title}
          </div>
        )}
        <div className="dropdown-menu-content">
          {sections.map((section, sectionIndex) => (
            <div 
              key={section.title || `section-${sectionIndex}`} 
              className={`dropdown-menu-section ${section.className || ''}`}
              role="presentation"
            >
              {section.title && (
                <div 
                  className="dropdown-menu-section-title" 
                  role="presentation"
                >
                  {section.title}
                </div>
              )}
              <div 
                className="dropdown-menu-list"
                role="presentation"
              >
                {section.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
              </div>
              {sectionIndex < sections.length - 1 && (
                <div 
                  className="dropdown-menu-divider" 
                  role="separator"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu; 