
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BookingWidget from '@/components/BookingWidget';
import RelatedSafaris from '@/components/RelatedSafaris';
import SafariGallery from '@/components/SafariGallery';

type Safari = {
  slug: string;
  id: string;
  title: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  itinerary: string[];
  highlights: string[];
};

const safariDetails: Safari[] = [
  {
    slug: 'masai-mara',
    id: '1',
    title: 'Masai Mara Safari',
    duration: '5 Days',
    price: 'Enquire for pricing',
    image: '/images/rename3.jpg',
    description: 'Experience the vast plains of Masai Mara with incredible wildlife viewing and luxury service.',
    itinerary: [
      'Day 1: Arrival in Nairobi and transfer to Masai Mara.',
      'Day 2: Morning and evening game drives.',
      'Day 3: Full-day safari with a picnic lunch.',
      'Day 4: Optional balloon ride and safari activities.',
      'Day 5: Transfer back to Nairobi and departure.',
    ],
    highlights: ['Big Five', 'Great Migration', 'Luxury Lodges', 'Cultural Visits'],
  },
  {
    slug: 'serengeti',
    id: '2',
    title: 'Serengeti Adventure',
    duration: '7 Days',
    price: 'Enquire for pricing',
    image: '/images/rename4.jpg',
    description: 'Witness the great migration while staying in iconic luxury camps across the Serengeti.',
    itinerary: [
      'Day 1: Arrival and evening safari.',
      'Day 2: Northern Serengeti game drive.',
      'Day 3: Migration viewing and river crossings.',
      'Day 4: Central Serengeti exploration.',
      'Day 5: Crater rim tour.',
      'Day 6: Sunset drive and cultural visit.',
      'Day 7: Departure.',
    ],
    highlights: ['Great Migration', 'Hot Air Balloon', 'Big Cats', 'Extended Game Drives'],
  },
  {
    slug: 'kilimanjaro',
    id: '3',
    title: 'Kilimanjaro Trek',
    duration: '6 Days',
    price: 'Enquire for pricing',
    image: '/images/rename5.jpg',
    description: 'Climb Mount Kilimanjaro with expert guides and secure routes for an unforgettable summit experience.',
    itinerary: [
      'Day 1: Arrival and briefing.',
      'Day 2: Trek through rainforest.',
      'Day 3: Alpine desert ascent.',
      'Day 4: Summit attempt and descent.',
      'Day 5: Recovery and safari activities.',
      'Day 6: Departure.',
    ],
    highlights: ['Guided Trek', 'Summit Support', 'Accommodation', 'Stunning Views'],
  },
  {
    slug: 'amboseli',
    id: '4',
    title: 'Amboseli Park',
    duration: '4 Days',
    price: 'Enquire for pricing',
    image: '/images/rename6.jpg',
    description: 'Experience Amboseli with breathtaking Kilimanjaro views and elephant herds.',
    itinerary: [
      'Day 1: Arrival and lodge check-in.',
      'Day 2: Full-day game drive with Kilimanjaro views.',
      'Day 3: Cultural visit and early morning drive.',
      'Day 4: Departure.',
    ],
    highlights: ['Mount Kilimanjaro Views', 'Elephant Herds', 'Bird Watching', 'Luxury Camp'],
  },
  {
    slug: 'tsavo',
    id: '5',
    title: 'Tsavo Wilderness Expedition',
    duration: '5 Days',
    price: 'Enquire for pricing',
    image: '/images/rename6.jpg',
    description: 'Explore the expansive wilderness of Tsavo East and West with private game drives.',
    itinerary: [
      'Day 1: Arrival and transfer to Tsavo.',
      'Day 2: Game drive through Tsavo East.',
      'Day 3: Visit Yatta Plateau and riverside safari.',
      'Day 4: Tsavo West and Mzima Springs.',
      'Day 5: Departure via Nairobi.',
    ],
    highlights: ['Remote Wilderness', 'Luxury Bush Camps', 'River Safaris', 'Unique Landscapes'],
  },
];

export async function generateStaticParams() {
  return safariDetails.map((safari) => ({
    slug: safari.slug,
  }));
}

interface SafariPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SafariDetailPage({ params }: SafariPageProps) {
  const { slug } = await params;
  const safari = safariDetails.find((item) => item.slug === slug);

  if (!safari) {
    notFound();
  }

  const galleryImages = [
    {
      id: '1',
      src: safari.image,
      alt: `${safari.title} landscape`,
      caption: 'Stunning safari landscape',
    },
    {
      id: '2',
      src: '/images/serve102.jpg',
      alt: 'Wildlife photography',
      caption: 'Capturing wildlife moments',
    },
    {
      id: '3',
      src: '/images/curated9.jpg',
      alt: 'Safari camp',
      caption: 'Luxury safari accommodation',
    },
    {
      id: '4',
      src: '/images/service13.webp',
      alt: 'Game drive',
      caption: 'Exciting game drive experience',
    },
  ];

  return (
    <div className="pb-16">
      <section className="relative h-[45vh] md:h-[60vh]">
        <Image src={safari.image} alt={safari.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <span className="mb-4 inline-block rounded-full bg-green-600/90 px-4 py-2 text-sm uppercase tracking-[.3em]">
            {safari.duration}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{safari.title}</h1>
          <p className="max-w-3xl text-lg text-white/90">{safari.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 xl:grid-cols-[2fr,1fr]">
          <div>
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Itinerary Overview</h2>
              <div className="space-y-4">
                {safari.itinerary.map((item, idx) => (
                  <div key={idx} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-green-50 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Why Choose This Safari?</h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                {safari.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <BookingWidget safari={safari} />
          </aside>
        </div>
      </div>

      <SafariGallery images={galleryImages} title="Safari Gallery" />

      <RelatedSafaris currentSafariId={safari.slug} />
    </div>
  );
}