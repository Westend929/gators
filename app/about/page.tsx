'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/images/rename7.jpg"
            alt="AI generated safari crew"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/60" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Gators Tours and Safaris</h1>
          <p className="text-lg max-w-2xl mx-auto">
            reating unforgettable African safari journeys you can trust.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Gators Tours and Safaris delivers exceptional safari experiences for wildlife lovers worldwide. With over a decade of experience, we create unforgettable African adventures guided by expert teams.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are committed to sustainable tourism that protects wildlife while offering authentic and memorable experiences.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe in sustainable tourism that protects Africa's wildlife while providing guests with authentic, transformative experiences.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/safari-experience.jpg"
                alt="Safari Experience"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To provide world-class safari experiences that connect people with Africa's incredible wildlife, while supporting conservation efforts and local communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To be the leading safari operator in East Africa, known for excellence, sustainability, and creating unforgettable memories for our guests.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 bg-gray-50 -mx-4 px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Expert Guides', description: 'Certified guides with 10+ years of experience' },
              { icon: '🏆', title: 'Award-Winning', description: 'Recognized for excellence in safari tourism' },
              { icon: '🌍', title: 'Sustainable', description: 'Committed to wildlife and environment conservation' },
              { icon: '🏖️', title: 'Luxury Experience', description: 'Premium lodges and exceptional service' },
              { icon: '💰', title: 'Best Value', description: 'Competitive pricing without compromising quality' },
              { icon: '✈️', title: 'All-Inclusive', description: 'Complete packages from flights to accommodations' },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Kariuki', role: 'Lead Safari Guide', bio: '15+ years in wildlife tourism' },
              { name: 'Sarah Omondi', role: 'Tour Manager', bio: 'Expert itinerary planner' },
              { name: 'David Kipchoge', role: 'Lead Driver', bio: 'Master of African roads' },
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <div className="relative w-full h-48 bg-gray-300 mb-4">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-green-600 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-linear-to-r from-green-600 to-green-700 text-white py-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Safari Adventure?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Let our experts help you plan the perfect safari experience.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Contact Us Today
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
