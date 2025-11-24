// src/pages/StepperPage.tsx
import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsStepper, { StepItem } from '../components/navigation/DsStepper';

const StepperPage = () => {
  // DsStepper Props 정의
  const stepperProps: PropDefinition[] = [
    {
      name: 'steps',
      type: 'StepItem[]',
      description: 'Stepper에 표시할 단계 배열입니다. { label: string, optional?: boolean } 형태입니다.',
    },
    {
      name: 'stepContents',
      type: 'React.ReactNode[]',
      description: '각 단계에 표시될 콘텐츠 배열입니다.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Stepper의 방향을 지정합니다.',
    },
    {
      name: 'alternativeLabel',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 라벨이 아이콘 아래에 위치합니다. (horizontal에서만 적용)',
    },
    {
      name: 'activeStep',
      type: 'number',
      description: '현재 활성화된 단계의 인덱스입니다. (제어 컴포넌트)',
    },
    {
      name: 'defaultActiveStep',
      type: 'number',
      defaultValue: '0',
      description: '초기 활성화된 단계의 인덱스입니다. (비제어 컴포넌트)',
    },
  ];

  // Stepper에 공통적으로 사용할 단계 정보
  const steps: StepItem[] = [
    { label: 'Select campaign settings' },
    { label: 'Create an ad group', optional: true },
    { label: 'Create an ad' },
  ];

  // 각 단계에 공통적으로 보여줄 컨텐츠
  const stepContents: React.ReactNode[] = [
    <Box>
      <Typography>Step 1: Campaign Settings</Typography>
      <TextField label="Campaign Name" variant="outlined" fullWidth margin="normal" />
    </Box>,
    <Box>
      <Typography>Step 2: Ad Group (Optional)</Typography>
      <TextField label="Ad Group Name" variant="outlined" fullWidth margin="normal" />
    </Box>,
    <Box>
      <Typography>Step 3: Ad Creation</Typography>
      <TextField label="Ad Headline" variant="outlined" fullWidth margin="normal" />
    </Box>,
  ];

  const horizontalCode = `
const steps: StepItem[] = [
  { label: 'Select campaign settings' },
  { label: 'Create an ad group', optional: true },
  { label: 'Create an ad' },
];

const stepContents: React.ReactNode[] = [
  <div>Content for Step 1</div>,
  <div>Content for Step 2</div>,
  <div>Content for Step 3</div>,
];

<DsStepper steps={steps} stepContents={stepContents} />
  `;

  const verticalCode = `
const steps: StepItem[] = [
  { label: 'Select campaign settings' },
  { label: 'Create an ad group', optional: true },
  { label: 'Create an ad' },
];

const stepContents: React.ReactNode[] = [
  <div>Content for Step 1</div>,
  <div>Content for Step 2</div>,
  <div>Content for Step 3</div>,
];

<DsStepper
  steps={steps}
  stepContents={stepContents}
  orientation="vertical"
/>
  `;

  const alternativeLabelCode = `
const steps: StepItem[] = [
  { label: 'Select campaign settings' },
  { label: 'Create an ad group', optional: true },
  { label: 'Create an ad' },
];

const stepContents: React.ReactNode[] = [
  <div>Content for Step 1</div>,
  <div>Content for Step 2</div>,
  <div>Content for Step 3</div>,
];

<DsStepper
  steps={steps}
  stepContents={stepContents}
  alternativeLabel
/>
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Stepper는 여러 단계로 이루어진 프로세스의 진행 상황을 표시하는 내비게이션 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
          title="Horizontal Stepper"
          description="The default stepper displays progress horizontally."
          component={
            <DsStepper steps={steps} stepContents={stepContents} />
          }
          code={horizontalCode}
        />
        <ComponentShowcase
          title="Vertical Stepper"
          description="Steppers can be displayed vertically by setting the orientation prop."
          component={
            <DsStepper
              steps={steps}
              stepContents={stepContents}
              orientation="vertical"
            />
          }
          code={verticalCode}
        />
        <ComponentShowcase
          title="Alternative Label Stepper"
          description="The alternativeLabel prop positions the label below the step icon."
          component={
            <DsStepper
              steps={steps}
              stepContents={stepContents}
              alternativeLabel
            />
          }
          code={alternativeLabelCode}
        />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={stepperProps} title="DsStepper Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default StepperPage;
