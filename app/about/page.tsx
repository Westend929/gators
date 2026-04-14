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
                src="/images/experience.jpg"
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Gators Tours and Safaris</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Gators Tours and Safaris is your trusted choice for unforgettable Kenya and African safari experiences. We specialize in tailor-made safari packages across top destinations including Maasai Mara, Amboseli, Lake Nakuru, and Serengeti.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              With over a decade of experience, our expert guides ensure safe, professional, and memorable wildlife adventures. We focus on personalized service, comfortable travel, and authentic encounters with Africa’s breathtaking wildlife.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We are committed to sustainable tourism, supporting wildlife conservation while delivering exceptional safari experiences that exceed expectations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Choose Gators Tours and Safaris for reliable service, expert guidance, and unforgettable journeys across Africa.
            </p>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Visit Our Nairobi Office at Agip House</h2>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Our Gators Nairobi office is located at Agip House on Haile Selassie Avenue, in the heart of Nairobi CBD. This location is ideal for safari planning, transfers, and guest meetups.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Use the Google map below to view our Agip House office branch and get directions to the Nairobi CBD location.
              </p>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  title="Gators Office Branch - Agip House Nairobi"
                  src="https://www.google.com/maps?q=Agip+House,+Haile+Selassie+Avenue,+Nairobi,+Kenya,+00100+Nairobi+CBD&output=embed"
                  width="100%"
                  height="420"
                  loading="lazy"
                  className="border-0 w-full h-[420px]"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-full min-h-[420px] bg-slate-950 text-white p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Agip House, Nairobi CBD</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Visit our Gators office at Agip House for safari bookings, local support, and travel coordination in Nairobi CBD.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This central location offers easy access to major roads, hotels, and city services before your safari departure.
              </p>
            </div>
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
