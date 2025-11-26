// src/template/MenuObj.tsx
// 메뉴 OBJ 관리 페이지

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Select, MenuItem, TextField, SelectChangeEvent, CircularProgress, Alert } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

// 레이아웃 및 공통 컴포넌트 import
import { TitleArea, SearchArea, SubTitleArea } from '../layouts';
import { FormField } from '../components/form/FormField';
import { FormTableRow } from '../components/form/FormTableRow';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import {
    SearchIconButton,
    ResetButton,
    AddButton,
    DeleteButton,
    SaveButton,
} from '../components/button';

// API 및 타입 import
import { menuApi } from '../api';
import { Menu, MenuObject, MenuObjectInput } from '../types';

// 동작구분 옵션
const actionTypeOptions = [
    { value: 'C', label: '생성(Create)' },
    { value: 'R', label: '조회(Read)' },
    { value: 'U', label: '수정(Update)' },
    { value: 'D', label: '삭제(Delete)' },
];

// 로그 사용 옵션
const logOptions = [
    { value: 'true', label: '사용' },
    { value: 'false', label: '미사용' },
];

// 메뉴 그리드 컬럼
const menuGridColumns: GridColDef[] = [
    { field: 'depth', headerName: 'LEVEL', width: 80, align: 'center' },
    { field: 'id', headerName: '메뉴ID', width: 120 },
    {
        field: 'menu_name',
        headerName: '메뉴명',
        flex: 1,
        minWidth: 150,
        valueGetter: (value: string, row: Menu) => {
            // depth에 따라 들여쓰기
            return '　'.repeat(row.depth) + value;
        }
    },
    { field: 'parent_id', headerName: '상위메뉴', width: 100 },
    { field: 'sort_order', headerName: '정렬', type: 'number', width: 80, align: 'center' },
];

// 오브젝트 그리드 컬럼
const objectGridColumns: GridColDef[] = [
    { field: 'id', headerName: '오브젝트ID', width: 120 },
    { field: 'object_name', headerName: '오브젝트명', flex: 1, minWidth: 120 },
    { field: 'action_url', headerName: '액션 URL', flex: 1.5, minWidth: 180 },
    {
        field: 'action_type',
        headerName: '동작',
        width: 80,
        align: 'center',
        valueGetter: (value: string) => {
            const types: Record<string, string> = { C: '생성', R: '조회', U: '수정', D: '삭제' };
            return types[value] || value;
        }
    },
    {
        field: 'log_yn',
        headerName: '로그',
        width: 80,
        align: 'center',
        valueGetter: (value: boolean) => value ? 'Y' : 'N'
    },
];

// 초기 폼 상태
const initialObjectForm = {
    id: '',
    object_name: '',
    action_url: '',
    action_type: 'R' as 'C' | 'R' | 'U' | 'D',
    sort_order: 1,
    log_yn: 'true',
};

