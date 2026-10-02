# Vercel & Neon PostgreSQL Deployment & Admin Guide

Your portfolio is now completely dynamic and ready for deployment to **Vercel** with a **Neon Serverless PostgreSQL** backend.

---

## 🚀 Quick Setup Instructions

### 1. Set up your Neon Database (Free)
1. Go to [Neon Console](https://console.neon.tech) and create a free account if you haven't already.
2. Click **Create Project** (Name: `pawan-portfolio`).
3. Under **Dashboard**, find the **Connection Details** box.
4. Copy the connection string (it looks like):
   ```bash
   postgresql://neondb_owner:YOUR_PASSWORD@ep-royal-firefly-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Paste this connection string into your `.env.local` file:
   ```env
   DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-royal-firefly-12345.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ADMIN_PASSWORD="your_custom_admin_password"
   JWT_SECRET="any_long_random_secret_string"
   ```

### 2. Push Database Tables & Seed Initial Content
Once your `DATABASE_URL` is set, run:
```bash
# Push schema tables (site_config, projects, reels, experiences, reviews, faqs) to Neon
pnpm run db:push

# Seed all existing content from your portfolio into Neon
pnpm run db:seed
```
Your Neon PostgreSQL database now has all your existing videos, reels, client reviews, and experience records!

---

## 🌐 Deploy to Vercel in 2 Minutes

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Dynamic CMS Portfolio with Neon DB & Admin Dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/pawan-portfolio.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [Vercel](https://vercel.com) and click **Add New...** → **Project**.
   - Select your `pawan-portfolio` GitHub repository.
   - Vercel will automatically detect **Next.js** and **pnpm**.

3. **Add Environment Variables in Vercel**:
   Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `DATABASE_URL` | Your Neon connection string |
   | `ADMIN_PASSWORD` | Password you want to use to log into `/admin` (e.g. `pawan2026`) |
   | `JWT_SECRET` | Any random string for signing session cookies |

4. Click **Deploy**. Your portfolio will be live worldwide in less than 60 seconds with instant CDN caching and serverless execution!

---

## 🛠️ How to Use the Admin Dashboard (`/admin`)

Visit `your-domain.vercel.app/admin` (or `http://localhost:3000/admin` in development).

1. **Log In**: Enter your `ADMIN_PASSWORD`.
2. **Add YouTube Videos**:
   - Paste any YouTube link (`https://www.youtube.com/watch?v=...` or `https://youtu.be/...`).
   - The embed player and high-res thumbnail are generated automatically!
   - Choose category (YouTube, Reels, Corporate, Travel, Wedding, Showreel, 3D CGI).
3. **Add New Reels & Shorts**:
   - Paste any YouTube Shorts (`https://www.youtube.com/shorts/...`), Instagram Reel (`https://www.instagram.com/reel/...`), or direct video URL.
   - Choose badge label (`Shorts`, `Reel`, `TikTok`).
4. **Instant Hide / Show Toggle (`is_active`)**:
   - Every single video, reel, job experience, and review has a **[● Visible / ○ Hidden]** switch.
   - Click it once to instantly hide an item from the live portfolio without deleting it.
   - Click it again to bring it back anytime!
5. **Manage Experiences**:
   - Add new positions: Company, Role, Duration, Description, and Skill badges (e.g. `Premiere Pro, After Effects, 3D`).
   - Edit or delete existing experiences.
6. **Manage Showreel & Profile**:
   - Change your main showreel URL directly with an instant preview.
   - Update availability badge ("Available for work • 3 spots left").
   - Update hero text, contact email, and phone number.
