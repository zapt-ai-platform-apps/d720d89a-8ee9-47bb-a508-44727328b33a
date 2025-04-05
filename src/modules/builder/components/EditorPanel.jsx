import React, { useState } from 'react';
import { SectionEditor } from './SectionEditor';
import { AddSectionMenu } from './AddSectionMenu';

export function EditorPanel({ content, onContentUpdate }) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  if (!content || !content.sections) {
    return (
      <div className="bg-white shadow rounded-lg p-6 h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No content</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a section to get started.
          </p>
          <AddSectionMenu 
            onAdd={(sectionType) => {
              const newSection = createDefaultSection(sectionType);
              onContentUpdate({
                sections: [newSection]
              });
            }}
          />
        </div>
      </div>
    );
  }

  const handleSectionUpdate = (index, updatedSection) => {
    const updatedSections = [...content.sections];
    updatedSections[index] = updatedSection;
    onContentUpdate({
      ...content,
      sections: updatedSections
    });
  };

  const handleAddSection = (sectionType) => {
    const newSection = createDefaultSection(sectionType);
    onContentUpdate({
      ...content,
      sections: [...content.sections, newSection]
    });
    setActiveSectionIndex(content.sections.length);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = content.sections.filter((_, i) => i !== index);
    onContentUpdate({
      ...content,
      sections: updatedSections
    });
    if (activeSectionIndex >= index && activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const handleMoveSection = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === content.sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedSections = [...content.sections];
    const [removedSection] = updatedSections.splice(index, 1);
    updatedSections.splice(newIndex, 0, removedSection);

    onContentUpdate({
      ...content,
      sections: updatedSections
    });
    setActiveSectionIndex(newIndex);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-auto h-[calc(100vh-16rem)]">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Website Editor</h2>
      
      <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
        {content.sections.map((section, index) => (
          <button
            key={section.id || index}
            onClick={() => setActiveSectionIndex(index)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              index === activeSectionIndex
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } whitespace-nowrap cursor-pointer`}
          >
            {getSectionDisplayName(section.type)} {index + 1}
          </button>
        ))}
        <AddSectionMenu onAdd={handleAddSection} />
      </div>

      {content.sections.length > 0 && activeSectionIndex < content.sections.length && (
        <SectionEditor
          section={content.sections[activeSectionIndex]}
          onUpdate={(updatedSection) => handleSectionUpdate(activeSectionIndex, updatedSection)}
          onRemove={() => handleRemoveSection(activeSectionIndex)}
          onMove={(direction) => handleMoveSection(activeSectionIndex, direction)}
          isFirst={activeSectionIndex === 0}
          isLast={activeSectionIndex === content.sections.length - 1}
        />
      )}
    </div>
  );
}

function createDefaultSection(type) {
  const id = `section-${Date.now()}`;
  
  switch (type) {
    case 'header':
      return {
        id,
        type: 'header',
        content: {
          title: 'Welcome to My Memecoin',
          subtitle: 'The next generation of crypto',
          buttonText: 'Get Started',
          buttonUrl: '#',
          backgroundImage: null
        }
      };
    case 'about':
      return {
        id,
        type: 'about',
        content: {
          title: 'About Our Coin',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum.',
          image: null
        }
      };
    case 'features':
      return {
        id,
        type: 'features',
        content: {
          title: 'Key Features',
          features: [
            { title: 'Feature 1', description: 'Description of feature 1', icon: 'bolt' },
            { title: 'Feature 2', description: 'Description of feature 2', icon: 'shield' },
            { title: 'Feature 3', description: 'Description of feature 3', icon: 'star' }
          ]
        }
      };
    case 'tokenomics':
      return {
        id,
        type: 'tokenomics',
        content: {
          title: 'Tokenomics',
          description: 'Our token distribution is designed for long-term sustainability.',
          items: [
            { label: 'Total Supply', value: '1,000,000,000' },
            { label: 'Circulating Supply', value: '600,000,000' },
            { label: 'Liquidity', value: '40%' },
            { label: 'Marketing', value: '20%' },
            { label: 'Team', value: '10%' },
            { label: 'Community', value: '30%' }
          ]
        }
      };
    case 'roadmap':
      return {
        id,
        type: 'roadmap',
        content: {
          title: 'Our Roadmap',
          phases: [
            { title: 'Phase 1', items: ['Website Launch', 'Community Building', 'Initial Marketing'] },
            { title: 'Phase 2', items: ['Exchange Listings', 'Partnerships', 'Utility Development'] },
            { title: 'Phase 3', items: ['Major Exchange Listing', 'Ecosystem Expansion', 'Global Marketing'] }
          ]
        }
      };
    case 'team':
      return {
        id,
        type: 'team',
        content: {
          title: 'Our Team',
          members: [
            { name: 'Team Member 1', role: 'Founder', image: null },
            { name: 'Team Member 2', role: 'Developer', image: null },
            { name: 'Team Member 3', role: 'Marketing', image: null }
          ]
        }
      };
    case 'contact':
      return {
        id,
        type: 'contact',
        content: {
          title: 'Contact Us',
          email: 'contact@mycoin.com',
          socialLinks: [
            { platform: 'twitter', url: 'https://twitter.com/' },
            { platform: 'telegram', url: 'https://t.me/' },
            { platform: 'discord', url: 'https://discord.gg/' }
          ]
        }
      };
    case 'footer':
      return {
        id,
        type: 'footer',
        content: {
          copyright: '© 2023 My Memecoin. All rights reserved.',
          links: [
            { text: 'Privacy Policy', url: '#' },
            { text: 'Terms of Service', url: '#' }
          ]
        }
      };
    default:
      return {
        id,
        type: 'text',
        content: {
          title: 'New Section',
          text: 'Add your content here.'
        }
      };
  }
}

function getSectionDisplayName(type) {
  const names = {
    header: 'Header',
    about: 'About',
    features: 'Features',
    tokenomics: 'Tokenomics',
    roadmap: 'Roadmap',
    team: 'Team',
    contact: 'Contact',
    footer: 'Footer',
    text: 'Text'
  };
  
  return names[type] || 'Section';
}