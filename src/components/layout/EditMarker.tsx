import { useState } from 'react';

interface EditMarkerProps {
  sectionKey: string;
  sectionTitle: string;
}

/**
 * 섹션별 수정 요청 버튼.
 * 미리보기에서만 보이며(.no-export), export 캡처 시 CSS로 숨겨진다.
 * 클릭하면 해당 섹션 수정 프롬프트를 클립보드에 복사하고, "복사됨" 피드백을 띄운다.
 */
export function EditMarker({ sectionKey, sectionTitle }: EditMarkerProps) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const prompt = `아래 섹션은 쇼핑숏폼 상세페이지의 "${sectionTitle}" 섹션입니다.\n\n목표:\n- 초보자가 바로 이해할 수 있게 만들기\n- 신청 전환을 높이기\n- 과장된 수익 보장 표현은 피하기\n\n요청:\n이 섹션을 더 강한 후킹 문구로 바꿔줘. 단, 핵심 사실(날짜/가격/조건)은 유지해줘.`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else {
        // 비보안 컨텍스트 폴백
        const ta = document.createElement('textarea');
        ta.value = prompt;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 차단 환경: 최소한 시각 피드백
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-section={sectionKey}
      className={`no-export absolute right-3 top-3 z-10 rounded-md border px-2 py-1 text-xs font-semibold shadow-sm transition-colors ${
        copied
          ? 'border-sc-mint bg-sc-mint text-white'
          : 'border-sc-blue bg-white/90 text-sc-blue hover:bg-sc-blue hover:text-white'
      }`}
    >
      {copied ? '✓ 복사됨' : '✎ 수정 요청'}
    </button>
  );
}
