import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TalleristaDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  occupation?: string;
  city?: string;
  state?: string;
  profileImage?: string;
  description?: string;
  collections?: Array<{
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
  }>;
}

export default function TalleristaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tallerista, setTallerista] = useState<TalleristaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  const [messageData, setMessageData] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function loadTallerista() {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await api.getTalleristaDetail(id);
        setTallerista(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el tallerista');
        console.error('[v0] Error loading tallerista:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTallerista();
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tallerista) return;

    try {
      setIsSending(true);
      await api.sendContactMessage({
        userProfileId: tallerista.id,
        senderName: messageData.senderName,
        senderEmail: messageData.senderEmail,
        senderPhone: messageData.senderPhone || undefined,
        subject: messageData.subject || undefined,
        message: messageData.message,
      });

      setMessageData({
        senderName: '',
        senderEmail: '',
        senderPhone: '',
        subject: '',
        message: '',
      });
      setIsMessageFormOpen(false);
      alert('Mensaje enviado exitosamente');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al enviar el mensaje');
      console.error('[v0] Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center text-gray-600">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error || !tallerista) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {error || 'Tallerista no encontrado'}
          </div>
          <Button onClick={() => navigate('/talleristas')} className="mt-4">
            Volver a Talleristas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <Button variant="outline" onClick={() => navigate('/talleristas')} className="mb-6">
          ← Volver
        </Button>

        {/* Profile Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-8 md:flex-row">
              {tallerista.profileImage && (
                <img
                  src={tallerista.profileImage}
                  alt={`${tallerista.firstName} ${tallerista.lastName}`}
                  className="h-40 w-40 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {tallerista.firstName} {tallerista.lastName}
                </h1>
                {tallerista.occupation && (
                  <Badge className="mt-2">{tallerista.occupation}</Badge>
                )}
                <p className="mt-4 text-gray-600">
                  {tallerista.city && tallerista.state
                    ? `${tallerista.city}, ${tallerista.state}`
                    : 'Ubicación no especificada'}
                </p>
                {tallerista.description && (
                  <p className="mt-4 text-gray-700">{tallerista.description}</p>
                )}
                <Button
                  onClick={() => setIsMessageFormOpen(!isMessageFormOpen)}
                  className="mt-6"
                >
                  {isMessageFormOpen ? 'Cancelar' : 'Contactar'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Form */}
        {isMessageFormOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enviar Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="senderName">Tu nombre *</Label>
                    <Input
                      id="senderName"
                      value={messageData.senderName}
                      onChange={(e) =>
                        setMessageData({ ...messageData, senderName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderEmail">Tu email *</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={messageData.senderEmail}
                      onChange={(e) =>
                        setMessageData({ ...messageData, senderEmail: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="senderPhone">Teléfono</Label>
                  <Input
                    id="senderPhone"
                    type="tel"
                    value={messageData.senderPhone}
                    onChange={(e) =>
                      setMessageData({ ...messageData, senderPhone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    value={messageData.subject}
                    onChange={(e) =>
                      setMessageData({ ...messageData, subject: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    value={messageData.message}
                    onChange={(e) =>
                      setMessageData({ ...messageData, message: e.target.value })
                    }
                    required
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={isSending}>
                  {isSending ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Collections */}
        {tallerista.collections && tallerista.collections.length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Colecciones</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tallerista.collections.map((collection) => (
                <Card key={collection.id}>
                  {collection.imageUrl && (
                    <img
                      src={collection.imageUrl}
                      alt={collection.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{collection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {collection.description && (
                      <p className="text-sm text-gray-600">{collection.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
