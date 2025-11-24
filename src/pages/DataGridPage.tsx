// src/pages/DataGridPage.tsx

import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
// 사용자 정의 타입을 가져옵니다. 이 타입들이 실제 MUI X DataGrid와 호환되는지 확인이 중요합니다.
import type { GridValueGetterParams, GridColDef } from '../types/mui-grid';

// 1. 행 데이터에 대한 인터페이스 정의
interface RowData {
    id: number;
    firstName: string | null; // firstName이 없을 수 있는 경우 null 허용
    lastName: string;
    age: number | null;      // age가 없을 수 있는 경우 null 허용
}

// 2. RowData 인터페이스를 GridColDef와 함께 사용
const columns: GridColDef<RowData>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: '이름 (First name)',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: '성 (Last name)',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: '나이 (Age)',
        type: 'number', // 사용자 정의 GridColDef에 'number' 타입이 GridColType으로 정의되어 있는지 확인
        width: 110,
        editable: true,
        align: 'left', // 사용자 정의 GridColDef에 'align' 속성이 정의되어 있는지 확인
        headerAlign: 'left', // 사용자 정의 GridColDef에 'headerAlign' 속성이 정의되어 있는지 확인
    },
    {
        field: 'fullName',
        headerName: '전체 이름 (Full name)',
        description: '이 열은 valueGetter를 사용하며 정렬할 수 없습니다.',
        sortable: false, // 사용자 정의 GridColDef에 'sortable' 속성이 정의되어 있는지 확인
        width: 180,
        valueGetter: (params: GridValueGetterParams<RowData>) => {
            // params 객체와 params.row가 유효한지 확인하여 런타임 에러 방지
            if (!params || typeof params.row === 'undefined') {
                console.warn('DataGridPage: "fullName" 컬럼의 valueGetter에서 params 또는 params.row가 undefined입니다.', params);
                return '정보 없음'; // 또는 빈 문자열 '' 등 적절한 기본값
            }
            // firstName이 null일 경우 빈 문자열로 처리
            const firstName = params.row.firstName || '';
            // lastName은 null을 허용하지 않지만, 일관성을 위해 빈 문자열 처리 (필요시)
            const lastName = params.row.lastName || '';
            return `${firstName} ${lastName}`.trim(); // 앞뒤 공백 제거
        },
    },
];

// 3. 행 데이터 배열에도 RowData 인터페이스를 사용하여 일관성 유지
const rows: RowData[] = [
    { id: 1, lastName: '스노우', firstName: '존', age: 35 },
    { id: 2, lastName: '래니스터', firstName: '세르세이', age: 42 },
    { id: 3, lastName: '래니스터', firstName: '제이미', age: 42 },
    { id: 4, lastName: '스타크', firstName: '아리아', age: 25 },
    { id: 5, lastName: '타르가르옌', firstName: '대너리스', age: null },
    { id: 6, lastName: '멜리산드레', firstName: null, age: 150 },
    { id: 7, lastName: '클리포드', firstName: '페라라', age: 44 },
    { id: 8, lastName: '프란시스', firstName: '로시니', age: 36 },
    { id: 9, lastName: '록시', firstName: '하비', age: 65 },
];

const DataGridPage = () => {
    // DsDataGrid Props 정의
    const dataGridProps: PropDefinition[] = [
        {
            name: 'rows',
            type: 'Array<object>',
            description: '그리드에 표시할 데이터 배열입니다. 각 객체는 반드시 고유한 id 필드를 가져야 합니다.',
        },
        {
            name: 'columns',
            type: 'GridColDef[]',
            description: '열 정의 배열입니다. field, headerName, width 등을 포함합니다.',
        },
        {
            name: 'pageSizeOptions',
            type: 'number[]',
            defaultValue: '[5, 10, 25]',
            description: '페이지당 표시할 행 수 옵션 배열입니다.',
        },
        {
            name: 'initialState',
            type: 'GridInitialState',
            description: '그리드의 초기 상태를 설정합니다. pagination, sorting, filtering 등을 포함할 수 있습니다.',
        },
        {
            name: 'autoHeight',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 그리드의 높이가 콘텐츠에 맞춰 자동으로 조절됩니다.',
        },
        {
            name: 'checkboxSelection',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 각 행 앞에 체크박스가 표시됩니다.',
        },
        {
            name: 'disableRowSelectionOnClick',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 행 클릭으로 선택할 수 없습니다.',
        },
        {
            name: 'onRowClick',
            type: '(params: GridRowParams) => void',
            description: '행을 클릭했을 때 호출되는 함수입니다.',
        },
        {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 로딩 인디케이터가 표시됩니다.',
        },
        {
            name: 'density',
            type: "'compact' | 'standard' | 'comfortable'",
            defaultValue: "'standard'",
            description: '그리드의 행 높이 밀도를 설정합니다.',
        },
    ];

    const basicDataGridCode = `
<DsDataGrid
    rows={rows}
    columns={columns}
/>
    `;

    const optionsDataGridCode = `
<DsDataGrid
    rows={rows}
    columns={columns}
    pageSizeOptions={[5, 10, 20]}
    initialState={{
        pagination: {
            paginationModel: {
                pageSize: 10,
            },
        },
    }}
    autoHeight
    checkboxSelection={false}
/>
    `;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <Stack spacing={4}>
                <Box>
                    <Typography color="text.secondary">
                        DataGrid는 대량의 데이터를 테이블 형태로 표시하고 정렬, 페이징, 필터링 등 다양한 인터랙션을 제공하는 컴포넌트입니다.
                    </Typography>
                </Box>

            <ComponentShowcase
                title="기본 DsDataGrid 예시"
                description="가장 기본적인 형태의 데이터 그리드입니다. 'rows'와 'columns' prop을 전달하여 데이터를 표시합니다."
                component={
                    <DsDataGrid
                        rows={rows}
                        columns={columns}
                    />
                }
                code={basicDataGridCode}
            />

            <ComponentShowcase
                title="페이지 크기 옵션 변경 및 자동 높이 조절 예시"
                description="'pageSizeOptions'로 페이지당 행 수 옵션을, 'initialState'로 초기 페이지 크기를 설정할 수 있습니다. 'autoHeight'를 사용하면 컨텐츠 높이에 맞춰 그리드 높이가 자동으로 조절됩니다."
                component={
                    <DsDataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        autoHeight
                        checkboxSelection={false}
                    />
                }
                code={optionsDataGridCode}
            />

                {/* API 문서 섹션 */}
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        API
                    </Typography>
                    <PropsTable props={dataGridProps} title="DsDataGrid Props" />
                </Box>
            </Stack>
        </Box>
    );
};

export default DataGridPage;
