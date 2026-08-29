import { Pitch } from "../types/pitch";

export const dummyPitches: Pitch[] = [
  {
    id: "1",
    name: "Elite Futsal Arena",
    slug: "elite-futsal-arena",
    location: {
      city: "Downtown",
      address: "123 Main St, Downtown, FC 10001",
    },
    pricePerHour: 120,
    turfType: "5v5 Artificial Grass",
    rating: 4.8,
    reviews: 142,
    images: [
      "/coverImage.png",
      "/pass/1.jpg",
      "/shoot/1.jpg"
    ],
    amenities: ["Floodlights", "Free Parking", "Bibs & Balls Provided", "Locker Rooms", "Shower"],
    description: "Experience top-tier futsal at the Elite Arena. Featuring FIFA-certified artificial grass and professional-grade floodlights, this pitch is perfect for competitive 5v5 matches or casual kickabouts with friends. The facility includes modern locker rooms and a dedicated warm-up area.",
    openHours: "06:00 AM - 11:00 PM"
  },
  {
    id: "2",
    name: "Urban Kicks Indoor",
    slug: "urban-kicks-indoor",
    location: {
      city: "Westside",
      address: "45 Warehouse Row, Westside, FC 10045",
    },
    pricePerHour: 95,
    turfType: "5v5 Hardwood Indoor",
    rating: 4.5,
    reviews: 89,
    images: [
      "/shoot/2.jpg",
      "/pass/2.jpg",
      "/shoot/3.jpg"
    ],
    amenities: ["Indoor AC", "Scoreboard", "Cafe/Refreshments", "Locker Rooms"],
    description: "Beat the weather at Urban Kicks Indoor. A premium hardwood court designed for fast-paced, highly technical futsal. Ideal for leagues and serious training sessions. Enjoy our courtside cafe before or after your game.",
    openHours: "08:00 AM - 10:00 PM"
  },
  {
    id: "3",
    name: "The Green Pitch",
    slug: "the-green-pitch",
    location: {
      city: "Suburbs",
      address: "789 Park Ave, Suburbs, FC 10089",
    },
    pricePerHour: 75,
    turfType: "7v7 Artificial Grass",
    rating: 4.6,
    reviews: 210,
    images: [
      "/pass/4.jpg",
      "/shoot/4.jpg",
      "/pass/5.jpg"
    ],
    amenities: ["Floodlights", "Free Parking", "Spectator Seating", "Vending Machines"],
    description: "A larger 7v7 pitch located in the quiet suburbs. The Green Pitch offers an excellent playing surface with plenty of space for tactical play. Great for larger groups and weekend tournaments.",
    openHours: "07:00 AM - 09:00 PM"
  },
  {
    id: "4",
    name: "Neon Nights Turf",
    slug: "neon-nights-turf",
    location: {
      city: "City Center",
      address: "88 Neon Blvd, City Center, FC 10022",
    },
    pricePerHour: 150,
    turfType: "5v5 Premium Turf",
    rating: 4.9,
    reviews: 305,
    images: [
      "/shoot/5.jpg",
      "/pass/6.jpg",
      "/shoot/6.jpg"
    ],
    amenities: ["LED Floodlights", "Valet Parking", "Pro Shop", "Locker Rooms", "Shower", "Video Recording"],
    description: "The most exclusive pitch in the city. Neon Nights features state-of-the-art LED lighting, premium 4G turf, and automated video recording so you can rewatch your best goals. Book early as slots fill up fast.",
    openHours: "24/7"
  }
];