export default function MenuObjPage() {
    // 데이터 State
    const [menus, setMenus] = useState<Menu[]>([]);
    const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [basicObjects, setBasicObjects] = useState<MenuObject[]>([]);
    const [additionalObjects, setAdditionalObjects] = useState<MenuObject[]>([]);
    const [selectedBasicObject, setSelectedBasicObject] = useState<MenuObject | null>(null);
    const [selectedAdditionalObject, setSelectedAdditionalObject] = useState<MenuObject | null>(null);

    // 로딩/에러 State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 조회 조건 State
    const [searchMenuName, setSearchMenuName] = useState('');

    // 기본 OBJ 폼 State
    const [basicForm, setBasicForm] = useState(initialObjectForm);
    const [basicFormDirty, setBasicFormDirty] = useState(false);

    // 추가 OBJ 폼 State
    const [additionalForm, setAdditionalForm] = useState(initialObjectForm);
    const [additionalFormDirty, setAdditionalFormDirty] = useState(false);

    // 메뉴 목록 조회
    const fetchMenus = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const { menus: data, error: fetchError } = await menuApi.getMenus();

        if (fetchError) {
            setError(fetchError);
        } else {
            setMenus(data);
            setFilteredMenus(data);
        }

        setIsLoading(false);
    }, []);

    // 메뉴 오브젝트 조회
    const fetchMenuObjects = useCallback(async (menuId: string) => {
        setIsLoading(true);

        // 기본 OBJ 조회
        const { objects: basicData, error: basicError } = await menuApi.getMenuObjects(menuId, 'basic');
        if (!basicError) {
            setBasicObjects(basicData);
        }

        // 추가 OBJ 조회
        const { objects: additionalData, error: additionalError } = await menuApi.getMenuObjects(menuId, 'additional');
        if (!additionalError) {
            setAdditionalObjects(additionalData);
        }

        setIsLoading(false);
    }, []);

    // 초기 데이터 로드
    useEffect(() => {
        fetchMenus();
    }, [fetchMenus]);

    // 메뉴 선택 시 오브젝트 조회
    useEffect(() => {
        if (selectedMenu) {
            fetchMenuObjects(selectedMenu.id);
            // 폼 초기화
            setBasicForm(initialObjectForm);
            setAdditionalForm(initialObjectForm);
            setSelectedBasicObject(null);
            setSelectedAdditionalObject(null);
            setBasicFormDirty(false);
            setAdditionalFormDirty(false);
        } else {
            setBasicObjects([]);
            setAdditionalObjects([]);
        }
    }, [selectedMenu, fetchMenuObjects]);

    // 검색 실행
    const handleSearch = () => {
        if (!searchMenuName.trim()) {
            setFilteredMenus(menus);
            return;
        }

        const filtered = menus.filter(menu =>
            menu.menu_name.toLowerCase().includes(searchMenuName.toLowerCase()) ||
            menu.id.toLowerCase().includes(searchMenuName.toLowerCase())
        );
        setFilteredMenus(filtered);
    };

    // 검색 조건 초기화
    const handleReset = () => {
        setSearchMenuName('');
        setFilteredMenus(menus);
    };

    // 메뉴 행 클릭
    const handleMenuRowClick = (params: GridRowParams<Menu>) => {
        setSelectedMenu(params.row);
    };

    // 기본 OBJ 행 클릭
    const handleBasicObjectRowClick = (params: GridRowParams<MenuObject>) => {
        const obj = params.row;
        setSelectedBasicObject(obj);
        setBasicForm({
            id: obj.id,
            object_name: obj.object_name,
            action_url: obj.action_url,
            action_type: obj.action_type,
            sort_order: obj.sort_order,
            log_yn: obj.log_yn ? 'true' : 'false',
        });
        setBasicFormDirty(false);
    };

    // 추가 OBJ 행 클릭
    const handleAdditionalObjectRowClick = (params: GridRowParams<MenuObject>) => {
        const obj = params.row;
        setSelectedAdditionalObject(obj);
        setAdditionalForm({
            id: obj.id,
            object_name: obj.object_name,
            action_url: obj.action_url,
            action_type: obj.action_type,
            sort_order: obj.sort_order,
            log_yn: obj.log_yn ? 'true' : 'false',
        });
        setAdditionalFormDirty(false);
    };

    // 폼 입력 변경 핸들러
    const handleBasicFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBasicForm(prev => ({ ...prev, [name]: value }));
        setBasicFormDirty(true);
    };

    const handleBasicSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setBasicForm(prev => ({ ...prev, [name]: value }));
        setBasicFormDirty(true);
    };

    const handleAdditionalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAdditionalForm(prev => ({ ...prev, [name]: value }));
        setAdditionalFormDirty(true);
    };

    const handleAdditionalSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setAdditionalForm(prev => ({ ...prev, [name]: value }));
        setAdditionalFormDirty(true);
    };

    // 기본 OBJ 추가
    const handleAddBasicObject = () => {
        if (!selectedMenu) {
            setError('메뉴를 먼저 선택해주세요.');
            return;
        }
        setSelectedBasicObject(null);
        setBasicForm({
            ...initialObjectForm,
            sort_order: basicObjects.length + 1,
        });
        setBasicFormDirty(true);
    };

    // 추가 OBJ 추가
    const handleAddAdditionalObject = () => {
        if (!selectedMenu) {
            setError('메뉴를 먼저 선택해주세요.');
            return;
        }
        setSelectedAdditionalObject(null);
        setAdditionalForm({
            ...initialObjectForm,
            sort_order: additionalObjects.length + 1,
        });
        setAdditionalFormDirty(true);
    };

    // 기본 OBJ 저장
    const handleSaveBasicObject = async () => {
        if (!selectedMenu) {
            setError('메뉴를 먼저 선택해주세요.');
            return;
        }

        if (!basicForm.object_name || !basicForm.action_url) {
            setError('필수 항목을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const input: MenuObjectInput = {
            menu_id: selectedMenu.id,
            object_name: basicForm.object_name,
            action_url: basicForm.action_url,
            action_type: basicForm.action_type,
            sort_order: Number(basicForm.sort_order),
            log_yn: basicForm.log_yn === 'true',
            obj_type: 'basic',
        };

        if (selectedBasicObject) {
            // 수정
            const { error: updateError } = await menuApi.updateMenuObject(selectedBasicObject.id, input);
            if (updateError) {
                setError(updateError);
            } else {
                setSuccessMessage('저장되었습니다.');
                await fetchMenuObjects(selectedMenu.id);
            }
        } else {
            // 생성
            const { error: createError } = await menuApi.createMenuObject(input);
            if (createError) {
                setError(createError);
            } else {
                setSuccessMessage('생성되었습니다.');
                await fetchMenuObjects(selectedMenu.id);
            }
        }

        setBasicFormDirty(false);
        setIsLoading(false);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    // 추가 OBJ 저장
    const handleSaveAdditionalObject = async () => {
        if (!selectedMenu) {
            setError('메뉴를 먼저 선택해주세요.');
            return;
        }

        if (!additionalForm.object_name || !additionalForm.action_url) {
            setError('필수 항목을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const input: MenuObjectInput = {
            menu_id: selectedMenu.id,
            object_name: additionalForm.object_name,
            action_url: additionalForm.action_url,
            action_type: additionalForm.action_type,
            sort_order: Number(additionalForm.sort_order),
            log_yn: additionalForm.log_yn === 'true',
            obj_type: 'additional',
        };

        if (selectedAdditionalObject) {
            // 수정
            const { error: updateError } = await menuApi.updateMenuObject(selectedAdditionalObject.id, input);
            if (updateError) {
                setError(updateError);
            } else {
                setSuccessMessage('저장되었습니다.');
                await fetchMenuObjects(selectedMenu.id);
            }
        } else {
            // 생성
            const { error: createError } = await menuApi.createMenuObject(input);
            if (createError) {
                setError(createError);
            } else {
                setSuccessMessage('생성되었습니다.');
                await fetchMenuObjects(selectedMenu.id);
            }
        }

        setAdditionalFormDirty(false);
        setIsLoading(false);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    // 기본 OBJ 삭제
    const handleDeleteBasicObject = async () => {
        if (!selectedBasicObject) {
            setError('삭제할 오브젝트를 선택해주세요.');
            return;
        }

        if (!window.confirm('선택한 오브젝트를 삭제하시겠습니까?')) {
            return;
        }

        setIsLoading(true);
        const { error: deleteError } = await menuApi.deleteMenuObject(selectedBasicObject.id);

        if (deleteError) {
            setError(deleteError);
        } else {
            setSuccessMessage('삭제되었습니다.');
            setSelectedBasicObject(null);
            setBasicForm(initialObjectForm);
            if (selectedMenu) {
                await fetchMenuObjects(selectedMenu.id);
            }
        }

        setIsLoading(false);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    // 추가 OBJ 삭제
    const handleDeleteAdditionalObject = async () => {
        if (!selectedAdditionalObject) {
            setError('삭제할 오브젝트를 선택해주세요.');
            return;
        }

        if (!window.confirm('선택한 오브젝트를 삭제하시겠습니까?')) {
            return;
        }

        setIsLoading(true);
        const { error: deleteError } = await menuApi.deleteMenuObject(selectedAdditionalObject.id);

        if (deleteError) {
            setError(deleteError);
        } else {
            setSuccessMessage('삭제되었습니다.');
            setSelectedAdditionalObject(null);
            setAdditionalForm(initialObjectForm);
            if (selectedMenu) {
                await fetchMenuObjects(selectedMenu.id);
            }
        }

        setIsLoading(false);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="메뉴 OBJ 관리">
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

            <SearchArea>
                <FormField label="메뉴명" htmlFor="menu-name-search">
                    <TextField
                        id="menu-name-search"
                        value={searchMenuName}
                        onChange={(e) => setSearchMenuName(e.target.value)}
                        sx={{ width: '200px' }}
                        placeholder="메뉴명 또는 ID"
                    />
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 하단 4:3:3 비율의 메인 콘텐츠 영역 --- */}
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, overflow: 'hidden' }}>

                {/* --- 왼쪽 영역 (4) - 메뉴 그리드 --- */}
                <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
                    <SubTitleArea title={`메뉴 목록 (${filteredMenus.length}개)`}>
                        {isLoading && <CircularProgress size={20} />}
                    </SubTitleArea>
                    <DsDataGrid
                        rows={filteredMenus}
                        columns={menuGridColumns}
                        sx={{ flexGrow: 1 }}
                        hideFooter
                        showRowNumber
                        onRowClick={handleMenuRowClick}
                        loading={isLoading}
                        paginationModel={{ page: 0, pageSize: 100 }}
                    />
                </Box>

                {/* --- 중앙 영역 (3) - 객체/속성 그리드 --- */}
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* 중앙 상단 - 기본 OBJ 리스트 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title={`기본 OBJ 리스트 (${basicObjects.length}개)`} />
                        <DsDataGrid
                            rows={basicObjects}
                            columns={objectGridColumns}
                            sx={{ flexGrow: 1 }}
                            hideFooter
                            showRowNumber
                            onRowClick={handleBasicObjectRowClick}
                            loading={isLoading}
                            paginationModel={{ page: 0, pageSize: 50 }}
                        />
                    </Box>
                    {/* 중앙 하단 - 추가 OBJ 리스트 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title={`추가 OBJ 리스트 (${additionalObjects.length}개)`} />
                        <DsDataGrid
                            rows={additionalObjects}
                            columns={objectGridColumns}
                            sx={{ flexGrow: 1 }}
                            hideFooter
                            showRowNumber
                            onRowClick={handleAdditionalObjectRowClick}
                            loading={isLoading}
                            paginationModel={{ page: 0, pageSize: 50 }}
                        />
                    </Box>
                </Box>

                {/* --- 오른쪽 영역 (3) - 상세 정보 입력 폼 --- */}
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* 오른쪽 상단: 기본 OBJ 폼 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title="기본 OBJ">
                            <AddButton onClick={handleAddBasicObject} disabled={!selectedMenu} />
                            <DeleteButton onClick={handleDeleteBasicObject} disabled={!selectedBasicObject} />
                            <SaveButton onClick={handleSaveBasicObject} disabled={!basicFormDirty || isLoading} />
                        </SubTitleArea>
                        <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            <FormTableRow label="오브젝트명" required>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="object_name"
                                    value={basicForm.object_name}
                                    onChange={handleBasicFormChange}
                                    disabled={!selectedMenu}
                                />
                            </FormTableRow>
                            <FormTableRow label="액션 URL" required>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="action_url"
                                    value={basicForm.action_url}
                                    onChange={handleBasicFormChange}
                                    disabled={!selectedMenu}
                                />
                            </FormTableRow>
                            <FormTableRow label="정렬순번">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    name="sort_order"
                                    value={basicForm.sort_order}
                                    onChange={handleBasicFormChange}
                                    disabled={!selectedMenu}
                                />
                            </FormTableRow>
                            <FormTableRow label="동작구분">
                                <Select
                                    fullWidth
                                    name="action_type"
                                    value={basicForm.action_type}
                                    onChange={handleBasicSelectChange}
                                    disabled={!selectedMenu}
                                >
                                    {actionTypeOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                            <FormTableRow label="로그">
                                <Select
                                    fullWidth
                                    name="log_yn"
                                    value={basicForm.log_yn}
                                    onChange={handleBasicSelectChange}
                                    disabled={!selectedMenu}
                                >
                                    {logOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                        </Box>
                    </Box>

                    {/* 오른쪽 하단: 추가 OBJ 폼 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title="추가 OBJ">
                            <AddButton onClick={handleAddAdditionalObject} disabled={!selectedMenu} />
                            <DeleteButton onClick={handleDeleteAdditionalObject} disabled={!selectedAdditionalObject} />
                            <SaveButton onClick={handleSaveAdditionalObject} disabled={!additionalFormDirty || isLoading} />
                        </SubTitleArea>
                        <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            <FormTableRow label="오브젝트명" required>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="object_name"
                                    value={additionalForm.object_name}
                                    onChange={handleAdditionalFormChange}
                                    disabled={!selectedMenu}
                                />
                            </FormTableRow>
                            <FormTableRow label="액션 URL" required>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="action_url"
                                    value={additionalForm.action_url}
                                    onChange={handleAdditionalFormChange}
                                    disabled={!selectedMenu}
                                />
                            </FormTableRow>
                            <FormTableRow label="정렬순번">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    name="sort_order"
                                    value={additionalForm.sort_order}
                                    onChange={handleAdditionalFormChange}
                                    disabled={!selectedMenu}
                                />
                            </FormTableRow>
                            <FormTableRow label="동작구분">
                                <Select
                                    fullWidth
                                    name="action_type"
                                    value={additionalForm.action_type}
                                    onChange={handleAdditionalSelectChange}
                                    disabled={!selectedMenu}
                                >
                                    {actionTypeOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                            <FormTableRow label="로그">
                                <Select
                                    fullWidth
                                    name="log_yn"
                                    value={additionalForm.log_yn}
                                    onChange={handleAdditionalSelectChange}
                                    disabled={!selectedMenu}
                                >
                                    {logOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
