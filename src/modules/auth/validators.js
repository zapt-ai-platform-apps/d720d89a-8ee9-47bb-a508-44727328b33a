import { z } from 'zod';
import { createValidator } from '@/modules/core/validators';

// User Schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  app_metadata: z.object({}).optional(),
  user_metadata: z.object({}).optional(),
  aud: z.string().optional(),
  created_at: z.string().optional()
});

// Session Schema
export const sessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string().optional(),
  expires_at: z.number().optional(),
  expires_in: z.number().optional(),
  token_type: z.string(),
  user: userSchema
});

// Export validators
export const validateUser = createValidator(userSchema, 'User');
export const validateSession = createValidator(sessionSchema, 'Session');