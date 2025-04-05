import { z } from 'zod';
import { createValidator } from '@/modules/core/validators';

// Basic content schemas
const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional()
});

const tokenomicsItemSchema = z.object({
  label: z.string(),
  value: z.string()
});

const roadmapPhaseSchema = z.object({
  title: z.string(),
  items: z.array(z.string())
});

const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  image: z.string().nullable()
});

const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string()
});

const footerLinkSchema = z.object({
  text: z.string(),
  url: z.string()
});

// Section content schemas
const headerContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  backgroundImage: z.string().nullable()
});

const aboutContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().nullable()
});

const featuresContentSchema = z.object({
  title: z.string(),
  features: z.array(featureSchema)
});

const tokenomicsContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(tokenomicsItemSchema)
});

const roadmapContentSchema = z.object({
  title: z.string(),
  phases: z.array(roadmapPhaseSchema)
});

const teamContentSchema = z.object({
  title: z.string(),
  members: z.array(teamMemberSchema)
});

const contactContentSchema = z.object({
  title: z.string(),
  email: z.string().email(),
  socialLinks: z.array(socialLinkSchema)
});

const footerContentSchema = z.object({
  copyright: z.string(),
  links: z.array(footerLinkSchema)
});

const textContentSchema = z.object({
  title: z.string(),
  text: z.string()
});

// Section schema with discriminated union for content
const sectionSchema = z.object({
  id: z.string(),
  type: z.enum(['header', 'about', 'features', 'tokenomics', 'roadmap', 'team', 'contact', 'footer', 'text']),
  content: z.union([
    headerContentSchema,
    aboutContentSchema,
    featuresContentSchema,
    tokenomicsContentSchema,
    roadmapContentSchema,
    teamContentSchema,
    contactContentSchema,
    footerContentSchema,
    textContentSchema
  ])
});

// Website schema
const websiteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  templateId: z.string().nullable(),
  name: z.string().optional(),
  domain_name: z.string().optional(),
  content: z.string().or(z.object({
    sections: z.array(sectionSchema)
  })),
  deployed: z.boolean().optional(),
  deployment_date: z.string().optional(),
  thumbnail_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// Template schema
const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  content: z.string(),
  thumbnailUrl: z.string().nullable().optional(),
  category: z.string().optional(),
  created_at: z.string().optional()
});

// Export validators
export const validateWebsite = createValidator(websiteSchema, 'Website');
export const validateTemplate = createValidator(templateSchema, 'Template');
export const validateSection = createValidator(sectionSchema, 'Section');