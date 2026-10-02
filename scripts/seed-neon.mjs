import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || !databaseUrl.includes('postgres')) {
  console.log('No valid DATABASE_URL found in .env.local.');
  process.exit(0);
}

const initialSiteConfig = {
  id: 'default',
  name: 'Pawan Tetgure',
  tagline: 'Video Editor & Motion Graphics Designer',
  hero_title_line1: 'Video Editor &',
  hero_title_line2: 'Motion Graphics',
  hero_title_line3: 'Designer',
  hero_description:
    'Elevating stories through precision editing, dynamic motion graphics, and cinematic storytelling. Based in Mumbai, available worldwide.',
  spots_text: 'Available for work • 3 spots left',
  showreel_url: 'https://www.youtube.com/embed/TS01EZPkZ4Y?autoplay=1&rel=0',
  proof_text: 'Trusted by <b>30+ creators & brands</b> worldwide',
  contact_email: 'pawantetgure07@gmail.com',
  contact_phone: '+91 91727 68784',
  contact_location: 'Mumbai, Maharashtra, India',
  social_links: JSON.stringify({
    instagram: 'https://instagram.com/pawantetgure',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  }),
};

const initialProjects = [
  {
    title: 'YouTube Showcase',
    category: 'YouTube',
    video_url: 'https://www.youtube.com/watch?v=MUopjdqDxBw',
    embed_url: 'https://www.youtube.com/embed/MUopjdqDxBw?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/MUopjdqDxBw/hqdefault.jpg',
    sort_order: 1,
    is_active: true,
  },
  {
    title: 'High-Impact Visuals',
    category: 'Reels',
    video_url: 'https://www.youtube.com/watch?v=l_b1A2JPlRg',
    embed_url: 'https://www.youtube.com/embed/l_b1A2JPlRg?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/l_b1A2JPlRg/hqdefault.jpg',
    sort_order: 2,
    is_active: true,
  },
  {
    title: 'Brand Film & Corporate',
    category: 'Corporate',
    video_url: 'https://www.youtube.com/watch?v=scy6nD1QozI',
    embed_url: 'https://www.youtube.com/embed/scy6nD1QozI?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/scy6nD1QozI/hqdefault.jpg',
    sort_order: 3,
    is_active: true,
  },
  {
    title: 'Cinematic Travel Journey',
    category: 'Travel',
    video_url: 'https://www.youtube.com/watch?v=SzJZo3-vRVA',
    embed_url: 'https://www.youtube.com/embed/SzJZo3-vRVA?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/SzJZo3-vRVA/hqdefault.jpg',
    sort_order: 4,
    is_active: true,
  },
  {
    title: 'Wedding Story Film',
    category: 'Wedding',
    video_url: 'https://www.youtube.com/watch?v=WLkyXm2-A5k',
    embed_url: 'https://www.youtube.com/embed/WLkyXm2-A5k?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/WLkyXm2-A5k/hqdefault.jpg',
    sort_order: 5,
    is_active: true,
  },
  {
    title: 'Official Video Showreel',
    category: 'Showreel',
    video_url: 'https://www.youtube.com/watch?v=TS01EZPkZ4Y',
    embed_url: 'https://www.youtube.com/embed/TS01EZPkZ4Y?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/TS01EZPkZ4Y/hqdefault.jpg',
    sort_order: 6,
    is_active: true,
  },
];

