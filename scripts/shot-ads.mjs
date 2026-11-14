import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
const out = process.argv[2] || 'output/ads'; mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1200, height: 2000 } });
if (process.env.FONT_DIR) await p.route(/cdn\.jsdelivr\.net\/gh\/orioncactus\/pretendard.*\/static\/(.+)$/, (r) => {
  const rel = r.request().url().split('/static/')[1];
  r.fulfill({ status: 200, body: readFileSync(`${process.env.FONT_DIR}/${rel}`), contentType: rel.endsWith('.css') ? 'text/css' : 'font/woff2' });
});
await p.goto((process.env.BASE_URL || 'http://127.0.0.1:4173') + '/ads.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
for (const el of await p.$$('.ad')) { const id = await el.getAttribute('id'); await el.screenshot({ path: `${out}/${id}.png` }); console.log(id); }
await b.close();
