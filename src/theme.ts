// D:/ds_mui_new/src/theme.ts

import 'pretendard/dist/web/static/pretendard.css';
import { createTheme, ThemeOptions, Theme, PaletteColor, PaletteColorOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import '@mui/x-data-grid/themeAugmentation';
import React from 'react';

// TypeScript 모듈 확장 (기존과 동일)
declare module '@mui/material/styles' {
    interface Palette {
        charts: {
            main: string;
            secondary: string;
            axis: string;
        };
        tertiary: PaletteColor;
    }
    interface PaletteOptions {
        charts?: {
            main?: string;
            secondary?: string;
            axis?: string;
        };
        tertiary?: PaletteColorOptions;
    }
    interface PaletteColor {
        disabled?: string;
    }
    interface SimplePaletteColorOptions {
        disabled?: string;
    }
    interface Components {
        MuiDataGrid: {
            styleOverrides?: {
                root?: React.CSSProperties | ((props: { theme: Theme }) => React.CSSProperties);
            };
        };
    }
}

const commonSettings = (mode: PaletteMode): ThemeOptions => ({
    typography: {
        fontFamily: [
            'Pretendard',
            '-apple-system',
            'BlinkMacSystemFont',
            'system-ui',
            'Roboto',
            '"Helvetica Neue"',
            '"Apple SD Gothic Neo"',
            '"Noto Sans KR"',
            'sans-serif',
        ].join(','),
        h1: { fontSize: '2.25rem', fontWeight: 600 },
        button: { textTransform: 'none' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme: Theme) => ({
                body: {
                    scrollbarColor: `${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400]} ${theme.palette.background.default}`,
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: 'transparent',
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
                        minHeight: 24,
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[500],
                    },
                },
                // --- ★★★ 핵심 수정 사항 ★★★ ---
                // 모바일 환경에서 300ms 탭(클릭) 딜레이를 제거하기 위한 전역 스타일입니다.
                // 모든 링크, 버튼 및 버튼 역할을 하는 요소에 적용됩니다.
                'a, button, [role="button"], .MuiListItemButton-root, .MuiCard-root, .MuiIconButton-root': {
                    touchAction: 'manipulation',
                },
            }),
        },
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    '&:not(:first-of-type)': { borderTop: 'none' },
                    '&.Mui-expanded': { margin: 0 },
                    boxShadow: 'none',
                    '&:first-of-type': { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
                    '&:last-of-type': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: 0,
                }
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: '52px !important',
                    '@media (min-width:600px)': {
                        minHeight: '52px !important',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    '--DataGrid-t-color-background-base': theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
    },
    spacing: 4,
});

const customSuccessPalette = {
    main: '#00db40',
    light: '#27ff66',
    dark: '#00cd3c',
    disabled: '#00e8444D', // 30% opacity
    contrastText: '#ffffff',
};

const customWarningPalette = {
    main: '#ff9500',
    light: '#ffae00',
    dark: '#ff8000',
    disabled: '#ff95004D', // 30% opacity
    contrastText: '#ffffff',
};

const customErrorPalette = {
    main: '#e42b2e',
    light: '#ff3f42',
    dark: '#e2181b',
    disabled: '#e42b2e4D', // 30% opacity
    contrastText: '#ffffff',
};

const customInfoPalette = {
    main: '#4b66d0',
    light: '#5a77ea',
    dark: '#415fd4',
    disabled: '#4b66d04D', // 30% opacity
    contrastText: '#ffffff',
};

const customTertiaryPalette = {
    main: '#79bff4',      // tertiary-500
    light: '#d2eafb',     // tertiary-100
    dark: '#1f95ec',      // tertiary-900
    contrastText: '#ffffff',
};

// Primary 전체 컬러 스케일 (50~900)
export const primaryColors = {
    50: '#d3d6dd',
    100: '#bdc2cc',
    200: '#a6adba',
    300: '#9098a9',
    400: '#7a8498',
    500: '#657087',
    600: '#4e5b76',
    700: '#384665',
    800: '#223153',
    900: '#1a2b4e',
};

// Secondary 전체 컬러 스케일 (50~900)
export const secondaryColors = {
    50: '#fff6f3',
    100: '#ffc7b3',
    200: '#ffb499',
    300: '#ffa17f',
    400: '#ff8f66',
    500: '#ff7d4d',
    600: '#ff6933',
    700: '#ff571a',
    800: '#ff4400',
    900: '#ff3300',
};

// Tertiary 전체 컬러 스케일 (50~900)
export const tertiaryColors = {
    50: '#f9fcff',
    100: '#d2eafb',
    200: '#bce0fa',
    300: '#a5d5f7',
    400: '#8ec9f5',
    500: '#79bff4',
    600: '#63b5f2',
    700: '#4caaf0',
    800: '#36a0ee',
    900: '#1f95ec',
};

const lightPalette: ThemeOptions['palette'] = {
    mode: 'light',
    primary: { main: '#323F53' },
    secondary: { main: '#fd3a00', light: '#ff4400', dark: '#f32f03', disabled: '#f32f034D' },
    success: customSuccessPalette,
    warning: customWarningPalette,
    error: customErrorPalette,
    info: customInfoPalette,
    tertiary: customTertiaryPalette,
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#000000', secondary: '#46494b', disabled: '#c1c3c5' },
    divider: 'rgba(0, 0, 0, 0.12)',
    charts: { main: '#323F53', secondary: '#82aaff', axis: '#637381' },
};

const darkPalette: ThemeOptions['palette'] = {
    mode: 'dark',
    primary: { main: '#A8B0BC' },
    secondary: { main: '#fd3a00', light: '#ff4400', dark: '#f32f03', disabled: '#f32f034D' },
    success: customSuccessPalette,
    warning: customWarningPalette,
    error: customErrorPalette,
    info: customInfoPalette,
    tertiary: customTertiaryPalette,
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#E0E3E7', secondary: '#B0B8C4' },
    divider: 'rgba(255, 255, 255, 0.12)',
    charts: { main: '#A8B0BC', secondary: '#5c85d6', axis: '#919EAB' },
};

const themeCache: { [key in PaletteMode]?: Theme } = {};

export const getTheme = (mode: PaletteMode): Theme => {
    if (themeCache[mode]) {
        return themeCache[mode] as Theme;
    }
    const palette = mode === 'light' ? lightPalette : darkPalette;
    const newTheme = createTheme({
        ...commonSettings(mode),
        palette,
    });
    themeCache[mode] = newTheme;
    return newTheme;
};