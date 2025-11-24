// src/pages/SelectPage.tsx
import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import { DsSelect, DsSelectItem } from '../components/input/DsSelect';

const SelectPage = () => {
  // DsSelect Props 정의
  const selectProps: PropDefinition[] = [
    {
      name: 'label',
      type: 'string',
      description: 'Select 필드의 라벨입니다.',
    },
    {
      name: 'items',
      type: 'DsSelectItem[]',
      description: '선택 가능한 아이템 목록입니다. { label: string, value: string | number, disabled?: boolean } 형태입니다.',
    },
    {
      name: 'value',
      type: 'string | number',
      description: '현재 선택된 값입니다.',
    },
    {
      name: 'onChange',
      type: '(event: SelectChangeEvent<string | number>) => void',
      description: '선택값이 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'variant',
      type: "'outlined' | 'filled' | 'standard'",
      defaultValue: "'outlined'",
      description: 'Select의 시각적 스타일을 결정합니다.',
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      defaultValue: "'medium'",
      description: 'Select의 크기를 결정합니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Select를 비활성화 상태로 만듭니다.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: '에러 상태를 표시합니다.',
    },
    {
      name: 'helperText',
      type: 'string',
      description: '필드 아래에 표시될 도움말 텍스트입니다.',
    },
    {
      name: 'formControlSx',
      type: 'SxProps',
      description: 'FormControl에 적용할 스타일입니다.',
    },
  ];

  const selectItems: DsSelectItem[] = [
    { label: 'Ten', value: 10 },
    { label: 'Twenty', value: 20 },
    { label: 'Thirty', value: 30 },
    { label: 'Forty (Disabled)', value: 40, disabled: true },
  ];

  const basicCode = `
const selectItems: DsSelectItem[] = [
  { label: 'Ten', value: 10 },
  { label: 'Twenty', value: 20 },
  // ...
];

// In your component...
const [age, setAge] = useState<string | number>(10);

<DsSelect
  label="Age"
  value={age}
  onChange={(e) => setAge(e.target.value)}
  items={selectItems}
  formControlSx={{ minWidth: 120 }}
/>
  `;

  const variantsCode = `
<DsSelect
  variant="outlined"
  label="Outlined"
  value={10}
  onChange={() => {}}
  items={selectItems}
  formControlSx={{ minWidth: 120 }}
/>
<DsSelect
  variant="standard"
  label="Standard"
  value={10}
  onChange={() => {}}
  items={selectItems}
  formControlSx={{ minWidth: 120 }}
/>
  `;

  const statesCode = `
<DsSelect
  label="Error"
  value={10}
  onChange={() => {}}
  items={selectItems}
  error
  helperText="Incorrect entry."
  formControlSx={{ minWidth: 220 }}
/>
<DsSelect
  label="Disabled"
  value={10}
  onChange={() => {}}
  items={selectItems}
  disabled
  formControlSx={{ minWidth: 120 }}
/>
  `;

  const sizesCode = `
<DsSelect
  label="Small"
  value={10}
  onChange={() => {}}
  items={selectItems}
  size="small"
  formControlSx={{ minWidth: 120 }}
/>
<DsSelect
  label="Medium"
  value={10}
  onChange={() => {}}
  items={selectItems}
  size="medium"
  formControlSx={{ minWidth: 120 }}
/>
  `;

  // Self-contained component for the interactive example
  const InteractiveSelect = () => {
    const [value, setValue] = useState<string | number>(10);
    return (
      <DsSelect
        label="Age"
        value={value}
        onChange={(e: SelectChangeEvent<string | number>) => setValue(e.target.value)}
        items={selectItems}
        formControlSx={{ minWidth: 120 }}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Select는 드롭다운 목록에서 하나의 값을 선택할 수 있는 입력 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Basic Select"
        description="A controlled select component."
        component={<InteractiveSelect />}
        code={basicCode}
      />
      <ComponentShowcase
        title="Variants"
        description="The Select component supports 'outlined' and 'standard' variants."
        component={
          <Stack direction="row" spacing={2}>
            <DsSelect
              variant="outlined"
              label="Outlined"
              value={10}
              onChange={() => {}}
              items={selectItems}
              formControlSx={{ minWidth: 120 }}
            />
            <DsSelect
              variant="standard"
              label="Standard"
              value={10}
              onChange={() => {}}
              items={selectItems}
              formControlSx={{ minWidth: 120 }}
            />
          </Stack>
        }
        code={variantsCode}
      />
      <ComponentShowcase
        title="States (Error, Disabled)"
        description="The Select component can be set to an error or disabled state."
        component={
          <Stack direction="row" spacing={2}>
            <DsSelect
              label="Error"
              value={10}
              onChange={() => {}}
              items={selectItems}
              error
              helperText="Incorrect entry."
              formControlSx={{ minWidth: 220 }}
            />
            <DsSelect
              label="Disabled"
              value={10}
              onChange={() => {}}
              items={selectItems}
              disabled
              formControlSx={{ minWidth: 120 }}
            />
          </Stack>
        }
        code={statesCode}
      />
      <ComponentShowcase
        title="Sizes"
        description="The Select component supports 'small' and 'medium' sizes."
        component={
          <Stack direction="row" spacing={2} alignItems="center">
            <DsSelect
              label="Small"
              value={10}
              onChange={() => {}}
              items={selectItems}
              size="small"
              formControlSx={{ minWidth: 120 }}
            />
            <DsSelect
              label="Medium"
              value={10}
              onChange={() => {}}
              items={selectItems}
              size="medium"
              formControlSx={{ minWidth: 120 }}
            />
          </Stack>
        }
        code={sizesCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={selectProps} title="DsSelect Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default SelectPage;
