import type { CourseData } from '../types';
import { PageShell } from '../components/layout/PageShell';
import { StickyCTA } from '../components/layout/StickyCTA';
import { HeroSection } from '../components/sections/HeroSection';
import { StatProofSection } from '../components/sections/StatProofSection';
import { WhyNowSection } from '../components/sections/WhyNowSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { TrackRecordSection } from '../components/sections/TrackRecordSection';
import { BeginnerPromiseSection } from '../components/sections/BeginnerPromiseSection';
import { CurriculumSection } from '../components/sections/CurriculumSection';
import { ProofCaptureSection } from '../components/sections/ProofCaptureSection';
import { BenefitSection } from '../components/sections/BenefitSection';
import { TrustSection } from '../components/sections/TrustSection';
import { TargetSection } from '../components/sections/TargetSection';
import { NotForSection } from '../components/sections/NotForSection';
import { HowToJoinSection } from '../components/sections/HowToJoinSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { Footer } from '../components/layout/Footer';

interface Props {
  data: CourseData;
  fixedWidth?: boolean;
}

/** 무료 데모강의 상세페이지 — 마스터 레이아웃(팀·숫자·증거 설득 구조) */
export function DemoLanding({ data, fixedWidth }: Props) {
  return (
    <PageShell fixedWidth={fixedWidth}>
      <HeroSection data={data} />
      <StatProofSection />
      <WhyNowSection />
      <ProblemSection data={data} />
      <TrackRecordSection />
      <BeginnerPromiseSection />
      <CurriculumSection data={data} />
      <ProofCaptureSection />
      <BenefitSection
        sectionKey="what-you-get"
        eyebrow="WHAT YOU GET"
        title="무료 데모 신청만으로 받는 것"
        items={data.benefits}
        robot="money"
        bg="white"
      />
      <TrustSection />
      <TargetSection items={data.recommendedFor.length ? data.recommendedFor : data.targets} />
      <NotForSection items={data.notRecommendedFor} />
      <HowToJoinSection steps={data.howToJoin} />
      <FAQSection data={data} />
      <FinalCTASection data={data} />
      <Footer />
      <StickyCTA data={data} />
    </PageShell>
  );
}
