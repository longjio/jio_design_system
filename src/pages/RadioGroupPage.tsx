// src/pages/RadioGroupPage.tsx
import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import { DsRadioGroup } from '../components/input/DsRadioGroup';

const RadioGroupPage = () => {
  // DsRadioGroup Props 정의
  const radioGroupProps: PropDefinition[] = [
    {
      name: 'label',
      type: 'string',
      description: 'Radio Group의 라벨입니다.',
    },
    {
      name: 'items',
      type: 'Array<{ label: string, value: string, disabled?: boolean }>',
      description: '선택 가능한 라디오 버튼 아이템 목록입니다.',
    },
    {
      name: 'value',
      type: 'string',
      description: '현재 선택된 값입니다.',
    },
    {
      name: 'onChange',
      type: '(event: React.ChangeEvent<HTMLInputElement>, value: string) => void',
      description: '선택값이 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Radio Group의 name 속성입니다. 같은 name을 가진 라디오 버튼들이 하나의 그룹을 형성합니다.',
    },
    {
      name: 'row',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 라디오 버튼들이 가로로 배치됩니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '전체 Radio Group을 비활성화 상태로 만듭니다.',
    },
  ];

  const radioItems = [
    { label: 'First Option', value: 'first' },
    { label: 'Second Option', value: 'second' },
    { label: 'Third Option', value: 'third' },
  ];

  const verticalCode = `
const radioItems = [
  { label: 'First Option', value: 'first' },
  { label: 'Second Option', value: 'second' },
  { label: 'Third Option', value: 'third' },
];

// In your component...
const [selectedValue, setSelectedValue] = useState('first');

<DsRadioGroup
  label="Vertical Group"
  items={radioItems}
  value={selectedValue}
  onChange={(e, value) => setSelectedValue(value)}
  name="vertical-group"
/>
  `;

  const horizontalCode = `
const radioItems = [
  { label: 'First Option', value: 'first' },
  { label: 'Second Option', value: 'second' },
  { label: 'Third Option', value: 'third' },
];

// In your component...
const [selectedValue, setSelectedValue] = useState('first');

<DsRadioGroup
  row
  label="Horizontal Group"
  items={radioItems}
  value={selectedValue}
  onChange={(e, value) => setSelectedValue(value)}
  name="horizontal-group"
/>
  `;

  const disabledCode = `
<DsRadioGroup
  disabled
  label="Disabled Group"
  items={radioItems}
  value="first"
  name="disabled-group"
  onChange={() => {}} // onChange is required, even when disabled
/>
  `;

  // Self-contained component for interactive examples
  const InteractiveRadioGroup = ({ row = false, name }: { row?: boolean, name: string }) => {
    const [value, setValue] = useState('first');
    return (
      <DsRadioGroup
        row={row}
        label={row ? "Horizontal Group" : "Vertical Group"}
        items={radioItems}
        value={value}
        onChange={(e, val) => setValue(val)}
        name={name}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Radio Group은 여러 옵션 중 하나만 선택할 수 있게 하는 입력 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
          title="Radio Group (Vertical)"
        description="The default layout for the radio group is vertical."
        component={<InteractiveRadioGroup name="vertical-group" />}
        code={verticalCode}
      />
      <ComponentShowcase
        title="Radio Group (Horizontal)"
        description="Use the 'row' prop to display the radio buttons in a single line."
        component={<InteractiveRadioGroup row name="horizontal-group" />}
        code={horizontalCode}
      />
      <ComponentShowcase
        title="Disabled Radio Group"
        description="The entire group can be disabled using the 'disabled' prop."
        component={
          <DsRadioGroup
            disabled
            label="Disabled Group"
            items={radioItems}
            value="first"
            name="disabled-group"
            onChange={() => {}}
          />
        }
        code={disabledCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={radioGroupProps} title="DsRadioGroup Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default RadioGroupPage;
