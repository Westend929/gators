# Safari Tours Website

A fully SEO responsive website for tours and safaris, built with Next.js 16, React 18, and shadcn/ui.

## Features

- **SEO Optimized**: Meta tags, Open Graph, Google verification
- **Responsive Design**: Mobile-first with scrolling effects
- **Hero Carousel**: 4 AI-generated videos on homepage
- **Itinerary Popup Modal**: Lead generation with sideview images
- **WhatsApp Bubble**: Call to action button
- **Zendesk Chatbot**: Fully functional customer support
- **Google Reviews**: Dynamic reviews from Google Places API
- **Google Integrations**: Tag Manager, reCAPTCHA
- **Cloudflare Security**: For production deployment

## Tech Stack

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Swiper
- Framer Motion
- API Routes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run development server: `npm run dev`

## Environment Variables

Create `.env.local` with:

```
GTM_ID=your_gtm_id
GOOGLE_VERIFICATION_KEY=your_key
RECAPTCHA_SITE_KEY=your_key
ZENDESK_KEY=your_key
GOOGLE_PLACES_API_KEY=your_key
```

## Deployment

Deploy to Vercel or Netlify, add Cloudflare for security.

For Vercel: `vercel --prod`

Set environment variables in deployment platform.

Add media files to `public/` directory.

## Build

`npm run build`

## License

MIT
