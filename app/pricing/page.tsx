'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const priceOptions = [
  {
    title: 'Starter Safari',
    price: '$1,200',
    description: 'Short luxury safari package ideal for first-time travelers.',
    highlights: ['4 Days', 'Budget Lodging', 'Daily Game Drives', 'Airport Transfer'],
  },
  {
    title: 'Classic Safari',
    price: '$1,850',
    description: 'Popular itinerary with premium accommodation and safari activities.',
    highlights: ['6 Days', 'Luxury Lodging', 'Hot Air Balloon Option', 'Cultural Visits'],
  },
  {
    title: 'Premium Safari',
    price: '$2,850',
    description: 'Ultimate safari experience with luxury camps and private guides.',
    highlights: ['8 Days', 'Exclusive Camps', 'Private Safari', 'Gourmet Dining'],
  },
];

export default function PricingPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-emerald-900 text-white py-16">
        <div className="absolute inset-0 opacity-80">
          <Image
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80"
            alt="AI generated safari pricing hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/75" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="max-w-3xl mx-auto text-gray-100 text-lg">
            Choose a safari package that fits your travel style and budget. Every plan includes expert guides and seamless logistics.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {priceOptions.map((option) => (
            <Card key={option.title} className="border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
                <p className="text-3xl font-bold text-green-600">{option.price}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{option.description}</p>
                <ul className="space-y-2 text-gray-700">
                  {option.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="mt-1 text-green-600">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-right">
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                    <Link href="/contact">Book This Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
