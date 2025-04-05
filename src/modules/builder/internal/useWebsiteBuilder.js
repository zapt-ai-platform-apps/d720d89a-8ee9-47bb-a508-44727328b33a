import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { useToast } from '@/modules/core/internal/ToastContext';
import { useAuthContext } from '@/modules/auth/internal/AuthContext';

export function useWebsiteBuilder(websiteId) {
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

  return {
    website,
    templates,
    selectedTemplate,
    content,
    loading,
    saving,
    isEditMode,
    selectTemplate: handleTemplateSelect,
    updateContent: handleContentUpdate,
    saveWebsite: handleSave
  };
}