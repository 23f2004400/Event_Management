import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket, ArrowRight, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventsContext';
import type { RegistrationType } from '../contexts/EventsContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const { events, getUserRegistrations } = useEvents();
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  
  useEffect(() => {
    // Update title
    document.title = 'Dashboard | EventVista';
    
    // Get user registrations
    if (user) {
      const userRegistrations = getUserRegistrations(user.id);
      setRegistrations(userRegistrations);
    }
  }, [user, getUserRegistrations]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-success-500';
      case 'pending':
        return 'text-accent-500';
      case 'cancelled':
        return 'text-error-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={18} className="text-success-500" />;
      case 'pending':
        return <AlertCircle size={18} className="text-accent-500" />;
      case 'cancelled':
        return <XCircle size={18} className="text-error-500" />;
      default:
        return null;
    }
  };
  
  // Find event details for each registration
  const registrationsWithEvents = registrations.map(registration => {
    const event = events.find(e => e.id === registration.eventId);
    return { registration, event };
  });
  
  // Sort by date (most recent first)
  registrationsWithEvents.sort((a, b) => {
    return new Date(b.registration.date).getTime() - new Date(a.registration.date).getTime();
  });
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}! Manage your event registrations here.
          </p>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Account Type</p>
                  <p className="font-medium capitalize">{user?.role}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="btn-outline w-full">Edit Profile</button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/events" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                    <Calendar size={18} className="mr-2" />
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                    <MapPin size={18} className="mr-2" />
                    Contact Support
                  </Link>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <Link to="/admin" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                      <Ticket size={18} className="mr-2" />
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">My Event Registrations</h2>
              
              {registrationsWithEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You haven't registered for any events yet.
                  </p>
                  <Link to="/events" className="btn-primary">
                    Browse Events
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {registrationsWithEvents.map(({ registration, event }) => (
                    <div
                      key={registration.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      {event ? (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <div className="flex items-center">
                              {getStatusIcon(registration.status)}
                              <span className={`ml-1 text-sm font-medium capitalize ${getStatusColor(registration.status)}`}>
                                {registration.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2 text-primary-500" />
                              <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2 text-primary-500" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2 text-primary-500" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Ticket size={16} className="mr-2 text-primary-500" />
                              <span>{registration.ticketCount} {registration.ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Total paid: </span>
                              <span className="font-semibold">${registration.totalPrice.toFixed(2)}</span>
                            </div>
                            <Link 
                              to={`/events/${event.id}`}
                              className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
                            >
                              View Event
                              <ArrowRight size={16} className="ml-1" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-500">
                          <p>This event is no longer available.</p>
                          <p className="text-sm mt-2">
                            Registration ID: {registration.id} | 
                            Status: <span className={`capitalize ${getStatusColor(registration.status)}`}>
                              {registration.status}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;