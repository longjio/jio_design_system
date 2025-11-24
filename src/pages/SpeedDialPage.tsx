// src/pages/SpeedDialPage.tsx
import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  SpeedDialProps,
  Typography,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsSpeedDial, { SpeedDialActionItem } from '../components/navigation/DsSpeedDial';

// Data and components for examples
const actions: SpeedDialActionItem[] = [
  { icon: <FileCopyIcon />, name: 'Copy', onClick: () => console.log('Copy clicked') },
  { icon: <SaveIcon />, name: 'Save', onClick: () => console.log('Save clicked') },
  { icon: <PrintIcon />, name: 'Print', onClick: () => console.log('Print clicked') },
  { icon: <ShareIcon />, name: 'Share', onClick: () => console.log('Share clicked') },
];

const StyledSpeedDial = styled(DsSpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const SpeedDialPage = () => {
  // DsSpeedDial Props 정의
  const speedDialProps: PropDefinition[] = [
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'SpeedDial의 접근성을 위한 aria-label입니다.',
    },
    {
      name: 'actions',
      type: 'SpeedDialActionItem[]',
      description: 'SpeedDial에서 사용할 액션 아이템 배열입니다. { icon: React.ReactNode, name: string, onClick?: () => void } 형태입니다.',
    },
    {
      name: 'direction',
      type: "'up' | 'down' | 'left' | 'right'",
      defaultValue: "'up'",
      description: '액션이 펼쳐질 방향을 지정합니다.',
    },
    {
      name: 'hidden',
      type: 'boolean',
      defaultValue: 'false',
      description: 'SpeedDial을 숨깁니다.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      description: 'FAB에 표시될 아이콘입니다. 지정하지 않으면 기본 아이콘이 사용됩니다.',
    },
    {
      name: 'open',
      type: 'boolean',
      description: 'SpeedDial의 열림/닫힘 상태를 제어합니다. 비제어 컴포넌트로 사용하려면 생략하세요.',
    },
    {
      name: 'onClose',
      type: '(event: React.SyntheticEvent<{}>, reason: "toggle" | "blur" | "mouseLeave" | "escapeKeyDown") => void',
      description: 'SpeedDial이 닫혀야 할 때 호출되는 함수입니다.',
    },
    {
      name: 'onOpen',
      type: '(event: React.SyntheticEvent<{}>, reason: "toggle" | "focus" | "mouseEnter") => void',
      description: 'SpeedDial이 열려야 할 때 호출되는 함수입니다.',
    },
    {
      name: 'FabProps',
      type: 'Partial<FabProps>',
      description: '내부 FAB 컴포넌트에 전달할 추가 props입니다.',
    },
  ];

  const speedDialActionItemProps: PropDefinition[] = [
    {
      name: 'icon',
      type: 'React.ReactNode',
      description: '액션 아이템에 표시될 아이콘입니다.',
    },
    {
      name: 'name',
      type: 'string',
      description: '액션 아이템의 이름입니다. 툴팁으로 표시됩니다.',
    },
    {
      name: 'onClick',
      type: '() => void',
      description: '액션 아이템을 클릭할 때 호출되는 함수입니다.',
    },
  ];

  const basicCode = `
const actions: SpeedDialActionItem[] = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

// The SpeedDial must be placed in a container with position: 'relative'
<Box sx={{ height: 320, position: 'relative' }}>
  <DsSpeedDial
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'absolute', bottom: 16, right: 16 }}
    actions={actions}
  />
</Box>
  `;

  const playgroundCode = `
// Styled component for positioning
const StyledSpeedDial = styled(DsSpeedDial)(({ theme }) => ({
  position: 'absolute',
  // ... positioning styles
}));

// Playground component
function PlaygroundSpeedDial() {
  const [direction, setDirection] = useState('up');
  const [hidden, setHidden] = useState(false);

  // ... handlers

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      {/* Controls for hidden and direction */}
      <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          direction={direction}
          actions={actions}
        />
      </Box>
    </Box>
  );
}
  `;

  // Self-contained component for the playground example
  const PlaygroundSpeedDial = () => {
    const [direction, setDirection] = React.useState<SpeedDialProps['direction']>('up');
    const [hidden, setHidden] = React.useState(false);

    const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDirection((event.target as HTMLInputElement).value as SpeedDialProps['direction']);
    };

    const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHidden(event.target.checked);
    };

    return (
      <Box sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />}
          label="Hidden"
        />
        <FormControl component="fieldset" sx={{ mt: 1, display: 'flex' }}>
          <FormLabel component="legend">Direction</FormLabel>
          <RadioGroup
            aria-label="direction"
            name="direction"
            value={direction}
            onChange={handleDirectionChange}
            row
          >
            <FormControlLabel value="up" control={<Radio />} label="Up" />
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="down" control={<Radio />} label="Down" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ position: 'relative', mt: 3, height: 320, border: '1px dashed grey' }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            hidden={hidden}
            direction={direction}
            actions={actions}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Speed Dial은 플로팅 액션 버튼을 확장하여 관련 액션들을 빠르게 접근할 수 있게 하는 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
          title="Basic Speed Dial"
          description="The Speed Dial is a floating action button that can display related actions. It must be placed inside a container with 'position: relative'."
          component={
            <Box sx={{ width: '100%', height: 320, position: 'relative', border: '1px dashed grey' }}>
              <DsSpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                actions={actions}
              />
            </Box>
          }
          code={basicCode}
        />
        <ComponentShowcase
          title="Playground"
          description="An interactive example to control the direction and visibility of the Speed Dial."
          component={<PlaygroundSpeedDial />}
          code={playgroundCode}
        />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={speedDialProps} title="DsSpeedDial Props" />
          <Box sx={{ mt: 3 }}>
            <PropsTable props={speedDialActionItemProps} title="SpeedDialActionItem Props" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default SpeedDialPage;
