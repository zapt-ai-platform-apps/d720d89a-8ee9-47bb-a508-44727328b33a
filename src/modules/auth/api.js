import { userSchema, validateUser, sessionSchema, validateSession } from './validators';
import { useAuth } from './internal/useAuth';
import { eventBus } from '@/modules/core/events';
import { events } from './events';

/**
 * The public API for the auth module
 */
export const api = {
  /**
   * Hook for accessing authentication state and methods
   * @returns {Object} Authentication state and functions
   */
  useAuth: () => {
    const auth = useAuth();
    return {
      user: auth.user ? validateUser(auth.user, {
        actionName: 'useAuth',
        location: 'auth/api.js',
        direction: 'outgoing',
        moduleFrom: 'auth',
        moduleTo: 'client'
      }) : null,
      session: auth.session ? validateSession(auth.session, {
        actionName: 'useAuth',
        location: 'auth/api.js',
        direction: 'outgoing',
        moduleFrom: 'auth',
        moduleTo: 'client'
      }) : null,
      loading: auth.loading,
      signOut: auth.signOut
    };
  },

  /**
   * Subscribe to auth events
   * @param {string} event - Event name
   * @param {Function} callback - Event handler
   * @returns {Function} Unsubscribe function
   */
  subscribeToEvent: (event, callback) => {
    if (!Object.values(events).includes(event)) {
      console.warn(`Unknown auth event: ${event}`);
      return () => {};
    }
    return eventBus.subscribe(event, callback);
  }
};

// Context hook (legacy support)
export { useAuthContext } from './internal/AuthContext';