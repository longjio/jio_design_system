import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import DsProgress from '../components/feedback/DsProgress';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';

const ProgressPage = () => {
    // DsProgress Props 정의
    const progressProps: PropDefinition[] = [
        {
            name: 'variant',
            type: "'circular' | 'linear' | 'buffer'",
            defaultValue: "'circular'",
            description: 'Progress의 형태를 결정합니다.',
        },
        {
            name: 'value',
            type: 'number',
            description: '진행률을 나타내는 값입니다. (0-100 사이)',
        },
        {
            name: 'valueBuffer',
            type: 'number',
            description: '버퍼링 진행률을 나타내는 값입니다. (variant="buffer"일 때만 사용)',
        },
        {
            name: 'color',
            type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'",
            defaultValue: "'primary'",
            description: 'Progress의 색상을 결정합니다.',
        },
        {
            name: 'size',
            type: 'number',
            defaultValue: '40',
            description: 'Circular Progress의 크기를 지정합니다. (픽셀 단위)',
        },
        {
            name: 'thickness',
            type: 'number',
            defaultValue: '3.6',
            description: 'Circular Progress의 선 두께를 지정합니다.',
        },
        {
            name: 'withLabel',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 진행률 값이 중앙에 표시됩니다. (circular variant에서만 작동)',
        },
    ];

    const [progress, setProgress] = useState(10);
    const [bufferProgress, setBufferProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);

    // Determinate progress timer
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 10 : prev + 10));
        }, 800);
        return () => clearInterval(timer);
    }, []);

    // Buffer progress timer
    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (bufferProgress >= 100) {
                setBufferProgress(0);
                setBuffer(10);
            } else {
                const newProgress = bufferProgress + 1;
                setBufferProgress(newProgress);

                if (newProgress % 5 === 0 && buffer < 100) {
                    const newBuffer = buffer + 1 + Math.random() * 10;
                    setBuffer(newBuffer > 100 ? 100 : newBuffer);
                }
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 100);
        return () => clearInterval(timer);
    }, []);


    const circularProgressCode = `
<DsProgress />
<DsProgress color="secondary" />
<DsProgress color="success" />
<DsProgress color="error" />
    `;

    const circularDeterminateCode = `
<DsProgress variant="circular" value={progress} />
<DsProgress variant="circular" withLabel value={progress} color="success" />
    `;

    const linearProgressCode = `
<DsProgress variant="linear" />
    `;

    const linearDeterminateCode = `
<DsProgress variant="linear" value={progress} />
<DsProgress variant="linear" withLabel value={progress} color="success" />
    `;

    const linearBufferCode = `
<DsProgress variant="buffer" value={bufferProgress} valueBuffer={buffer} />
    `;

    const customSizeCode = `
<DsProgress size={60} />
<DsProgress size={80} thickness={5} color="secondary" />
<DsProgress variant="circular" withLabel value={75} size={100} thickness={2} />
    `;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <Stack spacing={4}>
                <Box>
                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                        Progress indicator(진행 표시기)는 지정되지 않은 대기 시간을 알리거나 작업의 진행률을 표시합니다.
                    </Typography>
                </Box>

            <ComponentShowcase
                title="Circular Progress"
                description="원형 진행 표시기는 빙글빙글 돌며 진행 상태를 나타냅니다."
                component={
                    <Stack spacing={2} direction="row">
                        <DsProgress />
                        <DsProgress color="secondary" />
                        <DsProgress color="success" />
                        <DsProgress color="error" />
                    </Stack>
                }
                code={circularProgressCode}
            />

            <ComponentShowcase
                title="Circular Determinate"
                description="확정적 원형 진행 표시기는 작업의 완료율을 명확하게 보여줍니다."
                component={
                    <Stack spacing={2} direction="row">
                        <DsProgress variant="circular" value={progress} />
                        <DsProgress variant="circular" withLabel value={progress} color="success" />
                    </Stack>
                }
                code={circularDeterminateCode}
            />

            <ComponentShowcase
                title="Linear Progress"
                description="선형 진행 표시기는 가로 막대를 통해 진행 상태를 나타냅니다."
                component={
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <DsProgress variant="linear" />
                    </Stack>
                }
                code={linearProgressCode}
            />

            <ComponentShowcase
                title="Linear Determinate"
                description="확정적 선형 진행 표시기는 작업의 완료율을 선형 막대로 보여줍니다."
                component={
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <DsProgress variant="linear" value={progress} />
                        <DsProgress variant="linear" withLabel value={progress} color="success" />
                    </Stack>
                }
                code={linearDeterminateCode}
            />

            <ComponentShowcase
                title="Linear Buffer"
                description="버퍼링 진행 표시기는 주 진행률과 버퍼링 진행률을 함께 보여줍니다."
                component={
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <DsProgress variant="buffer" value={bufferProgress} valueBuffer={buffer} />
                    </Stack>
                }
                code={linearBufferCode}
            />

            <ComponentShowcase
                title="Custom Size & Thickness"
                description="size와 thickness 속성을 사용하여 진행 표시기의 크기와 두께를 조절할 수 있습니다."
                component={
                    <Stack spacing={2} direction="row" alignItems="center">
                        <DsProgress size={60} />
                        <DsProgress size={80} thickness={5} color="secondary" />
                        <DsProgress variant="circular" withLabel value={75} size={100} thickness={2} />
                    </Stack>
                }
                code={customSizeCode}
            />

                {/* API 문서 섹션 */}
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        API
                    </Typography>
                    <PropsTable props={progressProps} title="DsProgress Props" />
                </Box>
            </Stack>
        </Box>
    );
};

export default ProgressPage;
