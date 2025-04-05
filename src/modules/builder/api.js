import { validateWebsite, validateTemplate, validateSection } from './validators';
import { WebsiteBuilder } from './ui/WebsiteBuilder';
import { useWebsiteBuilder } from './internal/useWebsiteBuilder';

/**
 * Public API for the builder module
 */
export const api = {
  /**
   * Main website builder component
   */
  WebsiteBuilder,
  
  /**
   * Hook for accessing and managing website data
   * @param {string} websiteId - Optional website id to edit
   * @returns {Object} Website building functions and state
   */
  useWebsiteBuilder: (websiteId) => {
    // Wrap the internal hook to validate data crossing the boundary
    const builder = useWebsiteBuilder(websiteId);
    
    return {
      ...builder,
      website: builder.website ? validateWebsite(builder.website, {
        actionName: 'getWebsite',
        location: 'builder/api.js',
        direction: 'outgoing',
        moduleFrom: 'builder',
        moduleTo: 'client'
      }) : null,
      templates: builder.templates.map(template => 
        validateTemplate(template, {
          actionName: 'getTemplates',
          location: 'builder/api.js',
          direction: 'outgoing',
          moduleFrom: 'builder',
          moduleTo: 'client'
        })
      )
    };
  },
  
  /**
   * Create a default section based on type
   * @param {string} type - Section type (header, about, etc)
   * @returns {Object} Default section configuration
   */
  createDefaultSection: (type) => {
    const section = createDefaultSectionInternal(type);
    return validateSection(section, {
      actionName: 'createDefaultSection',
      location: 'builder/api.js',
      direction: 'outgoing',
      moduleFrom: 'builder',
      moduleTo: 'client'
    });
  }
};

/**
 * Internal helper function for creating default sections
 */
function createDefaultSectionInternal(type) {
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