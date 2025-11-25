// src/pages/SignupPage.tsx

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    CssBaseline,
    Link,
    CircularProgress,
    Alert,
    Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { DsButton } from '../components/button/DsButton';
import { DsTextField } from '../components/input/DsTextField';
import { HeadlineL } from '../components/typography';

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        // 유효성 검사
        if (!email || !password || !name) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        setIsLoading(true);

        const { error: signupError } = await signup({ email, password, name });

        if (signupError) {
            setError(signupError);
            setIsLoading(false);
        } else {
            setSuccess('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
            setIsLoading(false);
            // 2초 후 로그인 페이지로 이동
            setTimeout(() => navigate('/'), 2000);
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
                        회원가입
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        새 계정을 만들어보세요
                    </Typography>

                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
                                {success}
                            </Alert>
                        )}

                        <DsTextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading || !!success}
                        />
                        <DsTextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="이름"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading || !!success}
                        />
                        <DsTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading || !!success}
                            helperText="최소 6자 이상"
                        />
                        <DsTextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="비밀번호 확인"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading || !!success}
                        />

                        <DsButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="xlarge"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading || !!success}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
                        </DsButton>

                        <Divider sx={{ my: 2 }}>또는</Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" component="span">
                                이미 계정이 있으신가요?{' '}
                            </Typography>
                            <Link
                                component={RouterLink}
                                to="/"
                                variant="body2"
                                sx={{
                                    fontWeight: 'medium',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                로그인
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
