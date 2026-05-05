import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatCurrency(amount: number | string, currency = 'MXN') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
  }).format(Number(amount));
}

export function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    DRAFT: 'Borrador',
    PENDING_PAYMENT: 'Pendiente de pago',
    PENDING_APPROVAL: 'Pendiente de aprobación',
    PUBLISHED: 'Publicada',
    HIDDEN: 'Oculta',
    PENDING: 'Pendiente',
    APPROVED: 'Aprobado',
    REJECTED: 'Rechazado',
  };
  return labels[status] || status;
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-700',
    PENDING_PAYMENT: 'bg-yellow-100 text-yellow-700',
    PENDING_APPROVAL: 'bg-blue-100 text-blue-700',
    PUBLISHED: 'bg-green-100 text-green-700',
    HIDDEN: 'bg-gray-100 text-gray-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}
