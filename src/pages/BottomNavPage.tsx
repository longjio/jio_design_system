// src/pages/BottomNavPage.tsx
import React, { useState } from 'react';
import { Box, Stack, BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';

const BottomNavPage = () => {
  // BottomNavigation Props 정의
  const bottomNavProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'any',
      description: '현재 선택된 BottomNavigationAction의 값입니다.',
    },
    {
      name: 'onChange',
      type: '(event: React.SyntheticEvent, value: any) => void',
      description: 'BottomNavigationAction이 선택될 때 호출되는 함수입니다.',
    },
    {
      name: 'showLabels',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 모든 항목의 라벨이 항상 표시됩니다. false면 선택된 항목만 라벨이 표시됩니다.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'BottomNavigationAction 컴포넌트들입니다.',
    },
  ];

  const bottomNavActionProps: PropDefinition[] = [
    {
      name: 'label',
      type: 'React.ReactNode',
      description: '항목에 표시될 라벨입니다.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      description: '항목에 표시될 아이콘입니다.',
    },
    {
      name: 'value',
      type: 'any',
      description: '항목을 식별하는 값입니다. 지정하지 않으면 자동으로 인덱스가 사용됩니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '항목을 비활성화 상태로 만듭니다.',
    },
    {
      name: 'showLabel',
      type: 'boolean',
      description: '이 항목의 라벨 표시 여부를 개별적으로 제어합니다.',
    },
  ];

  const basicCode = `
// In your component...
const [value, setValue] = useState(0);

// This would typically be fixed to the bottom of the screen.
// The Paper component provides the container and shadow.
<Paper sx={{ width: 350 }} elevation={3}>
  <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
  </BottomNavigation>
</Paper>
  `;

  const noLabelsCode = `
// In your component...
const [value, setValue] = useState(0);

<Paper sx={{ width: 350 }} elevation={3}>
  <BottomNavigation
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
  </BottomNavigation>
</Paper>
  `;

  // Self-contained component for the interactive example
  const InteractiveBottomNav = ({ showLabels = true }: { showLabels?: boolean }) => {
    const [value, setValue] = useState(0);
    return (
      <Paper sx={{ width: 350 }} elevation={3}>
        <BottomNavigation
          showLabels={showLabels}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Bottom Navigation은 화면 하단에 위치하여 주요 페이지 간 이동을 제공하는 내비게이션 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Bottom Navigation with Labels"
        description="A simple Bottom Navigation bar. The 'showLabels' prop ensures labels are always visible."
        component={<InteractiveBottomNav />}
        code={basicCode}
      />
      <ComponentShowcase
        title="Bottom Navigation without Labels"
        description="When 'showLabels' is omitted, labels only appear on the active item."
        component={<InteractiveBottomNav showLabels={false} />}
        code={noLabelsCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={bottomNavProps} title="BottomNavigation Props" />
          <Box sx={{ mt: 3 }}>
            <PropsTable props={bottomNavActionProps} title="BottomNavigationAction Props" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default BottomNavPage;
