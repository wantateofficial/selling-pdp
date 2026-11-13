# 광고 리포트 준비안 — 아직 배포하지 않음

이 묶음은 구현 초안입니다. 실제 계정·권한과 API 응답을 이용한 테스트를 거치지 않았고 운영에 바로 설치하지 마세요.

- .github/workflows/ad-report.yml: 서울시간 매일 09:00과 16:00에 해당하는 실행 시각.
- scripts/ad_reporting/report.py: 특정 캠페인의 메타 지표, 시트의 오늘 신청 수, Clarity 최근 24시간 집계 및 슬랙 메시지 작성 초안.
- tests/test_ad_report.py: 클릭률 계산 테스트.

필수 설정: SLACK_WEBHOOK, CLARITY_TOKEN, META_TOKEN, META_AD_ACCOUNT, META_CAMPAIGN_IDS, SHEET_ID 비밀값과 META_API_VERSION, SHEET_TAB, GOOGLE_WORKLOAD_PROVIDER, GOOGLE_SERVICE_ACCOUNT 변수. GitHub Actions의 단기 인증을 사용하며, 구글 서비스 계정에는 해당 시트 열람 권한이 필요합니다. 민감정보를 로그나 메시지에 보내지 않도록 신청 시각 열만 읽습니다.

Clarity의 API 결과 필드와 메타 전환 및 지면별 응답, 구글 시트 시간 형식과 테스트 신청 건 처리, 매개변수 설정, 워크플로 운영 권한은 실제 계정에서 추가 검증이 필요합니다. 숫자를 확인할 수 없는 항목은 추측해 0으로 표시하지 않습니다. 시트 신청 건수는 전체 유입이며 메타 광고로 발생한 신청 수와 다릅니다. Meta는 당일 누적, Clarity는 직전 24시간으로 기간이 다릅니다.