const initialReels = [
  {
    title: 'Vertical Reel 1',
    video_url: 'https://www.youtube.com/shorts/eywjq1EJl6Y',
    embed_url: 'https://www.youtube.com/embed/eywjq1EJl6Y?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/eywjq1EJl6Y/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 1,
    is_active: true,
  },
  {
    title: 'Vertical Reel 2',
    video_url: 'https://www.youtube.com/shorts/k3AuWYv-Boc',
    embed_url: 'https://www.youtube.com/embed/k3AuWYv-Boc?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/k3AuWYv-Boc/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 2,
    is_active: true,
  },
  {
    title: 'Vertical Reel 3',
    video_url: 'https://www.youtube.com/shorts/I6XlBp_K_hQ',
    embed_url: 'https://www.youtube.com/embed/I6XlBp_K_hQ?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/I6XlBp_K_hQ/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 3,
    is_active: true,
  },
  {
    title: 'Vertical Reel 4',
    video_url: 'https://www.youtube.com/shorts/HjerUrcbQbQ',
    embed_url: 'https://www.youtube.com/embed/HjerUrcbQbQ?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/HjerUrcbQbQ/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 4,
    is_active: true,
  },
  {
    title: 'Vertical Reel 5',
    video_url: 'https://www.youtube.com/shorts/vOiVeAfVuRU',
    embed_url: 'https://www.youtube.com/embed/vOiVeAfVuRU?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/vOiVeAfVuRU/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 5,
    is_active: true,
  },
  {
    title: 'Vertical Reel 6',
    video_url: 'https://www.youtube.com/shorts/Hs8RGt1xgPM',
    embed_url: 'https://www.youtube.com/embed/Hs8RGt1xgPM?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/Hs8RGt1xgPM/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 6,
    is_active: true,
  },
  {
    title: 'Vertical Reel 7',
    video_url: 'https://www.youtube.com/shorts/8BEnUSzpMFM',
    embed_url: 'https://www.youtube.com/embed/8BEnUSzpMFM?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/8BEnUSzpMFM/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 7,
    is_active: true,
  },
  {
    title: 'Vertical Reel 8',
    video_url: 'https://www.youtube.com/shorts/8rezB2kdN_M',
    embed_url: 'https://www.youtube.com/embed/8rezB2kdN_M?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/8rezB2kdN_M/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 8,
    is_active: true,
  },
  {
    title: 'Vertical Reel 9',
    video_url: 'https://www.youtube.com/shorts/nM7dkbtJ9GM',
    embed_url: 'https://www.youtube.com/embed/nM7dkbtJ9GM?autoplay=1&rel=0',
    thumbnail_url: 'https://img.youtube.com/vi/nM7dkbtJ9GM/hqdefault.jpg',
    platform: 'youtube',
    badge_text: 'Shorts',
    sort_order: 9,
    is_active: true,
  },
];

