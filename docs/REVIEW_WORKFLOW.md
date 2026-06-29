# 상세페이지 초안 리뷰 워크플로 (강사·팀 공유용)

상세페이지 초안을 **공유 주소**로 강사/팀에게 보여주고, 각 섹션의 **"수정 요청"**을 받아
**구글시트(DB)**에 쌓아 그에 맞게 수정하는 흐름.

## 1. 공유 주소 (호스팅)

로컬(`localhost:5183`)은 외부에 안 보이므로, 무료 호스팅에 올려 주소를 만든다.

### 옵션 A — Vercel (권장, Vite에 최적)
```bash
npm i -g vercel
vercel login          # 브라우저 인증 (계정 1개 필요)
vercel --prod         # 배포 → https://<프로젝트>.vercel.app 주소 발급
```
- 공유 주소 예: `https://selling-pdp.vercel.app/?page=demo`, `...?page=challenge`
- GitHub 저장소(wantateofficial/selling-pdp)를 Vercel에 연결하면 push마다 자동 재배포.

### 옵션 B — Netlify
```bash
npm i -g netlify-cli
netlify deploy --build --prod   # 안내에 따라 로그인 후 주소 발급
```

> 빌드 설정: `npm run build` → 출력 `dist/`. (둘 다 자동 인식)

## 2. 수정 요청 → 구글시트(DB) 연결

1. **구글시트** 새로 만들고 1행 헤더 입력:
   `시각 | 페이지 | 섹션 | 섹션명 | 요청자 | 수정요청내용 | URL | UA`
2. 시트 → **확장 프로그램 → Apps Script** → `backend/feedback.gs` 내용 붙여넣기.
3. **배포 → 새 배포 → 웹 앱**:
   - 실행: 나(본인)
   - 액세스: **모든 사용자(익명 포함)**
4. 발급된 **웹 앱 URL** 복사 → 프로젝트 루트에 `.env` 만들고:
   ```
   VITE_FEEDBACK_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```
5. 재배포(`vercel --prod`)하면 끝. 이제 페이지의 "수정 요청"이 시트에 한 줄씩 쌓인다.

> `.env`를 안 넣으면 "수정 요청"은 **메일 초안(mailto)**으로 폴백된다(서버 없이도 동작).

## 3. 실제 사용

- 강사에게 공유 주소 전달 → 각 섹션 우상단 **"✎ 수정 요청"** 클릭 → 내용 작성 → 전송.
- 팀은 **구글시트(DB)**를 보고 어떤 섹션을 어떻게 바꿔달라는지 확인 → 반영.
- 캡처/이미지로 보내는 페이지가 필요하면 `npm run export:all` 로 긴 이미지 추출 가능.

## 4. 참고

- "수정 요청" 버튼·미리보기 토글 등은 `.no-export`라 이미지 추출 시 자동 숨김.
- 콘텐츠 보호가 거슬리면 주소 끝에 `?dev=1` 또는 `devmode` 입력으로 해제.
