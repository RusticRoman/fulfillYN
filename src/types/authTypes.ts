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