import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: '현재 슬라이더 값 (제어 컴포넌트로 사용 시)',
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 100 },
      description: '기본 슬라이더 값 (비제어 컴포넌트로 사용 시)',
    },
    min: {
      control: { type: 'number' },
      description: '최솟값',
    },
    max: {
      control: { type: 'number' },
      description: '최댓값',
    },
    step: {
      control: { type: 'number', min: 1 },
      description: '단계',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '슬라이더의 방향',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '슬라이더의 크기',
    },
    showValueLabel: {
      control: 'boolean',
      description: '값 레이블 표시 여부',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark', 'auto'],
      description: '테마 모드',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning'],
      description: '슬라이더의 색상 변형',
    },
    trackClickable: {
      control: 'boolean',
      description: '슬라이더 트랙 클릭 가능 여부',
    },
    thumbSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '슬라이더 썸(핸들) 크기',
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
    size: 'md',
    showValueLabel: false,
    theme: 'light',
    variant: 'primary',
    trackClickable: true,
    thumbSize: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// 기본 슬라이더
export const Default: Story = {
  args: {
    defaultValue: 30,
  },
  parameters: {
    docs: {
      description: {
        story: '기본적인 수평 슬라이더 컴포넌트입니다. 기본값은 30입니다.',
      },
    },
  },
};

// 수직 슬라이더
export const Vertical: Story = {
  args: {
    defaultValue: 50,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: '수직 방향의 슬라이더 컴포넌트입니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ height: '200px' }}>
      <Slider {...args} />
    </div>
  ),
};

// 값 레이블이 있는 슬라이더
export const WithValueLabel: Story = {
  args: {
    defaultValue: 40,
    showValueLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: '값 레이블이 표시되는 슬라이더 컴포넌트입니다.',
      },
    },
  },
};

// 다양한 크기의 슬라이더
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '다양한 크기(sm, md, lg)의 슬라이더 컴포넌트입니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <div>
        <p>Small</p>
        <Slider defaultValue={30} size="sm" />
      </div>
      <div>
        <p>Medium (기본)</p>
        <Slider defaultValue={50} size="md" />
      </div>
      <div>
        <p>Large</p>
        <Slider defaultValue={70} size="lg" />
      </div>
    </div>
  ),
};

// 다양한 색상 변형의 슬라이더
export const ColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: '다양한 색상 변형(default, primary, secondary, success, danger, warning)의 슬라이더 컴포넌트입니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <div>
        <p>Default</p>
        <Slider defaultValue={50} variant="default" />
      </div>
      <div>
        <p>Primary</p>
        <Slider defaultValue={50} variant="primary" />
      </div>
      <div>
        <p>Secondary</p>
        <Slider defaultValue={50} variant="secondary" />
      </div>
      <div>
        <p>Success</p>
        <Slider defaultValue={50} variant="success" />
      </div>
      <div>
        <p>Danger</p>
        <Slider defaultValue={50} variant="danger" />
      </div>
      <div>
        <p>Warning</p>
        <Slider defaultValue={50} variant="warning" />
      </div>
    </div>
  ),
};

// 다크 테마 슬라이더
export const DarkTheme: Story = {
  args: {
    defaultValue: 60,
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: '다크 테마가 적용된 슬라이더 컴포넌트입니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ background: '#1a202c', padding: '20px', borderRadius: '8px', width: '300px' }}>
      <Slider {...args} />
    </div>
  ),
};

// 비활성화된 슬라이더
export const Disabled: Story = {
  args: {
    defaultValue: 30,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 슬라이더 컴포넌트입니다. 사용자 상호작용이 불가능합니다.',
      },
    },
  },
};

// 제어 컴포넌트 예제
export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: '제어 컴포넌트로 사용되는 슬라이더 예제입니다. 외부 상태와 연동됩니다.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div style={{ width: '300px' }}>
        <p>현재 값: {value}</p>
        <Slider 
          value={value} 
          onChange={setValue} 
          onChangeComplete={(val) => console.log('변경 완료:', val)} 
        />
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setValue(Math.max(0, value - 10))}>- 10</button>
          <button onClick={() => setValue(Math.min(100, value + 10))} style={{ marginLeft: '10px' }}>+ 10</button>
          <button onClick={() => setValue(0)} style={{ marginLeft: '10px' }}>리셋</button>
        </div>
      </div>
    );
  },
};

// 커스텀 범위와 단계의 슬라이더
export const CustomRangeAndStep: Story = {
  args: {
    defaultValue: 0,
    min: -50,
    max: 50,
    step: 10,
    showValueLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 범위(-50 ~ 50)와 단계(10)를 가진 슬라이더 컴포넌트입니다.',
      },
    },
  },
};

// 툴팁이 있는 슬라이더
export const WithTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: '드래그 중 툴팁이 표시되는 슬라이더 컴포넌트입니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: '300px' }}>
      <p>슬라이더를 드래그해보세요.</p>
      <Slider defaultValue={50} />
    </div>
  ),
};

// 커스텀 포맷팅이 있는 슬라이더
export const CustomFormatting: Story = {
  args: {
    defaultValue: 50,
    showValueLabel: true,
    formatLabel: (value) => `${value}%`,
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 값 포맷팅이 적용된 슬라이더 컴포넌트입니다.',
      },
    },
  },
};

// 실제 사용 예시: 볼륨 컨트롤
export const VolumeControl: Story = {
  parameters: {
    docs: {
      description: {
        story: '볼륨 컨트롤로 사용되는 슬라이더 예제입니다.',
      },
    },
  },
  render: () => {
    const [volume, setVolume] = useState(80);
    
    return (
      <div style={{ width: '250px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span role="img" aria-label="volume-low">🔈</span>
          <Slider 
            value={volume} 
            onChange={setVolume} 
            variant="primary"
            size="sm"
          />
          <span role="img" aria-label="volume-high">🔊</span>
        </div>
        <div style={{ textAlign: 'center', fontSize: '14px' }}>
          볼륨: {volume}%
        </div>
      </div>
    );
  },
};

// 실제 사용 예시: 온도 설정
export const TemperatureSetting: Story = {
  parameters: {
    docs: {
      description: {
        story: '온도 설정에 사용되는 슬라이더 예제입니다.',
      },
    },
  },
  render: () => {
    const [temperature, setTemperature] = useState(22);
    
    // 온도에 따른 색상 변경
    const getColor = (temp: number) => {
      if (temp < 18) return 'secondary';
      if (temp > 25) return 'danger';
      return 'primary';
    };
    
    return (
      <div style={{ width: '280px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>온도 설정</h3>
        <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '20px' }}>
          {temperature}°C
        </div>
        <Slider 
          value={temperature} 
          onChange={setTemperature} 
          min={16}
          max={30}
          step={0.5}
          variant={getColor(temperature) as any}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px' }}>
          <span>16°C</span>
          <span>30°C</span>
        </div>
      </div>
    );
  },
}; 