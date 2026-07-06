/**
 * 무료 데모강의 신청 수집 백엔드 (Google Apps Script).
 * 상세페이지 하단 신청 폼이 이 웹앱으로 POST되고, 연결된 구글시트(=DB)에 한 줄씩 쌓인다.
 *
 * [설치 방법]
 * 1) 구글시트 새로 만들기 → 1행에 헤더 입력:
 *    시각 | 페이지 | 강의일 | 이름 | 연락처 | 강의명 | URL | UA
 * 2) 시트에서 확장 프로그램 → Apps Script → 이 코드 전체 붙여넣기.
 * 3) 배포 → 새 배포 → 유형: 웹 앱.
 *    - 실행: 나(본인)
 *    - 액세스 권한: 모든 사용자(익명 포함)   ← 외부에서 POST 가능해야 함
 * 4) 배포 후 나오는 "웹 앱 URL"을 복사 → 프론트 .env 의 VITE_SIGNUP_ENDPOINT 에 붙여넣기.
 * 5) 시트가 곧 신청자 DB. 들어온 신청자에게 단톡방/강의 링크를 안내하면 됨.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.ts || new Date().toISOString(),
      data.page || '',
      data.date || '',
      data.name || '',
      data.phone || '',
      data.course || '',
      data.url || '',
      data.ua || '',
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// 헬스체크용 (브라우저로 URL 열면 동작 확인)
function doGet() {
  return ContentService.createTextOutput('signup endpoint OK');
}