const initialExperiences = [
  {
    company: 'Alpha Beta Solutions',
    role: 'Video Editor & Motion Graphics Designer',
    duration: '2025 - Present',
    description:
      'Currently creating engaging videos and motion graphics across a range of client projects at this dynamic media company. I collaborate closely with creative teams and clients to deliver polished, visually compelling content — from concept through to final cut — always with a focus on storytelling and audience engagement.',
    skills: JSON.stringify(['Premiere Pro', 'After Effects', 'Motion Graphics']),
    sort_order: 1,
    is_active: true,
  },
  {
    company: 'Mint Studio',
    role: 'Project Team Manager',
    duration: '2024 - 2025',
    description:
      'Led project teams across large-scale event productions, overseeing planning, execution, and delivery from end to end. I coordinated with creative directors and client stakeholders to ensure seamless workflows and consistently high-quality outputs. Notable brand collaborations included Godrej, Jio, Parimatch, WXM, Bombay Gymkhana, Raffles Hotel, The Grand Barso, Marsa Malaz Kempinski, Cipla, Kotak Mahindra Bank, HDFC Bank, Axis Bank, Sun Pharma, and Reliance — delivering successful, large-scale productions that sharpened my leadership and project management skills.',
    skills: JSON.stringify(['Team Leadership', 'Event Management', 'Client Coordination']),
    sort_order: 2,
    is_active: true,
  },
  {
    company: 'Carpet Area',
    role: 'Video Editor & Motion Graphics Designer',
    duration: '2023 - 2024',
    description:
      'Worked closely with marketing and sales teams to produce visual content that showcased real estate developments in a clear and compelling way. I created promotional videos, property walkthroughs, and animated explainers that supported sales cycles, along with motion graphics for social media campaigns, branding materials, and investor presentations — all crafted in Adobe Premiere Pro, After Effects, and Photoshop.',
    skills: JSON.stringify(['Real Estate', 'Property Videos', 'Social Media']),
    sort_order: 3,
    is_active: true,
  },
  {
    company: 'The Entertainment Factory',
    role: 'Video Editor & Motion Graphics Designer',
    duration: '2022 - 2023',
    description:
      'Handled end-to-end video editing for a wide range of branded and entertainment productions. I worked directly with directors and clients to craft sharp, engaging edits and motion graphics for high-visibility content. Projects included work for prominent personalities such as Ashish Vidyarthi, The Band of Boys, TEDx speakers, Kunal Kamra, Johnny Lever, and Sunil Grover — each delivered to a standard that contributed to strong viewership and audience engagement.',
    skills: JSON.stringify(['Entertainment', 'Celebrity Content', 'TEDx']),
    sort_order: 4,
    is_active: true,
  },
  {
    company: 'Freelance',
    role: 'Video Editor & Motion Graphics Designer',
    duration: 'Ongoing',
    description:
      'Independently collaborated with brands and influencers to produce creative video content for clients including Spotify, Mad Vision, and Matty Said That — turning briefs into visuals that genuinely connect with audiences. I also served as Concept and Visual Artist for Mumbai Cha Raja 2025, designing immersive 3D set installations at Lalbaug, Ganesh Galli — one of the most-watched Ganesh festival venues in Maharashtra.',
    skills: JSON.stringify(['Freelance', '3D Set Design', 'Brand Content']),
    sort_order: 5,
    is_active: true,
  },
];

const initialReviews = [
  {
    author: 'Rahul Desai',
    role_company: 'Head of Marketing, FinTech Startup · Mumbai',
    review_text:
      'Honestly I wasn\'t expecting this level of quality for the budget. We gave them raw footage from our product launch event in BKC and they returned a 3-minute highlight reel that our CEO used in the board meeting. Everyone in the room asked who edited it. We\'ve been with Pawan Tetgure for 8 months now.',
    rating: 5,
    avatar_bg: '#dbeafe',
    avatar_initials: 'R',
    sort_order: 1,
    is_active: true,
  },
  {
    author: 'Priya Malhotra',
    role_company: 'Founder, Luminos Skincare · Mumbai',
    review_text:
      'The 3D product visualization they created for our skincare launch was genuinely jaw-dropping. We were comparing quotes from 4 agencies in Mumbai, Pawan Tetgure delivered the best work at almost half the price. The CGI ad ran on Meta and got a 4.2x ROAS in the first week.',
    rating: 5,
    avatar_bg: '#fce7f3',
    avatar_initials: 'P',
    sort_order: 2,
    is_active: true,
  },
  {
    author: 'Sandeep Joshi',
    role_company: 'Director, SkyLine Realty · Mumbai',
    review_text:
      'We needed a 3D walkthrough for our upcoming residential project in Powai before construction even started. Pawan Tetgure created a photorealistic environment that we literally used in the sales presentation. Bookings started coming in based on that video alone. This team understands real estate.',
    rating: 5,
    avatar_bg: '#d1fae5',
    avatar_initials: 'S',
    sort_order: 3,
    is_active: true,
  },
  {
    author: 'Ananya Kulkarni',
    role_company: 'Co-Founder, Baaki D2C Brand · Pune',
    review_text:
      'Hum ek D2C brand hain aur humne apne social media ke liye animated product explainer banwaya tha. Jo quality mili woh honestly premium agency jaisi thi lekin cost bohot reasonable thi. Delivery bhi time pe hui. Pawan Tetgure is now our go-to creative partner.',
    rating: 5,
    avatar_bg: '#ede9fe',
    avatar_initials: 'A',
    sort_order: 4,
    is_active: true,
  },
  {
    author: 'Varun Nair',
    role_company: 'CEO, Learnly EdTech · Bangalore',
    review_text:
      'They made an AI-generated brand video for our edtech platform using just our brand guidelines and a brief. No shoot, no crew, no location, just pure AI magic. The output looked like a proper ad film. Our cost savings vs a traditional production was around ₹2.5 lakhs. Unbelievable ROI.',
    rating: 5,
    avatar_bg: '#fef9c3',
    avatar_initials: 'V',
    sort_order: 5,
    is_active: true,
  },
  {
    author: 'Nisha Arora',
    role_company: 'Event Director, Vogue Fests Mumbai · Mumbai',
    review_text:
      'We organized a 2-day fashion event in Mumbai and needed a same-day edit for the second day\'s opening reel. I was nervous about the turnaround but they delivered a 90-second promo within 6 hours overnight. The crowd reaction when it played was incredible. Absolute professionals.',
    rating: 5,
    avatar_bg: '#fde68a',
    avatar_initials: 'N',
    sort_order: 6,
    is_active: true,
  },
];

