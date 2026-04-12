# Priority Wild Safaris - Full Stack Safari Booking Website

A modern, SEO-optimized Next.js web application for safari tours and wildlife experiences in Africa. This project includes advanced features like itinerary modals, video carousel, WhatsApp integration, Zendesk chatbot, Google reviews, and comprehensive analytics.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Hero Video Carousel**: 4 AI-generated videos on home page
- **Itinerary Modal**: Lead generation popup with side-view images
- **Google Reviews**: Dynamic reviews fetched from Google Places API
- **WhatsApp Integration**: Floating bubble with one-click messaging
- **Zendesk Chatbot**: Live chat support
- **Smooth Animations**: AOS library with mobile scroll effects

### Backend Features
- **Email Service Integration**: SendGrid for contact and newsletter
- **WhatsApp Business API**: Direct messaging integration
- **Google Places API**: Real-time reviews and ratings
- **API Routes**: Secure backend endpoints for form submissions

### Security & Analytics
- **Google Tag Manager**: Complete analytics tracking
- **Google reCAPTCHA**: Bot protection
- **Cloudflare Turnstile**: Additional security layer
- **Facebook Pixel**: Conversion tracking
- **SSL/TLS**: Secure connections
- **Environment Variables**: All sensitive keys in .env files

### SEO Optimization
- **Meta Tags**: Complete OpenGraph and Twitter cards
- **Sitemap XML**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling optimization
- **Schema.org Markup**: Rich snippets for search results
- **Core Web Vitals**: Optimized for speed and performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- A code editor (VSCode recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/priority-wild-safaris.git
cd priority-wild-safaris
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your actual keys
nano .env.local
```

**Required Environment Variables:**
```env
# Google Services
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxx
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=xxxxx
GOOGLE_RECAPTCHA_SECRET_KEY=xxxxx

# Email Service
SENDGRID_API_KEY=SG.xxxxx
SENDER_EMAIL=your-email@domain.com

# WhatsApp
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+254xxxxxxxxx

# Zendesk
NEXT_PUBLIC_ZENDESK_KEY=xxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## 📁 Project Structure

```
safari/
├── app/
│   ├── api/                    # API routes
│   │   ├── contact/           # Contact form endpoint
│   │   ├── newsletter/        # Newsletter signup
│   │   ├── itinerary/         # Itinerary requests
│   │   ├── reviews/           # Google reviews fetch
│   │   └── whatsapp/          # WhatsApp integration
│   ├── about/                 # About page
│   ├── contact/               # Contact page
│   ├── safaris/               # Safari packages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   └── tabs.tsx
│   ├── Footer.tsx             # Footer component
│   ├── GoogleReviews.tsx      # Reviews display
│   ├── Header.tsx             # Navigation
│   ├── HeroCarousel.tsx       # Hero carousel
│   ├── ItineraryModal.tsx     # Lead gen modal
│   ├── WhatsAppBubble.tsx     # WhatsApp button
│   └── ZendeskChat.tsx        # Zendesk integration
├── lib/
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
├── .env.example              # Example env file
├── .env.local                # Local env (git ignored)
├── .env.production           # Production env template
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
├── DEPLOYMENT.md             # Deployment guide
└── package.json              # Dependencies

```

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Making Changes

#### Adding a New Page
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <main>Your content</main>
}
```

#### Adding a New API Endpoint
```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // Process data
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
```

#### Using Environment Variables
```typescript
// In server components
const apiKey = process.env.SENDGRID_API_KEY

// In client components
const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
```

## 🔧 Configuration

### Adding Services

#### 1. SendGrid (Email)
```bash
1. Create account at sendgrid.com
2. Create API key
3. Add to env: SENDGRID_API_KEY
4. Verify sender email
```

#### 2. Google Services
```bash
1. Create project in Google Cloud Console
2. Enable APIs:
   - Google Places API
   - Google Maps API
   - Google Tag Manager
3. Create API keys and add to env
```

#### 3. WhatsApp Business
```bash
1. Create WhatsApp Business account
2. Get Phone Number ID
3. Create System User
4. Generate Access Token
5. Add to env variables
```

#### 4. Zendesk
```bash
1. Create Zendesk account
2. Create chat widget
3. Copy Zendesk key
4. Add to env: NEXT_PUBLIC_ZENDESK_KEY
```

### Database Setup (Optional)

If adding a database, update `DATABASE_URL` in `.env.local`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/safari_db
```

## 📦 Dependencies

### Core
- `next`: React framework
- `react`: UI library
- `typescript`: Type safety

