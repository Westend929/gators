'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SafariSearch from '@/components/SafariSearch';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, MapPin, Calendar, Users, Eye } from 'lucide-react';

const safaris = [
  {
    slug: 'masai-mara',
    id: 1,
    title: 'Masai Mara Safari',
    region: 'Kenya',
    days: 5,
    price: '$1,550',
    image: '/images/luxury.webp',
    description: 'Experience the vast plains of Masai Mara with incredible wildlife viewing and the famous Big Five.',
    highlights: ['Big Five Sightings', 'Game Drives', 'Luxury Accommodation', 'Expert Guides', 'Photography Opportunities'],
    itinerary: [
      'Day 1: Arrival and transfer to lodge',
      'Day 2-4: Daily game drives',
      'Day 5: Departure',
    ],
    bestSeason: 'July - October, December - March',
    activities: ['Game Drives', 'Walking Safaris', 'Photography', 'Bird Watching'],
  },
  {
    slug: 'serengeti',
    id: 2,
    title: 'Serengeti Adventure',
    region: 'Tanzania',
    days: 7,
    price: '',
    image: '/images/serengeti.webp',
    description: 'Witness the great migration and ultimate wildlife spectacle in Serengeti National Park.',
    highlights: ['Great Migration', 'Hot Air Balloon', 'Luxury Camps', '24-Hour Game Drives', 'Sunset Viewing'],
    itinerary: [
      'Day 1-2: Northern Serengeti',
      'Day 3-5: Central/Southern Serengeti',
      'Day 6: Crater Rim visit',
      'Day 7: Departure',
    ],
    bestSeason: 'June - September (Migration)',
    activities: ['Game Drives', 'Hot Air Balloon', 'Walking Safari', 'Photography'],
  },
  {
    slug: 'kilimanjaro',
    id: 3,
    title: 'Kilimanjaro Trek',
    region: 'Tanzania',
    days: 6,
    price: '',
    image: '/images/kilimanjaro.jpg',
    description: 'Climb Africa\'s highest peak with experienced guides and acclimatization routes.',
    highlights: ['5,895m Summit', 'Experienced Guides', 'All Meals Included', 'Acclimatization Route', 'Success Rate 95%'],
    itinerary: [
      'Day 1: Preparation and briefing',
      'Day 2-5: Climbing various routes',
      'Day 6: Descent and celebration',
    ],
    bestSeason: 'January - March, June - October',
    activities: ['Trekking', 'Mountain Climbing', 'Acclimatization Walks'],
  },
  {
    slug: 'amboseli',
    id: 4,
    title: 'Amboseli National Park',
    region: 'Kenya',
    days: 4,
    price: '',
    image: '/images/kilimanjaro.jpg',
    description: 'See Mount Kilimanjaro from the Kenya side and encounter elephants in Amboseli.',
    highlights: ['Kilimanjaro Views', 'Elephant Herds', 'Photography Paradise', 'Exclusive Access', 'Expert Naturalists'],
    itinerary: [
      'Day 1: Arrival at lodge',
      'Day 2-3: Game drives and exploration',
      'Day 4: Departure',
    ],
    bestSeason: 'Year-round',
    activities: ['Game Drives', 'Photography', 'Cultural Visits', 'Bird Watching'],
  },
  {
    slug: 'tsavo',
    id: 5,
    title: 'Tsavo Wilderness Expedition',
    region: 'Kenya',
    days: 5,
    price: '',
    image: '/images/tsavo.webp',
    description: 'Explore the expansive wilderness of Tsavo East and West with private game drives and luxury bush camps.',
    highlights: ['Remote Wilderness', 'Luxury Bush Camps', 'River Safaris', 'Unique Landscapes', 'Photography'],
    itinerary: [
      'Day 1: Arrival and transfer to Tsavo',
      'Day 2-3: Game drives through Tsavo East and West',
      'Day 4: Visit Mzima Springs and walking safari',
      'Day 5: Departure',
    ],
    bestSeason: 'June - February',
    activities: ['Game Drives', 'Bush Walks', 'Bird Watching', 'Cultural Visits'],
  },
];

