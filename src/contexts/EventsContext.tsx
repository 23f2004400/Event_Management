import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { mockEvents, mockRegistrations } from '../data/mockData';

// Define types
export type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  description: string;
  image: string;
  capacity: number;
  organizer: string;
  featured: boolean;
};

export type RegistrationType = {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  ticketCount: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
};

type EventsContextType = {
  events: EventType[];
  registrations: RegistrationType[];
  getEvent: (id: string) => EventType | undefined;
  getUserRegistrations: (userId: string) => RegistrationType[];
  getEventRegistrations: (eventId: string) => RegistrationType[];
  registerForEvent: (eventId: string, userId: string, userName: string, userEmail: string, ticketCount: number) => Promise<boolean>;
  addEvent: (event: Omit<EventType, 'id'>) => Promise<EventType>;
  updateEvent: (id: string, event: Partial<EventType>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  updateRegistrationStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled') => Promise<boolean>;
};

// Create context
const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Create provider
export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>(mockEvents);
  const [registrations, setRegistrations] = useState<RegistrationType[]>(mockRegistrations);

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const getUserRegistrations = (userId: string) => {
    return registrations.filter(reg => reg.userId === userId);
  };

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter(reg => reg.eventId === eventId);
  };

  const registerForEvent = async (
    eventId: string,
    userId: string,
    userName: string,
    userEmail: string,
    ticketCount: number
  ): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const event = getEvent(eventId);
      if (!event) return false;
      
      const newRegistration: RegistrationType = {
        id: `reg-${Date.now()}`,
        eventId,
        userId,
        userName,
        userEmail,
        date: new Date().toISOString(),
        ticketCount,
        totalPrice: event.price * ticketCount,
        status: 'confirmed'
      };
      
      setRegistrations([...registrations, newRegistration]);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const addEvent = async (eventData: Omit<EventType, 'id'>): Promise<EventType> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEvent: EventType = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const updateEvent = async (id: string, eventData: Partial<EventType>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(events.map(event => 
        event.id === id ? { ...event, ...eventData } : event
      ));
      
      return true;
    } catch (error) {
      console.error('Update event error:', error);
      return false;
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(events.filter(event => event.id !== id));
      return true;
    } catch (error) {
      console.error('Delete event error:', error);
      return false;
    }
  };

  const updateRegistrationStatus = async (
    id: string,
    status: 'confirmed' | 'pending' | 'cancelled'
  ): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRegistrations(registrations.map(reg => 
        reg.id === id ? { ...reg, status } : reg
      ));
      
      return true;
    } catch (error) {
      console.error('Update registration status error:', error);
      return false;
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        registrations,
        getEvent,
        getUserRegistrations,
        getEventRegistrations,
        registerForEvent,
        addEvent,
        updateEvent,
        deleteEvent,
        updateRegistrationStatus
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

// Create hook
export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};