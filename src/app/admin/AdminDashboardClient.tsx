'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  logoutAction,
  updateSiteConfigAction,
  saveProjectAction,
  toggleProjectStatusAction,
  deleteProjectAction,
  saveReelAction,
  toggleReelStatusAction,
  deleteReelAction,
  saveExperienceAction,
  toggleExperienceStatusAction,
  deleteExperienceAction,
  saveReviewAction,
  toggleReviewStatusAction,
  deleteReviewAction,
  saveLogoAction,
  toggleLogoStatusAction,
  deleteLogoAction,
} from '@/actions/portfolio-actions';

interface AdminProps {
  data: {
    siteConfig: any;
    projects: any[];
    reels: any[];
    experiences: any[];
    reviews: any[];
    faqs: any[];
    logos?: any[];
  };
}

export default function AdminDashboardClient({ data }: AdminProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'reels' | 'experience' | 'reviews' | 'logos' | 'profile'>('projects');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleLogout = async () => {
    await logoutAction();
    router.push('/admin/login');
  };

  // ── 1. SITE CONFIG STATE ──
  const [configForm, setConfigForm] = useState({
    name: data.siteConfig?.name || 'Pawan Tetgure',
    tagline: data.siteConfig?.tagline || 'Video Editor & Motion Graphics Designer',
    heroTitleLine1: data.siteConfig?.heroTitleLine1 || 'Video Editor &',
    heroTitleLine2: data.siteConfig?.heroTitleLine2 || 'Motion Graphics',
    heroTitleLine3: data.siteConfig?.heroTitleLine3 || 'Designer',
    heroDescription: data.siteConfig?.heroDescription || '',
    spotsText: data.siteConfig?.spotsText || 'Available for work • 3 spots left',
    showreelUrl: data.siteConfig?.showreelUrl || 'https://www.youtube.com/embed/TS01EZPkZ4Y?autoplay=1&rel=0',
    contactEmail: data.siteConfig?.contactEmail || 'pawantetgure07@gmail.com',
    contactPhone: data.siteConfig?.contactPhone || '+91 91727 68784',
    contactLocation: data.siteConfig?.contactLocation || 'Mumbai, Maharashtra, India',
  });

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSiteConfigAction(configForm);
      showStatus('Site settings & showreel saved successfully!');
      router.refresh();
    } catch (err: any) {
      showStatus(err.message || 'Error saving settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── 2. PROJECTS (YOUTUBE VIDEOS) STATE ──
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'YouTube',
    videoUrl: '',
    thumbnailUrl: '',
    isActive: true,
  });

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.videoUrl) return;
    setLoading(true);
    try {
      await saveProjectAction({
        id: editingProjectId || undefined,
        ...projectForm,
      });
      showStatus(editingProjectId ? 'Project updated!' : 'New YouTube video added!');
      setEditingProjectId(null);
      setProjectForm({ title: '', category: 'YouTube', videoUrl: '', thumbnailUrl: '', isActive: true });
      router.refresh();
    } catch (err: any) {
      showStatus(err.message || 'Error saving project', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProject = async (id: number, currentStatus: boolean) => {
    try {
      await toggleProjectStatusAction(id, !currentStatus);
      showStatus(`Video ${!currentStatus ? 'is now visible on site' : 'has been hidden'}`);
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProjectAction(id);
      showStatus('Project deleted');
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  // ── 3. REELS & SHORTS STATE ──
  const [editingReelId, setEditingReelId] = useState<number | null>(null);
  const [reelForm, setReelForm] = useState({
    title: '',
    videoUrl: '',
    badgeText: 'Shorts',
    isActive: true,
  });

  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelForm.videoUrl) return;
    setLoading(true);
    try {
      await saveReelAction({
        id: editingReelId || undefined,
        ...reelForm,
      });
      showStatus(editingReelId ? 'Reel updated!' : 'New Reel added!');
      setEditingReelId(null);
      setReelForm({ title: '', videoUrl: '', badgeText: 'Shorts', isActive: true });
      router.refresh();
    } catch (err: any) {
      showStatus(err.message || 'Error saving reel', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReel = async (id: number, currentStatus: boolean) => {
    try {
      await toggleReelStatusAction(id, !currentStatus);
      showStatus(`Reel ${!currentStatus ? 'is now visible on site' : 'has been hidden'}`);
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  const handleDeleteReel = async (id: number) => {
    if (!confirm('Delete this reel?')) return;
    try {
      await deleteReelAction(id);
      showStatus('Reel deleted');
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  // ── 4. EXPERIENCE STATE ──
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    duration: '',
    description: '',
    skillsInput: '',
    isActive: true,
  });

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.company || !expForm.role) return;
    setLoading(true);
    try {
      const skillsArray = expForm.skillsInput
        ? expForm.skillsInput.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      await saveExperienceAction({
        id: editingExpId || undefined,
        company: expForm.company,
        role: expForm.role,
        duration: expForm.duration,
        description: expForm.description,
        skills: skillsArray,
        isActive: expForm.isActive,
      });

      showStatus(editingExpId ? 'Experience updated!' : 'New Experience added!');
      setEditingExpId(null);
      setExpForm({ company: '', role: '', duration: '', description: '', skillsInput: '', isActive: true });
      router.refresh();
    } catch (err: any) {
      showStatus(err.message || 'Error saving experience', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExperience = async (id: number, currentStatus: boolean) => {
    try {
      await toggleExperienceStatusAction(id, !currentStatus);
      showStatus(`Experience ${!currentStatus ? 'is now visible on site' : 'has been hidden'}`);
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Delete this experience entry?')) return;
    try {
      await deleteExperienceAction(id);
      showStatus('Experience deleted');
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  // ── 5. REVIEWS STATE ──
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [reviewForm, setReviewForm] = useState({
    author: '',
    roleCompany: '',
    reviewText: '',
    rating: 5,
    isActive: true,
  });

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author || !reviewForm.reviewText) return;
    setLoading(true);
    try {
      await saveReviewAction({
        id: editingReviewId || undefined,
        ...reviewForm,
      });
      showStatus(editingReviewId ? 'Review updated!' : 'New Review added!');
      setEditingReviewId(null);
      setReviewForm({ author: '', roleCompany: '', reviewText: '', rating: 5, isActive: true });
      router.refresh();
    } catch (err: any) {
      showStatus(err.message || 'Error saving review', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReview = async (id: number, currentStatus: boolean) => {
    try {
      await toggleReviewStatusAction(id, !currentStatus);
      showStatus(`Review ${!currentStatus ? 'is now visible on site' : 'has been hidden'}`);
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    try {
      await deleteReviewAction(id);
      showStatus('Review deleted');
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };


  // ── 6. BRAND LOGOS STATE ──
  const [editingLogoId, setEditingLogoId] = useState<number | null>(null);
  const [logoForm, setLogoForm] = useState({
    name: '',
    imageUrl: '',
    isActive: true,
  });

  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoForm.name || !logoForm.imageUrl) return;
    setLoading(true);
    try {
      await saveLogoAction({
        id: editingLogoId || undefined,
        ...logoForm,
      });
      showStatus(editingLogoId ? 'Logo updated!' : 'New Brand Logo added!');
      setEditingLogoId(null);
      setLogoForm({ name: '', imageUrl: '', isActive: true });
      router.refresh();
    } catch (err: any) {
      showStatus(err.message || 'Error saving logo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLogo = async (id: number, currentStatus: boolean) => {
    try {
      await toggleLogoStatusAction(id, !currentStatus);
      showStatus(`Logo ${!currentStatus ? 'is now visible on site' : 'has been hidden'}`);
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  const handleDeleteLogo = async (id: number) => {
    if (!confirm('Delete this brand logo?')) return;
    try {
      await deleteLogoAction(id);
      showStatus('Logo deleted');
      router.refresh();
    } catch (err: any) {
      showStatus(err.message, 'error');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0b0f',
        color: '#e4e4e7',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── TOP NAV ── */}
      <header
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(15,15,20,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 800,
              background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ✦ Pawan Tetgure
          </div>
          <span
            style={{
              fontSize: '12px',
              background: 'rgba(124,58,237,0.2)',
              color: '#c4b5fd',
              padding: '4px 10px',
              borderRadius: '20px',
              fontWeight: 600,
            }}
          >
            ADMIN CMS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            👁️ View Public Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* ── NOTIFICATION TOAST ── */}
      {statusMessage && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '32px',
            zIndex: 1000,
            padding: '14px 24px',
            borderRadius: '12px',
            background: statusMessage.type === 'success' ? '#059669' : '#dc2626',
            color: '#fff',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* ── MAIN CONTENT & TABS ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '32px 24px' }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '16px',
            marginBottom: '32px',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'projects', label: '🎬 YouTube & Work Videos', count: data.projects?.length || 0 },
            { id: 'reels', label: '📱 Shorts & Reels', count: data.reels?.length || 0 },
            { id: 'experience', label: '💼 Experience', count: data.experiences?.length || 0 },
            { id: 'reviews', label: '⭐ Client Reviews', count: data.reviews?.length || 0 },
            { id: 'logos', label: '🏷️ Brand Logos', count: (data as any).logos?.length || 0 },
            { id: 'profile', label: '⚙️ Profile & Showreel', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab.id ? '#7c3aed' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#fff' : '#a1a1aa',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
              {tab.count !== null && (
                <span
                  style={{
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════ TAB 1: YOUTUBE & WORK VIDEOS ══════════ */}
        {activeTab === 'projects' && (
          <div>
            {/* Add / Edit Form */}
            <div
              style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '40px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                {editingProjectId ? '✏️ Edit YouTube Project' : '➕ Add New YouTube Video / Project'}
              </h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
                Paste any YouTube URL (`https://www.youtube.com/watch?v=...` or `https://youtu.be/...`). The embed code and high-resolution thumbnail are automatically generated!
              </p>

              <form onSubmit={handleSaveProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    YouTube Video URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=MUopjdqDxBw"
                    value={projectForm.videoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Project Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Film &amp; Commercial"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Reels">Reels &amp; Promo</option>
                    <option value="Corporate">Corporate &amp; Commercial</option>
                    <option value="Travel">Travel &amp; Vlog</option>
                    <option value="Wedding">Wedding Film</option>
                    <option value="Showreel">Showreel</option>
                    <option value="3D CGI">3D CGI &amp; VFX</option>
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked={projectForm.isActive}
                      onChange={(e) => setProjectForm({ ...projectForm, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Visible immediately on live site</span>
                  </label>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(null);
                          setProjectForm({ title: '', category: 'YouTube', videoUrl: '', thumbnailUrl: '', isActive: true });
                        }}
                        style={{
                          padding: '10px 18px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: '10px 24px',
                        background: '#7c3aed',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {editingProjectId ? 'Save Changes' : '+ Add Video'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* List of Existing Projects */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              All Videos ({data.projects?.length || 0}) — Toggle switch to hide or show on site
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {data.projects?.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    background: '#161620',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    opacity: item.isActive ? 1 : 0.6,
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                    <img
                      src={item.thumbnailUrl || 'https://img.youtube.com/vi/MUopjdqDxBw/hqdefault.jpg'}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: '#fff',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#71717a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.videoUrl}
                    </p>
                  </div>

                  {/* Actions & Hide/Show Switch */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <button
                      onClick={() => handleToggleProject(item.id, item.isActive)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: 'none',
                        background: item.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)',
                        color: item.isActive ? '#4ade80' : '#a1a1aa',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: item.isActive ? '#22c55e' : '#71717a',
                        }}
                      />
                      {item.isActive ? 'Visible' : 'Hidden'}
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setEditingProjectId(item.id);
                          setProjectForm({
                            title: item.title,
                            category: item.category,
                            videoUrl: item.videoUrl,
                            thumbnailUrl: item.thumbnailUrl || '',
                            isActive: item.isActive,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(255,255,255,0.06)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(item.id)}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(239,68,68,0.1)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#f87171',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ TAB 2: SHORTS & REELS ══════════ */}
        {activeTab === 'reels' && (
          <div>
            <div
              style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '40px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                {editingReelId ? '✏️ Edit Vertical Reel' : '➕ Add New Reel or Short'}
              </h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
                Paste YouTube Shorts link (`https://www.youtube.com/shorts/...`), Instagram Reel link (`https://www.instagram.com/reel/...`), or direct video URL.
              </p>

              <form onSubmit={handleSaveReel} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Reel / Short URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/shorts/eywjq1EJl6Y"
                    value={reelForm.videoUrl}
                    onChange={(e) => setReelForm({ ...reelForm, videoUrl: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Title / Caption (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Viral Motion Graphic Reel"
                    value={reelForm.title}
                    onChange={(e) => setReelForm({ ...reelForm, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="Shorts, Reel, TikTok"
                    value={reelForm.badgeText}
                    onChange={(e) => setReelForm({ ...reelForm, badgeText: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked={reelForm.isActive}
                      onChange={(e) => setReelForm({ ...reelForm, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Visible immediately on site</span>
                  </label>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {editingReelId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingReelId(null);
                          setReelForm({ title: '', videoUrl: '', badgeText: 'Shorts', isActive: true });
                        }}
                        style={{
                          padding: '10px 18px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: '10px 24px',
                        background: '#7c3aed',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {editingReelId ? 'Save Changes' : '+ Add Reel'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* List of Reels */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              All Vertical Reels ({data.reels?.length || 0})
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {data.reels?.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    background: '#161620',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    opacity: item.isActive ? 1 : 0.6,
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '9/16', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                    <img
                      src={item.thumbnailUrl || 'https://img.youtube.com/vi/eywjq1EJl6Y/hqdefault.jpg'}
                      alt={item.title || 'Reel'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: '#7c3aed',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: '#fff',
                      }}
                    >
                      {item.badgeText || 'Shorts'}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#a1a1aa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.videoUrl}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => handleToggleReel(item.id, item.isActive)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: 'none',
                        background: item.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)',
                        color: item.isActive ? '#4ade80' : '#a1a1aa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {item.isActive ? '● Visible' : '○ Hidden'}
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setEditingReelId(item.id);
                          setReelForm({
                            title: item.title || '',
                            videoUrl: item.videoUrl,
                            badgeText: item.badgeText || 'Shorts',
                            isActive: item.isActive,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(255,255,255,0.08)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReel(item.id)}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(239,68,68,0.15)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#f87171',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ TAB 3: EXPERIENCE ══════════ */}
        {activeTab === 'experience' && (
          <div>
            <div
              style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '40px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                {editingExpId ? '✏️ Edit Experience Entry' : '➕ Add Professional Experience'}
              </h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
                Add your career milestones, studio roles, and freelance positions.
              </p>

              <form onSubmit={handleSaveExperience} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mint Studio"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Role / Job Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Video Editor &amp; Motion Graphics Designer"
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Duration / Year Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024 - 2025 or Ongoing"
                    value={expForm.duration}
                    onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Skill Badges (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Premiere Pro, After Effects, 3D"
                    value={expForm.skillsInput}
                    onChange={(e) => setExpForm({ ...expForm, skillsInput: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Role Description &amp; Highlights
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe key responsibilities, client brand collaborations, and tools used..."
                    value={expForm.description}
                    onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked={expForm.isActive}
                      onChange={(e) => setExpForm({ ...expForm, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Visible immediately on site</span>
                  </label>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {editingExpId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExpId(null);
                          setExpForm({ company: '', role: '', duration: '', description: '', skillsInput: '', isActive: true });
                        }}
                        style={{
                          padding: '10px 18px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: '10px 24px',
                        background: '#7c3aed',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {editingExpId ? 'Save Changes' : '+ Add Experience'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* List of Experiences */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              Experience Timeline ({data.experiences?.length || 0})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.experiences?.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    background: '#161620',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '24px',
                    opacity: item.isActive ? 1 : 0.6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{item.company}</h4>
                      <p style={{ fontSize: '14px', color: '#a1a1aa' }}>{item.role}</p>
                    </div>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#ddd',
                      }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: 1.6, marginBottom: '16px' }}>
                    {item.description}
                  </p>

                  {item.skills && Array.isArray(item.skills) && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {item.skills.map((s: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          style={{
                            background: 'rgba(124,58,237,0.15)',
                            color: '#c4b5fd',
                            padding: '4px 10px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <button
                      onClick={() => handleToggleExperience(item.id, item.isActive)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: 'none',
                        background: item.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)',
                        color: item.isActive ? '#4ade80' : '#a1a1aa',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {item.isActive ? '● Visible on Site' : '○ Hidden'}
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setEditingExpId(item.id);
                          setExpForm({
                            company: item.company,
                            role: item.role,
                            duration: item.duration,
                            description: item.description,
                            skillsInput: (item.skills || []).join(', '),
                            isActive: item.isActive,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(255,255,255,0.08)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(item.id)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(239,68,68,0.15)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#f87171',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ TAB 4: REVIEWS ══════════ */}
        {activeTab === 'reviews' && (
          <div>
            <div
              style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '40px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                {editingReviewId ? '✏️ Edit Testimonial' : '➕ Add Client Testimonial'}
              </h2>

              <form onSubmit={handleSaveReview} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Author Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Desai"
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Role / Company *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Marketing · Mumbai"
                    value={reviewForm.roleCompany}
                    onChange={(e) => setReviewForm({ ...reviewForm, roleCompany: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Review / Testimonial Text *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What did the client say about your work?"
                    value={reviewForm.reviewText}
                    onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked={reviewForm.isActive}
                      onChange={(e) => setReviewForm({ ...reviewForm, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Visible immediately on site</span>
                  </label>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {editingReviewId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingReviewId(null);
                          setReviewForm({ author: '', roleCompany: '', reviewText: '', rating: 5, isActive: true });
                        }}
                        style={{
                          padding: '10px 18px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: '10px 24px',
                        background: '#7c3aed',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {editingReviewId ? 'Save Changes' : '+ Add Review'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* List of Reviews */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {data.reviews?.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    background: '#161620',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '20px',
                    opacity: item.isActive ? 1 : 0.6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '8px' }}>
                      {'★'.repeat(item.rating || 5)}
                    </div>
                    <p style={{ fontSize: '13px', color: '#d4d4d8', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '14px' }}>
                      "{item.reviewText}"
                    </p>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{item.author}</div>
                    <div style={{ fontSize: '11px', color: '#a1a1aa' }}>{item.roleCompany}</div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '16px',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <button
                      onClick={() => handleToggleReview(item.id, item.isActive)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: 'none',
                        background: item.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)',
                        color: item.isActive ? '#4ade80' : '#a1a1aa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {item.isActive ? '● Visible' : '○ Hidden'}
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setEditingReviewId(item.id);
                          setReviewForm({
                            author: item.author,
                            roleCompany: item.roleCompany,
                            reviewText: item.reviewText,
                            rating: item.rating || 5,
                            isActive: item.isActive,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(255,255,255,0.08)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(item.id)}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(239,68,68,0.15)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#f87171',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {/* ══════════ TAB 6: BRAND LOGOS ══════════ */}
        {activeTab === 'logos' && (
          <div>
            <div
              style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '40px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                {editingLogoId ? '✏️ Edit Brand Logo' : '➕ Add Partner Brand Logo'}
              </h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
                Add new partner brand logos to appear in the infinite scrolling logo carousel and the About page brands grid.
              </p>

              <form onSubmit={handleSaveLogo} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Godrej, Spotify, Jio, Parimatch"
                    value={logoForm.name}
                    onChange={(e) => setLogoForm({ ...logoForm, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                    Logo Image URL *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /assets/images/img_1.png or https://example.com/logo.png"
                    value={logoForm.imageUrl}
                    onChange={(e) => setLogoForm({ ...logoForm, imageUrl: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0d0d12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {logoForm.imageUrl && (
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                      Logo Preview:
                    </span>
                    <div style={{ width: '140px', height: '60px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                      <img src={logoForm.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>
                )}

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked={logoForm.isActive}
                      onChange={(e) => setLogoForm({ ...logoForm, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Visible immediately in brand carousel &amp; about grid</span>
                  </label>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {editingLogoId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLogoId(null);
                          setLogoForm({ name: '', imageUrl: '', isActive: true });
                        }}
                        style={{
                          padding: '10px 18px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: '10px 24px',
                        background: '#7c3aed',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {editingLogoId ? 'Save Changes' : '+ Add Brand Logo'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* List of Brand Logos */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              All Partner Logos ({(data as any).logos?.length || 0}) — Toggle switch to hide or show on site
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {(data as any).logos?.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    background: '#161620',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    opacity: item.isActive ? 1 : 0.6,
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '70px',
                      background: '#fff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px',
                    }}
                  >
                    <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>
                    {item.name}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      onClick={() => handleToggleLogo(item.id, item.isActive)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: 'none',
                        background: item.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)',
                        color: item.isActive ? '#4ade80' : '#a1a1aa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {item.isActive ? '● Visible' : '○ Hidden'}
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setEditingLogoId(item.id);
                          setLogoForm({
                            name: item.name,
                            imageUrl: item.imageUrl,
                            isActive: item.isActive,
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(255,255,255,0.08)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLogo(item.id)}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(239,68,68,0.15)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#f87171',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ TAB 5: PROFILE & SHOWREEL ══════════ */}
        {activeTab === 'profile' && (
          <div
            style={{
              background: '#13131a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
              ⚙️ Site Profile, Hero Text &amp; Showreel Video
            </h2>
            <p style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
              Change the main showreel video, hero headlines, availability badge, and contact information.
            </p>

            <form onSubmit={handleSaveConfig} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Main Showreel Video URL (YouTube / Vimeo / Direct)
                </label>
                <input
                  type="text"
                  value={configForm.showreelUrl}
                  onChange={(e) => setConfigForm({ ...configForm, showreelUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* Showreel Preview */}
              {configForm.showreelUrl && (
                <div style={{ gridColumn: 'span 2', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                    Showreel Preview:
                  </span>
                  <div style={{ maxWidth: '640px', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <iframe
                      src={configForm.showreelUrl}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={configForm.name}
                  onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Availability Badge Text
                </label>
                <input
                  type="text"
                  value={configForm.spotsText}
                  onChange={(e) => setConfigForm({ ...configForm, spotsText: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Hero Headline Line 1
                </label>
                <input
                  type="text"
                  value={configForm.heroTitleLine1}
                  onChange={(e) => setConfigForm({ ...configForm, heroTitleLine1: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Hero Headline Line 2
                </label>
                <input
                  type="text"
                  value={configForm.heroTitleLine2}
                  onChange={(e) => setConfigForm({ ...configForm, heroTitleLine2: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Hero Description / Bio
                </label>
                <textarea
                  rows={3}
                  value={configForm.heroDescription}
                  onChange={(e) => setConfigForm({ ...configForm, heroDescription: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={configForm.contactEmail}
                  onChange={(e) => setConfigForm({ ...configForm, contactEmail: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={configForm.contactPhone}
                  onChange={(e) => setConfigForm({ ...configForm, contactPhone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', textAlign: 'right', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 32px',
                    background: '#7c3aed',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Save Profile &amp; Showreel Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
