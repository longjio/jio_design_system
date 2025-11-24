import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';
import DsAccordion from '../components/surface/DsAccordion';

const AccordionPage = () => {
  // DsAccordion Props 정의
  const accordionProps: PropDefinition[] = [
    {
      name: 'title',
      type: 'string',
      description: 'Accordion의 헤더에 표시될 제목입니다.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Accordion이 확장되었을 때 표시될 콘텐츠입니다.',
    },
    {
      name: 'defaultExpanded',
      type: 'boolean',
      defaultValue: 'false',
      description: 'true로 설정하면 Accordion이 기본적으로 확장된 상태로 표시됩니다.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Accordion을 비활성화 상태로 만듭니다.',
    },
    {
      name: 'onChange',
      type: '(event: React.SyntheticEvent, expanded: boolean) => void',
      description: 'Accordion의 확장/축소 상태가 변경될 때 호출되는 함수입니다.',
    },
  ];

  const simpleAccordionCode = `
<DsAccordion title="Accordion 1">
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </Typography>
</DsAccordion>
<DsAccordion title="Accordion 2">
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </Typography>
</DsAccordion>
  `;

  const defaultExpandedCode = `
<DsAccordion title="Default Expanded Accordion" defaultExpanded>
  <Typography>
    This accordion is expanded by default.
  </Typography>
</DsAccordion>
  `;

  const disabledCode = `
<DsAccordion title="Disabled Accordion" disabled>
  <Typography>
    This content will not be visible.
  </Typography>
</DsAccordion>
  `;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Accordion은 확장 가능한 패널로 콘텐츠를 접거나 펼칠 수 있는 컴포넌트입니다.
          </Typography>
        </Box>
        <ComponentShowcase
        title="Simple Accordions"
        description="This is a simple usage of the accordion component."
        component={
          <div>
            <DsAccordion title="Accordion 1">
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </DsAccordion>
            <DsAccordion title="Accordion 2">
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </DsAccordion>
          </div>
        }
        code={simpleAccordionCode}
      />
      <ComponentShowcase
        title="Default Expanded Accordion"
        description="You can have an accordion expanded by default."
        component={
          <DsAccordion title="Default Expanded Accordion" defaultExpanded>
            <Typography>
              This accordion is expanded by default.
            </Typography>
          </DsAccordion>
        }
        code={defaultExpandedCode}
      />
      <ComponentShowcase
        title="Disabled Accordion"
        description="An accordion can be disabled."
        component={
          <DsAccordion title="Disabled Accordion" disabled>
            <Typography>
              This content will not be visible.
            </Typography>
          </DsAccordion>
        }
        code={disabledCode}
      />

        {/* API 문서 섹션 */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
            API
          </Typography>
          <PropsTable props={accordionProps} title="DsAccordion Props" />
        </Box>
      </Stack>
    </Box>
  );
};

export default AccordionPage;
