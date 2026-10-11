export const business = {
  name: "NANDA TOURS & TRAVELS",
  shortName: "NANDA",
  category: "Premium Travel & Chauffeur Services",
  phoneDisplay: "+91 63047 26918",
  phoneHref: "tel:6304726918",
  phone2Display: "+91 81211 64499",
  phone2Href: "tel:8121164499",
  whatsappNumber: "916304726918",
  address: "29-159/3, New Vidya Nagar, Bank Colony, Malkajgiri, Secunderabad, Telangana 500056",
  addressLines: [
    "29-159/3, New Vidya Nagar,",
    "Bank Colony, Malkajgiri,",
    "Secunderabad, Telangana 500056",
  ],
  hours: "Open 24 hours",
  rating: "4.9",
  reviewCount: 223,
  experienceYears: "28+",
  sinceYear: "1998",
  googleBusinessUrl:
    "https://www.google.com/maps/search/?api=1&query=Nanda+Tours+%26+Travels+Malkajgiri+Secunderabad",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=29-159%2F3%2C+New+Vidya+Nagar%2C+Bank+Colony%2C+Malkajgiri%2C+Secunderabad%2C+Telangana+500056",
  mapEmbedUrl:
    "https://www.google.com/maps?q=29-159%2F3%2C+New+Vidya+Nagar%2C+Bank+Colony%2C+Malkajgiri%2C+Secunderabad%2C+Telangana+500056&output=embed",
} as const;

export const navItems = [
  ["Home", "#home"], ["Services", "#services"], ["Fleet", "#fleet"],
  ["Outstation", "#outstation"], ["Hyderabad Local", "#hyderabad"],
  ["About Us", "#about"], ["Reviews", "#reviews"], ["Contact", "#contact"],
] as const;

export const services = [
  { title: "Hyderabad City Travel", text: "Comfortable local transportation for business, shopping, family and personal travel.", image: "city" },
  { title: "Airport Transfers", text: "Reliable pickup and drop services designed around your flight schedule.", image: "airport" },
  { title: "Outstation Travel", text: "Comfortable long-distance journeys across Telangana and Andhra Pradesh.", image: "road" },
  { title: "Corporate Travel", text: "Professional transportation solutions for executives, employees and corporate requirements.", image: "fleet" },
  { title: "Family Trips", text: "Comfortable and spacious travel designed for family journeys.", image: "family" },
  { title: "Day Trips & Excursions", text: "Explore destinations comfortably with flexible travel arrangements.", image: "excursion" },
  { title: "One-Way Trips", text: "Convenient point-to-point travel without unnecessary complications.", image: "oneway" },
  { title: "Round Trips", text: "Plan your complete journey with a dependable vehicle and driver.", image: "round" },
] as const;

export const fleet = ["Sedan", "SUV", "Innova", "Innova Crysta"] as const;
export const destinations = ["Hyderabad", "Srisailam", "Vijayawada", "Guntur", "Rajahmundry", "Bhimavaram", "Tirupati", "Visakhapatnam", "Araku Valley", "Other destinations"] as const;
export const reviews = [
  "Had a wonderful Srisailam trip with Sri Nanda Travels. The driver was very good.",
  "Our Srisailam trip was truly a beautiful and memorable experience! We booked an Ertiga from Sri Nanda Travels, and everything went smoothly…",
  "Timely responses and a very professional approach from everyone. I truly appreciate all the team members for maintaining such good standards. Punctuality is very important for customers, especially when it comes to travel…",
  "We booked an Ertiga from Guntur to Amalapuram with Sri Nanda Travels. The ride…",
  "Booked 2 SUVs from Hyderabad to Narasaraopet for a wedding function. Excellent vehicles, friendly drivers & great service at a very reasonable price…",
] as const;

export type TrustStat = { value: string; label: string; note?: string };

export const trustStats: TrustStat[] = [
  { value: business.rating, label: "Google Rating" },
  { value: `${business.reviewCount}+`, label: "Verified Reviews" },
  { value: "24/7", label: "Service Availability" },
  { value: business.experienceYears, label: "Years of Experience", note: `Since ${business.sinceYear}` },
];

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}