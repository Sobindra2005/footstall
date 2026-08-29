export interface Pitch {
  id: string;
  name: string;
  slug: string;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  pricePerHour: number;
  turfType: string;
  rating: number;
  reviews: number;
  images: string[];
  videoUrl?: string;
  amenities: string[];
  description: string;
  openHours: string;
}
