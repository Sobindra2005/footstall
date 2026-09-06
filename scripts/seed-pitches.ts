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
   {
    name: "Dhanyentari Futsal",
    city: "Kathmandu",
    address: "Dhanawantari Marg, Kathmandu 44600",
    price_per_hour: 1500,
    turf_type: "5v5 / 7v7 Artificial Turf",
    rating: 4.0,
    reviews: 1226,
    amenities: ["Cafeteria", "Swimming Pool", "Changing Room", "Free Drinking Water", "Parking"],
    description:
      "One of the most reviewed futsal venues in the valley, with two grounds plus an on-site restaurant and swimming pool. Well maintained and equally suited to casual games or tournaments, though some visitors note the grounds run a bit small for 7-a-side.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Dhuku Sports Hub",
    city: "Kathmandu",
    address: "4 Lamingtan Marg, Kathmandu 44600",
    price_per_hour: 1500,
    turf_type: "5v5 / 7v7 Turf",
    rating: 4.3,
    reviews: 914,
    amenities: ["Gym", "Indoor Swimming Pool", "Cafe", "Parking", "Physiotherapy"],
    description:
      "One of the oldest futsal grounds in Kathmandu, now expanded into a full sports complex with a heated indoor pool, gym, and cafe alongside the turf. A convenient one-stop venue, popular enough to get crowded on weekends.",
    open_hours: "06:00 AM - 08:00 PM",
    images: [
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Grande Sports Center",
    city: "Kathmandu",
    address: "Tokha Rd, Kathmandu 44600",
    price_per_hour: 1400,
    turf_type: "5v5 Turf (Two Grounds)",
    rating: 4.0,
    reviews: 365,
    amenities: ["Two Futsal Turfs", "Gym", "Basketball Court", "Parking"],
    description:
      "A weekly favorite for office groups thanks to two side-by-side turfs that make simultaneous bookings easy. Clean, friendly staff, and priced reasonably compared to venues closer to the city center.",
    open_hours: "06:00 AM - 08:00 PM",
    images: [
      "https://images.unsplash.com/photo-1600679472233-8ac9a49e2aec?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Surya Futsal",
    city: "Kathmandu",
    address: "4 Dhumbarahi Rd, Kathmandu 44600",
    price_per_hour: 1500,
    turf_type: "5v5 Turf",
    rating: 3.8,
    reviews: 339,
    amenities: ["Badminton Court", "Basketball", "Volleyball", "Changing Room", "Floodlights"],
    description:
      "A multi-sport venue tucked into Dhumbarahi offering futsal alongside badminton, basketball and volleyball courts. Turf grip and evening lighting are solid, though the location can be tricky to find on a first visit.",
    open_hours: "05:00 AM - 07:00 PM",
    images: [
      "https://images.unsplash.com/photo-1571056642284-1d3bc2b1f2e6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Ballmandu Futsal",
    city: "Kathmandu",
    address: "29 Abhiyan Marg, Kathmandu 44600",
    price_per_hour: 1500,
    turf_type: "7v7 Turf",
    rating: 4.8,
    reviews: 8,
    amenities: ["Ample Parking", "Clean Washroom", "7-a-side Ground"],
    description:
      "A smaller, newer venue with a laid-back, friendly owner and a quiet surrounding area. Runs 7-a-side games with plans to add indoor cricket. Parking is ample but tight for larger vehicles.",
    open_hours: "Contact venue for hours",
    images: [
      "https://images.unsplash.com/photo-1524015368236-f37fcf5ce756?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Empire Futsal",
    city: "Kathmandu",
    address: "Switchatar, Kathmandu 44600",
    price_per_hour: 1200,
    turf_type: "5v5 & 7v7 Turf",
    rating: 4.2,
    reviews: 31,
    amenities: ["Large Open Ground", "Both 5A & 7A Side", "Parking"],
    description:
      "A brand-new, spacious venue with both 5-a-side and 7-a-side pitches and taller-than-usual goalposts. Slightly out of the city center (around a 45-minute ride from central Kathmandu) but praised for atmosphere. Roughly Rs 1200/hr for small-side and Rs 2500/hr for large-side per recent players.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    ],
  },
 
  // ───────────── LALITPUR ─────────────
  {
    name: "TURF PARK",
    city: "Lalitpur",
    address: "Dholahiti Chokhel Marg, Lalitpur 44700",
    price_per_hour: 1600,
    turf_type: "5v5 Premium Turf",
    rating: 4.9,
    reviews: 33,
    amenities: ["Basketball Court", "Tennis Court", "Pickleball", "Cafe", "Parking", "Scenic View"],
    description:
      "A multi-sport complex with futsal, basketball, tennis and pickleball all on one site, set against an open, scenic backdrop. Plenty of water bottles provided during play and ample parking for bikes and cars.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1544298621-35a1a8d0f3d9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Creation Futsal",
    city: "Lalitpur",
    address: "Buddha Shanti Marg, Lalitpur 44700",
    price_per_hour: 1400,
    turf_type: "6v6 Turf",
    rating: 4.5,
    reviews: 39,
    amenities: ["New Turf", "6-a-side Ground", "Friendly Staff"],
    description:
      "A newer, well-maintained 6-a-side venue in a peaceful part of Lalitpur, with friendly staff and turf sized comfortably for the format. Priced a bit cheaper than nearby alternatives; washrooms could use closer attention.",
    open_hours: "07:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Field Futsal",
    city: "Lalitpur",
    address: "Sanepa Rd, Lalitpur 44700",
    price_per_hour: 1500,
    turf_type: "5v5 Turf",
    rating: 3.9,
    reviews: 519,
    amenities: ["Snooker & Pool", "Decent Washroom", "Ample Parking"],
    description:
      "A well-located Sanepa venue with a clean-grip pitch that isn't overloaded with rubber infill, plus a snooker and pool room for after the game. Rs 1500/hour, per regular players — reasonable for the area, though the washroom draws some complaints.",
    open_hours: "07:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Futsal Village",
    city: "Lalitpur",
    address: "Near Nakhipot Microstation Park, Loha Chowk, Lalitpur 44700",
    price_per_hour: 1400,
    turf_type: "5v5 Turf",
    rating: 4.1,
    reviews: 191,
    amenities: ["Open-air Ground", "Free Water Bottles", "Good View", "Parking"],
    description:
      "A spacious, open-environment turf near Nakhipot with a good outdoor vibe and generous free water bottles during play. Regulars describe the quality as consistently good over repeated weekly play.",
    open_hours: "Contact venue for hours",
    images: [
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571056642284-1d3bc2b1f2e6?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "GxG Arena",
    city: "Lalitpur",
    address: "Lalitpur 44700",
    price_per_hour: 1500,
    turf_type: "5v5 Turf",
    rating: 4.8,
    reviews: 9,
    amenities: ["Gym", "Cozy Cafe", "Great Ambience"],
    description:
      "A smaller venue that punches above its size on atmosphere — visitors repeatedly call out the ambience and on-site cafe alongside a well-kept pitch and gym.",
    open_hours: "05:00 AM - 09:00 PM (Sat: 07:00 AM - 09:00 PM)",
    images: [
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Dreamers Futsal, Siddhipur",
    city: "Lalitpur",
    address: "Siddhipur, Lalitpur 44700",
    price_per_hour: 1300,
    turf_type: "5v5 & 7v7 Turf",
    rating: 4.6,
    reviews: 44,
    amenities: ["Fresh Turf", "Both 5A & 7A Side", "Polite Staff", "Free Water"],
    description:
      "A newly opened ground with fresh turf and notably reasonable pricing for the valley. Staff are consistently praised as polite and helpful; access road quality is the main complaint.",
    open_hours: "Open 24 hours",
    images: [
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524015368236-f37fcf5ce756?q=80&w=800&auto=format&fit=crop",
    ],
  },
 
  // ───────────── BHAKTAPUR ─────────────
  {
    name: "Bhaktapur Futsal",
    city: "Bhaktapur",
    address: "Araniko Highway, Suryabinayak, Bhaktapur 44800",
    price_per_hour: 1500,
    turf_type: "5v5 Premium Turf (No Rubber Infill)",
    rating: 4.0,
    reviews: 158,
    amenities: ["Premium Turf", "Night Floodlights", "Parking", "Good Washroom"],
    description:
      "Long regarded as a benchmark for turf quality in Bhaktapur — a rubber-free surface that's still safe to play on, with a properly sized ground and no gaps for the ball to escape. Night games under lights cost a bit more.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Healthy Futsal",
    city: "Bhaktapur",
    address: "Bhaktapur 44800",
    price_per_hour: 1400,
    turf_type: "5v5 Turf (fits up to 6-a-side)",
    rating: 4.4,
    reviews: 134,
    amenities: ["Small Restaurant", "Good Parking", "Spectator Seating", "Clean Restrooms"],
    description:
      "A well-lit, well-maintained venue with an energetic, tournament-friendly atmosphere. The ground runs slightly larger than standard, comfortably fitting six players a side. On-site restaurant and clean restrooms round it out.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1600679472233-8ac9a49e2aec?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Khwopa Futsal and Training Center",
    city: "Bhaktapur",
    address: "Sundarbasti, Suryabinayak, Bhaktapur 44800",
    price_per_hour: 1300,
    turf_type: "5v5 Turf + Training Facility",
    rating: 4.1,
    reviews: 211,
    amenities: ["Training Programs", "Spectator Benches", "Fenced Ground", "Quiet Location"],
    description:
      "Doubles as a training center as well as a matchplay venue, with a fenced ground and bench seating for spectators. Set slightly away from busy residential roads for a calmer game-day feel; turf has been flagged as due for replacement.",
    open_hours: "06:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544298621-35a1a8d0f3d9?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Shooters Futsal",
    city: "Bhaktapur",
    address: "101 Araniko Highway, Bhaktapur 44800",
    price_per_hour: 1400,
    turf_type: "5v5 Turf",
    rating: 4.0,
    reviews: 178,
    amenities: ["Cafe", "Spacious Two-wheeler Parking", "Other Sports Available"],
    description:
      "A long-running Araniko Highway venue (playable since 2016 per regulars) that gets busy from 6 PM onward. Good two-wheeler parking and an on-site cafe; the turf infill has drawn some criticism for being too thin.",
    open_hours: "07:00 AM - 08:00 PM (Sat: 24 hours)",
    images: [
      "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Royal Nepal Futsal (7A Side)",
    city: "Bhaktapur",
    address: "Madhyapur Thimi, Bhaktapur 44600",
    price_per_hour: 2200,
    turf_type: "7v7 Turf (also runs 5A side)",
    rating: 4.5,
    reviews: 77,
    amenities: ["Cafe & Restaurant", "Spectator Parapet Seating", "Large Parking Area"],
    description:
      "A large, all-in-one venue built for competitive 7-a-side games, with a cafe/restaurant and parapet seating for spectators on both sides of the pitch. Ground, goalposts, and cafe are all kept in near-new condition; parking off the main road can be tight.",
    open_hours: "05:00 AM - 10:00 PM",
    images: [
      "https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524015368236-f37fcf5ce756?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    name: "Valley Futsal Arena",
    city: "Bhaktapur",
    address: "Bhaktapur 44800",
    price_per_hour: 1500,
    turf_type: "5v5 Premium Turf",
    rating: 4.1,
    reviews: 15,
    amenities: ["New Premium Turf", "Spacious & Well-ventilated", "Clean Seating", "Parking"],
    description:
      "A newer venue with notably good turf quality, spacious and well-ventilated, considered by regulars one of the better options around Bhaktapur. Some reports of double-booking issues — worth confirming your slot ahead of time.",
    open_hours: "05:00 AM - 09:00 PM",
    images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop",
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
