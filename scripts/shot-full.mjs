// 큰 판 캡처: 모바일(390)과 PC(1440) 전체 화면. 사용: node scripts/shot-full.mjs <page> <outPrefix>
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [,, page, prefix] = process.argv;
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
for (const [n, vp, mob] of [['모바일', { width: 390, height: 844 }, true], ['PC', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mob ? 2 : 1, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage();
  await p.route(/clarity\.ms|facebook|script\.google/, (r) => r.abort());
  if (process.env.FONT_DIR) await p.route(/cdn\.jsdelivr\.net\/gh\/orioncactus\/pretendard.*\/static\/(.+)$/, (r) => {
    const rel = r.request().url().split('/static/')[1];
    r.fulfill({ status: 200, body: readFileSync(`${process.env.FONT_DIR}/${rel}`), contentType: rel.endsWith('.css') ? 'text/css' : 'font/woff2' });
  });
  await p.goto(`${BASE}/?page=${page}`, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: '.no-export{display:none!important}' });
  for (let y = 0; y < 30000; y += 600) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(60); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${prefix}_${n}.png`, fullPage: true });
  console.log(n, await p.evaluate(() => document.body.scrollHeight));
  await ctx.close();
}
await b.close();