export default function SafarisPage() {
  const [filteredSafaris, setFilteredSafaris] = useState(safaris);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedSafari, setSelectedSafari] = useState<typeof safaris[0] | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleFavorite = (safariId: number) => {
    setFavorites(prev =>
      prev.includes(safariId)
        ? prev.filter(id => id !== safariId)
        : [...prev, safariId]
    );
  };

  const openQuickView = (safari: typeof safaris[0]) => {
    setSelectedSafari(safari);
    setIsQuickViewOpen(true);
  };

  const handleSearch = (filters: any) => {
    let filtered = safaris.filter(safari => {
      // Text search
      const matchesQuery = !filters.query ||
        safari.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        safari.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        safari.region.toLowerCase().includes(filters.query.toLowerCase());

      // Location filter
      const matchesLocation = !filters.location ||
        safari.region.toLowerCase().includes(filters.location.toLowerCase());

      // Price filter
      const safariPrice = parseInt(safari.price.replace(/[$,]/g, ''));
      const matchesPrice = safariPrice >= filters.minPrice && safariPrice <= filters.maxPrice;

      // Duration filter
      const safariDays = parseInt(safari.days.toString());
      const matchesDuration = safariDays >= filters.minDuration && safariDays <= filters.maxDuration;

      return matchesQuery && matchesLocation && matchesPrice && matchesDuration;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'price-low':
          aValue = parseInt(a.price.replace(/[$,]/g, ''));
          bValue = parseInt(b.price.replace(/[$,]/g, ''));
          return aValue - bValue;
        case 'price-high':
          aValue = parseInt(a.price.replace(/[$,]/g, ''));
          bValue = parseInt(b.price.replace(/[$,]/g, ''));
          return bValue - aValue;
        case 'duration':
          aValue = a.days;
          bValue = b.days;
          return bValue - aValue;
        default:
          // Default sort by price low to high
          aValue = parseInt(a.price.replace(/[$,]/g, ''));
          bValue = parseInt(b.price.replace(/[$,]/g, ''));
          return aValue - bValue;
      }
    });

    setFilteredSafaris(filtered);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/images/serve10.webp"
            alt="Safari packages hero image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Safari Packages</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Choose from our curated selection of unforgettable African wildlife adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAboutModalOpen(true)}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              About Gators Tours and Safaris
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/contact">Plan Your Safari</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Search Component */}
        <SafariSearch onSearch={handleSearch} />

        {/* Safaris Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSafaris.map((safari) => (
            <Card key={safari.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={safari.image}
                  alt={safari.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {safari.days} Days
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button
                    onClick={() => toggleFavorite(safari.id)}
                    size="sm"
                    variant="secondary"
                    className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                      favorites.includes(safari.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(safari.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => openQuickView(safari)}
                    size="sm"
                    variant="secondary"
                    className="p-2 rounded-full shadow-lg bg-white/80 text-gray-600 hover:bg-white transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button asChild size="sm" className="flex-1 bg-white/90 text-gray-800 hover:bg-white">
                    <Link href={`/safaris/${safari.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-300">
                      {safari.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {safari.region}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{safari.description}</p>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {safari.highlights.slice(0, 3).map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                        {highlight}
                      </Badge>
                    ))}
                    {safari.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{safari.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Best Season */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span><strong>Best Time:</strong> {safari.bestSeason}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Max 8 guests</span>
                  </div>
                  <div className="text-right">
                    {safari.price ? (
                      <span className="text-2xl font-bold text-green-600">{safari.price}</span>
                    ) : (
                      <span className="text-lg font-semibold text-green-600">Enquire for pricing</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Details expandable section */}
        <div className="mt-16 space-y-8">
          {safaris.map((safari) => (
            <Card key={`detail-${safari.id}`} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle>{safari.title} - Full Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="itinerary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="highlights">Highlights</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                  </TabsList>

                  <TabsContent value="itinerary" className="space-y-2">
                    {safari.itinerary.map((day, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700">{day}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="highlights" className="space-y-2">
                    {safari.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="activities" className="space-y-2">
                    {safari.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-green-600">•</span>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Us Modal */}
      <Dialog open={isAboutModalOpen} onOpenChange={setIsAboutModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">About Gators Tours and Safaris</DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            {/* Our Story */}
            <section>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Story</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Founded in 2015, Gators Tours and Safaris has been committed to delivering exceptional safari experiences to wildlife enthusiasts from around the world. With over a decade of experience, we've curated some of Africa's most memorable wildlife encounters.
                  </p>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Our team of expert guides, experienced safari organizers, and hospitality professionals work tirelessly to ensure every safari experience exceeds expectations.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We believe in sustainable tourism that protects Africa's wildlife while providing guests with authentic, transformative experiences.
                  </p>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
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
            <section>
              <h3 className="text-xl font-bold text-center mb-6">Our Mission & Vision</h3>
              <div className="grid md:grid-cols-2 gap-6">
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
            <section className="bg-gray-50 -mx-6 px-6 py-8 rounded-lg">
              <h3 className="text-xl font-bold text-center mb-6">Why Choose Us</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: '🎯', title: 'Expert Guides', description: 'Certified guides with 10+ years of experience' },
                  { icon: '🏆', title: 'Award-Winning', description: 'Recognized for excellence in safari tourism' },
                  { icon: '🌍', title: 'Sustainable', description: 'Committed to wildlife and environment conservation' },
                  { icon: '🏖️', title: 'Luxury Experience', description: 'Premium lodges and exceptional service' },
                  { icon: '💰', title: 'Best Value', description: 'Competitive pricing without compromising quality' },
                  { icon: '✈️', title: 'All-Inclusive', description: 'Complete packages from flights to accommodations' },
                ].map((item, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-4">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <h3 className="text-xl font-bold text-center mb-6">Meet Our Team</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'John Kariuki', role: 'Lead Safari Guide', bio: '15+ years in wildlife tourism' },
                  { name: 'Sarah Omondi', role: 'Tour Manager', bio: 'Expert itinerary planner' },
                  { name: 'David Kipchoge', role: 'Lead Driver', bio: 'Master of African roads' },
                ].map((member, index) => (
                  <Card key={index} className="text-center">
                    <div className="relative w-full h-32 bg-gray-300 mb-3 rounded-lg">
                      <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                        alt={member.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <CardContent className="pt-0">
                      <h4 className="font-semibold text-lg">{member.name}</h4>
                      <p className="text-green-600 font-medium text-sm mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-linear-to-r from-green-600 to-green-700 text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-3">Ready for Your Safari Adventure?</h3>
              <p className="text-gray-100 mb-4 max-w-xl mx-auto">
                Let our experts help you plan the perfect safari experience.
              </p>
              <Button
                onClick={() => {
                  setIsAboutModalOpen(false);
                  // Could navigate to contact or open contact modal
                }}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Contact Us Today
              </Button>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick View Modal */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedSafari?.title}</DialogTitle>
          </DialogHeader>

          {selectedSafari && (
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={selectedSafari.image}
                  alt={selectedSafari.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Location:</strong> {selectedSafari.region}
                </div>
                <div>
                  <strong>Duration:</strong> {selectedSafari.days} days
                </div>
                <div>
                  <strong>Best Time:</strong> {selectedSafari.bestSeason}
                </div>
                <div>
                  <strong>Price:</strong> {selectedSafari.price || 'Enquire for pricing'}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSafari.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <Link href={`/safaris/${selectedSafari.slug}`}>View Full Details</Link>
                </Button>
                <Button variant="outline" onClick={() => setIsQuickViewOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