const initialFaqs = [
  {
    question: 'What is your typical turnaround time for a video project?',
    answer:
      'For short-form content (Reels, TikToks, Shorts), turnaround is typically 24-48 hours. For standard YouTube edits or corporate videos, expect 3-5 business days. 3D animations and CGI commercials depend on complexity but typically take 7-14 days. Express same-day turnaround is available upon request.',
    sort_order: 1,
    is_active: true,
  },
  {
    question: 'How do we collaborate and share files?',
    answer:
      'We use Google Drive, Frame.io, or Dropbox for smooth file transfer. Frame.io allows you to comment timestamp-by-timestamp directly on the video review link so revisions are seamless and accurate.',
    sort_order: 2,
    is_active: true,
  },
  {
    question: 'What software and tools do you use?',
    answer:
      'Primary tools include Adobe Premiere Pro, After Effects, DaVinci Resolve Studio (Color Grading), Blender / Cinema 4D (3D animation & CGI), Photoshop, Illustrator, and leading AI enhancement suites.',
    sort_order: 3,
    is_active: true,
  },
  {
    question: 'How many revisions are included?',
    answer:
      'Every project includes 2 to 3 rounds of free revisions to ensure you get exactly the final polish you envision. Any minor tweaks or caption fixes are always complimentary.',
    sort_order: 4,
    is_active: true,
  },
];

