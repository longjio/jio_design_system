// src/template/MenuPermission.tsx
// 메뉴 권한 관리 페이지

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Select, MenuItem, Alert, CircularProgress, SelectChangeEvent, TextField } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { TitleArea, SearchArea, SubTitleArea } from '../layouts';
import { FormField } from '../components/form/FormField';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import { DsSwitch } from '../components/input/DsSwitch';
import { SearchIconButton, ResetButton, SaveButton } from '../components/button';

import { permissionApi } from '../api';
import { appRoutes, AppRouteConfig } from '../app-config';
import { MenuPermission } from '../types';

// 역할 옵션
const roleOptions = [
    { value: 'admin', label: '관리자' },
    { value: 'user', label: '일반 사용자' },
];

// 접근 권한 옵션
const accessOptions = [
    { value: 'all', label: '전체' },
    { value: 'allowed', label: '허용' },
    { value: 'denied', label: '거부' },
];

// app-config에서 메뉴 목록 추출 (재귀)
const extractMenuItems = (routes: AppRouteConfig[], depth = 0): { id: string; name: string; path: string; depth: number }[] => {
    const items: { id: string; name: string; path: string; depth: number }[] = [];

    routes.forEach(route => {
        if (route.menu) {
            items.push({
                id: route.id,
                name: route.menu.text,
                path: route.path,
                depth,
            });
        }

        if (route.children) {
            items.push(...extractMenuItems(route.children, depth + 1));
        }
    });

    return items;
};

const allMenuItems = extractMenuItems(appRoutes);

export default function MenuPermissionPage() {
    const [selectedRole, setSelectedRole] = useState('admin');
    const [permissions, setPermissions] = useState<MenuPermission[]>([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState(allMenuItems);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // 조회 조건 State
    const [searchMenuName, setSearchMenuName] = useState('');
    const [searchAccess, setSearchAccess] = useState('all');

    // 권한 데이터 조회
    const fetchPermissions = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const { permissions: data, error: fetchError } = await permissionApi.getPermissionsByRole(selectedRole);

        if (fetchError) {
            setError(fetchError);
        } else {
            setPermissions(data);
        }

        setIsLoading(false);
        setHasChanges(false);
    }, [selectedRole]);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    // 역할 변경 (SearchArea에서)
    const handleRoleChange = (e: SelectChangeEvent<string>) => {
        setSelectedRole(e.target.value);
    };

    // 메뉴별 권한 상태 확인
    const getMenuAccess = (menuId: string): boolean => {
        const permission = permissions.find(p => p.menu_id === menuId);
        // 권한이 없으면 기본값 true (접근 가능)
        return permission ? permission.can_access : true;
    };

    // 검색 실행
    const handleSearch = () => {
        let filtered = [...allMenuItems];

        // 메뉴명 필터
        if (searchMenuName) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchMenuName.toLowerCase()) ||
                item.id.toLowerCase().includes(searchMenuName.toLowerCase())
            );
        }

        // 접근 권한 필터
        if (searchAccess !== 'all') {
            filtered = filtered.filter(item => {
                const canAccess = getMenuAccess(item.id);
                return searchAccess === 'allowed' ? canAccess : !canAccess;
            });
        }

        setFilteredMenuItems(filtered);
    };

    // 검색 조건 초기화
    const handleReset = () => {
        setSearchMenuName('');
        setSearchAccess('all');
        setFilteredMenuItems(allMenuItems);
    };

    // 권한 토글
    const handleTogglePermission = (menuId: string, currentAccess: boolean) => {
        const existingIndex = permissions.findIndex(p => p.menu_id === menuId);

        if (existingIndex >= 0) {
            // 기존 권한 수정
            const updated = [...permissions];
            updated[existingIndex] = { ...updated[existingIndex], can_access: !currentAccess };
            setPermissions(updated);
        } else {
            // 새 권한 추가
            const newPermission: MenuPermission = {
                id: '',
                role: selectedRole,
                menu_id: menuId,
                can_access: !currentAccess,
                created_at: '',
                updated_at: '',
            };
            setPermissions([...permissions, newPermission]);
        }

        setHasChanges(true);
    };

    // 저장
    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        const updates = permissions.map(p => ({
            role: selectedRole,
            menu_id: p.menu_id,
            can_access: p.can_access,
        }));

        const { success, error: saveError } = await permissionApi.updatePermissions(updates);

        if (saveError) {
            setError(saveError);
        } else if (success) {
            setSuccessMessage('저장되었습니다.');
            setHasChanges(false);
            setTimeout(() => setSuccessMessage(null), 3000);
        }

        setIsLoading(false);
    };

    // 그리드 컬럼 정의
    const columns: GridColDef[] = [
        { field: 'id', headerName: '메뉴 ID', width: 180 },
        { field: 'name', headerName: '메뉴명', flex: 1, minWidth: 150 },
        { field: 'path', headerName: '경로', width: 200 },
        {
            field: 'can_access',
            headerName: '접근 권한',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => {
                const canAccess = getMenuAccess(params.row.id);
                return (
                    <DsSwitch
                        checked={canAccess}
                        onChange={() => handleTogglePermission(params.row.id, canAccess)}
                        size="small"
                    />
                );
            },
        },
    ];

    // 그리드 행 데이터
    const rows = filteredMenuItems.map(item => ({
        id: item.id,
        name: '　'.repeat(item.depth) + item.name, // depth에 따라 들여쓰기
        path: item.path,
        depth: item.depth,
    }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="메뉴 권한 관리">
                <ResetButton onClick={handleReset} />
            </TitleArea>

            {/* 에러/성공 메시지 */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
                    {successMessage}
                </Alert>
            )}

            {/* 조회 영역 */}
            <SearchArea>
                <FormField label="역할" htmlFor="role-select">
                    <Select
                        id="role-select"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        sx={{ width: '150px' }}
                    >
                        {roleOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <FormField label="메뉴명" htmlFor="menu-name-search">
                    <TextField
                        id="menu-name-search"
                        value={searchMenuName}
                        onChange={(e) => setSearchMenuName(e.target.value)}
                        sx={{ width: '200px' }}
                        placeholder="메뉴명 또는 ID"
                    />
                </FormField>
                <FormField label="접근 권한" htmlFor="access-search">
                    <Select
                        id="access-search"
                        value={searchAccess}
                        onChange={(e) => setSearchAccess(e.target.value)}
                        sx={{ width: '150px' }}
                    >
                        {accessOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 메뉴 권한 그리드 --- */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <SubTitleArea title={`${roleOptions.find(r => r.value === selectedRole)?.label} 메뉴 권한 (${rows.length}개)`}>
                    {isLoading && <CircularProgress size={20} />}
                    <SaveButton onClick={handleSave} disabled={!hasChanges || isLoading} />
                </SubTitleArea>
                <DsDataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ flexGrow: 1 }}
                    showRowNumber
                    hideFooter
                    loading={isLoading}
                    paginationModel={{ page: 0, pageSize: 100 }}
                />
            </Box>
        </Box>
    );
}
