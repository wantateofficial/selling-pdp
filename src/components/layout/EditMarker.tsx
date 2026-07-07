import { useState } from 'react';

interface EditMarkerProps {
  sectionKey: string;
  sectionTitle: string;
}

/**
 * 섹션별 "수정 요청" — 클릭 시 모달을 열고, 수정 의견을 DB(구글시트 등)로 전송한다.
 * 전송 대상: import.meta.env.VITE_FEEDBACK_ENDPOINT (Apps Script 웹앱 URL 등).
 * 엔드포인트가 없으면 메일 초안(mailto)로 폴백한다.
 * 미리보기 전용(.no-export) — export 캡처 시 숨김.
 *
 * 노출 정책: 기본 ON(스테이징·개발·미리보기). 프로덕션(라이브)에서만 OFF.
 *   → 빌드 시 VITE_SHOW_EDIT_REQUEST='false' 이면 아예 렌더하지 않는다.
 *   프로덕션 빌드는 .env.production 에서 false로 고정(§netlify.toml 컨텍스트별 빌드).
 */
const ENDPOINT = import.meta.env.VITE_FEEDBACK_ENDPOINT as string | undefined;
const SHOW_EDIT = import.meta.env.VITE_SHOW_EDIT_REQUEST !== 'false';

export function EditMarker({ sectionKey, sectionTitle }: EditMarkerProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const page = new URLSearchParams(window.location.search).get('page') || 'demo';

  const submit = async () => {
    if (!msg.trim()) return;
    const payload = {
      section: sectionKey,
      sectionTitle,
      page,
      name: name.trim(),
      message: msg.trim(),
      url: window.location.href,
      ts: new Date().toISOString(),
      ua: navigator.userAgent,
    };

    if (!ENDPOINT) {
      // 폴백: 메일 초안
      const body = encodeURIComponent(
        `[수정요청] ${sectionTitle} (${page})\n\n요청자: ${payload.name || '-'}\n내용:\n${payload.message}\n\n(${payload.url})`,
      );
      window.location.href = `mailto:?subject=${encodeURIComponent(`[상세페이지 수정요청] ${sectionTitle}`)}&body=${body}`;
      setState('done');
      return;
    }

    setState('sending');
    try {
      // Apps Script 웹앱은 CORS 응답을 주지 않으므로 no-cors로 fire-and-forget.
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setState('done');
      setMsg('');
      setName('');
    } catch {
      setState('error');
    }
  };

  const close = () => {
    setOpen(false);
    setState('idle');
  };

  // 라이브(프로덕션)에서는 수정요청 UI를 렌더하지 않는다. (훅 호출 이후에 가드 — 훅 순서 유지)
  if (!SHOW_EDIT) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-section={sectionKey}
        className="no-export absolute right-3 top-3 z-10 rounded-md border border-sc-blue bg-white/90 px-2 py-1 text-xs font-semibold text-sc-blue shadow-sm transition-colors hover:bg-sc-blue hover:text-white"
      >
        ✎ 수정 요청
      </button>

      {open && (
        <div
          className="no-export fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {state === 'done' ? (
              <div className="text-center">
                <p className="text-2xl">✅</p>
                <p className="mt-2 font-bold">수정 요청이 전달됐어요</p>
                <p className="mt-1 text-sm text-sc-outline/60">
                  검토 후 반영하겠습니다. 감사합니다!
                </p>
                <button
                  onClick={close}
                  className="mt-5 rounded-lg bg-sc-blue px-5 py-2 text-sm font-bold text-white"
                >
                  닫기
                </button>
              </div>
            ) : (
              <>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-sc-blue">수정 요청</span>
                  <button onClick={close} className="text-sc-outline/40 hover:text-sc-outline">
                    ✕
                  </button>
                </div>
                <p className="mb-4 text-lg font-extrabold leading-snug">{sectionTitle} 섹션</p>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름 / 역할 (선택)"
                  className="mb-2 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-sc-blue"
                />
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="어떻게 바꾸면 좋을지 적어주세요. (예: 이 문구를 ~로, 사진 교체, 순서 변경 등)"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-sc-blue"
                />

                {state === 'error' && (
                  <p className="mt-2 text-xs font-semibold text-red-500">
                    전송에 실패했어요. 잠시 후 다시 시도해 주세요.
                  </p>
                )}

                <button
                  onClick={submit}
                  disabled={!msg.trim() || state === 'sending'}
                  className="mt-4 w-full rounded-lg bg-sc-blue py-3 text-sm font-extrabold text-white transition-opacity disabled:opacity-40"
                >
                  {state === 'sending' ? '전송 중…' : '수정 요청 보내기'}
                </button>
                {!ENDPOINT && (
                  <p className="mt-2 text-center text-[11px] text-sc-outline/40">
                    (저장 서버 미설정, 메일 초안으로 열립니다)
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
