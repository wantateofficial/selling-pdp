"""Report aggregate metrics only. No individual registration data is sent."""
import json
import os
import sys
from datetime import datetime, timezone
from urllib.parse import quote, urlparse
from zoneinfo import ZoneInfo
import requests

KST = ZoneInfo('Asia/Seoul')


def required(name):
    value = os.environ.get(name, '').strip()
    if not value:
        raise ValueError('설정 누락: ' + name)
    return value


def request_json(url, **kw):
    response = requests.get(url, timeout=30, **kw)
    response.raise_for_status()
    return response.json()


def meta_report():
    token = required('META_TOKEN')
    account = required('META_AD_ACCOUNT').removeprefix('act_')
    if not account.isdigit():
        raise ValueError('광고 계정 ID는 숫자여야 합니다')
    ids = [x.strip() for x in required('META_CAMPAIGN_IDS').split(',') if x.strip()]
    if not ids or any(not x.isdigit() for x in ids):
        raise ValueError('캠페인 ID 설정을 확인하세요')
    version = required('META_API_VERSION')
    if not __import__('re').fullmatch(r'v\d+\.\d+', version):
        raise ValueError('Meta API 버전 설정을 확인하세요')
    url = f'https://graph.facebook.com/{version}/act_{account}/insights'
    params = {'level': 'campaign', 'date_preset': 'today',
              'fields': 'campaign_id,spend,impressions,inline_link_clicks,actions',
              'filtering': json.dumps([{'field': 'campaign.id', 'operator': 'IN', 'value': ids}]),
              'limit': 100}
    headers = {'Authorization': 'Bearer ' + token}
    def fetch(params):
        data = []
        response = request_json(url, params=params, headers=headers)
        while True:
            data.extend(response.get('data', []))
            # The next URL may contain a token; never print it.
            next_url = response.get('paging', {}).get('next')
            if not next_url:
                return data
            if urlparse(next_url).hostname != 'graph.facebook.com':
                raise ValueError('Meta 페이지 주소가 올바르지 않습니다')
            response = request_json(next_url, headers=headers)
    rows = fetch(params)
    placements = fetch({**params, 'breakdowns': 'publisher_platform,platform_position'})
    return summarize_meta(rows, placements)


def summarize_meta(rows, placements):
    spend = sum(float(x.get('spend', 0)) for x in rows)
    impressions = sum(int(x.get('impressions', 0)) for x in rows)
    clicks = sum(int(x.get('inline_link_clicks', 0)) for x in rows)
    grouped = {}
    for row in placements:
        position = row.get('platform_position', 'unknown')
        label = {'feed': '피드', 'story': '스토리', 'reels': '릴스'}.get(position, position)
        platform = row.get('publisher_platform', 'unknown')
        key = (platform, label)
        n, c = grouped.get(key, (0, 0))
        grouped[key] = (n + int(row.get('impressions', 0)), c + int(row.get('inline_link_clicks', 0)))
    landing_views = []
    for row in rows:
        for action in row.get('actions', []):
            if action.get('action_type') == 'landing_page_view':
                landing_views.append(int(action.get('value', 0)))
    leads = []
    for row in rows:
        for action in row.get('actions', []):
            if action.get('action_type') == 'offsite_conversion.fb_pixel_lead':
                leads.append(int(action.get('value', 0)))
    lines = [f'메타 광고(오늘): 지출 {spend:,.0f}원 · 링크 클릭 {clicks:,}회 · 링크 클릭률 {pct(clicks, impressions)}']
    lines.append(f'랜딩 페이지 조회: {sum(landing_views):,}회' if landing_views else '랜딩 페이지 조회: 확인 필요')
    if leads:
        n = sum(leads)
        lines.append(f'메타 픽셀 기여 신청: {n:,}건 · 신청당 {spend/n:,.0f}원' if n else '메타 픽셀 기여 신청: 0건 · 신청당 비용 계산 불가')
    else:
        lines.append('메타 픽셀 기여 신청/신청당 비용: 확인 필요')
    if grouped:
        lines.append('지면별 링크 클릭률: ' + ' / '.join(f'{p} {k} {pct(c, n)}' for (p, k), (n, c) in grouped.items()))
    else:
        lines.append('지면별 링크 클릭률: 데이터 없음')
    # Meta-reported conversion results and sheet submissions are distinct.
    return lines, spend


