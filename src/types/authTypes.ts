export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType?: 'brand' | '3pl' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, userType: 'brand' | '3pl' | 'admin') => Promise<void>;
  logout: () => void;
  setUserType: (type: 'brand' | '3pl' | 'admin') => void;
  loginWithGoogle: () => Promise<void>; // <-- Add this here!
}