import venueImage from '../pic.jpeg';

export const weddingData = {
  couple: {
    bride: "Rutuja",
    groom: "Shubham",
    brideFull: "Rutuja",
    groomFull: "Shubham"
  },
  date: "2026-04-30T12:36:00",
  location: {
    name: "Suvatsalya Mangal Karyalay",
    city: "Tardal, Ichalkaranji - Kolhapur",
    description: "A beautiful venue for a traditional wedding ceremony, bringing together family and friends to celebrate our union.",
    // Backup image URL: https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop
    image: venueImage
  },
  message: "With love in our hearts and joy in our souls, we invite you to witness the beginning of our forever. Your presence is the greatest gift we could ask for as we unite our lives in marriage.",
  events: [
    {
      id: 1,
      name: "Haldi Ceremony",
      date: "April 29, 2026",
      time: "09:00 AM",
      location: "Ashirwad Colony, Sambhajipur",
      icon: "Sparkles"
    },
    {
      id: 2,
      name: "Saptpadi",
      date: "April 30, 2026",
      time: "09:36 AM",
      location: "Suvatsalya Mangal Karyalay",
      icon: "Footprints"
    },
    {
      id: 3,
      name: "Lunch",
      date: "April 30, 2026",
      time: "11:00 AM",
      location: "Suvatsalya Mangal Karyalay",
      icon: "UtensilsCrossed"
    },
    {
      id: 4,
      name: "Wedding Ceremony",
      date: "April 30, 2026",
      time: "12:36 PM",
      location: "Suvatsalya Mangal Karyalay",
      icon: "Heart"
    }
  ],
  guests: [
    { name: "The Family & Friends", avatar: "https://i.pravatar.cc/150?u=family" },
    { name: "The Bennett Family", avatar: "https://i.pravatar.cc/150?u=bennett" },
    { name: "The Sterling Family", avatar: "https://i.pravatar.cc/150?u=sterling" },
    { name: "Julian & Maria Rossi", avatar: "https://i.pravatar.cc/150?u=rossi" },
    { name: "David Chen", avatar: "https://i.pravatar.cc/150?u=david" },
    { name: "Sarah Miller", avatar: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Robert & Elena Vance", avatar: "https://i.pravatar.cc/150?u=vance" },
    { name: "Michael Thompson", avatar: "https://i.pravatar.cc/150?u=michael" },
    { name: "Jessica Williams", avatar: "https://i.pravatar.cc/150?u=jessica" }
  ]
};
