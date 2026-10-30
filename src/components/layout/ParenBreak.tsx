/**
 * 끝에 붙은 괄호 설명을 다음 줄로 내린다.
 * "숏폼 시청 경험률 (2022년 56.5% → 2024년 82.7%)" → "숏폼 시청 경험률" / "(2022년 …)"
 * 괄호가 문장 끝에 있지 않으면 그대로 둔다.
 */
export function ParenBreak({ text, subClassName = 'opacity-70' }: { text: string; subClassName?: string }) {
  const m = text.match(/^(.*\S)\s*(\([^()]*\))$/);
  if (!m) return <>{text}</>;
  return (
    <>
      {m[1]}
      <span className={`block ${subClassName}`}>{m[2]}</span>
    </>
  );
}
