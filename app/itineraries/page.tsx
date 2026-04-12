'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, MapPin, Calendar, DollarSign, Users } from 'lucide-react';

const itineraries = [
  {
    slug: 'kenya-highlights',
    title: '7 Days Kenya Highlights Safari (Mid-Range)',
    duration: '7 Days',
    region: 'Kenya',
    summary: 'Nairobi → Amboseli → Lake Nakuru → Masai Mara → Nairobi. Big Five, elephants, rhinos, big cats, scenery, birdlife, photography.',
    price: 'USD 1,750 – 3,850 per person',
    image: '/images/3daysmara.webp',
    bestFor: 'Big Five, elephants, rhinos, big cats, scenery, birdlife, photography',
    dayByDay: [
      {
        day: 1,
        title: 'Nairobi → Amboseli National Park',
        activities: [
          'Early morning pick up in Nairobi (hotel / airport / residence)',
          'Drive to Amboseli National Park (approx. 4.5–5.5 hrs)',
          'Scenic drive via Emali with short stopover',
          'Arrive in time for lunch at lodge/camp',
          'Relax after check-in',
          'Afternoon game drive in Amboseli',
        ],
        highlights: ['Large elephant herds', 'Mt. Kilimanjaro views', 'Zebra, wildebeest, giraffe', 'Buffalo, hyena, lions', 'Excellent birdlife'],
        meals: ['Lunch', 'Dinner'],
        lodge: 'Kibo Safari Camp / Amboseli Sopa Lodge / Sentrim Amboseli',
      },
      {
        day: 2,
        title: 'Full Day in Amboseli National Park',
        activities: [
          'Early morning sunrise game drive',
          'Return for breakfast',
          'Mid-morning relaxation at camp/lodge',
          'Optional swimming / photography / birdwatching',
          'Lunch',
          'Afternoon game drive to Amboseli swamps and Observation Hill',
          'Visit marshes for elephants, hippos, buffalo and water birds',
          'Sunset photography',
        ],
        highlights: ['Kilimanjaro views', 'Elephant encounters', 'Hippos and water birds', 'Sunset views'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        lodge: 'Same lodge in Amboseli',
        addOns: ['Maasai village visit', 'Sundowner experience'],
      },
      {
        day: 3,
        title: 'Amboseli → Lake Nakuru',
        activities: [
          'Early breakfast',
          'Depart Amboseli for Lake Nakuru',
          'Lunch en route / packed lunch',
          'Arrive Nakuru in late afternoon',
          'Check in and relax',
          'Optional evening at lodge for birding / photography',
        ],
        highlights: ['Black & white rhinos', 'Rothschild\'s giraffe', 'Tree-climbing lions', 'Pelicans & flamingos', 'Great birding'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        lodge: 'Lake Nakuru Sopa Lodge / Sarova Lion Hill / Ziwa Bush Lodge',
      },
      {
        day: 4,
        title: 'Lake Nakuru National Park → Masai Mara',
        activities: [
          'Early breakfast',
          'Morning game drive in Lake Nakuru National Park',
          'Exit park late morning',
          'Drive to Masai Mara National Reserve (approx. 5–6 hrs)',
          'Arrive for late lunch / check-in',
          'Late afternoon game drive in Masai Mara',
        ],
        highlights: ['Rhinos', 'Leopards', 'Buffalo', 'Waterbuck', 'Birdlife along lakes'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        lodge: 'Mara Sopa Lodge / Mara Simba Lodge / Sarova Mara Game Camp / Muthu Keekorok',
      },
      {
        day: 5,
        title: 'Full Day in Masai Mara National Reserve',
        activities: [
          'Early breakfast',
          'Full-day game drive with picnic lunch',
          'Explore key wildlife areas: Big cat territory, open plains, Mara River',
          'Seasonal crossings (July–Oct)',
          'Hippo pools exploration',
          'Return to camp/lodge at sunset',
        ],
        highlights: ['Lions', 'Cheetahs', 'Leopards', 'Elephants', 'Buffalo', 'Hyenas', 'Mara River crossings'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        lodge: 'Same lodge in Masai Mara',
        addOns: ['Hot air balloon safari', 'Maasai village cultural visit'],
      },
      {
        day: 6,
        title: 'Full Day in Masai Mara National Reserve',
        activities: [
          'Early morning game drive',
          'Return for breakfast + rest',
          'Lunch at lodge',
          'Afternoon game drive until sunset',
          'Perfect for photographers and wildlife behavior observation',
        ],
        highlights: ['Big cats', 'Migration viewing', 'Wildlife behavior', 'Exceptional photography'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        lodge: 'Same lodge in Masai Mara',
      },
      {
        day: 7,
        title: 'Masai Mara → Nairobi',
        activities: [
          'Early breakfast',
          'Optional short early morning game drive',
          'Check out',
          'Drive back to Nairobi (approx. 5–6 hrs)',
          'Lunch en route',
          'Drop off at hotel / JKIA / Wilson Airport / residence',
        ],
        highlights: ['Scenic drive back', 'Photo opportunities'],
        meals: ['Breakfast', 'Lunch (optional)'],
      },
    ],
    accommodations: {
      amboseli: {
        nights: 2,
        options: ['Amboseli Sopa Lodge', 'Kibo Safari Camp', 'Amboseli, Kenya'],
      },
      nakuru: {
        nights: 1,
        options: ['Lake Nakuru Sopa Lodge', 'Sarova Lion Hill Game Lodge'],
      },
      mara: {
        nights: 3,
        options: ['Mara Sopa Lodge', 'Mara Simba Lodge', 'Sarova Mara Game Camp'],
      },
    },
    pricing: [
      {
        season: 'Green Season (Apr–Jun)',
        '2Pax': 'USD 2,450 – 2,850',
        '4Pax': 'USD 1,950 – 2,350',
        '6Pax': 'USD 1,750 – 2,450',
      },
      {
        season: 'Shoulder Season (Jan–Mar / Nov)',
        '2Pax': 'USD 2,650 – 3,350',
        '4Pax': 'USD 2,250 – 2,750',
        '6Pax': 'USD 1,950 – 2,450',
      },
      {
        season: 'High Season (Jul–Oct / Dec)',
        '2Pax': 'USD 3,350 – 3,850',
        '4Pax': 'USD 2,650 – 3,250',
        '6Pax': 'USD 2,350 – 2,950',
      },
    ],
    included: [
      'Transport in private 4x4 Land Cruiser with pop-up roof',
      'Professional English-speaking safari guide/driver',
      'All game drives as per itinerary',
      '6 nights accommodation',
      'Meals on full board while on safari',
      'Drinking water during game drives',
      'Park entry fees',
      'Pick up and drop off in Nairobi',
    ],
  },
  {
    slug: 'serengeti',
    title: 'Serengeti Migration Itinerary',
    duration: '7 Days',
    region: 'Tanzania',
    summary: 'Track the great migration and enjoy premium lodges in Tanzania.',
    price: 'Contact for pricing',
    image: '/images/serengeti.jpg',
  },
  {
    slug: 'kilimanjaro',
    title: 'Kilimanjaro Summit Itinerary',
    duration: '14 Days',
    region: 'Tanzania',
    summary: '14-day trek to Uhuru Peak with expert guides and acclimatization.',
    price: 'Contact for pricing',
    image: '/images/popular8.jpg',
  },
];

function ItineraryCard({ itinerary }: { itinerary: (typeof itineraries)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card key={itinerary.slug} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image src={itinerary.image} alt={itinerary.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{itinerary.title}</CardTitle>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <Calendar size={16} className="text-green-600" /> {itinerary.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} className="text-green-600" /> {itinerary.region}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{itinerary.summary}</p>
        {itinerary.bestFor && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">Best for:</p>
            <p className="text-sm text-blue-800">{itinerary.bestFor}</p>
          </div>
        )}

        {expanded && itinerary.dayByDay && (
          <div className="border-t pt-4 space-y-4">
            {itinerary.dayByDay.map((dayInfo) => (
              <div key={dayInfo.day} className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-lg text-gray-900">
                  Day {dayInfo.day}: {dayInfo.title}
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {dayInfo.activities.slice(0, 3).map((activity, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600">•</span> {activity}
                    </li>
                  ))}
                  {dayInfo.activities.length > 3 && (
                    <li className="text-green-600 font-medium">+ {dayInfo.activities.length - 3} more activities</li>
                  )}
                </ul>
                {dayInfo.highlights && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dayInfo.highlights.slice(0, 2).map((highlight, idx: number) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {itinerary.accommodations && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Recommended Accommodations</h4>
                <div className="grid gap-3 text-sm">
                  {itinerary.accommodations.amboseli && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-900">{itinerary.accommodations.amboseli.nights} nights in Amboseli</p>
                      {itinerary.accommodations.amboseli.options.map((opt, idx: number) => (
                        <p key={idx} className="text-gray-600">{opt}</p>
                      ))}
                    </div>
                  )}
                  {itinerary.accommodations.nakuru && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-900">{itinerary.accommodations.nakuru.nights} night in Lake Nakuru</p>
                      {itinerary.accommodations.nakuru.options.map((opt, idx: number) => (
                        <p key={idx} className="text-gray-600">{opt}</p>
                      ))}
                    </div>
                  )}
                  {itinerary.accommodations.mara && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-semibold text-gray-900">{itinerary.accommodations.mara.nights} nights in Masai Mara</p>
                      {itinerary.accommodations.mara.options.map((opt, idx: number) => (
                        <p key={idx} className="text-gray-600">{opt}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {itinerary.pricing && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign size={18} className="text-green-600" /> Pricing by Season
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-semibold">Season</th>
                        <th className="text-left py-2 px-2 font-semibold">2 Pax</th>
                        <th className="text-left py-2 px-2 font-semibold">4 Pax</th>
                        <th className="text-left py-2 px-2 font-semibold">6 Pax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itinerary.pricing.map((row, idx: number) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 px-2">{row.season}</td>
                          <td className="py-2 px-2">{row['2Pax']}</td>
                          <td className="py-2 px-2">{row['4Pax']}</td>
                          <td className="py-2 px-2">{row['6Pax']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {itinerary.included && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                <ul className="space-y-2 text-sm">
                  {itinerary.included.map((item, idx: number) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
          <span className="text-lg font-bold text-green-600">{itinerary.price}</span>
          <div className="flex gap-2">
            {itinerary.dayByDay && (
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <>
                    <ChevronUp size={18} className="mr-1" /> Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} className="mr-1" /> View Details
                  </>
                )}
              </Button>
            )}
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ItinerariesPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-slate-900 text-white py-16">
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/images/serengeti.jpg"
            alt="AI generated itinerary hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[.4em] mb-3 text-green-200">Wildlife Itineraries</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Safari Itineraries</h1>
          <p className="max-w-3xl mx-auto text-gray-100 text-lg">
            Explore our complete range of carefully crafted safari itineraries designed for unforgettable journeys across Africa.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.slug} itinerary={itinerary} />
          ))}
        </div>
      </div>
    </div>
  );
}

