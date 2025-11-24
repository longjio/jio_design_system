
import React from 'react';
import { getTheme, tertiaryColors, primaryColors, secondaryColors } from '../theme';
import { Palette, PaletteColor } from '@mui/material/styles';
import { Box, Paper, Typography, Stack, Divider, Grid as MuiGrid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TitleL } from '../components/typography';

const Grid: any = MuiGrid;

// Displays a single color with its name and hex value.
const ColorBox = ({ color, name }: { color?: string; name: string }) => (
    <Box sx={{ textAlign: 'center', minWidth: 110 }}>
        <Paper
            variant="outlined"
            sx={{
                bgcolor: color,
                width: 80,
                height: 80,
                borderRadius: 1,
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto'
            }}
        />
        <Typography variant="caption" display="block" mt={1} sx={{ wordBreak: 'break-all', fontWeight: 'medium' }}>
            {name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
            {color}
        </Typography>
    </Box>
);

// Displays a color from the palette with a demonstration of its contrastText.
const ContrastColorBox = ({ color, contrastText, name }: { color?: string; contrastText?: string; name: string }) => (
    <Box sx={{ textAlign: 'center', minWidth: 110 }}>
        <Paper
            variant="outlined"
            sx={{
                bgcolor: color,
                color: contrastText,
                width: 80,
                height: 80,
                borderRadius: 1,
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                fontSize: '0.8rem',
                fontWeight: 'medium'
            }}
        >
            Text
        </Paper>
        <Typography variant="caption" display="block" mt={1} sx={{ wordBreak: 'break-all', fontWeight: 'medium' }}>
            {name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
            {color}
        </Typography>
    </Box>
);

// Section for palette colors like primary, secondary, etc.
const PaletteSection = ({ title, paletteColor }: { title: string; paletteColor?: Partial<PaletteColor> }) => {
    if (!paletteColor) return null;
    return (
        <Box>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                {paletteColor.light && <ContrastColorBox color={paletteColor.light} contrastText={paletteColor.contrastText} name="light" />}
                {paletteColor.main && <ContrastColorBox color={paletteColor.main} contrastText={paletteColor.contrastText} name="main" />}
                {paletteColor.dark && <ContrastColorBox color={paletteColor.dark} contrastText={paletteColor.contrastText} name="dark" />}
                {paletteColor.disabled && <ContrastColorBox color={paletteColor.disabled} contrastText={paletteColor.contrastText} name="disabled" />}
            </Stack>
        </Box>
    );
};

// Section for simple key-value color objects (like 'text', 'background', 'action').
const KeyValueColorSection = ({ title, colors }: { title: string; colors: { [key: string]: any } }) => (
    <Box>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Grid container spacing={2}>
            {Object.entries(colors).map(([name, color]) => (
                typeof color === 'string' && (
                    <Grid xs={6} sm={4} md={3} lg={2} key={name}>
                        <ColorBox color={color} name={name} />
                    </Grid>
                )
            ))}
        </Grid>
    </Box>
);

// Component to render a theme's color palette.
const ThemePalette = ({ mode }: { mode: 'light' | 'dark' }) => {
    const theme = getTheme(mode);
    const palette = theme.palette;

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>
                {mode} Mode
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={4}>
                <PaletteSection title="Primary" paletteColor={palette.primary} />
                <KeyValueColorSection title="Primary Scale" colors={primaryColors} />
                <PaletteSection title="Secondary" paletteColor={palette.secondary} />
                <KeyValueColorSection title="Secondary Scale" colors={secondaryColors} />
                <KeyValueColorSection title="Tertiary" colors={tertiaryColors} />
                <PaletteSection title="Success" paletteColor={palette.success} />
                <PaletteSection title="Error" paletteColor={palette.error} />
                <PaletteSection title="Warning" paletteColor={palette.warning} />
                <PaletteSection title="Info" paletteColor={palette.info} />
                <KeyValueColorSection title="Text" colors={palette.text} />
                <KeyValueColorSection title="Background" colors={{ paper: palette.background.paper, default: palette.background.default }} />
                <KeyValueColorSection title="Action" colors={palette.action} />
                <KeyValueColorSection title="Common" colors={palette.common} />
                <KeyValueColorSection title="Grey" colors={grey} />
            </Stack>
        </Box>
    );
}

// Main page component.
const ColorPalettePage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Stack spacing={5}>
                <TitleL>Color Palette</TitleL>
                <Typography>
                    The theme provides a default color palette. This can be customized by providing a palette object to the theme.
                    The following is a demonstration of the color palette used in this application.
                </Typography>
                <ThemePalette mode="light" />
                <ThemePalette mode="dark" />
            </Stack>
        </Box>
    );
};

export default ColorPalettePage;
