import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; // Using public key for now since we have no RLS or anon can insert, or we should use service role key if available.

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const pitches = [
  // Kathmandu
  {
    name: "Dhanyentari Futsal",
    city: "Kathmandu",
    address: "Hadigaun, Kathmandu",
    price_per_hour: 1500,
    turf_type: "5v5 Premium Turf",
    rating: 4.6,
    reviews: 342,
    amenities: ["FIFA Grade Turf", "LED Floodlights", "Cafe", "Shower", "Parking"],
    description: "One of the most popular futsal venues in Kathmandu. Features high-quality FIFA-grade artificial turf and excellent lighting. Great atmosphere with an on-site cafe to relax after the game.",
    open_hours: "06:00 AM - 10:00 PM",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Royal Futsal",
    city: "Kathmandu",
    address: "Anamnagar, Kathmandu",
    price_per_hour: 1800,
    turf_type: "5v5 Artificial Grass",
    rating: 4.8,
    reviews: 512,
    amenities: ["Prime Location", "Floodlights", "Locker Rooms", "Waiting Area"],
    description: "Centrally located in Anamnagar, Royal Futsal is a favorite for corporate teams and evening leagues. Well-maintained courts with excellent drainage.",
    open_hours: "05:00 AM - 11:00 PM",
    images: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518605368461-1eb227653550?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Futsal Arena Boudha",
    city: "Kathmandu",
    address: "Boudha, Kathmandu",
    price_per_hour: 1200,
    turf_type: "7v7 Artificial Grass",
    rating: 4.4,
    reviews: 215,
    amenities: ["Large Pitch", "Free Parking", "Drinking Water", "Restrooms"],
    description: "A larger 7-a-side pitch situated near the Boudhanath area. Perfect for larger groups wanting more space to play. Highly affordable morning rates.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1529900898858-a401c18379c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Thamel Futsal Club",
    city: "Kathmandu",
    address: "Thamel, Kathmandu",
    price_per_hour: 2000,
    turf_type: "5v5 Indoor Hardwood",
    rating: 4.7,
    reviews: 189,
    amenities: ["Indoor AC", "Scoreboard", "Cafe/Bar", "Locker Rooms", "Shower"],
    description: "A premium indoor facility located in the heart of the tourist district. Features a professional hardwood court and an attached sports bar.",
    open_hours: "08:00 AM - 12:00 AM",
    images: [
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Koteshwor Arena",
    city: "Kathmandu",
    address: "Koteshwor, Kathmandu",
    price_per_hour: 1400,
    turf_type: "5v5 Artificial Grass",
    rating: 4.5,
    reviews: 275,
    amenities: ["Late Night Slots", "Floodlights", "Parking", "First Aid"],
    description: "Conveniently located for players in Koteshwor and Tinkune. Known for extended opening hours, allowing for late-night matches.",
    open_hours: "05:00 AM - 11:30 PM",
    images: [
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Lazimpat Sports Club",
    city: "Kathmandu",
    address: "Lazimpat, Kathmandu",
    price_per_hour: 1700,
    turf_type: "5v5 Premium Turf",
    rating: 4.9,
    reviews: 420,
    amenities: ["Clubhouse", "Premium Turf", "Spectator Seating", "Shower", "Cafe"],
    description: "A top-tier facility offering a clubhouse experience. Immaculately maintained turf and excellent facilities for both players and spectators.",
    open_hours: "06:00 AM - 10:00 PM",
    images: [
      "https://images.unsplash.com/photo-1629235948753-48b417c8cf15?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1431324155629-1a6d0a11f4d5?q=80&w=800&auto=format&fit=crop",
    ],
  },

  // Lalitpur
  {
    name: "Pulchowk Futsal Arena",
    city: "Lalitpur",
    address: "Pulchowk, Lalitpur",
    price_per_hour: 1600,
    turf_type: "5v5 Artificial Grass",
    rating: 4.8,
    reviews: 310,
    amenities: ["Excellent Floodlights", "Central Location", "Parking", "Changing Rooms"],
    description: "One of the best-lit arenas in Lalitpur, making it highly sought after for evening and night games. Centrally located with good parking.",
    open_hours: "06:00 AM - 10:00 PM",
    images: [
      "https://images.unsplash.com/photo-1518605368461-1eb227653550?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Sundhara Futsal Ground",
    city: "Lalitpur",
    address: "Sundhara, Patan, Lalitpur",
    price_per_hour: 1300,
    turf_type: "5v5 Artificial Grass",
    rating: 4.3,
    reviews: 156,
    amenities: ["Clean Facility", "Affordable Rates", "Water Provided"],
    description: "A very clean and well-maintained ground in the historic Patan area. Popular among local youth and corporate groups for friendly matches.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529900898858-a401c18379c6?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Yala Futsal & Recreational Center",
    city: "Lalitpur",
    address: "Patan, Lalitpur",
    price_per_hour: 1500,
    turf_type: "7v7 Soft Carpet",
    rating: 4.7,
    reviews: 289,
    amenities: ["Soft Carpet Surface", "Spacious Pitch", "Locker Rooms", "Parking"],
    description: "Features a unique soft-carpet surface that is easier on the knees. A very spacious 7-a-side pitch with modern recreational facilities.",
    open_hours: "06:00 AM - 10:00 PM",
    images: [
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Active Sports Complex",
    city: "Lalitpur",
    address: "Dholahiti, Lalitpur",
    price_per_hour: 1400,
    turf_type: "7v7 Artificial Grass",
    rating: 4.5,
    reviews: 198,
    amenities: ["Large Ground", "Night Lighting", "Changing Rooms", "Free Water"],
    description: "A solid choice in Dholahiti offering a large 7-a-side ground. Good amenities and competitive pricing for the area.",
    open_hours: "05:30 AM - 09:30 PM",
    images: [
      "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Sunakothi Sporting Club",
    city: "Lalitpur",
    address: "Sunakothi, Lalitpur",
    price_per_hour: 1200,
    turf_type: "7v7 Premium Turf",
    rating: 4.6,
    reviews: 134,
    amenities: ["New Turf", "Quiet Location", "Parking", "Refreshments"],
    description: "A newer destination in Lalitpur offering high-quality, fresh turf. Great for players looking to escape the city noise.",
    open_hours: "06:00 AM - 08:00 PM",
    images: [
      "https://images.unsplash.com/photo-1431324155629-1a6d0a11f4d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format&fit=crop",
    ],
  },

  // Bhaktapur
  {
    name: "Suryabinayak Futsal",
    city: "Bhaktapur",
    address: "Suryabinayak, Bhaktapur",
    price_per_hour: 1100,
    turf_type: "7v7 Artificial Grass",
    rating: 4.4,
    reviews: 245,
    amenities: ["Large Court", "Affordable", "Parking", "Spectator Area"],
    description: "Highly regarded in Bhaktapur, featuring a large 7-a-side court. Known for very affordable rates, especially for weekend morning slots.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518605368461-1eb227653550?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Glory Futsal",
    city: "Bhaktapur",
    address: "Radhe-Radhe, Thimi, Bhaktapur",
    price_per_hour: 1200,
    turf_type: "5v5 Artificial Grass",
    rating: 4.5,
    reviews: 178,
    amenities: ["Proper Lighting", "Bathrooms", "Changing Rooms", "High Quality Ground"],
    description: "Located conveniently in Radhe-Radhe, Thimi. Offers a very well-maintained ground with excellent lighting for evening games.",
    open_hours: "06:00 AM - 10:00 PM",
    images: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529900898858-a401c18379c6?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Imperial Rulz Futsal",
    city: "Bhaktapur",
    address: "Bhaktapur",
    price_per_hour: 1000,
    turf_type: "5v5 Artificial Grass",
    rating: 4.2,
    reviews: 112,
    amenities: ["Clean Washrooms", "Changing Rooms", "Good Turf Material"],
    description: "A budget-friendly option in Bhaktapur that doesn't compromise on turf quality or basic amenities like clean washrooms.",
    open_hours: "06:00 AM - 08:00 PM",
    images: [
      "https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Valley Futsal Arena",
    city: "Bhaktapur",
    address: "Balkot, Bhaktapur",
    price_per_hour: 1200,
    turf_type: "5v5 Artificial Grass",
    rating: 4.3,
    reviews: 145,
    amenities: ["Good Location", "Parking", "Refreshments"],
    description: "A popular and accessible arena in Balkot. Great for local teams looking for a reliable pitch with basic amenities.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800&auto=format&fit=crop",
    ],
  },
];

async function seed() {
  console.log(`Starting to seed ${pitches.length} pitches...`);

  for (const pitch of pitches) {
    const slug = generateSlug(pitch.name);
    
    // We try to insert. If the slug exists, we update.
    // Assuming the table 'pitches' has a unique constraint on 'slug'.
    const { data, error } = await supabase
      .from("pitches")
      .upsert(
        {
          ...pitch,
          slug,
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) {
      console.error(`❌ Failed to seed pitch: ${pitch.name}`);
      console.error(error);
    } else {
      console.log(`✅ Successfully seeded: ${pitch.name}`);
    }
  }

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Unexpected error during seeding:", err);
  process.exit(1);
});
