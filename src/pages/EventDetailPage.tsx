import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Users, Share2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useEvents } from '../contexts/EventsContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, registerForEvent } = useEvents();
  const { user, isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState(id ? getEvent(id) : undefined);
  const [ticketCount, setTicketCount] = useState(1);
  const [isRegistering, setIsRegistering] = useState(false);
  
  useEffect(() => {
    // Update title
    if (event) {
      document.title = `${event.title} | EventVista`;
    } else {
      document.title = 'Event Not Found | EventVista';
    }
  }, [event]);
  
  if (!event) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/events')}
            className="btn-primary"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Events
          </button>
        </div>
      </div>
    );
  }
  
  const formattedDate = format(new Date(event.date), 'EEEE, MMMM dd, yyyy');
  const totalPrice = event.price * ticketCount;
  
  const handleRegistration = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to register for this event');
      navigate('/login');
      return;
    }
    
    if (!user) return;
    
    setIsRegistering(true);
    
    try {
      const success = await registerForEvent(
        event.id,
        user.id,
        user.name,
        user.email,
        ticketCount
      );
      
      if (success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsRegistering(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Events
        </button>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-80 object-cover"
              />
              
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                  <span className="bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary-500" />
                    <span>${event.price.toFixed(2)} per ticket</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary-500" />
                    <span>Capacity: {event.capacity} attendees</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={handleShare}
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500"
                    >
                      <Share2 className="h-5 w-5 mr-2" />
                      <span>Share Event</span>
                    </button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                  <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.organizer}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Registration Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Register for This Event</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Tickets
                </label>
                <div className="flex">
                  <button
                    onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                    className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={ticketCount}
                    onChange={e => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center w-16 border-y border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                  />
                  <button
                    onClick={() => setTicketCount(prev => prev + 1)}
                    className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mb-6 border-t border-b border-gray-200 dark:border-gray-700 py-4">
                <div className="flex justify-between mb-2">
                  <span>Price per ticket:</span>
                  <span>${event.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Number of tickets:</span>
                  <span>{ticketCount}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleRegistration}
                disabled={isRegistering}
                className="btn-primary w-full"
              >
                {isRegistering ? 'Processing...' : 'Register Now'}
              </button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                By registering, you agree to our terms and conditions for event participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;