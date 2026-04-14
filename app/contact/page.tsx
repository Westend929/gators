'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-r from-green-700 via-emerald-700 to-green-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-70">
          <Image
            src="/images/luxury1.webp"
            alt="Safari hero image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Have questions about our safari packages? Get in touch with our team.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-green-600">
                <CardContent className="pt-6 flex gap-4">
                  <Mail className="text-green-600 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a href="mailto:gatorstoursandsafaris@gmail.com" className="text-gray-600 hover:text-green-600">
                      gatorstoursandsafaris@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600">
                <CardContent className="pt-6 flex gap-4">
                  <Phone className="text-green-600 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <a href="tel:+254111919898" className="text-gray-600 hover:text-green-600">
                      +25411191998
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600">
                <CardContent className="pt-6 flex gap-4">
                  <MapPin className="text-green-600 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-gray-600">
                      Nairobi, Kenya<br />
                      Open: Monday - Sunday 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-lg overflow-hidden h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8107934944647!2d36.749127400000007!3d-1.2802544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMScxNiIzOS4wIlMgMzYuNDQnNTcuNiJF!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Subject *</label>
                    <Input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Need Quick Help?</h3>
              <div className="space-y-2 text-sm text-blue-900">
                <p>📱 Chat with us on WhatsApp</p>
                <p>💬 Use our Zendesk chat widget</p>
                <p>
                  📧 Email us for detailed inquiries at{' '}
                  <a href="mailto:gatorstoursandsafaris@gmail.com" className="font-medium text-green-700 hover:text-green-800">
                    gatorstoursandsafaris@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
