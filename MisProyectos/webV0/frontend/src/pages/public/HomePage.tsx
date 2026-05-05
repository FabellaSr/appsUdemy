import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge className="mb-4">Plataforma de Fotografía Profesional</Badge>
          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
            Conecta con Talleristas Profesionales
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-600">
            Descubre trabajos únicos de fotógrafos y talleres especializados. Compra, vende y colabora en una plataforma segura y confiable.
          </p>
          <div className="flex gap-4">
            <Link to="/talleristas">
              <Button size="lg">Explorar Talleristas</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">¿Por qué elegir FotoStock?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-2xl">📷</span>
              </div>
              <CardTitle>Galería Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Acceso a una vasta colección de trabajos de fotógrafos profesionales verificados.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <span className="text-2xl">✅</span>
              </div>
              <CardTitle>Seguridad Verificada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Todos nuestros talleristas están verificados. Transacciones seguras garantizadas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <span className="text-2xl">💼</span>
              </div>
              <CardTitle>Gestión Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Herramientas completas para gestionar tus colecciones, pagos y mensajes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="rounded-lg bg-blue-600 px-8 py-16 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">¿Listo para comenzar?</h2>
          <p className="mb-8 text-lg opacity-90">
            Únete a nuestra comunidad de fotógrafos y compradores profesionales.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Registrarse Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
