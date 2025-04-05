import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainNavigation } from '@/modules/core/components/MainNavigation';
import { useAuthContext } from '@/modules/auth/components/AuthProvider';
import { useToast } from '@/modules/core/components/ToastProvider';
import { supabase } from '@/supabaseClient';
import { TemplateSelector } from './TemplateSelector';
import { EditorPanel } from './EditorPanel';
import { PreviewPanel } from './PreviewPanel';

export function WebsiteBuilder() {
  const { websiteId } = useParams();
  const { user } = useAuthContext();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [website, setWebsite] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!websiteId);
  
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch('/api/templates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }

        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
        addToast('Failed to load templates', 'error');
      }
    };

    const fetchWebsite = async () => {
      if (!websiteId) {
        setLoading(false);
        return;
      }
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch(`/api/websites/${websiteId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch website');
        }

        const data = await response.json();
        setWebsite(data);
        
        // Parse the content
        try {
          const parsedContent = JSON.parse(data.content);
          setContent(parsedContent);
        } catch (e) {
          console.error('Error parsing website content:', e);
          setContent({});
        }
        
        // Set the selected template if available
        if (data.templateId) {
          const template = templates.find(t => t.id === data.templateId);
          if (template) {
            setSelectedTemplate(template);
          }
        }
      } catch (error) {
        console.error('Error fetching website:', error);
        addToast('Failed to load website', 'error');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    const initializeBuilder = async () => {
      setLoading(true);
      await fetchTemplates();
      await fetchWebsite();
      setLoading(false);
    };

    if (user) {
      initializeBuilder();
    }
  }, [user, websiteId, navigate, addToast]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    try {
      const templateContent = JSON.parse(template.content);
      setContent(templateContent);
    } catch (e) {
      console.error('Error parsing template content:', e);
      setContent({});
    }
  };

  const handleContentUpdate = (newContent) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    if (!user || !content) return;
    
    try {
      setSaving(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (isEditMode && websiteId) {
        // Update existing website
        const response = await fetch(`/api/websites/${websiteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          body: JSON.stringify({
            templateId: selectedTemplate?.id || null,
            content
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update website');
        }

        const data = await response.json();
        setWebsite(data);
        addToast('Website updated successfully', 'success');
      } else {
        // Create new website
        const response = await fetch('/api/websites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
          },
          body: JSON.stringify({
            templateId: selectedTemplate?.id || null,
            content
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create website');
        }

        const data = await response.json();
        setWebsite(data);
        setIsEditMode(true);
        navigate(`/builder/${data.id}`, { replace: true });
        addToast('Website created successfully', 'success');
      }
    } catch (error) {
      console.error('Error saving website:', error);
      addToast('Failed to save website', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Website' : 'Create New Website'}
            </h1>
            <button
              onClick={handleSave}
              disabled={saving || !content}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                saving || !content
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
              }`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Website'
              )}
            </button>
          </div>

          {!selectedTemplate && !isEditMode ? (
            <TemplateSelector 
              templates={templates} 
              onSelect={handleTemplateSelect} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditorPanel 
                content={content} 
                onContentUpdate={handleContentUpdate} 
              />
              <PreviewPanel content={content} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}