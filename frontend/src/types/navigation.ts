export type NavigationStep = 'auth' | 'options' | 'criteria';

export interface NavigationProps {
  currentStep: NavigationStep;
  onNavigate: (step: NavigationStep) => void;
}