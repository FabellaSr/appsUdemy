// import { useState, FormEvent } from 'react';
// import { useNavigate } from 'react-router';
// import { useAuth } from '../context/AuthContext';

// export default function LoginPage() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('admin@talleristas.local');
//   const [password, setPassword] = useState('Admin123!');
//   const [err, setErr] = useState('');
//   const [loading, setLoading] = useState(false);

//   const submit = async (e: FormEvent) => {
//     e.preventDefault();
//     setErr('');
//     setLoading(true);
//     try {      
//       await login(email, password);
//       navigate('/'); 
//     } catch (e: any) {
//       console.log('Error en login,',e)
//       setErr(e.response?.data?.message ?? 'Error de login');
//     } finally { setLoading(false)}
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
//       <h1 className="text-2xl font-bold mb-6">Ingresar</h1>
//       <form onSubmit={submit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-slate-300 rounded px-3 py-2" required />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Contraseña</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-slate-300 rounded px-3 py-2" required />
//         </div>
//         {err && <div className="text-red-600 text-sm">{err}</div>}
//         <button disabled={loading} className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded font-medium disabled:opacity-50">
//           {loading ? 'Ingresando…' : 'Ingresar'}
//         </button>
//       </form>
//       <div className="mt-6 text-xs text-slate-500 space-y-1">
//         <p><b>Demo admin:</b> admin@talleristas.local / Admin123!</p>
//         <p><b>Demo proveedor:</b> juan@talleristas.local / Proveedor123!</p>
//       </div>
//     </div>
//   );
// }
import { LoginForm } from "../components/login-form"
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
