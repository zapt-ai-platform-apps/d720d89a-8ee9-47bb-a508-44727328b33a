import React from 'react';

export function HeaderSection({ data }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        {data.backgroundImage ? (
          <img
            src={data.backgroundImage}
            alt="Header background"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-purple-500 to-indigo-600"></div>
        )}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {data.title || 'Welcome to Our Memecoin'}
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100 sm:max-w-3xl">
          {data.subtitle || 'The next generation of cryptocurrency'}
        </p>
        {data.buttonText && (
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
              <a
                href={data.buttonUrl || '#'}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
              >
                {data.buttonText}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}