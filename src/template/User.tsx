// src/template/User.tsx

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
    PrintButton,
    SaveButton,
} from '../components/button';

// API 및 타입 import
import { profileApi } from '../api';
import { Profile } from '../types';

// 그리드 컬럼 정의
const userGridColumns: GridColDef[] = [
    { field: 'email', headerName: '이메일', width: 200 },
    { field: 'name', headerName: '사용자명', width: 100, align: 'center' },
    { field: 'department', headerName: '부서', width: 120 },
    { field: 'company', headerName: '회사', width: 120 },
    { field: 'role', headerName: '역할', width: 80, align: 'center' },
    {
        field: 'is_active',
        headerName: '상태',
        width: 80,
        align: 'center',
        valueGetter: (value: boolean) => value ? '활성' : '비활성'
    },
    { field: 'description', headerName: '설명', flex: 1, minWidth: 150 },
    {
        field: 'created_at',
        headerName: '등록일시',
        width: 150,
        valueGetter: (value: string) => value ? new Date(value).toLocaleString('ko-KR') : ''
    },
    {
        field: 'updated_at',
        headerName: '수정일시',
        width: 150,
        valueGetter: (value: string) => value ? new Date(value).toLocaleString('ko-KR') : ''
    },
];

// Select 옵션 데이터
const roleOptions = [
    { value: 'all', label: '전체' },
    { value: 'admin', label: '관리자' },
    { value: 'user', label: '사용자' },
];

const statusOptions = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '활성' },
    { value: 'inactive', label: '비활성' },
];

const roleOptionsForForm = [
    { value: 'admin', label: '관리자' },
    { value: 'user', label: '사용자' },
];

const statusOptionsForForm = [
    { value: 'true', label: '활성' },
    { value: 'false', label: '비활성' },
];

