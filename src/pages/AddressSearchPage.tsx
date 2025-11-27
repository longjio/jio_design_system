// src/pages/AddressSearchPage.tsx
// 우편번호 검색 페이지 - Daum 우편번호 서비스 연동 데모

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    TextField,
    Stack,
    Paper,
    Alert,
    Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DsDialog from '../components/feedback/DsDialog';
import { TitleArea } from '../layouts';
import { DsButton } from '../components/button/DsButton';

// Daum 우편번호 서비스 타입 정의
declare global {
    interface Window {
        daum: {
            Postcode: new (options: {
                oncomplete: (data: DaumPostcodeData) => void;
                onclose?: () => void;
                width?: string | number;
                height?: string | number;
            }) => {
                open: () => void;
                embed: (container: HTMLElement) => void;
            };
        };
    }
}

interface DaumPostcodeData {
    zonecode: string;         // 우편번호
    address: string;          // 기본 주소
    addressEnglish: string;   // 영문 주소
    addressType: string;      // 주소 타입 (R: 도로명, J: 지번)
    roadAddress: string;      // 도로명 주소
    roadAddressEnglish: string;
    jibunAddress: string;     // 지번 주소
    jibunAddressEnglish: string;
    buildingName: string;     // 건물명
    buildingCode: string;     // 건물 코드
    apartment: string;        // 아파트 여부 (Y/N)
    sido: string;             // 시/도
    sidoEnglish: string;
    sigungu: string;          // 시/군/구
    sigunguEnglish: string;
    sigunguCode: string;      // 시/군/구 코드
    bname: string;            // 법정동/법정리 이름
    bname1: string;           // 법정동/법정리 이름 (읍/면)
    bname2: string;           // 법정동/법정리 이름 (동/리)
    bnameEnglish: string;
    roadname: string;         // 도로명
    roadnameEnglish: string;
    hname: string;            // 행정동 이름
    query: string;            // 검색어
    userSelectedType: string; // 사용자가 선택한 주소 타입
}

interface AddressInfo {
    zonecode: string;
    address: string;
    roadAddress: string;
    jibunAddress: string;
    detailAddress: string;
    buildingName: string;
    sido: string;
    sigungu: string;
}

