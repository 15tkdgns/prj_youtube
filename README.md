/youtube-scrapbook
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/              // 재사용 가능한 공용 컴포넌트 (Button, Input, Card 등)
│   │   ├── features/            // 특정 기능과 관련된 컴포넌트
│   │   │   ├── Auth/           // 로그인, 회원가입 관련 컴포넌트
│   │   │   │   └── AuthForm.jsx
│   │   │   └── Scrapbook/      // 스크랩북 관련 컴포넌트
│   │   │       ├── VideoItem.jsx
│   │   │       └── VideoList.jsx
│   │   └── App.jsx              // 최상위 컴포넌트
│   ├── contexts/
│   │   └── AuthContext.jsx      // 인증 상태 관리 컨텍스트
│   ├── hooks/
│   │   └── useLocalStorage.js   // 로컬 스토리지 커스텀 훅
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ScrapbookPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── utils/
│   │   └── validation.js       // 유효성 검사 함수
│   └── App.css                 // Tailwind CSS 설정 등
└── package.json
└── tailwind.config.js
└── README.md


# 유튜브 스크랩북 프로젝트

## 📌 프로젝트 소개
유튜브 영상을 개인적으로 스크랩하고 관리하는 웹 애플리케이션입니다. 사용자는 관심 있는 유튜브 영상의 링크를 저장하고, 메모를 추가하며, 카테고리별/재생목록별로 정리할 수 있습니다. 로컬 스토리지를 활용해 별도의 백엔드 서버 없이 사용자의 데이터를 저장하는 프로젝트입니다.

## 🚀 주요 기능
- **영상 스크랩**: 유튜브 URL과 메모, 썸네일 등을 직접 입력하여 영상을 저장합니다.
- **영상 관리**: 저장된 영상을 카테고리 또는 재생목록별로 분류하고 관리할 수 있습니다.
- **메모 기능**: 각 영상에 대한 개인적인 메모를 추가하고 수정합니다.
- **사용자 인증**: 자체 회원가입 시스템을 통해 사용자를 인증하고, 개인별 데이터를 분리하여 관리합니다.
- **추천 영상**: 로그인하지 않은 사용자도 추천 영상을 확인할 수 있습니다.

## 🛠️ 기술 스택
- **프론트엔드**: React.js
- **상태 관리**: `useContext`를 활용한 글로벌 상태 관리
- **스타일링**: Tailwind CSS
- **라우팅**: React Router
- **데이터 저장**: 로컬 스토리지 (`localStorage`)
- **커스텀 훅**: `useLocalStorage`를 포함한 커스텀 훅 활용

## 📦 폴더 구조
/src
├── components/
│   ├── common/
│   └── features/
│       ├── Auth/
│       └── Scrapbook/
├── contexts/
├── hooks/
├── pages/
├── utils/
└── ...


## 📝 구현 계획
1.  **초기 설정**: React 프로젝트 생성 및 Tailwind CSS, React Router 설치.
2.  **데이터 모델링**: 로컬 스토리지에 저장될 `users` 데이터 구조 설계.
3.  **인증 시스템**: 회원가입, 로그인 페이지 및 `useContext`를 활용한 인증 상태 관리 구현.
4.  **데이터 CRUD**: 로컬 스토리지에 영상 데이터를 추가(Create), 조회(Read), 수정(Update), 삭제(Delete)하는 기능 구현.
5.  **컴포넌트 개발**: 각 페이지 및 기능별 컴포넌트(`VideoItem`, `VideoList`, `AuthForm` 등) 개발.
6.  **커스텀 훅**: 로컬 스토리지를 쉽게 다룰 수 있는 `useLocalStorage` 커스텀 훅 개발.
7.  **라우팅 설정**: 페이지 이동을 위한 라우팅 설정.