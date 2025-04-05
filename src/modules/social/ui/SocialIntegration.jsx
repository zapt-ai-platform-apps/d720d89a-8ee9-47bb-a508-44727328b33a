import React from 'react';
import { useParams } from 'react-router-dom';
import { MainNavigation } from '@/modules/core/ui/MainNavigation';

export function SocialIntegration() {
  const { websiteId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Integration</h1>
          <p className="mt-4 text-gray-500">
            Manage social integrations for website ID: {websiteId || 'None'}
          </p>
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <p className="text-center text-gray-500">Social integration functionality is being implemented...</p>
          </div>
        </div>
      </main>
    </div>
  );
}