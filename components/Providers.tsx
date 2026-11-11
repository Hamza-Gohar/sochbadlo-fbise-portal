'use client';

import React, { ReactNode } from 'react';
import { PortalProvider, usePortal } from '../contexts/PortalContext';
import StudyDashboard from './StudyDashboard';

function StudyDashboardModal() {
  const { isDashboardOpen, closeDashboard, dashboardTab } = usePortal();
  return (
    <StudyDashboard
      isOpen={isDashboardOpen}
      onClose={closeDashboard}
      initialTab={dashboardTab}
    />
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PortalProvider>
      {children}
      <StudyDashboardModal />
    </PortalProvider>
  );
}
