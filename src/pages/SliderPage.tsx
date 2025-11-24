// src/pages/SliderPage.tsx
import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import { DsSlider } from '../components/input/DsSlider';

const SliderPage = () => {
  // DsSlider Props 정의
  const sliderProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'number | number[]',
      description: '현재 슬라이더 값입니다. 배열을 사용하면 범위 슬라이더가 됩니다. (제어 컴포넌트)',
    },
    {
      name: 'defaultValue',
      type: 'number | number[]',
      description: '초기 슬라이더 값입니다. (비제어 컴포넌트)',
    },
    {
      name: 'onChange',
      type: '(event: Event, value: number | number[], activeThumb: number) => void',
      description: '슬라이더 값이 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'min',
      type: 'number',
      defaultValue: '0',
      description: '슬라이더의 최소값을 지정합니다.',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: '100',
      description: '슬라이더의 최대값을 지정합니다.',
    },
    {
      name: 'step',
      type: 'number | null',
      defaultValue: '1',
      description: '슬라이더의 증감 단위를 지정합니다. null로 설정하면 연속값을 허용합니다.',
    },
    {
      name: 'marks',
      type: 'boolean | Mark[]',
      defaultValue: 'false',
      description: 'true로 설정하면 step 위치에 마크를 표시합니다. 배열로 사용자 정의 마크를 지정할 수 있습니다.',
    },
    {
      name: 'valueLabelDisplay',
      type: "'on' | 'auto' | 'off'",
      defaultValue: "'off'",
      description: '값 레이블의 표시 방식을 결정합니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Slider를 비활성화 상태로 만듭니다.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: '슬라이더의 방향을 지정합니다.',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary'",
      defaultValue: "'primary'",
      description: '슬라이더의 색상을 결정합니다.',
    },
    {
      name: 'track',
      type: "'normal' | false | 'inverted'",
      defaultValue: "'normal'",
      description: '트랙의 표시 방식을 지정합니다.',
    },
  ];

  const continuousCode = `
// In your component...
const [value, setValue] = useState<number>(30);

<DsSlider
  aria-label="Volume"
  value={value}
  onChange={(e, newValue) => setValue(newValue as number)}
/>
  `;

  const stepsCode = `
<DsSlider
  aria-label="Temperature"
  value={30}
  onChange={() => {}}
  step={10}
  marks
  min={10}
  max={110}
  valueLabelDisplay="auto"
/>
  `;

  const rangeCode = `
// In your component...
const [value, setValue] = useState<number[]>([20, 37]);

<DsSlider
  aria-label="Temperature range"
  value={value}
  onChange={(e, newValue) => setValue(newValue as number[])}
  valueLabelDisplay="auto"
/>
  `;

  const disabledCode = `
<DsSlider aria-label="Disabled slider" disabled value={30} onChange={() => {}} />
  `;

  // Self-contained components for interactive examples
  const InteractiveContinuousSlider = () => {
    const [value, setValue] = useState<number>(30);
    return (
      <DsSlider
        aria-label="Volume"
        value={value}
        onChange={(e, newValue) => setValue(newValue as number)}
      />
    );
  };

  const InteractiveRangeSlider = () => {
    const [value, setValue] = useState<number[]>([20, 37]);
    return (
      <DsSlider
        aria-label="Temperature range"
        value={value}
        onChange={(e, newValue) => setValue(newValue as number[])}
        valueLabelDisplay="auto"
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Slider는 범위 내에서 값을 선택하거나 조정할 수 있는 입력 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Continuous Slider"
        description="A slider for selecting a value from a continuous range."
        component={
          <Box sx={{ width: 300 }}>
            <InteractiveContinuousSlider />
          </Box>
        }
        code={continuousCode}
      />
      <ComponentShowcase
        title="Slider with Steps"
        description="The slider can be forced to snap to discrete values using the 'step' and 'marks' props."
        component={
          <Box sx={{ width: 300 }}>
            <DsSlider
              aria-label="Temperature"
              value={30}
              onChange={() => {}}
              step={10}
              marks
              min={10}
              max={110}
              valueLabelDisplay="auto"
            />
          </Box>
        }
        code={stepsCode}
      />
      <ComponentShowcase
        title="Range Slider"
        description="The slider can be used to set a range of values."
        component={
          <Box sx={{ width: 300 }}>
            <InteractiveRangeSlider />
          </Box>
        }
        code={rangeCode}
      />
      <ComponentShowcase
        title="Disabled Slider"
        description="The slider can be disabled."
        component={
          <Box sx={{ width: 300 }}>
<DsSlider aria-label="Disabled slider" disabled value={30} onChange={() => {}} />
          </Box>
        }
        code={disabledCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={sliderProps} title="DsSlider Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default SliderPage;
