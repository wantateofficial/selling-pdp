import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';

const PROMISES = [
  '얼굴을 드러내지 않아도 시작할 수 있어요.',
  '제품을 직접 촬영하지 않아도 됩니다.',
  '인플루언서가 아니어도, 팔로워가 없어도 괜찮아요.',
  '직장인·육아맘처럼 부업이 처음인 분도 따라올 수 있어요.',
  '복잡한 기술보다 시작하는 순서부터 알려드립니다.',
];

/** Section 03. Beginner Promise — 초보자 진입장벽 제거 */
export function BeginnerPromiseSection() {
  return (
    <Section
      sectionKey="beginner"
      eyebrow="BEGINNER OK"
      title="처음이어도 시작할 수 있어요"
      bg="cream"
    >
      <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <PixelRobot expression="wink" size={150} className="mx-auto" />
        <ul className="grid gap-3">
          {PROMISES.map((p) => (
            <li key={p} className="flex items-center gap-3 text-lg font-semibold">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-sc-mint text-sm font-extrabold text-sc-outline">
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
