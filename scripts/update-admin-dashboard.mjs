import fs from 'fs';

let content = fs.readFileSync('src/app/admin/AdminDashboardClient.tsx', 'utf8');

// 1. Update imports
content = content.replace(
  "  deleteReviewAction,\n} from '@/actions/portfolio-actions';",
  "  deleteReviewAction,\n  saveLogoAction,\n  toggleLogoStatusAction,\n  deleteLogoAction,\n} from '@/actions/portfolio-actions';"
);

// 2. Update AdminProps interface
content = content.replace(
  "    faqs: any[];\n  };",
  "    faqs: any[];\n    logos?: any[];\n  };"
);

// 3. Update activeTab type
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'projects' | 'reels' | 'experience' | 'reviews' | 'profile'>('projects');",
  "const [activeTab, setActiveTab] = useState<'projects' | 'reels' | 'experience' | 'reviews' | 'logos' | 'profile'>('projects');"
);

// 4. Add logo handlers before `return (`
const logoHandlers = `
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
      showStatus(\`Logo \${!currentStatus ? 'is now visible on site' : 'has been hidden'}\`);
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
`;

content = content.replace('  return (', `${logoHandlers}\n  return (`);

// 5. Update Tab Buttons list
content = content.replace(
  "{ id: 'reviews', label: '⭐ Client Reviews', count: data.reviews?.length || 0 },\n            { id: 'profile', label: '⚙️ Profile & Showreel', count: null },",
  "{ id: 'reviews', label: '⭐ Client Reviews', count: data.reviews?.length || 0 },\n            { id: 'logos', label: '🏷️ Brand Logos', count: (data as any).logos?.length || 0 },\n            { id: 'profile', label: '⚙️ Profile & Showreel', count: null },"
);

// 6. Add Logos tab view before Tab 5
const logoTabHtml = `
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
`;

content = content.replace(
  "{/* ══════════ TAB 5: PROFILE & SHOWREEL ══════════ */}",
  `${logoTabHtml}\n        {/* ══════════ TAB 5: PROFILE & SHOWREEL ══════════ */}`
);

fs.writeFileSync('src/app/admin/AdminDashboardClient.tsx', content, 'utf8');
console.log('Updated AdminDashboardClient.tsx with Brand Logos successfully!');
