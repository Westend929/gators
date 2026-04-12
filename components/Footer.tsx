'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe2, Share2, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('You have been subscribed to our newsletter!');
        setEmail('');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white">
                <Image src="/logo.png" alt="Gators Tours and Safaris" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold">Gators Tours and Safaris</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Experience the wonder of African wildlife with our expertly curated safari tours.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <a href="mailto:gatorstoursandsafaris@gmail.com" className="hover:text-white transition">
                  gatorstoursandsafaris@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <a href="tel:+254111919898" className="hover:text-white transition">
                  254 111919898
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/itineraries', label: 'Itineraries' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition block"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Safari Packages */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Safari Packages</h4>
            <nav className="space-y-2">
              {[
                { href: '/safaris/masai-mara', label: 'Masai Mara' },
                { href: '/safaris/serengeti', label: 'Serengeti' },
                { href: '/safaris/kilimanjaro', label: 'Kilimanjaro' },
                { href: '/safaris/amboseli', label: 'Amboseli' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition block"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers and updates about our safaris.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="space-y-2 text-right md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Gators Tours and Safaris. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Developed by Arthur Mwakima
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: X, href: 'https://x.com/gatorstoursandsafaris', label: 'X' },
              { icon: Globe2, href: 'https://www.instagram.com/gatorstoursandsafaris', label: 'Instagram' },
              { icon: Share2, href: 'https://www.facebook.com/gatorstoursandsafaris', label: 'Facebook' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
