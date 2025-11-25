// D:/ssg_pay_system/src/layouts/Header.tsx

import React from 'react';
import {
    AppBar, Toolbar, IconButton, Typography, Chip, Button, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeModeButtonGroup } from '../components/common/ThemeModeButtonGroup';
import { User } from '../types';


// Header 컴포넌트가 필요로 하는 props 타입을 정의합니다.
interface HeaderProps {
    isDesktopDrawerOpen: boolean;
    isMobile: boolean;
    onDrawerToggle: () => void;
    onTitleClick: () => void;
    user: User | null;
    onLogout: () => void;
}

const Header = ({
                    isDesktopDrawerOpen,
                    isMobile,
                    onDrawerToggle,
                    onTitleClick,
                    user,
                    onLogout
                }: HeaderProps) => {
    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                zIndex: theme.zIndex.drawer + 2,
                // ★★★ 핵심 수정 사항 ★★★
                // sm (small) breakpoint 이상일 때, AppBar의 왼쪽 패딩을 10px로 설정합니다.
                pl: { sm: '10px' },
            })}
        >
                        <Toolbar sx={{
                minHeight: '52px !important',
                height: '52px',
                '@media (min-width:0px)': {
                    minHeight: '52px !important',
                    height: '52px'
                }
            }}>

                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{
                            mr: 2,
                            mt: 1,
                            display: 'block',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" onClick={onTitleClick} sx={{ cursor: 'pointer' }}>
                        JIO DESIGN SYSTEM
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {user && (
                        <>
                            <Chip label={`${user.name || user.email}님`} sx={{ color: 'white', borderColor: 'white' }} />
                            <Button color="inherit" onClick={onLogout}>로그아웃</Button>
                        </>
                    )}
                    <ThemeModeButtonGroup />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;