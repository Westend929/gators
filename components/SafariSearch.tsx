'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface SafariSearchProps {
  onSearch: (filters: {
    query: string;
    location: string;
    minPrice: number;
    maxPrice: number;
    minDuration: number;
    maxDuration: number;
    sortBy: string;
  }) => void;
}

export default function SafariSearch({ onSearch }: SafariSearchProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [duration, setDuration] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const handleSearch = () => {
    const priceRanges = {
      'all': { min: 0, max: 10000 },
      '1000-1500': { min: 1000, max: 1500 },
      '1500-2000': { min: 1500, max: 2000 },
      '2000+': { min: 2000, max: 10000 },
    };

    const durationRanges = {
      'all': { min: 1, max: 30 },
      '3-5': { min: 3, max: 5 },
      '6-8': { min: 6, max: 8 },
      '9+': { min: 9, max: 30 },
    };

    onSearch({
      query,
      location,
      minPrice: priceRanges[priceRange as keyof typeof priceRanges].min,
      maxPrice: priceRanges[priceRange as keyof typeof priceRanges].max,
      minDuration: durationRanges[duration as keyof typeof durationRanges].min,
      maxDuration: durationRanges[duration as keyof typeof durationRanges].max,
      sortBy,
    });
  };

  const clearFilters = () => {
    setQuery('');
    setLocation('');
    setPriceRange('all');
    setDuration('all');
    setSortBy('rating');
    onSearch({
      query: '',
      location: '',
      minPrice: 0,
      maxPrice: 10000,
      minDuration: 1,
      maxDuration: 30,
      sortBy: 'rating',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">Find Your Perfect Safari</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Query */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search safaris..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Location */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="kenya">Kenya</SelectItem>
            <SelectItem value="tanzania">Tanzania</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range */}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
            <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
            <SelectItem value="2000+">$2,000+</SelectItem>
          </SelectContent>
        </Select>

        {/* Duration */}
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger>
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Duration</SelectItem>
            <SelectItem value="3-5">3-5 Days</SelectItem>
            <SelectItem value="6-8">6-8 Days</SelectItem>
            <SelectItem value="9+">9+ Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}