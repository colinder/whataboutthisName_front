# 이 이름 어때요? 👶

대한민국 대법원 공식 출생신고 통계 기반 아기 이름 검색 서비스

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwhataboutthisname.vercel.app)](https://whataboutthisname.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌟 주요 기능

- **이름 검색**: 원하는 이름을 검색하여 실제 출생신고 통계 확인
- **인기 순위**: 연도별, 성별 인기 이름 순위 조회
- **트렌드 분석**: 이름의 인기 변화 추이를 그래프로 시각화
- **통계 정보**: 2008년부터 현재까지의 대법원 공식 데이터 제공

## 🚀 기술 스택

### Frontend
- **React** 18.3.1
- **Vite** 6.0.11
- **React Router** 7.1.3
- **Recharts** - 데이터 시각화

### Backend
- **FastAPI** (Python)
- **PostgreSQL** (Neon)
- **Selenium** - 데이터 크롤링

### Deployment
- **Frontend**: Vercel
- **Backend**: Google Cloud Run

## 📊 데이터 출처

대한민국 대법원 전자가족관계등록시스템
- 수집 기간: 2008년 1월 ~ 현재
- 업데이트 주기: 연 1회
- 데이터 범위: 성별 상위 20위 이름

## 🛠️ 설치 및 실행

### Prerequisites
- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/colinder/whataboutthisName_front.git
cd whataboutthisName_front

# 의존성 설치
npm install
```

### 환경 변수 설정

`.env` 파일 생성:

```env
VITE_API_URL=your_api_url_here
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

## 📁 프로젝트 구조

```
whataboutthisName_front/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DataStatsSection.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBox.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── home.jsx
│   │   └── Result.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.production
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js


## 🌐 배포

### Frontend (Vercel)

**Production URL**: [https://whataboutthisname.vercel.app](https://whataboutthisname.vercel.app)

자동 배포:
- `main` 브랜치 푸시 시 자동 배포
- PR 생성 시 Preview 배포

### Backend (Google Cloud Run)

**API URL**: [https://whataboutthisname-back-534420618793.asia-northeast3.run.app](https://whataboutthisname-back-534420618793.asia-northeast3.run.app)

## 📈 SEO 최적화

- ✅ Google Search Console 등록
- ✅ 네이버 서치어드바이저 등록
- ✅ Sitemap.xml 제출
- ✅ robots.txt 설정
- ✅ Open Graph 메타 태그
- ✅ 구조화된 데이터 (JSON-LD)

## 🔍 주요 키워드

- 아기 이름
- 출생신고 통계
- 이름 순위
- 인기 이름
- 대법원 통계
- 아기 작명

## 📊 Analytics

- **Google Analytics 4**: 사용자 행동 분석
- **Vercel Analytics**: 트래픽 모니터링

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

이 프로젝트는 MIT 라이센스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 문의

이메일: selfor.official@gmail.com

## 🙏 감사의 말

- 대한민국 대법원 전자가족관계등록시스템
- React 커뮤니티
- Vercel

---

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!