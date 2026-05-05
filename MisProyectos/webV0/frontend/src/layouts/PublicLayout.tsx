import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              F
            </div>
            <span className="text-lg font-semibold text-gray-900">FotoStock</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/gallery" className="text-sm text-gray-600 hover:text-gray-900">
              Galeria
            </Link>
            <Link to="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Precios
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesion
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <Outlet />

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                  F
                </div>
                <span className="text-lg font-semibold text-gray-900">FotoStock</span>
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Plataforma profesional para fotografos y compradores de imagenes de alta calidad.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Producto</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/gallery" className="text-sm text-gray-600 hover:text-gray-900">
                    Galeria
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link to="/collections" className="text-sm text-gray-600 hover:text-gray-900">
                    Colecciones
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Empresa</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                    Terminos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                    Condiciones
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm text-gray-600 hover:text-gray-900">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} FotoStock. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
