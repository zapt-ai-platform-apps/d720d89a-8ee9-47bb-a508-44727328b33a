import React, { useState, useRef, useEffect } from 'react';

export function AddSectionMenu({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const sectionTypes = [
    { id: 'header', name: 'Header', icon: 'header' },
    { id: 'about', name: 'About', icon: 'document' },
    { id: 'features', name: 'Features', icon: 'list' },
    { id: 'tokenomics', name: 'Tokenomics', icon: 'chart' },
    { id: 'roadmap', name: 'Roadmap', icon: 'map' },
    { id: 'team', name: 'Team', icon: 'users' },
    { id: 'contact', name: 'Contact', icon: 'mail' },
    { id: 'footer', name: 'Footer', icon: 'footer' },
    { id: 'text', name: 'Text', icon: 'text' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddSection = (type) => {
    onAdd(type);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Section
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {sectionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleAddSection(type.id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}