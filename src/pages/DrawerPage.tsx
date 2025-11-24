// src/pages/DrawerPage.tsx
import React, { useState } from 'react';
import { Box, Stack, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsDrawer from '../components/navigation/DsDrawer';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DrawerPage = () => {
  // DsDrawer Props 정의
  const drawerProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      description: 'Drawer의 열림/닫힘 상태를 제어합니다.',
    },
    {
      name: 'onClose',
      type: '(event: React.KeyboardEvent | React.MouseEvent) => void',
      description: 'Drawer가 닫혀야 할 때 호출되는 함수입니다.',
    },
    {
      name: 'anchor',
      type: "'top' | 'left' | 'bottom' | 'right'",
      defaultValue: "'left'",
      description: 'Drawer가 나타날 화면 방향을 지정합니다.',
    },
    {
      name: 'variant',
      type: "'permanent' | 'persistent' | 'temporary'",
      defaultValue: "'temporary'",
      description: 'Drawer의 동작 방식을 결정합니다.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Drawer 안에 표시될 콘텐츠입니다.',
    },
  ];

  const code = `
type Anchor = 'top' | 'left' | 'bottom' | 'right';

// In your component...
const [state, setState] = useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});

const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

// ...

<>
  {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
    <React.Fragment key={anchor}>
      <Button onClick={toggleDrawer(anchor, true)}>Open {anchor}</Button>
      <DsDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {/* Drawer Content Here */}
      </DsDrawer>
    </React.Fragment>
  ))}
</>
  `;

  // Self-contained component for the interactive example
  const InteractiveDrawerExample = () => {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

    const drawerContent = (anchor: Anchor) => (
      <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
      <Box sx={{ textAlign: 'center' }}>
        {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <Button sx={{ m: 1 }} variant="contained" onClick={toggleDrawer(anchor, true)}>Open {anchor}</Button>
            <DsDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {drawerContent(anchor)}
            </DsDrawer>
          </React.Fragment>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Drawer는 화면 가장자리에서 슬라이드되어 나타나는 패널 형태의 내비게이션 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Temporary Drawer"
        description="The Drawer is a surface that can be opened and closed from any side of the screen. It is controlled by the 'open' prop and the 'onClose' callback."
        component={<InteractiveDrawerExample />}
        code={code}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={drawerProps} title="DsDrawer Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default DrawerPage;
