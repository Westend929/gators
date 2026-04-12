'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BookingWidgetProps {
  safari: {
    id: string;
    title: string;
    price: string;
    duration: string;
  };
  onBookingSubmit?: (bookingData: any) => void;
}

export default function BookingWidget({ safari, onBookingSubmit }: BookingWidgetProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    numberOfPeople: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const basePrice = parseInt(safari.price.replace(/[$,]/g, ''));
    if (Number.isNaN(basePrice)) {
      return 0;
    }
    const people = parseInt(formData.numberOfPeople);
    return basePrice * people;
  };

  const priceHasNumber = !Number.isNaN(parseInt(safari.price.replace(/[$,]/g, '')));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        safariId: safari.id,
        safariTitle: safari.title,
        ...formData,
        totalAmount: calculateTotal(),
        bookingDate: new Date().toISOString(),
      };

      // Call the booking API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();

      setBookingComplete(true);
      toast.success('Booking request submitted successfully!');

      if (onBookingSubmit) {
        onBookingSubmit(result);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Request Submitted!</h3>
          <p className="text-green-700 mb-4">
            Thank you for choosing Gators Safaris. We'll contact you within 24 hours to confirm your booking and arrange payment.
          </p>
          <Button
            onClick={() => setBookingComplete(false)}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Make Another Booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-6 border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Book This Safari
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Safari Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">{safari.title}</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{safari.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per person:</span>
                <span>{safari.price}</span>
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate" className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Number of People */}
          <div>
            <Label htmlFor="numberOfPeople" className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4" />
              Number of People
            </Label>
            <Select
              value={formData.numberOfPeople}
              onValueChange={(value) => handleInputChange('numberOfPeople', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Person</SelectItem>
                <SelectItem value="2">2 People</SelectItem>
                <SelectItem value="3">3 People</SelectItem>
                <SelectItem value="4">4 People</SelectItem>
                <SelectItem value="5">5 People</SelectItem>
                <SelectItem value="6">6+ People</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requirements or preferences..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Total Price */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Price per person:</span>
              <span className="text-green-700">{priceHasNumber ? safari.price : 'Enquire for pricing'}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
              <span>Total estimate:</span>
              <span className="text-green-700">{priceHasNumber ? `$${calculateTotal().toLocaleString()}` : 'Price on request'}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              * Final price may vary based on season and availability
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Enquire'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to our terms and conditions. We'll contact you to confirm availability and payment details.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}