'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const featuredParks = [
  {
    id: 1,
    title: 'Maasai Mara',
    subtitle: 'Big Five & Great Migration',
    description: 'Experience legendary wildlife, premium tented camps, and exclusive seasonal migrations in Maasai Mara.',
    image: '/images/3daysmara.webp',
  },
  {
    id: 2,
    title: 'Amboseli National Park',
    subtitle: 'Elephants & Kilimanjaro',
    description: 'Enjoy unrivaled elephant encounters with Mount Kilimanjaro as your dramatic safari backdrop.',
    image: '/images/amboseli01.webp',
  },
  {
    id: 3,
    title: 'Lake Nakuru',
    subtitle: 'Flamingos & Luxury',
    description: 'Enjoy vibrant flamingo lakeside views and elegant wildlife lodges around Lake Nakuru.',
    image: '/images/popular14.jpg',
  },
  {
    id: 4,
    title: 'Luxury Safari Camp',
    subtitle: 'Exclusive Stays',
    description: 'Stay in private luxury camps with bespoke service, gourmet dining, and premium safari guides.',
    image: '/images/luxury1.webp',
  },
  {
    id: 5,
    title: 'Sunset Game Drive',
    subtitle: 'Golden Horizons',
    description: 'Capture unforgettable golden-hour moments on private game drives through scenic safari terrain.',
    image: '/images/popular10.jpg',
  },
  {
    id: 6,
    title: 'Premium Safari Route',
    subtitle: 'Curated Journeys',
    description: 'Travel with style on curated safari routes designed for wildlife, comfort, and authentic adventure.',
    image: '/images/curated9.jpg',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const item = carouselRef.current?.querySelector(`[data-index='${currentIndex}']`) as HTMLElement | null;
    item?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [currentIndex]);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Premium Safari Collection</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular National Parks & Luxury Safaris</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our top safari destinations with premium experiences in Maasai Mara, Amboseli, and Lake Nakuru.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto scroll-smooth px-4 py-8 md:px-8 md:py-10"
            >
              {featuredParks.map((park, index) => (
                <Card
                  key={park.id}
                  data-index={index}
                  className="min-w-[90%] sm:min-w-[48%] lg:min-w-[32%] snap-center shrink-0"
                >
                  <div className="relative h-72 overflow-hidden rounded-t-3xl">
                    <Image
                      src={park.image}
                      alt={park.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 md:p-7">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[.2em] text-green-700">
                      {park.subtitle}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-slate-900">{park.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{park.description}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
                        Exclusive stays
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
                        Private guided tours
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 md:px-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredParks.length) % featuredParks.length)}
              className="rounded-full bg-white/90 shadow-sm border border-gray-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredParks.length)}
              className="rounded-full bg-white/90 shadow-sm border border-gray-200"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {featuredParks.map((park, index) => (
            <button
              key={park.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                index === currentIndex
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-green-400'
              }`}
            >
              {park.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
