const API_URL = (import.meta as any).env?.VITE_API_URL || '/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error de red' }));
      throw new Error(error.message || `Error ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{ accessToken: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return this.request<{ accessToken: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMe() {
    return this.request<any>('/auth/me');
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Users/Profile
  async getProfile() {
    return this.request<any>('/users/profile');
  }

  async updateProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getDashboardStats() {
    return this.request<any>('/users/dashboard/stats');
  }

  async getMessages() {
    return this.request<any[]>('/users/messages');
  }

  async markMessageAsRead(messageId: string) {
    return this.request(`/users/messages/${messageId}/read`, {
      method: 'PUT',
    });
  }

  // Collections
  async getCollections() {
    return this.request<any[]>('/collections');
  }

  async getCollection(id: string) {
    return this.request<any>(`/collections/${id}`);
  }

  async createCollection(data: { title: string; description?: string }) {
    return this.request<any>('/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCollection(id: string, data: { title?: string; description?: string }) {
    return this.request(`/collections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCollection(id: string) {
    return this.request(`/collections/${id}`, {
      method: 'DELETE',
    });
  }

  async requestPublication(id: string) {
    return this.request(`/collections/${id}/request-publication`, {
      method: 'POST',
    });
  }

  async publishCollection(id: string) {
    return this.request(`/collections/${id}/publish`, {
      method: 'POST',
    });
  }

  async hideCollection(id: string) {
    return this.request(`/collections/${id}/hide`, {
      method: 'POST',
    });
  }

  async deleteCollectionImage(collectionId: string, imageId: string) {
    return this.request(`/collections/${collectionId}/images/${imageId}`, {
      method: 'DELETE',
    });
  }

  // Payments
  async getPayments() {
    return this.request<any[]>('/payments');
  }

  async getMaintenanceStatus() {
    return this.request<any>('/payments/maintenance/status');
  }

  async createCollectionPayment(data: { collectionId: string; reference?: string; proofUrl?: string }) {
    return this.request('/payments/collection', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createMaintenancePayment(data: { reference?: string; proofUrl?: string }) {
    return this.request('/payments/maintenance', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Pricing
  async getPricing() {
    return this.request<any[]>('/pricing');
  }

  // Contact
  async sendContactMessage(data: {
    userProfileId: string;
    senderName: string;
    senderEmail: string;
    senderPhone?: string;
    subject?: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Public
  async getTalleristas(filters?: { occupation?: string; city?: string; search?: string }) {
    return this.request<any[]>('/public/talleristas', { params: filters as any });
  }

  async getTalleristaDetail(id: string) {
    return this.request<any>(`/public/talleristas/${id}`);
  }

  async getOccupations() {
    return this.request<string[]>('/public/filters/occupations');
  }

  async getLocations() {
    return this.request<{ cities: string[]; states: string[] }>('/public/filters/locations');
  }

  // Admin
  async adminGetDashboard() {
    return this.request<any>('/admin/dashboard');
  }

  async adminGetUsers() {
    return this.request<any[]>('/admin/users');
  }

  async adminToggleUserStatus(userId: string) {
    return this.request(`/admin/users/${userId}/toggle-status`, {
      method: 'PUT',
    });
  }

  async adminGetCollections() {
    return this.request<any[]>('/admin/collections');
  }

  async adminGetPendingCollections() {
    return this.request<any[]>('/admin/collections/pending');
  }

  async adminApproveCollection(collectionId: string) {
    return this.request(`/admin/collections/${collectionId}/approve`, {
      method: 'POST',
    });
  }

  async adminRejectCollection(collectionId: string, reason: string) {
    return this.request(`/admin/collections/${collectionId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async adminGetPayments() {
    return this.request<any[]>('/admin/payments');
  }

  async adminGetPendingPayments() {
    return this.request<any[]>('/admin/payments/pending');
  }

  async adminApprovePayment(paymentId: string) {
    return this.request(`/admin/payments/${paymentId}/approve`, {
      method: 'POST',
    });
  }

  async adminRejectPayment(paymentId: string, reason: string) {
    return this.request(`/admin/payments/${paymentId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async adminGetPricing() {
    return this.request<any[]>('/admin/pricing');
  }

  async adminUpdatePricing(pricingId: string, data: any) {
    return this.request(`/admin/pricing/${pricingId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Upload
  async uploadCollectionImage(collectionId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const response = await fetch(`${this.baseUrl}/upload/collection/${collectionId}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al subir imagen' }));
      throw new Error(error.message);
    }

    return response.json();
  }

  async uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const response = await fetch(`${this.baseUrl}/upload/profile`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error al subir imagen' }));
      throw new Error(error.message);
    }

    return response.json();
  }
}

export const api = new ApiClient(API_URL);
