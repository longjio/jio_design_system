// src/pages/TextFieldPage.tsx
import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import { DsTextField } from '../components/input/DsTextField';

const TextFieldPage = () => {
  // DsTextField Props 정의
  const textFieldProps: PropDefinition[] = [
    {
      name: 'label',
      type: 'string',
      description: '텍스트 필드의 라벨입니다.',
    },
    {
      name: 'variant',
      type: "'outlined' | 'filled' | 'standard'",
      defaultValue: "'outlined'",
      description: '텍스트 필드의 시각적 스타일을 결정합니다.',
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      defaultValue: "'medium'",
      description: '텍스트 필드의 크기를 결정합니다.',
    },
    {
      name: 'type',
      type: "'text' | 'password' | 'number' | 'email' | ...",
      defaultValue: "'text'",
      description: '입력 타입을 지정합니다.',
    },
    {
      name: 'multiline',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 여러 줄 입력이 가능한 textarea로 변환됩니다.',
    },
    {
      name: 'rows',
      type: 'number',
      description: 'multiline이 true일 때 표시할 줄 수를 지정합니다.',
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: 'false',
      description: '필수 입력 필드로 표시합니다.',
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
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '텍스트 필드를 비활성화 상태로 만듭니다.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: '기본값을 설정합니다. (비제어 컴포넌트)',
    },
    {
      name: 'value',
      type: 'string',
      description: '입력값입니다. (제어 컴포넌트)',
    },
    {
      name: 'onChange',
      type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
      description: '입력값이 변경될 때 호출되는 함수입니다.',
    },
  ];

  const variantsCode = `
<DsTextField label="Outlined" />
<DsTextField label="Filled" variant="filled" />
<DsTextField label="Standard" variant="standard" />
  `;

  const formPropsCode = `
<DsTextField label="Required" required />
<DsTextField label="Error" error helperText="Incorrect entry." />
<DsTextField label="Disabled" disabled defaultValue="Hello World" />
<DsTextField label="Read Only" InputProps={{ readOnly: true }} defaultValue="Hello World" />
  `;

  const sizesCode = `
<DsTextField label="Small" size="small" />
<DsTextField label="Medium (default)" size="medium" />
  `;

  const multilineCode = `
<DsTextField
  label="Multiline"
  multiline
  rows={4}
  defaultValue="Default Value"
/>
  `;

  const typesCode = `
<DsTextField label="Password" type="password" />
<DsTextField label="Number" type="number" />
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            TextField는 사용자로부터 텍스트 입력을 받는 기본적인 폼 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
          title="Variants"
          description="TextField supports 'outlined', 'filled', and 'standard' variants."
          component={
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <DsTextField label="Outlined" />
              <DsTextField label="Filled" variant="filled" />
              <DsTextField label="Standard" variant="standard" />
            </Box>
          }
          code={variantsCode}
        />
        <ComponentShowcase
          title="Form Properties"
          description="Showcasing required, error, disabled, and read-only states."
          component={
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <DsTextField label="Required" required />
              <DsTextField label="Error" error helperText="Incorrect entry." />
              <DsTextField label="Disabled" disabled defaultValue="Hello World" />
              <DsTextField label="Read Only" InputProps={{ readOnly: true }} defaultValue="Hello World" />
            </Box>
          }
          code={formPropsCode}
        />
        <ComponentShowcase
          title="Sizes"
          description="TextField supports 'small' and 'medium' sizes."
          component={
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <DsTextField label="Small" size="small" />
              <DsTextField label="Medium (default)" size="medium" />
            </Box>
          }
          code={sizesCode}
        />
        <ComponentShowcase
          title="Multiline"
          description="The 'multiline' prop transforms the text field into a textarea."
          component={
            <DsTextField
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              sx={{ width: '300px' }}
            />
          }
          code={multilineCode}
        />
        <ComponentShowcase
          title="Input Types"
          description="The 'type' prop can be used to configure the input for different data types."
          component={
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <DsTextField label="Password" type="password" />
              <DsTextField label="Number" type="number" />
            </Box>
          }
          code={typesCode}
        />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={textFieldProps} title="DsTextField Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default TextFieldPage;
