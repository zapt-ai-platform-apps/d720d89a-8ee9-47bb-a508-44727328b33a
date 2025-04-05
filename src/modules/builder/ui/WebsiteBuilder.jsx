import React from 'react';
import { useParams } from 'react-router-dom';
import { MainNavigation } from '@/modules/core/ui/MainNavigation';
import { api as builderApi } from '../api';
import { TemplateSelector } from './TemplateSelector';
import { EditorPanel } from './EditorPanel';
import { PreviewPanel } from './PreviewPanel';

export function WebsiteBuilder() {
  const { websiteId } = useParams();
  const {
    website,
    templates,
    selectedTemplate,
    content,
    loading,
    saving,
    isEditMode,
    selectTemplate,
    updateContent,
    saveWebsite
  } = builderApi.useWebsiteBuilder(websiteId);

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
              onClick={saveWebsite}
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
              onSelect={selectTemplate} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditorPanel 
                content={content} 
                onContentUpdate={updateContent} 
              />
              <PreviewPanel content={content} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}