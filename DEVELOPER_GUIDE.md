# Developer Setup & Git Push Guide

## 🎯 Quick Start for New Developers

### Part 1: Initial Setup (First Time Only)

#### 1.1 Clone and Install
```bash
# Clone repository
git clone https://github.com/yourusername/priority-wild-safaris.git
cd priority-wild-safaris

# Install Node packages
npm install

# This will install all dependencies including:
# - Next.js 16.2.3
# - React 19.2.4
# - TailwindCSS 4
# - shadcn/ui components
# - Form handling (react-hook-form, zod)
# - Animations (framer-motion, AOS)
# - Integrations (axios, react-hot-toast, etc)
```

#### 1.2 Configure Environment Variables
```bash
# Create local environment file
cp .env.example .env.local

# Edit with your LOCAL development keys
# (Test/development API keys and endpoints)
nano .env.local
```

**Minimum required for local development:**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Priority Wild Safaris
NODE_ENV=development
JWT_SECRET=dev-secret-key-min-32-chars-long

# Optional (for full feature testing):
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-TEST
SENDGRID_API_KEY=SG.test_key_here
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+254xxxxxxxxx
```

#### 1.3 Start Development Server
```bash
npm run dev

# Output: 
# ▲ Next.js 16.2.3
# - Local: http://localhost:3000
# - Network: http://192.168.x.x:3000
```

✅ Site should be running at `http://localhost:3000`

---

### Part 2: Making Changes & Committing

#### 2.1 Create Feature Branch
```bash
# Always create new branch for features
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/add-payment-integration
# git checkout -b feature/improve-mobile-layout
# git checkout -b feature/add-blog-section
```

#### 2.2 Make Your Changes
```bash
# Edit files in your preferred editor
# Common files to edit:
# - Pages: app/*/page.tsx
# - Components: components/*.tsx
# - Styles: app/globals.css
# - APIs: app/api/*/route.ts
```

#### 2.3 Test Your Changes
```bash
# Test locally
npm run dev

# Check for TypeScript errors
npm run lint

# Build test
npm run build
```

#### 2.4 Commit Changes
```bash
# Check what changed
git status

# Stage all changes
git add .

# Or stage specific files
git add app/safaris/page.tsx

# Commit with descriptive message
git commit -m "feat: add safari pricing comparison feature"

# Commit message format:
# feat: new feature
# fix: bug fix
# refactor: code restructuring
# docs: documentation
# style: styling
# test: tests
```

#### 2.5 Push to GitHub
```bash
# Push branch to GitHub
git push origin feature/your-feature-name

# First push (might need -u flag)
git push -u origin feature/your-feature-name
```

#### 2.6 Create Pull Request
```bash
# On GitHub repository:
# 1. Go to "Pull Requests" tab
# 2. Click "New Pull Request"
# 3. Select your feature branch
# 4. Add title and description
# 5. Click "Create Pull Request"
# 6. Wait for review and approval
# 7. Merge to main branch
```

---

### Part 3: Production Deployment

#### 3.1 Merge to Main
```bash
# After PR is approved and tests pass:
# 1. GitHub will show "Merge pull request" button
# 2. Click to merge feature into main branch
# 3. Or command line:

git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

#### 3.2 Prepare for Production
```bash
# Pull latest changes
git pull origin main

# Create .env.production with REAL production keys
cp .env.example .env.production

# Edit with production API keys and URLs
nano .env.production
```

**Production environment file:**
```env
# Google Services (PRODUCTION KEYS)
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-PROD123
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=prod-verification-code
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=prod-recaptcha-key
GOOGLE_RECAPTCHA_SECRET_KEY=prod-secret-key

# Email Service (PRODUCTION)
SENDGRID_API_KEY=SG.prod_api_key_here
SENDER_EMAIL=noreply@prioritywildsafaris.com

# WhatsApp (PRODUCTION)
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+254xxxxxxxxx
WHATSAPP_API_KEY=prod_whatsapp_key

# Application
NEXT_PUBLIC_APP_URL=https://prioritywildsafaris.com
NEXT_PUBLIC_SITE_NAME=Priority Wild Safaris
NODE_ENV=production
JWT_SECRET=super-secret-production-key-min-32-chars

# All other keys...
```

#### 3.3 Build and Test Production Build
```bash
# Create production build
npm run build

# If successful, output shows:
# ✓ Compiled successfully
# ✓ Optimized package sizes

# Test production build locally
npm start

# Visit http://localhost:3000 and test features
```

#### 3.4 Deploy to Vercel (Simple)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# 1. Vercel login (if not already)
# 2. Link to existing project or create new
# 3. Set production domain
# 4. Deployment starts

# After deployment, add environment variables:
# 1. Go to Vercel Dashboard
# 2. Project Settings > Environment Variables
# 3. Add all variables from .env.production
# 4. Redeploy project
```

#### 3.5 Deploy to AWS/EC2 (Complex)
```bash
# Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip.compute.amazonaws.com

# On server:
cd /var/www/safari-app

# Pull latest code
git pull origin main

# Install/update dependencies
npm install

# Build for production
npm run build

# Use PM2 to manage application
npm install -g pm2

# Start application with PM2
pm2 start npm --name "safari-app" -- start

# Monitor
pm2 status
pm2 logs safari-app

# Restart on reboot
pm2 startup
pm2 save
```

#### 3.6 Verify Deployment
```bash
# Check if site is accessible
curl https://prioritywildsafaris.com

# Test critical features:
# 1. Homepage loads
# 2. Hero carousel plays
# 3. Contact form works
# 4. WhatsApp bubble appears
# 5. Zendesk chat loads
# 6. Reviews display
# 7. Mobile responsive

# Monitor performance
# - Google PageSpeed Insights
# - Google Search Console
# - Analytics dashboard
```

