export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType?: 'brand' | '3pl';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}