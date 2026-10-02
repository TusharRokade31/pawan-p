'use server';

import { revalidatePath } from 'next/cache';
import { db, getPortfolioData, updateLocalData } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { parseVideoUrl } from '@/lib/video-parser';
import { createAdminSession, clearAdminSession, verifyAdminPassword, verifyAdminSession } from '@/lib/auth';

// ── AUTH ACTIONS ──
export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  if (!password) {
    return { success: false, error: 'Password is required' };
  }

  if (!verifyAdminPassword(password)) {
    return { success: false, error: 'Invalid admin password' };
  }

  await createAdminSession();
  return { success: true };
}

export async function logoutAction() {
  await clearAdminSession();
  revalidatePath('/admin');
  return { success: true };
}

// Ensure caller is admin
async function requireAuth() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }
}

// ── SITE CONFIG ACTIONS ──
export async function updateSiteConfigAction(data: any) {
  await requireAuth();

  if (db) {
    try {
      const existing = await db.select().from(schema.siteConfig).where(eq(schema.siteConfig.id, 'default'));
      if (existing.length > 0) {
        await (db.update(schema.siteConfig) as any).set({ ...data, updatedAt: new Date() }).where(eq(schema.siteConfig.id, 'default'));
      } else {
        await (db.insert(schema.siteConfig) as any).values({ ...data, id: 'default' });
      }
    } catch (e) {
      console.error('Neon config update error:', e);
    }
  }

  await updateLocalData('siteConfig', data);
  revalidatePath('/');
  return { success: true };
}

