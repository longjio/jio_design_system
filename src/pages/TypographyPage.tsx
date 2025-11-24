import React from 'react';
import { Stack, Box, Divider, Paper } from '@mui/material';

// 커스텀 타이포그래피 컴포넌트 import
import { HeadlineL, HeadlineM, HeadlineS, TitleL, TitleM, TitleS, TitleXS, BodyL, BodyM, BodyS, BodyXS } from '../components/typography';

const TypographyPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Stack spacing={4}>
                {/* 페이지 제목 */}
                <Box>
                    <TitleM sx={{ mb: 1 }}>Typography System</TitleM>
                    <BodyM color="text.secondary">
                        Pretendard 폰트를 기반으로 한 타이포그래피 시스템입니다.
                        Headline, Title, Body 3가지 카테고리로 구성되어 있습니다.
                    </BodyM>
                </Box>

                <Divider />

                {/* Headline 그룹 */}
                <Box>
                    <TitleS sx={{ mb: 3 }}>Headline</TitleS>
                    <BodyS color="text.secondary" sx={{ mb: 3 }}>
                        주요 제목 및 랜딩 페이지에서 사용되는 가장 큰 텍스트 스타일입니다. (Bold 700)
                    </BodyS>

                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Headline Large - 48px / Bold</BodyXS>
                                <HeadlineL>Pretendard Bold 48 대형 헤드라인 스타일</HeadlineL>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 메인 랜딩 페이지 타이틀, 주요 캠페인 헤더
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Headline Medium - 40px / Bold</BodyXS>
                                <HeadlineM>Pretendard Bold 40 중형 헤드라인 스타일</HeadlineM>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 섹션 타이틀, 주요 컨텐츠 헤더
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Headline Small - 36px / Bold</BodyXS>
                                <HeadlineS>Pretendard Bold 36 소형 헤드라인 스타일</HeadlineS>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 서브 섹션 타이틀, 카드 헤더
                                </BodyXS>
                            </Stack>
                        </Paper>
                    </Stack>
                </Box>

                <Divider />

                {/* Title 그룹 */}
                <Box>
                    <TitleS sx={{ mb: 3 }}>Title</TitleS>
                    <BodyS color="text.secondary" sx={{ mb: 3 }}>
                        페이지 및 컴포넌트의 제목으로 사용되는 텍스트 스타일입니다. (Semibold 600)
                    </BodyS>

                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Title Large - 30px / Semibold</BodyXS>
                                <TitleL>Pretendard Semibold 30 대형 타이틀 스타일</TitleL>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 페이지 메인 타이틀, 다이얼로그 헤더
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Title Medium - 26px / Semibold</BodyXS>
                                <TitleM>Pretendard Semibold 26 중형 타이틀 스타일</TitleM>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 섹션 서브 타이틀, 컴포넌트 그룹 제목
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Title Small - 24px / Semibold</BodyXS>
                                <TitleS>Pretendard Semibold 24 소형 타이틀 스타일</TitleS>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 카드 타이틀, 리스트 헤더
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Title XSmall - 20px / Semibold</BodyXS>
                                <TitleXS>Pretendard Semibold 20 초소형 타이틀 스타일</TitleXS>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 작은 컴포넌트 제목, 폼 섹션 헤더
                                </BodyXS>
                            </Stack>
                        </Paper>
                    </Stack>
                </Box>

                <Divider />

                {/* Body 그룹 */}
                <Box>
                    <TitleS sx={{ mb: 3 }}>Body</TitleS>
                    <BodyS color="text.secondary" sx={{ mb: 3 }}>
                        본문 및 일반 텍스트 콘텐츠에 사용되는 텍스트 스타일입니다. (Regular 400)
                    </BodyS>

                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Body Large - 20px / Regular</BodyXS>
                                <BodyL>Pretendard Regular 20 대형 본문 스타일 - 중요한 설명이나 강조가 필요한 본문 텍스트에 사용됩니다.</BodyL>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 인트로 텍스트, 중요 안내문구
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Body Medium - 16px / Regular</BodyXS>
                                <BodyM>Pretendard Regular 16 중형 본문 스타일 - 가장 일반적으로 사용되는 본문 텍스트 스타일입니다. 대부분의 콘텐츠에서 사용됩니다.</BodyM>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 일반 본문, 설명 텍스트, 리스트 아이템
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Body Small - 14px / Regular</BodyXS>
                                <BodyS>Pretendard Regular 14 소형 본문 스타일 - 부가적인 설명이나 보조 텍스트에 사용됩니다. 공간이 제한적인 곳에서 활용됩니다.</BodyS>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 캡션, 보조 설명, 폼 도움말
                                </BodyXS>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <BodyXS color="text.secondary">Body XSmall - 12px / Regular</BodyXS>
                                <BodyXS>Pretendard Regular 12 초소형 본문 스타일 - 메타 정보나 라벨 등 가장 작은 텍스트에 사용됩니다. 가독성을 유지하면서 최소한의 공간을 차지합니다.</BodyXS>
                                <BodyXS color="text.secondary" sx={{ mt: 1 }}>
                                    사용 예: 타임스탬프, 라벨, 메타데이터
                                </BodyXS>
                            </Stack>
                        </Paper>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default TypographyPage;
