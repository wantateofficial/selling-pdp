import { useRef, useState } from 'react';
import type { CourseData } from '../../types';
import { resolveSignupEndpoint } from '../../data/signup';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * 무료 데모 신청 폼 — 회원가입 없이 이름·연락처만 받아 접수한다.
 * 접수 흐름: 폼 제출 → 신청 저장 주소(src/data/signup.ts, 구글 Apps Script 웹앱=DB)로 전송 →
 *            성공 시 카카오톡 단톡방 입장 버튼 노출.
 * 엔드포인트가 없으면(개발/미설정) 로컬에서 성공 처리해 흐름만 확인한다.
 *
 * Meta 픽셀 Lead: 백엔드(signup.gs)가 시트 저장 후 돌려주는 { ok: true } 를 읽었을 때만 한 번 보낸다.
 * 응답을 읽을 수 없거나 ok 가 아니면 보내지 않는다. (픽셀 기본 코드는 index.html)
 */
interface Props {
  data: CourseData;
  /** 폼 위치. Clarity 이벤트 이름(signup_hero / signup_bottom)에 쓰인다. */
  placement?: 'hero' | 'bottom';
  /** true 면 제목과 테두리 상자 없이 입력칸과 버튼만 보여준다 (첫 화면용) */
  compact?: boolean;
  /** true 면 버튼을 처음부터 진한 색으로 두고, 빈칸으로 누르면 안내 문구를 띄운다 (2기 데모 전용) */
  alwaysActive?: boolean;
}

/** 010-1234-5678 / 01012345678 등 허용. 숫자 10~11자리면 통과. */
function isValidPhone(v: string): boolean {
  return /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim());
}

export function SignupForm({ data, placement = 'bottom', compact = false, alwaysActive = false }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [hint, setHint] = useState(false);
  const leadSent = useRef(false);
  const inFlight = useRef(false); // 빠른 연속 클릭으로 같은 신청이 두 번 저장되지 않게

  const ENDPOINT = resolveSignupEndpoint(data.links.signupEndpoint);
  const kakao = data.links.kakao && data.links.kakao !== '#' ? data.links.kakao : '';
  const canSubmit = name.trim().length >= 2 && isValidPhone(phone) && state !== 'sending';

  const submit = async () => {
    if (!canSubmit || inFlight.current) {
      if (state !== 'sending') setHint(true);
      return;
    }
    setHint(false);
    inFlight.current = true;
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      page: new URLSearchParams(window.location.search).get('page') || 'demo',
      course: data.title,
      // 값이 있으면 백엔드(signup.gs)가 "{값} 신청자" 탭에 따로 쌓는다.
      cohort: data.basics.signupTab ?? data.basics.cohort ?? '',
      date: `${data.basics.date ?? ''} ${data.basics.time ?? ''}`.trim(),
      url: window.location.href,
      ts: new Date().toISOString(),
      ua: navigator.userAgent,
    };

    setState('sending');
    try {
      if (!ENDPOINT) {
        setState('done'); // 개발/미설정: 저장하지 않았으므로 Lead 도 보내지 않는다
        return;
      }
      // text/plain 단순 요청이라 preflight 없이 가고, Apps Script 응답(googleusercontent 리다이렉트)은 CORS 로 읽힌다.
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (result?.ok === false) {
        setState('error');
        return;
      }
      if (result?.ok === true && !leadSent.current) {
        leadSent.current = true;
        window.fbq?.('track', 'Lead', { content_name: payload.page });
        window.clarity?.('event', placement === 'hero' ? 'signup_hero' : 'signup_bottom');
      }
      // 응답 형식이 예상과 달라도(예전 배포본) 요청은 들어갔으므로 화면은 접수 완료로 둔다. Lead 는 보내지 않음.
      setState('done');
    } catch {
      setState('error');
    } finally {
      inFlight.current = false;
    }
  };

  const inputBase =
    'w-full rounded-xl border-2 border-sc-outline bg-white px-4 py-3.5 text-base text-sc-outline outline-none placeholder:text-sc-outline/40 focus:border-sc-blue';

  if (state === 'done') {
    return (
      <div className="w-full max-w-[440px] rounded-2xl border-2 border-sc-outline bg-white p-7 text-center text-sc-outline shadow-pixel">
        <p className="text-xl font-extrabold">무료 신청이 접수됐어요</p>
        <p className="mt-2 text-sm text-sc-outline/70">
          아래 단톡방에 들어오시면 강의 링크와 준비물을 안내해 드려요.
          <br />꼭 입장해 주셔야 참여하실 수 있습니다.
        </p>
        <a
          href={kakao || '#'}
          target={kakao ? '_blank' : undefined}
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border-2 border-sc-outline bg-sc-orange px-6 py-4 text-lg font-extrabold text-sc-outline shadow-pixel transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
        >
          카카오톡 단톡방 입장하기 →
        </a>
        {!kakao && (
          <p className="mt-2 text-[11px] text-sc-outline/40">(단톡방 링크 준비 중이에요. 곧 안내드릴게요)</p>
        )}
      </div>
    );
  }

  return (
    <div
      className={
        compact
          ? 'w-full max-w-[440px] text-left'
          : 'w-full max-w-[440px] rounded-2xl border-2 border-sc-outline bg-white p-6 text-left shadow-pixel sm:p-7'
      }
    >
      {!compact && (
        <>
          <p className="mb-1 text-lg font-extrabold text-sc-outline">무료 데모강의 신청</p>
          <p className="mb-5 text-sm text-sc-outline/60">
            회원가입 없이 이름과 연락처만 남기면 접수돼요.
          </p>
        </>
      )}

      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          autoComplete="name"
          data-clarity-mask="true"
          className={inputBase}
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="연락처 (예: 010-1234-5678)"
          inputMode="tel"
          autoComplete="tel"
          data-clarity-mask="true"
          className={inputBase}
        />
      </div>

      {state === 'error' && (
        <p className="mt-3 text-xs font-semibold text-red-500">
          접수에 실패했어요. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      {alwaysActive && hint && !canSubmit && (
        <p className="mt-3 text-xs font-semibold text-red-500">
          {name.trim().length < 2 ? '이름을 입력해 주세요.' : '연락처를 010-1234-5678 형식으로 입력해 주세요.'}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={alwaysActive ? state === 'sending' : !canSubmit}
        className={`mt-4 w-full rounded-xl border-2 border-sc-outline ${alwaysActive ? 'bg-[#41649b] hover:bg-[#365584]' : 'bg-sc-blue hover:bg-sc-blue-dark'} py-4 text-lg font-extrabold text-white shadow-pixel transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
      >
        {state === 'sending' ? '접수 중…' : '회원가입 없이 무료 신청하기'}
      </button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-sc-outline/50">
        신청 시{' '}
        <a href="#policy-terms" className="underline underline-offset-2 hover:text-sc-blue">
          서비스이용약관
        </a>{' '}
        및{' '}
        <a href="#policy-privacy" className="underline underline-offset-2 hover:text-sc-blue">
          개인정보처리방침
        </a>
        에 동의합니다.
      </p>
    </div>
  );
}
