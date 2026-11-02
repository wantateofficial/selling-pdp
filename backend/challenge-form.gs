/**
 * 유료 챌린지 신청 구글 폼 생성기 (Google Apps Script, 한 번만 실행).
 * 실행하면 내 구글 드라이브에 신청 폼 + 응답 시트가 새로 만들어지고, 폼 주소가 로그에 찍힌다.
 *
 * [사용 방법]
 * 1) script.google.com → 새 프로젝트 → 이 코드 전체 붙여넣기 → 저장.
 * 2) 아래 CONFIG 를 확인 (기수·가격·계좌·연락 방법).
 * 3) 위쪽 함수 선택에서 createChallengeForm 을 고르고 ▶ 실행 → 권한 승인.
 * 4) 하단 "실행 로그"에 나온 [신청 주소] 를 상세페이지 md 의 `## 링크` → `- 신청폼:` 에 넣는다.
 *    ([편집 주소] 로 들어가면 폼 문구를 손으로 고칠 수 있다. 다시 실행하면 폼이 하나 더 생긴다.)
 *
 * 구간이 마감되면 폼 편집 화면에서 "신청 구간" 질문의 해당 선택지만 지우면 된다.
 * 카피 규칙 (PRD §16): 수익 보장 표현 금지, "정가 → 할인가" 비교 표기 금지 (정규 오픈 예정가로만).
 */

var CONFIG = {
  cohort: '2기',
  title: '[2기] 얼굴 노출없이, 촬영없이 시작하는 쇼핑숏폼 4주 챌린지 신청',
  schedule: '2026년 11월 15일(일) 시작 · 4주간 매주 일요일 14시 라이브 + 수익 확장 특강',
  regularPrice: '60만원',
  tiers: [
    '얼리버드 특가 150,000원 (선착순 20명, 11/7 데모강의일까지)',
    '2차 특가 250,000원 (20명, 얼리버드 마감 후)',
    '일반 특가 350,000원 (잔여 10명, 2차 마감 후)',
  ],
  account: '카카오뱅크 / 원테이트 / 3333-34-0764811',
  pageUrl: 'https://saturdayclub-selling-pdp.netlify.app/?page=challenge2',
};

function createChallengeForm() {
  var c = CONFIG;
  var form = FormApp.create(c.title);
  form.setTitle(c.title);
  form.setDescription(
    [
      "얼굴 노출과 촬영 없이 '쇼핑 숏폼'을 4주 동안 직접 만들고 올려보는 실전 챌린지입니다.",
      '',
      '■ 일정',
      '- ' + c.schedule,
      '',
      '■ 수강료 (' + c.cohort + ' 한정 특별가 · 정규 오픈 예정가 ' + c.regularPrice + ')',
    ]
      .concat(c.tiers.map(function (t) { return '- ' + t; }))
      .concat([
        '※ 총 50명 정원이며, 입금 확인 순으로 마감됩니다.',
        '',
        '■ 입금 계좌',
        '💰 ' + c.account,
        '',
        '■ 신청 방법',
        '1) 신청 구간의 수강료를 위 계좌로 입금',
        '2) 이 폼 작성 후 제출',
        '3) 입금 확인 후, 적어주신 연락처로 ' + c.cohort + ' 챌린지 안내방(카카오톡 오픈채팅) 주소를 보내드립니다.',
        '',
        '수강취소·환불은 상세페이지 하단 환불규정(학원법 시행령 별표4 기준)을 따릅니다.',
        '상세페이지: ' + c.pageUrl,
      ])
      .join('\n')
  );
  form.setConfirmationMessage(
    '신청이 접수되었습니다. 입금이 확인되면 적어주신 연락처로 ' +
      c.cohort +
      ' 챌린지 안내방 주소를 보내드릴게요.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(false);

  form
    .addTextItem()
    .setTitle('신청자 성함')
    .setHelpText('입금자명이 다를 경우 반드시 "신청자명/입금자명" 형태로 적어주세요.')
    .setRequired(true);

  var phone = FormApp.createTextValidation()
    .requireTextMatchesPattern('^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$')
    .setHelpText('010-1234-5678 형식으로 적어주세요.')
    .build();
  form
    .addTextItem()
    .setTitle('연락처')
    .setHelpText('챌린지 안내방 주소를 보내드릴 번호입니다. (예: 010-1234-5678)')
    .setValidation(phone)
    .setRequired(true);

  var tier = form.addMultipleChoiceItem().setTitle('신청 구간').setRequired(true);
  tier.setChoices(c.tiers.map(function (t) { return tier.createChoice(t); }));

  form
    .addTextItem()
    .setTitle('입금일')
    .setHelpText('예: 10/24')
    .setRequired(true);

  var refund = form.addCheckboxItem().setTitle('환불규정 확인 (필수)').setRequired(true);
  refund.setChoices([
    refund.createChoice(
      '수강취소·환불은 상세페이지의 환불규정(강의 업로드일 기준 수강기간 경과율, 절반 경과 후 환불 불가)을 따른다는 것을 확인했습니다.'
    ),
  ]);

  var privacy = form.addCheckboxItem().setTitle('개인정보 수집 및 이용 동의 (필수)').setRequired(true);
  privacy.setChoices([
    privacy.createChoice(
      '이름·연락처를 강의 안내와 입금 확인 목적으로 수집·이용하며, 목적 달성 후에는 관계 법령에 따른 보관 기간을 제외하고 파기하는 것(상세페이지 개인정보처리방침)에 동의합니다.'
    ),
  ]);

  // 응답을 새 구글 시트에 쌓는다.
  var sheet = SpreadsheetApp.create('쇼핑숏폼 ' + c.cohort + ' 챌린지 신청자 (폼 응답)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('[신청 주소] ' + form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('[편집 주소] ' + form.getEditUrl());
  Logger.log('[응답 시트] ' + sheet.getUrl());
}
