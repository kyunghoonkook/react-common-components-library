import React, { useState, useRef, useEffect, useCallback, KeyboardEvent, ReactNode, useMemo } from 'react';
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
  /**
   * 항목의 설명 (선택 사항)
   */
  description?: string;
  /**
   * 항목의 키워드 (검색에 사용)
   */
  keywords?: string[];
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
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
  /**
   * 최근 사용 항목 수
   * @default 3
   */
  recentItemsCount?: number;
  /**
   * 검색 결과 최대 개수
   * @default 10
   */
  maxResults?: number;
  /**
   * 검색 딜레이 (ms)
   * @default 100
   */
  searchDelay?: number;
}

// 퍼지 검색 점수 계산 함수
const calculateFuzzyScore = (query: string, text: string): number => {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  if (text.includes(query)) return 2;
  if (text.split(' ').some(word => word.startsWith(query))) return 1;
  
  let score = 0;
  let lastIndex = -1;
  
  for (const char of query) {
    const index = text.indexOf(char, lastIndex + 1);
    if (index === -1) return 0;
    score += index - lastIndex;
    lastIndex = index;
  }
  
  return 1 / (score + 1);
};

/**
 * Command 컴포넌트는 키보드 기반의 명령어 팔레트를 제공합니다.
 */
const Command = React.memo<CommandProps>(({
  isOpen,
  onClose,
  groups,
  placeholder = "Type a command or search...",
  className = '',
  recentItemsCount = 3,
  maxResults = 10,
  searchDelay = 100,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [recentItems, setRecentItems] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 검색어에 따라 그룹 및 항목 필터링
  const filteredGroups = useMemo(() => {
    if (!searchQuery) {
      // 검색어가 없을 때는 최근 사용 항목을 먼저 보여줌
      const recentGroup = {
        label: 'Recent',
        items: groups
          .flatMap(g => g.items)
          .filter(item => recentItems.has(item.id))
          .slice(0, recentItemsCount)
      };

      return recentGroup.items.length > 0
        ? [recentGroup, ...groups]
        : groups;
    }

    // 퍼지 검색 수행
    return groups
      .map(group => ({
        ...group,
        items: group.items
          .map(item => {
            const labelScore = calculateFuzzyScore(searchQuery, item.label);
            const keywordScore = (item.keywords || [])
              .map(keyword => calculateFuzzyScore(searchQuery, keyword))
              .reduce((max, score) => Math.max(max, score), 0);
            return {
              item,
              score: Math.max(labelScore, keywordScore)
            };
          })
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, maxResults)
          .map(({ item }) => item)
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery, groups, recentItems, recentItemsCount, maxResults]);

  // 선택된 항목 표시 및 스크롤 처리
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 선택된 항목이 변경될 때 스크롤 처리
  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.querySelector('[aria-selected="true"]');
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedGroupIndex, selectedItemIndex]);

  // ESC 키로 닫기 및 키보드 탐색 처리
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      // 단축키 처리
      if (e.metaKey || e.ctrlKey) {
        const item = filteredGroups
          .flatMap(g => g.items)
          .find(item => item.shortcut?.toLowerCase() === e.key.toLowerCase());

        if (item) {
          e.preventDefault();
          item.onSelect();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredGroups]);

  // 오버레이 클릭 시 닫기
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // 항목 선택 처리
  const handleSelect = useCallback((item: CommandItem) => {
    if (item.disabled) return;

    // 최근 사용 항목에 추가
    setRecentItems(prev => {
      const next = new Set(prev);
      next.add(item.id);
      if (next.size > recentItemsCount) {
        const firstItem = next.values().next().value;
        next.delete(firstItem);
      }
      return next;
    });

    item.onSelect();
    onClose();
  }, [onClose, recentItemsCount]);

  // 키보드 탐색 처리
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredGroups.length === 0) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        let nextGroupIndex = selectedGroupIndex;
        let nextItemIndex = selectedItemIndex + 1;

        while (nextGroupIndex < filteredGroups.length) {
          if (nextItemIndex < filteredGroups[nextGroupIndex].items.length) {
            if (!filteredGroups[nextGroupIndex].items[nextItemIndex].disabled) {
              break;
            }
          }
          nextItemIndex++;
          if (nextItemIndex >= filteredGroups[nextGroupIndex].items.length) {
            nextGroupIndex++;
            nextItemIndex = 0;
          }
        }

        if (nextGroupIndex >= filteredGroups.length) {
          nextGroupIndex = 0;
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

        while (nextGroupIndex >= 0) {
          if (nextItemIndex >= 0) {
            if (!filteredGroups[nextGroupIndex].items[nextItemIndex].disabled) {
              break;
            }
          }
          nextItemIndex--;
          if (nextItemIndex < 0) {
            nextGroupIndex--;
            if (nextGroupIndex >= 0) {
              nextItemIndex = filteredGroups[nextGroupIndex].items.length - 1;
            }
          }
        }

        if (nextGroupIndex < 0) {
          nextGroupIndex = filteredGroups.length - 1;
          nextItemIndex = filteredGroups[nextGroupIndex].items.length - 1;
        }

        setSelectedGroupIndex(nextGroupIndex);
        setSelectedItemIndex(nextItemIndex);
        break;
      }
      case 'Enter': {
        e.preventDefault();
        if (filteredGroups.length > 0 && filteredGroups[selectedGroupIndex]?.items[selectedItemIndex]) {
          handleSelect(filteredGroups[selectedGroupIndex].items[selectedItemIndex]);
        }
        break;
      }
      case 'Tab': {
        e.preventDefault();
        if (e.shiftKey) {
          handleKeyDown({ ...e, key: 'ArrowUp' } as KeyboardEvent<HTMLInputElement>);
        } else {
          handleKeyDown({ ...e, key: 'ArrowDown' } as KeyboardEvent<HTMLInputElement>);
        }
        break;
      }
    }
  }, [filteredGroups, selectedGroupIndex, selectedItemIndex, handleSelect]);

  if (!isOpen) return null;

  return (
    <div 
      className="command-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
    >
      <div 
        className={`command ${className}`}
        ref={containerRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="command-list"
      >
        <div className="command-input-wrapper">
          <span className="command-input-icon" aria-hidden="true">
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
            role="searchbox"
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={
              filteredGroups[selectedGroupIndex]?.items[selectedItemIndex]
                ? `command-item-${filteredGroups[selectedGroupIndex].items[selectedItemIndex].id}`
                : undefined
            }
          />
        </div>
        
        <div 
          className="command-content"
          ref={listRef}
          id="command-list"
          role="listbox"
          aria-label="Commands"
        >
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group, groupIndex) => (
              <div 
                key={group.label} 
                className="command-group"
                role="group"
                aria-labelledby={`command-group-${groupIndex}`}
              >
                <div 
                  id={`command-group-${groupIndex}`}
                  className="command-group-heading"
                  role="presentation"
                >
                  {group.label}
                </div>
                <div className="command-group-items">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      id={`command-item-${item.id}`}
                      className={`command-item ${
                        groupIndex === selectedGroupIndex && itemIndex === selectedItemIndex ? 'selected' : ''
                      } ${item.disabled ? 'disabled' : ''}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => {
                        if (!item.disabled) {
                          setSelectedGroupIndex(groupIndex);
                          setSelectedItemIndex(itemIndex);
                        }
                      }}
                      role="option"
                      aria-selected={groupIndex === selectedGroupIndex && itemIndex === selectedItemIndex}
                      aria-disabled={item.disabled}
                    >
                      <div className="command-item-icon" aria-hidden="true">
                        {item.icon}
                      </div>
                      <div className="command-item-content">
                        <div className="command-item-label">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="command-item-description">
                            {item.description}
                          </div>
                        )}
                      </div>
                      {item.shortcut && (
                        <div className="command-item-shortcut" aria-hidden="true">
                          {item.shortcut}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="command-empty" role="status">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Command.displayName = 'Command';

export default Command;
