import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Edit, Trash2, Calendar, MapPin, 
  DollarSign, Users, ChevronDown, ChevronUp, X, AlertTriangle 
} from 'lucide-react';
import { format } from 'date-fns';
import { useEvents } from '../../contexts/EventsContext';
import toast from 'react-hot-toast';
import type { EventType } from '../../contexts/EventsContext';

const AdminEventsPage = () => {
  const { events, deleteEvent } = useEvents();
  const [allEvents, setAllEvents] = useState<EventType[]>(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get unique categories
  const categories = ['All', ...new Set(events.map(event => event.category))];
  
  useEffect(() => {
    // Update title
    document.title = 'Manage Events | EventVista';
    
    // Filter and sort events
    let filtered = [...events];
    
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    // Sort events
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'capacity':
          aValue = a.capacity;
          bValue = b.capacity;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setAllEvents(filtered);
  }, [events, searchTerm, selectedCategory, sortField, sortDirection]);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };
  
  const handleDeleteClick = (event: EventType) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!eventToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const success = await deleteEvent(eventToDelete.id);
      
      if (success) {
        toast.success('Event deleted successfully');
        setIsDeleteModalOpen(false);
        setEventToDelete(null);
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="ml-1" /> : 
      <ChevronDown size={16} className="ml-1" />;
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Events</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create, edit, and manage all events
            </p>
          </div>
          
          <Link to="/admin/events/new" className="btn-primary">
            <Plus size={18} className="mr-2" />
            Add New Event
          </Link>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <div className="relative md:w-64">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input pl-10 appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="md:w-auto flex items-center justify-center space-x-2 btn-outline"
              >
                <X size={18} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {allEvents.length} {allEvents.length === 1 ? 'event' : 'events'}
            </p>
          </div>
        </div>
        
        {/* Events Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('title')}
                      className="flex items-center focus:outline-none"
                    >
                      Event Name
                      {getSortIcon('title')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('date')}
                      className="flex items-center focus:outline-none"
                    >
                      Date
                      {getSortIcon('date')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('price')}
                      className="flex items-center focus:outline-none"
                    >
                      Price
                      {getSortIcon('price')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('capacity')}
                      className="flex items-center focus:outline-none"
                    >
                      Capacity
                      {getSortIcon('capacity')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {allEvents.map(event => (
                  <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/events/${event.id}`} 
                            className="text-gray-900 dark:text-white font-medium hover:text-primary-500"
                          >
                            {event.title}
                          </Link>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {event.organizer}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-primary-500 mr-2" />
                        <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                        {event.time}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <MapPin size={16} className="text-primary-500 mr-2" />
                        <span className="truncate max-w-[150px]">{event.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign size={16} className="text-primary-500 mr-2" />
                        <span>${event.price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <Users size={16} className="text-primary-500 mr-2" />
                        <span>{event.capacity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 px-2.5 py-0.5 rounded-full text-xs">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-3">
                        <button 
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(event)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {allEvents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        No events found
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filter criteria
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && eventToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center text-red-600 dark:text-red-500 mb-4">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-xl font-bold">Delete Event</h3>
            </div>
            
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete <span className="font-semibold">{eventToDelete.title}</span>? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn-outline"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;