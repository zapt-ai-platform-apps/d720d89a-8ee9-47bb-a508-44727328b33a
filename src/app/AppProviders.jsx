import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/components/AuthProvider';
import { ToastProvider } from '@/modules/core/components/ToastProvider';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}