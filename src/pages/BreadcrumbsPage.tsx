// src/pages/BreadcrumbsPage.tsx
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsBreadcrumbs, { BreadcrumbItem } from '../components/navigation/DsBreadcrumbs';

const BreadcrumbsPage = () => {
  // DsBreadcrumbs Props 정의
  const breadcrumbsProps: PropDefinition[] = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      description: 'Breadcrumb 항목 배열입니다. { label: string, href?: string, icon?: React.ReactNode } 형태입니다.',
    },
    {
      name: 'separator',
      type: 'React.ReactNode',
      defaultValue: "'/'",
      description: 'Breadcrumb 항목 사이에 표시될 구분자입니다.',
    },
    {
      name: 'maxItems',
      type: 'number',
      description: '표시할 최대 Breadcrumb 항목 수입니다. 초과 시 중간 항목들이 축약됩니다.',
    },
    {
      name: 'itemsBeforeCollapse',
      type: 'number',
      defaultValue: '1',
      description: '축약 시 시작 부분에 표시할 항목 수입니다.',
    },
    {
      name: 'itemsAfterCollapse',
      type: 'number',
      defaultValue: '1',
      description: '축약 시 끝 부분에 표시할 항목 수입니다.',
    },
  ];

  // Data for examples
  const basicItems: BreadcrumbItem[] = [
    { label: 'MUI', href: '#' },
    { label: 'Core', href: '#' },
    { label: 'Breadcrumbs' },
  ];

  const withIconsItems: BreadcrumbItem[] = [
    { label: 'MUI', href: '#', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Core', href: '#', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { label: 'Breadcrumbs', icon: <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  ];

  const collapsedItems: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Catalog', href: '#' },
    { label: 'Accessories', href: '#' },
    { label: 'New Collection', href: '#' },
    { label: 'Belts' },
  ];

  // Code snippets for showcases
  const basicCode = `
const items: BreadcrumbItem[] = [
  { label: 'MUI', href: '#' },
  { label: 'Core', href: '#' },
  { label: 'Breadcrumbs' },
];

<DsBreadcrumbs items={items} />
  `;

  const withIconsCode = `
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
//...

const items: BreadcrumbItem[] = [
  { label: 'MUI', href: '#', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  { label: 'Core', href: '#', icon: <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
  { label: 'Breadcrumbs', icon: <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
];

<DsBreadcrumbs items={items} />
  `;

  const collapsedCode = `
const items: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Catalog', href: '#' },
  // ... more items
  { label: 'Belts' },
];

<DsBreadcrumbs items={items} maxItems={2} />
  `;

  const customSeparatorCode = `
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

<DsBreadcrumbs items={basicItems} separator={<NavigateNextIcon fontSize="small" />} />
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Breadcrumbs는 현재 페이지의 위치를 계층적으로 표시하는 내비게이션 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Basic Breadcrumbs"
        description="A simple breadcrumb trail."
        component={<DsBreadcrumbs items={basicItems} />}
        code={basicCode}
      />
      <ComponentShowcase
        title="With Icons"
        description="Breadcrumb items can include icons."
        component={<DsBreadcrumbs items={withIconsItems} />}
        code={withIconsCode}
      />
      <ComponentShowcase
        title="Collapsed Breadcrumbs"
        description="The 'maxItems' prop can be used to collapse the breadcrumb trail."
        component={<DsBreadcrumbs items={collapsedItems} maxItems={2} />}
        code={collapsedCode}
      />
      <ComponentShowcase
        title="Custom Separator"
        description="The 'separator' prop can be used to provide a custom separator."
        component={<DsBreadcrumbs items={basicItems} separator={<NavigateNextIcon fontSize="small" />} />}
        code={customSeparatorCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={breadcrumbsProps} title="DsBreadcrumbs Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default BreadcrumbsPage;
