import React from 'react';
import { Link } from 'react-router-dom';
import { MainNavigation } from '@/modules/core/components/MainNavigation';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <main className="flex flex-col items-center justify-center py-16">
        <div className="max-w-md text-center">
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900">Page not found</p>
          <p className="mt-4 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}