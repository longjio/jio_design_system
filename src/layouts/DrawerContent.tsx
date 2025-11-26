// D:/ds_mui_new/src/layouts/DrawerContent.tsx

import React, { useState, useMemo } from 'react';
import {
    List,
    ListItemButton,
    ListItemText,
    Box,
    TextField,
    InputAdornment,
    Collapse, // Collapse 추가
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess'; // 아이콘 추가
import ExpandMore from '@mui/icons-material/ExpandMore'; // 아이콘 추가
import { MenuItem } from '../types/menu';
import { BodyM, BodyS } from '../components/typography';
import { usePermission } from '../contexts/PermissionContext';

interface DrawerContentProps {
    onMenuClick: (item: MenuItem) => void;
    menuData: MenuItem[];
}

// --- 재귀적으로 메뉴 아이템을 렌더링하는 컴포넌트 ---
const RecursiveListItem = ({ item, onMenuClick, depth }: { item: MenuItem, onMenuClick: (item: MenuItem) => void, depth: number }) => {
    // 자식 메뉴의 열림/닫힘 상태 관리
    const [open, setOpen] = useState(true);

    const hasChildren = item.children && item.children.length > 0;

    const handleClick = () => {
        if (hasChildren) {
            // 자식이 있으면 토글
            setOpen(!open);
        } else if (item.path && item.path !== '#') {
            // 자식이 없고, 클릭 가능한 경로가 있으면 onMenuClick 호출
            onMenuClick(item);
        }
    };

    // depth에 따라 다른 Typography 컴포넌트 사용
    const MenuText = depth === 0 ? BodyM : BodyS;

    return (
        <>
            <ListItemButton sx={{ pl: 2 + (depth * 2) }} onClick={handleClick}>
                <ListItemText
                    primary={<MenuText>{item.text}</MenuText>}
                    disableTypography
                />
                {/* 자식이 있으면 확장/축소 아이콘 표시 */}
                {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {/* 자식이 있으면 Collapse 영역에 재귀적으로 렌더링 */}
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children?.map(child => (
                            <RecursiveListItem key={child.id} item={child} onMenuClick={onMenuClick} depth={depth + 1} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};


export default function DrawerContent({ onMenuClick, menuData }: DrawerContentProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { canAccess } = usePermission();

    // --- 권한 기반 메뉴 필터링 ---
    const filterByPermission = (items: MenuItem[]): MenuItem[] => {
        return items.reduce<MenuItem[]>((acc, item) => {
            // 권한이 없으면 제외
            if (!canAccess(item.id)) {
                return acc;
            }

            // 자식이 있으면 자식도 권한 체크
            if (item.children) {
                const filteredChildren = filterByPermission(item.children);
                // 자식이 모두 제외되면 부모도 제외
                if (filteredChildren.length > 0) {
                    acc.push({ ...item, children: filteredChildren });
                } else if (item.path && item.path !== '#') {
                    // 자식이 없어도 본인이 라우팅 가능하면 포함
                    acc.push({ ...item, children: undefined });
                }
            } else {
                acc.push(item);
            }

            return acc;
        }, []);
    };

    // --- 계층 구조를 지원하는 새로운 검색 로직 ---
    const filterTree = (items: MenuItem[], term: string): MenuItem[] => {
        const lowercasedTerm = term.toLowerCase().trim();
        if (!lowercasedTerm) return items;

        return items.reduce<MenuItem[]>((acc, item) => {
            const hasTextMatch = item.text.toLowerCase().includes(lowercasedTerm);

            if (item.children) {
                const filteredChildren = filterTree(item.children, term);
                // 자식 노드에서 검색 결과가 있으면, 부모 노드를 포함하여 반환
                if (filteredChildren.length > 0) {
                    acc.push({ ...item, children: filteredChildren });
                    return acc;
                }
            }

            // 부모 노드 자체가 검색어와 일치하면, 자식 없이 부모만 포함
            if (hasTextMatch) {
                acc.push({ ...item, children: undefined });
            }

            return acc;
        }, []);
    };

    const filteredMenuItems = useMemo(() => {
        // 먼저 권한으로 필터링, 그 다음 검색어로 필터링
        const permissionFiltered = filterByPermission(menuData);
        return filterTree(permissionFiltered, searchTerm);
    }, [menuData, searchTerm, canAccess]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <Box sx={{ p: 2, flexShrink: 0 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="메뉴 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1, minHeight: 0 }}>
                <List component="nav">
                    {/* 재귀 컴포넌트를 사용하여 메뉴 렌더링 */}
                    {filteredMenuItems.map((item) => (
                        <RecursiveListItem key={item.id} item={item} onMenuClick={onMenuClick} depth={0} />
                    ))}
                </List>
            </Box>
        </Box>
    );
}
