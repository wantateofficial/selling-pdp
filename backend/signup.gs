/**
 * 무료 데모강의 신청 수집 백엔드 (Google Apps Script).
 * 상세페이지 하단 신청 폼이 이 웹앱으로 POST되고, 연결된 구글시트(=DB)에 한 줄씩 쌓인다.
 *
 * [설치 방법]
 * 1) 구글시트 새로 만들기. (헤더는 첫 신청이 들어올 때 자동으로 들어간다:
 *    시각 | 페이지 | 강의일 | 이름 | 연락처 | 강의명 | URL | UA)
 * 2) 시트에서 확장 프로그램 → Apps Script → 이 코드 전체 붙여넣기.
 * 3) 배포 → 새 배포 → 유형: 웹 앱.
 *    - 실행: 나(본인)
 *    - 액세스 권한: 모든 사용자(익명 포함)   ← 외부에서 POST 가능해야 함
 * 4) 배포 후 나오는 "웹 앱 URL"을 복사 → src/data/signup.ts 의 SIGNUP_ENDPOINT 에 붙여넣고 push.
 * 5) 시트가 곧 신청자 DB. 들어온 신청자에게 단톡방/강의 링크를 안내하면 됨.
 *
 * [기수별 탭]
 * 콘텐츠 md 의 "기수" 값(예: 2기)이 cohort 로 함께 들어오면 "2기 신청자" 탭에 쌓는다.
 * 탭이 없으면 자동으로 만든다. 기수가 없는 신청(1기)은 기존처럼 첫 번째 탭에 쌓인다.
 *
 * ⚠️ 이 파일을 고친 뒤에는 Apps Script 편집기에 다시 붙여넣고
 *    배포 → 배포 관리 → 수정(연필) → 버전: 새 버전 → 배포 해야 반영된다. (웹 앱 URL 은 그대로)
 */

var HEADER = ['시각', '페이지', '강의일', '이름', '연락처', '강의명', 'URL', 'UA'];

function getTargetSheet(cohort) {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  // 탭 이름에 쓸 수 없는 문자 제거
  var key = String(cohort || '').replace(/[\[\]\*\?\/\\:]/g, '').trim();
  var sheet;
  if (!key) {
    sheet = book.getSheets()[0];
  } else {
    var name = key + ' 신청자';
    sheet = book.getSheetByName(name) || book.insertSheet(name, book.getSheets().length);
  }
  // 빈 탭이면 헤더를 먼저 넣는다 (직접 입력할 필요 없음)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getTargetSheet(data.cohort);
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
