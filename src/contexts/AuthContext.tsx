import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('eventVista_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email === 'admin@eventvista.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-id-123',
          name: 'Admin User',
          email: 'admin@eventvista.com',
          role: 'admin' as const
        };
        setUser(adminUser);
        localStorage.setItem('eventVista_user', JSON.stringify(adminUser));
        return true;
      } else if (email === 'user@example.com' && password === 'password123') {
        const regularUser = {
          id: 'user-id-456',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user' as const
        };
        setUser(regularUser);
        localStorage.setItem('eventVista_user', JSON.stringify(regularUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration logic
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user' as const
      };
      
      setUser(newUser);
      localStorage.setItem('eventVista_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventVista_user');
  };

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};