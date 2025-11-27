import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Switch,
    Stack, // Import Stack
} from '@mui/material';
import DsDialog from '../components/feedback/DsDialog';
import ComponentShowcase from '../components/common/ComponentShowcase'; // Import ComponentShowcase
import { PropsTable, PropDefinition } from '../components/common';
import { DsButton } from '../components/button/DsButton';

const DialogPage = () => {
    // DsDialog Props 정의
    const dialogProps: PropDefinition[] = [
        {
            name: 'open',
            type: 'boolean',
            description: 'Dialog의 열림/닫힘 상태를 제어합니다.',
        },
        {
            name: 'onClose',
            type: '(event: {}, reason: "backdropClick" | "escapeKeyDown") => void',
            description: 'Dialog가 닫혀야 할 때 호출되는 함수입니다.',
        },
        {
            name: 'title',
            type: 'string',
            description: 'Dialog의 제목입니다.',
        },
        {
            name: 'children',
            type: 'React.ReactNode',
            description: 'Dialog의 주요 콘텐츠입니다.',
        },
        {
            name: 'actions',
            type: 'React.ReactNode',
            description: 'Dialog 하단에 표시할 액션 버튼들입니다.',
        },
        {
            name: 'fullScreen',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 Dialog가 전체 화면으로 표시됩니다.',
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 Dialog가 최대 너비를 사용합니다.',
        },
        {
            name: 'maxWidth',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | false",
            defaultValue: "'sm'",
            description: 'Dialog의 최대 너비를 결정합니다.',
        },
        {
            name: 'disableEscapeKeyDown',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 ESC 키로 Dialog를 닫을 수 없습니다.',
        },
    ];

    // 각 다이얼로그 예제의 열림/닫힘 상태를 제어합니다.
    const [alertOpen, setAlertOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const alertDialogCode = `
<DsButton variant="outlined" onClick={() => setAlertOpen(true)}>
    Alert Dialog open
</DsButton>
<DsDialog
    open={alertOpen}
    onClose={() => setAlertOpen(false)}
    title="이것은 Alert입니다"
    actions={
        <DsButton onClick={() => setAlertOpen(false)} autoFocus>
            확인
        </DsButton>
    }
>
    <Typography>
        이곳은 Alert Dialog의 주된 내용이 표시되는 영역입니다. 사용자의
        확인이 필요한 모든 정보를 여기에 넣을 수 있습니다.
    </Typography>
</DsDialog>
    `;

    const confirmationDialogCode = `
<DsButton variant="outlined" onClick={() => setConfirmOpen(true)}>
    Confirmation Dialog open
</DsButton>
<DsDialog
    open={confirmOpen}
    onClose={() => setConfirmOpen(false)}
    title="이 항목을 삭제할까요?"
    actions={
        <>
            <DsButton onClick={() => setConfirmOpen(false)}>취소</DsButton>
            <DsButton
                variant="contained"
                color="error"
                onClick={() => setConfirmOpen(false)}
            >
                삭제
            </DsButton>
        </>
    }
>
    <Typography>
        정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
    </Typography>
</DsDialog>
    `;

    const formDialogCode = `
<FormControlLabel
    sx={{ mb: 2 }}
    control={
        <Switch
            checked={isFullScreen}
            onChange={(e) => setIsFullScreen(e.target.checked)}
        />
    }
    label="전체 화면으로 open"
/>
<br />
<DsButton variant="outlined" onClick={() => setFormOpen(true)}>
    Form Dialog open
</DsButton>
<DsDialog
    open={formOpen}
    onClose={() => setFormOpen(false)}
    title="뉴스레터 구독하기"
    fullScreen={isFullScreen}
    actions={
        <>
            <DsButton onClick={() => setFormOpen(false)}>취소</DsButton>
            <DsButton
                variant="contained"
                onClick={() => setFormOpen(false)}
            >
                구독하기
            </DsButton>
        </>
    }
>
    <Typography sx={{ mb: 2 }}>
        이 웹사이트를 구독하려면 이메일 주소를 입력해주세요. 저희는 가끔
        새로운 소식을 보내드립니다.
    </Typography>
    <TextField
        autoFocus
        margin="dense"
        id="email"
        label="이메일 주소"
        type="email"
        fullWidth
        variant="outlined"
    />
</DsDialog>
    `;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <Stack spacing={4}>
                <Box>
                    <Typography color="text.secondary">
                        Dialog는 사용자에게 특정 과업에 대한 정보를 제공하고, 결정을 요구하거나,
                        여러 작업을 포함할 수 있는 대화상자입니다.
                    </Typography>
                </Box>

            <ComponentShowcase
                title="기본 Alert Dialog"
                description="Alert Dialog는 사용자에게 특정 상황을 알리고 확인을 요구하는 긴급한 알림입니다."
                component={
                    <>
                        <DsButton variant="outlined" onClick={() => setAlertOpen(true)}>
                            Alert Dialog open
                        </DsButton>
                        <DsDialog
                            open={alertOpen}
                            onClose={() => setAlertOpen(false)}
                            title="이것은 Alert입니다"
                            actions={
                                <DsButton onClick={() => setAlertOpen(false)} autoFocus>
                                    확인
                                </DsButton>
                            }
                        >
                            <Typography>
                                이곳은 Alert Dialog의 주된 내용이 표시되는 영역입니다. 사용자의
                                확인이 필요한 모든 정보를 여기에 넣을 수 있습니다.
                            </Typography>
                        </DsDialog>
                    </>
                }
                code={alertDialogCode}
            />

            <ComponentShowcase
                title="Confirmation Dialog"
                description="Confirmation Dialog는 특정 작업을 실행하기 전에 사용자에게 명시적인 확인을 요구합니다."
                component={
                    <>
                        <DsButton variant="outlined" onClick={() => setConfirmOpen(true)}>
                            Confirmation Dialog open
                        </DsButton>
                        <DsDialog
                            open={confirmOpen}
                            onClose={() => setConfirmOpen(false)}
                            title="이 항목을 삭제할까요?"
                            actions={
                                <>
                                    <DsButton onClick={() => setConfirmOpen(false)}>취소</DsButton>
                                    <DsButton
                                        variant="contained"
                                        color="error"
                                        onClick={() => setConfirmOpen(false)}
                                    >
                                        삭제
                                    </DsButton>
                                </>
                            }
                        >
                            <Typography>
                                정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                            </Typography>
                        </DsDialog>
                    </>
                }
                code={confirmationDialogCode}
            />

            <ComponentShowcase
                title="폼(Form) Dialog"
                description="Form Dialog는 사용자가 대화상자 내에서 양식을 작성할 수 있게 해줍니다."
                component={
                    <>
                        <FormControlLabel
                            sx={{ mb: 2 }}
                            control={
                                <Switch
                                    checked={isFullScreen}
                                    onChange={(e) => setIsFullScreen(e.target.checked)}
                                />
                            }
                            label="전체 화면으로 open"
                        />
                        <br />
                        <DsButton variant="outlined" onClick={() => setFormOpen(true)}>
                            Form Dialog open
                        </DsButton>
                        <DsDialog
                            open={formOpen}
                            onClose={() => setFormOpen(false)}
                            title="뉴스레터 구독하기"
                            fullScreen={isFullScreen}
                            actions={
                                <>
                                    <DsButton onClick={() => setFormOpen(false)}>취소</DsButton>
                                    <DsButton
                                        variant="contained"
                                        onClick={() => setFormOpen(false)}
                                    >
                                        구독하기
                                    </DsButton>
                                </>
                            }
                        >
                            <Typography sx={{ mb: 2 }}>
                                이 웹사이트를 구독하려면 이메일 주소를 입력해주세요. 저희는 가끔
                                새로운 소식을 보내드립니다.
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="이메일 주소"
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </DsDialog>
                    </>
                }
                code={formDialogCode}
            />

                {/* API 문서 섹션 */}
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        API
                    </Typography>
                    <PropsTable props={dialogProps} title="DsDialog Props" />
                </Box>
            </Stack>
        </Box>
    );
};

export default DialogPage;