// ── PROJECTS (YOUTUBE VIDEOS) ACTIONS ──
export async function saveProjectAction(data: {
  id?: number;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isActive?: boolean;
}) {
  await requireAuth();

  const parsed = parseVideoUrl(data.videoUrl, data.thumbnailUrl);
  const projectPayload = {
    title: data.title || 'Untitled Video',
    category: data.category || 'YouTube',
    videoUrl: data.videoUrl,
    embedUrl: parsed.embedUrl,
    thumbnailUrl: parsed.thumbnailUrl || data.thumbnailUrl,
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  const currentData = await getPortfolioData();
  const currentProjects = currentData.projects || [];

  if (data.id) {
    // Update existing
    if (db) {
      try {
        await (db.update(schema.projects) as any).set(projectPayload).where(eq(schema.projects.id, data.id));
      } catch (e) {
        console.error('Neon update project error:', e);
      }
    }
    const updated = currentProjects.map((p: any) => (p.id === data.id ? { ...p, ...projectPayload } : p));
    await updateLocalData('projects', updated);
  } else {
    // Create new
    let newId = Date.now();
    if (db) {
      try {
        const [inserted] = await (db.insert(schema.projects) as any).values({
          ...projectPayload,
          sortOrder: currentProjects.length + 1,
        }).returning({ id: schema.projects.id });
        if (inserted?.id) newId = inserted.id;
      } catch (e) {
        console.error('Neon insert project error:', e);
      }
    }
    const newProject = {
      ...projectPayload,
      id: newId,
      sortOrder: currentProjects.length + 1,
    };
    await updateLocalData('projects', [...currentProjects, newProject]);
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleProjectStatusAction(id: number, isActive: boolean) {
  await requireAuth();

  if (db) {
    try {
      await (db.update(schema.projects) as any).set({ isActive }).where(eq(schema.projects.id, id));
    } catch (e) {
      console.error('Neon toggle project error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.projects || []).map((p: any) => (p.id === id ? { ...p, isActive } : p));
  await updateLocalData('projects', updated);

  revalidatePath('/');
  return { success: true };
}

export async function deleteProjectAction(id: number) {
  await requireAuth();

  if (db) {
    try {
      await db.delete(schema.projects).where(eq(schema.projects.id, id));
    } catch (e) {
      console.error('Neon delete project error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.projects || []).filter((p: any) => p.id !== id);
  await updateLocalData('projects', updated);

  revalidatePath('/');
  return { success: true };
}

// ── REELS & SHORTS ACTIONS ──
export async function saveReelAction(data: {
  id?: number;
  title?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  platform?: string;
  badgeText?: string;
  isActive?: boolean;
}) {
  await requireAuth();

  const parsed = parseVideoUrl(data.videoUrl, data.thumbnailUrl);
  const reelPayload = {
    title: data.title || 'Short / Reel',
    videoUrl: data.videoUrl,
    embedUrl: parsed.embedUrl,
    thumbnailUrl: parsed.thumbnailUrl || data.thumbnailUrl,
    platform: parsed.platform === 'youtube' ? 'youtube' : parsed.platform,
    badgeText: data.badgeText || (parsed.platform === 'instagram' ? 'Reel' : 'Shorts'),
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  const currentData = await getPortfolioData();
  const currentReels = currentData.reels || [];

  if (data.id) {
    // Update existing
    if (db) {
      try {
        await (db.update(schema.reels) as any).set(reelPayload).where(eq(schema.reels.id, data.id));
      } catch (e) {
        console.error('Neon update reel error:', e);
      }
    }
    const updated = currentReels.map((r: any) => (r.id === data.id ? { ...r, ...reelPayload } : r));
    await updateLocalData('reels', updated);
  } else {
    // Insert new
    let newId = Date.now();
    if (db) {
      try {
        const [inserted] = await (db.insert(schema.reels) as any).values({
          ...reelPayload,
          sortOrder: currentReels.length + 1,
        }).returning({ id: schema.reels.id });
        if (inserted?.id) newId = inserted.id;
      } catch (e) {
        console.error('Neon insert reel error:', e);
      }
    }
    const newReel = {
      ...reelPayload,
      id: newId,
      sortOrder: currentReels.length + 1,
    };
    await updateLocalData('reels', [...currentReels, newReel]);
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleReelStatusAction(id: number, isActive: boolean) {
  await requireAuth();

  if (db) {
    try {
      await (db.update(schema.reels) as any).set({ isActive }).where(eq(schema.reels.id, id));
    } catch (e) {
      console.error('Neon toggle reel error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.reels || []).map((r: any) => (r.id === id ? { ...r, isActive } : r));
  await updateLocalData('reels', updated);

  revalidatePath('/');
  return { success: true };
}

export async function deleteReelAction(id: number) {
  await requireAuth();

  if (db) {
    try {
      await db.delete(schema.reels).where(eq(schema.reels.id, id));
    } catch (e) {
      console.error('Neon delete reel error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.reels || []).filter((r: any) => r.id !== id);
  await updateLocalData('reels', updated);

  revalidatePath('/');
  return { success: true };
}

// ── EXPERIENCE ACTIONS ──
export async function saveExperienceAction(data: {
  id?: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
  isActive?: boolean;
}) {
  await requireAuth();

  const expPayload = {
    company: data.company,
    role: data.role,
    duration: data.duration,
    description: data.description,
    skills: data.skills || [],
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  const currentData = await getPortfolioData();
  const currentExp = currentData.experiences || [];

  if (data.id) {
    if (db) {
      try {
        await (db.update(schema.experiences) as any).set(expPayload).where(eq(schema.experiences.id, data.id));
      } catch (e) {
        console.error('Neon update exp error:', e);
      }
    }
    const updated = currentExp.map((e: any) => (e.id === data.id ? { ...e, ...expPayload } : e));
    await updateLocalData('experiences', updated);
  } else {
    let newId = Date.now();
    if (db) {
      try {
        const [inserted] = await (db.insert(schema.experiences) as any).values({
          ...expPayload,
          sortOrder: currentExp.length + 1,
        }).returning({ id: schema.experiences.id });
        if (inserted?.id) newId = inserted.id;
      } catch (e) {
        console.error('Neon insert exp error:', e);
      }
    }
    const newExp = {
      ...expPayload,
      id: newId,
      sortOrder: currentExp.length + 1,
    };
    await updateLocalData('experiences', [...currentExp, newExp]);
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleExperienceStatusAction(id: number, isActive: boolean) {
  await requireAuth();

  if (db) {
    try {
      await (db.update(schema.experiences) as any).set({ isActive }).where(eq(schema.experiences.id, id));
    } catch (e) {
      console.error('Neon toggle exp error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.experiences || []).map((e: any) => (e.id === id ? { ...e, isActive } : e));
  await updateLocalData('experiences', updated);

  revalidatePath('/');
  return { success: true };
}

export async function deleteExperienceAction(id: number) {
  await requireAuth();

  if (db) {
    try {
      await db.delete(schema.experiences).where(eq(schema.experiences.id, id));
    } catch (e) {
      console.error('Neon delete exp error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.experiences || []).filter((e: any) => e.id !== id);
  await updateLocalData('experiences', updated);

  revalidatePath('/');
  return { success: true };
}

// ── REVIEWS ACTIONS ──
export async function saveReviewAction(data: {
  id?: number;
  author: string;
  roleCompany: string;
  reviewText: string;
  rating?: number;
  avatarBg?: string;
  avatarInitials?: string;
  isActive?: boolean;
}) {
  await requireAuth();

  const reviewPayload = {
    author: data.author,
    roleCompany: data.roleCompany,
    reviewText: data.reviewText,
    rating: data.rating || 5,
    avatarBg: data.avatarBg || '#7c3aed',
    avatarInitials: data.avatarInitials || (data.author ? data.author.charAt(0).toUpperCase() : 'P'),
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  const currentData = await getPortfolioData();
  const currentReviews = currentData.reviews || [];

  if (data.id) {
    if (db) {
      try {
        await (db.update(schema.reviews) as any).set(reviewPayload).where(eq(schema.reviews.id, data.id));
      } catch (e) {
        console.error('Neon update review error:', e);
      }
    }
    const updated = currentReviews.map((r: any) => (r.id === data.id ? { ...r, ...reviewPayload } : r));
    await updateLocalData('reviews', updated);
  } else {
    let newId = Date.now();
    if (db) {
      try {
        const [inserted] = await (db.insert(schema.reviews) as any).values({
          ...reviewPayload,
          sortOrder: currentReviews.length + 1,
        }).returning({ id: schema.reviews.id });
        if (inserted?.id) newId = inserted.id;
      } catch (e) {
        console.error('Neon insert review error:', e);
      }
    }
    const newRev = {
      ...reviewPayload,
      id: newId,
      sortOrder: currentReviews.length + 1,
    };
    await updateLocalData('reviews', [...currentReviews, newRev]);
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleReviewStatusAction(id: number, isActive: boolean) {
  await requireAuth();

  if (db) {
    try {
      await (db.update(schema.reviews) as any).set({ isActive }).where(eq(schema.reviews.id, id));
    } catch (e) {
      console.error('Neon toggle review error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.reviews || []).map((r: any) => (r.id === id ? { ...r, isActive } : r));
  await updateLocalData('reviews', updated);

  revalidatePath('/');
  return { success: true };
}

export async function deleteReviewAction(id: number) {
  await requireAuth();

  if (db) {
    try {
      await db.delete(schema.reviews).where(eq(schema.reviews.id, id));
    } catch (e) {
      console.error('Neon delete review error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = (currentData.reviews || []).filter((r: any) => r.id !== id);
  await updateLocalData('reviews', updated);

  revalidatePath('/');
  return { success: true };
}

// ── LOGOS (BRAND PARTNERS) ACTIONS ──
export async function saveLogoAction(data: {
  id?: number;
  name: string;
  imageUrl: string;
  isActive?: boolean;
}) {
  await requireAuth();

  const logoPayload = {
    name: data.name,
    imageUrl: data.imageUrl,
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  const currentData = await getPortfolioData();
  const currentLogos = (currentData as any).logos || [];

  if (data.id) {
    if (db) {
      try {
        await (db.update(schema.logos) as any).set(logoPayload).where(eq(schema.logos.id, data.id));
      } catch (e) {
        console.error('Neon update logo error:', e);
      }
    }
    const updated = currentLogos.map((l: any) => (l.id === data.id ? { ...l, ...logoPayload } : l));
    await updateLocalData('logos', updated);
  } else {
    let newId = Date.now();
    if (db) {
      try {
        const [inserted] = await (db.insert(schema.logos) as any).values({
          ...logoPayload,
          sortOrder: currentLogos.length + 1,
        }).returning({ id: schema.logos.id });
        if (inserted?.id) newId = inserted.id;
      } catch (e) {
        console.error('Neon insert logo error:', e);
      }
    }
    const newLogo = {
      ...logoPayload,
      id: newId,
      sortOrder: currentLogos.length + 1,
    };
    await updateLocalData('logos', [...currentLogos, newLogo]);
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleLogoStatusAction(id: number, isActive: boolean) {
  await requireAuth();

  if (db) {
    try {
      await (db.update(schema.logos) as any).set({ isActive }).where(eq(schema.logos.id, id));
    } catch (e) {
      console.error('Neon toggle logo error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = ((currentData as any).logos || []).map((l: any) => (l.id === id ? { ...l, isActive } : l));
  await updateLocalData('logos', updated);

  revalidatePath('/');
  return { success: true };
}

export async function deleteLogoAction(id: number) {
  await requireAuth();

  if (db) {
    try {
      await db.delete(schema.logos).where(eq(schema.logos.id, id));
    } catch (e) {
      console.error('Neon delete logo error:', e);
    }
  }

  const currentData = await getPortfolioData();
  const updated = ((currentData as any).logos || []).filter((l: any) => l.id !== id);
  await updateLocalData('logos', updated);

  revalidatePath('/');
  return { success: true };
}

