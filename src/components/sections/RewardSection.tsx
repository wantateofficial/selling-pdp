import { Section } from '../layout/Section';
import { PixelRobot } from '../brand/PixelRobot';
import { REWARD } from '../../data/challenge';

/**
 * Section (challenge). Reward — 성적우수 리워드 (4주 완주자 중 상위 10%, 1인당 10만원).
 * ⚠️ '환급'이 아니라 '리워드'. 수강취소 환불과 분리 고지 + 제세공과금 공제 고지 필수.
 */
export function RewardSection() {
  return (
    <Section sectionKey="reward" eyebrow="REWARD" title="끝까지 완료한 사람에게 돌아가는 보상" bg="cream">
      <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <PixelRobot expression="money" size={150} className="mx-auto" />
        <div>
          <div className="sc-card mb-4 p-6">
            <p className="text-lg font-extrabold leading-snug text-sc-blue">{REWARD.headline}</p>
            <p className="mt-3 leading-relaxed text-sc-outline/85">{REWARD.body}</p>
            <p className="mt-3 leading-relaxed text-sc-outline/85">💸 {REWARD.payout}</p>
          </div>

          <div className="space-y-2">
            <p className="rounded-lg bg-white p-3 text-sm text-sc-outline/70">
              ⚠️ {REWARD.vsRefundNote}
            </p>
            <p className="rounded-lg bg-white p-3 text-sm text-sc-outline/70">
              ⚠️ {REWARD.taxNote}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
