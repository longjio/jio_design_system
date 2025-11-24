// src/pages/AutocompletePage.tsx
import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import { DsAutoComplete } from '../components/input/DsAutoComplete';

// Sample data
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

export default function AutocompletePage() {
  // DsAutoComplete Props 정의
  const autocompleteProps: PropDefinition[] = [
    {
      name: 'options',
      type: 'T[]',
      description: '자동완성 제안에 사용될 옵션 배열입니다.',
    },
    {
      name: 'renderInput',
      type: '(params: AutocompleteRenderInputParams) => React.ReactNode',
      description: '입력 필드를 렌더링하는 함수입니다. 일반적으로 TextField를 반환합니다.',
    },
    {
      name: 'getOptionLabel',
      type: '(option: T) => string',
      description: '옵션 객체를 문자열로 변환하는 함수입니다.',
    },
    {
      name: 'value',
      type: 'T | T[] | null',
      description: '현재 선택된 값입니다. (제어 컴포넌트)',
    },
    {
      name: 'defaultValue',
      type: 'T | T[] | null',
      description: '초기 선택값입니다. (비제어 컴포넌트)',
    },
    {
      name: 'onChange',
      type: '(event: React.SyntheticEvent, value: T | T[] | null, reason: string) => void',
      description: '선택값이 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 여러 옵션을 선택할 수 있습니다.',
    },
    {
      name: 'freeSolo',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 옵션 목록에 없는 임의의 값을 입력할 수 있습니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Autocomplete를 비활성화 상태로 만듭니다.',
    },
    {
      name: 'filterSelectedOptions',
      type: 'boolean',
      defaultValue: 'false',
      description: '이미 선택된 옵션을 목록에서 제거합니다. (multiple과 함께 사용)',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: '로딩 상태를 표시합니다.',
    },
    {
      name: 'loadingText',
      type: 'React.ReactNode',
      defaultValue: "'Loading...'",
      description: '로딩 중에 표시될 텍스트입니다.',
    },
    {
      name: 'noOptionsText',
      type: 'React.ReactNode',
      defaultValue: "'No options'",
      description: '옵션이 없을 때 표시될 텍스트입니다.',
    },
  ];

  const basicCode = `
<DsAutoComplete
  options={top100Films}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie" />}
/>
  `;

  const multipleCode = `
<DsAutoComplete
  multiple
  options={top100Films}
  getOptionLabel={(option) => option.label}
  defaultValue={[top100Films[1]]}
  filterSelectedOptions
  sx={{ width: 500 }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Filter selected options"
      placeholder="Favorites"
    />
  )}
/>
  `;

  const freeSoloCode = `
<DsAutoComplete
  freeSolo
  options={top100Films.map((option) => option.label)}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Free solo" />}
/>
  `;

  const disabledCode = `
<DsAutoComplete
  disabled
  options={top100Films}
  defaultValue={top100Films[0]}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Disabled" />}
/>
  `;

  const sizesCode = `
<DsAutoComplete
  options={top100Films}
  sx={{ width: 300 }}
  renderInput={(params) => (
    <TextField {...params} label="Movie" size="small" />
  )}
/>
<DsAutoComplete
  options={top100Films}
  sx={{ width: 300 }}
  renderInput={(params) => (
    <TextField {...params} label="Movie" size="medium" />
  )}
/>
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Autocomplete는 입력 시 자동완성 제안을 제공하는 향상된 텍스트 입력 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Basic Autocomplete"
        description="The user can type to search for an option from a predefined list."
        component={
          <DsAutoComplete
            options={top100Films}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} label="Movie" />
            )}
          />
        }
        code={basicCode}
      />
      <ComponentShowcase
        title="Multiple Values"
        description="The 'multiple' prop allows the user to select more than one option."
        component={
          <DsAutoComplete
            multiple
            options={top100Films}
            getOptionLabel={(option) => option.label}
            defaultValue={[top100Films[1]]}
            filterSelectedOptions
            sx={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Multiple selection"
                placeholder="Favorites"
              />
            )}
          />
        }
        code={multipleCode}
      />
      <ComponentShowcase
        title="Free Solo"
        description="The 'freeSolo' prop allows the user to enter arbitrary values that are not in the options list."
        component={
          <DsAutoComplete
            freeSolo
            options={top100Films.map((option) => option.label)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Free solo" />}
          />
        }
        code={freeSoloCode}
      />
      <ComponentShowcase
        title="Disabled"
        description="The 'disabled' prop prevents user interaction."
        component={
          <DsAutoComplete
            disabled
            options={top100Films}
            getOptionLabel={(option) => option.label}
            defaultValue={top100Films[0]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Disabled" />}
          />
        }
        code={disabledCode}
      />
      <ComponentShowcase
        title="Sizes"
        description="The 'size' prop on the TextField in 'renderInput' can be used to control the size."
        component={
          <Stack spacing={2}>
            <DsAutoComplete
              options={top100Films}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Small" size="small" />
              )}
            />
            <DsAutoComplete
              options={top100Films}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Medium" size="medium" />
              )}
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
          <PropsTable props={autocompleteProps} title="DsAutoComplete Props" />
        </Box>
      </Stack>
    </Box>
  );
}
