// src/pages/ButtonGroupPage.tsx
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import { DsButtonGroup } from '../components/button/DsButtonGroup';
import { DsButton } from '../components/button/DsButton';

const ButtonGroupPage = () => {
  // DsButtonGroup Props 정의
  const buttonGroupProps: PropDefinition[] = [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: '그룹에 포함될 DsButton 컴포넌트들입니다.',
    },
    {
      name: 'variant',
      type: "'contained' | 'outlined' | 'text'",
      defaultValue: "'contained'",
      description: '버튼 그룹의 시각적 스타일을 결정합니다.',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'",
      defaultValue: "'primary'",
      description: '버튼 그룹의 색상을 결정합니다.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      defaultValue: "'medium'",
      description: '버튼 그룹의 크기를 결정합니다.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: '버튼들의 배치 방향을 결정합니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '전체 버튼 그룹을 비활성화 상태로 만듭니다.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: '버튼 그룹이 부모 요소의 전체 너비를 차지하도록 합니다.',
    },
    {
      name: 'disableElevation',
      type: 'boolean',
      defaultValue: 'false',
      description: '그림자 효과를 제거합니다.',
    },
  ];

  const basicCode = `
<DsButtonGroup aria-label="Basic button group">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
  <DsButton>Three</DsButton>
</DsButtonGroup>
  `;

  const variantsCode = `
// Contained (default)
<DsButtonGroup color="primary">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
</DsButtonGroup>

// Outlined
<DsButtonGroup variant="outlined" color="secondary">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
</DsButtonGroup>

// Text
<DsButtonGroup variant="text" color="success">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
</DsButtonGroup>
  `;

  const sizesCode = `
<DsButtonGroup size="small">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
</DsButtonGroup>

<DsButtonGroup size="medium">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
</DsButtonGroup>

<DsButtonGroup size="large">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
</DsButtonGroup>
  `;

  const verticalCode = `
<DsButtonGroup orientation="vertical" color="error">
  <DsButton>One</DsButton>
  <DsButton>Two</DsButton>
  <DsButton>Three</DsButton>
</DsButtonGroup>
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Button Group은 관련된 여러 버튼을 그룹화하여 일관된 UI를 제공하는 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Basic Button Group"
        description="The default button group is 'contained' and 'primary' color."
        component={
          <DsButtonGroup aria-label="Basic button group">
            <DsButton>One</DsButton>
            <DsButton>Two</DsButton>
            <DsButton>Three</DsButton>
          </DsButtonGroup>
        }
        code={basicCode}
      />
      <ComponentShowcase
        title="Variants"
        description="ButtonGroup supports 'contained', 'outlined', and 'text' variants."
        component={
          <Stack direction="row" spacing={2}>
            <DsButtonGroup color="primary">
              <DsButton>One</DsButton>
              <DsButton>Two</DsButton>
            </DsButtonGroup>
            <DsButtonGroup variant="outlined" color="secondary">
              <DsButton>One</DsButton>
              <DsButton>Two</DsButton>
            </DsButtonGroup>
            <DsButtonGroup variant="text" color="success">
              <DsButton>One</DsButton>
              <DsButton>Two</DsButton>
            </DsButtonGroup>
          </Stack>
        }
        code={variantsCode}
      />
      <ComponentShowcase
        title="Sizes"
        description="ButtonGroup can be rendered in different sizes."
        component={
          <Stack direction="row" spacing={2} alignItems="center">
            <DsButtonGroup size="small">
              <DsButton>One</DsButton>
              <DsButton>Two</DsButton>
            </DsButtonGroup>
            <DsButtonGroup size="medium">
              <DsButton>One</DsButton>
              <DsButton>Two</DsButton>
            </DsButtonGroup>
            <DsButtonGroup size="large">
              <DsButton>One</DsButton>
              <DsButton>Two</DsButton>
            </DsButtonGroup>
          </Stack>
        }
        code={sizesCode}
      />
      <ComponentShowcase
        title="Vertical Group"
        description="ButtonGroup can be displayed vertically."
        component={
          <DsButtonGroup orientation="vertical" color="error">
            <DsButton>One</DsButton>
            <DsButton>Two</DsButton>
            <DsButton>Three</DsButton>
          </DsButtonGroup>
        }
        code={verticalCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={buttonGroupProps} title="DsButtonGroup Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default ButtonGroupPage;
