# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JIO Design System is a React + TypeScript web application built with Material-UI (MUI) components. It features both desktop and mobile layouts for a comprehensive design system documentation site. The project was bootstrapped with Create React App and uses MUI X components for advanced data visualization and interaction.

## Development Commands

### Essential Commands
- `npm start` - Start development server on http://127.0.0.1:3000 (note: uses HOST=127.0.0.1, not localhost)
- `npm run build` - Create production build
- `npm test` - Run tests in interactive watch mode
- `npm run deploy` - Deploy to GitHub Pages (runs predeploy build automatically)

### Storybook
- `npm run storybook` - Launch Storybook development server on port 6006
- `npm run build-storybook` - Build static Storybook site

## Architecture

### Single Source of Truth Pattern

The application uses a **centralized configuration pattern** where all routes, menus, and navigation are defined in a single location:

**`src/app-config.ts`** - The master configuration file that defines:
- `AppRouteConfig[]` - All routes with lazy-loaded components
- `menuGroups[]` - Menu group definitions (Foundations, Layout, Components, Patterns)
- Route metadata including menu text, icons, and hierarchical structure

This configuration flows to:
- **`src/menu-data.ts`** - Transforms `appRoutes` into two data structures:
  - `routableItems` - Flattened list of all routable pages
  - `menuStructure` - Hierarchical menu structure for UI rendering
- **`src/routes.tsx`** - Generates React Router route objects from `appRoutes`
- **`src/App.tsx`** - Main application routing (desktop `/app/*` and mobile `/m/*`)

**When adding new pages:**
1. Add route configuration to `src/app-config.ts`
2. All other files automatically update (no manual changes to menu-data.ts or routes.tsx)

### Layout System

#### Desktop Layout
- **IconSidebar** (1st level) - Fixed width sidebar with icon-based navigation for menu groups
- **Drawer** (2nd level) - Collapsible drawer showing menu items for the active icon menu group
- **Tab System** - Multi-tab interface for open pages (tabs cannot close the home `/app` tab)
- **Breadcrumbs** - Navigation breadcrumbs shown in main content area

Main layout file: `src/layouts/MainLayout.tsx`
- Uses Flexbox architecture with `display: flex` and `flexGrow: 1`
- Header is fixed at top (52px height on desktop)
- IconSidebar has fixed width defined by `ICON_SIDEBAR_WIDTH`
- Drawer width is 240px when open, 0px when closed
- Main content area grows to fill remaining space

#### Mobile Layout
- Separate routing under `/m/*` prefix
- Bottom navigation instead of sidebar
- Simplified single-page views without tabs
- Detail pages exist outside MobileLayout (e.g., `/m/notice/:id`, `/m/user-management/:id`)

Mobile routes defined in: `src/mobile/mobile-routes.ts`

### State Management

**Zustand** is used for client state:
- `src/stores/tabStore.ts` - Manages open tabs, active tab, add/remove/switch tab operations

**React Context** is used for:
- `src/contexts/ThemeModeContext.tsx` - Light/dark theme toggling
- `src/contexts/AuthContext.tsx` - User authentication state
- `src/contexts/SnackbarProvider.tsx` - Global snackbar notifications

### Theme System

**`src/theme.ts`** - MUI theme configuration with:
- Pretendard font family (Korean web font support)
- Light and dark mode palettes with custom success colors
- Custom scrollbar styling for both modes
- Global component overrides (Paper, Accordion, AppBar, DataGrid)
- Touch action optimization for mobile (`touchAction: 'manipulation'` to remove 300ms tap delay)
- Theme caching for performance

Color palette:
- Primary: `#323F53` (light) / `#A8B0BC` (dark)
- Custom success: `#019AB2` / `#63D4E6` / `#12B886`
- Charts colors defined in extended palette

### Component Organization

Components are organized by MUI category:
- `src/components/button/` - Button variants
- `src/components/input/` - Form inputs (TextField, Select, Checkbox, etc.)
- `src/components/navigation/` - Navigation components (Breadcrumbs, Tabs, Drawer, etc.)
- `src/components/surface/` - Surface components (Card, Accordion, AppBar)
- `src/components/feedback/` - Feedback components (Alert, Dialog, Progress)
- `src/components/mui_x/` - MUI X components (DataGrid, DatePicker, TreeView)
- `src/components/layout/` - Layout components (Grid, ImageList)
- `src/components/common/` - Shared/common components

### Page Templates

**`src/template/`** contains production page templates:
- `TabsGrid.tsx` - "지불이관 명세서" (Payment Transfer Statement)
- `SearchGrid.tsx` - "특정 지불 명세서" (Specific Payment Statement)
- `MenuObj.tsx` - Menu object management
- `User.tsx` - User management
- `UserMenu.tsx` - User menu permissions
- `AuthGroup.tsx` - Authorization group management
- `AuthGroupUser.tsx` - Authorization group user assignments

These are actual application pages, not just examples.

## TypeScript Configuration

- **Target:** ES5 for broad browser compatibility
- **Strict mode:** Enabled
- **JSX:** react-jsx (React 17+ transform)
- **Module resolution:** Node

## Key Dependencies

- **React 18.3** - UI framework
- **React Router v6** - Client-side routing
- **MUI v7** - Material Design component library
- **MUI X v8** - Advanced components (DataGrid, DatePicker, Charts, TreeView)
- **Zustand 5** - Lightweight state management
- **Day.js** - Date/time manipulation
- **Pretendard** - Korean typography web font
- **TypeScript 4.9** - Type safety

## Important Notes

- **GitHub Pages deployment:** Homepage set to `https://longjio.github.io/ssg_design_system`
- **Host binding:** Dev server runs on 127.0.0.1 (not localhost) - see package.json start script
- **Memory allocation:** Node process uses `--max-old-space-size=8192` for large builds
- **Patch-package:** Used for applying patches to dependencies (runs on postinstall)
- **Korean language:** UI text and comments are in Korean (this is intentional)

## Nested Menu Structure

The Components menu group uses nested children for organization:
- Input group (Button, Checkbox, TextField, etc.)
- Navigation group (Breadcrumbs, Drawer, Menu, Tabs, etc.)
- Surface group (Accordion, AppBar, Card)
- Feedback group (Alert, Dialog, Progress)
- MUI X group (DataGrid, DatePicker, TreeView)

Parent items with children use `DummyComponent` that renders null - they are not navigable themselves.