async function seed() {
  console.log('Connecting to Neon PostgreSQL...');
  const pool = new Pool({ connectionString: databaseUrl });

  try {
    // 1. Site config
    console.log('Seeding site_config...');
    await pool.query(
      `INSERT INTO site_config (id, name, tagline, hero_title_line1, hero_title_line2, hero_title_line3, hero_description, spots_text, showreel_url, proof_text, contact_email, contact_phone, contact_location, social_links)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       ON CONFLICT (id) DO NOTHING;`,
      [
        initialSiteConfig.id,
        initialSiteConfig.name,
        initialSiteConfig.tagline,
        initialSiteConfig.hero_title_line1,
        initialSiteConfig.hero_title_line2,
        initialSiteConfig.hero_title_line3,
        initialSiteConfig.hero_description,
        initialSiteConfig.spots_text,
        initialSiteConfig.showreel_url,
        initialSiteConfig.proof_text,
        initialSiteConfig.contact_email,
        initialSiteConfig.contact_phone,
        initialSiteConfig.contact_location,
        initialSiteConfig.social_links,
      ]
    );

    // 2. Projects
    console.log('Seeding projects...');
    for (const p of initialProjects) {
      await pool.query(
        `INSERT INTO projects (title, category, video_url, embed_url, thumbnail_url, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [p.title, p.category, p.video_url, p.embed_url, p.thumbnail_url, p.sort_order, p.is_active]
      );
    }

    // 3. Reels
    console.log('Seeding reels...');
    for (const r of initialReels) {
      await pool.query(
        `INSERT INTO reels (title, video_url, embed_url, thumbnail_url, platform, badge_text, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [r.title, r.video_url, r.embed_url, r.thumbnail_url, r.platform, r.badge_text, r.sort_order, r.is_active]
      );
    }

    // 4. Experiences
    console.log('Seeding experiences...');
    for (const exp of initialExperiences) {
      await pool.query(
        `INSERT INTO experiences (company, role, duration, description, skills, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [exp.company, exp.role, exp.duration, exp.description, exp.skills, exp.sort_order, exp.is_active]
      );
    }

    // 5. Reviews
    console.log('Seeding reviews...');
    for (const rev of initialReviews) {
      await pool.query(
        `INSERT INTO reviews (author, role_company, review_text, rating, avatar_bg, avatar_initials, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [rev.author, rev.role_company, rev.review_text, rev.rating, rev.avatar_bg, rev.avatar_initials, rev.sort_order, rev.is_active]
      );
    }

    // 6. FAQs
    console.log('Seeding faqs...');
    for (const f of initialFaqs) {
      await pool.query(
        `INSERT INTO faqs (question, answer, sort_order, is_active)
         VALUES ($1, $2, $3, $4);`,
        [f.question, f.answer, f.sort_order, f.is_active]
      );
    }

    // 7. Logos
    console.log('Seeding logos...');
    const initialLogos = [
      { name: 'PariMatch', imageUrl: '/assets/images/img_1.png', sort_order: 1 },
      { name: 'Carpet Areas', imageUrl: '/assets/images/img_2.png', sort_order: 2 },
      { name: 'Mumbai Cha Raja', imageUrl: '/assets/images/img_3.png', sort_order: 3 },
      { name: 'Podar International School', imageUrl: '/assets/images/img_4.png', sort_order: 4 },
      { name: 'Sahujii', imageUrl: '/assets/images/img_5.png', sort_order: 5 },
      { name: 'SCT', imageUrl: '/assets/images/img_6.png', sort_order: 6 },
      { name: 'Shoecase', imageUrl: '/assets/images/img_7.png', sort_order: 7 },
      { name: 'WXM', imageUrl: '/assets/images/img_8.png', sort_order: 8 },
      { name: 'Z24 Taas', imageUrl: '/assets/images/img_9.png', sort_order: 9 },
      { name: 'Dotom', imageUrl: '/assets/images/img_19.png', sort_order: 10 },
      { name: 'Fort Cha Raja', imageUrl: '/assets/images/img_20.png', sort_order: 11 },
      { name: 'Godrej', imageUrl: '/assets/images/img_21.png', sort_order: 12 },
      { name: 'HDFC Bank', imageUrl: '/assets/images/img_22.png', sort_order: 13 },
      { name: 'Jio', imageUrl: '/assets/images/img_23.png', sort_order: 14 },
      { name: 'MNG Group', imageUrl: '/assets/images/img_24.png', sort_order: 15 },
      { name: 'SD Group', imageUrl: '/assets/images/img_25.png', sort_order: 16 },
      { name: 'Shriji Sharan', imageUrl: '/assets/images/img_26.png', sort_order: 17 },
      { name: 'WWD', imageUrl: '/assets/images/img_27.png', sort_order: 18 },
    ];
    for (const l of initialLogos) {
      await pool.query(
        `INSERT INTO logos (name, image_url, sort_order, is_active)
         VALUES ($1, $2, $3, true);`,
        [l.name, l.imageUrl, l.sort_order]
      );
    }

    console.log('✅ Neon DB successfully seeded with all portfolio data!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await pool.end();
  }
}

seed();
