import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import * as schema from './schema';
import fs from 'fs';
import path from 'path';
import {
  initialSiteConfig,
  initialProjects,
  initialReels,
  initialExperiences,
  initialReviews,
  initialFaqs,
  initialLogos,
} from '../lib/seed-data';

const hasDatabaseUrl = Boolean(
  process.env.DATABASE_URL &&
    process.env.DATABASE_URL.trim().length > 0 &&
    process.env.DATABASE_URL.includes('postgres')
);

let dbInstance: ReturnType<typeof drizzle> | null = null;

if (hasDatabaseUrl) {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    dbInstance = drizzle(pool, { schema });
  } catch (err) {
    console.error('Failed to initialize Neon connection:', err);
  }
}

export const db = dbInstance;

// Local JSON file store for offline dev fallback or when DATABASE_URL is not yet provided
const dataDir = path.join(process.cwd(), 'data');
const storeFilePath = path.join(dataDir, 'portfolio-store.json');

function getLocalStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(storeFilePath)) {
    const initialData = {
      siteConfig: initialSiteConfig,
      projects: initialProjects,
      reels: initialReels,
      experiences: initialExperiences,
      reviews: initialReviews,
      faqs: initialFaqs,
    };
    fs.writeFileSync(storeFilePath, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
  try {
    const content = fs.readFileSync(storeFilePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return {
      siteConfig: initialSiteConfig,
      projects: initialProjects,
      reels: initialReels,
      experiences: initialExperiences,
      reviews: initialReviews,
      faqs: initialFaqs,
    };
  }
}

function saveLocalStore(data: any) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Unified Data Access Layer (Neon DB when DATABASE_URL is provided, or persistent local store)
export async function getPortfolioData() {
  if (db) {
    try {
      const [config] = await db.select().from(schema.siteConfig).limit(1);
      const projList = await db.select().from(schema.projects);
      const reelsList = await db.select().from(schema.reels);
      const expList = await db.select().from(schema.experiences);
      const revList = await db.select().from(schema.reviews);
      const faqList = await db.select().from(schema.faqs);
      const logoList = await db.select().from(schema.logos);

      return {
        siteConfig: config || initialSiteConfig,
        projects: (projList.length > 0 ? projList : initialProjects).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
        reels: (reelsList.length > 0 ? reelsList : initialReels).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
        experiences: (expList.length > 0 ? expList : initialExperiences).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
        reviews: (revList.length > 0 ? revList : initialReviews).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
        faqs: (faqList.length > 0 ? faqList : initialFaqs).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
        logos: (logoList.length > 0 ? logoList : initialLogos).sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
      };
    } catch (e) {
      console.warn('Neon query error, falling back to local store:', e);
    }
  }

  // Fallback to local persistent store
  return getLocalStore();
}

// Data mutation helpers
export async function updateLocalData(section: string, updatedItems: any) {
  const store = getLocalStore();
  store[section] = updatedItems;
  saveLocalStore(store);
  return store;
}
