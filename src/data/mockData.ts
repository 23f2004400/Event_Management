import { EventType, RegistrationType } from '../contexts/EventsContext';

export const mockEvents: EventType[] = [
  {
    id: 'event-1',
    title: 'Annual Tech Conference 2025',
    date: '2025-06-15',
    time: '09:00 - 18:00',
    location: 'Tech Convention Center, San Francisco',
    category: 'Technology',
    price: 299.99,
    description: 'Join us for the biggest tech conference of the year! Featuring keynote speakers from leading tech companies, workshops on emerging technologies, networking opportunities, and much more. This year\'s focus is on AI, blockchain, and sustainable tech solutions.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 1500,
    organizer: 'TechEvents Inc.',
    featured: true
  },
  {
    id: 'event-2',
    title: 'Summer Music Festival',
    date: '2025-07-25',
    time: '14:00 - 23:00',
    location: 'Greenfield Park, Austin',
    category: 'Music',
    price: 89.99,
    description: 'Experience the ultimate summer music festival featuring top artists from around the world. Multiple stages, food vendors, and camping options available. Bring your friends and enjoy a weekend of amazing music under the stars!',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 5000,
    organizer: 'SoundWave Productions',
    featured: true
  },
  {
    id: 'event-3',
    title: 'Business Leadership Summit',
    date: '2025-09-10',
    time: '10:00 - 17:00',
    location: 'Grand Hyatt, New York',
    category: 'Business',
    price: 499.99,
    description: 'A premier gathering of business leaders and entrepreneurs. Learn from industry pioneers, gain insights into market trends, and expand your professional network. The summit includes panel discussions, keynote speeches, and exclusive networking sessions.',
    image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 800,
    organizer: 'Global Business Network',
    featured: false
  },
  {
    id: 'event-4',
    title: 'International Food & Wine Expo',
    date: '2025-08-05',
    time: '12:00 - 20:00',
    location: 'Marina Bay Convention Center, Singapore',
    category: 'Food & Drink',
    price: 120,
    description: 'Embark on a culinary journey around the world at our International Food & Wine Expo. Sample exquisite dishes and fine wines from renowned chefs and wineries. Cooking demonstrations, tasting sessions, and gourmet product shopping available.',
    image: 'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 2000,
    organizer: 'Global Gastronomy Guild',
    featured: true
  },
  {
    id: 'event-5',
    title: 'Digital Marketing Masterclass',
    date: '2025-05-22',
    time: '09:30 - 16:30',
    location: 'Online Virtual Event',
    category: 'Marketing',
    price: 199.99,
    description: 'Transform your digital marketing skills with our comprehensive masterclass. Learn the latest strategies in SEO, social media marketing, content creation, and paid advertising. Includes hands-on workshops and personalized feedback from marketing experts.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 500,
    organizer: 'Digital Marketing Institute',
    featured: false
  },
  {
    id: 'event-6',
    title: 'Wellness & Yoga Retreat',
    date: '2025-06-02',
    time: 'All Day',
    location: 'Serenity Resort, Bali',
    category: 'Health & Wellness',
    price: 1299.99,
    description: 'Escape to paradise for a rejuvenating wellness retreat. Enjoy daily yoga sessions, meditation, spa treatments, and nutritious organic meals. Our expert instructors will guide you through practices to restore balance to your mind, body, and spirit.',
    image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 50,
    organizer: 'Mindful Living Co.',
    featured: false
  },
  {
    id: 'event-7',
    title: 'Startup Investment Forum',
    date: '2025-10-15',
    time: '10:00 - 18:00',
    location: 'Innovation Hub, London',
    category: 'Business',
    price: 350,
    description: 'Connect promising startups with potential investors at our annual Investment Forum. Startups will have the opportunity to pitch their business ideas, while investors can discover the next big innovation. Networking sessions and expert panels included.',
    image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 300,
    organizer: 'Venture Capital Association',
    featured: true
  },
  {
    id: 'event-8',
    title: 'Wedding Planning Showcase',
    date: '2025-04-18',
    time: '11:00 - 19:00',
    location: 'Ritz-Carlton, Miami',
    category: 'Lifestyle',
    price: 75,
    description: 'Plan your dream wedding at our exclusive Wedding Planning Showcase. Meet top vendors including photographers, caterers, florists, and wedding planners. Enjoy fashion shows featuring the latest bridal collections, cake tastings, and special booking discounts.',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    capacity: 400,
    organizer: 'Elegant Events',
    featured: false
  }
];

export const mockRegistrations: RegistrationType[] = [
  {
    id: 'reg-1',
    eventId: 'event-1',
    userId: 'user-id-456',
    userName: 'Regular User',
    userEmail: 'user@example.com',
    date: '2025-03-15T14:30:00Z',
    ticketCount: 2,
    totalPrice: 599.98,
    status: 'confirmed'
  },
  {
    id: 'reg-2',
    eventId: 'event-4',
    userId: 'user-id-456',
    userName: 'Regular User',
    userEmail: 'user@example.com',
    date: '2025-03-20T09:15:00Z',
    ticketCount: 1,
    totalPrice: 120,
    status: 'confirmed'
  },
  {
    id: 'reg-3',
    eventId: 'event-2',
    userId: 'admin-id-123',
    userName: 'Admin User',
    userEmail: 'admin@eventvista.com',
    date: '2025-03-10T11:45:00Z',
    ticketCount: 3,
    totalPrice: 269.97,
    status: 'confirmed'
  },
  {
    id: 'reg-4',
    eventId: 'event-3',
    userId: 'user-id-789',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    date: '2025-03-22T16:20:00Z',
    ticketCount: 1,
    totalPrice: 499.99,
    status: 'pending'
  },
  {
    id: 'reg-5',
    eventId: 'event-5',
    userId: 'user-id-101',
    userName: 'Bob Johnson',
    userEmail: 'bob@example.com',
    date: '2025-03-18T13:10:00Z',
    ticketCount: 2,
    totalPrice: 399.98,
    status: 'cancelled'
  }
];