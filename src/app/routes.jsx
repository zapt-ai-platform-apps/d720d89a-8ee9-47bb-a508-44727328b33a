import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/modules/auth/components/LoginPage';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { Dashboard } from '@/app/pages/Dashboard';
import { WebsiteBuilder } from '@/modules/builder/components/WebsiteBuilder';
import { DomainManager } from '@/modules/domain/components/DomainManager';
import { SocialIntegration } from '@/modules/social/components/SocialIntegration';
import { DeploymentCenter } from '@/modules/deployment/components/DeploymentCenter';
import { LandingPage } from '@/app/pages/LandingPage';
import { NotFound } from '@/app/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/builder/:websiteId?" element={
        <ProtectedRoute>
          <WebsiteBuilder />
        </ProtectedRoute>
      } />
      
      <Route path="/domains/:websiteId?" element={
        <ProtectedRoute>
          <DomainManager />
        </ProtectedRoute>
      } />
      
      <Route path="/social/:websiteId?" element={
        <ProtectedRoute>
          <SocialIntegration />
        </ProtectedRoute>
      } />
      
      <Route path="/deploy/:websiteId?" element={
        <ProtectedRoute>
          <DeploymentCenter />
        </ProtectedRoute>
      } />
      
      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}