# Deployment Guide for Priority Wild Safaris

## Pre-Deployment Checklist

### 1. Environment Variables Setup

Before deploying, ensure all environment variables are configured:

```bash
# Production Environment Variables (.env.production)
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_RECAPTCHA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_META_VERIFICATION_KEY=xxxxxxxxxxxxxxxxxxxxx

SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=noreply@prioritywildsafaris.com

NEXT_PUBLIC_ZENDESK_KEY=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_ZENDESK_ACCOUNT_URL=https://prioritywildsafaris.zendesk.com

NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_ID=xxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+254xxxxxxxxx
WHATSAPP_API_KEY=xxxxxxxxxxxxxxxxxxxxx
WHATSAPP_BUSINESS_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_CDN_URL=https://cdn.prioritywildsafaris.com
NEXT_PUBLIC_APP_URL=https://prioritywildsafaris.com
NEXT_PUBLIC_SITE_NAME=Priority Wild Safaris
NODE_ENV=production
JWT_SECRET=your-super-secret-key-minimum-32-characters
```

### 2. Steps to Deploy

#### Option A: Deploy to Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy the project
vercel

# 4. Set up environment variables in Vercel Dashboard
# - Go to Project Settings > Environment Variables
# - Add all variables from .env.production
# - Redeploy after adding environment variables
```

#### Option B: Deploy to AWS/EC2

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Start production server
npm start

# When deploying to EC2:
# - Use PM2 for process management
npm install -g pm2

# Create ecosystem.config.js
pm2 start npm --name "safari-app" -- start

# Save PM2 process list
pm2 save

# 4. Set up Nginx reverse proxy
# - Configure Nginx to forward requests to http://localhost:3000
```

#### Option C: Deploy to Google Cloud Platform (GCP) / App Engine

```bash
# 1. Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# 2. Initialize Google Cloud
gcloud init

# 3. Create app.yaml
cat > app.yaml << EOF
runtime: nodejs20

env: standard

env_variables:
  NODE_ENV: "production"
  NEXT_PUBLIC_APP_URL: "https://prioritywildsafaris.com"

EOF

# 4. Deploy
gcloud app deploy
```

### 3. Cloudflare Setup for Security

#### Cloudflare Turnstile (Bot Protection)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to your domain
3. Go to Security > Turnstile
4. Create a new site key
5. Copy the Site Key and Secret Key
6. Add to environment variables:
   ```
   NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key
   CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key
   ```

#### Cloudflare Pages (Alternative)

```bash
# 1. Deploy directly from Git
# - Connect your GitHub repository to Cloudflare Pages
# - Set build command: npm run build
# - Set output directory: .next

# 2. Set environment variables in Pages settings
```

### 4. Google Services Configuration

#### Google Tag Manager
1. Create account at [Google Tag Manager](https://tagmanager.google.com)
2. Create a new container for your website
3. Copy the GTM ID (GTM-XXXXXXXXX)
4. Add to environment variables

#### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Add the verification code to environment variables

#### Google reCAPTCHA v3
1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Register your site
3. Get Site Key and Secret Key
4. Add to environment variables

### 5. Meta/Facebook Configuration

#### Facebook Business Account
1. Create [Facebook Business Account](https://www.facebook.com/business)
2. Create Pixel for tracking
3. Get Pixel ID and verification code

### 6. Email Service Setup (SendGrid)

```bash
# 1. Create SendGrid account
# https://sendgrid.com

# 2. Create API Key
# - Settings > API Keys > Create API Key
# - Choose "Full Access" or custom permissions

# 3. Copy API Key
# Add to environment: SENDGRID_API_KEY

# 4. Verify Sender Email
# - Settings > Sender Authentication
# - Verify your domain or single sender address
```

### 7. WhatsApp Business API Setup

1. Create [WhatsApp Business Account](https://www.whatsapp.com/business)
2. Get Phone Number ID and Business Account ID
3. Create System User with API access
4. Generate Access Token
5. Add to environment variables:
   ```
   WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
   WHATSAPP_API_KEY=your_access_token
   NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+254xxxxxxxxx
   ```

### 8. Zendesk Chat Setup

1. Create [Zendesk Account](https://www.zendesk.com)
2. Go to Channels > Chat > Customize
3. Copy your Zendesk Key
4. Add to environment: `NEXT_PUBLIC_ZENDESK_KEY`

### 9. Google Reviews Integration

```bash
# 1. Get Google Business Profile
# - Create/verify your business on Google
# - Go to Google My Business

# 2. Get Place ID
# - Use Google Places API to get your Place ID
# - Add to environment: NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_ID

# 3. Get Google Places API Key
# - Go to Google Cloud Console
# - Enable Places API
# - Create API key
# - Add to environment
```

### 10. SSL/TLS Certificate

#### For Vercel
- Automatically provided by Vercel

#### For Custom Domain
```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --standalone -d prioritywildsafaris.com

# Copy certificate paths and configure in your server
```

### 11. DNS Configuration

Update your domain's DNS records to point to your hosting provider:

```
Type    Name         Value
A       @            Your_Server_IP (or Vercel IP)
CNAME   www          Your_Domain.vercel.app (if using Vercel)
MX      @            Your_Email_Provider_MX_Record
TXT     @            Your_SPF_Record
TXT     @            Your_DKIM_Record
```

### 12. Performance Optimization

```bash
# Build for production
npm run build

# Check build output
ls -la .next

# Test production build locally
npm start
```

### 13. Security Headers

Add to `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }
  ]
}
```

### 14. Monitoring and Logging

```bash
# Set up error tracking
# - Sentry: https://sentry.io
# - LogRocket: https://logrocket.com
# - New Relic: https://newrelic.com

# Create account and add monitoring SDK to _app.tsx
```

### 15. Backup and Disaster Recovery

```bash
# Regular database backups
# - Set up automated backups for any database
# - Store backups in multiple locations

# Git backups
git push origin main
```

## Post-Deployment

### 1. Test All Features
- [ ] Hero carousel plays videos
- [ ] Itinerary modal works
- [ ] Contact form sends emails
- [ ] WhatsApp bubble works
- [ ] Zendesk chat appears
- [ ] Google reviews load
- [ ] Mobile responsive

### 2. SEO Checklist
- [ ] Sitemap.xml created
- [ ] Robots.txt configured
- [ ] Meta tags correct
- [ ] OG images set
- [ ] Schema.org markup added
- [ ] Google Search Console verified
- [ ] Analytics installed

### 3. Performance
- [ ] Page load time < 3s
- [ ] Google PageSpeed Score > 90
- [ ] Core Web Vitals optimized
- [ ] Images optimized

### 4. Security
- [ ] SSL certificate installed
- [ ] Security headers set
- [ ] reCAPTCHA working
- [ ] Cloudflare Turnstile working
- [ ] Database encrypted
- [ ] API keys secured

## Rollback Procedure

```bash
# If issues occur, rollback to previous version
git revert [commit_hash]
git push origin main

# On Vercel or hosting platform
# - Automatic rollback available in deployment history
# - Select previous successful deployment
```

## Support & Monitoring

- Set up alerts for errors
- Monitor performance metrics
- Check analytics regularly
- Review user feedback
- Schedule security audits quarterly

## Update Schedule

- Weekly: Monitor analytics and errors
- Monthly: Security updates and patches
- Quarterly: Feature updates and optimizations
- Annually: Full security audit and infrastructure review

---

For questions or issues contact: support@prioritywildsafaris.com
