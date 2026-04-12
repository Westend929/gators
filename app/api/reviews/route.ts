import { NextRequest, NextResponse } from 'next/server';

// Cache for storing reviews to reduce API calls
let reviewsCache: any[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function GET(request: NextRequest) {
  try {
    // Check if cache is still valid
    if (reviewsCache.length > 0 && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({
        reviews: reviewsCache,
        cached: true,
      });
    }

    // Fetch from Google Places API
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { error: 'Google Places API not configured' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=reviews,rating,user_ratings_total`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews from Google Places API');
    }

    const data = await response.json();

    // Process and cache reviews
    const reviews = data.result?.reviews || [];
    const rating = data.result?.rating || 0;
    const totalReviews = data.result?.user_ratings_total || 0;

    reviewsCache = reviews.map((review: any) => ({
      id: review.time,
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      profilePhoto: review.profile_photo_url,
      time: new Date(review.time * 1000).toLocaleDateString(),
    }));

    cacheTimestamp = Date.now();

    return NextResponse.json({
      reviews: reviewsCache,
      overallRating: rating,
      totalReviews: totalReviews,
      cached: false,
    });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    
    // Return cached reviews even if fetch fails
    if (reviewsCache.length > 0) {
      return NextResponse.json({
        reviews: reviewsCache,
        cached: true,
        error: 'Using cached reviews due to API error',
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
