'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

const countries = [
  {
    id: 'kenya',
    name: 'Kenya',
    description: 'Experience the ultimate wildlife adventure in Kenya, home to the Big Five and the Great Migration.',
    image: '/images/9days.webp',
    highlights: [
      'Masai Mara National Reserve',
      'Amboseli National Park',
      'Tsavo East & West',
      'Lake Nakuru National Park',
      'Maasai Cultural Experiences'
    ],
    activities: [
      'Game Drives',
      'Hot Air Balloon Safaris',
      'Walking Safaris',
      'Bird Watching',
      'Cultural Visits'
    ],
    bestTime: 'June to September and December to March'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    description: 'Discover the Serengeti plains and climb Mount Kilimanjaro in the heart of Tanzania.',
    image: '/images/12days.webp',
    highlights: [
      'Serengeti National Park',
      'Ngorongoro Crater',
      'Mount Kilimanjaro',
      'Zanzibar Islands',
      'Tarangire National Park'
    ],
    activities: [
      'Great Migration Viewing',
      'Mountain Climbing',
      'Beach Holidays',
      'Cultural Safaris',
      'Photography Tours'
    ],
    bestTime: 'June to September (dry season)'
  },
  {
    id: 'uganda',
    name: 'Uganda',
    description: 'Witness mountain gorillas and explore the source of the Nile in Uganda.',
    image: '/images/11days.webp',
    highlights: [
      'Bwindi Impenetrable Forest',
      'Queen Elizabeth National Park',
      'Murchison Falls',
      'Kibale Forest',
      'Lake Victoria'
    ],
    activities: [
      'Gorilla Trekking',
      'Chimpanzee Tracking',
      'White-water Rafting',
      'Bird Watching',
      'Community Tourism'
    ],
    bestTime: 'June to September and December to February'
  }
];

export default function ExperiencePage() {
  const router = useRouter();

  const handleCountryChange = (countryId: string) => {
    router.push(`/experience/${countryId}`);
  };

  const handleExploreClick = (countryId: string) => {
    router.push(`/experience/${countryId}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/images/samb01.webp"
            alt="Wildlife safari experience"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">African Safari Experiences</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the diverse wildlife and cultures of East Africa. Choose your destination and embark on an unforgettable journey.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Country Selector */}
        <div className="max-w-md mx-auto mb-12">
          <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Experience Destination
          </label>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* All Countries Overview */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Explore All Destinations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {countries.map((country) => (
              <Card key={country.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{country.name}</CardTitle>
                  <CardDescription>{country.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleExploreClick(country.id)}
                  >
                    Explore {country.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}