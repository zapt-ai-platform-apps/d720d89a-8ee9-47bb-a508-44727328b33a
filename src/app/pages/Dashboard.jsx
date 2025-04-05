import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainNavigation } from '@/modules/core/components/MainNavigation';
import { useAuthContext } from '@/modules/auth/components/AuthProvider';
import { useToast } from '@/modules/core/components/ToastProvider';
import { supabase } from '@/supabaseClient';

export function Dashboard() {
  const { user } = useAuthContext();
  const { addToast } = useToast();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/websites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch websites');
        }

        const data = await response.json();
        setWebsites(data);
      } catch (error) {
        console.error('Error fetching websites:', error);
        addToast('Failed to load websites', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWebsites();
    }
  }, [user, addToast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">My Websites</h1>
            <Link
              to="/builder"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            >
              Create New Website
            </Link>
          </div>

          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : websites.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {websites.map((website) => (
                <div
                  key={website.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {website.thumbnail_url ? (
                      <img
                        src={website.thumbnail_url}
                        alt={website.domain_name || 'Website'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {website.domain_name || 'Untitled Website'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {website.deployed ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Deployed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )}
                      {website.deployment_date && (
                        <span className="ml-2 text-xs text-gray-500">
                          Last updated: {new Date(website.deployment_date).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex space-x-3">
                      <Link
                        to={`/builder/${website.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 cursor-pointer"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/domains/${website.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                      >
                        Domains
                      </Link>
                      <Link
                        to={`/deploy/${website.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                      >
                        Deploy
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No websites yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new website.
              </p>
              <div className="mt-6">
                <Link
                  to="/builder"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create New Website
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}