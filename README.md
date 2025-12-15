# Mr. Daebak Dinner Service (미스터 대박)

**Mr. Daebak**은 Google Gemini API를 활용한 AI 기반 스마트 한식 주문 및 레스토랑 관리 플랫폼입니다.
음성 명령, AI 메뉴 추천, 그리고 생성형 이미지를 활용한 메뉴 관리 기능을 통해 손님과 직원 모두에게 최적화된 경험을 제공합니다.

---

## 🏗 시스템 아키텍처 및 데이터 흐름 (System Architecture & Flow)

본 서비스는 **데이터 수집 → 데이터 가공 → AI 모델 활용 → 서비스 출력**의 4단계 파이프라인을 통해 작동합니다.

### 1. 데이터 수집 (Data Collection)
사용자와 시스템의 상호작용을 통해 다양한 형태의 데이터를 실시간으로 수집합니다.
- **음성 데이터**: `VoiceControl` 컴포넌트를 통해 사용자의 마이크 입력을 수집 (Web Speech API).
- **텍스트/대화 데이터**: `ChatBot`을 통해 입력되는 사용자의 기분, 선호도, 메뉴 질문 텍스트.
- **행동 데이터**: 클릭 이벤트(메뉴 선택, 장바구니 담기), 상세 옵션 선택(굽기 정도, 스타일 등).
- **관리 데이터**: 직원(Staff)이 입력하는 재고 수량, 메뉴 수정 정보, 이미지 생성 프롬프트.

### 2. 데이터 가공 (Data Processing)
수집된 데이터는 AI 모델이 이해할 수 있는 형태나 비즈니스 로직에 맞게 전처리됩니다.
- **STT (Speech-to-Text)**: 브라우저 내장 API를 통해 음성 파형을 텍스트 문자열로 변환합니다.
- **컨텍스트 주입**: AI에게 현재 메뉴 목록, 품절 상태, 서빙 스타일 규칙 등을 시스템 프롬프트(System Instruction) 형태로 주입하여 할루시네이션을 방지합니다.
- **상태 관리 및 검증 (`DataContext`)**: 
  - 주문 전 재고량(Inventory)과 레시피(Recipe)를 대조하여 유효성을 검증합니다.
  - 사용자별 세션 및 인증 정보를 `AuthContext`를 통해 관리합니다.

### 3. AI 모델 활용 (Model Utilization: Google Gemini)
가공된 데이터는 목적에 맞는 Gemini 모델로 전송되어 추론 과정을 거칩니다.

| 기능 | 사용 모델 | 입력 (Input) | 출력 (Output) |
|------|----------|--------------|---------------|
| **메뉴 추천 챗봇** | `gemini-2.5-flash` | 사용자 채팅 + 메뉴판 컨텍스트 | 자연어 답변 + 추천 메뉴 태그(`[RECOMMEND: ID]`) |
| **음성 의도 파악** | `gemini-2.5-flash` | 변환된 텍스트 (STT 결과) | JSON 객체 (`IntentType`, `Target`, `Quantity`) |
| **메뉴 이미지 생성** | `gemini-2.5-flash-image` | 메뉴 이름 + 수정 프롬프트 | 고품질 음식 이미지 (Base64) |

### 4. 서비스 출력 (Service Output)
AI의 추론 결과와 비즈니스 로직 처리 결과가 사용자에게 시각적/기능적으로 전달되며 데이터베이스에 영구 저장됩니다.
- **동적 UI 업데이트**: 
  - 챗봇이 추천한 메뉴 카드를 클릭하면 상세 주문 모달(`MenuOrderModal`)이 팝업됩니다.
  - 음성 명령 결과에 따라 자동으로 페이지가 이동하거나 장바구니에 아이템이 담깁니다.
- **데이터 영속성 (Firebase Firestore)**:
  - **주문(Orders)**: 고객이 생성한 주문이 DB에 저장되고, 실시간으로 주방 대시보드(`StaffDashboard`)에 동기화됩니다.
  - **재고(Inventory)**: 주문 확정 시 `ingredientsPerSet` 로직에 따라 재료 단위로 재고가 자동 차감됩니다.
  - **쿠폰(Coupons)**: 직원이 발급한 쿠폰이 사용자 프로필에 저장되며 결제 시 사용 처리됩니다.

---

## 📁 프로젝트 구조 (Project Structure)

```
/
├── components/           # UI 컴포넌트
│   ├── MenuOrderModal.tsx # 상세 옵션(굽기, 스타일 등) 선택 빌더
│   ├── ChatBot.tsx        # Gemini 기반 추천 봇
│   └── VoiceControl.tsx   # 음성 인식 제어기
├── context/              # 상태 관리
│   ├── DataContext.tsx    # 재고, 주문, 메뉴 로직 (핵심 엔진)
│   └── AuthContext.tsx    # 사용자 인증 관리
├── services/             # API 통신
│   └── geminiService.ts   # Gemini API 연동 (Chat, Image, Intent)
├── pages/                # 라우트 페이지
│   ├── CustomerHome.tsx   # 고객 메인 (AI 챗봇 중심 인터페이스)
│   ├── StaffDashboard.tsx # 직원용 주문 현황판
│   ├── MenuManagement.tsx # AI 이미지 생성 및 메뉴 관리
│   └── ...
├── constants.ts          # 메뉴 레시피, 재료, 옵션 상수 정의
└── types.ts              # TypeScript 인터페이스 정의
```

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React 19, TypeScript, TailwindCSS
- **AI/LLM**: Google Gemini API (`@google/genai` SDK)
- **Database & Auth**: Firebase (Firestore, Authentication)
- **Build Tool**: Vite (Default configuration implied)

## 🚀 시작하기 (Getting Started)

1. **환경 변수 설정**: 루트 디렉토리에 `.env` 파일을 생성하고 API 키를 입력합니다.
    ```env
    API_KEY=YOUR_GEMINI_API_KEY
    VITE_FIREBASE_API_KEY=...
    ```
2. **패키지 설치**:
    ```bash
    npm install
    ```
3. **개발 서버 실행**:
    ```bash
    npm start
    ```
