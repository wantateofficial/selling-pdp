interface DotPatternProps {
  className?: string;
}

/** 도트 배경 패턴 (장식용, 절대배치로 섹션 뒤에 깔림) */
export function DotPattern({ className = '' }: DotPatternProps) {
  return <div aria-hidden className={`sc-dotbg pointer-events-none absolute inset-0 ${className}`} />;
}
