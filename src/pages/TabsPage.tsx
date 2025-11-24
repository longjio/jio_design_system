// src/pages/TabsPage.tsx
import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsTabs, { TabItem } from '../components/navigation/DsTabs';

// Icons
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const TabsPage = () => {
  // DsTabs Props 정의
  const tabsProps: PropDefinition[] = [
    {
      name: 'tabs',
      type: 'TabItem[]',
      description: 'Tab 항목 배열입니다. { label: string, content: React.ReactNode, icon?: React.ReactElement, disabled?: boolean } 형태입니다.',
    },
    {
      name: 'variant',
      type: "'standard' | 'scrollable' | 'fullWidth'",
      defaultValue: "'standard'",
      description: 'Tabs의 표시 방식을 결정합니다.',
    },
    {
      name: 'centered',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Tab들을 중앙 정렬합니다.',
    },
    {
      name: 'scrollButtons',
      type: 'boolean | "auto"',
      defaultValue: "'auto'",
      description: 'scrollable variant일 때 스크롤 버튼 표시 여부를 결정합니다.',
    },
    {
      name: 'allowScrollButtonsMobile',
      type: 'boolean',
      defaultValue: 'false',
      description: '모바일에서도 스크롤 버튼을 표시할지 결정합니다.',
    },
    {
      name: 'defaultValue',
      type: 'number',
      defaultValue: '0',
      description: '초기 선택된 탭의 인덱스입니다.',
    },
  ];

  // Data for Basic Tabs
  const basicTabs: TabItem[] = [
    {
      label: 'Item One',
      content: <Typography>This is the content for Item One.</Typography>,
    },
    {
      label: 'Item Two',
      content: <Typography>Here you can find information about Item Two.</Typography>,
    },
    {
      label: 'Item Three',
      content: (
        <Box>
          <Typography>Item Three can have more complex content.</Typography>
          <TextField label="Your Name" variant="outlined" fullWidth margin="normal" />
        </Box>
      ),
    },
    {
      label: 'Disabled Item',
      content: 'You should not see this.',
      disabled: true,
    },
  ];

  // Data for Icon Tabs
  const iconTabs: TabItem[] = [
    { label: 'Recents', content: 'Recent calls content', icon: <PhoneIcon /> },
    { label: 'Favorites', content: 'Favorites content', icon: <FavoriteIcon /> },
    { label: 'Nearby', content: 'Nearby places content', icon: <PersonPinIcon /> },
  ];

  // Data for Scrollable Tabs
  const scrollableTabs: TabItem[] = Array.from({ length: 7 }, (_, i) => ({
    label: `Item ${i + 1}`,
    content: `Content for Item ${i + 1}`,
  }));

  const basicCode = `
const basicTabs: TabItem[] = [
  { label: 'Item One', content: 'Content for Item One' },
  { label: 'Item Two', content: 'Content for Item Two' },
  { label: 'Item Three', content: 'Content for Item Three' },
  { label: 'Disabled', content: '...', disabled: true },
];

<DsTabs tabs={basicTabs} />
  `;

  const fullWidthCode = `
const tabs: TabItem[] = [
  { label: 'Item One', content: 'Content for Item One' },
  { label: 'Item Two', content: 'Content for Item Two' },
  { label: 'Item Three', content: 'Content for Item Three' },
];

<DsTabs tabs={tabs} variant="fullWidth" centered />
  `;

  const iconCode = `
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const iconTabs: TabItem[] = [
  { label: 'Recents', content: '...', icon: <PhoneIcon /> },
  { label: 'Favorites', content: '...', icon: <FavoriteIcon /> },
  { label: 'Nearby', content: '...', icon: <PersonPinIcon /> },
];

<DsTabs tabs={iconTabs} />
  `;

  const scrollableCode = `
const scrollableTabs: TabItem[] = Array.from({ length: 7 }, (_, i) => ({
  label: 'Item ' + (i + 1),
  content: 'Content for Item ' + (i + 1),
}));

<DsTabs
  tabs={scrollableTabs}
  variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile
/>
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Tabs는 관련된 콘텐츠를 탭 형태로 구성하여 쉽게 전환할 수 있게 하는 내비게이션 컴포넌트입니다.
          </Typography>
        </Box>
      <ComponentShowcase
        title="Basic Tabs"
        description="A basic example of tabs with 4 items, one of which is disabled."
        component={<DsTabs tabs={basicTabs} />}
        code={basicCode}
      />
      <ComponentShowcase
        title="Full Width & Centered Tabs"
        description="The variant='fullWidth' and centered props make the tabs span the full width of the container and center the labels."
        component={<DsTabs tabs={basicTabs.slice(0, 3)} variant="fullWidth" centered />}
        code={fullWidthCode}
      />
      <ComponentShowcase
        title="Icon Tabs"
        description="Tabs can include icons by providing an icon element to the tab item."
        component={<DsTabs tabs={iconTabs} />}
        code={iconCode}
      />
      <ComponentShowcase
        title="Scrollable Tabs"
        description="When there are more tabs than can fit in the container, they become scrollable."
        component={
          <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
            <DsTabs
              tabs={scrollableTabs}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            />
          </Box>
        }
        code={scrollableCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={tabsProps} title="DsTabs Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default TabsPage;
