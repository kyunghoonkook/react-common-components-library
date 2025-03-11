import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ScrollArea, { ScrollAreaRef } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: '스크롤 방향',
    },
    autoHide: {
      control: 'boolean',
      description: '스크롤바 자동 숨김 여부',
    },
    hideDelay: {
      control: 'number', 
      description: '스크롤바 자동 숨김 지연 시간 (ms)',
    },
    scrollbarPosition: {
      control: 'select',
      options: ['inside', 'outside'],
      description: '스크롤바 위치',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: '테마 모드',
    },
    scrollbarSize: {
      control: 'number',
      description: '스크롤바 두께 (px)',
    },
    scrollbarRadius: {
      control: 'number',
      description: '스크롤바 가장자리 둥글기 (px)',
    },
    disableAnimation: {
      control: 'boolean',
      description: '애니메이션 비활성화 여부',
    },
    disableUserScroll: {
      control: 'boolean',
      description: '사용자 스크롤 비활성화 여부',
    },
    disableShadow: {
      control: 'boolean',
      description: '그림자 비활성화 여부',
    },
    backgroundColor: {
      control: 'color',
      description: '배경 색상',
    },
    textColor: {
      control: 'color',
      description: '텍스트 색상',
    },
    borderColor: {
      control: 'color',
      description: '보더 색상',
    },
    shadowColor: {
      control: 'color',
      description: '그림자 색상',
    },
    onScroll: {
      action: 'scrolled',
      description: '스크롤 이벤트 핸들러',
    },
    onScrollEnd: {
      action: 'scrollEnded',
      description: '스크롤 종료 이벤트 핸들러',
    },
  },
  args: {
    onScroll: fn(),
    onScrollEnd: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

// 기본 예제 (shadcn/ui 스타일)
export const Default: Story = {
  args: {
    height: 200,
    width: 350,
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">태그</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: i > 0 ? '8px' : 0 }}>
            태그 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 가로 스크롤 예제
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    width: 350,
    height: 'auto',
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: '100px', 
              height: '100px', 
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: i % 2 === 0 ? '#f4f4f5' : '#e4e4e7',
              border: '1px solid #e4e4e7',
              borderRadius: '4px',
              marginRight: '8px',
              fontWeight: 500,
            }}
          >
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 양방향 스크롤 예제
export const Both: Story = {
  args: {
    orientation: 'both',
    height: 300,
    width: 400,
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div style={{ width: '850px', padding: '16px' }}>
        <h4 className="mb-4 text-sm font-medium leading-none">표 예제</h4>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {Array.from({ length: 10 }).map((_, i) => (
                <th key={i} style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 600 }}>
                  칼럼 {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 10 }).map((_, colIndex) => (
                  <td key={colIndex} style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                    셀 {rowIndex + 1}-{colIndex + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  ),
};

// 댓글 목록 예제
export const Comments: Story = {
  args: {
    height: 300,
    width: 400,
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">댓글</h4>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              padding: '12px 0', 
              borderBottom: i < 19 ? '1px solid #e2e8f0' : 'none', 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '9999px', 
                  backgroundColor: '#cbd5e1', 
                  marginRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              >
                {String.fromCharCode(65 + (i % 26))}
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>사용자 {i + 1}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
              댓글 내용이 여기에 표시됩니다. 이것은 예시 댓글입니다. 스크롤 영역에서 어떻게 표시되는지 보여주기 위한 예시입니다.
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 자동 숨김 비활성화 예제
export const NoAutoHide: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    autoHide: false,
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">항상 표시 스크롤바</h4>
        <p className="text-sm">이 예제에서는 스크롤바가 항상 표시됩니다 (자동 숨김 비활성화).</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: '8px' }}>
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 커스텀 색상 예제
export const CustomColors: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    thumbColor: 'rgba(14, 165, 233, 0.4)',
    thumbHoverColor: 'rgba(14, 165, 233, 0.6)',
    thumbDragColor: 'rgba(14, 165, 233, 0.8)',
    borderColor: 'rgba(14, 165, 233, 0.2)',
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">커스텀 색상</h4>
        <p className="text-sm">이 예제는 스카이 블루 색상의 스크롤바를 보여줍니다.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: '8px' }}>
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 외부 스크롤바 예제
export const OutsideScrollbar: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    scrollbarPosition: 'outside',
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">외부 스크롤바</h4>
        <p className="text-sm">이 예제는 컨텐츠 영역 외부에 위치한 스크롤바를 보여줍니다.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: '8px' }}>
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 다크 테마 예제
export const DarkTheme: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    theme: 'dark',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div style={{ padding: '16px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 500, lineHeight: 1 }}>다크 테마</h4>
        <p style={{ fontSize: '14px' }}>이 예제는 다크 테마에서의 스크롤바를 보여줍니다.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ fontSize: '14px', paddingTop: '8px' }}>
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 그림자 없는 예제
export const NoShadow: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    disableShadow: true,
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">그림자 없음</h4>
        <p className="text-sm">이 예제는 그림자가 없는 스크롤 영역을 보여줍니다.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: '8px' }}>
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 커스텀 배경 및 텍스트 색상 예제
export const CustomBackground: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    backgroundColor: '#f0f9ff',
    borderColor: '#bae6fd',
    thumbColor: 'rgba(14, 165, 233, 0.4)',
    thumbHoverColor: 'rgba(14, 165, 233, 0.6)',
    thumbDragColor: 'rgba(14, 165, 233, 0.8)',
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">커스텀 배경</h4>
        <p className="text-sm">이 예제는 커스텀 배경 색상을 가진 스크롤 영역을 보여줍니다.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm" style={{ paddingTop: '8px' }}>
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// 프로그래매틱 스크롤 예제
export const ProgrammaticScroll: Story = {
  args: {
    width: 350,
    height: 250,
    orientation: 'vertical',
    className: 'rounded-md',
    onScroll: fn(),
    onScrollEnd: fn(),
  },
  render: (args) => {
    const scrollAreaRef = useRef<ScrollAreaRef>(null);
    
    const handleScrollToTop = () => {
      scrollAreaRef.current?.scrollToTop();
    };
    
    const handleScrollToBottom = () => {
      scrollAreaRef.current?.scrollToBottom();
    };
    
    const handleScrollToPosition = () => {
      scrollAreaRef.current?.scrollTo({ top: 150 });
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            style={{ 
              padding: '6px 10px', 
              fontSize: '14px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderRadius: '4px' 
            }} 
            onClick={handleScrollToTop}
          >
            맨 위로
          </button>
          <button 
            style={{ 
              padding: '6px 10px', 
              fontSize: '14px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderRadius: '4px' 
            }} 
            onClick={handleScrollToBottom}
          >
            맨 아래로
          </button>
          <button 
            style={{ 
              padding: '6px 10px', 
              fontSize: '14px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderRadius: '4px' 
            }} 
            onClick={handleScrollToPosition}
          >
            중간 위치로
          </button>
        </div>
        <ScrollArea {...args} ref={scrollAreaRef}>
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">프로그래매틱 스크롤</h4>
            <p className="text-sm">이 예제는 버튼을 사용하여 프로그래매틱 방식으로 스크롤 위치를 제어합니다.</p>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="text-sm" style={{ paddingTop: '8px' }}>
                항목 {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  },
};

// 태그 목록 예제
export const TagsList: Story = {
  args: {
    width: '320px',
    height: '400px',
    scrollbarSize: 4,
    scrollbarRadius: 4,
    thumbColor: 'rgba(0, 0, 0, 0.2)',
    thumbHoverColor: 'rgba(0, 0, 0, 0.3)',
    thumbDragColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(229, 231, 235, 0.5)',
    shadowColor: 'rgba(0, 0, 0, 0.03)',
    children: (
      <div>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '600',
          margin: '0 0 1.5rem',
          padding: '0 0.5rem'
        }}>
          Tags
        </h2>
        <div className="tag-list">
          <div className="tag-item">v1.2.0-beta.50</div>
          <div className="tag-item">v1.2.0-beta.48</div>
          <div className="tag-item">v1.2.0-beta.47</div>
          <div className="tag-item">v1.2.0-beta.46</div>
          <div className="tag-item">v1.2.0-beta.45</div>
          <div className="tag-item">v1.2.0-beta.44</div>
          <div className="tag-item">v1.2.0-beta.43</div>
          <div className="tag-item">v1.2.0-beta.42</div>
          <div className="tag-item">v1.2.0-beta.41</div>
          <div className="tag-item">v1.2.0-beta.40</div>
          <div className="tag-item">v1.2.0-beta.39</div>
          <div className="tag-item">v1.2.0-beta.38</div>
          <div className="tag-item">v1.2.0-beta.37</div>
          <div className="tag-item">v1.2.0-beta.36</div>
          <div className="tag-item">v1.2.0-beta.35</div>
        </div>
      </div>
    ),
  },
}; 