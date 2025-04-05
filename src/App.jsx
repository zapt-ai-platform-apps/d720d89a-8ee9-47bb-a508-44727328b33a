import React from 'react';
import { AppProviders } from '@/app/AppProviders';
import { AppRoutes } from '@/app/routes';
import { api as coreApi } from '@/modules/core/api';

export default function App() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AppRoutes />
        <coreApi.ZaptBadge />
      </div>
    </AppProviders>
  );
}