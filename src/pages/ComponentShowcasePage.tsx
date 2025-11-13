import { Box, Stack, Typography, Paper, Chip, Card, Divider } from '@mui/material';
import DsGrid from '../components/layout/DsGrid';
import { TitleL, BodyM, TitleM } from '../components/typography';

const ComponentShowcasePage = () => {
    // 기술 스택 데이터
    const techStack = [
        { category: 'Core', items: ['React 18.3.1', 'TypeScript 4.9.5', 'React Router 6.25'] },
        { category: 'UI Framework', items: ['Material-UI v7', 'MUI X v8'] },
        { category: 'State Management', items: ['Zustand 5', 'React Context'] },
        { category: 'Charts & Data', items: ['MUI X Charts', 'MUI X DataGrid', 'MUI X DatePickers'] },
        { category: 'Utilities', items: ['Day.js (Date Library)', 'Pretendard Font'] },
        { category: 'Build Tools', items: ['Create React App', 'Webpack'] },
    ];

    return (
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Stack spacing={5}>
                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <TitleL sx={{ mb: 2 }}>SSG Design System</TitleL>
                    <Box sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto', mb: 3, textAlign: 'center' }}>
                        <BodyM>React와 Material-UI 기반의 엔터프라이즈급 디자인 시스템입니다.</BodyM>
                        <BodyM>재사용 가능한 컴포넌트, 일관된 디자인 토큰, 그리고 포괄적인 문서를 제공합니다.</BodyM>
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Chip label="React 18.3.1" color="primary" />
                        <Chip label="TypeScript 4.9" color="secondary" />
                        <Chip label="MUI v7" color="success" />
                        <Chip label="Enterprise Ready" color="info" />
                    </Stack>
                </Box>

                {/* Tech Stack Section */}
                <Box>
                    <TitleM sx={{ mb: 3, textAlign: 'center' }}>기술 스택</TitleM>
                    <DsGrid container spacing={3}>
                        {techStack.map((tech, index) => (
                            <DsGrid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Paper sx={{ p: 3, height: '100%' }}>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                                        {tech.category}
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack spacing={1}>
                                        {tech.items.map((item, idx) => (
                                            <Typography key={idx} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                                • {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Paper>
                            </DsGrid>
                        ))}
                    </DsGrid>
                </Box>

                {/* Design System Structure */}
                <Box>
                    <TitleM sx={{ mb: 3, textAlign: 'center' }}>디자인 시스템 구조</TitleM>
                    <DsGrid container spacing={3}>
                        <DsGrid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Foundations
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    디자인의 기본 구성 요소
                                </Typography>
                                <Stack spacing={1}>
                                    <Typography variant="body2">• Color Palette - 색상 시스템</Typography>
                                    <Typography variant="body2">• Typography - 타이포그래피 스타일</Typography>
                                    <Typography variant="body2">• Spacing - 간격 시스템</Typography>
                                    <Typography variant="body2">• Shadow - 그림자 레벨</Typography>
                                    <Typography variant="body2">• Border - 테두리 스타일</Typography>
                                    <Typography variant="body2">• Radius - 모서리 반경</Typography>
                                </Stack>
                            </Card>
                        </DsGrid>
                        <DsGrid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Layout
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    레이아웃 구성 컴포넌트
                                </Typography>
                                <Stack spacing={1}>
                                    <Typography variant="body2">• Box - 기본 컨테이너</Typography>
                                    <Typography variant="body2">• Container - 중앙 정렬 컨테이너</Typography>
                                    <Typography variant="body2">• Stack - 플렉스 레이아웃</Typography>
                                    <Typography variant="body2">• Grid - 그리드 시스템</Typography>
                                    <Typography variant="body2">• Image List - 이미지 그리드</Typography>
                                </Stack>
                            </Card>
                        </DsGrid>
                        <DsGrid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Components
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    재사용 가능한 UI 컴포넌트
                                </Typography>
                                <Stack spacing={1}>
                                    <Typography variant="body2">• Input - 입력 컴포넌트</Typography>
                                    <Typography variant="body2">• Navigation - 네비게이션</Typography>
                                    <Typography variant="body2">• Surface - 표면 컴포넌트</Typography>
                                    <Typography variant="body2">• Feedback - 피드백 컴포넌트</Typography>
                                    <Typography variant="body2">• MUI X - 고급 컴포넌트</Typography>
                                </Stack>
                            </Card>
                        </DsGrid>
                        <DsGrid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Patterns
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    실제 사용 예시와 템플릿
                                </Typography>
                                <Stack spacing={1}>
                                    <Typography variant="body2">• Dashboard - 대시보드 예시</Typography>
                                    <Typography variant="body2">• Signup Page - 회원가입 페이지</Typography>
                                    <Typography variant="body2">• Data Management - 데이터 관리 페이지</Typography>
                                    <Typography variant="body2">• User Management - 사용자 관리</Typography>
                                    <Typography variant="body2">• Authorization - 권한 관리</Typography>
                                </Stack>
                            </Card>
                        </DsGrid>
                    </DsGrid>
                </Box>

                {/* Getting Started Section */}
                <Box>
                    <Paper sx={{ p: 4, bgcolor: 'action.hover' }}>
                        <TitleM sx={{ mb: 2 }}>시작하기</TitleM>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    1. Foundations 탐색
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    왼쪽 메뉴에서 Foundations 그룹을 선택하여 색상, 타이포그래피, 간격 등 기본 디자인 토큰을 확인하세요.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    2. Layout 컴포넌트 학습
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Layout 메뉴에서 Box, Stack, Grid 등 레이아웃 구성에 필요한 컴포넌트를 학습하세요.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    3. Components 활용
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Components 메뉴에서 Input, Navigation, Surface 등 다양한 카테고리의 컴포넌트를 탐색하고 활용하세요.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    4. Patterns 참고
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Patterns 메뉴에서 실제 페이지 구현 예시를 확인하고 프로젝트에 적용하세요.
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>

                {/* Footer Info */}
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        Built with React 18.3.1, TypeScript 4.9.5, and Material-UI v7
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        © 2024 SSG Pay System Design System
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default ComponentShowcasePage;
