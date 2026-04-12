import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';

interface RelatedSafari {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  description: string;
}

interface RelatedSafarisProps {
  currentSafariId: string;
  safaris?: RelatedSafari[];
}

const defaultSafaris: RelatedSafari[] = [
  {
    id: 'masai-mara',
    title: 'Masai Mara Safari',
    location: 'Kenya',
    duration: '5 Days',
    price: '$1,550',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
    description: 'Experience the vast plains of Masai Mara with incredible wildlife viewing.',
  },
  {
    id: 'serengeti',
    title: 'Serengeti Adventure',
    location: 'Tanzania',
    duration: '7 Days',
    price: '$2,100',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    description: 'Witness the great migration in the heart of Serengeti National Park.',
  },
  {
    id: 'kilimanjaro',
    title: 'Kilimanjaro Trek',
    location: 'Tanzania',
    duration: '6 Days',
    price: '$1,800',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1543747949-ab0f7a0b1e74?w=400&h=300&fit=crop',
    description: 'Climb Africa\'s highest peak with experienced guides.',
  },
  {
    id: 'amboseli',
    title: 'Amboseli Park',
    location: 'Kenya',
    duration: '4 Days',
    price: '$1,200',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1437863965986-78d8e9c3d9d3?w=400&h=300&fit=crop',
    description: 'See Mount Kilimanjaro and encounter the Big Five in Amboseli.',
  },
];

export default function RelatedSafaris({ currentSafariId, safaris = defaultSafaris }: RelatedSafarisProps) {
  // Filter out the current safari and limit to 3 related safaris
  const relatedSafaris = safaris
    .filter(safari => safari.id !== currentSafariId)
    .slice(0, 3);

  if (relatedSafaris.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">You Might Also Like</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover more incredible safari experiences across East Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedSafaris.map((safari) => (
            <Card key={safari.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={safari.image}
                  alt={safari.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {safari.duration}
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                      {safari.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {safari.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{safari.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {safari.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="h-3 w-3" />
                    {safari.duration}
                  </div>
                  <span className="text-lg font-bold text-green-600">{safari.price}</span>
                </div>

                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Link href={`/safaris/${safari.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            <Link href="/safaris">
              View All Safaris
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}