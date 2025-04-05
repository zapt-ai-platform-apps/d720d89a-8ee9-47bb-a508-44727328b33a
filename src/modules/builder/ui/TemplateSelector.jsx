import React from 'react';

export function TemplateSelector({ templates, onSelect }) {
  if (!templates || templates.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No templates available</h3>
        <p className="mt-1 text-sm text-gray-500">
          Please try again later or create a website from scratch.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Select a Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <div className="h-48 bg-gray-100">
              {template.thumbnailUrl ? (
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-md font-medium text-gray-900">{template.name}</h3>
              {template.description && (
                <p className="mt-1 text-sm text-gray-500">{template.description}</p>
              )}
            </div>
          </div>
        ))}
        
        {/* Option to start from scratch */}
        <div
          className="border border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
          onClick={() => onSelect({
            id: null,
            name: 'Blank Template',
            content: JSON.stringify({
              sections: [
                {
                  id: 'header',
                  type: 'header',
                  content: {
                    title: 'My Memecoin',
                    subtitle: 'The next big thing in crypto',
                    buttonText: 'Get Started',
                    buttonUrl: '#',
                    backgroundImage: null
                  }
                }
              ]
            })
          })}
        >
          <div className="h-48 bg-gray-50 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Start from scratch</p>
          </div>
          <div className="p-4">
            <h3 className="text-md font-medium text-gray-900">Blank Template</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start with a clean slate and build your website from scratch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}