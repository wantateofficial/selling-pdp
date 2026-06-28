import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

// 렌더 검증용: 두 페이지를 export 모드로 풀페이지 캡처하고 콘솔/페이지 에러를 수집한다.
const BASE = process.env.BASE_URL || 'http://localhost:5183';
const outDir = resolve('scratch_verify');

async function shoot(browser: any, pageType: 'demo' | 'challenge') {
  const ctx = await browser.newContext({
    viewport: { width: 1000, height: 1400 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('console', (m: any) => {
    if (m.type() === 'error') errors.push(`[console.error] ${m.text()}`);
  });
  page.on('pageerror', (e: any) => errors.push(`[pageerror] ${e.message}`));

  const url = `${BASE}/?page=${pageType}&export=1`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.screenshot({ path: `${outDir}/${pageType}.png`, fullPage: true });
  await ctx.close();
  console.log(`✓ ${pageType}: height=${height}px, errors=${errors.length}`);
  errors.forEach((e) => console.log('   ' + e));
  return { pageType, height, errors };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  await shoot(browser, 'demo');
  await shoot(browser, 'challenge');
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
