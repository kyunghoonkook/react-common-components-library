import React, { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react';
import './Command.css';

export interface CommandGroup {
  /**
   * 그룹 제목
   */
  label: string;
  /**
   * 그룹에 속한 명령어 항목들
   */
  items: CommandItem[];
}

export interface CommandItem {
  /**
   * 항목의 고유 식별자
   */
  id: string;
  /**
   * 항목에 표시될 이름
   */
  label: string;
  /**
   * 항목의 아이콘
   */
  icon: ReactNode;
  /**
   * 항목의 키보드 단축키 (선택 사항)
   */
  shortcut?: string;
  /**
   * 항목 선택 시 실행할 작업
   */
  onSelect: () => void;
}

export interface CommandProps {
  /**
   * 컴포넌트 열림 상태
   */
  isOpen: boolean;
  /**
   * 컴포넌트 닫기 핸들러
   */
  onClose: () => void;
  /**
   * 명령어 그룹 목록
   */
  groups: CommandGroup[];
  /**
   * 검색 입력 필드의 placeholder 텍스트
   * @default "Type a command or search..."
   */
  placeholder?: string;
  /**
   * 컴포넌트에 적용할 추가 CSS 클래스
   */
  className?: string;
}

/**
 * Command 컴포넌트는 키보드 기반의 명령어 팔레트를 제공합니다.
 */
const Command: React.FC<CommandProps> = ({
  isOpen,
  onClose,
  groups,
  placeholder = "Type a command or search...",
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 검색어에 따라 그룹 및 항목 필터링
  const filteredGroups = groups
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0);

  // 선택 가능한 항목의 총 개수와 전체 인덱스를 계산하는 함수
  const calculateSelectionIndices = () => {
    let totalIndex = 0;
    let targetGroupIndex = -1;
    let targetItemIndex = -1;

    for (let g = 0; g < filteredGroups.length; g++) {
      for (let i = 0; i < filteredGroups[g].items.length; i++) {
        if (g === selectedGroupIndex && i === selectedItemIndex) {
          targetGroupIndex = g;
          targetItemIndex = i;
          break;
        }
        totalIndex++;
      }
      if (targetGroupIndex !== -1) break;
    }

    return { totalItems: totalIndex, groupIndex: targetGroupIndex, itemIndex: targetItemIndex };
  };

  // 선택된 항목 표시 및 스크롤 처리
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 키로 닫기 및 키보드 탐색 처리
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 오버레이 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 키보드 탐색 처리
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredGroups.length === 0) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        let nextGroupIndex = selectedGroupIndex;
        let nextItemIndex = selectedItemIndex + 1;

        if (nextItemIndex >= filteredGroups[nextGroupIndex].items.length) {
          nextGroupIndex = (nextGroupIndex + 1) % filteredGroups.length;
          nextItemIndex = 0;
        }

        setSelectedGroupIndex(nextGroupIndex);
        setSelectedItemIndex(nextItemIndex);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        let nextGroupIndex = selectedGroupIndex;
        let nextItemIndex = selectedItemIndex - 1;

        if (nextItemIndex < 0) {
          nextGroupIndex = (nextGroupIndex - 1 + filteredGroups.length) % filteredGroups.length;
          nextItemIndex = filteredGroups[nextGroupIndex].items.length - 1;
        }

        setSelectedGroupIndex(nextGroupIndex);
        setSelectedItemIndex(nextItemIndex);
        break;
      }
      case 'Enter': {
        e.preventDefault();
        if (filteredGroups.length > 0 && filteredGroups[selectedGroupIndex]?.items[selectedItemIndex]) {
          filteredGroups[selectedGroupIndex].items[selectedItemIndex].onSelect();
          onClose();
        }
        break;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-overlay" onClick={handleOverlayClick}>
      <div 
        className={`command ${className}`}
        ref={containerRef}
      >
        <div className="command-input-wrapper">
          <span className="command-input-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.9624 10.9625L13.9999 14.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedGroupIndex(0);
              setSelectedItemIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <div className="command-content">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group, groupIndex) => (
              <div key={group.label} className="command-group">
                <div className="command-group-heading">
                  {group.label}
                </div>
                <div className="command-group-items">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`command-item ${groupIndex === selectedGroupIndex && itemIndex === selectedItemIndex ? 'selected' : ''}`}
                      onClick={() => {
                        item.onSelect();
                        onClose();
                      }}
                      onMouseEnter={() => {
                        setSelectedGroupIndex(groupIndex);
                        setSelectedItemIndex(itemIndex);
                      }}
                    >
                      <div className="command-item-icon">
                        {item.icon}
                      </div>
                      <div className="command-item-label">
                        {item.label}
                      </div>
                      {item.shortcut && (
                        <div className="command-item-shortcut">
                          {item.shortcut}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="command-empty">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Command;
