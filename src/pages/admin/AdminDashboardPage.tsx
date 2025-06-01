import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';

const AdminDashboardPage = () => {
  const { events, registrations } = useEvents();
  
  useEffect(() => {
    // Update title
    document.title = 'Admin Dashboard | EventVista';
  }, []);
  
  // Calculate statistics
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const totalRevenue = registrations.reduce((total, reg) => total + reg.totalPrice, 0);
  
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pendingRegistrations = registrations.filter(reg => reg.status === 'pending');
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your events and registrations in one place.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Total Events</h2>
              <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-500">
                <Calendar size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold">{totalEvents}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Active events in the system
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Total Registrations</h2>
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-2 rounded-lg text-secondary-500">
                <Users size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold">{totalRegistrations}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Across all events
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Total Revenue</h2>
              <div className="bg-accent-100 dark:bg-accent-900/30 p-2 rounded-lg text-accent-500">
                <DollarSign size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              From all ticket sales
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pending Registrations</h2>
              <div className="bg-warning-100 dark:bg-warning-900/30 p-2 rounded-lg text-warning-500">
                <Clock size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold">{pendingRegistrations.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Awaiting confirmation
            </p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/admin/events"
                className="bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors p-4 rounded-lg flex flex-col items-center text-center"
              >
                <Calendar size={30} className="text-primary-500 mb-2" />
                <span className="font-medium">Manage Events</span>
              </Link>
              
              <Link
                to="/admin/registrations"
                className="bg-secondary-50 dark:bg-secondary-900/20 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors p-4 rounded-lg flex flex-col items-center text-center"
              >
                <Users size={30} className="text-secondary-500 mb-2" />
                <span className="font-medium">Manage Registrations</span>
              </Link>
              
              <Link
                to="/events"
                className="bg-accent-50 dark:bg-accent-900/20 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors p-4 rounded-lg flex flex-col items-center text-center"
              >
                <TrendingUp size={30} className="text-accent-500 mb-2" />
                <span className="font-medium">View Public Events</span>
              </Link>
              
              <button
                className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors p-4 rounded-lg flex flex-col items-center text-center"
              >
                <AlertTriangle size={30} className="text-gray-500 dark:text-gray-400 mb-2" />
                <span className="font-medium">Generate Reports</span>
              </button>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Link
                to="/admin/events"
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.slice(0, 3).map(event => (
                <div key={event.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </p>
                  </div>
                  <Link
                    to={`/events/${event.id}`}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    View
                  </Link>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No upcoming events scheduled.
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Activity Log */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="space-y-6">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">New registration</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Jane Smith registered for Business Leadership Summit
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    10 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium">Event updated</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Digital Marketing Masterclass details were updated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    2 hours ago
                  </p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Registration status changed</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bob Johnson's registration was marked as cancelled
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    5 hours ago
                  </p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <DollarSign size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Payment received</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Payment of $599.98 received for Annual Tech Conference
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;