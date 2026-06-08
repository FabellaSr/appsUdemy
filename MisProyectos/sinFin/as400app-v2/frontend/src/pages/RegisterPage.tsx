import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth.service';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await authService.register(username, password);
    navigate('/auth/login');
  };
  return (
    <Card>
      <CardHeader><CardTitle>Crear cuenta</CardTitle></CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2"><Label>Usuario</Label><Input value={username} onChange={e=>setUsername(e.target.value)} required /></div>
          <div className="space-y-2"><Label>Contraseña</Label><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          <Button className="w-full" type="submit">Crear cuenta</Button>
        </form>
      </CardContent>
    </Card>
  );
};
