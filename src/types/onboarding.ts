export type OnboardingIllustrationType = 'universe' | 'everything' | 'ready';

export interface OnboardingSlideData {
  id: string;
  title: string;
  description: string;
  illustration: OnboardingIllustrationType;
}
