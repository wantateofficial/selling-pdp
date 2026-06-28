import { useEffect, useState } from 'react';

/**
 * 콘텐츠 보호 — 우클릭·드래그·개발자도구 단축키 억제.
 *
 * ⚠️ 웹은 OS/하드웨어 스크린샷을 100% 막을 수 없다. 가벼운 억제 장치일 뿐이다.
 * 이전의 "창 포커스 잃으면 화면 가림(보호된 콘텐츠 오버레이)"은 불편해서 제거했다.
 *
 * 개발자모드: 보호를 완전히 해제한다(작업 편의). 켜는 방법(아무거나):
 *   - 주소 끝에 ?dev=1  (끄기: ?dev=0)
 *   - 아무 데서나 "devmode" 또는 "개발자모드" 라고 타이핑
 *   상태는 localStorage 에 저장된다.
 * export(이미지 캡처) 모드에서는 항상 비활성화.
 */
const KEY = 'scDevMode';

function readDev(): boolean {
  try {
    const u = new URLSearchParams(window.location.search).get('dev');
    if (u === '1') localStorage.setItem(KEY, '1');
    if (u === '0') localStorage.removeItem(KEY);
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function ContentProtection({ enabled = true }: { enabled?: boolean }) {
  const [dev, setDev] = useState<boolean>(() => readDev());

  // 매직 워드 감지 ("devmode" / "개발자모드") → 개발자모드 토글
  useEffect(() => {
    let buf = '';
    const toggle = () => {
      setDev((d) => {
        const next = !d;
        try {
          if (next) localStorage.setItem(KEY, '1');
          else localStorage.removeItem(KEY);
        } catch {
          /* noop */
        }
        return next;
      });
    };
    const test = () => {
      if (buf.toLowerCase().includes('devmode') || buf.includes('개발자모드')) {
        buf = '';
        toggle();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key && e.key.length === 1) {
        buf = (buf + e.key).slice(-20);
        test();
      }
    };
    const onComp = (e: CompositionEvent) => {
      if (e.data) {
        buf = (buf + e.data).slice(-20);
        test();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('compositionend', onComp);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('compositionend', onComp);
    };
  }, []);

  // 보호 리스너 (개발자모드/Export 시 비활성)
  useEffect(() => {
    const active = enabled && !dev;
    document.body.classList.toggle('sc-protected', active);
    if (!active) return;

    const block = (e: Event) => e.preventDefault();
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key;
      const ctrl = e.ctrlKey || e.metaKey;
      if (
        k === 'F12' ||
        (ctrl && e.shiftKey && ['I', 'J', 'C'].includes(k.toUpperCase())) ||
        (ctrl && ['U', 'S'].includes(k.toUpperCase()))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [enabled, dev]);

  if (!dev) return null;
  return (
    <div className="no-export fixed bottom-2 left-2 z-[9999] rounded-md bg-sc-mint px-2 py-1 text-[11px] font-bold text-white shadow">
      개발자모드 ON · 보호 해제됨 ("devmode" 다시 입력 시 복귀)
    </div>
  );
}