### UI & Styling
- `tailwindcss`: Utility CSS
- `shadcn/ui`: Component library
- `lucide-react`: Icons
- `framer-motion`: Animations

### Forms & Validation
- `react-hook-form`: Form management
- `zod`: Schema validation

### External Integrations
- `axios`: HTTP client
- `react-hot-toast`: Notifications
- `embla-carousel`: Carousel component
- `next-seo`: SEO management

## 🚀 Deployment

### Quick Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
# Settings > Environment Variables
```

### Other Platforms
- **AWS/EC2**: See DEPLOYMENT.md
- **Google Cloud**: See DEPLOYMENT.md  
- **Netlify**: See DEPLOYMENT.md
- **Cloudflare Pages**: See DEPLOYMENT.md

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🔒 Security

### Best Practices
- [ ] All API keys in environment variables
- [ ] Never commit `.env.local` or sensitive files
- [ ] Use HTTPS in production
- [ ] Enable reCAPTCHA and Turnstile
- [ ] Regular security audits
- [ ] Keep dependencies updated

### Checking for Vulnerabilities
```bash
npm audit
npm audit fix
```

## 📊 Performance

### Optimization Tips
```bash
# Check bundle size
npm run build

# Run Lighthouse audit
# Built-in Chrome DevTools > Lighthouse
```

### Core Web Vitals
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

Monitor in Google Search Console.

## 🧪 Testing

```bash
# Unit tests (when implemented)
npm run test

# E2E tests (when implemented)
npm run test:e2e
```

## 📈 Analytics & Monitoring

### Tracking Setup
1. **Google Analytics**: Connected via GTM
2. **Facebook Pixel**: Conversion tracking
3. **Search Console**: SEO monitoring
4. **Zendesk**: Support ticket tracking
5. **SendGrid**: Email analytics

### Monitoring Tools
- Sentry: Error tracking
- LogRocket: Session recording
- New Relic: Performance monitoring

## 🐛 Troubleshooting

### Common Issues

**WhatsApp bubble not working**
```bash
- Check NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER in env
- Format should be: +254xxxxxxxxx (with country code)
```

**Zendesk chat not appearing**
```bash
- Verify NEXT_PUBLIC_ZENDESK_KEY
- Check if script loaded in browser console
```

**Email not sending**
```bash
- Verify SENDGRID_API_KEY
- Check sender email is verified in SendGrid
- Look for API errors in console logs
```

**Google reviews not loading**
```bash
- Verify GOOGLE_BUSINESS_PROFILE_ID
- Check Google Places API is enabled
- API key must have Places API access
```

## 💡 Tips & Best Practices

1. **Always use environment variables for secrets**
2. **Test thoroughly before deploying**
3. **Monitor error logs regularly**
4. **Keep external dependencies updated**
5. **Optimize images before uploading**
6. **Add robots.txt and sitemap for SEO**
7. **Use proper error boundaries**
8. **Implement loading states for async operations**

## 📞 Support & Contact

- **Email**: support@prioritywildsafaris.com
- **Website**: https://prioritywildsafaris.com
- **WhatsApp**: +254 XXX XXX XXX

## 📄 License

This project is proprietary software. Unauthorized copying or modification is strictly prohibited.

## 🤝 Contributing

For internal team contributions:
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [API Documentation](#api-endpoints)
- [Component Guide](#components)

### API Endpoints

#### Contact Form
```
POST /api/contact
Body: { name, email, phone, subject, message }
```

#### Newsletter
```
POST /api/newsletter
Body: { email }
```

#### Itinerary Request
```
POST /api/itinerary
Body: { name, email, phone, itinerary, startDate, endDate, numberOfPeople, budget }
```

#### Google Reviews
```
GET /api/reviews
Response: { reviews[], overallRating, totalReviews }
```

#### WhatsApp Message
```
POST /api/whatsapp
Body: { message, phone }
```

## 🎯 Roadmap

- [ ] Blog section for safari tips
- [ ] Booking system with payment
- [ ] Guest reviews submission
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] User accounts and bookings history

## ⚙️ System Requirements

- Node.js 18.0 or higher
- npm 8.0 or higher
- Modern browser (Chrome, Firefox, Safari, Edge)
- 256MB RAM minimum
- 100MB disk space

## 📝 Changelog

### Version 1.0.0
- Initial release with all features
- Hero carousel with 4 videos
- Itinerary modal with lead generation
- WhatsApp and Zendesk integration
- Google reviews display
- Complete SEO optimization
- Deployment guide

---

Built with ❤️ for wildlife enthusiasts by Priority Wild Safaris Team
