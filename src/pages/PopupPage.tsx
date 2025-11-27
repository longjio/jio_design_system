// src/pages/PopupPage.tsx
// 팝업 호출 기능 데모 페이지

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    TextField,
    Stack,
    Paper,
    Alert,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DsDialog from '../components/feedback/DsDialog';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import { TitleArea, SearchArea } from '../layouts';
import { DsButton } from '../components/button/DsButton';
import { SearchIconButton } from '../components/button';
import { FormField } from '../components/form/FormField';
import { profileApi } from '../api';
import { Profile } from '../types';

// 샘플 상품 데이터
const sampleProducts = [
    { id: 1, productCode: 'PRD001', name: '노트북 Pro 15', category: '전자기기', price: 1500000, stock: 50 },
    { id: 2, productCode: 'PRD002', name: '무선 마우스', category: '주변기기', price: 35000, stock: 200 },
    { id: 3, productCode: 'PRD003', name: '기계식 키보드', category: '주변기기', price: 120000, stock: 80 },
    { id: 4, productCode: 'PRD004', name: '27인치 모니터', category: '전자기기', price: 450000, stock: 30 },
    { id: 5, productCode: 'PRD005', name: 'USB-C 허브', category: '주변기기', price: 65000, stock: 150 },
    { id: 6, productCode: 'PRD006', name: '웹캠 HD', category: '주변기기', price: 89000, stock: 100 },
];

