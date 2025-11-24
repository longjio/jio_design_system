// src/pages/PaginationPage.tsx
import React, { useState } from 'react';
import { Box, Stack, TablePagination, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsPagination from '../components/navigation/DsPagination';

const PaginationPage = () => {
  // DsPagination Props 정의
  const paginationProps: PropDefinition[] = [
    {
      name: 'count',
      type: 'number',
      description: '총 페이지 수입니다.',
    },
    {
      name: 'page',
      type: 'number',
      description: '현재 선택된 페이지입니다. 1부터 시작합니다.',
    },
    {
      name: 'onChange',
      type: '(event: React.ChangeEvent<unknown>, page: number) => void',
      description: '페이지가 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'variant',
      type: "'text' | 'outlined'",
      defaultValue: "'text'",
      description: '페이지네이션의 시각적 스타일을 결정합니다.',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'standard'",
      defaultValue: "'standard'",
      description: '페이지네이션의 색상을 결정합니다.',
    },
    {
      name: 'shape',
      type: "'circular' | 'rounded'",
      defaultValue: "'circular'",
      description: '페이지 버튼의 모양을 결정합니다.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      defaultValue: "'medium'",
      description: '페이지네이션의 크기를 결정합니다.',
    },
    {
      name: 'showFirstButton',
      type: 'boolean',
      defaultValue: 'false',
      description: '첫 페이지로 이동하는 버튼을 표시합니다.',
    },
    {
      name: 'showLastButton',
      type: 'boolean',
      defaultValue: 'false',
      description: '마지막 페이지로 이동하는 버튼을 표시합니다.',
    },
    {
      name: 'hidePrevButton',
      type: 'boolean',
      defaultValue: 'false',
      description: '이전 페이지 버튼을 숨깁니다.',
    },
    {
      name: 'hideNextButton',
      type: 'boolean',
      defaultValue: 'false',
      description: '다음 페이지 버튼을 숨깁니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '페이지네이션을 비활성화 상태로 만듭니다.',
    },
    {
      name: 'boundaryCount',
      type: 'number',
      defaultValue: '1',
      description: '시작과 끝에 항상 표시되는 페이지 수입니다.',
    },
    {
      name: 'siblingCount',
      type: 'number',
      defaultValue: '1',
      description: '현재 페이지 양 옆에 표시되는 페이지 수입니다.',
    },
  ];

  const tablePaginationProps: PropDefinition[] = [
    {
      name: 'count',
      type: 'number',
      description: '총 아이템 수입니다.',
    },
    {
      name: 'page',
      type: 'number',
      description: '현재 페이지입니다. 0부터 시작합니다.',
    },
    {
      name: 'onPageChange',
      type: '(event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void',
      description: '페이지가 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'rowsPerPage',
      type: 'number',
      description: '페이지당 표시할 행의 수입니다.',
    },
    {
      name: 'onRowsPerPageChange',
      type: '(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void',
      description: '페이지당 행 수가 변경될 때 호출되는 함수입니다.',
    },
    {
      name: 'component',
      type: 'React.ElementType',
      defaultValue: "'div'",
      description: '루트 요소로 사용할 컴포넌트 타입입니다.',
    },
    {
      name: 'rowsPerPageOptions',
      type: 'number[]',
      defaultValue: '[10, 25, 50, 100]',
      description: '페이지당 행 수 선택 옵션입니다.',
    },
    {
      name: 'labelRowsPerPage',
      type: 'React.ReactNode',
      description: '"페이지당 행 수" 라벨 텍스트입니다.',
    },
    {
      name: 'labelDisplayedRows',
      type: '({ from, to, count }: { from: number; to: number; count: number }) => string',
      description: '표시되는 행의 범위를 나타내는 함수입니다.',
    },
  ];

  const basicCode = `
// In your component...
const [page, setPage] = useState(1);
const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  setPage(value);
};

<DsPagination count={10} page={page} onChange={handleChange} />
  `;

  const variantsCode = `
<DsPagination count={10} variant="outlined" color="primary" />
<DsPagination count={10} variant="text" color="secondary" />
  `;

  const shapesCode = `
<DsPagination count={10} shape="rounded" variant="outlined" />
<DsPagination count={10} shape="circular" />
  `;

  const buttonsCode = `
<DsPagination count={10} showFirstButton showLastButton />
<DsPagination count={10} hidePrevButton hideNextButton />
  `;

  const tablePaginationCode = `
// In your component...
const [page, setPage] = useState(0); // TablePagination is 0-based
const [rowsPerPage, setRowsPerPage] = useState(10);

const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

<TablePagination
  component="div"
  count={100}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
  `;

  // Self-contained component for the interactive example
  const InteractivePagination = () => {
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
    return <DsPagination count={10} page={page} onChange={handleChange} />;
  };

  const InteractiveTablePagination = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Pagination은 많은 양의 콘텐츠를 여러 페이지로 나누어 탐색할 수 있게 하는 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Basic Pagination"
        description="A simple, controlled pagination component."
        component={<InteractivePagination />}
        code={basicCode}
      />
      <ComponentShowcase
        title="Variants"
        description="Pagination supports 'text' (default) and 'outlined' variants."
        component={
          <Stack spacing={2}>
            <DsPagination count={10} variant="outlined" color="primary" />
            <DsPagination count={10} variant="text" color="secondary" />
          </Stack>
        }
        code={variantsCode}
      />
      <ComponentShowcase
        title="Shapes"
        description="Pagination supports 'circular' (default) and 'rounded' shapes."
        component={
          <Stack spacing={2}>
            <DsPagination count={10} shape="rounded" variant="outlined" />
            <DsPagination count={10} shape="circular" />
          </Stack>
        }
        code={shapesCode}
      />
      <ComponentShowcase
        title="Buttons"
        description="You can show or hide the first, last, previous, and next page buttons."
        component={
          <Stack spacing={2}>
            <DsPagination count={10} showFirstButton showLastButton />
            <DsPagination count={10} hidePrevButton hideNextButton />
          </Stack>
        }
        code={buttonsCode}
      />
      <ComponentShowcase
        title="Disabled"
        description="The pagination component can be disabled."
        component={<DsPagination count={10} disabled />}
        code={'<DsPagination count={10} disabled />'}
      />
      <ComponentShowcase
        title="Table Pagination"
        description="For use with tables, the TablePagination component is more suitable."
        component={<InteractiveTablePagination />}
        code={tablePaginationCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={paginationProps} title="DsPagination Props" />
          <Box sx={{ mt: 3 }}>
            <PropsTable props={tablePaginationProps} title="TablePagination Props" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaginationPage;
