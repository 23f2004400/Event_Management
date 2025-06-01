import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award, Globe, ChevronRight, ArrowRight } from 'lucide-react';
import { useEvents } from '../contexts/EventsContext';
import EventCard from '../components/events/EventCard';

const HomePage = () => {
  const { events } = useEvents();
  const [featuredEvents, setFeaturedEvents] = useState(events.filter(event => event.featured).slice(0, 3));

  useEffect(() => {
    // Update title
    document.title = 'EventVista | Professional Event Management';
  }, []);

  const services = [
    {
      icon: <Calendar className="h-10 w-10 text-primary-500" />,
      title: 'Corporate Events',
      description: "Professional planning and execution of conferences, product launches, and team-building events tailored to your company's needs."
    },
    {
      icon: <Users className="h-10 w-10 text-primary-500" />,
      title: 'Social Gatherings',
      description: 'Create memorable experiences for weddings, birthdays, anniversaries, and other special personal celebrations.'
    },
    {
      icon: <Award className="h-10 w-10 text-primary-500" />,
      title: 'Award Ceremonies',
      description: 'Elegant and prestigious award ceremonies that recognize excellence and achievement in your industry or organization.'
    },
    {
      icon: <Globe className="h-10 w-10 text-primary-500" />,
      title: 'Virtual Events',
      description: 'Seamless online experiences with interactive elements and professional production for global audiences.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Event Management" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent"></div>
        <div className="container-custom relative h-full flex flex-col justify-center">
          <div className="max-w-2xl fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Creating <span className="text-primary-400">Unforgettable</span> Experiences
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              From corporate conferences to dream weddings, we bring your vision to life with expert planning and flawless execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/events" className="btn-primary">
                Explore Events
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white/10">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We offer comprehensive event management solutions tailored to meet your specific needs and exceed your expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                Discover our handpicked selection of upcoming events that promise unforgettable experiences.
              </p>
            </div>
            <Link 
              to="/events" 
              className="hidden md:flex items-center text-primary-500 hover:text-primary-600 font-medium"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="text-center md:hidden">
            <Link 
              to="/events" 
              className="btn-outline"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We take pride in exceeding expectations and creating memorable experiences for our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "EventVista transformed our corporate conference into an unforgettable experience. Their attention to detail and creativity exceeded our expectations."
              </p>
              <div>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director, TechCorp</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "Our wedding day was absolutely perfect thanks to the incredible team at EventVista. They handled every detail with care and professionalism."
              </p>
              <div>
                <p className="font-semibold">Sarah & James Rodriguez</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wedding Clients</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The virtual conference organized by EventVista had flawless execution. Their technical expertise and innovative approach made our global event a huge success."
              </p>
              <div>
                <p className="font-semibold">Dr. Emily Watson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Executive Director, HealthSummit</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 bg-primary-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Background pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Next Event?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Let's work together to bring your vision to life. Contact us today to start planning your perfect event.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-accent">
              Get in Touch
            </Link>
            <Link to="/events" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;