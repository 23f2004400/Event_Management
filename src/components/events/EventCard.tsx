import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { EventType } from '../../contexts/EventsContext.tsx';

type EventCardProps = {
  event: EventType;
};

const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');
  
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-sm font-medium">
          {event.category}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-2 group-hover:text-primary-500 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary-500" />
            <span>{formattedDate} • {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-primary-500" />
            <span>${event.price.toFixed(2)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="mt-auto">
          <Link
            to={`/events/${event.id}`}
            className="inline-block w-full text-center py-2 px-4 bg-gray-100 hover:bg-primary-50 text-primary-600 font-medium rounded-md transition-colors dark:bg-gray-700 dark:text-primary-400 dark:hover:bg-gray-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;