import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { normalizeCourseData } from '../src/parser/normalizeCourseData';
import type { CourseData, PageType } from '../src/types';

/**
 * 섹션별 수정 요청 프롬프트를 생성한다 (PRD §10).
 * 사용: tsx scripts/generate-prompts.ts [demo|challenge]  (인자 없으면 둘 다)
 * 출력: output/{slug}/edit-prompts.md
 */
const SOURCES: Record<PageType, string> = {
  demo: 'content/shopping-shorts-demo.md',
  challenge: 'content/shopping-shorts-challenge.md',
};

// 페이지 타입별 섹션 정의: [섹션ID, 표시명, 현재 내용 요약 함수]
function sectionsFor(d: CourseData): { id: string; name: string; summary: string }[] {
  const join = (arr: string[]) => (arr.length ? arr.join(' / ') : '(비어 있음)');
  const common = [
    { id: '01-hero', name: 'Hero', summary: `${d.title} — ${d.oneLiner}` },
    { id: 'problem', name: 'Problem', summary: join(d.problems) },
    { id: 'curriculum', name: 'Curriculum', summary: join(d.curriculum.map((c) => (c.label ? `${c.label} ${c.title ?? ''}`.trim() : c.text ?? ''))) },
    { id: 'faq', name: 'FAQ', summary: join(d.faq.map((f) => f.q)) },
    { id: 'final-cta', name: 'Final CTA', summary: d.basics.cta },
  ];
  if (d.pageType === 'demo') {
    return [
      common[0],
      { id: 'why-now', name: 'Why Now', summary: join(d.problems) },
      { id: 'beginner-promise', name: 'Beginner Promise', summary: join(d.usp) },
      common[1],
      common[2],
      { id: 'benefit', name: 'What You Get', summary: join(d.benefits) },
      { id: 'trust', name: 'Trust', summary: join(d.trust) },
      { id: 'target', name: 'Who This Is For', summary: join(d.recommendedFor) },
      { id: 'not-for', name: 'Who This Is Not For', summary: join(d.notRecommendedFor) },
      { id: 'how-to-join', name: 'How To Join', summary: join(d.howToJoin) },
      common[3],
      common[4],
    ];
  }
  return [
    common[0],
    common[1],
    { id: 'mechanism', name: 'Mechanism', summary: join(d.usp) },
    common[2],
    { id: 'evaluation', name: 'Evaluation', summary: join(d.evaluation) },
    { id: 'refund', name: 'Refund', summary: d.refund },
    { id: 'benefit', name: 'What You Build', summary: join(d.benefits) },
    { id: 'target', name: 'Who This Is For', summary: join(d.recommendedFor) },
    common[3],
    common[4],
  ];
}

function promptFor(s: { name: string; summary: string }, title: string): string {
  return [
    `### ${s.name}`,
    '',
    `**현재 내용**: ${s.summary}`,
    '',
    '**수정 요청 프롬프트** (복사해서 사용):',
    '```',
    `"${title}" 상세페이지의 [${s.name}] 섹션을 수정해줘.`,
    `- 현재 내용: ${s.summary}`,
    '- 바꾸고 싶은 점: (여기에 적기 — 예: 카피 톤, 강조 포인트, 추가/삭제할 항목)',
    '- 유지할 점: 브랜드 컬러/마스코트 배치, CTA 문구',
    '```',
    '',
  ].join('\n');
}

async function run(pageType: PageType) {
  const slug = pageType === 'challenge' ? 'shopping-shorts-challenge' : 'shopping-shorts-demo';
  const raw = await readFile(resolve(SOURCES[pageType]), 'utf-8');
  const data = normalizeCourseData(raw, slug);
  const sections = sectionsFor(data);

  const md = [
    `# 섹션별 수정 요청 프롬프트 — ${data.title}`,
    '',
    `> 페이지: \`${pageType}\` · 섹션 ${sections.length}개`,
    '> 각 섹션의 프롬프트를 복사해 수정 요청에 사용하세요.',
    '',
    ...sections.map((s) => promptFor(s, data.title)),
  ].join('\n');

  const outDir = resolve(`output/${slug}`);
  await mkdir(outDir, { recursive: true });
  await writeFile(`${outDir}/edit-prompts.md`, md, 'utf-8');
  console.log(`✓ ${pageType}: ${sections.length} sections → output/${slug}/edit-prompts.md`);
}

async function main() {
  const arg = process.argv[2] as PageType | undefined;
  const targets: PageType[] = arg ? [arg] : ['demo', 'challenge'];
  for (const t of targets) await run(t);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
