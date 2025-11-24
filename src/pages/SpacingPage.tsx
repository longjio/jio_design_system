import React from 'react';
import { Box, Paper, Typography, Stack, Grid as MuiGrid, useTheme } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { TitleL, BodyM } from '../components/typography';

const Grid: any = MuiGrid;

interface SpacingBoxProps {
  value: number;
  label: string;
}

const SpacingBox: React.FC<SpacingBoxProps> = ({ value, label }) => {
  const theme = useTheme();

  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Box
          sx={{
            width: theme.spacing(value),
            height: theme.spacing(value),
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.contrastText',
            fontSize: '0.75rem',
            fontWeight: 'medium',
          }}
        >
          {theme.spacing(value)}
        </Box>
        <Typography variant="body2" fontWeight="medium">
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          theme.spacing({value}) = {theme.spacing(value)}
        </Typography>
      </Paper>
    </Grid>
  );
};

const SpacingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <TitleL>Spacing</TitleL>
          <BodyM sx={{ mt: 2, color: 'text.secondary' }}>
            MUI의 spacing 시스템은 일관된 레이아웃과 간격을 제공합니다.
            이 프로젝트는 기본 단위로 <strong>{theme.spacing(1)}</strong>를 사용합니다.
          </BodyM>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            기본 Spacing 값
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            theme.spacing() 함수를 사용하여 일관된 간격을 적용할 수 있습니다.
          </Typography>
          <Grid container spacing={2}>
            <SpacingBox value={0} label="spacing(0)" />
            <SpacingBox value={0.5} label="spacing(0.5)" />
            <SpacingBox value={1} label="spacing(1)" />
            <SpacingBox value={2} label="spacing(2)" />
            <SpacingBox value={3} label="spacing(3)" />
            <SpacingBox value={4} label="spacing(4)" />
            <SpacingBox value={5} label="spacing(5)" />
            <SpacingBox value={6} label="spacing(6)" />
            <SpacingBox value={8} label="spacing(8)" />
            <SpacingBox value={10} label="spacing(10)" />
            <SpacingBox value={12} label="spacing(12)" />
            <SpacingBox value={16} label="spacing(16)" />
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            사용 예제
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                1. Padding 적용
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                }}
              >
                <code>sx=&#123;&#123; p: 2 &#125;&#125;</code>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  padding: {theme.spacing(2)}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                2. Margin 적용
              </Typography>
              <Box sx={{ bgcolor: 'action.hover', p: 1 }}>
                <Box
                  sx={{
                    m: 3,
                    p: 2,
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                    borderRadius: 1,
                  }}
                >
                  <code>sx=&#123;&#123; m: 3 &#125;&#125;</code>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    margin: {theme.spacing(3)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                3. Gap 적용 (Stack/Grid)
              </Typography>
              <Stack spacing={2} sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Paper sx={{ p: 1 }}>Item 1</Paper>
                <Paper sx={{ p: 1 }}>Item 2</Paper>
                <Paper sx={{ p: 1 }}>Item 3</Paper>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                <code>&lt;Stack spacing=&#123;2&#125;&gt;</code> - 각 아이템 사이 간격: {theme.spacing(2)}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: 3, bgcolor: 'action.hover' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LightbulbOutlinedIcon sx={{ color: 'warning.main' }} />
            <Typography variant="h6">
              사용 팁
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Typography variant="body2">
              • 기본 단위를 사용하면 일관된 디자인을 유지할 수 있습니다
            </Typography>
            <Typography variant="body2">
              • px 대신 spacing() 함수를 사용하면 테마 변경 시 자동으로 적용됩니다
            </Typography>
            <Typography variant="body2">
              • 소수점 값(0.5, 1.5 등)도 사용 가능합니다
            </Typography>
            <Typography variant="body2">
              • 방향별 적용: <code>pt</code>(top), <code>pr</code>(right), <code>pb</code>(bottom), <code>pl</code>(left)
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default SpacingPage;
