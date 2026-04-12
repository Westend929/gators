'use client';

import { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import GoogleReviews from '@/components/GoogleReviews';
import ItineraryModal from '@/components/ItineraryModal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const heroSlides = [
  {
    id: 1,
    type: 'video' as const,
    src: 'https://ai-safari-videos.com/masai-mara-migration.mp4',
    title: 'Witness the Great Migration',
    description: 'Experience the most spectacular wildlife event on Earth',
    cta: { text: 'Plan Your Safari', href: '#packages' },
  },
  {
    id: 2,
    type: 'video' as const,
    src: 'https://ai-safari-videos.com/serengeti-lions.mp4',
    title: 'Unforgettable Safari Adventures',
    description: 'Discover Africa\'s most iconic wildlife destinations',
    cta: { text: 'Explore Packages', href: '#packages' },
  },
  {
    id: 3,
    type: 'video' as const,
    src: 'https://ai-safari-videos.com/kilimanjaro-sunset.mp4',
    title: 'Connect with Nature',
    description: 'Create memories that will last a lifetime',
    cta: { text: 'Book Now', href: '/contact' },
  },
  {
    id: 4,
    type: 'video' as const,
    src: 'https://ai-safari-videos.com/amboseli-elephants.mp4',
    title: 'African Wildlife Wonders',
    description: 'Get up close with the iconic animals of Africa',
    cta: { text: 'Start Journey', href: '/safaris/masai-mara' },
  },
];

const packages = [
  {
    id: 1,
    title: 'Masai Mara Safari',
    days: 5,
    price: '$1,550',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop',
    description: 'Experience the vast plains of Masai Mara with incredible wildlife viewing.',
    features: ['Big Five', 'Game Drives', 'Luxury Accommodation'],
  },
  {
    id: 2,
    title: 'Serengeti Adventure',
    days: 7,
    price: '$2,100',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop',
    description: 'Witness the great migration in the heart of Serengeti National Park.',
    features: ['Migration', 'Hot Air Balloon', 'Luxury Camps'],
  },
  {
    id: 3,
    title: 'Kilimanjaro Trek',
    days: 6,
    price: '$1,800',
    image: 'https://images.unsplash.com/photo-1543747949-ab0f7a0b1e74?w=500&h=300&fit=crop',
    description: 'Climb Africa\'s highest peak with experienced guides.',
    features: ['Trekking', 'Cultural Experience', 'Expert Guides'],
  },
  {
    id: 4,
    title: 'Amboseli Park',
    days: 4,
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1437863965986-78d8e9c3d9d3?w=500&h=300&fit=crop',
    description: 'See Mount Kilimanjaro and encounter the Big Five in Amboseli.',
    features: ['Kilimanjaro Views', 'Elephants', 'Photography'],
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  const handlePackageClick = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} autoPlay={true} interval={6000} />

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Gators Safaris?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer expertly curated safari experiences with the best guides, accommodations, and wildlife encounters.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Expert Guides', description: 'Experienced wildlife experts with deep knowledge' },
              { icon: '🏖️', title: 'Luxury Stays', description: 'Hand-picked luxury lodges and camps' },
              { icon: '🦁', title: 'Wildlife Focus', description: 'High probability encounters with Big Five' },
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Packages Section */}
      <section id="packages" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Safari Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our carefully designed safari itineraries to unforgettable African destinations.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription>{pkg.days} Days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                  <div className="space-y-1">
                    {pkg.features.map((feature, idx) => (
                      <p key={idx} className="text-sm text-green-600">✓ {feature}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handlePackageClick(pkg)}
                    >
                      Get Itinerary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/safaris">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                View All Safaris
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Guests Say</h2>
          <GoogleReviews />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-linear-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your African Adventure?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to plan your perfect safari experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
            <Link href="/safaris">
              <Button size="lg" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100">
                Explore Safaris
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Itinerary Modal */}
      <ItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itinerary={selectedPackage ? {
          title: selectedPackage.title,
          days: selectedPackage.days,
          price: selectedPackage.price,
          image: selectedPackage.image,
        } : undefined}
      />
    </div>
  );
}
