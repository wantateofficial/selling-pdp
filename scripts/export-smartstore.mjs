// 스마트스토어 상세 이미지 내보내기: 모바일 레이아웃(430px)을 2배로 찍어 폭 860px, 섹션별로 잘라 저장
// 사용: node scripts/export-smartstore.mjs [page] (dev 서버가 BASE_URL 에 떠 있어야 함)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const page = process.argv[2] || 'challenge2';
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const out = `output/smartstore-${page}${process.env.LAYOUT === 'pc' ? '-pc' : ''}`; mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
// LAYOUT=pc 이면 PC 레이아웃(860px 화면)으로 찍는다. 기본은 모바일 레이아웃(430px 화면 x2 = 860px)
const PC = process.env.LAYOUT === 'pc';
const ctx = await b.newContext(PC ? { viewport: { width: 860, height: 1200 }, deviceScaleFactor: 2 } : { viewport: { width: 430, height: 900 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
await p.route(/clarity\.ms|facebook/, (r) => r.abort());
// 글꼴 CDN 이 막힌 환경이면 FONT_DIR(pretendard 패키지의 dist/web/static)에서 대신 내려준다
if (process.env.FONT_DIR) {
  const { readFileSync } = await import('node:fs');
  await p.route(/cdn\.jsdelivr\.net\/gh\/orioncactus\/pretendard.*\/static\/(.+)$/, (r) => {
    const rel = r.request().url().split('/static/')[1];
    const body = readFileSync(`${process.env.FONT_DIR}/${rel}`);
    r.fulfill({ status: 200, body, contentType: rel.endsWith('.css') ? 'text/css' : 'font/woff2' });
  });
}
await p.goto(`${BASE}/?page=${page}&export=1`, { waitUntil: 'networkidle' });
await p.addStyleTag({ content: '.no-export{display:none!important} summary > span:last-child{display:none!important}' });
for (let y = 0; y < 40000; y += 700) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(80); }
await p.evaluate(() => window.scrollTo(0, 0));
await p.evaluate(() => document.querySelectorAll('video').forEach((v) => { v.pause(); v.currentTime = 2; }));
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1500);
const secs = await p.$$('#landing-root > section');
let i = 0;
for (const s of secs) { i++; await s.screenshot({ path: `${out}/${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 88 }); }
await p.screenshot({ path: `${out}/full.jpg`, fullPage: true, type: 'jpeg', quality: 85 });
console.log('saved', i, 'sections →', out);
await b.close();
