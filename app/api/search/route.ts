import { NextRequest, NextResponse } from 'next/server';

// Mock data for safaris - in production, this would come from a database
const safaris = [
  {
    id: 'masai-mara',
    title: 'Masai Mara Safari',
    location: 'Masai Mara, Kenya',
    duration: 5,
    price: 1550,
    rating: 4.8,
    description: 'Experience the vast plains of Masai Mara with incredible wildlife viewing.',
    features: ['Big Five', 'Game Drives', 'Luxury Accommodation'],
    tags: ['wildlife', 'migration', 'luxury', 'kenya'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=760&h=500&fit=crop',
  },
  {
    id: 'serengeti',
    title: 'Serengeti Adventure',
    location: 'Serengeti, Tanzania',
    duration: 7,
    price: 2100,
    rating: 4.9,
    description: 'Witness the great migration in the heart of Serengeti National Park.',
    features: ['Migration', 'Hot Air Balloon', 'Luxury Camps'],
    tags: ['migration', 'balloon', 'luxury', 'tanzania'],
  },
  {
    id: 'kilimanjaro',
    title: 'Kilimanjaro Trek',
    location: 'Kilimanjaro, Tanzania',
    duration: 6,
    price: 1800,
    rating: 4.7,
    description: 'Climb Africa\'s highest peak with experienced guides.',
    features: ['Trekking', 'Cultural Experience', 'Expert Guides'],
    tags: ['climbing', 'mountain', 'cultural', 'tanzania'],
  },
  {
    id: 'amboseli',
    title: 'Amboseli Park',
    location: 'Amboseli, Kenya',
    duration: 4,
    price: 1200,
    rating: 4.6,
    description: 'See Mount Kilimanjaro and encounter the Big Five in Amboseli.',
    features: ['Kilimanjaro Views', 'Elephants', 'Photography'],
    tags: ['elephants', 'photography', 'mountain-view', 'kenya'],
  },
  {
    id: 'tsavo',
    title: 'Tsavo Safari',
    location: 'Tsavo, Kenya',
    duration: 5,
    price: 1350,
    rating: 4.5,
    description: 'Explore the vast Tsavo National Park with diverse wildlife.',
    features: ['Diverse Wildlife', 'Bird Watching', 'Photography'],
    tags: ['wildlife', 'birds', 'photography', 'kenya'],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const location = searchParams.get('location')?.toLowerCase() || '';
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '10000');
    const minDuration = parseInt(searchParams.get('minDuration') || '1');
    const maxDuration = parseInt(searchParams.get('maxDuration') || '30');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const filteredSafaris = safaris.filter(safari => {
      // Text search
      const matchesQuery = !query ||
        safari.title.toLowerCase().includes(query) ||
        safari.description.toLowerCase().includes(query) ||
        safari.location.toLowerCase().includes(query) ||
        safari.tags.some(tag => tag.toLowerCase().includes(query));

      // Location filter
      const matchesLocation = !location ||
        safari.location.toLowerCase().includes(location);

      // Price filter
      const matchesPrice = safari.price >= minPrice && safari.price <= maxPrice;

      // Duration filter
      const matchesDuration = safari.duration >= minDuration && safari.duration <= maxDuration;

      return matchesQuery && matchesLocation && matchesPrice && matchesDuration;
    });

    // Sorting
    filteredSafaris.sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'duration':
          aValue = a.duration;
          bValue = b.duration;
          break;
        case 'rating':
        default:
          aValue = a.rating;
          bValue = b.rating;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    // Pagination
    const total = filteredSafaris.length;
    const paginatedResults = filteredSafaris.slice(offset, offset + limit);

    return NextResponse.json({
      safaris: paginatedResults,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

// Get search suggestions
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = new Set<string>();

    safaris.forEach(safari => {
      // Add matching titles
      if (safari.title.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(safari.title);
      }

      // Add matching locations
      if (safari.location.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(safari.location);
      }

      // Add matching tags
      safari.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });

    return NextResponse.json({
      suggestions: Array.from(suggestions).slice(0, 10),
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}