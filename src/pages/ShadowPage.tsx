import React from 'react';
import { Box, Paper, Typography, Stack, Grid as MuiGrid, useTheme } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { TitleL, BodyM } from '../components/typography';

const Grid: any = MuiGrid;

interface ShadowBoxProps {
  elevation: number;
  label: string;
}

const ShadowBox: React.FC<ShadowBoxProps> = ({ elevation, label }) => {
  return (
    <Grid xs={12} sm={6} md={4}>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={(theme) => ({
            width: '100%',
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[elevation],
            borderRadius: 1,
          })}
        >
          <Typography variant="h6" color="text.secondary">
            {elevation}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="medium">
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
          elevation={elevation}
        </Typography>
      </Box>
    </Grid>
  );
};

const ShadowPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <TitleL>Shadow (Elevation)</TitleL>
          <BodyM sx={{ mt: 2, color: 'text.secondary' }}>
            MUI는 Material Design의 elevation 시스템을 사용하여 요소의 깊이를 표현합니다.
            elevation 값이 높을수록 그림자가 더 진해집니다 (0-24).
          </BodyM>
        </Box>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Elevation 레벨
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            0부터 24까지의 elevation 값을 사용할 수 있습니다.
          </Typography>
          <Grid container spacing={5}>
            <ShadowBox elevation={0} label="No Shadow" />
            <ShadowBox elevation={1} label="Level 1" />
            <ShadowBox elevation={2} label="Level 2" />
            <ShadowBox elevation={3} label="Level 3" />
            <ShadowBox elevation={4} label="Level 4" />
            <ShadowBox elevation={6} label="Level 6" />
            <ShadowBox elevation={8} label="Level 8" />
            <ShadowBox elevation={12} label="Level 12" />
            <ShadowBox elevation={16} label="Level 16" />
            <ShadowBox elevation={24} label="Level 24" />
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            프로젝트 커스텀 설정
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              fontFamily: 'monospace',
              fontSize: '0.85rem',
            }}
          >
            <Typography variant="body2" component="div">
              이 프로젝트는 Paper 컴포넌트의 기본 boxShadow를 제거하고 border를 사용합니다:
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <code>
                MuiPaper: &#123;<br />
                &nbsp;&nbsp;styleOverrides: &#123;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;root: &#123;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;boxShadow: 'none',<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;border: `1px solid $&#123;theme.palette.divider&#125;`<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                &nbsp;&nbsp;&#125;<br />
                &#125;
              </code>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            사용 예제
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                1. Paper 컴포넌트
              </Typography>
              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <Paper elevation={0} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                  elevation=0
                </Paper>
                <Paper elevation={1} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                  elevation=1
                </Paper>
                <Paper elevation={3} sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                  elevation=3
                </Paper>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                <code>&lt;Paper elevation=&#123;3&#125;&gt;</code>
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                2. 커스텀 Box Shadow
              </Typography>
              <Box
                sx={{
                  p: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              >
                Custom Box Shadow
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                <code>sx=&#123;&#123; boxShadow: '0 4px 6px rgba(0,0,0,0.1)' &#125;&#125;</code>
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                3. Theme Shadow 직접 사용
              </Typography>
              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                {[1, 2, 4, 8].map((level) => (
                  <Box
                    key={level}
                    sx={{
                      p: 2,
                      boxShadow: theme.shadows[level],
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      minWidth: 100,
                      textAlign: 'center',
                    }}
                  >
                    shadow[{level}]
                  </Box>
                ))}
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                <code>boxShadow: theme.shadows[level]</code>
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
              • AppBar: elevation 0-4 권장 (일반적으로 4 사용)
            </Typography>
            <Typography variant="body2">
              • Card: elevation 1-3 권장 (기본값 1)
            </Typography>
            <Typography variant="body2">
              • Dialog/Modal: elevation 24 (최상위)
            </Typography>
            <Typography variant="body2">
              • FAB (Floating Action Button): elevation 6-12 권장
            </Typography>
            <Typography variant="body2">
              • 이 프로젝트는 border 기반 디자인을 사용하므로 대부분 elevation=0입니다
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ShadowPage;