---

## 🔄 Common Git Workflows

### Workflow 1: Simple Feature
```bash
# 1. Create branch
git checkout -b feature/add-new-page

# 2. Make changes
# (edit files)

# 3. Commit
git add .
git commit -m "feat: add new safari guide page"

# 4. Push
git push origin feature/add-new-page

# 5. Create PR on GitHub
# 6. Merge after approval
```

### Workflow 2: Bug Fix
```bash
# 1. Create bug fix branch
git checkout -b fix/contact-form-error

# 2. Fix the bug
# (edit files)

# 3. Test
npm run dev
# (verify fix works)

# 4. Commit
git add .
git commit -m "fix: contact form validation error"

# 5. Push and create PR
git push origin fix/contact-form-error
```

### Workflow 3: Hotfix (Production)
```bash
# For urgent production fixes:

# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. Fix issue
# (edit files)

# 3. Test thoroughly
npm run build
npm start

# 4. Commit
git add .
git commit -m "hotfix: fix critical payment bug"

# 5. Push and PR
git push origin hotfix/critical-bug

# 6. Merge to both main and develop
```

### Workflow 4: Conflict Resolution
```bash
# If pull request has conflicts:

# 1. Update local main
git checkout main
git pull origin main

# 2. Merge your branch
git merge feature/your-feature

# 3. If conflicts occur, editor shows them:
# <<<<<<< HEAD
# main branch content
# =======
# your feature content
# >>>>>>> feature/your-feature

# 4. Edit files to resolve conflicts
nano conflicting-file.tsx

# 5. Stage resolved files
git add conflicting-file.tsx

# 6. Complete merge
git commit -m "merge: resolve conflicts in safari page"

# 7. Push
git push origin feature/your-feature
```

---

## 📋 Pre-Deployment Checklist

Before pushing to production:

```
[ ] Code tested locally (npm run dev)
[ ] No TypeScript errors (npm run lint)
[ ] Production build succeeds (npm run build)
[ ] .env.production configured with real keys
[ ] All API endpoints tested
[ ] Forms tested with real SendGrid key
[ ] WhatsApp bubble configured
[ ] Zendesk chat enabled
[ ] Google Analytics connected
[ ] reCAPTCHA working
[ ] Mobile responsive verified
[ ] All images optimized
[ ] Performance tested (PageSpeed > 90)
[ ] Security headers configured
[ ] SSL certificate ready
[ ] DNS records updated
[ ] Database backups set up
[ ] Monitoring tools configured
[ ] Team notified of deployment
[ ] Rollback plan documented
```

---

## 🚨 Emergency Rollback

If deployment has critical issues:

```bash
# Option 1: Revert last commit
git revert HEAD
git push origin main

# Option 2: Rollback on Vercel
# Dashboard > Deployments > Select previous good deployment > Promote

# Option 3: On EC2
cd /var/www/safari-app
git log --oneline  # Find good commit
git checkout [commit-hash]
npm run build
npm start  # or: pm2 restart safari-app

# Option 4: Notify users
# Send email/notification about temporary issues
# Update status page if applicable
```

---

## 📚 Useful Git Commands

```bash
# View branch status
git status

# View commit history
git log --oneline -10

# See diff of changes
git diff
git diff filename.tsx

# View all branches
git branch -a

# Switch branches
git checkout branch-name
git checkout -  # Back to previous branch

# Delete branch
git branch -d feature/old-feature
git push origin --delete feature/old-feature

# Stash changes temporarily
git stash
git stash pop

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View who changed what
git blame app/page.tsx

# Cherry pick specific commit
git cherry-pick [commit-hash]
```

---

## 🆘 Troubleshooting

### Issue: Node modules error after git pull
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

### Issue: Port 3000 already in use
```bash
# Find process using port
lsof -i :3000

# Kill it
kill -9 [PID]

# Or use different port
npm run dev -- -p 3001
```

### Issue: Build fails with TypeScript errors
```bash
# Check errors
npm run lint

# Fix errors or ignore temporarily
# Add error explanation to PR description

# Try building again
npm run build
```

### Issue: Environment variables not working
```bash
# Verify .env.local exists in root directory
ls -la .env.local

# Check variables are correctly formatted
cat .env.local

# Restart dev server
# (kill with Ctrl+C and restart)
npm run dev

# For production, verify Vercel dashboard has all variables
```

### Issue: Git merge conflicts
```bash
# See conflicting files
git status

# Use VSCode merge resolver or manual edit
nano conflicting-file.tsx

# After resolving, stage and commit
git add conflicting-file.tsx
git commit -m "resolve: merge conflicts"
```

---

## 📖 Documentation Links

- [Git Guide](https://git-scm.com/docs)
- [GitHub Docs](https://docs.github.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)

---

## ✅ Final Checklist for Developers

```
Before committing:
[ ] Changes are related to one feature/fix
[ ] Code is clean and readable
[ ] No console.log() statements left
[ ] TypeScript passes (npm run lint)
[ ] Tested functionality works

Before pushing:
[ ] Commit message is descriptive
[ ] Branch name is meaningful
[ ] Pushed to correct repository
[ ] PR description is complete

Before deployment:
[ ] All tests pass
[ ] Production build succeeds
[ ] Environment variables configured
[ ] APIs tested with real keys
[ ] Rollback procedure documented
```

---

## Support & Questions

- Team lead: [contact-info]
- Slack channel: #priority-wild-safaris-dev
- Documentation: See DEPLOYMENT.md and FULL_README.md

Happy coding! 🚀
