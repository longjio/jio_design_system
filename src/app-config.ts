// D:/ds_mui_new/src/app-config.ts

import { lazy, LazyExoticComponent, ReactNode } from 'react';

// --- 타입 정의 ---
export interface AppRouteConfig {
    id: string;
    path: string;
    component: LazyExoticComponent<React.ComponentType<any>>;
    menu?: {
        text: string;
        group: string;
        icon?: ReactNode;
    };
    children?: AppRouteConfig[];
}

export interface MenuGroupInfo {
    id:string;
    title: string;
}

// --- 메뉴 그룹 정의 ---
export const menuGroups: MenuGroupInfo[] = [
    { id: 'foundations', title: 'Foundations' },
    { id: 'layout', title: 'Layout' },
    { id: 'components', title: 'Components' },
    { id: 'patterns', title: 'Patterns' },
];

// A dummy component for parent menu items that are not navigable
const DummyComponent = lazy(() => Promise.resolve({ default: () => null }));

export const appRoutes: AppRouteConfig[] = [
    // 메뉴에 표시되지 않는 페이지 (홈 - 디자인 시스템 소개)
    { id: 'home', path: '/', component: lazy(() => import('./pages/ComponentShowcasePage')) },

    // Foundations 그룹
    { id: 'color-palette', path: '/color-palette', component: lazy(() => import('./pages/ColorPalettePage')), menu: { text: 'Color Palette', group: 'foundations' } },
    { id: 'typography', path: '/typography', component: lazy(() => import('./pages/TypographyPage')), menu: { text: 'Typography', group: 'foundations' } },
    { id: 'spacing', path: '/spacing', component: lazy(() => import('./pages/SpacingPage')), menu: { text: 'Spacing', group: 'foundations' } },
    { id: 'shadow', path: '/shadow', component: lazy(() => import('./pages/ShadowPage')), menu: { text: 'Shadow', group: 'foundations' } },
    { id: 'border', path: '/border', component: lazy(() => import('./pages/BorderPage')), menu: { text: 'Border', group: 'foundations' } },
    { id: 'radius', path: '/radius', component: lazy(() => import('./pages/RadiusPage')), menu: { text: 'Radius', group: 'foundations' } },

    // Layout 그룹
    { id: 'box', path: '/box', component: lazy(() => import('./pages/BoxPage')), menu: { text: 'Box', group: 'layout' } },
    { id: 'container', path: '/container', component: lazy(() => import('./pages/ContainerPage')), menu: { text: 'Container', group: 'layout' } },
    { id: 'stack', path: '/stack', component: lazy(() => import('./pages/StackPage')), menu: { text: 'Stack', group: 'layout' } },
    { id: 'grid', path: '/grid', component: lazy(() => import('./pages/GridPage')), menu: { text: 'Grid', group: 'layout' } },
    { id: 'image-list', path: '/image-list', component: lazy(() => import('./pages/ImageListPage')), menu: { text: 'Image List', group: 'layout' } },
    
    // Components 그룹 (Nested Structure)
    // 부모 메뉴 아이템은 아이콘 메뉴에서 이미 선택되므로 Drawer에 표시하지 않음
    {
        id: 'components',
        path: '/components', // Dummy path for the main group
        component: DummyComponent,
        // menu 속성 제거 - Drawer에 표시되지 않음
        children: [
            {
                id: 'input-group',
                path: '#', // DummyComponent는 라우팅되지 않음
                component: DummyComponent,
                menu: { text: 'Input', group: 'components' },
                children: [
                    { id: 'button', path: '/button', component: lazy(() => import('./pages/ButtonPage')), menu: { text: 'Button', group: 'components' } },
                    { id: 'button-group', path: '/button-group', component: lazy(() => import('./pages/ButtonGroupPage')), menu: { text: 'ButtonGroup', group: 'components' } },
                    { id: 'autocomplete', path: '/autocomplete', component: lazy(() => import('./pages/AutocompletePage')), menu: { text: 'Autocomplete', group: 'components' } },
                    { id: 'checkbox', path: '/checkbox', component: lazy(() => import('./pages/CheckboxPage')), menu: { text: 'Checkbox', group: 'components' } },
                    { id: 'radio-group', path: '/radio-group', component: lazy(() => import('./pages/RadioGroupPage')), menu: { text: 'Radio Group', group: 'components' } },
                    { id: 'rating', path: '/rating', component: lazy(() => import('./pages/RatingPage')), menu: { text: 'Rating', group: 'components' } },
                    { id: 'select', path: '/select', component: lazy(() => import('./pages/SelectPage')), menu: { text: 'Select', group: 'components' } },
                    { id: 'slider', path: '/slider', component: lazy(() => import('./pages/SliderPage')), menu: { text: 'Slider', group: 'components' } },
                    { id: 'switch', path: '/switch', component: lazy(() => import('./pages/SwitchPage')), menu: { text: 'Switch', group: 'components' } },
                    { id: 'textfield', path: '/textfield', component: lazy(() => import('./pages/TextFieldPage')), menu: { text: 'TextField', group: 'components' } },
                ]
            },
            {
                id: 'navigation-group',
                path: '#', // DummyComponent는 라우팅되지 않음
                component: DummyComponent,
                menu: { text: 'Navigation', group: 'components' },
                children: [
                    { id: 'bottom-nav', path: '/bottom-nav', component: lazy(() => import('./pages/BottomNavPage')), menu: { text: 'Bottom Navigation', group: 'components' } },
                    { id: 'breadcrumbs', path: '/breadcrumbs', component: lazy(() => import('./pages/BreadcrumbsPage')), menu: { text: 'Breadcrumbs', group: 'components' } },
                    { id: 'drawer', path: '/drawer', component: lazy(() => import('./pages/DrawerPage')), menu: { text: 'Drawer', group: 'components' } },
                    { id: 'menu', path: '/menu', component: lazy(() => import('./pages/MenuPage')), menu: { text: 'Menu', group: 'components' } },
                    { id: 'pagination', path: '/pagination', component: lazy(() => import('./pages/PaginationPage')), menu: { text: 'Pagination', group: 'components' } },
                    { id: 'speed-dial', path: '/speed-dial', component: lazy(() => import('./pages/SpeedDialPage')), menu: { text: 'Speed Dial', group: 'components' } },
                    { id: 'stepper', path: '/stepper', component: lazy(() => import('./pages/StepperPage')), menu: { text: 'Stepper', group: 'components' } },
                    { id: 'tabs', path: '/tabs', component: lazy(() => import('./pages/TabsPage')), menu: { text: 'Tabs', group: 'components' } },
                ]
            },
            {
                id: 'surface-group',
                path: '#', // DummyComponent는 라우팅되지 않음
                component: DummyComponent,
                menu: { text: 'Surface', group: 'components' },
                children: [
                    { id: 'accordion', path: '/accordion', component: lazy(() => import('./pages/AccordionPage')), menu: { text: 'Accordion', group: 'components' } },
                    { id: 'appbar', path: '/appbar', component: lazy(() => import('./pages/AppBarPage')), menu: { text: 'Appbar', group: 'components' } },
                    { id: 'card', path: '/card', component: lazy(() => import('./pages/CardPage')), menu: { text: 'Card', group: 'components' } },
                ]
            },
            {
                id: 'feedback-group',
                path: '#', // DummyComponent는 라우팅되지 않음
                component: DummyComponent,
                menu: { text: 'Feedback', group: 'components' },
                children: [
                    { id: 'alert', path: '/alert', component: lazy(() => import('./pages/AlertPage')), menu: { text: 'Alert', group: 'components' } },
                    { id: 'dialog', path: '/dialog', component: lazy(() => import('./pages/DialogPage')), menu: { text: 'Dialog', group: 'components' } },
                    { id: 'progress', path: '/progress', component: lazy(() => import('./pages/ProgressPage')), menu: { text: 'Progress', group: 'components' } },
                ]
            },
            {
                id: 'mui-x-group',
                path: '#', // DummyComponent는 라우팅되지 않음
                component: DummyComponent,
                menu: { text: 'MUI X', group: 'components' },
                children: [
                    { id: 'data-grid', path: '/data-grid', component: lazy(() => import('./pages/DataGridPage')), menu: { text: 'Data Grid', group: 'components' } },
                    { id: 'date-picker', path: '/date-picker', component: lazy(() => import('./pages/DatePickerPage')), menu: { text: 'Date Picker', group: 'components' } },
                    { id: 'tree-view', path: '/tree-view', component: lazy(() => import('./pages/TreePage')), menu: { text: 'Tree View', group: 'components' } },
                    { id: 'date-time-picker', path: '/date-time-picker', component: lazy(() => import('./pages/DateTimePage')), menu: { text: 'Date Time Picker', group: 'components'} },
                ]
            }
        ]
    },

    // Patterns 그룹
    { id: 'dashboard', path: '/dashboard', component: lazy(() => import('./pages/Dashboard')), menu: { text: 'Dashboard', group: 'patterns' } },
    { id: 'login-showcase', path: '/login-showcase', component: lazy(() => import('./pages/LoginPage')), menu: { text: 'Login Page', group: 'patterns' } },
    { id: 'signup-showcase', path: '/signup-showcase', component: lazy(() => import('./pages/SignupPage')), menu: { text: 'Signup Page', group: 'patterns' } },
    { id: 'tabs-grid', path: '/tabs-grid', component: lazy(() => import('./template/TabsGrid')), menu: { text: '지불이관 명세서', group: 'patterns' } },
    { id: 'menu-config', path: '/menu-config', component: lazy(() => import('./template/SearchGrid')), menu: { text: '특정 지불 명세서', group: 'patterns' } },
    { id: 'menu-obj-config', path: '/menu-obj-config', component: lazy(() => import('./template/MenuObj')), menu: { text: '메뉴 OBJ 관리', group: 'patterns' } },
    { id: 'user-management', path: '/user-management', component: lazy(() => import('./template/User')), menu: { text: '사용자 관리', group: 'patterns' } },
    { id: 'user-menu-auth', path: '/user-menu-auth', component: lazy(() => import('./template/UserMenu')), menu: { text: '사용자별 메뉴 관리', group: 'patterns' } },
    { id: 'auth-group-management', path: '/auth-group-management', component: lazy(() => import('./template/AuthGroup')), menu: { text: '권한 그룹 관리', group: 'patterns' } },
    { id: 'auth-group-user', path: '/auth-group-user', component: lazy(() => import('./template/AuthGroupUser')), menu: { text: '권한그룹별 사용자 관리', group: 'patterns' } },
    { id: 'menu-permission', path: '/menu-permission', component: lazy(() => import('./template/MenuPermission')), menu: { text: '메뉴 권한 관리', group: 'patterns' } },
];
