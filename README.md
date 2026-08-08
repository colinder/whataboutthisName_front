# 이 이름 어때요? 👶

대한민국 대법원 공식 출생신고 통계 기반 아기 이름 검색 서비스

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwhataboutthisname.vercel.app)](https://whataboutthisname.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌟 주요 기능

- **이름 검색**: 원하는 이름을 검색하여 실제 출생신고 통계 확인
- **인기 순위**: 연도별, 성별 인기 이름 순위 조회
- **트렌드 분석**: 이름의 인기 변화 추이를 그래프로 시각화
- **통계 정보**: 2008년부터 현재까지의 대법원 공식 데이터 제공

---

## 🚀 기술 스택

### Frontend
- **React** 18.3.1
- **Vite** 6.0.11
- **React Router** 7.1.3
- **Recharts** - 데이터 시각화
- **Framer Motion** - 애니메이션

### Backend
- **FastAPI** (Python)
- **PostgreSQL** (Neon)
- **Selenium** - 데이터 크롤링

### Deployment
- **Frontend**: Vercel
- **Backend**: Google Cloud Run
- **Scheduler**: Google Cloud Scheduler (매일 오전 9시 자동 크롤링)

---

## 📊 데이터 출처

대한민국 대법원 전자가족관계등록시스템
- 수집 기간: 2008년 1월 ~ 현재
- 업데이트 주기: 매일 자동 수집
- 데이터 범위: 시도별 × 성별 상위 이름

---

## 🛠️ 설치 및 실행

### Prerequisites
- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
git clone https://github.com/colinder/whataboutthisName_front.git
cd whataboutthisName_front
npm install
```

### 환경변수 설정

`.env` 파일 생성:

```env
VITE_API_URL=http://localhost:8080
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

---

## 📁 프로젝트 구조

```
whataboutthisName_front/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── config.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
├── .env
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚢 배포 구조 및 방법

### 전체 흐름

```
로컬 개발 (dev 브랜치)
    ↓ git push
GitHub (dev 브랜치)
    ↓ main 브랜치에 머지
GitHub (main 브랜치)
    ↓ 자동 감지
Vercel (자동 배포)
    ↓
https://whataboutthisname.vercel.app
```

### 브랜치 전략

| 브랜치 | 용도 |
|---|---|
| `main` | 프로덕션 배포 브랜치 (Vercel 연동) |
| `dev` | 개발 작업 브랜치 |

### 개발 작업

```bash
git checkout dev
git add .
git commit -m "feat: 변경 내용"
git push origin dev
```

### 프로덕션 배포

```bash
git checkout main
git merge dev
git push origin main
```

main 브랜치에 push되면 Vercel이 자동으로 감지하여 배포합니다.

### 환경변수 관리

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

| 변수명 | 설명 |
|---|---|
| `VITE_API_URL` | 백엔드 API 주소 |

---

## 📈 SEO 최적화

- ✅ Google Search Console 등록
- ✅ 네이버 서치어드바이저 등록
- ✅ Sitemap.xml 제출
- ✅ robots.txt 설정
- ✅ Open Graph 메타 태그
- ✅ 구조화된 데이터 (JSON-LD)

---

## 📊 Analytics

- **Google Analytics 4**: 사용자 행동 분석
- **Vercel Analytics**: 트래픽 모니터링

---

## 📝 License

이 프로젝트는 MIT 라이센스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 문의

selfor.official@gmail.com

---

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!
