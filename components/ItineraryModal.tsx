'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary?: {
    title: string;
    days: number;
    price: string;
    image?: string;
  };
}

export default function ItineraryModal({
  isOpen,
  onClose,
  itinerary,
}: ItineraryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    numberOfPeople: '1',
    budget: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          itinerary: itinerary?.title || 'General Inquiry',
        }),
      });

      if (response.ok) {
        toast.success('Itinerary request submitted! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          startDate: '',
          endDate: '',
          numberOfPeople: '1',
          budget: '',
        });
        onClose();
      } else {
        toast.error('Failed to submit request. Please try again.');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Image */}
          {itinerary?.image && (
            <div className="hidden md:block rounded-lg overflow-hidden">
              <Image
                src={itinerary.image}
                alt={itinerary.title}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Right side - Form */}
          <div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">
                {itinerary?.title || 'Request Itinerary'}
              </DialogTitle>
              <DialogDescription className="mt-2">
                Fill in your details and we'll send you a customized itinerary
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+254..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Number of People
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.numberOfPeople}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfPeople: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Budget (USD)
                  </label>
                  <Input
                    type="text"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    placeholder="e.g., 5000"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? 'Submitting...' : 'Get Your Itinerary'}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
