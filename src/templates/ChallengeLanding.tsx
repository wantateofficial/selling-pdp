import type { CourseData } from '../types';
import { PageShell } from '../components/layout/PageShell';
import { StickyCTA } from '../components/layout/StickyCTA';
import { HeroSection } from '../components/sections/HeroSection';
import { StatProofSection } from '../components/sections/StatProofSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { TrackRecordSection } from '../components/sections/TrackRecordSection';
import { BenefitSection } from '../components/sections/BenefitSection';
import { CurriculumSection } from '../components/sections/CurriculumSection';
import { ProofCaptureSection } from '../components/sections/ProofCaptureSection';
import { PricingSection } from '../components/sections/PricingSection';
import { RewardSection } from '../components/sections/RewardSection';
import { EvaluationSection } from '../components/sections/EvaluationSection';
import { RefundSection } from '../components/sections/RefundSection';
import { TargetSection } from '../components/sections/TargetSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { Footer } from '../components/layout/Footer';

interface Props {
  data: CourseData;
  fixedWidth?: boolean;
}

/** 유료 4주 챌린지 상세페이지 — 마스터 레이아웃(팀·숫자·증거 설득 구조) */
export function ChallengeLanding({ data, fixedWidth }: Props) {
  return (
    <PageShell fixedWidth={fixedWidth}>
      <HeroSection data={data} />
      <StatProofSection />
      <ProblemSection data={data} />
      <TrackRecordSection />
      <BenefitSection
        sectionKey="mechanism"
        eyebrow="HOW IT WORKS"
        title="4주 챌린지는 이렇게 작동해요"
        items={data.usp}
        robot={null}
        bg="cream"
      />
      <CurriculumSection data={data} />
      <ProofCaptureSection />
      <BenefitSection
        sectionKey="what-you-build"
        eyebrow="WHAT YOU BUILD"
        title="4주 뒤 남는 것"
        items={data.benefits}
        robot="cheer"
        bg="white"
      />
      <PricingSection />
      <RewardSection />
      <EvaluationSection />
      <RefundSection />
      <TargetSection items={data.recommendedFor.length ? data.recommendedFor : data.targets} />
      <FAQSection data={data} />
      <FinalCTASection data={data} />
      <Footer />
      <StickyCTA data={data} />
    </PageShell>
  );
}
