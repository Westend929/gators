'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  profilePhoto: string;
  time: string;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        setReviews(data.reviews || []);
        setOverallRating(data.overallRating || 0);
        setTotalReviews(data.totalReviews || 0);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const reviewsToShow = reviews.slice(0, 6);

  const scrollToIndex = (index: number) => {
    if (!cardRefs.current[index]) return;
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reviewsToShow.length - 1));
  };

  useEffect(() => {
    if (reviewsToShow.length > 0) {
      scrollToIndex(currentIndex);
    }
  }, [currentIndex, reviewsToShow.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-600" />
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[.4em] text-green-600 font-semibold">Client Feedback</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Safari Travelers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real guest reviews from travelers who experienced Africa with us.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={i < Math.floor(overallRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <div>
              <p className="text-2xl font-bold">{overallRating.toFixed(1)}</p>
              <p className="text-sm text-gray-600">{totalReviews} reviews</p>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-x-0 top-0 flex justify-between px-2 -mt-2 md:mt-0 md:relative md:px-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-white border border-gray-200 shadow-sm rounded-full p-3 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === reviewsToShow.length - 1}
                className="bg-white border border-gray-200 shadow-sm rounded-full p-3 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <div className="overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth scrollbar-hide"
              >
                {reviewsToShow.map((review, index) => (
                  <div
                    key={review.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="min-w-[320px] max-w-[320px] snap-start bg-white rounded-3xl shadow-md border border-gray-200 p-6 shrink-0 transition hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {review.profilePhoto && (
                        <Image
                          src={review.profilePhoto}
                          alt={review.author}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://www.google.com/maps/place/Gators+Safaris/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              View All Reviews on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
