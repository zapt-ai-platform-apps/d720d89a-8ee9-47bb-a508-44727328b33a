import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Check for current session and redirect if already logged in
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate(from, { replace: true });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reham</h2>
          <p className="mt-2 text-sm text-gray-600">Memecoin Website Builder</p>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Sign in with <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">ZAPT</a>
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'apple']}
            magicLink={true}
            view="magic_link"
            redirectTo={`${window.location.origin}${from}`}
          />
        </div>
      </div>
    </div>
  );
}