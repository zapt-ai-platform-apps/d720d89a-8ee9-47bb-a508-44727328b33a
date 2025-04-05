import { eventBus } from './events';
import { useToast, ToastProvider } from './internal/ToastContext';
import { ZaptBadge } from './ui/ZaptBadge';
import { MainNavigation } from './ui/MainNavigation';
import { FormField } from './ui/FormField';

/**
 * Public API for the core module
 */
export const api = {
  /**
   * Event bus for application-wide events
   */
  eventBus,
  
  /**
   * Toast notification system
   */
  useToast,
  ToastProvider,
  
  /**
   * UI Components
   */
  ZaptBadge,
  MainNavigation,
  FormField
};