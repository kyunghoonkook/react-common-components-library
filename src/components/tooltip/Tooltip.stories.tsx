import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { Button } from '../../index';
import TooltipExample from './TooltipExample';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus'],
    },
    delayShow: { control: 'number' },
    delayHide: { control: 'number' },
    arrow: { control: 'boolean' },
    defaultVisible: { control: 'boolean' },
    visible: { control: 'boolean' },
    onVisibleChange: { action: 'visibleChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 기본 템플릿
const Template: Story = {
  args: {
    content: '툴팁 내용입니다',
    placement: 'top',
    size: 'md',
    arrow: true,
    children: <Button>마우스를 올려보세요</Button>,
  },
};

export const Default: Story = {
  ...Template,
};

export const Placements: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '100px 100px 100px',
      gap: '30px',
      padding: '50px',
      width: '400px',
      height: '300px',
      placeItems: 'center'
    }}>
      <div style={{ gridColumn: '2', gridRow: '1' }}>
        <Tooltip content="상단 툴팁" placement="top">
          <Button>상단</Button>
        </Tooltip>
      </div>
      <div style={{ gridColumn: '1', gridRow: '2' }}>
        <Tooltip content="좌측 툴팁" placement="left">
          <Button>좌측</Button>
        </Tooltip>
      </div>
      <div style={{ gridColumn: '3', gridRow: '2' }}>
        <Tooltip content="우측 툴팁" placement="right">
          <Button>우측</Button>
        </Tooltip>
      </div>
      <div style={{ gridColumn: '2', gridRow: '3' }}>
        <Tooltip content="하단 툴팁" placement="bottom">
          <Button>하단</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="작은 크기" size="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="중간 크기" size="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="큰 크기" size="lg">
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
};

export const Triggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="호버 시 표시" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip content="클릭 시 표시" trigger="click">
        <Button>Click</Button>
      </Tooltip>
      <Tooltip content="포커스 시 표시" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="화살표 있음" arrow={true}>
        <Button>화살표 있음</Button>
      </Tooltip>
      <Tooltip content="화살표 없음" arrow={false}>
        <Button>화살표 없음</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="표시 딜레이: 500ms / 숨김 딜레이: 200ms" delayShow={500} delayHide={200}>
        <Button>딜레이 옵션</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Tooltip content="이것은 매우 긴 텍스트 내용입니다. 툴팁은 길이가 긴 텍스트를 표시할 때 자동으로 여러 줄로 나뉘어 표시됩니다. 텍스트가 충분히 길면 텍스트가 줄바꿈됩니다.">
        <Button>긴 텍스트</Button>
      </Tooltip>
    </div>
  ),
};

export const ControlledTooltip: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <Button onClick={() => setVisible(!visible)}>
          {visible ? '툴팁 숨기기' : '툴팁 표시하기'}
        </Button>
        <div style={{ marginTop: '20px' }}>
          <Tooltip
            content="controlled 모드 툴팁"
            visible={visible}
            onVisibleChange={setVisible}
          >
            <Button>Controlled 툴팁</Button>
          </Tooltip>
        </div>
      </div>
    );
  },
};

export const AllExamples: Story = {
  render: () => <TooltipExample />
}; 