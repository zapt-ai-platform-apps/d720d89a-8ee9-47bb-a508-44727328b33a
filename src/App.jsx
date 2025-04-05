import React from 'react';
import { AppProviders } from '@/app/AppProviders';
import { AppRoutes } from '@/app/routes';
import { ZaptBadge } from '@/modules/core/components/ZaptBadge';

export default function App() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AppRoutes />
        <ZaptBadge />
      </div>
    </AppProviders>
  );
}