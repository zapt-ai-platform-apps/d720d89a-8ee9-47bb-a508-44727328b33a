import React from 'react';
import { HeaderEditor } from './editors/HeaderEditor';
import { AboutEditor } from './editors/AboutEditor';
import { FeaturesEditor } from './editors/FeaturesEditor';
import { TokenomicsEditor } from './editors/TokenomicsEditor';
import { RoadmapEditor } from './editors/RoadmapEditor';
import { TeamEditor } from './editors/TeamEditor';
import { ContactEditor } from './editors/ContactEditor';
import { FooterEditor } from './editors/FooterEditor';
import { TextEditor } from './editors/TextEditor';

export function SectionEditor({ section, onUpdate, onRemove, onMove, isFirst, isLast }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium text-gray-900">
          {getSectionDisplayName(section.type)}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onMove('up')}
            disabled={isFirst}
            className={`p-1 rounded-md ${
              isFirst
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-200 cursor-pointer'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={isLast}
            className={`p-1 rounded-md ${
              isLast
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-200 cursor-pointer'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button
            onClick={onRemove}
            className="p-1 rounded-md text-red-500 hover:bg-red-100 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {renderEditor(section, onUpdate)}
    </div>
  );
}

function renderEditor(section, onUpdate) {
  const handleUpdate = (updatedContent) => {
    onUpdate({
      ...section,
      content: updatedContent
    });
  };

  switch (section.type) {
    case 'header':
      return <HeaderEditor data={section.content} onUpdate={handleUpdate} />;
    case 'about':
      return <AboutEditor data={section.content} onUpdate={handleUpdate} />;
    case 'features':
      return <FeaturesEditor data={section.content} onUpdate={handleUpdate} />;
    case 'tokenomics':
      return <TokenomicsEditor data={section.content} onUpdate={handleUpdate} />;
    case 'roadmap':
      return <RoadmapEditor data={section.content} onUpdate={handleUpdate} />;
    case 'team':
      return <TeamEditor data={section.content} onUpdate={handleUpdate} />;
    case 'contact':
      return <ContactEditor data={section.content} onUpdate={handleUpdate} />;
    case 'footer':
      return <FooterEditor data={section.content} onUpdate={handleUpdate} />;
    case 'text':
      return <TextEditor data={section.content} onUpdate={handleUpdate} />;
    default:
      return (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          Unknown section type: {section.type}
        </div>
      );
  }
}

function getSectionDisplayName(type) {
  const names = {
    header: 'Header Section',
    about: 'About Section',
    features: 'Features Section',
    tokenomics: 'Tokenomics Section',
    roadmap: 'Roadmap Section',
    team: 'Team Section',
    contact: 'Contact Section',
    footer: 'Footer Section',
    text: 'Text Section'
  };
  
  return names[type] || 'Section';
}