// D:/ds_mui_new/src/pages/LoginPage.tsx

import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    CssBaseline,
    Checkbox,
    FormControlLabel,
    Grid as MuiGrid,
    Link,
    CircularProgress,
    Alert,
    useTheme,
    useMediaQuery,
    Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { DsButton } from '../components/button/DsButton';
import { DsTextField } from '../components/input/DsTextField';
import { HeadlineL } from '../components/typography';

const Grid: any = MuiGrid;

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, user } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 로그인 페이지 쇼케이스를 위해 자동 리다이렉트를 제거
    // useEffect(() => {
    //     if (user) {
    //         navigate(isMobile ? '/m' : '/app', { replace: true });
    //     }
    // }, [user, isMobile, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login({ username, password }, rememberMe);
            navigate(isMobile ? '/m' : '/app');
        } catch (err: any) {
            setError(err.message || '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                overflow: 'hidden',
            }}
        >
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ whiteSpace: 'nowrap' }}>
                        <HeadlineL>
                            JIO DESIGN SYSTEM
                        </HeadlineL>
                    </Box>
                    <Typography component="h2" variant="h6" fontWeight="medium" gutterBottom>
                        로그인
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        디자인 시스템에 오신 것을 환영합니다
                    </Typography>

                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <DsTextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="사용자 이름"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                        />
                        <DsTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                }
                                label="자동 로그인"
                            />
                            <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                                비밀번호 찾기
                            </Link>
                        </Box>

                        <DsButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="xlarge"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
                        </DsButton>

                        <Divider sx={{ my: 2 }}>또는</Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" component="span">
                                계정이 없으신가요?{' '}
                            </Typography>
                            <Link
                                component={RouterLink}
                                to="/signup"
                                variant="body2"
                                sx={{
                                    fontWeight: 'medium',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                회원가입
                            </Link>
                        </Box>
                    </Box>

                    {/* Footer */}
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        align="center"
                        sx={{ mt: 4 }}
                    >
                        © 2024 JIO Design System. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}