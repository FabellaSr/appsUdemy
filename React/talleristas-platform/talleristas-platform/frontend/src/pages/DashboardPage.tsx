import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const cards = isAdmin ? [
    { to: '/admin/providers', title: 'Proveedores', desc: 'Alta, baja y modificación' },
    { to: '/admin/payments', title: 'Pagos', desc: 'Registrar y consultar pagos' },
    { to: '/admin/notifications', title: 'Avisos', desc: 'Enviar notificaciones' },
  ] : [
    { to: '/me/profile', title: 'Mi perfil', desc: 'Editar mis datos' },
    { to: '/me/works', title: 'Mis trabajos', desc: 'Subir fotos y administrar' },
    { to: '/me/payments', title: 'Mis pagos', desc: 'Pagos realizados o pendientes' },
    { to: '/me/notifications', title: 'Mis avisos', desc: 'Notificaciones recibidas' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
      <p className="text-slate-600 mb-8">{user?.email} · {isAdmin ? 'Administrador' : 'Proveedor'}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-slate-500 text-sm mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
