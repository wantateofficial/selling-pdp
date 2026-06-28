interface LogoProps {
  className?: string;
}

/** 새러데이클럽 텍스트 로고 (SC 픽셀 배지 + 워드마크) */
export function SaturdayClubLogo({ className = '' }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-md border-2 border-sc-outline bg-sc-mint text-[13px] font-extrabold text-sc-outline">
        SC
      </span>
      <span className="text-base font-bold tracking-tight text-sc-outline">새러데이클럽</span>
    </div>
  );
}