export default function PopupPage() {
    // 사용자 검색 팝업
    const [userPopupOpen, setUserPopupOpen] = useState(false);
    const [userSearchKeyword, setUserSearchKeyword] = useState('');
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
    const [users, setUsers] = useState<Profile[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
    const [userLoading, setUserLoading] = useState(false);

    // 상품 검색 팝업
    const [productPopupOpen, setProductPopupOpen] = useState(false);
    const [productSearchKeyword, setProductSearchKeyword] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<typeof sampleProducts[0] | null>(null);
    const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

    // 확인 팝업
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [confirmResult, setConfirmResult] = useState<string | null>(null);

    // 사용자 목록 조회
    const fetchUsers = useCallback(async () => {
        setUserLoading(true);
        const { profiles, error } = await profileApi.getProfiles();
        if (!error) {
            setUsers(profiles);
            setFilteredUsers(profiles);
        }
        setUserLoading(false);
    }, []);

    // 팝업 열릴 때 사용자 목록 조회
    useEffect(() => {
        if (userPopupOpen && users.length === 0) {
            fetchUsers();
        }
    }, [userPopupOpen, users.length, fetchUsers]);

    // 사용자 검색
    const handleUserSearch = () => {
        const keyword = userSearchKeyword.toLowerCase();
        setFilteredUsers(
            users.filter(
                user =>
                    (user.name?.toLowerCase() || '').includes(keyword) ||
                    (user.email?.toLowerCase() || '').includes(keyword) ||
                    (user.department?.toLowerCase() || '').includes(keyword)
            )
        );
    };

    // 상품 검색
    const handleProductSearch = () => {
        const keyword = productSearchKeyword.toLowerCase();
        setFilteredProducts(
            sampleProducts.filter(
                product =>
                    product.name.toLowerCase().includes(keyword) ||
                    product.productCode.toLowerCase().includes(keyword) ||
                    product.category.toLowerCase().includes(keyword)
            )
        );
    };

    // 사용자 선택
    const handleUserSelect = (user: Profile) => {
        setSelectedUser(user);
        setUserPopupOpen(false);
    };

    // 상품 선택
    const handleProductSelect = (product: typeof sampleProducts[0]) => {
        setSelectedProduct(product);
        setProductPopupOpen(false);
    };

    // 사용자 그리드 컬럼
    const userColumns: GridColDef[] = [
        { field: 'email', headerName: '이메일', width: 200 },
        { field: 'name', headerName: '이름', width: 100 },
        { field: 'department', headerName: '부서', width: 100 },
        { field: 'role', headerName: '역할', width: 100 },
        { field: 'company', headerName: '회사', flex: 1, minWidth: 120 },
        {
            field: 'action',
            headerName: '선택',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <DsButton
                    size="small"
                    variant="outlined"
                    onClick={() => handleUserSelect(params.row)}
                >
                    선택
                </DsButton>
            ),
        },
    ];

    // 상품 그리드 컬럼
    const productColumns: GridColDef[] = [
        { field: 'productCode', headerName: '상품코드', width: 100 },
        { field: 'name', headerName: '상품명', flex: 1, minWidth: 150 },
        { field: 'category', headerName: '카테고리', width: 100 },
        {
            field: 'price',
            headerName: '가격',
            width: 120,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => `${params.value?.toLocaleString()}원`,
        },
        { field: 'stock', headerName: '재고', width: 80, align: 'right', headerAlign: 'right' },
        {
            field: 'action',
            headerName: '선택',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <DsButton
                    size="small"
                    variant="outlined"
                    onClick={() => handleProductSelect(params.row)}
                >
                    선택
                </DsButton>
            ),
        },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <TitleArea title="팝업 호출" />

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                다양한 형태의 팝업 호출 기능을 데모합니다. 검색 팝업, 확인 팝업 등 실무에서 자주 사용되는 패턴을 확인할 수 있습니다.
            </Typography>

            <Stack spacing={4}>
                {/* 사용자 검색 팝업 데모 */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        사용자 검색 팝업
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        버튼을 클릭하여 사용자 검색 팝업을 열고, 검색 후 선택할 수 있습니다.
                    </Typography>

                    <SearchArea sx={{ mb: 0 }}>
                        <FormField label="사용자" htmlFor="selected-user" labelWidth={60}>
                            <TextField
                                id="selected-user"
                                value={selectedUser ? `${selectedUser.name || ''} (${selectedUser.email || ''})` : ''}
                                slotProps={{ input: { readOnly: true } }}
                                sx={{ width: 250 }}
                            />
                        </FormField>
                        <SearchIconButton
                            onClick={() => {
                                setUserSearchKeyword('');
                                setFilteredUsers(users);
                                setUserPopupOpen(true);
                            }}
                        />
                    </SearchArea>
                    {selectedUser && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            선택된 사용자: {selectedUser.name} / {selectedUser.department || '-'} / {selectedUser.email}
                        </Alert>
                    )}
                </Paper>

                {/* 상품 검색 팝업 데모 */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        상품 검색 팝업
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        버튼을 클릭하여 상품 검색 팝업을 열고, 검색 후 선택할 수 있습니다.
                    </Typography>

                    <SearchArea sx={{ mb: 0 }}>
                        <FormField label="상품" htmlFor="selected-product" labelWidth={60}>
                            <TextField
                                id="selected-product"
                                value={selectedProduct ? `${selectedProduct.name} (${selectedProduct.productCode})` : ''}
                                slotProps={{ input: { readOnly: true } }}
                                sx={{ width: 250 }}
                            />
                        </FormField>
                        <SearchIconButton
                            onClick={() => {
                                setProductSearchKeyword('');
                                setFilteredProducts(sampleProducts);
                                setProductPopupOpen(true);
                            }}
                        />
                    </SearchArea>
                    {selectedProduct && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            선택된 상품: {selectedProduct.name} / {selectedProduct.category} / {selectedProduct.price.toLocaleString()}원
                        </Alert>
                    )}
                </Paper>

                {/* 확인 팝업 데모 */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        확인/취소 팝업
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        사용자에게 확인을 요청하는 팝업입니다. 확인 또는 취소 선택 결과를 반환합니다.
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <DsButton
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setConfirmResult(null);
                                setConfirmPopupOpen(true);
                            }}
                        >
                            데이터 삭제
                        </DsButton>
                        {confirmResult && (
                            <Alert severity={confirmResult === '확인' ? 'success' : 'warning'}>
                                사용자 선택: {confirmResult}
                            </Alert>
                        )}
                    </Stack>
                </Paper>
            </Stack>

            {/* 사용자 검색 팝업 */}
            <DsDialog
                open={userPopupOpen}
                onClose={() => setUserPopupOpen(false)}
                title="사용자 검색"
                maxWidth="md"
                fullWidth
                actions={
                    <DsButton variant="outlined" onClick={() => setUserPopupOpen(false)}>닫기</DsButton>
                }
            >
                <Box>
                    <SearchArea sx={{ mb: 2, paddingLeft: 2 }}>
                        <TextField
                            size="small"
                            placeholder="이름, 이메일, 부서로 검색"
                            value={userSearchKeyword}
                            onChange={(e) => setUserSearchKeyword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleUserSearch()}
                            sx={{ width: 250 }}
                        />
                        <SearchIconButton onClick={handleUserSearch} />
                    </SearchArea>
                    <Box sx={{ height: 350 }}>
                        <DsDataGrid
                            rows={filteredUsers}
                            columns={userColumns}
                            hideFooter
                            showRowNumber
                            loading={userLoading}
                            onRowDoubleClick={(params) => handleUserSelect(params.row)}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        * 행을 더블클릭하면 바로 선택됩니다.
                    </Typography>
                </Box>
            </DsDialog>

            {/* 상품 검색 팝업 */}
            <DsDialog
                open={productPopupOpen}
                onClose={() => setProductPopupOpen(false)}
                title="상품 검색"
                maxWidth="md"
                fullWidth
                actions={
                    <DsButton variant="outlined" onClick={() => setProductPopupOpen(false)}>닫기</DsButton>
                }
            >
                <Box>
                    <SearchArea sx={{ mb: 2, paddingLeft: 2, paddingRight: 2 }}>
                        <TextField
                            size="small"
                            placeholder="상품명, 코드, 카테고리로 검색"
                            value={productSearchKeyword}
                            onChange={(e) => setProductSearchKeyword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleProductSearch()}
                            sx={{ width: 250 }}
                        />
                        <SearchIconButton onClick={handleProductSearch} />
                    </SearchArea>
                    <Box sx={{ height: 300 }}>
                        <DsDataGrid
                            rows={filteredProducts}
                            columns={productColumns}
                            hideFooter
                            showRowNumber
                            onRowDoubleClick={(params) => handleProductSelect(params.row)}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        * 행을 더블클릭하면 바로 선택됩니다.
                    </Typography>
                </Box>
            </DsDialog>

            {/* 확인 팝업 */}
            <DsDialog
                open={confirmPopupOpen}
                onClose={() => setConfirmPopupOpen(false)}
                title="삭제 확인"
                maxWidth="xs"
                actions={
                    <>
                        <DsButton
                            variant="outlined"
                            onClick={() => {
                                setConfirmResult('취소');
                                setConfirmPopupOpen(false);
                            }}
                        >
                            취소
                        </DsButton>
                        <DsButton
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setConfirmResult('확인');
                                setConfirmPopupOpen(false);
                            }}
                        >
                            삭제
                        </DsButton>
                    </>
                }
            >
                <Typography>
                    선택한 데이터를 삭제하시겠습니까?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    이 작업은 되돌릴 수 없습니다.
                </Typography>
            </DsDialog>
        </Box>
    );
}
