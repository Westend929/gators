'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import GoogleReviews from '@/components/GoogleReviews';
import ItineraryModal from '@/components/ItineraryModal';
import EnquiryModal from '@/components/EnquiryModal';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const heroSlides = [
  {
    id: 1,
    type: 'video' as const,
    src: '/videos/video1.mp4',
    title: 'Witness the Great Migration',
    description: 'Experience the most spectacular wildlife event on Earth.',
    cta: { text: 'Plan Your Safari', href: '#packages' },
  },
  {
    id: 2,
    type: 'video' as const,
    src: '/videos/safari7.mp4',
    title: 'Unforgettable Safari Adventures',
    description: 'Discover Africa\'s most iconic wildlife destinations.',
    cta: { text: 'Explore Packages', href: '#packages' },
  },
  {
    id: 3,
    type: 'video' as const,
    src: '/videos/safari9.mp4',
    title: 'Connect with Nature',
    description: 'Create memories that will last a lifetime.',
    cta: { text: 'Book Now', href: '/contact' },
  },
  {
    id: 4,
    type: 'video' as const,
    src: '/videos/safari11.mp4',
    title: 'African Wildlife Wonders',
    description: 'Get up close with the iconic animals of Africa.',
    cta: { text: 'Start Journey', href: '/safaris' },
  },
];

const packages = [
  {
    id: 1,
    title: 'Masai Mara Safari',
    days: 5,
    price: 'Visit Our Itenaries to book for prices',
    image: '/images/curated4.jpg',
    description: 'Experience the vast plains of Masai Mara with incredible wildlife viewing.',
    features: ['Big Five', 'Game Drives', 'Luxury Accommodation'],
  },
  {
    id: 2,
    title: 'Serengeti Adventure',
    days: 7,
    price: 'Visit Our Itenaries to book for prices',
    image: '/images/serengeti.jpg',
    description: 'Witness the great migration in the heart of Serengeti National Park.',
    features: ['Migration', 'Hot Air Balloon', 'Luxury Camps'],
  },
  {
    id: 3,
    title: 'Kilimanjaro Trek',
    days: 6,
    price: 'Visit Our Itenaries to book for prices',
    image: '/images/popular8.jpg',
    description: 'Climb Africa\'s highest peak with experienced guides.',
    features: ['Trekking', 'Cultural Experience', 'Expert Guides'],
  },
  {
    id: 4,
    title: 'Amboseli Park',
    days: 4,
    price: 'Visit Our Itenaries to book for prices',
    image: '/images/popular9.jpg',
    description: 'See Mount Kilimanjaro and encounter the Big Five in Amboseli.',
    features: ['Kilimanjaro Views', 'Elephants', 'Photography'],
  },
];

const curatedSafarisGallery = [
  {
    id: 1,
    title: 'Luxury Bush Camp',
    image: '/images/luxury1.webp',
    caption: 'Exclusive tented accommodation in the wild.',
  },
  {
    id: 2,
    title: 'Panoramic Safari Vistas',
    image: '/images/curated9.jpg',
    caption: 'AI-inspired imagery capturing African beauty.',
  },
  {
    id: 3,
    title: 'Serengeti Panorama',
    image: '/images/popular10.jpg',
    caption: 'Premium curated safaris with hand-picked routes.',
  },
  {
    id: 4,
    title: 'Wildlife Immersion',
    image: '/images/adventure.webp',
    caption: 'Intimate wildlife encounters and premium service.',
  },
  {
    id: 5,
    title: 'Safari Sundown',
    image: '/images/popular14.jpg',
    caption: 'Golden-hour views and luxury safari comforts.',
  },
  {
    id: 6,
    title: 'Epic Expedition',
    image: '/images/tsavo.webp',
    caption: 'Immersive routes curated for exceptional adventure.',
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    const hasSeenEnquiry = localStorage.getItem('hasSeenEnquiry');
    if (!hasSeenEnquiry) {
      // Delay to show after page loads
      const timer = setTimeout(() => {
        setIsEnquiryOpen(true);
        localStorage.setItem('hasSeenEnquiry', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePackageClick = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div>
      <HeroCarousel slides={heroSlides} autoPlay interval={6000} />

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Wildlife Safaris</p>
            <h2 className="text-3xl md:text-4xl font-bold">Expert Safari Experiences</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover premium wildlife itineraries designed to deliver unforgettable safari journeys across East Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription>{pkg.days} Days • {pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.features.map((feature, index) => (
                      <span key={index} className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handlePackageClick(pkg)}
                  >
                    Request Itinerary
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              {
                title: 'Tailor-Made Wildlife Journeys',
                description: 'We craft personalized safari itineraries that match your travel goals and add the best wildlife moments.',
              },
              {
                title: 'Luxury Service & Safety',
                description: 'Enjoy premium accommodations, guided game drives, and expert support every step of the way.',
              },
              {
                title: 'Sustainable Travel',
                description: 'Our experiences support wildlife conservation and local communities across East Africa.',
              },
            ].map((item, idx) => (
              <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Features />

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Premium Collection</p>
            <h2 className="text-3xl md:text-4xl font-bold">Premium Curated Safaris</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore our specially curated safari experiences with premium visuals inspired by AI-driven design.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {curatedSafarisGallery.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Our Location</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">Visit Us in Nairobi</h2>
              <p className="mt-4 text-gray-600 max-w-2xl">
                Our Nairobi office is the gateway to East African safaris. Drop by for a personalized consultation and start planning your luxury wildlife journey.
              </p>
              <div className="mt-8 space-y-4 text-gray-700">
                <div>
                  <span className="font-semibold">Address:</span> Westlands, Nairobi, Kenya
                </div>
                <div>
                  <span className="font-semibold">Office Hours:</span> Mon - Sat, 8:00 AM - 6:00 PM
                </div>
                <div>
                  <span className="font-semibold">Contact:</span> +254 111919898
                </div>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/contact">Enquire about our safaris</Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
              <iframe
                title="Nairobi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199860.0556681684!2d36.628264145161904!3d-1.2920658999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10dfc0e3f26b%3A0x4f3e2eacbfabf711!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="420"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Client Feedback</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Safari Travelers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Real guest reviews from clients who experienced Africa with us.
          </p>
          <GoogleReviews />
        </div>
      </section>

      <Testimonials />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="p-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let us plan your perfect safari.</h2>
              <p className="text-gray-600 mb-6">
                Get a custom itinerary, expert guidance, and seamless booking support for your next wildlife adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="text-green-700 border-green-700 hover:bg-green-50">
                <Link href="/safaris">Explore Packages</Link>
              </Button>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden">
              <Image
                src="/images/popular10.jpg"
                alt="Safari journey"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

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

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