export default function AddressSearchPage() {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [embedOpen, setEmbedOpen] = useState(false);

    // 팝업 방식 주소
    const [popupAddress, setPopupAddress] = useState<AddressInfo | null>(null);
    const [popupDetailAddress, setPopupDetailAddress] = useState('');

    // 임베드 방식 주소
    const [embedAddress, setEmbedAddress] = useState<AddressInfo | null>(null);
    const [embedDetailAddress, setEmbedDetailAddress] = useState('');

    // 복사 완료 메시지
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    // Daum 우편번호 스크립트 로드
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // 팝업 방식 주소 검색
    const handlePopupSearch = useCallback(() => {
        if (!scriptLoaded || !window.daum) return;

        new window.daum.Postcode({
            oncomplete: (data: DaumPostcodeData) => {
                setPopupAddress({
                    zonecode: data.zonecode,
                    address: data.address,
                    roadAddress: data.roadAddress,
                    jibunAddress: data.jibunAddress,
                    detailAddress: '',
                    buildingName: data.buildingName,
                    sido: data.sido,
                    sigungu: data.sigungu,
                });
                setPopupDetailAddress('');
            },
        }).open();
    }, [scriptLoaded]);

    // 임베드 방식 주소 검색
    const handleEmbedSearch = useCallback(() => {
        setEmbedOpen(true);
    }, []);

    // 임베드 컨테이너에 우편번호 서비스 렌더링
    const embedRef = useCallback((container: HTMLDivElement | null) => {
        if (!container || !scriptLoaded || !window.daum) return;

        new window.daum.Postcode({
            oncomplete: (data: DaumPostcodeData) => {
                setEmbedAddress({
                    zonecode: data.zonecode,
                    address: data.address,
                    roadAddress: data.roadAddress,
                    jibunAddress: data.jibunAddress,
                    detailAddress: '',
                    buildingName: data.buildingName,
                    sido: data.sido,
                    sigungu: data.sigungu,
                });
                setEmbedDetailAddress('');
                setEmbedOpen(false);
            },
            onclose: () => {
                setEmbedOpen(false);
            },
            width: '100%',
            height: '100%',
        }).embed(container);
    }, [scriptLoaded]);

    // 주소 복사
    const handleCopyAddress = (address: AddressInfo, detailAddress: string) => {
        const fullAddress = `(${address.zonecode}) ${address.address} ${detailAddress}`.trim();
        navigator.clipboard.writeText(fullAddress).then(() => {
            setCopyMessage('주소가 클립보드에 복사되었습니다.');
            setTimeout(() => setCopyMessage(null), 2000);
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <TitleArea title="우편번호 검색" />

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Daum 우편번호 서비스를 활용한 주소 검색 기능입니다. 팝업 방식과 임베드 방식 두 가지를 제공합니다.
            </Typography>

            {!scriptLoaded && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    우편번호 서비스를 로딩 중입니다...
                </Alert>
            )}

            {copyMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {copyMessage}
                </Alert>
            )}

            <Stack spacing={4}>
                {/* 팝업 방식 */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        팝업 방식
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        버튼 클릭 시 새 창(레이어)이 열리며 주소를 검색합니다. 가장 일반적인 방식입니다.
                    </Typography>

                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <TextField
                                label="우편번호"
                                value={popupAddress?.zonecode || ''}
                                InputProps={{ readOnly: true }}
                                size="small"
                                sx={{ width: 120 }}
                            />
                            <DsButton
                                variant="contained"
                                startIcon={<SearchIcon />}
                                onClick={handlePopupSearch}
                                disabled={!scriptLoaded}
                            >
                                우편번호 검색
                            </DsButton>
                        </Stack>

                        <TextField
                            label="기본 주소"
                            value={popupAddress?.address || ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            size="small"
                        />

                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="상세 주소"
                                placeholder="상세 주소를 입력하세요"
                                value={popupDetailAddress}
                                onChange={(e) => setPopupDetailAddress(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={!popupAddress}
                            />
                            {popupAddress && (
                                <DsButton
                                    variant="outlined"
                                    startIcon={<ContentCopyIcon />}
                                    onClick={() => handleCopyAddress(popupAddress, popupDetailAddress)}
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    주소 복사
                                </DsButton>
                            )}
                        </Stack>

                        {popupAddress && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    검색 결과 상세
                                </Typography>
                                <Stack spacing={0.5}>
                                    <Typography variant="body2">
                                        <strong>도로명 주소:</strong> {popupAddress.roadAddress}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>지번 주소:</strong> {popupAddress.jibunAddress}
                                    </Typography>
                                    {popupAddress.buildingName && (
                                        <Typography variant="body2">
                                            <strong>건물명:</strong> {popupAddress.buildingName}
                                        </Typography>
                                    )}
                                    <Typography variant="body2">
                                        <strong>시/도:</strong> {popupAddress.sido} | <strong>시/군/구:</strong> {popupAddress.sigungu}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </Paper>

                {/* 임베드 방식 */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        임베드 방식 (다이얼로그)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        다이얼로그 내에 우편번호 검색 UI를 임베드합니다. 페이지 이탈 없이 검색이 가능합니다.
                    </Typography>

                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <TextField
                                label="우편번호"
                                value={embedAddress?.zonecode || ''}
                                InputProps={{ readOnly: true }}
                                size="small"
                                sx={{ width: 120 }}
                            />
                            <DsButton
                                variant="contained"
                                startIcon={<SearchIcon />}
                                onClick={handleEmbedSearch}
                                disabled={!scriptLoaded}
                            >
                                우편번호 검색
                            </DsButton>
                        </Stack>

                        <TextField
                            label="기본 주소"
                            value={embedAddress?.address || ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            size="small"
                        />

                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="상세 주소"
                                placeholder="상세 주소를 입력하세요"
                                value={embedDetailAddress}
                                onChange={(e) => setEmbedDetailAddress(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={!embedAddress}
                            />
                            {embedAddress && (
                                <DsButton
                                    variant="outlined"
                                    startIcon={<ContentCopyIcon />}
                                    onClick={() => handleCopyAddress(embedAddress, embedDetailAddress)}
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    주소 복사
                                </DsButton>
                            )}
                        </Stack>

                        {embedAddress && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    검색 결과 상세
                                </Typography>
                                <Stack spacing={0.5}>
                                    <Typography variant="body2">
                                        <strong>도로명 주소:</strong> {embedAddress.roadAddress}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>지번 주소:</strong> {embedAddress.jibunAddress}
                                    </Typography>
                                    {embedAddress.buildingName && (
                                        <Typography variant="body2">
                                            <strong>건물명:</strong> {embedAddress.buildingName}
                                        </Typography>
                                    )}
                                    <Typography variant="body2">
                                        <strong>시/도:</strong> {embedAddress.sido} | <strong>시/군/구:</strong> {embedAddress.sigungu}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </Paper>

                {/* 사용 안내 */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        사용 안내
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={1}>
                        <Typography variant="body2">
                            • 이 기능은 <strong>Daum 우편번호 서비스</strong>를 사용합니다.
                        </Typography>
                        <Typography variant="body2">
                            • 도로명 주소와 지번 주소 모두 검색 가능합니다.
                        </Typography>
                        <Typography variant="body2">
                            • 건물명, 아파트명으로도 검색할 수 있습니다.
                        </Typography>
                        <Typography variant="body2">
                            • 검색 후 상세 주소를 입력하면 전체 주소를 복사할 수 있습니다.
                        </Typography>
                    </Stack>
                </Paper>
            </Stack>

            {/* 임베드 다이얼로그 */}
            <DsDialog
                open={embedOpen}
                onClose={() => setEmbedOpen(false)}
                title="우편번호 검색"
                maxWidth="sm"
                fullWidth
            >
                <Box
                    ref={embedRef}
                    sx={{ width: '100%', height: 450 }}
                />
            </DsDialog>
        </Box>
    );
}
