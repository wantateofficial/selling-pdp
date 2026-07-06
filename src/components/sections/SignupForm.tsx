import { useState } from 'react';
import type { CourseData } from '../../types';

/**
 * 무료 데모 신청 폼 — 회원가입 없이 이름·연락처만 받아 접수한다.
 * 접수 흐름: 폼 제출 → VITE_SIGNUP_ENDPOINT(구글 Apps Script 웹앱=DB)로 전송 →
 *            성공 시 카카오톡 단톡방 입장 버튼 노출.
 * 엔드포인트가 없으면(개발/미설정) 로컬에서 성공 처리해 흐름만 확인한다.
 */
const ENDPOINT = import.meta.env.VITE_SIGNUP_ENDPOINT as string | undefined;

interface Props {
  data: CourseData;
}

/** 010-1234-5678 / 01012345678 등 허용. 숫자 10~11자리면 통과. */
function isValidPhone(v: string): boolean {
  return /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim());
}

export function SignupForm({ data }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const kakao = data.links.kakao && data.links.kakao !== '#' ? data.links.kakao : '';
  const canSubmit = name.trim().length >= 2 && isValidPhone(phone) && state !== 'sending';

  const submit = async () => {
    if (!canSubmit) return;
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      page: new URLSearchParams(window.location.search).get('page') || 'demo',
      course: data.title,
      date: `${data.basics.date ?? ''} ${data.basics.time ?? ''}`.trim(),
      url: window.location.href,
      ts: new Date().toISOString(),
      ua: navigator.userAgent,
    };

    setState('sending');
    try {
      if (ENDPOINT) {
        // Apps Script 웹앱은 CORS 응답을 주지 않으므로 no-cors fire-and-forget.
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      }
      setState('done');
    } catch {
      setState('error');
    }
  };

  const inputBase =
    'w-full rounded-xl border-2 border-sc-outline bg-white px-4 py-3.5 text-base text-sc-outline outline-none placeholder:text-sc-outline/40 focus:border-sc-blue';

  if (state === 'done') {
    return (
      <div className="w-full max-w-[440px] rounded-2xl border-2 border-sc-outline bg-white p-7 text-center text-sc-outline shadow-pixel">
        <p className="text-3xl">🎉</p>
        <p className="mt-2 text-xl font-extrabold">무료 신청이 접수됐어요!</p>
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
          <p className="mt-2 text-[11px] text-sc-outline/40">(단톡방 링크 준비 중 — 곧 안내드려요)</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] rounded-2xl border-2 border-sc-outline bg-white p-6 text-left shadow-pixel sm:p-7">
      <p className="mb-1 text-lg font-extrabold text-sc-outline">무료 데모강의 신청</p>
      <p className="mb-5 text-sm text-sc-outline/60">
        회원가입 없이 이름과 연락처만 남기면 접수돼요.
      </p>

      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          autoComplete="name"
          className={inputBase}
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="연락처 (예: 010-1234-5678)"
          inputMode="tel"
          autoComplete="tel"
          className={inputBase}
        />
      </div>

      {state === 'error' && (
        <p className="mt-3 text-xs font-semibold text-red-500">
          접수에 실패했어요. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={!canSubmit}
        className="mt-4 w-full rounded-xl border-2 border-sc-outline bg-sc-blue py-4 text-lg font-extrabold text-white shadow-pixel transition-all duration-150 hover:-translate-y-0.5 hover:bg-sc-blue-dark active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
