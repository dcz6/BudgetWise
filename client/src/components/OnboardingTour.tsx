import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Status, Step } from 'react-joyride';
import { useLocation } from 'wouter';

const steps: Step[] = [
  {
    target: 'body',
    content: 'Welcome to BudgetWise! Let us show you around our powerful budgeting platform.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.budget-overview',
    content: 'Track your spending across different categories and see your budget progress at a glance.',
    placement: 'bottom',
  },
  {
    target: '.monthly-summary',
    content: 'View your monthly spending trends and track your progress towards financial goals.',
    placement: 'left',
  },
  {
    target: '.command-menu-btn',
    content: 'Use our command menu (⌘K/Ctrl+K) for quick navigation and actions throughout the app.',
    placement: 'bottom',
  },
];

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem('budgetwise-tour-completed');
    if (!hasSeenTour) {
      setIsOpen(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if ([Status.FINISHED, Status.SKIPPED].includes(status)) {
      setIsOpen(false);
      localStorage.setItem('budgetwise-tour-completed', 'true');
      
      // Redirect to dashboard after tour if not already there
      setLocation('/dashboard');
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      hideBackButton
      showProgress
      showSkipButton
      steps={steps}
      run={isOpen}
      styles={{
        options: {
          primaryColor: 'hsl(142.1 76.2% 36.3%)',
          textColor: 'hsl(240 10% 3.9%)',
          backgroundColor: 'hsl(0 0% 100%)',
          arrowColor: 'hsl(0 0% 100%)',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
        tooltip: {
          padding: '1rem',
          borderRadius: '0.5rem',
        },
        buttonNext: {
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          borderRadius: '0.25rem',
        },
        buttonBack: {
          marginRight: '0.5rem',
        },
      }}
    />
  );
}
