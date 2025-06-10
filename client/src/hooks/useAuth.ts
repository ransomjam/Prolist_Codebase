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
  accountType?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth(): AuthState & {
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  register: (userData: {
    username: string;
    email?: string;
    password: string;
    accountType: string;
    specialization?: string | null;
    phone?: string;
    location?: string;
    fullName?: string;
    businessName?: string;
    marketLocation?: string;
    marketLine?: string;
    shopNumber?: string;
    acceptTerms?: boolean;
    physicalVerificationAvailable?: boolean;
    profilePicture?: File | null;
  }) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  setUser: (user: User) => void;
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
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          ...data,
          role: data.accountType || data.role || 'user'
        };
        setUser(userData);
        localStorage.setItem('prolist_user', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (userData: {
    username: string;
    email?: string;
    password: string;
    accountType: string;
    specialization?: string | null;
    phone?: string;
    location?: string;
    fullName?: string;
    businessName?: string;
    marketLocation?: string;
    marketLine?: string;
    shopNumber?: string;
    acceptTerms?: boolean;
    physicalVerificationAvailable?: boolean;
    profilePicture?: File | null;
  }) => {
    try {
      // Convert profile picture to base64 if provided
      let profilePictureData = null;
      if (userData.profilePicture) {
        profilePictureData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]); // Remove data:image/jpeg;base64, prefix
          };
          reader.readAsDataURL(userData.profilePicture!);
        });
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          accountType: userData.accountType,
          specialization: userData.specialization,
          phone: userData.phone,
          location: userData.location,
          profilePicture: profilePictureData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          ...data,
          role: data.accountType || data.role || 'user'
        };
        setUser(user);
        localStorage.setItem('prolist_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prolist_user');
    // Redirect to landing page after logout
    window.location.href = '/';
  };

  const setUserData = (userData: User) => {
    setUser(userData);
    localStorage.setItem('prolist_user', JSON.stringify(userData));
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    setUser: setUserData
  };
}