def pct(count, impressions):
    return f'{100 * count / impressions:.2f}%' if impressions else '데이터 없음'


def sheet_count():
    import google.auth
    from google.auth.transport.requests import AuthorizedSession
    creds, _ = google.auth.default(scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
    session = AuthorizedSession(creds)
    sheet_id = required('SHEET_ID')
    tab = (os.environ.get('SHEET_TAB', '').strip() or '2기 신청자(최종)').replace("'", "''")
    # Read timestamps only: names and phone numbers are not requested.
    range_name = quote("'" + tab + "'!A:A", safe='')
    resp = session.get(f'https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/{range_name}', timeout=30)
    resp.raise_for_status()
    values = resp.json().get('values', [])
    today = datetime.now(KST).date()
    count = 0
    for row in values[1:]:
        if not row or not row[0]:
            continue
        raw = str(row[0]).strip()
        try:
            timestamp = datetime.fromisoformat(raw.replace('Z', '+00:00'))
        except ValueError:
            raise ValueError('신청 시각 형식을 확인해야 합니다') from None
        if timestamp.tzinfo is None:
            timestamp = timestamp.replace(tzinfo=KST)
        if timestamp.astimezone(KST).date() == today:
            count += 1
    return count


def clarity_report():
    data = request_json('https://www.clarity.ms/export-data/api/v1/project-live-insights',
                        params={'numOfDays': 1}, headers={'Authorization': 'Bearer ' + required('CLARITY_TOKEN')})
    metrics = {x.get('metricName'): x.get('information', []) for x in data}
    def one(name):
        rows = metrics.get(name, [])
        return rows[0] if len(rows) == 1 else {}
    traffic, scroll, rage = one('Traffic'), one('ScrollDepth'), one('RageClickCount')
    # API field availability may vary. Missing values are never treated as zero.
    def show(row, field, suffix=''):
        value = row.get(field)
        return str(value) + suffix if value is not None else '확인 필요'
    return ('Clarity(최근 24시간): 방문자 ' + show(traffic, 'distantUserCount', '명')
            + ' · 평균 스크롤 ' + show(scroll, 'averageScrollDepth', '%')
            + ' · 과다 반복 클릭 ' + show(rage, 'subTotal', '회'))


def main():
    webhook = required('SLACK_WEBHOOK')
    parsed = urlparse(webhook)
    if parsed.scheme != 'https' or parsed.hostname != 'hooks.slack.com' or not parsed.path.startswith('/services/'):
        raise ValueError('Slack 웹후크 주소가 올바르지 않습니다')
    lines = ['[쇼핑숏폼 광고 리포트]', datetime.now(KST).strftime('기준: %Y-%m-%d %H:%M KST')]
    spend = None
    try:
        meta, spend = meta_report(); lines += meta
    except Exception as e:
        lines.append('메타 광고: 조회 실패 (' + type(e).__name__ + ')')
    try:
        count = sheet_count()
        lines.append(f'시트 신청(오늘, 전체 유입): {count:,}건')
        lines.append('광고비/전체 시트 신청: ' + (f'{spend/count:,.0f}원 (참고치, 광고 유입만의 CPA 아님)' if spend is not None and count else '계산 불가'))
    except Exception as e:
        lines.append('시트 신청: 조회 실패 (' + type(e).__name__ + ')')
    try:
        lines.append(clarity_report())
    except Exception as e:
        lines.append('Clarity: 조회 실패 (' + type(e).__name__ + ')')
    response = requests.post(webhook, json={'text': '\n'.join(lines)}, timeout=30)
    response.raise_for_status()
    print('보고 전송 완료')


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        # Avoid printing URLs, credentials, or raw API errors.
        print('보고 실패: ' + type(exc).__name__, file=sys.stderr)
        sys.exit(1)
