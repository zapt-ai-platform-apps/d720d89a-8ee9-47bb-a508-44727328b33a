import React from 'react';

export function ZaptBadge() {
  return (
    <a 
      href="https://www.zapt.ai" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-4 left-4 z-50 bg-indigo-600 text-white py-1 px-3 rounded-md text-xs font-medium shadow-md hover:bg-indigo-700 transition-colors"
    >
      Made on ZAPT
    </a>
  );
}