// 상세페이지를 이미지, 영상, CSS까지 모두 넣은 HTML 한 파일로 저장한다 (?export=1 정적 모드)
// 사용: node scripts/export-html.mjs [page] (dev 서버가 BASE_URL 에 떠 있어야 함)
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
const page = process.argv[2] || 'challenge2';
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
mkdirSync('output', { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await p.route(/clarity\.ms|facebook/, (r) => r.abort());
await p.goto(`${BASE}/?page=${page}&export=1`, { waitUntil: 'networkidle' });
await p.waitForTimeout(1000);
const html = await p.evaluate(async () => {
  const toData = async (url) => {
    const blob = await (await fetch(url)).blob();
    return await new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
  };
  // CSS 모으기
  let css = '';
  for (const sh of document.styleSheets) {
    try { if (sh.href && !sh.href.startsWith(location.origin)) continue; for (const rule of sh.cssRules) css += rule.cssText + '\n'; } catch {}
  }
  const root = document.querySelector('#landing-root').cloneNode(true);
  root.querySelectorAll('.no-export, script').forEach((n) => n.remove());
  for (const el of root.querySelectorAll('img[src], video[src], video[poster]')) {
    for (const attr of ['src', 'poster']) {
      const v = el.getAttribute(attr);
      if (v && !v.startsWith('data:')) el.setAttribute(attr, await toData(new URL(v, location.href).href));
    }
  }
  root.querySelectorAll('video').forEach((v) => { v.setAttribute('autoplay', ''); v.setAttribute('muted', ''); v.setAttribute('loop', ''); v.setAttribute('playsinline', ''); });
  const font = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css';
  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${document.title}</title>
<link rel="stylesheet" href="${font}">
<style>${css}
summary > span:last-child{display:none!important}
</style></head><body>${root.outerHTML}
<script>document.querySelectorAll('video').forEach(function(v){v.muted=true;v.play().catch(function(){})})</script>
</body></html>`;
});
const out = `output/${page}.html`;
writeFileSync(out, html);
console.log('saved', out, (html.length / 1024 / 1024).toFixed(1) + 'MB');
await b.close();
