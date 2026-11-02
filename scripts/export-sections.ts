import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * 상세페이지를 섹션별 이미지로 나눠 캡처한다 (홍보 사이트 업로드용).
 * 사용: tsx scripts/export-sections.ts <demo|demo2|demo3|challenge|challenge2>
 * 출력: output/{slug}/sections/NN-{섹션키}.png|jpg
 * 전제: 다른 터미널에서 `npm run dev` 가 떠 있어야 한다.
 */
const SLUGS = {
  demo: 'shopping-shorts-demo',
  demo2: 'shopping-shorts-demo-0718',
  demo3: 'shopping-shorts-demo-1024',
  challenge: 'shopping-shorts-challenge',
  challenge2: 'shopping-shorts-challenge-2',
} as const;
const pageType = (process.argv[2] || 'demo') as keyof typeof SLUGS;
if (!(pageType in SLUGS)) {
  console.error(`unknown page: ${pageType} (use ${Object.keys(SLUGS).join('|')})`);
  process.exit(1);
}
const slug = SLUGS[pageType];

const BASE = process.env.BASE_URL || 'http://localhost:5183';
const SCALE = Number(process.env.SCALE || 2); // 2 = 레티나 화질 (파일은 2000px 폭)
const outDir = resolve(`output/${slug}/sections`);

async function main() {
  await rm(outDir, { recursive: true, force: true }); // 이전 회차의 남은 섹션 파일 제거
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1000, height: 1400 },
    deviceScaleFactor: SCALE,
  });
  const page = await context.newPage();

  const url = `${BASE}/?page=${pageType}&export=1`;
  console.log(`▶ capturing sections of ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900); // 폰트/SVG 로드 안정화

  // #landing-root 의 직계 자식 = 섹션들 + 푸터. 숨김(no-export) 요소는 건너뛴다.
  const blocks = page.locator('#landing-root > *');
  const count = await blocks.count();
  let n = 0;
  for (let i = 0; i < count; i++) {
    const el = blocks.nth(i);
    if (!(await el.isVisible())) continue;
    const key =
      (await el.getAttribute('data-section')) ||
      (await el.evaluate((e) => e.tagName.toLowerCase()));
    const name = `${String(++n).padStart(2, '0')}-${key}`;
    await el.screenshot({ path: `${outDir}/${name}.png` });
    await el.screenshot({ path: `${outDir}/${name}.jpg`, type: 'jpeg', quality: 90 });
    console.log(`  ✓ ${name}`);
  }

  await browser.close();
  console.log(`✓ saved ${n} sections → ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
