# JIO Design System

> MUI 기반 디자인 시스템 및 컴포넌트 라이브러리

JIO Design System은 React + TypeScript로 구축된 디자인 시스템 사이트입니다. Material-UI(MUI) v7 컴포넌트를 기반으로 재사용 가능한 컴포넌트 라이브러리를 문서화하고 제공하며, 데스크톱과 모바일 환경 모두를 지원하는 반응형 레이아웃을 갖추고 있습니다.

**Live Demo**: [https://jiodesignsystem.vercel.app](https://jiodesignsystem.vercel.app)

## 주요 특징

- 🎨 **체계적인 디자인 시스템**: MUI 컴포넌트 기반의 재사용 가능한 컴포넌트 라이브러리
- 🌓 **다크모드 완벽 지원**: Light/Dark 테마 자동 전환
- 📱 **반응형 디자인**: 데스크톱과 모바일 전용 레이아웃 제공
- 🔧 **TypeScript 타입 안정성**: 모든 컴포넌트에 완전한 타입 정의
- 📚 **실시간 컴포넌트 Showcase**: 코드 예제와 미리보기를 함께 제공
- 🚀 **최신 기술 스택**: React 18, MUI v7, MUI X v8, Zustand 5

## 기술 스택

### Core
- **React 18.3** - UI 프레임워크
- **TypeScript 4.9** - 타입 안정성
- **React Router v6** - 클라이언트 사이드 라우팅

### UI Framework
- **MUI v7** - Material Design 컴포넌트 라이브러리
- **MUI X v8** - 고급 컴포넌트 (DataGrid, DatePicker, Charts, TreeView)
- **Emotion** - CSS-in-JS 스타일링

### State Management
- **Zustand 5** - 경량 상태 관리 (탭 관리)
- **React Context** - 테마, 인증, 알림 관리

### Utilities
- **Day.js** - 날짜/시간 처리
- **Pretendard** - 한국어 웹폰트
- **React Syntax Highlighter** - 코드 하이라이팅

## 시작하기

### 필수 요구사항

- Node.js 16.x 이상
- npm 7.x 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/longjio/jio_design_system.git
cd jio_design_system

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm start
```

개발 서버가 [http://127.0.0.1:3000](http://127.0.0.1:3000)에서 실행됩니다.

**참고**: 이 프로젝트는 `127.0.0.1`을 사용합니다 (localhost가 아님).

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

### 테스트

```bash
npm test
```

### Storybook

```bash
# Storybook 개발 서버 실행
npm run storybook

# Storybook 정적 빌드
npm run build-storybook
```

## 프로젝트 구조

```
jio_design_system/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── button/         # 버튼 컴포넌트들
│   │   ├── input/          # 폼 입력 컴포넌트들
│   │   ├── navigation/     # 네비게이션 컴포넌트들
│   │   ├── surface/        # 표면 컴포넌트들 (Card, Accordion 등)
│   │   ├── feedback/       # 피드백 컴포넌트들 (Alert, Dialog 등)
│   │   ├── mui_x/          # MUI X 컴포넌트들
│   │   ├── typography/     # 타이포그래피 컴포넌트들
│   │   ├── layout/         # 레이아웃 컴포넌트들
│   │   ├── form/           # 폼 관련 컴포넌트들
│   │   └── common/         # 공통 컴포넌트들
│   ├── pages/              # 페이지 컴포넌트들 (43개)
│   │   ├── foundation/     # Foundation 페이지
│   │   ├── component/      # Component 페이지
│   │   └── pattern/        # Pattern 페이지
│   ├── template/           # 프로덕션 템플릿
│   ├── layouts/            # 레이아웃 컴포넌트
│   │   ├── MainLayout.tsx  # 데스크톱 레이아웃
│   │   └── MobileLayout.tsx # 모바일 레이아웃
│   ├── mobile/             # 모바일 전용 페이지
│   ├── contexts/           # React Context 제공자
│   ├── stores/             # Zustand 스토어
│   ├── app-config.ts       # 라우트/메뉴 중앙 설정
│   ├── routes.tsx          # 라우트 정의
│   ├── menu-data.ts        # 메뉴 데이터 생성
│   └── theme.ts            # MUI 테마 설정
├── public/                 # 정적 파일
├── CLAUDE.md              # 개발자 가이드 (상세)
└── README.md              # 프로젝트 소개 (이 파일)
```

## 아키텍처

### Single Source of Truth 패턴

모든 라우트와 메뉴는 **`src/app-config.ts`**에서 중앙 관리됩니다:

```typescript
// src/app-config.ts
export const appRoutes: AppRouteConfig[] = [
  {
    path: '/app/button',
    menuText: 'Button',
    icon: <SmartButtonIcon />,
    element: lazy(() => import('./pages/component/ButtonPage')),
    menuGroup: 'Components'
  },
  // ... 더 많은 라우트
];
```

새 페이지를 추가하려면:
1. `src/app-config.ts`에 라우트 설정만 추가
2. 나머지 파일들은 자동으로 업데이트됨

### 레이아웃 시스템

#### 데스크톱 (`/app/*`)
- **IconSidebar** (1단계) - 메뉴 그룹 아이콘 네비게이션
- **Drawer** (2단계) - 메뉴 항목 목록
- **Tab System** - 다중 탭 인터페이스
- **Breadcrumbs** - 현재 위치 표시

#### 모바일 (`/m/*`)
- **BottomNavigation** - 하단 네비게이션 바
- **단일 페이지** 뷰 (탭 없음)
- 상세 페이지는 별도 라우트

### 테마 시스템

`src/theme.ts`에서 정의:

- **컬러 팔레트**: Primary `#323F53` (light) / `#A8B0BC` (dark)
- **타이포그래피**: Pretendard 폰트 + 11가지 타입 스케일
- **다크모드**: 완전한 Light/Dark 팔레트
- **커스텀 스크롤바**: 테마별 스타일
- **모바일 최적화**: 300ms 탭 딜레이 제거

## 컴포넌트 카탈로그

### Foundations
- **Color Palette** - 전체 색상 시스템
- **Typography** - 타이포그래피 스케일

### Components (34개)

#### Input (8개)
Button, Checkbox, TextField, Select, Radio, Switch, DatePicker, TimePicker

#### Navigation (6개)
Breadcrumbs, Drawer, Menu, Pagination, Tabs, Link

#### Surface (3개)
Accordion, AppBar, Card

#### Feedback (3개)
Alert, Dialog, Progress

#### MUI X (5개)
DataGrid, DatePicker, DateTimePicker, TimePicker, TreeView

#### Layout (2개)
Grid, ImageList

#### Typography (11개)
HeadlineL/M/S, TitleL/M/S/XS, BodyL/M/S/XS

### Patterns
- **Dashboard** - 대시보드 예제
- **Component Showcase** - 컴포넌트 문서화 시스템
- **Signup** - 회원가입 폼

## 컴포넌트 사용 예제

### DsButton

```tsx
import { DsButton } from './components/button';

function App() {
  return (
    <DsButton
      variant="contained"
      color="primary"
      loading={false}
    >
      클릭
    </DsButton>
  );
}
```

### DsTextField

```tsx
import { DsTextField } from './components/input';

function Form() {
  return (
    <DsTextField
      label="이름"
      placeholder="이름을 입력하세요"
      fullWidth
    />
  );
}
```

### ComponentShowcase (문서화 시스템)

```tsx
import { ComponentShowcase } from './components/common';

<ComponentShowcase
  title="Button 예제"
  description="기본 버튼 컴포넌트입니다."
  component={<DsButton>클릭</DsButton>}
  code={`<DsButton>클릭</DsButton>`}
/>
```

## 개발 가이드

### 새 컴포넌트 추가

1. `src/components/[category]/NewComponent.tsx` 생성
2. `src/components/[category]/index.ts`에 export 추가
3. `src/pages/component/NewComponentPage.tsx` 페이지 생성
4. `src/app-config.ts`에 라우트 추가

### 새 페이지 추가

```typescript
// src/app-config.ts에 추가
{
  path: '/app/my-page',
  menuText: 'My Page',
  icon: <MyIcon />,
  element: lazy(() => import('./pages/MyPage')),
  menuGroup: 'Components'
}
```

자세한 내용은 [CLAUDE.md](CLAUDE.md)를 참조하세요.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm start` | 개발 서버 시작 (127.0.0.1:3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm test` | 테스트 실행 |
| `npm run storybook` | Storybook 개발 서버 시작 |
| `npm run build-storybook` | Storybook 정적 빌드 |

## 브라우저 지원

### Production
- \>0.2% 시장 점유율
- 활성 브라우저
- Opera Mini 제외

### Development
- 최신 Chrome
- 최신 Firefox
- 최신 Safari

## 배포

이 프로젝트는 Vercel에 자동 배포됩니다. GitHub의 `main` 브랜치에 push하면 자동으로 배포가 시작됩니다.

배포 URL: [https://jiodesignsystem.vercel.app](https://jiodesignsystem.vercel.app)

## 라이선스

Private

## 기여

내부 프로젝트입니다. 기여 가이드는 별도 문서를 참조하세요.

## 문의

프로젝트 관련 문의사항은 이슈 트래커를 이용해주세요.

---

**Built with ❤️ using React + MUI**
