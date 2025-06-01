import { useState, useEffect } from 'react';
import { 
  Search, Filter, CheckCircle, Clock, XCircle, 
  Download, ChevronDown, ChevronUp, X, UserCheck 
} from 'lucide-react';
import { format } from 'date-fns';
import { useEvents } from '../../contexts/EventsContext';
import toast from 'react-hot-toast';
import type { RegistrationType } from '../../contexts/EventsContext';

const AdminRegistrationsPage = () => {
  const { events, registrations, updateRegistrationStatus } = useEvents();
  const [allRegistrations, setAllRegistrations] = useState<RegistrationType[]>(registrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Get unique event IDs and names
  const eventOptions = events.map(event => ({
    id: event.id,
    title: event.title
  }));
  
  const statusOptions = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  
  useEffect(() => {
    // Update title
    document.title = 'Manage Registrations | EventVista';
    
    // Filter and sort registrations
    let filtered = [...registrations];
    
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStatus) {
      filtered = filtered.filter(reg => reg.status === selectedStatus);
    }
    
    if (selectedEvent) {
      filtered = filtered.filter(reg => reg.eventId === selectedEvent);
    }
    
    // Sort registrations
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.userName.toLowerCase();
          bValue = b.userName.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'tickets':
          aValue = a.ticketCount;
          bValue = b.ticketCount;
          break;
        case 'total':
          aValue = a.totalPrice;
          bValue = b.totalPrice;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setAllRegistrations(filtered);
  }, [registrations, searchTerm, selectedStatus, selectedEvent, sortField, sortDirection]);
  
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
    setSelectedStatus('');
    setSelectedEvent('');
  };
  
  const handleStatusChange = async (registrationId: string, status: 'confirmed' | 'pending' | 'cancelled') => {
    setIsUpdating(true);
    
    try {
      const success = await updateRegistrationStatus(registrationId, status);
      
      if (success) {
        toast.success(`Registration status updated to ${status}`);
      } else {
        toast.error('Failed to update registration status');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const getEventTitle = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Unknown Event';
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={18} className="text-success-500" />;
      case 'pending':
        return <Clock size={18} className="text-accent-500" />;
      case 'cancelled':
        return <XCircle size={18} className="text-error-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
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
            <h1 className="text-3xl font-bold mb-2">Manage Registrations</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all event registrations
            </p>
          </div>
          
          <button className="btn-outline">
            <Download size={18} className="mr-2" />
            Export Data
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <div className="relative md:w-60">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="input pl-10 appearance-none"
              >
                <option value="">All Events</option>
                {eventOptions.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))}
              </select>
            </div>
            
            <div className="relative md:w-40">
              <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input pl-10 appearance-none"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {(searchTerm || selectedStatus || selectedEvent) && (
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
              Showing {allRegistrations.length} {allRegistrations.length === 1 ? 'registration' : 'registrations'}
            </p>
          </div>
        </div>
        
        {/* Registrations Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center focus:outline-none"
                    >
                      Attendee
                      {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('date')}
                      className="flex items-center focus:outline-none"
                    >
                      Registration Date
                      {getSortIcon('date')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('tickets')}
                      className="flex items-center focus:outline-none"
                    >
                      Tickets
                      {getSortIcon('tickets')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('total')}
                      className="flex items-center focus:outline-none"
                    >
                      Total
                      {getSortIcon('total')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {allRegistrations.map(registration => (
                  <tr key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {registration.userName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {registration.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="truncate max-w-[150px]">
                        {getEventTitle(registration.eventId)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {format(new Date(registration.date), 'MMM dd, yyyy h:mm a')}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {registration.ticketCount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      ${registration.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs ${getStatusBadgeClass(registration.status)}`}>
                        {getStatusIcon(registration.status)}
                        <span className="capitalize">{registration.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={registration.status}
                        onChange={(e) => handleStatusChange(
                          registration.id,
                          e.target.value as 'confirmed' | 'pending' | 'cancelled'
                        )}
                        disabled={isUpdating}
                        className="input text-sm py-1 px-2"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                
                {allRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        No registrations found
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
    </div>
  );
};

export default AdminRegistrationsPage;