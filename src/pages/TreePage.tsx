import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import DsTreeView, { TreeNode } from '../components/mui_x/tree/DsTreeView';
import { DsTreeItem } from '../components/mui_x/tree/DsTreeItem';
import ComponentShowcase from '../components/common/ComponentShowcase';
import { PropsTable, PropDefinition } from '../components/common';

export default function TreePage() {
    // DsTreeView Props 정의
    const treeViewProps: PropDefinition[] = [
        {
            name: 'items',
            type: 'TreeNode[]',
            description: '트리 구조를 나타내는 데이터 배열입니다. 각 노드는 id, label, children(선택)을 포함합니다.',
        },
        {
            name: 'checkboxSelection',
            type: 'boolean',
            defaultValue: 'false',
            description: 'true로 설정하면 각 항목 앞에 체크박스가 표시됩니다.',
        },
        {
            name: 'defaultExpandedItems',
            type: 'string[]',
            description: '초기에 확장되어 있을 항목들의 id 배열입니다.',
        },
        {
            name: 'selectedItems',
            type: 'string | string[] | null',
            description: '현재 선택된 항목의 id 또는 id 배열입니다.',
        },
        {
            name: 'onSelectedItemsChange',
            type: '(event: React.SyntheticEvent | null, id: string | null) => void',
            description: '항목 선택이 변경될 때 호출되는 함수입니다.',
        },
        {
            name: 'aria-label',
            type: 'string',
            description: '접근성을 위한 레이블입니다.',
        },
        {
            name: 'children',
            type: 'React.ReactNode',
            description: 'DsTreeItem 컴포넌트를 자식으로 사용하여 직접 트리 구조를 정의할 수 있습니다.',
        },
    ];

    // DsTreeItem Props 정의
    const treeItemProps: PropDefinition[] = [
        {
            name: 'itemId',
            type: 'string',
            description: '트리 항목의 고유 식별자입니다.',
        },
        {
            name: 'label',
            type: 'string',
            description: '트리 항목에 표시될 텍스트입니다.',
        },
        {
            name: 'children',
            type: 'React.ReactNode',
            description: '하위 트리 항목들입니다. 중첩된 DsTreeItem 컴포넌트를 포함할 수 있습니다.',
        },
    ];

    const [treeData] = React.useState<TreeNode[]>([
        { id: 'data-components', label: 'Components', children: [{ id: 'data-inputs', label: 'Inputs' }] },
        { id: 'data-foundation', label: 'Foundation', children: [{ id: 'data-colors', label: 'Colors' }] },
    ]);
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    const simpleTreeCode = `
<DsTreeView aria-label="simple-tree" defaultExpandedItems={["foundation"]}>
    <DsTreeItem itemId="foundation" label="Foundation" />
    <DsTreeItem itemId="components" label="Components">
        <DsTreeItem itemId="inputs" label="Inputs" />
    </DsTreeItem>
</DsTreeView>
    `;

    const dataDrivenTreeCode = `
const [treeData] = React.useState<TreeNode[]>([
    { id: 'data-components', label: 'Components', children: [{ id: 'data-inputs', label: 'Inputs' }] },
    { id: 'data-foundation', label: 'Foundation', children: [{ id: 'data-colors', label: 'Colors' }] },
]);
const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

<DsTreeView
    items={treeData}
    checkboxSelection
    defaultExpandedItems={['data-components']}
    selectedItems={selectedItem}
    onSelectedItemsChange={(event, id) => setSelectedItem(id)}
/>
    `;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 3 }}>
            <Stack spacing={4}>
                <Box>
                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                        계층적인 데이터를 목록 형태로 보여주는 컴포넌트입니다.
                    </Typography>
                </Box>

                <ComponentShowcase
                    title="기본 TreeView"
                    description="DsTreeItem 컴포넌트를 자식으로 사용하여 간단한 트리 구조를 만듭니다."
                    component={
                        <Box sx={{ width: '100%', maxWidth: 400 }}>
                            <DsTreeView aria-label="simple-tree" defaultExpandedItems={["foundation"]}>
                                <DsTreeItem itemId="foundation" label="Foundation" />
                                <DsTreeItem itemId="components" label="Components">
                                    <DsTreeItem itemId="inputs" label="Inputs" />
                                </DsTreeItem>
                            </DsTreeView>
                        </Box>
                    }
                    code={simpleTreeCode}
                />

                <ComponentShowcase
                    title="데이터 기반 및 선택 가능한 TreeView"
                    description="'items' prop에 데이터 배열을 전달하여 동적으로 트리를 생성합니다. 'checkboxSelection'으로 체크박스를, 'onSelectedItemsChange'로 선택 이벤트를 처리할 수 있습니다."
                    component={
                        <Box sx={{ width: '100%', maxWidth: 400 }}>
                            <DsTreeView
                                items={treeData}
                                checkboxSelection
                                defaultExpandedItems={['data-components']}
                                selectedItems={selectedItem}
                                onSelectedItemsChange={(event: React.SyntheticEvent<Element, Event> | null, id: string | null) => setSelectedItem(id)}
                            />
                        </Box>
                    }
                    code={dataDrivenTreeCode}
                />

                {/* API 문서 섹션 */}
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        API
                    </Typography>
                    <PropsTable props={treeViewProps} title="DsTreeView Props" />
                    <Box sx={{ mt: 3 }}>
                        <PropsTable props={treeItemProps} title="DsTreeItem Props" />
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}