import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const data = await api.getMessages();
      setMessages(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar mensajes');
      console.error('[v0] Error loading messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await api.markMessageAsRead(messageId);
      await loadMessages();
    } catch (err) {
      console.error('[v0] Error marking message as read:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Cargando mensajes...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
        <p className="mt-2 text-gray-600">Mensajes de clientes y contactos</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

      {messages.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-600">
            No hay mensajes
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {messages.map((msg) => (
                <Card
                  key={msg.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.isRead) handleMarkAsRead(msg.id);
                  }}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {msg.senderName}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{msg.senderEmail}</p>
                        {msg.subject && (
                          <p className="mt-1 text-xs text-gray-700 truncate">{msg.subject}</p>
                        )}
                      </div>
                      {!msg.isRead && (
                        <Badge className="ml-2 flex-shrink-0">Nuevo</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>{selectedMessage.senderName}</CardTitle>
                    <p className="mt-1 text-sm text-gray-600">{selectedMessage.senderEmail}</p>
                    {selectedMessage.subject && (
                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        {selectedMessage.subject}
                      </p>
                    )}
                    {selectedMessage.createdAt && (
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(selectedMessage.createdAt).toLocaleString('es-ES')}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700">{selectedMessage.message}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-600">
                  Selecciona un mensaje para verlo
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
