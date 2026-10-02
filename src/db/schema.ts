import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

// Site Configuration & Hero Settings
export const siteConfig = pgTable('site_config', {
  id: text('id').primaryKey().default('default'),
  name: text('name').notNull().default('Pawan Tetgure'),
  tagline: text('tagline').default('Video Editor & Motion Graphics Designer'),
  heroTitleLine1: text('hero_title_line1').default('Video Editor &'),
  heroTitleLine2: text('hero_title_line2').default('Motion Graphics'),
  heroTitleLine3: text('hero_title_line3').default('Designer'),
  heroDescription: text('hero_description').default(
    'Elevating stories through precision editing, dynamic motion graphics, and cinematic storytelling. Based in Mumbai, available worldwide.'
  ),
  spotsText: text('spots_text').default('Available for work • 3 spots left'),
  showreelUrl: text('showreel_url').default('https://www.youtube.com/embed/TS01EZPkZ4Y?autoplay=1&rel=0'),
  proofText: text('proof_text').default('Trusted by <b>30+ creators & brands</b> worldwide'),
  contactEmail: text('contact_email').default('pawantetgure07@gmail.com'),
  contactPhone: text('contact_phone').default('+91 91727 68784'),
  contactLocation: text('contact_location').default('Mumbai, Maharashtra, India'),
  socialLinks: jsonb('social_links').$type<Record<string, string>>().default({
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  }),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Selected Work / Projects (YouTube & Video works)
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull().default('Project Title'),
  category: text('category').notNull().default('YouTube'), // YouTube, Reels, Corporate, Travel, Wedding, Showreel
  videoUrl: text('video_url').notNull(),
  embedUrl: text('embed_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true), // Hide or show switch
  createdAt: timestamp('created_at').defaultNow(),
});

// Vertical Content: Shorts & Reels
export const reels = pgTable('reels', {
  id: serial('id').primaryKey(),
  title: text('title').default('Short / Reel'),
  videoUrl: text('video_url').notNull(),
  embedUrl: text('embed_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  platform: text('platform').default('youtube'), // youtube, instagram, direct
  badgeText: text('badge_text').default('Shorts'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true), // Hide or show switch
  createdAt: timestamp('created_at').defaultNow(),
});

// Professional Experience
export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  role: text('role').notNull(),
  duration: text('duration').notNull(), // e.g. "2025 - Present"
  description: text('description').notNull(),
  skills: jsonb('skills').$type<string[]>().default([]),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true), // Hide or show switch
  createdAt: timestamp('created_at').defaultNow(),
});

// Client Reviews & Testimonials
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  author: text('author').notNull(),
  roleCompany: text('role_company').notNull(),
  reviewText: text('review_text').notNull(),
  rating: integer('rating').default(5),
  avatarBg: text('avatar_bg').default('#7c3aed'),
  avatarInitials: text('avatar_initials').default('PT'),
  avatarImage: text('avatar_image'),
  isFeatured: boolean('is_featured').default(false),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true), // Hide or show switch
  createdAt: timestamp('created_at').defaultNow(),
});

// FAQs
export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').default('general'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true), // Hide or show switch
  createdAt: timestamp('created_at').defaultNow(),
});

// Partner Brand Logos
export const logos = pgTable('logos', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('image_url').notNull(),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true), // Hide or show switch
  createdAt: timestamp('created_at').defaultNow(),
});

