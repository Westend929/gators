import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Users,
  Award,
  Clock,
  MapPin,
  Camera,
  Heart,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our top priority with experienced guides, insured vehicles, and 24/7 support.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    title: 'Expert Guides',
    description: 'Our professional guides have decades of experience and deep knowledge of African wildlife.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in sustainable tourism and exceptional customer service.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Custom itineraries tailored to your schedule and preferences.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Access to the best wildlife viewing areas and exclusive private reserves.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Camera,
    title: 'Photography Focus',
    description: 'Perfect opportunities for capturing stunning wildlife and landscape photography.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Heart,
    title: 'Sustainable Tourism',
    description: 'Committed to conservation and supporting local communities across East Africa.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Star,
    title: 'Luxury Experience',
    description: 'Premium accommodations, private vehicles, and personalized service throughout.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

export default function Features() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exceptional Safari Experiences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what makes Gators Safaris the premier choice for African wildlife adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-linear-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
              <div className="text-green-100">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}