// src/pages/AlertPage.tsx
import React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsAlert from '../components/feedback/DsAlert';

const AlertPage = () => {
  // DsAlert Props 정의
  const alertProps: PropDefinition[] = [
    {
      name: 'severity',
      type: "'error' | 'warning' | 'info' | 'success'",
      defaultValue: "'info'",
      description: 'Alert의 심각도 수준을 결정합니다. 색상과 아이콘이 자동으로 설정됩니다.',
    },
    {
      name: 'variant',
      type: "'standard' | 'filled' | 'outlined'",
      defaultValue: "'standard'",
      description: 'Alert의 시각적 스타일을 결정합니다.',
    },
    {
      name: 'title',
      type: 'string',
      description: 'Alert의 제목입니다.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Alert의 주요 메시지 콘텐츠입니다.',
    },
    {
      name: 'onClose',
      type: '() => void',
      description: '닫기 버튼을 클릭할 때 호출되는 함수입니다. 이 prop을 제공하면 닫기 버튼이 표시됩니다.',
    },
    {
      name: 'action',
      type: 'React.ReactNode',
      description: 'Alert 우측에 표시할 커스텀 액션 요소입니다.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      description: '기본 아이콘을 대체할 커스텀 아이콘입니다.',
    },
    {
      name: 'color',
      type: "'error' | 'warning' | 'info' | 'success'",
      description: 'Alert의 색상을 직접 지정합니다.',
    },
  ];

  const standardCode = `
<DsAlert severity="error" title="Error">This is an error alert — check it out!</DsAlert>
<DsAlert severity="warning" title="Warning">This is a warning alert — check it out!</DsAlert>
<DsAlert severity="info" title="Info">This is an info alert — check it out!</DsAlert>
<DsAlert severity="success" title="Success">This is a success alert — check it out!</DsAlert>
  `;

  const filledCode = `
<DsAlert variant="filled" severity="error" title="Error">This is an error alert — check it out!</DsAlert>
<DsAlert variant="filled" severity="warning" title="Warning">This is a warning alert — check it out!</DsAlert>
<DsAlert variant="filled" severity="info" title="Info">This is an info alert — check it out!</DsAlert>
<DsAlert variant="filled" severity="success" title="Success">This is a success alert — check it out!</DsAlert>
  `;

  const outlinedCode = `
<DsAlert variant="outlined" severity="error" title="Error">This is an error alert — check it out!</DsAlert>
<DsAlert variant="outlined" severity="warning" title="Warning">This is a warning alert — check it out!</DsAlert>
<DsAlert variant="outlined" severity="info" title="Info">This is an info alert — check it out!</DsAlert>
<DsAlert variant="outlined" severity="success" title="Success">This is a success alert — check it out!</DsAlert>
  `;
  
  const actionCode = `
<DsAlert onClose={() => {}}>This is a closable alert.</DsAlert>
<DsAlert severity="success" action={
  <Button color="inherit" size="small" variant="outlined">
    UNDO
  </Button>
}>
  Profile successfully updated!
</DsAlert>
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Alert는 사용자에게 중요한 정보를 시각적으로 강조하여 전달하는 피드백 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Standard Alerts"
        description="The standard alert appears with a background color and icon corresponding to the severity."
        component={
          <Stack spacing={2}>
            <DsAlert severity="error" title="Error">This is an error alert — check it out!</DsAlert>
            <DsAlert severity="warning" title="Warning">This is a warning alert — check it out!</DsAlert>
            <DsAlert severity="info" title="Info">This is an info alert — check it out!</DsAlert>
            <DsAlert severity="success" title="Success">This is a success alert — check it out!</DsAlert>
          </Stack>
        }
        code={standardCode}
      />
      <ComponentShowcase
        title="Filled Alerts"
        description="Filled alerts have a more prominent appearance."
        component={
          <Stack spacing={2}>
            <DsAlert variant="filled" severity="error" title="Error">This is an error alert — check it out!</DsAlert>
            <DsAlert variant="filled" severity="warning" title="Warning">This is a warning alert — check it out!</DsAlert>
            <DsAlert variant="filled" severity="info" title="Info">This is an info alert — check it out!</DsAlert>
            <DsAlert variant="filled" severity="success" title="Success">This is a success alert — check it out!</DsAlert>
          </Stack>
        }
        code={filledCode}
      />
      <ComponentShowcase
        title="Outlined Alerts"
        description="Outlined alerts have a border and a less intrusive appearance."
        component={
          <Stack spacing={2}>
            <DsAlert variant="outlined" severity="error" title="Error">This is an error alert — check it out!</DsAlert>
            <DsAlert variant="outlined" severity="warning" title="Warning">This is a warning alert — check it out!</DsAlert>
            <DsAlert variant="outlined" severity="info" title="Info">This is an info alert — check it out!</DsAlert>
            <DsAlert variant="outlined" severity="success" title="Success">This is a success alert — check it out!</DsAlert>
          </Stack>
        }
        code={outlinedCode}
      />
      <ComponentShowcase
        title="Alerts with Actions"
        description="Alerts can include actions, such as a close button or an undo button."
        component={
          <Stack spacing={2}>
            <DsAlert onClose={() => { alert('Close button clicked!'); }}>This is a closable alert.</DsAlert>
            <DsAlert severity="success" action={
              <Button color="inherit" size="small" variant="outlined">
                UNDO
              </Button>
            }>
              Profile successfully updated!
            </DsAlert>
          </Stack>
        }
        code={actionCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={alertProps} title="DsAlert Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default AlertPage;
