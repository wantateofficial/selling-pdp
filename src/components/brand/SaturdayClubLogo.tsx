import { BRAND } from '../../brand/identity';

interface LogoProps {
  className?: string;
}

/** 브랜드 텍스트 로고 (픽셀 배지 + 워드마크). 배지·표시명은 BRAND에서 상속 → 리브랜딩 시 identity.ts만 수정. */
export function SaturdayClubLogo({ className = '' }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-md border-2 border-sc-outline bg-sc-mint text-[13px] font-extrabold text-sc-outline">
        {BRAND.badge}
      </span>
      <span className="text-base font-bold tracking-tight text-sc-outline">{BRAND.name}</span>
    </div>
  );
}
