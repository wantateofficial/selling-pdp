/**
 * YAML frontmatter(`---` 블록)가 있으면 제거하고 본문만 반환한다.
 * gray-matter는 Node Buffer에 의존해 브라우저에서 크래시나므로 직접 처리한다.
 * (현재 입력 MD에는 frontmatter가 없지만, 들어와도 안전하게 흘려보낸다.)
 */
function stripFrontmatter(raw: string): string {
  const m = raw.match(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return m ? raw.slice(m[0].length) : raw;
}

export interface ParsedSection {
  /** ## 헤딩 텍스트 */
  heading: string;
  /** - 불릿 항목들 */
  bullets: string[];
  /** ### 서브헤딩 블록 (커리큘럼 등) */
  subsections: { label: string; lines: string[] }[];
  /** 불릿/서브헤딩이 아닌 본문 라인 */
  paragraphs: string[];
}

export interface ParsedMarkdown {
  title: string;
  sections: Record<string, ParsedSection>;
}

/**
 * 강의 기획 MD를 섹션 단위로 파싱한다.
 * 규칙: `# 제목`, `## 섹션`, `### 서브블록`, `- 불릿`.
 * 이 구조는 입력 포맷이 고정적이라 remark AST 대신 라인 파서가 더 안정적이다.
 */
export function parseMarkdown(raw: string): ParsedMarkdown {
  const content = stripFrontmatter(raw);
  const lines = content.split(/\r?\n/);

  let title = '';
  const sections: Record<string, ParsedSection> = {};

  let current: ParsedSection | null = null;
  let currentSub: { label: string; lines: string[] } | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      title = trimmed.slice(2).trim();
      continue;
    }

    if (trimmed.startsWith('## ')) {
      const heading = trimmed.slice(3).trim();
      current = { heading, bullets: [], subsections: [], paragraphs: [] };
      currentSub = null;
      sections[heading] = current;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (!current) continue;
      currentSub = { label: trimmed.slice(4).trim(), lines: [] };
      current.subsections.push(currentSub);
      continue;
    }

    if (!current) continue;

    if (trimmed.startsWith('- ')) {
      const item = trimmed.slice(2).trim();
      if (currentSub) currentSub.lines.push(item);
      else current.bullets.push(item);
      continue;
    }

    if (trimmed.length > 0) {
      if (currentSub) currentSub.lines.push(trimmed);
      else current.paragraphs.push(trimmed);
    }
  }

  return { title, sections };
}
