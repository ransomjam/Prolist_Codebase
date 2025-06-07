import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  verificationStatus: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Demo users for the chat system
const demoUsers: User[] = [
  {
    id: 1,
    username: 'john_buyer',
    email: 'john@example.com',
    role: 'buyer',
    verificationStatus: 'verified',
    firstName: 'John',
    lastName: 'Doe'
  },
  {
    id: 2,
    username: 'sarah_vendor',
    email: 'sarah@example.com',
    role: 'vendor',
    verificationStatus: 'premium_verified',
    firstName: 'Sarah',
    lastName: 'Kimeng'
  },
  {
    id: 3,
    username: 'admin_user',
    email: 'admin@prolist.com',
    role: 'admin',
    verificationStatus: 'verified',
    firstName: 'Admin',
    lastName: 'User'
  }
];

export function useAuth(): AuthState & {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (userId: number) => void;
} {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('prolist_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('prolist_user');
      }
    }
    // Don't auto-login users - let them choose to login
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('prolist_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prolist_user');
    // Redirect to landing page after logout
    window.location.href = '/';
  };

  const switchUser = (userId: number) => {
    const foundUser = demoUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('prolist_user', JSON.stringify(foundUser));
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    switchUser
  };
}