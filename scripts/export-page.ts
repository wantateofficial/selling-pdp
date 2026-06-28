import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * 상세페이지를 1000px 고정 폭 긴 이미지로 캡처한다.
 * 사용: tsx scripts/export-page.ts <demo|challenge>
 * 전제: 다른 터미널에서 `npm run dev` 가 떠 있어야 한다.
 */
const pageType = (process.argv[2] as 'demo' | 'challenge') || 'demo';
const slug =
  pageType === 'challenge' ? 'shopping-shorts-challenge' : 'shopping-shorts-demo';

const BASE = process.env.BASE_URL || 'http://localhost:5183';
const SCALE = Number(process.env.SCALE || 2); // 2 = 레티나 화질 (파일은 2000px 폭)
const outDir = resolve(`output/${slug}`);

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1000, height: 1400 },
    deviceScaleFactor: SCALE,
  });
  const page = await context.newPage();

  const url = `${BASE}/?page=${pageType}&export=1`;
  console.log(`▶ capturing ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900); // 폰트/SVG 로드 안정화

  await page.screenshot({ path: `${outDir}/full-page.png`, fullPage: true });
  await page.screenshot({
    path: `${outDir}/full-page.jpg`,
    fullPage: true,
    type: 'jpeg',
    quality: 90,
  });

  await browser.close();
  console.log(`✓ saved → ${outDir}/full-page.png, full-page.jpg`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