export default function UserPage() {
    // 데이터 State
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 조회 조건 State
    const [searchRole, setSearchRole] = useState('all');
    const [searchStatus, setSearchStatus] = useState('all');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchName, setSearchName] = useState('');

    // 상세 정보 폼 State
    const [formState, setFormState] = useState({
        id: '',
        email: '',
        name: '',
        department: '',
        company: '',
        role: 'user',
        is_active: 'true',
        description: '',
    });

    // 프로필 목록 조회
    const fetchProfiles = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const { profiles: data, error: fetchError } = await profileApi.getProfiles();

        if (fetchError) {
            setError(fetchError);
        } else {
            setProfiles(data);
            setFilteredProfiles(data);
        }

        setIsLoading(false);
    }, []);

    // 초기 데이터 로드
    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    // 검색 필터링
    const handleSearch = () => {
        let filtered = [...profiles];

        // 역할 필터
        if (searchRole !== 'all') {
            filtered = filtered.filter(p => p.role === searchRole);
        }

        // 상태 필터
        if (searchStatus !== 'all') {
            const isActive = searchStatus === 'active';
            filtered = filtered.filter(p => p.is_active === isActive);
        }

        // 이메일 필터
        if (searchEmail) {
            filtered = filtered.filter(p =>
                p.email?.toLowerCase().includes(searchEmail.toLowerCase())
            );
        }

        // 이름 필터
        if (searchName) {
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        setFilteredProfiles(filtered);
    };

    // 검색 조건 초기화
    const handleReset = () => {
        setSearchRole('all');
        setSearchStatus('all');
        setSearchEmail('');
        setSearchName('');
        setFilteredProfiles(profiles);
    };

    // 그리드 행 클릭 시 상세 폼에 데이터 표시
    const handleRowClick = (params: GridRowParams<Profile>) => {
        const profile = params.row;
        setSelectedProfile(profile);
        setFormState({
            id: profile.id,
            email: profile.email || '',
            name: profile.name || '',
            department: profile.department || '',
            company: profile.company || '',
            role: profile.role || 'user',
            is_active: profile.is_active ? 'true' : 'false',
            description: profile.description || '',
        });
    };

    // 상세 폼 입력 변경 핸들러
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // 상세 폼 Select 변경 핸들러
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // 프로필 저장
    const handleSave = async () => {
        if (!selectedProfile) {
            setError('수정할 사용자를 선택해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        const { profile, error: updateError } = await profileApi.updateProfile(
            formState.id,
            {
                name: formState.name,
                department: formState.department,
                company: formState.company,
                role: formState.role,
                is_active: formState.is_active === 'true',
                description: formState.description,
            }
        );

        if (updateError) {
            setError(updateError);
        } else if (profile) {
            setSuccessMessage('저장되었습니다.');
            // 목록 갱신
            await fetchProfiles();
            // 3초 후 성공 메시지 제거
            setTimeout(() => setSuccessMessage(null), 3000);
        }

        setIsLoading(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="사용자 관리">
                <PrintButton onClick={() => alert('인쇄 버튼 클릭')} />
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
                <FormField label="역할" htmlFor="role-search">
                    <Select
                        id="role-search"
                        value={searchRole}
                        onChange={(e) => setSearchRole(e.target.value)}
                        sx={{ width: '150px' }}
                    >
                        {roleOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <FormField label="상태" htmlFor="status-search">
                    <Select
                        id="status-search"
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                        sx={{ width: '150px' }}
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <FormField label="이메일" htmlFor="email-search">
                    <TextField
                        id="email-search"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        sx={{ width: '200px' }}
                    />
                </FormField>
                <FormField label="사용자명" htmlFor="user-name-search">
                    <TextField
                        id="user-name-search"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        sx={{ width: '200px' }}
                    />
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 하단 7.5:2.5 비율의 메인 콘텐츠 영역 --- */}
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, mt: 3, overflow: 'hidden' }}>

                {/* --- 왼쪽 영역 (7.5) - 사용자 그리드 --- */}
                <Box sx={{ flex: 7.5, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <SubTitleArea title={`사용자 목록 (${filteredProfiles.length}명)`}>
                        {isLoading && <CircularProgress size={20} />}
                    </SubTitleArea>
                    <DsDataGrid
                        rows={filteredProfiles}
                        columns={userGridColumns}
                        sx={{ flexGrow: 1 }}
                        showRowNumber
                        hideFooter
                        onRowClick={handleRowClick}
                        loading={isLoading}
                        paginationModel={{ page: 0, pageSize: 100 }}
                    />
                </Box>

                {/* --- 오른쪽 영역 (2.5) - 상세 정보 입력 폼 --- */}
                <Box sx={{ flex: 2.5, display: 'flex', flexDirection: 'column' }}>
                    <SubTitleArea title="사용자 상세 정보">
                        <SaveButton onClick={handleSave} disabled={!selectedProfile || isLoading} />
                    </SubTitleArea>
                    <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <FormTableRow label="이메일">
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="email"
                                value={formState.email}
                                disabled
                            />
                        </FormTableRow>
                        <FormTableRow label="사용자명">
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="name"
                                value={formState.name}
                                onChange={handleFormChange}
                            />
                        </FormTableRow>
                        <FormTableRow label="부서">
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="department"
                                value={formState.department}
                                onChange={handleFormChange}
                            />
                        </FormTableRow>
                        <FormTableRow label="회사">
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="company"
                                value={formState.company}
                                onChange={handleFormChange}
                            />
                        </FormTableRow>
                        <FormTableRow label="역할">
                            <Select
                                fullWidth
                                name="role"
                                value={formState.role}
                                onChange={handleSelectChange}
                            >
                                {roleOptionsForForm.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="상태">
                            <Select
                                fullWidth
                                name="is_active"
                                value={formState.is_active}
                                onChange={handleSelectChange}
                            >
                                {statusOptionsForForm.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="설명">
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                variant="outlined"
                                name="description"
                                value={formState.description}
                                onChange={handleFormChange}
                            />
                        </FormTableRow>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
