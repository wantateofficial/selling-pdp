import type { CourseData, CurriculumItem, FaqItem, PageType } from '../types';
import { parseMarkdown, type ParsedSection } from './parseMarkdown';

/** FAQ 파싱: `### 질문` + 답변 라인 (구버전: `- 질문`만 있는 경우 답변 빈 문자열) */
function parseFaq(section?: ParsedSection): FaqItem[] {
  if (!section) return [];
  if (section.subsections.length) {
    return section.subsections.map((s) => ({ q: s.label, a: s.lines.join(' ') }));
  }
  return section.bullets.map((q) => ({ q, a: '' }));
}

/** "강의일: 7월 9일" → { key:'강의일', value:'7월 9일' } 형태로 분해 */
function splitKeyValue(bullet: string): { key: string; value: string } | null {
  const idx = bullet.indexOf(':');
  if (idx === -1) return null;
  return { key: bullet.slice(0, idx).trim(), value: bullet.slice(idx + 1).trim() };
}

function bullets(section?: ParsedSection): string[] {
  return section ? section.bullets : [];
}

function firstParagraph(section?: ParsedSection): string {
  if (!section) return '';
  if (section.paragraphs.length) return section.paragraphs.join(' ');
  if (section.bullets.length) return section.bullets.join(' ');
  return '';
}

/**
 * 파싱된 MD를 마케팅 구조(CourseData)로 정규화한다.
 * 한글 섹션명 → 표준 필드 매핑이 핵심.
 */
export function normalizeCourseData(raw: string, slug: string): CourseData {
  const { title, sections } = parseMarkdown(raw);
  const get = (name: string) => sections[name];

  // 페이지 타입
  const typeText = (get('페이지 타입')?.paragraphs[0] || 'demo').toLowerCase();
  const pageType: PageType = typeText.includes('challenge') ? 'challenge' : 'demo';

  // 기본 정보 (라벨:값)
  const basics: CourseData['basics'] = { cta: '신청하기' };
  for (const b of bullets(get('기본 정보'))) {
    const kv = splitKeyValue(b);
    if (!kv) continue;
    switch (kv.key) {
      case '강의일':
      case '시작일':
        basics.date = kv.value;
        break;
      case '시간':
        basics.time = kv.value;
        break;
      case '진행 방식':
      case '방식':
        basics.format = kv.value;
        break;
      case '가격':
        basics.price = kv.value;
        break;
      case '신청 방식':
        basics.method = kv.value;
        break;
      case '기간':
        basics.duration = kv.value;
        break;
      case '운영 구조':
        basics.groupStructure = kv.value;
        break;
      case 'CTA':
        basics.cta = kv.value;
        break;
    }
  }

  // 커리큘럼: demo는 불릿 리스트, challenge는 ### 주차 서브섹션(테마·일시·주제·제공)
  const curriculum: CurriculumItem[] = [];
  const curSection = get('무료 데모에서 배우는 것') || get('4주 커리큘럼');
  const DATE_RE = /\d+\s*(월|일|주차|시)/;
  if (curSection) {
    if (curSection.subsections.length) {
      for (const sub of curSection.subsections) {
        // 라벨 "1주차 · 쇼핑숏폼 준비운동" → label + title
        const [labelPart, ...titleParts] = sub.label.split('·');
        const topics: string[] = [];
        const provided: string[] = [];
        let date: string | undefined;
        for (const line of sub.lines) {
          if (line.startsWith('[제공]')) provided.push(line.replace('[제공]', '').trim());
          else if (!date && DATE_RE.test(line) && line.length < 30) date = line;
          else topics.push(line);
        }
        curriculum.push({
          label: labelPart.trim(),
          title: titleParts.join('·').trim() || undefined,
          date,
          topics,
          provided,
        });
      }
    } else {
      for (const b of curSection.bullets) curriculum.push({ text: b, topics: [], provided: [] });
    }
  }

  // 링크 (신청폼/카카오톡) — 없으면 placeholder '#'
  const links = { apply: '#', kakao: '#' };
  for (const b of bullets(get('링크'))) {
    const kv = splitKeyValue(b);
    if (!kv) continue;
    if (kv.key === '신청폼') links.apply = kv.value || '#';
    if (kv.key === '카카오톡') links.kakao = kv.value || '#';
  }

  return {
    pageType,
    slug,
    title,
    oneLiner: firstParagraph(get('한 줄 소개')),
    basics,
    targets: bullets(get('타깃 수강생')),
    problems: bullets(get('고객 문제')),
    curriculum,
    benefits: bullets(get('제공 자료')),
    usp: bullets(get('핵심 USP')),
    evaluation: bullets(get('평가 구조')),
    refund: firstParagraph(get('환급 구조')),
    trust: bullets(get('신뢰 요소')),
    recommendedFor: bullets(get('추천 대상')),
    notRecommendedFor: bullets(get('비추천 대상')),
    howToJoin: bullets(get('신청 방법')),
    faq: parseFaq(get('FAQ')),
    notice: bullets(get('유의사항')),
    links,
  };
}
