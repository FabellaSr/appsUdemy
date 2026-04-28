export type Role = 'admin' | 'provider';

export interface User {
  id: string;
  email: string;
  role: Role;
  providerId: string | null;
}

export interface WorkPhoto { id: string; url: string; caption?: string; }
export interface Work {
  id: string;
  title: string;
  description?: string;
  category?: string;
  isPublished: boolean;
  photos: WorkPhoto[];
  provider?: Provider;
  createdAt: string;
}
export interface Provider {
  id: string;
  fullName: string;
  trade?: string;
  bio?: string;
  phone?: string;
  city?: string;
  avatarUrl?: string;
  isActive: boolean;
  works?: Work[];
  createdAt: string;
}
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'cancelled';
  concept?: string;
  paidAt?: string;
  createdAt: string;
  provider?: Provider;
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  provider?: Provider;
}
