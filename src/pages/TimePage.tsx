import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';

export default function TimePage() {
    // TimePicker Props 정의
    const timePickerProps: PropDefinition[] = [
        {
            name: 'label',
            type: 'string',
            description: 'TimePicker의 레이블 텍스트입니다.',
        },
        {
            name: 'value',
            type: 'Dayjs | null',
            description: '현재 선택된 시간 값입니다.',
        },
        {
            name: 'onChange',
            type: '(value: Dayjs | null) => void',
            description: '시간이 변경될 때 호출되는 함수입니다.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 TimePicker가 비활성화됩니다.',
        },
        {
            name: 'readOnly',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 시간을 수정할 수 없습니다.',
        },
        {
            name: 'format',
            type: 'string',
            defaultValue: "'HH:mm'",
            description: '시간 표시 형식을 지정합니다.',
        },
        {
            name: 'ampm',
            type: 'boolean',
            defaultValue: 'true',
            description: 'false로 설정하면 24시간 형식을 사용합니다.',
        },
    ];

    const timePickerCode = `
<LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker label="시간 선택" />
</LocalizationProvider>
    `;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <Stack spacing={4}>
                <Box>
                    <Typography color="text.secondary">
                        MUI X Time Picker를 사용하면 사용자가 쉽게 시간을 선택할 수 있습니다.
                    </Typography>
                </Box>

                <ComponentShowcase
                    title="기본 Time Picker"
                    description="시간을 선택할 수 있는 기본 피커입니다."
                    component={
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker label="시간 선택" />
                        </LocalizationProvider>
                    }
                    code={timePickerCode}
                />

                {/* API 문서 섹션 */}
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        API
                    </Typography>
                    <PropsTable props={timePickerProps} title="TimePicker Props" />
                </Box>
            </Stack>
        </Box>
    );
}