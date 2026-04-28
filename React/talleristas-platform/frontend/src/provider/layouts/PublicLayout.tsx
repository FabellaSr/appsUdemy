import { Link, Outlet } from 'react-router'
import { useAuth } from '../../auth/context/AuthContext';

export const PublicLayout = () => {
    const { user, logout } = useAuth();
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            <header className="bg-white border-b border-slate-200 shadow-sm">
                <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
                    <Link to="/" className="text-xl font-bold text-brand-700">Talleristas</Link>
                    <div className="flex items-center gap-4 text-sm">
                        <Link to="/" className="hover:text-brand-600">Inicio</Link>
                        {!user && <Link to="/login" className="px-3 py-1.5 bg-brand-600 text-white rounded hover:bg-brand-700">Ingresar</Link>}
                        {user && (
                            <>
                                <Link to="/dashboard" className="hover:text-brand-600">Mi panel</Link>
                                <span className="text-slate-500 hidden sm:inline">{user.email}</span>
                                <button onClick={logout} className="text-slate-600 hover:text-red-600">Salir</button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <Outlet />
        <footer className="border-t border-slate-200 mt-16 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Talleristas Platform
        </footer>
        </div>
    )
}
