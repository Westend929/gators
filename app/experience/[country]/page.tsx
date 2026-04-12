import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const countries = [
  {
    id: 'kenya',
    name: 'Kenya',
    description: 'Experience the ultimate wildlife adventure in Kenya, home to the Big Five and the Great Migration.',
    image: '/images/9days.webp',
    highlights: [
      'Masai Mara National Reserve',
      'Amboseli National Park',
      'Tsavo East & West',
      'Lake Nakuru National Park',
      'Maasai Cultural Experiences'
    ],
    activities: [
      'Game Drives',
      'Hot Air Balloon Safaris',
      'Walking Safaris',
      'Bird Watching',
      'Cultural Visits'
    ],
    bestTime: 'June to September and December to March',
    detailedDescription: 'Kenya offers some of the most iconic safari experiences in Africa. From the vast plains of the Masai Mara where the Great Migration unfolds, to the snow-capped Mount Kilimanjaro views from Amboseli, Kenya provides unforgettable wildlife encounters. Experience the rich Maasai culture and witness the Big Five in their natural habitat.'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    description: 'Discover the Serengeti plains and climb Mount Kilimanjaro in the heart of Tanzania.',
    image: '/images/12days.webp',
    highlights: [
      'Serengeti National Park',
      'Ngorongoro Crater',
      'Mount Kilimanjaro',
      'Zanzibar Islands',
      'Tarangire National Park'
    ],
    activities: [
      'Great Migration Viewing',
      'Mountain Climbing',
      'Beach Holidays',
      'Cultural Safaris',
      'Photography Tours'
    ],
    bestTime: 'June to September (dry season)',
    detailedDescription: 'Tanzania is a safari paradise featuring the world-famous Serengeti National Park and the Ngorongoro Crater. Challenge yourself with a Mount Kilimanjaro climb or relax on the beautiful beaches of Zanzibar. The country offers diverse landscapes from savannas to mountains, providing endless adventure opportunities.'
  },
  {
    id: 'uganda',
    name: 'Uganda',
    description: 'Witness mountain gorillas and explore the source of the Nile in Uganda.',
    image: '/images/11days.webp',
    highlights: [
      'Bwindi Impenetrable Forest',
      'Queen Elizabeth National Park',
      'Murchison Falls',
      'Kibale Forest',
      'Lake Victoria'
    ],
    activities: [
      'Gorilla Trekking',
      'Chimpanzee Tracking',
      'White-water Rafting',
      'Bird Watching',
      'Community Tourism'
    ],
    bestTime: 'June to September and December to February',
    detailedDescription: 'Uganda is renowned for its mountain gorilla trekking experiences in Bwindi Impenetrable Forest. Explore the source of the Nile River, track chimpanzees in Kibale Forest, and enjoy white-water rafting on the Nile. The country combines incredible wildlife with warm hospitality and diverse ecosystems.'
  }
];

interface PageProps {
  params: Promise<{
    country: string;
  }>;
}

export default async function CountryExperiencePage({ params }: PageProps) {
  const { country: countryId } = await params;
  const country = countries.find(c => c.id === countryId);

  if (!country) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={country.image}
          alt={country.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{country.name} Safari Experiences</h1>
            <p className="text-xl max-w-2xl mx-auto">{country.description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Detailed Description */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">{country.detailedDescription}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Highlights & Activities */}
          <div className="space-y-8">
            {/* Highlights */}
            <div>
              <h2 className="text-3xl font-bold text-green-600 mb-6">Highlights</h2>
              <div className="grid gap-4">
                {country.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-lg text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h2 className="text-3xl font-bold text-green-600 mb-6">Activities</h2>
              <div className="grid gap-4">
                {country.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-lg text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Best Time & CTA */}
          <div className="space-y-8">
            {/* Best Time */}
            <div className="bg-linear-to-r from-blue-50 to-green-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Best Time to Visit</h2>
              <p className="text-lg text-blue-700 mb-6">{country.bestTime}</p>
              <div className="bg-white p-4 rounded">
                <h3 className="font-semibold mb-2">Weather Considerations</h3>
                <p className="text-sm text-gray-600">
                  {country.id === 'kenya' && 'Kenya has two rainy seasons (April-May and October-November) and two dry seasons. The dry seasons offer the best wildlife viewing.'}
                  {country.id === 'tanzania' && 'Tanzania\'s dry season (June-September) provides excellent visibility for wildlife viewing and fewer mosquitoes.'}
                  {country.id === 'uganda' && 'Uganda has two dry seasons. The main dry season (June-September) is ideal for gorilla trekking and wildlife viewing.'}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white shadow-lg p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Ready to Experience {country.name}?</h2>
              <p className="text-gray-700 mb-6">
                Contact our expert team to plan your customized {country.name} safari adventure.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3">
                  Plan Your {country.name} Safari
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 text-lg py-3" asChild>
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>

            {/* Back to Experiences */}
            <div className="text-center">
              <Button variant="ghost" asChild>
                <Link href="/experience" className="text-green-600 hover:text-green-700">
                  ← Back to All Experiences
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Destinations */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Other Destinations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {countries.filter(c => c.id !== country.id).map((otherCountry) => (
              <div key={otherCountry.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={otherCountry.image}
                    alt={otherCountry.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-2">{otherCountry.name}</h3>
                  <p className="text-gray-700 mb-4">{otherCountry.description}</p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Link href={`/experience/${otherCountry.id}`}>Explore {otherCountry.name}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { country: countryId } = await params;
  const country = countries.find(c => c.id === countryId);
  return {
    title: `${country?.name} Safari Experiences | Gators Tours and Safaris`,
    description: country?.description,
  };
}