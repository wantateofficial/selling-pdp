interface CTAButtonProps {
  label: string;
  href?: string;
  subtext?: string;
  variant?: 'primary' | 'invert';
  className?: string;
}

/** 신청 CTA 버튼. v1은 href placeholder('#') 허용. */
export function CTAButton({
  label,
  href = '#',
  subtext,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const base =
    'group inline-flex items-center justify-center rounded-xl border-2 border-sc-outline px-8 py-4 text-lg font-extrabold shadow-pixel transition-all duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-pixel-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0';
  const color =
    variant === 'primary'
      ? 'bg-sc-blue text-white hover:bg-sc-blue-dark'
      : 'bg-sc-orange text-sc-outline hover:brightness-105';

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <a href={href} className={`${base} ${color}`}>
        {label}
        <span className="ml-2 transition-transform duration-150 group-hover:translate-x-1">→</span>
      </a>
      {subtext && <p className="text-sm text-current opacity-80">{subtext}</p>}
    </div>
  );
}
