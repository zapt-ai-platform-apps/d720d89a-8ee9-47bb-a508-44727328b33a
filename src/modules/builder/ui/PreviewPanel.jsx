import React from 'react';
import { HeaderSection } from './preview/HeaderSection';
import { AboutSection } from './preview/AboutSection';
import { FeaturesSection } from './preview/FeaturesSection';
import { TokenomicsSection } from './preview/TokenomicsSection';
import { RoadmapSection } from './preview/RoadmapSection';
import { TeamSection } from './preview/TeamSection';
import { ContactSection } from './preview/ContactSection';
import { FooterSection } from './preview/FooterSection';
import { TextSection } from './preview/TextSection';

export function PreviewPanel({ content }) {
  if (!content || !content.sections || content.sections.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="mt-2">Add sections to preview your website</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-16rem)] overflow-y-auto">
      <div className="preview-container">
        {content.sections.map((section, index) => (
          <div key={section.id || index} className="preview-section">
            {renderSection(section)}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderSection(section) {
  switch (section.type) {
    case 'header':
      return <HeaderSection data={section.content} />;
    case 'about':
      return <AboutSection data={section.content} />;
    case 'features':
      return <FeaturesSection data={section.content} />;
    case 'tokenomics':
      return <TokenomicsSection data={section.content} />;
    case 'roadmap':
      return <RoadmapSection data={section.content} />;
    case 'team':
      return <TeamSection data={section.content} />;
    case 'contact':
      return <ContactSection data={section.content} />;
    case 'footer':
      return <FooterSection data={section.content} />;
    case 'text':
      return <TextSection data={section.content} />;
    default:
      return (
        <div className="p-4 bg-gray-100 text-gray-500 text-center">
          Unknown section type: {section.type}
        </div>
      );
  }
}