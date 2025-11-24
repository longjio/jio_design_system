// src/pages/RatingPage.tsx
import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsRating from '../components/input/DsRating';

const RatingPage = () => {
  // DsRating Props 정의
  const ratingProps: PropDefinition[] = [
    {
      name: 'label',
      type: 'string',
      description: 'Rating 컴포넌트의 라벨입니다.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Rating 입력 필드의 name 속성입니다.',
    },
    {
      name: 'value',
      type: 'number | null',
      description: '현재 선택된 별점 값입니다. (제어 컴포넌트)',
    },
    {
      name: 'defaultValue',
      type: 'number | null',
      description: '초기 별점 값입니다. (비제어 컴포넌트)',
    },
    {
      name: 'onChange',
      type: '(event: React.SyntheticEvent, value: number | null) => void',
      description: '별점이 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: '5',
      description: '최대 별점 개수를 지정합니다.',
    },
    {
      name: 'precision',
      type: 'number',
      defaultValue: '1',
      description: '별점의 정밀도를 지정합니다. (예: 0.5는 반별 선택 가능)',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      defaultValue: "'medium'",
      description: 'Rating 컴포넌트의 크기를 결정합니다.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      defaultValue: 'false',
      description: '읽기 전용 모드로 설정합니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Rating을 비활성화 상태로 만듭니다.',
    },
    {
      name: 'highlightSelectedOnly',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 선택된 별만 강조 표시합니다.',
    },
  ];

  const basicCode = `
// Controlled component
const [value, setValue] = useState<number | null>(2);

<DsRating
  label="Controlled"
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
  `;

  const readOnlyCode = `
<DsRating label="Read Only" name="read-only" value={3.5} readOnly precision={0.5} />
  `;

  const disabledCode = `
<DsRating label="Disabled" name="disabled" value={3} disabled />
  `;

  const sizesCode = `
<DsRating label="Small" name="size-small" defaultValue={3} size="small" />
<DsRating label="Medium (default)" name="size-medium" defaultValue={3} />
<DsRating label="Large" name="size-large" defaultValue={3} size="large" />
  `;

  // Self-contained component for the interactive example
  const InteractiveRating = () => {
    const [value, setValue] = useState<number | null>(2);
    return (
      <DsRating
        label="Controlled"
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Rating은 별점이나 평점을 표시하고 입력받을 수 있는 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Basic Rating"
        description="A controlled rating component."
        component={<InteractiveRating />}
        code={basicCode}
      />
      <ComponentShowcase
        title="Read Only"
        description="The rating can be set to read-only."
        component={
          <DsRating label="Read Only" name="read-only" value={3.5} readOnly precision={0.5} />
        }
        code={readOnlyCode}
      />
      <ComponentShowcase
        title="Disabled"
        description="The rating can be disabled."
        component={
          <DsRating label="Disabled" name="disabled" value={3} disabled />
        }
        code={disabledCode}
      />
      <ComponentShowcase
        title="Sizes"
        description="The rating component can have different sizes."
        component={
          <Stack spacing={2}>
            <DsRating label="Small" name="size-small" defaultValue={3} size="small" />
            <DsRating label="Medium (default)" name="size-medium" defaultValue={3} />
            <DsRating label="Large" name="size-large" defaultValue={3} size="large" />
          </Stack>
        }
        code={sizesCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={ratingProps} title="DsRating Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default RatingPage;
