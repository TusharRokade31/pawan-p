import fs from 'fs';

// Let's create the comprehensive, 100% faithful PortfolioView.tsx
const code = `'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PortfolioProps {
  siteConfig: any;
  projects: any[];
  reels: any[];
  experiences: any[];
  reviews: any[];
  faqs: any[];
  logos: any[];
}

const wedoContent: Record<string, { title: string; text: string }> = {
  yt: {
    title: 'YouTube Videos',
    text: 'I create YouTube content that tells a story and holds attention. From compelling AI-powered intros and polished outros to precise, viewer-retention-focused edits — every video I deliver is built to grow your channel and keep audiences coming back.',
  },
  re: {
    title: 'Real Estate',
    text: 'I bring properties to life through cinematic video and 3D visualisation. From sweeping drone-integrated shots to photorealistic walkthrough animations — I help every property stand out and sell faster, even before construction is complete.',
  },
  tr: {
    title: 'Travel',
    text: "I capture the spirit of adventure through carefully curated footage, vibrant colour grades, and dynamic motion graphics. Whether it's a personal travel vlog or a destination campaign, I turn travel into cinematic stories that inspire viewers.",
  },
  wd: {
    title: 'Wedding Videos',
    text: "I believe every wedding has a unique story worth preserving. With 4+ years of editorial experience and a genuine passion for emotional storytelling, I transform your most memorable moments into a beautifully crafted film you'll treasure for life.",
  },
  co: {
    title: 'Corporate Videos',
    text: "I produce corporate videos that are polished, brand-aligned, and purposeful. From internal communications and product launches to investor presentations and brand films — I bring a professional editorial eye and 3D/AI-enhanced production to every frame.",
  },
  ai: {
    title: 'AI Editing',
    text: 'I leverage the latest AI tools to deliver faster, smarter results without sacrificing quality. Auto-cut, silence removal, AI-generated subtitles, scene detection, smart colour matching, and highlight reels — all AI-assisted, all human-reviewed.',
  },
  '3d': {
    title: '3D Animation',
    text: 'I design and animate stunning 3D motion graphics, logo sequences, product renders, and visual effects that add a cinematic dimension to your brand. From clean intro animations to full-scale 3D explainer videos — built entirely by me.',
  },
  '3denv': {
    title: '3D Environment',
    text: 'I build photorealistic 3D environments — from luxury real estate walkthroughs and architectural visualisations to virtual sets and branded digital worlds. Ideal for pre-launch marketing, investor presentations, and immersive brand experiences.',
  },
  cgi: {
    title: '3D Product CGI Ads',
    text: 'No shoot required. I create ultra-realistic 3D CGI product ads that exceed what traditional photography can achieve — ideal for e-commerce, brand campaigns, and social media. Bottles, electronics, jewellery, apparel and more, all rendered with cinematic precision.',
  },
  ev: {
    title: 'Event Videos',
    text: 'From corporate conferences and product launches to cultural events and charity galas — I capture every occasion with cinematic energy. Same-day edits, aftermovies, and highlight reels that genuinely relive the atmosphere and emotion of your event.',
  },
  promo: {
    title: 'Promotional Content',
    text: 'I produce high-impact promotional videos for product launches, seasonal campaigns, brand activations, and more. Combining sharp editing, motion graphics, and AI-enhanced visuals, I create content designed to turn viewers into customers.',
  },
};

export default function PortfolioView({
  siteConfig,
  projects = [],
  reels = [],
  experiences = [],
  reviews = [],
  faqs = [],
  logos = [],
}: PortfolioProps) {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'work' | 'terms'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({ 0: true });
  const [activeWedo, setActiveWedo] = useState<string>('yt');
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [inCardPlaying, setInCardPlaying] = useState<Record<string, string>>({});
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

  // Active items (filtered by isActive !== false)
  const activeProjects = projects.filter((p) => p.isActive !== false);
  const activeReels = reels.filter((r) => r.isActive !== false);
  const activeExperiences = experiences.filter((e) => e.isActive !== false);
  const activeReviews = reviews.filter((r) => r.isActive !== false);
  const activeFaqs = faqs.filter((f) => f.isActive !== false);
  const activeLogos = logos.filter((l) => l.isActive !== false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activePage, reviewsExpanded]);

  const showPage = (name: 'home' | 'about' | 'work' | 'terms', scrollId?: string) => {
    setActivePage(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (scrollId) {
      setTimeout(() => {
        const el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handlePlayVideo = (cardId: string, embedUrl: string) => {
    setInCardPlaying((prev) => ({ ...prev, [cardId]: embedUrl }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-logo" onClick={() => showPage('home')} style={{ cursor: 'pointer' }}>
          ✦ {siteConfig?.name || 'Pawan Tetgure'}
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); showPage('home'); }}>Home</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); showPage('about'); }}>About</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); showPage('work'); }}>Work</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); showPage('home', 'experience'); }}>Experience</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); showPage('home', 'contact'); }}>Contact</a>
          </li>
        </ul>
        <div className="nav-right">
          <div className="spots-badge">
            <span className="spots-dot"></span> {siteConfig?.spotsText || 'Available for Projects'}
          </div>
          <button
            className="nav-btn"
            onClick={() => showPage('home', 'contact')}
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* ══════════════ HOME PAGE ══════════════ */}
      <div className={\`page \${activePage === 'home' ? 'active' : ''}\`} id="page-home">
        {/* HERO */}
        <section className="hero">
          <div className="hero-blob-1"></div>
          <div className="hero-blob-2"></div>
          <div className="hero-inner">
            <h1>
              {siteConfig?.heroTitleLine1 || 'I Turn Ideas Into'}<br />
              {siteConfig?.heroTitleLine2 || 'Cinematic Visuals'}<br />
              {siteConfig?.heroTitleLine3 || 'That Move People.'}
            </h1>
            <p className="hero-desc">
              {siteConfig?.heroDescription ||
                "Video Editor & Motion Graphics Designer with 4+ years of experience crafting compelling stories for brands, creators, and studios. I specialise in work that doesn't just look good — it drives real results for my clients."}
            </p>
            <div className="hero-btns">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Hire Me{' '}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                View Portfolio{' '}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="hero-proof">
              <div className="av-stack">
                <div className="av" style={{ background: '#fde68a', color: '#78350f' }}>J</div>
                <div className="av" style={{ background: '#ddd6fe', color: '#5b21b6' }}>M</div>
                <div className="av" style={{ background: '#fecaca', color: '#991b1b' }}>L</div>
                <div className="av" style={{ background: '#d1fae5', color: '#065f46' }}>J</div>
                <div className="av" style={{ background: '#bfdbfe', color: '#1e40af' }}>M</div>
              </div>
              <p
                className="proof-text"
                dangerouslySetInnerHTML={{
                  __html: siteConfig?.proofText || 'Trusted by <b>15+ Major Brands</b> across India & globally',
                }}
              />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-gradient-l"></div>
          <div className="marquee-gradient-r"></div>
          <div className="marquee-inner">
            <div className="marquee-item">
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#a78bfa' }}></span>Video Editing</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#f472b6' }}></span>Event Coverage</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#34d399' }}></span>After Effects</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#60a5fa' }}></span>Premiere Pro</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#fbbf24' }}></span>3D Visuals</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#f87171' }}></span>Photoshop</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#a78bfa' }}></span>Visual Storytelling</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#34d399' }}></span>Brand Videos</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#60a5fa' }}></span>Social Media Content</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#f87171' }}></span>Corporate Films</span>
            </div>
            <div className="marquee-item">
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#a78bfa' }}></span>Video Editing</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#f472b6' }}></span>Event Coverage</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#34d399' }}></span>After Effects</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#60a5fa' }}></span>Premiere Pro</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#fbbf24' }}></span>3D Visuals</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#f87171' }}></span>Photoshop</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#a78bfa' }}></span>Visual Storytelling</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#34d399' }}></span>Brand Videos</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#60a5fa' }}></span>Social Media Content</span>
              <span className="mq-tag"><span className="mq-dot" style={{ background: '#f87171' }}></span>Corporate Films</span>
            </div>
          </div>
        </div>

        {/* COMPANY ABOUT STRIP */}
        <div className="about-strip">
          <div className="about-strip-inner">
            <div className="about-strip-left reveal-left">
              <div className="strip-eyebrow">About Me</div>
              <h2>
                {siteConfig?.name || 'Pawan Tetgure'} — <span>Video Editor</span> &amp; Motion Graphics Designer.
              </h2>
              <p>
                I'm {siteConfig?.name || 'Pawan Tetgure'}, a passionate Video Editor &amp; Motion Graphics Designer based in Virar, Maharashtra. With 4+ years of professional experience, I specialise in crafting visuals that tell stories, build brands, and resonate with audiences — using Adobe Premiere Pro, After Effects, and Photoshop.
              </p>
              <p>
                I've had the privilege of collaborating with major brands including Godrej, Jio, Parimatch, Spotify, and TEDx. From corporate films to entertainment content, every project I take on is approached with precision, creativity, and genuine care for the result.
              </p>
              <div className="about-strip-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                4+ Years of Professional Experience
              </div>
              <div className="about-strip-pills">
                <span className="about-strip-pill">🎬 Video Editing</span>
                <span className="about-strip-pill">🎨 Motion Graphics</span>
                <span className="about-strip-pill">🎞️ After Effects</span>
                <span className="about-strip-pill">🖼️ Photoshop</span>
                <span className="about-strip-pill">🎬 Premiere Pro</span>
                <span className="about-strip-pill">🎭 3D Visuals</span>
              </div>
            </div>
            <div className="about-strip-right reveal delay-1">
              <div className="about-stat-card">
                <div className="asc-num">4<span>+</span></div>
                <div className="asc-label">Years of professional experience in video production</div>
              </div>
              <div className="about-stat-card">
                <div className="asc-num">15<span>+</span></div>
                <div className="asc-label">Major brands collaborated with including Godrej, Jio, Spotify</div>
              </div>
              <div className="about-stat-card">
                <div className="asc-num">6<span>+</span></div>
                <div className="asc-label">Software tools mastered: Premiere Pro, After Effects, Photoshop, Blender, Davinci Resolve</div>
              </div>
              <div className="about-stat-card">
                <div className="asc-num">100<span>+</span></div>
                <div className="asc-label">Projects delivered for brands, events, and entertainment</div>
              </div>
            </div>
          </div>

          {/* Showreel Video */}
          <div className="about-video-section reveal delay-2">
            <div style={{ width: '100%', maxWidth: '1000px' }}>
              <div className="about-video-label">
                <div className="video-eyebrow">Showreel</div>
                <h3>Watch My <span>Work in Action</span></h3>
              </div>
              <div className="about-video-wrap">
                <iframe
                  src={siteConfig?.showreelUrl || 'https://www.youtube.com/embed/ZPHeY2wErnQ'}
                  title="Pawan Tetgure - Video Editor & Motion Graphics Designer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* ─── DYNAMIC EXPERIENCE SECTION ─── */}
        <section className="section experience-section" id="experience">
          <div className="sec-inner">
            <div className="sec-eyebrow reveal">Experience</div>
            <h2 className="sec-title reveal delay-1">Where I've<br />Made an Impact.</h2>
            <p className="sec-subtitle reveal delay-2">
              My professional journey across media studios, production companies, and independent freelance projects.
            </p>

            <div className="experience-list" style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {activeExperiences.map((exp: any, idx: number) => (
                <div
                  key={exp.id || idx}
                  className={\`exp-card reveal delay-\${(idx % 5) + 1}\`}
                  style={{
                    background: '#fafafa',
                    border: '1px solid #f0f0f0',
                    borderRadius: '16px',
                    padding: '32px',
                    transition: 'border-color .25s,box-shadow .25s,transform .25s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111', letterSpacing: '-0.5px' }}>
                        {exp.company}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{exp.role}</p>
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#999',
                        background: '#f5f5f5',
                        padding: '6px 14px',
                        borderRadius: '20px',
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7 }}>{exp.description}</p>
                  {exp.skills && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                      {(Array.isArray(exp.skills) ? exp.skills : JSON.parse(exp.skills || '[]')).map((s: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#555',
                            background: '#f0f0f0',
                            padding: '5px 12px',
                            borderRadius: '20px',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DYNAMIC CLIENT SHOWCASE (BRAND LOGOS) ─── */}
        <section className="client-showcase" id="clients">
          <div className="client-showcase-inner">
            <div className="client-header reveal">
              <div className="client-eyebrow">Trusted Partners</div>
              <h2 className="client-title">Brands I've <span>Had the Privilege to Work With</span></h2>
              <p className="client-subtitle">
                From entertainment powerhouses to corporate giants, I've partnered with leading brands to craft compelling visual stories that represent their identity with impact.
              </p>
            </div>

            {/* Row 1 Infinite Carousel */}
            <div className="logo-carousel-wrap reveal delay-1">
              <div className="logo-track">
                {activeLogos.concat(activeLogos).map((logo: any, idx: number) => (
                  <div className="logo-item" key={\`row1-\${logo.id || idx}-\${idx}\`}>
                    <img src={logo.imageUrl} alt={logo.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 Infinite Carousel (Reverse) */}
            <div className="logo-carousel-wrap reverse reveal delay-2">
              <div className="logo-track-reverse">
                {activeLogos.slice().reverse().concat(activeLogos.slice().reverse()).map((logo: any, idx: number) => (
                  <div className="logo-item" key={\`row2-\${logo.id || idx}-\${idx}\`}>
                    <img src={logo.imageUrl} alt={logo.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── AI + 3D TECH STRIP ─── */}
        <div className="tech-strip" id="tech">
          <div className="tech-strip-inner">
            <div className="tech-strip-label reveal">Tools &amp; Capabilities</div>
            <div className="tech-grid">
              <div className="tech-card reveal delay-1">
                <span className="tech-icon">🎬</span>
                <div className="tech-name">Adobe Premiere Pro</div>
                <div className="tech-desc">Precision editorial cuts, narrative pacing, multi-cam sync, and timeline workflow mastery.</div>
                <span className="tech-tag ai">Editing</span>
              </div>
              <div className="tech-card reveal delay-2">
                <span className="tech-icon">🎨</span>
                <div className="tech-name">After Effects</div>
                <div className="tech-desc">Cinematic titles, 2D/3D kinetic typography, visual effects, and advanced motion design.</div>
                <span className="tech-tag ai">Motion</span>
              </div>
              <div className="tech-card reveal delay-3">
                <span className="tech-icon">🧊</span>
                <div className="tech-name">Blender &amp; 3D CGI</div>
                <div className="tech-desc">Photorealistic 3D product ads, procedural shaders, lighting, and virtual environment creation.</div>
                <span className="tech-tag three">3D Design</span>
              </div>
              <div className="tech-card reveal delay-4">
                <span className="tech-icon">⚡</span>
                <div className="tech-name">DaVinci Resolve</div>
                <div className="tech-desc">Industry-standard color grading, node-based correction, film look emulation, and final mastering.</div>
                <span className="tech-tag three">Color</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── DYNAMIC REVIEWS SECTION ─── */}
        <section className="section reviews-section" id="reviews">
          <div className="sec-inner">
            <div className="sec-eyebrow reveal">Client Feedback</div>
            <h2 className="sec-title reveal delay-1">Trusted by Brands &amp; Creators.</h2>
            <p className="sec-subtitle reveal delay-2">Real testimonials from directors, founders, and creators I've had the pleasure to partner with.</p>

            <div className="reviews-masonry" id="reviewsGrid">
              {activeReviews.map((rev: any, idx: number) => {
                const isHiddenInitially = idx >= 4;
                if (isHiddenInitially && !reviewsExpanded) return null;

                return (
                  <div
                    key={rev.id || idx}
                    className={\`review-card reveal delay-\${(idx % 4) + 1}\`}
                  >
                    <span className="review-tag video">
                      {idx % 3 === 0 ? 'Video Editing' : idx % 3 === 1 ? '3D CGI' : 'Event Coverage'}
                    </span>
                    <div className="review-stars">
                      {'★'.repeat(rev.rating || 5)}{'☆'.repeat(5 - (rev.rating || 5))}
                    </div>
                    <p className="review-text">"{rev.reviewText}"</p>
                    <div className="review-author">
                      <div
                        className="rev-av"
                        style={{
                          background: rev.avatarBg || '#ede9fe',
                          color: '#5b21b6',
                        }}
                      >
                        {rev.avatarInitials || (rev.author ? rev.author.charAt(0).toUpperCase() : 'P')}
                      </div>
                      <div>
                        <div className="rev-name">{rev.author}</div>
                        <div className="rev-role">{rev.roleCompany}</div>
                      </div>
                    </div>
                    <p className="review-project">📌 Client Verified Project</p>
                  </div>
                );
              })}
            </div>

            {activeReviews.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <button
                  className="show-more-btn"
                  id="showMoreBtn"
                  onClick={() => setReviewsExpanded(!reviewsExpanded)}
                >
                  {reviewsExpanded ? 'Show Less' : 'View More Reviews'}{' '}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points={reviewsExpanded ? '6 15 12 9 18 15' : '6 9 12 15 18 9'} />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── DYNAMIC SELECTED WORK SECTION ─── */}
        <section className="section work-section" id="work">
          <div className="sec-inner">
            <div className="sec-eyebrow reveal">Selected Work</div>
            <h2 className="sec-title reveal delay-1">Projects I'm Proud Of</h2>
            <div className="work-grid">
              {activeProjects.slice(0, 6).map((proj: any, idx: number) => {
                const cardKey = \`work-\${proj.id || idx}\`;
                const isPlaying = inCardPlaying[cardKey];

                return (
                  <div
                    key={proj.id || idx}
                    className={\`work-card reveal delay-\${(idx % 4) + 1}\`}
                    style={{ position: 'relative' }}
                    onClick={() => {
                      if (!isPlaying) handlePlayVideo(cardKey, proj.embedUrl || proj.videoUrl);
                    }}
                  >
                    {isPlaying ? (
                      <iframe
                        src={isPlaying}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: 'inherit',
                          zIndex: 10,
                        }}
                      />
                    ) : (
                      <>
                        <div className="work-thumb-placeholder">
                          <img
                            src={proj.thumbnailUrl || \`https://img.youtube.com/vi/MUopjdqDxBw/hqdefault.jpg\`}
                            className="work-thumb"
                            alt={proj.title || 'Project'}
                          />
                        </div>
                        <div className="thumb-overlay">
                          <div className="play-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                showPage('work');
              }}
              className="view-more-btn reveal"
            >
              view more →
            </a>
          </div>
        </section>

        {/* ─── DYNAMIC VERTICAL SHORTS & REELS ─── */}
        <section className="shorts-section" id="shorts">
          <div className="shorts-inner">
            <div className="sec-eyebrow reveal">Vertical Content</div>
            <h2 className="sec-title reveal delay-1">Shorts &amp; Reels</h2>
            <p className="sec-subtitle reveal delay-2" style={{ marginBottom: 0 }}>
              Scroll-stopping vertical content built for YouTube Shorts, Instagram Reels &amp; TikTok — crafted to hook in the first 3 seconds.
            </p>

            {/* Desktop Grid */}
            <div className="shorts-grid">
              {activeReels.map((reel: any, idx: number) => {
                const reelKey = \`reel-\${reel.id || idx}\`;
                const isPlaying = inCardPlaying[reelKey];

                return (
                  <div
                    key={reel.id || idx}
                    className={\`short-card reveal delay-\${(idx % 5) + 1}\`}
                    style={{ position: 'relative' }}
                    onClick={() => {
                      if (!isPlaying) handlePlayVideo(reelKey, reel.embedUrl || reel.videoUrl);
                    }}
                  >
                    {isPlaying ? (
                      <iframe
                        src={isPlaying}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: 'inherit',
                          zIndex: 10,
                        }}
                      />
                    ) : (
                      <div className="short-thumb-wrap">
                        <img
                          src={reel.thumbnailUrl || 'https://img.youtube.com/vi/eywjq1EJl6Y/hqdefault.jpg'}
                          alt={reel.title || 'Short'}
                        />
                        <div className="short-overlay">
                          <div className="short-play">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#111">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                        </div>
                        <div className="short-badge">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                          {reel.badgeText || 'Shorts'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Scroll */}
            <div className="shorts-scroll-mobile shorts-scroll">
              {activeReels.map((reel: any, idx: number) => (
                <div
                  key={\`mobile-\${reel.id || idx}\`}
                  className="short-card"
                  onClick={() => handlePlayVideo(\`reel-\${reel.id || idx}\`, reel.embedUrl || reel.videoUrl)}
                >
                  <div className="short-thumb-wrap">
                    <img src={reel.thumbnailUrl} alt={reel.title || 'Short'} />
                    <div className="short-overlay">
                      <div className="short-play">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#111">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                    <div className="short-badge">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                      {reel.badgeText || 'Shorts'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS SECTION ─── */}
        <section className="section process-section">
          <div className="sec-inner">
            <div className="sec-eyebrow reveal">My Process</div>
            <h2 className="sec-title reveal delay-1">How We Bring Your<br />Vision to Life.</h2>
            <div className="process-grid">
              <div className="process-card reveal delay-1">
                <div className="process-num">01</div>
                <div className="process-name">Discovery &amp; Concept</div>
                <p className="process-desc">We align on the creative vision, objectives, target audience, and key messaging to establish a solid direction.</p>
              </div>
              <div className="process-card reveal delay-2">
                <div className="process-num">02</div>
                <div className="process-name">Rough Cut &amp; Story</div>
                <p className="process-desc">Crafting the narrative spine, selecting the best takes, setting pacing, and ensuring the story hooks from frame one.</p>
              </div>
              <div className="process-card reveal delay-3">
                <div className="process-num">03</div>
                <div className="process-name">Motion &amp; Visual FX</div>
                <p className="process-desc">Adding dynamic motion graphics, typography, 3D elements, CGI, and kinetic energy that elevates the visual polish.</p>
              </div>
              <div className="process-card reveal delay-4">
                <div className="process-num">04</div>
                <div className="process-name">Color, Sound &amp; Deliver</div>
                <p className="process-desc">Color grading, audio mixing, sound design effects, and exporting high-bitrate masters for every platform format.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHAT WE DO TABS ─── */}
        <section className="section wedo-section" id="about">
          <div className="sec-inner">
            <div className="sec-eyebrow reveal">Specialisations</div>
            <h2 className="sec-title reveal delay-1">What I Do Best</h2>
            <div className="wedo-tabs reveal delay-1">
              {Object.keys(wedoContent).map((key) => (
                <button
                  key={key}
                  className={\`wedo-tab \${activeWedo === key ? 'active' : ''}\`}
                  onClick={() => setActiveWedo(key)}
                >
                  {wedoContent[key].title}
                </button>
              ))}
            </div>
            <div className="wedo-panel reveal delay-2" id="wedo-panel">
              <h3>{wedoContent[activeWedo]?.title}</h3>
              <p>{wedoContent[activeWedo]?.text}</p>
            </div>
          </div>
        </section>

        {/* ─── DYNAMIC FAQ SECTION ─── */}
        <section className="section faq-section" id="faq">
          <div className="sec-inner">
            <div className="sec-eyebrow reveal">Common Questions</div>
            <h2 className="sec-title reveal delay-1">Frequently Asked Questions</h2>
            <div className="faq-list">
              {activeFaqs.map((faq: any, idx: number) => {
                const isOpen = Boolean(openFaqIndices[idx]);
                return (
                  <div
                    key={faq.id || idx}
                    className={\`faq-item reveal \${isOpen ? 'open' : ''}\`}
                  >
                    <button className="faq-q" onClick={() => toggleFaq(idx)}>
                      {faq.question}
                      <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div
                      className="faq-a"
                      style={{
                        maxHeight: isOpen ? '300px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                      }}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA SECTION ─── */}
        <section className="cta-section">
          <div className="cta-inner reveal">
            <div className="cta-pills">
              <span className="cta-pill">Visual Storytelling</span>
              <span className="cta-pill">Filming</span>
              <span className="cta-pill">Social Media Content</span>
              <span className="cta-pill">Brand Videos</span>
              <span className="cta-pill">Motion Graphics</span>
            </div>
            <h2 className="cta-title">Ready to Collaborate?<br />I'd Love to Hear About Your Project.</h2>
            <p className="cta-sub">Whether you have a detailed brief or just a rough idea, let's start the conversation.</p>
            <p className="cta-sub2">Book a free 30-minute discovery call</p>
            <a href="https://cal.com/pawan-tetgure-ajrfbi/quick-discovery-call" target="_blank" rel="noopener noreferrer" className="cta-btn">
              Book now →
            </a>
          </div>
        </section>

        {/* ─── EXACT ORIGINAL CONTACT SECTION ─── */}
        <section className="contact-section" id="contact">
          <div className="contact-inner">
            <div className="sec-eyebrow reveal">Contact</div>
            <h2 className="sec-title reveal delay-1">Let's Work Together</h2>
            <p className="sec-subtitle reveal delay-2">I'm currently available for new projects. Reach out and I'll get back to you promptly.</p>
            <div style={{ marginTop: '40px', maxWidth: '480px' }}>
              <div className="contact-info reveal delay-1">
                <a href={\`tel:\${siteConfig?.contactPhone || '+918291649066'}\`} className="contact-item">
                  <div className="contact-icon phone">📞</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">{siteConfig?.contactPhone || '+91 82916 49066'}</div>
                  </div>
                </a>
                <a href={\`mailto:\${siteConfig?.contactEmail || 'pawantetgure03@gmail.com'}\`} className="contact-item">
                  <div className="contact-icon email">✉️</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{siteConfig?.contactEmail || 'pawantetgure03@gmail.com'}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════ ABOUT PAGE ══════════════ */}
      <div className={\`page \${activePage === 'about' ? 'active' : ''}\`} id="page-about">
        <section className="about-hero" style={{ paddingTop: '100px' }}>
          <div className="about-hero-inner">
            <div>
              <div className="about-tag">About Me</div>
              <h1 className="about-h1">Crafting stories that move<br />people, one frame at a time.</h1>
              <p className="about-desc">
                I'm {siteConfig?.name || 'Pawan Tetgure'}, a Video Editor &amp; Motion Graphics Designer based in Virar, Maharashtra. With 4+ years of professional experience and 100+ completed projects across industries, I bring a trained editorial eye and a genuine passion for visual storytelling to every brief I receive. My core toolkit is Adobe Premiere Pro, After Effects, and Photoshop — but my real skill is understanding what a story needs and knowing how to tell it. Whether you need social media content, corporate films, event coverage, motion graphics, or 3D visualisations, I'll take your project further than you expect.
              </p>
            </div>
            <div className="about-img">🎬</div>
          </div>
        </section>

        {/* STATS STRIP */}
        <div style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '64px 52px' }}>
          <div className="about-stats-inner">
            <div className="stat-block reveal"><div className="stat-num">4+</div><div className="stat-label">Years of Experience</div></div>
            <div className="stat-block reveal delay-1"><div className="stat-num">100+</div><div className="stat-label">Completed Projects</div></div>
            <div className="stat-block reveal delay-2"><div className="stat-num">15+</div><div className="stat-label">Major Brands</div></div>
            <div className="stat-block reveal delay-3"><div className="stat-num">6+</div><div className="stat-label">Software Tools</div></div>
          </div>
        </div>

        {/* VALUES SECTION */}
        <section className="values-section">
          <div className="values-inner">
            <div className="sec-eyebrow reveal">My Values</div>
            <h2 className="sec-title reveal delay-1">The Principles Behind<br />Every Project I Take On.</h2>
            <div className="values-grid">
              <div className="value-card reveal delay-1">
                <div className="val-num">01</div>
                <div className="val-title">Creativity</div>
                <p className="val-desc">I bring genuine creative thinking to every project. My goal is never just to execute a brief — it's to find the most compelling way to tell your story, with originality and visual impact that sets your content apart.</p>
              </div>
              <div className="value-card reveal delay-2">
                <div className="val-num">02</div>
                <div className="val-title">Quality</div>
                <p className="val-desc">I hold every deliverable to a high standard, from the first rough cut to the final export. Quality is non-negotiable — my clients come back because they know what they'll receive will be polished, professional, and worth sharing.</p>
              </div>
              <div className="value-card reveal delay-3">
                <div className="val-num">03</div>
                <div className="val-title">Collaboration</div>
                <p className="val-desc">I work closely with every client to understand not just what they want, but why they want it. The best creative results come from genuine dialogue — where your vision and my expertise meet in the middle.</p>
              </div>
              <div className="value-card reveal delay-4">
                <div className="val-num">04</div>
                <div className="val-title">Integrity</div>
                <p className="val-desc">I'm straightforward about timelines, capabilities, and feedback. Honest communication and transparency are the foundation of every client relationship I build — because long-term trust matters more than any single project.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT BRANDS SECTION (DYNAMIC LOGOS) */}
        <section className="about-brands-section">
          <div className="about-brands-inner">
            <p className="brands-label">Brands I've Worked With</p>
            <h2 className="brands-sub">Some of the Names I'm Proud to Have on My Resume.</h2>
            <div className="brands-logo-grid">
              {activeLogos.map((l: any) => (
                <div className="brand-logo-item" key={l.id}>
                  <img src={l.imageUrl} alt={l.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT CONTACT INFO */}
        <section style={{ padding: '64px 52px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <div className="sec-eyebrow reveal">Get in touch</div>
              <h2 className="sec-title reveal delay-1" style={{ fontSize: '36px' }}>Contact Us</h2>
              <div className="contact-info reveal delay-2" style={{ marginTop: '32px' }}>
                <a href={\`tel:\${siteConfig?.contactPhone || '+918291649066'}\`} className="contact-item">
                  <div className="contact-icon phone">📞</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">{siteConfig?.contactPhone || '+91 82916 49066'}</div>
                  </div>
                </a>
                <a href={\`mailto:\${siteConfig?.contactEmail || 'pawantetgure03@gmail.com'}\`} className="contact-item">
                  <div className="contact-icon email">✉️</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{siteConfig?.contactEmail || 'pawantetgure03@gmail.com'}</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="reveal delay-2">
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Business Hours</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>Monday – Saturday: 9am to 7pm IST</div>
              <div style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>Sunday: Available for urgent projects</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Address</div>
              <div style={{ fontSize: '15px', color: '#555', lineHeight: 1.7, marginBottom: '24px' }}>{siteConfig?.contactLocation || 'Virar, Maharashtra, India'}</div>
            </div>
          </div>
        </section>

        {/* ABOUT FAQ */}
        <section className="section faq-section">
          <div className="sec-inner">
            <div className="faq-header reveal">
              <p className="faq-tag">Frequently asked questions</p>
              <h2 className="faq-title">You have questions.<br />We have answers.</h2>
              <p className="faq-sub">Find answers to frequently asked questions about Pawan Tetgure, our services, and how we work.</p>
            </div>
            <div className="faq-list">
              {activeFaqs.map((faq: any, idx: number) => {
                const isOpen = Boolean(openFaqIndices[idx]);
                return (
                  <div key={faq.id || idx} className={\`faq-item reveal \${isOpen ? 'open' : ''}\`}>
                    <button className="faq-q" onClick={() => toggleFaq(idx)}>
                      {faq.question} <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className="faq-a" style={{ maxHeight: isOpen ? '300px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT CTA */}
        <section className="cta-section">
          <div className="cta-inner reveal">
            <div className="cta-pills">
              <span className="cta-pill">Visual Storytelling</span>
              <span className="cta-pill">Filming</span>
              <span className="cta-pill">Social Media Content</span>
              <span className="cta-pill">Brand Videos</span>
              <span className="cta-pill">Motion Graphics</span>
            </div>
            <h2 className="cta-title">Ready to Collaborate?<br />I'd Love to Hear About Your Project.</h2>
            <p className="cta-sub">Whether you have a detailed brief or just a rough idea, let's start the conversation.</p>
            <p className="cta-sub2">Book a free 30-minute discovery call</p>
            <a href="https://cal.com/pawan-tetgure-ajrfbi/quick-discovery-call" target="_blank" rel="noopener noreferrer" className="cta-btn">Book now →</a>
          </div>
        </section>
      </div>

      {/* ══════════════ WORK PAGE ══════════════ */}
      <div className={\`page \${activePage === 'work' ? 'active' : ''}\`} id="page-work">
        <section className="work-page-hero" style={{ paddingTop: '100px' }}>
          <div className="reveal">
            <div className="about-tag" style={{ justifyContent: 'center' }}>Portfolio</div>
            <h1>My Work</h1>
            <p>A curated selection of projects across video editing, motion graphics, 3D, and more — each one crafted with precision and purpose.</p>
          </div>
        </section>

        <section className="work-cats-section">
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 52px 80px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
              {activeProjects.map((proj: any, idx: number) => {
                const cardKey = \`workpage-\${proj.id || idx}\`;
                const isPlaying = inCardPlaying[cardKey];

                return (
                  <div
                    key={proj.id || idx}
                    className={\`work-thumb-card reveal delay-\${(idx % 4) + 1}\`}
                    style={{ position: 'relative' }}
                    onClick={() => {
                      if (!isPlaying) handlePlayVideo(cardKey, proj.embedUrl || proj.videoUrl);
                    }}
                  >
                    {isPlaying ? (
                      <iframe
                        src={isPlaying}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: 'inherit',
                          zIndex: 10,
                        }}
                      />
                    ) : (
                      <>
                        <div className="wt-img">
                          <img
                            src={proj.thumbnailUrl || 'https://img.youtube.com/vi/MUopjdqDxBw/hqdefault.jpg'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={proj.title || 'Work'}
                          />
                        </div>
                        <div className="wt-overlay">
                          <div className="wt-play">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#111">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORK PAGE SHORTS */}
        <section className="shorts-section" style={{ borderTop: '1px solid #f0f0f0' }}>
          <div className="shorts-inner">
            <div className="sec-eyebrow reveal">Vertical Content</div>
            <h2 className="sec-title reveal delay-1">Shorts &amp; Reels</h2>
            <p className="sec-subtitle reveal delay-2" style={{ marginBottom: 0 }}>Scroll-stopping vertical content built for YouTube Shorts, Instagram Reels &amp; TikTok.</p>
            <div className="shorts-grid" style={{ marginTop: '48px' }}>
              {activeReels.map((reel: any, idx: number) => {
                const reelKey = \`workreel-\${reel.id || idx}\`;
                const isPlaying = inCardPlaying[reelKey];

                return (
                  <div
                    key={reel.id || idx}
                    className={\`short-card reveal delay-\${(idx % 5) + 1}\`}
                    style={{ position: 'relative' }}
                    onClick={() => {
                      if (!isPlaying) handlePlayVideo(reelKey, reel.embedUrl || reel.videoUrl);
                    }}
                  >
                    {isPlaying ? (
                      <iframe
                        src={isPlaying}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: 'inherit',
                          zIndex: 10,
                        }}
                      />
                    ) : (
                      <div className="short-thumb-wrap">
                        <img src={reel.thumbnailUrl} alt={reel.title || 'Short'} />
                        <div className="short-overlay">
                          <div className="short-play">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#111">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                        </div>
                        <div className="short-badge">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                          {reel.badgeText || 'Shorts'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORK CTA */}
        <section className="cta-section">
          <div className="cta-inner reveal">
            <div className="cta-pills"><span className="cta-pill">Visual Storytelling</span><span className="cta-pill">Filming</span><span className="cta-pill">Social Media Content</span><span className="cta-pill">Brand Videos</span><span className="cta-pill">Motion Graphics</span></div>
            <h2 className="cta-title">Like What You See?<br />Let's Create Something Together.</h2>
            <p className="cta-sub">I'm always open to exciting new projects. Share your brief and let's see what we can build.</p>
            <p className="cta-sub2">Book a free 30-minute discovery call</p>
            <a href="https://cal.com/pawan-tetgure-ajrfbi/quick-discovery-call" target="_blank" rel="noopener noreferrer" className="cta-btn">Book now →</a>
          </div>
        </section>

        {/* WORK FAQ */}
        <section className="section faq-section">
          <div className="sec-inner">
            <div className="faq-header reveal">
              <p className="faq-tag">Frequently Asked Questions</p>
              <h2 className="faq-title">Questions about my work?<br />I have answers.</h2>
              <p className="faq-sub">Everything you need to know about working with me — from turnaround times and revision policy to how I handle complex projects.</p>
            </div>
            <div className="faq-list">
              {activeFaqs.map((faq: any, idx: number) => {
                const isOpen = Boolean(openFaqIndices[idx]);
                return (
                  <div key={faq.id || idx} className={\`faq-item reveal \${isOpen ? 'open' : ''}\`}>
                    <button className="faq-q" onClick={() => toggleFaq(idx)}>
                      {faq.question} <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className="faq-a" style={{ maxHeight: isOpen ? '300px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════ TERMS PAGE (FULL 11 SECTIONS INTACT) ══════════════ */}
      <div className={\`page \${activePage === 'terms' ? 'active' : ''}\`} id="page-terms">
        <section className="terms-hero">
          <div className="reveal">
            <div className="about-tag" style={{ justifyContent: 'center' }}>Legal</div>
            <h1>Terms &amp; Service</h1>
            <p>Please read these terms carefully before using Pawan Tetgure's services. By engaging with us, you agree to be bound by the following terms and conditions.</p>
          </div>
        </section>

        <div className="terms-body">
          <div className="terms-inner">
            <p className="terms-last-updated">Last Updated: April 2025</p>

            <div className="terms-toc reveal">
              <h4>Table of Contents</h4>
              <ol>
                <li>Acceptance of Terms</li>
                <li>Services Provided</li>
                <li>Client Responsibilities &amp; Content Ownership</li>
                <li>Third-Party Logos &amp; Brand Assets — Disclaimer</li>
                <li>Intellectual Property</li>
                <li>Payment &amp; Refund Policy</li>
                <li>Confidentiality</li>
                <li>Limitation of Liability</li>
                <li>Termination</li>
                <li>Governing Law</li>
                <li>Contact Information</li>
              </ol>
            </div>

            {/* 1 */}
            <div className="terms-section reveal">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing this website, placing an order, or using any services offered by <strong>Pawan Tetgure</strong> ("we," "us," or "our"), you ("Client") agree to these Terms of Service in full. If you do not agree, please discontinue use of our services immediately.</p>
              <p>Pawan Tetgure is a video editing agency operated by Pawan Tetgure, based in Mumbai, Maharashtra, India. These terms govern all services rendered by Pawan Tetgure to any client worldwide.</p>
            </div>

            {/* 2 */}
            <div className="terms-section reveal">
              <h2>2. Services Provided</h2>
              <p>Pawan Tetgure offers professional video editing, motion graphics, 3D animation, AI-powered editing, color grading, subtitle generation, and related creative services. Specific deliverables are outlined in your chosen plan or custom project agreement.</p>
              <ul>
                <li>All services are provided on a subscription or per-project basis as agreed upon at the time of purchase.</li>
                <li>Turnaround times are estimates and may vary depending on project complexity and workload.</li>
                <li>Pawan Tetgure reserves the right to decline any project that conflicts with our values or violates applicable law.</li>
              </ul>
            </div>

            {/* 3 */}
            <div className="terms-section reveal">
              <h2>3. Client Responsibilities &amp; Content Ownership</h2>
              <p>The client is solely responsible for ensuring they have full legal rights to all raw footage, audio, images, music, and other materials submitted to Pawan Tetgure for editing.</p>
              <ul>
                <li>By submitting content, you represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to submit such content.</li>
                <li>Pawan Tetgure is not responsible for any copyright or intellectual property violations arising from client-supplied materials.</li>
                <li>The client indemnifies and holds Pawan Tetgure harmless from any claims, damages, or expenses arising from client-supplied content.</li>
              </ul>
              <div className="terms-highlight">
                <p>⚠️ <strong>Important:</strong> Pawan Tetgure acts solely as a service provider (editor/creator). Any legal responsibility regarding raw content ownership rests entirely with the client who submitted the content.</p>
              </div>
            </div>

            {/* 4 */}
            <div className="terms-section reveal">
              <h2>4. Third-Party Logos &amp; Brand Assets — Disclaimer</h2>
              <p>Pawan Tetgure's portfolio and website may display logos, brand names, or trademarks (collectively "Brand Assets") of companies or organizations for whom work has been completed as part of client projects. This includes but is not limited to companies such as <strong>Jio</strong> and any other brands whose videos we have edited.</p>
              <h3>4.1 Purpose of Display</h3>
              <p>These Brand Assets are displayed strictly for the purpose of showcasing Pawan Tetgure's past work experience and professional capabilities. Their presence on this website does <strong>not</strong> imply any ongoing partnership, sponsorship, endorsement, or official affiliation between Pawan Tetgure and those companies.</p>
              <h3>4.2 Nature of Relationship</h3>
              <p>Pawan Tetgure completed video editing or creative services for these brands as part of project-based, contractual, or freelance work. The display of a brand's logo or name means only that Pawan Tetgure has provided video editing services for content associated with that brand — either directly or through an intermediary client.</p>
              <h3>4.3 No Trademark Infringement Intended</h3>
              <p>All trademarks, service marks, trade names, logos, and brand identifiers displayed belong to their respective owners. Pawan Tetgure makes no claim of ownership over any third-party brand assets. They are used solely for informational and portfolio-reference purposes under fair use principles (nominative use).</p>
              <h3>4.4 Takedown Requests</h3>
              <p>If you are a representative of a brand whose assets are displayed on this website and you wish to have them removed, please contact us at <strong>magiccut.in@gmail.com</strong> and we will promptly address your request within 7 business days.</p>
              <div className="terms-highlight">
                <p>📌 <strong>Summary:</strong> We display brand logos only to show that we have done editing work on their projects. We do not claim any partnership, affiliation, or endorsement from these companies. All logos remain the property of their respective owners.</p>
              </div>
            </div>

            {/* 5 */}
            <div className="terms-section reveal">
              <h2>5. Intellectual Property</h2>
              <p>Upon full payment, the client receives full ownership rights to the final delivered video files. Pawan Tetgure retains the right to display completed work in its portfolio unless the client explicitly requests confidentiality in writing prior to project commencement.</p>
              <ul>
                <li>Pawan Tetgure's proprietary editing techniques, workflows, templates, and processes remain the exclusive property of Pawan Tetgure.</li>
                <li>Source/project files (Premiere Pro, After Effects, DaVinci Resolve, etc.) are not included in deliverables unless specifically agreed upon and priced accordingly.</li>
              </ul>
            </div>

            {/* 6 */}
            <div className="terms-section reveal">
              <h2>6. Payment &amp; Refund Policy</h2>
              <p>All payments are due as per the selected plan or project agreement. We accept payments via bank transfer, UPI, and international payment methods as specified at checkout.</p>
              <ul>
                <li><strong>Subscriptions:</strong> Monthly plans are billed in advance. Cancellations take effect at the end of the current billing cycle — no mid-cycle refunds are provided.</li>
                <li><strong>One-time projects:</strong> A 50% advance may be required before work begins. The remaining balance is due upon delivery.</li>
                <li><strong>Revisions:</strong> Unlimited revisions are included until the client is 100% satisfied with the agreed-upon scope of work. Revisions outside the agreed scope may incur additional charges.</li>
                <li><strong>Refunds:</strong> Refunds are not provided for completed work. If Pawan Tetgure is unable to deliver the agreed service, a full or partial refund will be considered at our discretion.</li>
              </ul>
            </div>

            {/* 7 */}
            <div className="terms-section reveal">
              <h2>7. Confidentiality</h2>
              <p>Pawan Tetgure treats all client materials, project details, and business information with strict confidentiality. We do not share client content with third parties except where required to complete the project (e.g., team members working on your project).</p>
              <p>Clients are equally expected to keep any proprietary workflows, pricing, or processes shared by Pawan Tetgure confidential.</p>
            </div>

            {/* 8 */}
            <div className="terms-section reveal">
              <h2>8. Limitation of Liability</h2>
              <p>Pawan Tetgure's liability in any case shall not exceed the total amount paid by the client for the specific service in question. I am not liable for any indirect, incidental, consequential, or punitive damages, including but not limited to loss of revenue, data, or business opportunities.</p>
              <p>Pawan Tetgure is not responsible for delays caused by force majeure events (natural disasters, internet outages, pandemics, etc.).</p>
            </div>

            {/* 9 */}
            <div className="terms-section reveal">
              <h2>9. Termination</h2>
              <p>Either party may terminate a service agreement with written notice. Upon termination:</p>
              <ul>
                <li>The client will be delivered all completed work up to the termination date.</li>
                <li>Outstanding payments for completed work remain due.</li>
                <li>Pawan Tetgure reserves the right to immediately terminate services if the client engages in abusive behaviour, requests illegal content, or violates these terms.</li>
              </ul>
            </div>

            {/* 10 */}
            <div className="terms-section reveal">
              <h2>10. Governing Law</h2>
              <p>These Terms of Service are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of <strong>Mumbai, Maharashtra, India</strong>.</p>
              <p>For international clients, disputes may be resolved through mutual negotiation or online mediation prior to formal legal proceedings.</p>
            </div>

            {/* 11 */}
            <div className="terms-section reveal">
              <h2>11. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <ul>
                <li><strong>Email:</strong> magiccut.in@gmail.com</li>
                <li><strong>Phone:</strong> +91 82916 49066</li>
                <li><strong>Address:</strong> Virar, Mumbai, Maharashtra, India</li>
                <li><strong>Business Hours:</strong> Monday – Saturday, 9am to 7pm IST (Sunday available for urgent projects)</li>
              </ul>
              <div className="terms-highlight">
                <p>By using Pawan Tetgure's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
              </div>
            </div>
          </div>
        </div>

        {/* TERMS CTA */}
        <section className="cta-section">
          <div className="cta-inner reveal">
            <div className="cta-pills"><span className="cta-pill">Transparent</span><span className="cta-pill">Professional</span><span className="cta-pill">Trusted</span><span className="cta-pill">Legal</span></div>
            <h2 className="cta-title">Have Questions?<br />We're Here to Help!</h2>
            <p className="cta-sub">Reach out anytime for clarification on our terms or services.</p>
            <a href="mailto:magiccut.in@gmail.com" className="cta-btn">Contact Us →</a>
          </div>
        </section>
      </div>

      {/* ─── VIDEO MODAL ─── */}
      {modalVideoUrl && (
        <div
          className="video-modal open"
          id="videoModal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalVideoUrl(null);
          }}
        >
          <div className="modal-inner">
            <button className="modal-close" onClick={() => setModalVideoUrl(null)}>✕</button>
            <iframe
              src={modalVideoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* ─── EXACT ORIGINAL FOOTER ─── */}
      <footer>
        <div className="footer-logo" onClick={() => showPage('home')} style={{ cursor: 'pointer' }}>
          ✦ {siteConfig?.name || 'Pawan Tetgure'}
        </div>
        <p className="footer-copy">
          Designed &amp; developed with ❤️ by <a href="https://www.linkedin.com/in/pawan-tetgure/" target="_blank" rel="noopener noreferrer">pawan</a>
        </p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); showPage('terms'); }}>Terms and Service</a>
          <Link href="/admin" style={{ opacity: 0.5, marginLeft: '12px', fontSize: '12px' }}>Admin</Link>
        </div>
      </footer>

      {/* Floating Admin Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
        <Link
          href="/admin"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(17,17,17,0.85)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            padding: '8px 14px',
            borderRadius: '40px',
            fontSize: '12px',
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'transform 0.2s',
          }}
        >
          ⚙️ Admin Panel
        </Link>
      </div>
    </>
  );
}
`;

fs.writeFileSync('src/components/PortfolioView.tsx', code, 'utf8');
console.log('Faithful PortfolioView.tsx generated successfully!');
