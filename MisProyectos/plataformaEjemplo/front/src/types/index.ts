export type Role = "visitor" | "provider" | "admin" | "superadmin";

export interface User {
  id: string;
  email: string;
  role: Role;
  providerId?: string;
}

export type CollectionStatus = "active" | "disabled" | "pending";

export interface Provider {
  id: string;
  businessName: string;
  category: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  profileImage: string;
  socialLinks: { facebook?: string; instagram?: string; website?: string };
  taxId?: string;
}

export interface Collection {
  id: string;
  providerId: string;
  title: string;
  description: string;
  monthlyPrice: number;
  status: CollectionStatus;
  photos: string[];      // up to 10, immutable
  createdAt: string;
}

export type PaymentStatus = "pending" | "confirmed" | "overdue";

export interface Payment {
  id: string;
  providerId: string;
  amount: number;
  paymentDate: string;
  confirmationDate?: string;
  receiptNumber?: string;
  status: PaymentStatus;
}

export type NotificationKind = "payment_overdue" | "payment_expiring" | "announcement";

export interface AppNotification {
  id: string;
  to: string;     // providerId or "all"
  kind: NotificationKind;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface AuthResponse { token: string; user: User; }
